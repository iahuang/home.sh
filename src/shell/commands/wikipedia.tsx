import { Command } from "../command";

export class Command_Wikipedia extends Command {
    name = "wikipedia";

    async main(argv: string[]) {
        window.location.href = `https://en.wikipedia.org/wiki/${argv.join(" ")}`;
    }
}
