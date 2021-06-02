/* Simple implementations of basic system functions */

const vfsPrefix = "vfs::";

class BiosConsole {
    constructor() {
        this._text = "";
        this._element = document.getElementById("bios");
    }

    clear() {
        this._text = "";
        this._element.innerText = this._text;
    }

    println(text) {
        this._text += text + "\n";
        this._element.innerText = this._text;
    }

    hide() {
        this._element.style.display = "none";
    }

    show() {
        this._element.style.display = "block";
    }
}

class BiosVFS {
    constructor() {
        this.registry = new Map();
        this.rootId = null;

        this.init();
    }

    init() {
        this.registry = new Map();
        let keys = Object.entries(localStorage);

        for (let [key, v] of keys) {
            if (key.startsWith(vfsPrefix)) {
                key = key.substring(vfsPrefix.length);
                key = JSON.parse(key);

                this.registry.set(key.id, key);
                if (key.type === "root") {
                    this.rootId = key.id;
                }
            }
        }
    }

    loadEntity(path) {
        let currNode = this.registry.get(this.rootId);

        for (let node of path) {
            let found = false;
            for (let [key, ent] of this.registry.entries()) {
                if (ent.parent === currNode.id && ent.name === node) {
                    currNode = ent;
                    found = true;
                    break;
                }
            }
            if (!found) throw new Error("No such file or directory was found.");
        }

        return currNode;
    }
}

function sleep(ms) {
    /* Asynchronous sleep function */
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    let biosConsole = new BiosConsole();

    biosConsole.println("System Bootloader\n");

    // check JS environment
    let jsEnvValid = localStorage && Object.entries && Map && requirejs;

    if (jsEnvValid) {
        biosConsole.println("Validating runtime environment...OK");
    } else {
        biosConsole.println("fatal error: One or more necessary features are missing from this browser!")
        return
    }

    let vfs = new BiosVFS();

    if (!vfs.rootId) {
        biosConsole.println("File system does not exist! Creating root...");
        localStorage.setItem(vfsPrefix + JSON.stringify({ type: "root", id: "ROOT", name: "", parent: "" }), "");
        biosConsole.println("Downloading system...");
        let req, data;
        try {
            req = await fetch("bundle.js");
            data = await req.text();
        } catch (err) {
            biosConsole.println("Unable to download system. Details:\n" + err.stack);
            return;
        }

        biosConsole.println(`System downloaded (${(data.length / 1000).toPrecision(2)}kB)`);

        biosConsole.println("Installing...");

        localStorage.setItem(vfsPrefix + JSON.stringify({ type: "dir", id: "SYS", name: "sys", parent: "ROOT" }), "");
        localStorage.setItem(
            vfsPrefix + JSON.stringify({ type: "file", id: "MAIN", name: "main.js", parent: "SYS" }),
            data
        );

        biosConsole.println("System has succesfully been installed. Please refresh this page to continue");
    } else {
        biosConsole.println("Locating filesystem...OK");
        let systemExecutableEntity;
        try {
            systemExecutableEntity = vfs.loadEntity(["sys", "main.js"]);
        } catch {
            biosConsole.println(
                "There was an error loading the system executable. Either the file is missing or the file system is corrupted."
            );
            biosConsole.println("To clear the file system and start over, press Enter.");
            window.addEventListener("keypress", (ev) => {
                if (ev.key === "Enter") {
                    biosConsole.println("Clearing filesystem...");
                    localStorage.clear();
                    biosConsole.println("File system cleared. Please refresh this page.");
                }
            });
            return;
        }
        biosConsole.println("Found system executable, starting...");
        await sleep(300);
        let exec = localStorage.getItem(vfsPrefix + JSON.stringify(systemExecutableEntity));
        biosConsole.hide();
        // start
        eval(exec);
        requirejs.onError = function (err) {
            document.getElementById("root").style.display = "none";
            biosConsole.show();
            biosConsole.clear();
            biosConsole.println("System Bootloader\n\nAn unexpected error occurred during system execution:\n");
            biosConsole.println(err.stack);
        };
        await requirejs(["index"]);
    }
}

main();
