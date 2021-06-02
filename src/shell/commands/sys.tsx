import { Command } from "../command";

export class Command_Reboot extends Command {
    name = "reboot";
    description = "Restarts the system";

    async main(argv: string[]) {
        await this.systemRestart();
    }
}

export class Command_SysUpdate extends Command {
    name = "sysupdate";
    description = "Downloads and installs the latest version of the operating system file";

    async main(argv: string[]) {
        let env = this.getEnv();

        await env.console.println("Downloading...");

        let req = await fetch("bundle.js");
        let data = await req.text();

        await env.console.println(`System file downloaded (${(data.length / 1000).toPrecision(2)}kB)`);
        let previousSystemData = env.shell.vfs.readFile("/sys/main.js")!;
        await env.console.print(
            `This system update will take ${((data.length - previousSystemData.length) / 1000).toPrecision(
                2
            )} additional kB. Type "y" to continue: `
        );
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
