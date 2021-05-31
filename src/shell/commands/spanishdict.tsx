import { Command } from "../command";

export class Command_SpanishDict extends Command {
    name = "sdict";

    async main(argv: string[]) {
        window.location.href = `https://www.spanishdict.com/translate/${argv.join(" ")}`;
        await this.sleep(1000);
    }
}