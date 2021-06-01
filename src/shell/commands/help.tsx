import { Command } from "../command";

export class Command_Help extends Command {
    name = "help";
    description = "Displays a list of commands";

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

        commands.sort((a, b)=>{
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })

        for (let command of commands) {
            out.push(
                " - " +
                    command.name +
                    " ".repeat(maxCmdLength - command.name.length + 2) +
                    (command.description || "(no description provided)")
            );
        }

        await env.console.printLines(out);

        return 0;
    }
}
