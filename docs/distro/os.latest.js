var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("log_example", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logText = `SysRAM: 96 MB
Flash:  16 MB
In:     serial
Out:    serial
Err:    serial
MAC:    00:50:C2:13:6f:07
IP:     192.168.11.105
&PAUSE
open_ethernet
Autobooting... press <SPACE> to stop
&PAUSE
Using open_ethernet device
TFTP from server 192.168.11.55; our IP address is 192.168.11.105
Filename 'uImage.xtensa-2.6.29-smp.test_mmuhifi_c3'.
Load address: 0xd2000000
&PAUSE
done

Bytes transferred = 1161826 (11ba62 hex)
Automatic boot of image at addr 0xD2000000 ...
&PAUSE
## Booting kernel from Legacy Image at d2000000 ...
&PAUSE
   Image Name:   Linux-2.6.29-rc7
   Image Type:   Xtensa Linux Kernel Image (gzip compressed)
   Data Size:    1161762 Bytes =  1.1 MB
   Load Address: d0001000
   Entry Point:  d0001000
   Verifying Checksum ... OK
   Uncompressing Kernel Image ... OK
&PAUSE
## Linux Boot Params Starting At Address:0xd5f50000
   MEMORY:          tag:0x1003, type:0X1000, start:0X0, end:0X6000000
   COMMAND_LINE:    tag:0x1001, size:188, data:'console=ttyS0,38400 ip=192.168.11.105:192.168.11.55:192.168.11.1:255.255.255.0:"HiFi-2 Demo" root=/dev/nfs rw nfsroot=192.168.11.55:/exports/LINUX_ROOT.HiFi-2 debug coredump_filter=0xff'
   SERIAL_BAUDRATE: tag:0x1004, size:4, baudrate:38400

## Transferring Control to Linux Kernel At Address 0xd0001000 ...
&PAUSE

parse_bootparam: Ignoring tag 0x1004
lx60 platform_init(bootparams:d5f50000)
Linux version 2.6.29-rc7 (pdelaney@pdelaney_fc5.hq.tensilica.com) (gcc version 4.2.1) #201 SMP Tue Nov 17 23:49:39 PST 2009
lx60 platform_setup(cmdline[0]:'console=ttyS0,38400 ip=192.168.11.105:192.168.11.55:192.168.11.1:255.255.255.0:"HiFi-2 Demo" root=/dev/nfs rw nfsroot=192.168.11.55:/exports/LINUX_ROOT.HiFi-2 debug coredump_filter=0xff')
smp_init_cpus: Core Count = 3
smp_init_cpus: Core Id = 9320
On node 0 totalpages: 24576
&PAUSE
free_area_init_node: node 0, pgdat d0196540, node_mem_map d01fa000
  Normal zone: 216 pages used for memmap
  Normal zone: 24360 pages, LIFO batch:3
&PAUSE
smp_prepare_boot_cpu:
Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 24360
Kernel command line: console=ttyS0,38400 ip=192.168.11.105:192.168.11.55:192.168.11.1:255.255.255.0:"HiFi-2 Demo" root=/dev/nfs rw nfsroot=192.168.11.55:/exports/LINUX_ROOT.HiFi-2 debug coredump_filter=0xff
trap_init 0
&PAUSE
PID hash table entries: 512 (order: 9, 2048 bytes)
time_init: Platform Calibrating CPU frequency
time_init: ccount_per_jiffy:416777 [41.67 MHz], nsec_per_ccount:23
&PAUSE
Console: colour dummy device 80x25
console [ttyS0] enabled
&PAUSE
Dentry cache hash table entries: 16384 (order: 4, 65536 bytes)
Inode-cache hash table entries: 8192 (order: 3, 32768 bytes)
Memory: 95196k/98304k available (1229k kernel code, 3040k reserved, 28k data, 72k init 0k highmem)
Calibrating delay loop... 41.26 BogoMIPS (lpj=206336)
&PAUSE
Mount-cache hash table entries: 512
cpu 1 fffd
secondary_trap_init 1
Calibrating delay loop... 41.67 BogoMIPS (lpj=208384)
&PAUSE
secondary_irq_init: set cached_irq_mask and enable interrupts))
secondary_time_init()
secondary_irq_enable(intrnum:6): cpu:1, INTENABLE:7c
secondary_irq_enable(intrnum:0): cpu:1, INTENABLE:7d
cpu 2 fff9
secondary_trap_init 2
Calibrating delay loop... 41.57 BogoMIPS (lpj=207872)
&PAUSE
secondary_irq_init: set cached_irq_mask and enable interrupts))
secondary_time_init()
secondary_irq_enable(intrnum:6): cpu:2, INTENABLE:7c
secondary_irq_enable(intrnum:0): cpu:2, INTENABLE:7d
Brought up 3 CPUs
&PAUSE
smp_cpus_done:
net_namespace: 304 bytes
NET: Registered protocol family 16
lx60_init()
bio: create slab <bio-0> at 0
&PAUSE
NET: Registered protocol family 2
IP route cache hash table entries: 1024 (order: 0, 4096 bytes)
TCP established hash table entries: 4096 (order: 3, 32768 bytes)
TCP bind hash table entries: 4096 (order: 3, 32768 bytes)
TCP: Hash tables configured (established 4096 bind 4096)
TCP reno registered
NET: Registered protocol family 1
msgmni has been set to 186
alg: No test for md5 (md5-generic)
alg: No test for des (des-generic)
alg: No test for des3_ede (des3_ede-generic)
alg: No test for stdrng (krng)
io scheduler noop registered (default)
&PAUSE
Serial: 8250/16550 driver, 4 ports, IRQ sharing disabled
serial8250: ttyS0 at MMIO 0x0 (irq = 3) is a 16550A
oeth_probe: {
oeth_setup: Open Ethernet Core Version 1.0.1
 : oeth_setup: Found id1:2000, id2:5c30 at phy_id:3.
 : Hardware MAC Address: 00:50:c2:13:6f:0f
eth0 (): not using net_device_ops yet
oeth_probe: }
mice: PS/2 mouse device common for all mice
TCP cubic registered
&PAUSE
NET: Registered protocol family 17
&PAUSE
RPC: Registered udp transport module.
RPC: Registered tcp transport module.
&PAUSE
oeth_open:  Ready to process packets now on dev->name:'eth0', dev:d597d800;
IP-Config: Complete:
     device=eth0, addr=192.168.11.105, mask=255.255.255.0, gw=192.168.11.1,
     host="HiFi-2 Demo", domain=, nis-domain=(none),
     bootserver=192.168.11.55, rootserver=192.168.11.55, rootpath=
&PAUSE
Looking up port of RPC 100003/2 on 192.168.11.55
&PAUSE
Looking up port of RPC 100005/1 on 192.168.11.55
VFS: Mounted root (nfs filesystem) on device 0:11.
Freeing unused kernel memory: 72k freed
Starting portmap: done
Initializing random number generator... done.
&PAUSE
Starting network...
&PAUSE
ip: RTNETLINK answers: File exists
Starting sshd: OK
Starting NFS statd: done
Starting NFS services: done
Starting NFS daemon: done
Starting NFS mountd: done
Starting domain name daemon: namedwarning: \`named' uses 32-bit capabilities (legacy support in use)... done
Mounting Other NFS Filesystems... done

Ready...`;
});
/*
    The CRTConsole component represents
    a simple terminal emulator designed as a React component.
*/
define("Console", ["require", "exports", "react", "log_example"], function (require, exports, react_1, log_example_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importDefault(react_1);
    function sleep(ms) {
        /* Asynchronous sleep function */
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    class CRTConsole extends react_1.default.Component {
        constructor(props) {
            super(props);
            /* callbacks */
            // this function will be called every time
            // a keyboard event is observed by the console.
            // if this event returns true, the event's
            // default behaviour will be prevented.
            this.preEventIntercept = null;
            this.postEventCallback = null;
            this.state = {
                text: "".repeat(20),
                title: "bash",
                cursorPosition: 0,
                isCursorVisible: true,
                isTyping: false,
                autocomplete: "",
                allowInput: true,
            };
            this.lastKeystrokeTime = Date.now();
            this.readonlyPoint = 0;
        }
        componentDidMount() {
            var _a;
            // Register keystroke events
            window.addEventListener("keydown", async (event) => {
                await this.handleKeystroke(event);
            });
            (_a = document.querySelector("console")) === null || _a === void 0 ? void 0 : _a.focus();
            // Register animation loops
            setInterval(() => {
                this.setState({
                    isCursorVisible: !this.state.isCursorVisible,
                });
                this.updateIsTypingState();
            }, 500);
            setInterval(() => {
                this.updateIsTypingState();
            }, 40);
            // Add reference of this object to the window, for debug purposes
            window.crtConsole = this;
        }
        async disableInput() {
            await this.setState({ allowInput: false });
        }
        async enableInput() {
            await this.setState({ allowInput: true });
        }
        async handleKeystroke(event) {
            /* Should be called on any keyboard event */
            if (this.preEventIntercept) {
                let preventDefault = this.preEventIntercept(event);
                if (preventDefault) {
                    return;
                }
            }
            let key = event.key;
            if (key.length == 1) {
                await this.addTextAtCursor(key);
            }
            if (key === "Backspace") {
                if (this.state.cursorPosition > this.readonlyPoint)
                    await this.backspaceAtCursor();
            }
            if (key === "ArrowRight") {
                await this.cursorRight();
            }
            if (key === "ArrowLeft") {
                await this.cursorLeft();
            }
            this.lastKeystrokeTime = Date.now();
            await this.updateIsTypingState();
            if (this.postEventCallback)
                await this.postEventCallback(event);
        }
        async updateIsTypingState() {
            /*
                This function checks whether typing has ceased long enough ago,
                and if so, resumes cursor blinking
            */
            await this.setState({
                // check if the time since last keystroke was less than half a second ago.
                isTyping: Date.now() - this.lastKeystrokeTime < 500,
            });
        }
        async cursorRight() {
            /* Moves the cursor right, limiting it to the length of the state text */
            await this.setState({
                cursorPosition: Math.min(this.state.cursorPosition + 1, this.state.text.length),
            });
        }
        async cursorLeft() {
            /* Moves the cursor right, limiting it to the "read only point" */
            await this.setState({
                cursorPosition: Math.max(this.readonlyPoint, this.state.cursorPosition - 1),
            });
        }
        async addTextAtCursor(text) {
            /* Writes text where the cursor is, as if being inputted by the user */
            await this.setState({
                text: this.state.text.substring(0, this.state.cursorPosition) +
                    text +
                    this.state.text.substring(this.state.cursorPosition),
                cursorPosition: this.state.cursorPosition + text.length,
            });
            this.lastKeystrokeTime = Date.now();
        }
        isCursorAtTextEnd() {
            /* Returns true if the cursor is located one character past the end of the text */
            return this.state.cursorPosition === this.state.text.length;
        }
        async print(text, readonly = true) {
            /*
                Analogous to any other print function. If readonly is set,
                the new text will not be user-editable.
    
                Printing newlines will incur a slight delay, for stylistic effect.
            */
            let lines = text.split("\n");
            let i = 0;
            for (let line of lines) {
                if (i !== 0)
                    await this._print("\n");
                await this._print(line);
                await sleep(Math.random() * 30 + 10);
                i++;
            }
        }
        async _print(text, readonly = true) {
            if (this.isCursorAtTextEnd()) {
                await this.setState({ cursorPosition: this.state.cursorPosition + text.length });
            }
            if (readonly)
                this.readonlyPoint = this.state.text.length + text.length;
            await this.setState({ text: this.state.text + text });
            // scroll to bottom
            document.querySelector(".console").scrollTop = document.querySelector(".console").scrollHeight;
        }
        async println(text) {
            await this.print(text + "\n");
        }
        async printLines(lines) {
            await this.print(lines.join("\n") + "\n");
        }
        async runDemoSequence() {
            /* Runs a cool looking loading sequence */
            this.clear();
            await this.print("BIOS version 1.26 build 2628");
            await sleep(1000);
            this.clear();
            await sleep(1000);
            let lineIndex = 0;
            let lines = log_example_1.logText.split("\n");
            for (let line of lines) {
                if (line !== "&PAUSE") {
                    if (lineIndex !== 0)
                        await this.print("\n");
                    await this.print(line);
                }
                else {
                    await sleep(Math.random() * 200 + 50);
                }
                await sleep(Math.random() * 30);
                lineIndex++;
            }
            await sleep(1000);
            this.clear();
        }
        async backspaceAtCursor() {
            /*
                This function emulates the user pressing the backspace key.
            */
            await this.setState({
                text: this.state.text.substring(0, this.state.cursorPosition - 1) +
                    this.state.text.substring(this.state.cursorPosition),
                cursorPosition: this.state.cursorPosition - 1,
            });
        }
        async clear() {
            /*
                Clears the terminal, resetting most terminal state
                variables to their defaults.
            */
            await this.setState({
                text: "",
                cursorPosition: 0,
            });
            this.readonlyPoint = 0;
        }
        getUserTypedString() {
            /* Returns everything typed by the user, from the readonly point to the end of the text */
            //console.log(this.state.text, this.readonlyPoint);
            return this.state.text.substring(this.readonlyPoint);
        }
        async setAutocomplete(text) {
            await this.setState({
                autocomplete: text,
            });
        }
        async clearAutocomplete() {
            await this.setAutocomplete("");
        }
        render() {
            /*
                Draws the terminal body
            */
            let text = this.state.text;
            let preCursor = react_1.default.createElement("span", null, text.substring(0, this.state.cursorPosition));
            let atCursor;
            // make atCursor
            if (this.state.isCursorVisible || this.state.isTyping) {
                atCursor = react_1.default.createElement("span", null, "▓");
            }
            else {
                atCursor = react_1.default.createElement("span", null, text[this.state.cursorPosition] || " ");
                if (this.state.autocomplete && this.isCursorAtTextEnd()) {
                    atCursor = react_1.default.createElement("span", { className: "console-autocomplete" }, this.state.autocomplete[0]);
                }
            }
            let postCursor = react_1.default.createElement("span", null, text.substring(this.state.cursorPosition + 1));
            return (react_1.default.createElement("div", { className: "console" },
                preCursor,
                atCursor,
                postCursor,
                react_1.default.createElement("span", { className: "console-autocomplete" }, this.state.autocomplete.substring(this.isCursorAtTextEnd() ? 1 : 0))));
        }
    }
    exports.CRTConsole = CRTConsole;
});
/*
    Virtual Filesystem

    Uses window.localStorage: usually capped at around 5MiB

    Format:

    LocalStorage {
        'vfs::{type: "root", id: "1", parent: ""}': """,
        'vfs::{type: "file", name: "test.txt", parent: "1"}': <file contents>,
        'vfs::
    }
*/
define("shell/vfs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prefix = "vfs::"; // used to distinguish localStorage entries
    function randomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }
    class VFSEntityRegistry {
        constructor() {
            this._entityTable = new Map();
            this._childTable = new Map();
            this._rootId = null;
        }
        getEntity(id) {
            let e = this._entityTable.get(id);
            if (!e)
                throw new Error(`No entity found with id "${id}"`);
            return e;
        }
        getRoot() {
            let id = this._rootId;
            if (!id)
                throw new Error(`Root entity has not been defined yet!`);
            return this.getEntity(id);
        }
        registerEntity(entity) {
            this._entityTable.set(entity.id, entity);
            if (entity.parent) {
                if (this._childTable.has(entity.parent)) {
                    this._childTable.get(entity.parent).push(entity);
                }
                else {
                    this._childTable.set(entity.parent, [entity]);
                }
            }
            if (entity.type === "root") {
                this._rootId = entity.id;
            }
        }
        findChildEntity(parent, childName) {
            let children = this._childTable.get(parent.id) || [];
            for (let child of children) {
                if (child.name === childName) {
                    return child;
                }
            }
            return null;
        }
        unregisterEntity(entity) {
            this._entityTable.delete(entity.id);
            let parentTable = this._childTable.get(entity.parent);
            if (parentTable) {
                this._childTable.set(entity.parent, parentTable.filter((e) => e.id !== entity.id));
            }
        }
        getChildEntities(of) {
            return this._childTable.get(of.id) || [];
        }
    }
    function toPath(p) {
        if (typeof p === "string") {
            return new VFSPath(p);
        }
        return p;
    }
    exports.toPath = toPath;
    class VFSPath {
        constructor(path) {
            path = path.trim();
            this.absolute = path.startsWith("/");
            if (path.startsWith("/"))
                path = path.substring(1);
            if (path.endsWith("/"))
                path = path.substring(0, path.length - 1);
            let parts = path.split("/");
            this.path = parts.slice(0, parts.length - 1);
            this.end = parts[parts.length - 1];
        }
        toString() {
            return (this.absolute ? "/" : "") + this.path.concat([this.end]).join("/");
        }
        join(_other) {
            let other = toPath(_other);
            if (this.isRoot()) {
                return "/" + other.path.concat([other.end]).join("/");
            }
            return (this.absolute ? "/" : "") + this.path.concat([this.end, ...other.path, other.end]).join("/");
        }
        toAbsolute(_currentDir) {
            let cwdPath = toPath(_currentDir);
            if (this.absolute)
                return this.toString();
            return new VFSPath(cwdPath.toString()).join(this);
        }
        isRoot() {
            return this.absolute && this.end === "" && this.path.length === 0;
        }
    }
    exports.VFSPath = VFSPath;
    class VFS {
        constructor() {
            this.registry = new VFSEntityRegistry();
            // init
            let ents = this.getAllEntities();
            let root = null;
            // look for root dir
            for (let ent of ents) {
                if (ent.type === "root") {
                    root = ent;
                    break;
                }
            }
            // if root dir was not found, init file system
            if (root === null) {
                let ent = this.makeRootEntity();
                this.registry.registerEntity(ent);
                this._saveEntity(ent);
            }
            else {
                // build filesystem
                for (let ent of ents) {
                    this.registry.registerEntity(ent);
                }
            }
            this.cwd = "/";
        }
        getEntityFromPath(_path) {
            let path = toPath(_path);
            path = new VFSPath(path.toAbsolute(this.cwd));
            let currNode = this.registry.getRoot();
            for (let name of path.path) {
                let nextNode = this.registry.findChildEntity(currNode, name);
                if (!nextNode) {
                    return null;
                }
                currNode = nextNode;
            }
            if (path.isRoot()) {
                return this.registry.getRoot();
            }
            return this.registry.findChildEntity(currNode, path.end);
        }
        _findContainerEntity(_path) {
            let path = toPath(_path);
            path = new VFSPath(path.toAbsolute(this.cwd));
            let currNode = this.registry.getRoot();
            for (let name of path.path) {
                let nextNode = this.registry.findChildEntity(currNode, name);
                if (!nextNode) {
                    return null;
                }
                currNode = nextNode;
            }
            return currNode;
        }
        exists(_path) {
            return this.getEntityFromPath(_path) !== null;
        }
        touch(_path) {
            if (this.exists(_path)) {
                return;
            }
            let path = new VFSPath(_path);
            // find the entity for the parent directory
            let container = this._findContainerEntity(_path);
            if (!container)
                throw new Error("Parent directory does not exist!");
            let newEnt = this.makeFileEntity(path.end, container);
            this.registry.registerEntity(newEnt);
            this._saveEntity(newEnt);
        }
        _mkdir(name, parent) {
            let newEnt = this.makeDirEntity(name, parent);
            this.registry.registerEntity(newEnt);
            this._saveEntity(newEnt);
            return newEnt;
        }
        mkdir(_path) {
            if (this.exists(_path)) {
                return;
            }
            let path = new VFSPath(_path);
            let currNode = this.registry.getRoot();
            for (let node of path.path.concat(path.end)) {
                let child = this.registry.findChildEntity(currNode, node);
                if (!child) {
                    child = this._mkdir(node, currNode);
                }
                currNode = child;
            }
            return currNode;
        }
        _writeFile(entity, data) {
            if (entity.type !== "file")
                throw new Error("Cannot write to non-file");
            this._saveEntity(entity, data);
        }
        writeFile(path, data) {
            // Write data to a file, creating it if it doesn't exist.
            this.touch(path);
            this._writeFile(this.getEntityFromPath(path), data);
        }
        readFile(path) {
            let ent = this.getEntityFromPath(path);
            if (!ent)
                throw new Error("No such file or directory");
            if (ent.type !== "file")
                throw new Error("Cannot read from non-file");
            return localStorage.getItem(exports.prefix + JSON.stringify(ent));
        }
        delete(_path) {
            let path = new VFSPath(_path);
            let ent = this.getEntityFromPath(_path);
            if (ent) {
                if (ent.type === "file") {
                    this.registry.unregisterEntity(ent);
                    this._deleteEntity(ent);
                }
                else {
                    // recursively delete directory
                }
            }
            else {
                throw new Error("File does not exist!");
            }
        }
        listdir(path) {
            let ent = this.getEntityFromPath(path);
            if (!ent)
                throw new Error("Directory does not exist!");
            if (ent.type === "file")
                throw new Error("Cannot list files of non-directory!");
            let children = this.registry.getChildEntities(ent);
            return children.map((ent) => this.pathOfEntity(ent));
        }
        pathOfEntity(entity) {
            let path = [];
            let ent = entity;
            while (ent.type !== "root") {
                path = [ent.name].concat(path);
                ent = this.registry.getEntity(ent.parent);
            }
            return "/" + path.join("/");
        }
        isDir(_path) {
            let path = toPath(_path);
            let ent = this.getEntityFromPath(path);
            if (!ent)
                throw new Error("Entity does not exist!");
            return ent.type !== "file";
        }
        generateID() {
            let chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            let id = "";
            for (let i = 0; i < 8; i++)
                id += randomItem(chars);
            return id;
        }
        makeRootEntity() {
            return {
                id: this.generateID(),
                type: "root",
                name: "/",
                parent: "",
            };
        }
        makeDirEntity(name, parentTo) {
            return {
                id: this.generateID(),
                type: "dir",
                name: name,
                parent: parentTo.id,
            };
        }
        makeFileEntity(name, parentTo) {
            return {
                id: this.generateID(),
                type: "file",
                name: name,
                parent: parentTo.id,
            };
        }
        _saveEntity(ent, contents = "") {
            localStorage.setItem(exports.prefix + JSON.stringify(ent), contents);
        }
        _deleteEntity(ent) {
            localStorage.removeItem(exports.prefix + JSON.stringify(ent));
        }
        calculateDataUsage() {
            let bytesUsed = 0;
            for (let [k, v] of Object.entries(localStorage)) {
                bytesUsed += k.length + v.length;
            }
            return bytesUsed;
        }
        getAllEntities() {
            return Object.keys(localStorage)
                .filter((key) => key.startsWith(exports.prefix))
                .map((key) => {
                // remove prefix
                key = key.substring(exports.prefix.length);
                return JSON.parse(key);
            });
        }
    }
    exports.VFS = VFS;
});
define("shell/shell", ["require", "exports", "shell/vfs"], function (require, exports, vfs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VirtualShell {
        constructor(con) {
            this._commands = new Map();
            this._halted = false;
            this._userInputOnEnterCallback = null;
            this._busy = false; // true if currently executing a command
            this.console = con;
            this.vfs = new vfs_1.VFS();
        }
        registerCommand(commandConstructor) {
            let commandInstance = new commandConstructor();
            commandInstance.setExecutionEnvironment({ console: this.console, shell: this });
            this._commands.set(commandInstance.name, commandInstance);
            return this; // allow method chaining
        }
        getCommandInstances() {
            return this._commands.values();
        }
        currentTimeString() {
            /* Returns a US-formatted time string */
            return new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        }
        async handleInvalidCommand(name) {
            await this.console.println(`No command was found with the name "${name}".`);
        }
        async handleCommandEntry(input) {
            this._busy = true;
            await this.console.println("");
            // check for commands
            input = input.trimStart();
            let commandName = input.split(" ")[0];
            if (commandName !== "") {
                let command = this._commands.get(commandName);
                // Run command
                if (command) {
                    // get argstring (everything after the command name)
                    let argstring = input.substring(commandName.length).trimLeft();
                    let exitCode = await command._launcher(command._parseArgv(argstring));
                }
                else {
                    await this.handleInvalidCommand(commandName);
                }
            }
            this._busy = false;
            if (!this._halted)
                await this.promptNextCommand();
        }
        async init() {
            /* Begin a shell session */
            // register event listener
            this.console.preEventIntercept = (event) => {
                if (event.key === "Enter") {
                    if (!this._busy)
                        this.handleCommandEntry(this.console.getUserTypedString());
                    if (this._userInputOnEnterCallback)
                        this._userInputOnEnterCallback();
                }
                if (event.key === "Tab") {
                    this.console.addTextAtCursor(this.console.state.autocomplete + " ");
                    event.preventDefault();
                }
            };
            this.console.postEventCallback = (event) => {
                this.updateAutocomplete();
            };
            this.console.clear();
            await this.console.printLines([
                `Local time: ${this.currentTimeString()}`,
                'Type "help" for a list of commands.',
            ]);
            if (!this._halted)
                await this.promptNextCommand();
            window.shell = this;
        }
        async updateAutocomplete() {
            let currText = this.console.getUserTypedString();
            if (currText.length > 0) {
                for (let cmdName of this._commands.keys()) {
                    if (cmdName.startsWith(currText)) {
                        await this.console.setAutocomplete(cmdName.substring(currText.length));
                        return;
                    }
                }
            }
            await this.console.clearAutocomplete();
        }
        async promptNextCommand() {
            await this.console.print(this.vfs.cwd + "$ ");
        }
        async getUserInput() {
            return new Promise((resolve, reject) => {
                this._userInputOnEnterCallback = () => {
                    this._userInputOnEnterCallback = null;
                    let typed = this.console.getUserTypedString();
                    this.console.println("").then(() => {
                        resolve(typed);
                    });
                };
            });
        }
        _halt() {
            this._halted = true;
            this.console.disableInput();
        }
    }
    exports.VirtualShell = VirtualShell;
});
define("shell/command", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command {
        constructor() {
            this.description = null;
            this._env = null;
        }
        setExecutionEnvironment(env) {
            this._env = env;
        }
        getEnv() {
            if (!this._env)
                throw new Error("An execution environment has not been defined to this process!");
            return this._env;
        }
        async openPage(url) {
            await this.getEnv().console.println("Redirecting...");
            window.location.href = url;
            await new Promise((res, rej) => { });
        }
        async sleep(ms) {
            /* simulate a Thread Sleep by using async/promises */
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
        async systemRestart() {
            await this.getEnv().console.clear();
            location.reload();
        }
        _parseArgv(argsString) {
            /*
                This method is used to parse everything after the command
                for instance, when invoking
                "rm -rf /"
                argsString is "-rf /" (Everything except the command name and the trailing space.)
    
                Should return an ARGV array.
            */
            let currArg = "";
            let args = [];
            let i = 0;
            let inString = false;
            let escapedCharacters = {
                [`\\"`]: `"`,
                [`\\ `]: " ",
                [`\\\\`]: "\\",
            };
            let pushCurrArg = () => {
                if (currArg)
                    args.push(currArg);
                currArg = "";
            };
            while (i < argsString.length) {
                let stringSubset = argsString.substring(i);
                // check if the next characters are one of the above escaped characters
                let escapeSequence = null;
                for (let escp of Object.keys(escapedCharacters)) {
                    if (stringSubset.startsWith(escp)) {
                        escapeSequence = escp;
                    }
                }
                // if an escape sequence match is found
                if (escapeSequence) {
                    // consume the next characters
                    i += escapeSequence.length;
                    let interpretAs = escapedCharacters[escapeSequence];
                    // add the literal character
                    currArg += interpretAs;
                }
                else {
                    // handle other characters
                    let char = stringSubset[0];
                    if (char === " " && !inString) {
                        pushCurrArg();
                    }
                    else if (char === '"') {
                        inString = !inString;
                    }
                    else {
                        currArg += char;
                    }
                    i++;
                }
            }
            pushCurrArg();
            return args;
        }
        async _launcher(argv) {
            try {
                return await this.main(argv);
            }
            catch (err) {
                await this.getEnv().console.println(err.stack);
                return 1;
            }
        }
    }
    exports.Command = Command;
});
define("shell/commands/clear", ["require", "exports", "shell/command"], function (require, exports, command_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command_Clear extends command_1.Command {
        constructor() {
            super(...arguments);
            this.name = "clear";
            this.description = "Clears the terminal";
        }
        async main() {
            await this.getEnv().console.clear();
            return 0;
        }
    }
    exports.Command_Clear = Command_Clear;
});
define("shell/commands/fs", ["require", "exports", "shell/command", "shell/vfs"], function (require, exports, command_2, vfs_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sizeDescriptor(size) {
        const k = 1024;
        if (size >= k * k) {
            return (size / (k * k)).toFixed(1) + " MiB";
        }
        if (size >= k) {
            return (size / k).toFixed(1) + " KiB";
        }
        return size + " bytes";
    }
    class Command_LS extends command_2.Command {
        constructor() {
            super(...arguments);
            this.name = "ls";
            this.description = "Lists the current files in this directory";
        }
        async main(argv) {
            let env = this.getEnv();
            let vfs = env.shell.vfs;
            let path = argv[0];
            let where = path || vfs.cwd;
            let files = vfs.listdir(where).map((path) => new vfs_2.VFSPath(path));
            await env.console.printLines(files.map((path) => {
                if (vfs.isDir(path)) {
                    return path.end + "/";
                }
                return path.end;
            }));
        }
    }
    exports.Command_LS = Command_LS;
    class Command_CD extends command_2.Command {
        constructor() {
            super(...arguments);
            this.name = "cd";
            this.description = "Changes the current working directory, defaulting to the root directory if not provided.";
        }
        async main(argv) {
            let env = this.getEnv();
            let vfs = env.shell.vfs;
            let path = argv[0];
            let where = path || "/";
            if (!vfs.exists(where)) {
                await env.console.println("No such file or directory");
                return 1;
            }
            else {
                vfs.cwd = new vfs_2.VFSPath(where).toAbsolute(vfs.cwd);
            }
        }
    }
    exports.Command_CD = Command_CD;
    class Command_CAT extends command_2.Command {
        constructor() {
            super(...arguments);
            this.name = "cat";
            this.description = "Prints the entire contents of a file";
        }
        async main(argv) {
            let env = this.getEnv();
            let vfs = env.shell.vfs;
            let path = argv[0];
            let data = vfs.readFile(path);
            await env.console._print((data || "") + "\n");
        }
    }
    exports.Command_CAT = Command_CAT;
    class Command_RM extends command_2.Command {
        constructor() {
            super(...arguments);
            this.name = "rm";
            this.description = "Deletes a file or directory";
        }
        async main(argv) {
            let env = this.getEnv();
            let vfs = env.shell.vfs;
            let path = argv[0];
            vfs.delete(path);
        }
    }
    exports.Command_RM = Command_RM;
    class Command_DiskUtil extends command_2.Command {
        constructor() {
            super(...arguments);
            this.name = "diskutil";
            this.description = "A disk utility tool";
        }
        async main(argv) {
            let env = this.getEnv();
            let vfs = env.shell.vfs;
            let mode = argv[0];
            if (!mode) {
                await env.console.printLines([
                    "Usage: diskutil [mode] [...args]",
                    "",
                    "Modes:",
                    "- usage:  Provides information about the current disk usage and quota",
                    "- clean:  Clears the entire filesystem and all of its data. Reboots the system",
                    "- validate: Performs an internal check on the filesystem, notifying of any issues",
                ]);
                return;
            }
            if (mode === "usage") {
                let usage = vfs.calculateDataUsage();
                let quota = 5 * 1024 * 1024; // localStorage is usally 5 MiB
                await env.console.printLines([
                    "Storage Used:      " + sizeDescriptor(usage),
                    "Storage Capacity:  " + sizeDescriptor(quota),
                    "Percent Used:      " + (((usage / quota) * 100).toFixed(1) + "%"),
                ]);
            }
            else if (mode === "clean") {
                let confirmed = argv[1] === "-y";
                if (!confirmed) {
                    await env.console.println("Warning: This action is irreversible! To confirm, do\ndiskutil clean -y");
                }
                else {
                    await env.console.println("Clearing disk...");
                    await this.sleep(500);
                    localStorage.clear();
                    await env.console.clear();
                    location.reload();
                }
            }
            else if (mode === "validate") {
                for (let ent of vfs.registry._entityTable.values()) {
                    if (localStorage.getItem(vfs_2.prefix + JSON.stringify(ent)) === null) {
                        await env.console.println("Error: Filesystem entity at path " +
                            vfs.pathOfEntity(ent) +
                            " is formatted incorrectly or does not exist on disk!");
                    }
                    // make sure each entity is connected to the root
                    let i = 0;
                    let currNode = ent;
                    while (currNode.id !== vfs.registry.getRoot().id) {
                        let newEnt = vfs.registry.getEntity(currNode.parent);
                        if (!newEnt) {
                            await env.console.println(`Error: Filesystem entity has invalid/nonexistent parent with ID "${location}"`);
                        }
                        currNode = newEnt;
                        if (i > 999) {
                            await env.console.println("Warning: Filesystem check exceeded maximum depth. Possible circular reference?");
                            break;
                        }
                        i += 1;
                    }
                }
                await env.console.println("Disk validation finished successfully.");
            }
            else {
                await env.console.println("Unknown mode");
                return 1;
            }
        }
    }
    exports.Command_DiskUtil = Command_DiskUtil;
});
define("shell/commands/google", ["require", "exports", "shell/command"], function (require, exports, command_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command_Google extends command_3.Command {
        constructor() {
            super(...arguments);
            this.name = "google";
            this.description = "Searches Google for the provided query. If the -i flag is provided, search Google Images";
        }
        async main(argv) {
            let useGI = false;
            if (argv[0] === "-i") {
                argv = argv.slice(1);
                useGI = true;
            }
            await this.openPage(`https://www.google.com/search?q=${argv.join("+")}` + (useGI ? "&tbm=isch" : ""));
        }
    }
    exports.Command_Google = Command_Google;
});
define("shell/commands/help", ["require", "exports", "shell/command"], function (require, exports, command_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command_Help extends command_4.Command {
        constructor() {
            super(...arguments);
            this.name = "help";
            this.description = "Displays a list of commands";
        }
        async main() {
            let env = this.getEnv();
            let commands = Array.from(env.shell.getCommandInstances());
            await env.console.println(`Listing ${commands.length} commands:`);
            let out = [];
            let maxCmdLength = 0;
            for (let command of commands) {
                if (maxCmdLength < command.name.length) {
                    maxCmdLength = command.name.length;
                }
            }
            commands.sort((a, b) => {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            });
            for (let command of commands) {
                out.push(" - " +
                    command.name +
                    " ".repeat(maxCmdLength - command.name.length + 2) +
                    (command.description || "(no description provided)"));
            }
            await env.console.printLines(out);
            return 0;
        }
    }
    exports.Command_Help = Command_Help;
});
define("shell/commands/sys", ["require", "exports", "shell/command"], function (require, exports, command_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command_Reboot extends command_5.Command {
        constructor() {
            super(...arguments);
            this.name = "reboot";
            this.description = "Restarts the system";
        }
        async main(argv) {
            await this.systemRestart();
        }
    }
    exports.Command_Reboot = Command_Reboot;
    class Command_SysUpdate extends command_5.Command {
        constructor() {
            super(...arguments);
            this.name = "sysupdate";
            this.description = "Downloads and installs the latest version of the operating system file";
        }
        async main(argv) {
            let env = this.getEnv();
            await env.console.println("Downloading...");
            let req = await fetch("bundle.js");
            let data = await req.text();
            await env.console.println(`System file downloaded (${(data.length / 1000).toPrecision(2)}kB)`);
            let previousSystemData = env.shell.vfs.readFile("/sys/main.js");
            await env.console.print(`This system update will take ${((data.length - previousSystemData.length) / 1000).toPrecision(2)} additional kB. Type "y" to continue: `);
            let userConfirm = (await env.shell.getUserInput()) === "y";
            if (!userConfirm) {
                await env.console.println("Operation cancelled by user.");
                return;
            }
            await env.console.println("Installing new system file...");
            await this.sleep(1000);
            env.shell.vfs.writeFile("/sys/main.js", data);
            await env.console.println("Installed, rebooting...");
            await this.sleep(1000);
            this.systemRestart();
        }
    }
    exports.Command_SysUpdate = Command_SysUpdate;
});
define("shell/commands/spanishdict", ["require", "exports", "shell/command"], function (require, exports, command_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command_SpanishDict extends command_6.Command {
        constructor() {
            super(...arguments);
            this.name = "sdict";
            this.description = "Searches spanishdict.com for the provided query";
        }
        async main(argv) {
            await this.openPage(`https://www.spanishdict.com/translate/${argv.join(" ")}`);
        }
    }
    exports.Command_SpanishDict = Command_SpanishDict;
});
define("shell/commands/testCommand", ["require", "exports", "shell/command"], function (require, exports, command_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TestCommand extends command_7.Command {
        constructor() {
            super(...arguments);
            this.name = "test-command";
        }
        async main(argv) {
            let console = this.getEnv().console;
            await console.println(JSON.stringify(argv));
            return 0;
        }
    }
    exports.TestCommand = TestCommand;
});
define("shell/commands/wikipedia", ["require", "exports", "shell/command"], function (require, exports, command_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command_Wikipedia extends command_8.Command {
        constructor() {
            super(...arguments);
            this.name = "wikipedia";
            this.description = "Searches Wikipedia for the given query";
        }
        async main(argv) {
            await this.openPage(`https://en.wikipedia.org/wiki/${argv.join(" ")}`);
        }
    }
    exports.Command_Wikipedia = Command_Wikipedia;
});
define("shell/commands/youtube", ["require", "exports", "shell/command"], function (require, exports, command_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Command_Youtube extends command_9.Command {
        constructor() {
            super(...arguments);
            this.name = "youtube";
            this.description = "Searches Youtube for the given query";
        }
        async main(argv) {
            if (argv.length > 0) {
                await this.openPage(`https://www.youtube.com/results?search_query=${argv.join(" ")}`);
            }
            else {
                await this.openPage(`https://www.youtube.com/`);
            }
        }
    }
    exports.Command_Youtube = Command_Youtube;
});
define("App", ["require", "exports", "react", "Console"], function (require, exports, react_2, Console_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_2 = __importDefault(react_2);
    function App() {
        let shell;
        return (react_2.default.createElement("div", { className: "main crt" },
            react_2.default.createElement(Console_1.CRTConsole, { ref: (el) => {
                } })));
    }
    exports.App = App;
});
define("index", ["require", "exports", "App"], function (require, exports, App_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    requirejs(["react", "react-dom"], function (React, ReactDOM) {
        ReactDOM.render(App_1.App(), document.getElementById("root"));
    });
});
define("sys", ["require", "exports", "shell/commands/clear", "shell/commands/fs", "shell/commands/google", "shell/commands/help", "shell/commands/spanishdict", "shell/commands/sys", "shell/commands/wikipedia", "shell/commands/youtube", "shell/shell", "shell/vfs"], function (require, exports, clear_1, fs_1, google_1, help_1, spanishdict_1, sys_1, wikipedia_1, youtube_1, shell_1, vfs_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class System {
        constructor() {
            this._console = null;
            this._shell = null;
            this.vfs = new vfs_3.VFS();
        }
        onBootInit() {
            // set environment
        }
        bindConsoleInterface(consoleInterface) {
            this._console = consoleInterface;
        }
        initShell() {
            this._shell = new shell_1.VirtualShell(this.getConsole());
            this._shell
                .registerCommand(help_1.Command_Help)
                .registerCommand(clear_1.Command_Clear)
                .registerCommand(spanishdict_1.Command_SpanishDict)
                .registerCommand(wikipedia_1.Command_Wikipedia)
                .registerCommand(google_1.Command_Google)
                .registerCommand(youtube_1.Command_Youtube)
                .registerCommand(fs_1.Command_LS)
                .registerCommand(fs_1.Command_CD)
                .registerCommand(fs_1.Command_CAT)
                .registerCommand(fs_1.Command_RM)
                .registerCommand(fs_1.Command_DiskUtil)
                .registerCommand(sys_1.Command_Reboot)
                .registerCommand(sys_1.Command_SysUpdate);
            this._shell.init();
        }
        getShell() {
            if (!this._shell)
                throw new Error("Shell has not been initialized!");
            return this._shell;
        }
        getConsole() {
            if (!this._console)
                throw new Error("Console has not been initialized!");
            return this._console;
        }
    }
    exports.System = System;
});
