import { Command } from "../command";

export class Command_Youtube extends Command {
    name = "youtube";
    description = "Searches Youtube for the given query";

    async main(argv: string[]) {
        if (argv.length > 0) {
            await this.openPage(`https://www.youtube.com/results?search_query=${argv.join(" ")}`);
        } else {
            await this.openPage(`https://www.youtube.com/`);
        }
    }
}
