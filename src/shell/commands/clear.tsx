import { Command } from "../command";

export class Command_Clear extends Command {
    name = "clear";

    async main() {
        await this.getEnv().console.clear();
        return 0;
    }
}
