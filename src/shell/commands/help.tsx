import { Command } from "../command";

export class Command_Help extends Command {
    name = "help";

    async main() {
        let env = this.getEnv();
        let commands = Array.from(env.shell.getCommandInstances());

        await env.console.println(`Listing ${commands.length} commands:`);

        await env.console.printLines(commands.map((cmd) => " - "+cmd.name).sort());
        await env.console.println("");

        return 0;
    }
}
