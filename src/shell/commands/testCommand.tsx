import { Command } from "../command";

export class TestCommand extends Command {
    name = "test-command";

    async main(argv: string[]) {
        let console = this.getEnv().console;
        await console.println(JSON.stringify(argv));
        return 0;
    }
}
