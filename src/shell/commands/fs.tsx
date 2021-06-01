import { Command } from "../command";
import { VFSPath } from "../vfs";

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
        } else {
            vfs.cwd = new VFSPath(where).toAbsolute(vfs.cwd);
        }
    }
}
