import { Command } from "../command";

export class Command_SpanishDict extends Command {
    name = "sdict";
    description = "Searches spanishdict.com for the provided query";

    async main(argv: string[]) {
        await this.openPage(`https://www.spanishdict.com/translate/${argv.join(" ")}`);
    }
}
