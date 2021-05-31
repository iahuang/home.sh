import { Command } from "../command";

export class Command_Google extends Command {
    name = "google";
    description = "Searches Google for the provided query. If the -i flag is provided, search Google Images"

    async main(argv: string[]) {
        window.location.href = `https://www.google.com/search?q=${argv.join("+")}`;
    }
}
