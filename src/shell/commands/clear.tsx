import { Command } from "../command";

export class Command_Clear extends Command {
    name = "clear";
    description = "Clears the terminal";

    async main() {
        await this.getEnv().console.clear();
        return 0;
    }
}
