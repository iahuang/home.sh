import { Command } from "../command";
import { prefix as VFS_PREFIX, VFSPath } from "../vfs";

function sizeDescriptor(size: number) {
    const k = 1024;
    if (size >= k * k) {
        return (size / (k * k)).toFixed(1) + " MiB";
    }
    if (size >= k) {
        return (size / k).toFixed(1) + " KiB";
    }
    return size + " bytes";
}

export class Command_LS extends Command {
    name = "ls";
    description = "Lists the current files in this directory";

    async main(argv: string[]) {
        let env = this.getEnv();

        let vfs = env.shell.vfs;

        let path = argv[0];
        let where = path || vfs.cwd;

        let files = vfs.listdir(where).map((path) => new VFSPath(path));

        await env.console.printLines(
            files.map((path) => {
                if (vfs.isDir(path)) {
                    return path.end + "/";
                }
                return path.end;
            })
        );
    }
}

export class Command_CD extends Command {
    name = "cd";
    description = "Changes the current working directory, defaulting to the root directory if not provided.";

    async main(argv: string[]) {
        let env = this.getEnv();

        let vfs = env.shell.vfs;

        let path = argv[0];
        let where = path || "/";

        if (!vfs.exists(where)) {
            await env.console.println("No such file or directory");
            return 1;
        } else {
            vfs.cwd = new VFSPath(where).toAbsolute(vfs.cwd);
        }
    }
}

export class Command_CAT extends Command {
    name = "cat";
    description = "Prints the entire contents of a file";

    async main(argv: string[]) {
        let env = this.getEnv();

        let vfs = env.shell.vfs;

        let path = argv[0];

        let data = vfs.readFile(path);
        await env.console._print((data || "") + "\n");
    }
}

export class Command_RM extends Command {
    name = "rm";
    description = "Deletes a file or directory";

    async main(argv: string[]) {
        let env = this.getEnv();
        let vfs = env.shell.vfs;
        let path = argv[0];
        vfs.delete(path);
    }
}

export class Command_DiskUtil extends Command {
    name = "diskutil";
    description = "A disk utility tool";

    async main(argv: string[]) {
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
        } else if (mode === "clean") {
            let confirmed = argv[1] === "-y";

            if (!confirmed) {
                await env.console.println("Warning: This action is irreversible! To confirm, do\ndiskutil clear -y");
            } else {
                await env.console.println("Clearing disk...");
                await this.sleep(500);
                localStorage.clear();
                await env.console.clear();
                location.reload();
            }
        } else if (mode === "validate") {
            for (let ent of vfs.registry._entityTable.values()) {
                if (localStorage.getItem(VFS_PREFIX + JSON.stringify(ent)) === null) {
                    await env.console.println(
                        "Error: Filesystem entity at path " +
                            vfs.pathOfEntity(ent) +
                            " is formatted incorrectly or does not exist on disk!"
                    );
                }

                // make sure each entity is connected to the root

                let i = 0;
                let currNode = ent;

                while (currNode.id !== vfs.registry.getRoot().id) {
                    let newEnt = vfs.registry.getEntity(currNode.parent);
                    if (!newEnt) {
                        await env.console.println(
                            `Error: Filesystem entity has invalid/nonexistent parent with ID "${location}"`
                        );
                    }
                    currNode = newEnt;
                    if (i > 999) {
                        await env.console.println(
                            "Warning: Filesystem check exceeded maximum depth. Possible circular reference?"
                        );
                        break;
                    }
                    i += 1;
                }
            }
            await env.console.println("Disk validation finished successfully.");
        } else {
            await env.console.println("Unknown mode");
            return 1;
        }
    }
}
