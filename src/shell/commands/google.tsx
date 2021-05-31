import { Command } from "../command";

export class Command_Google extends Command {
    name = "google";
    description = "Searches Google for the provided query. If the -i flag is provided, search Google Images";

    async main(argv: string[]) {
        let useGI = false;
        if (argv[0] === "-i") {
            argv = argv.slice(1);
            useGI = true;
        }
        await this.openPage(`https://www.google.com/search?q=${argv.join("+")}` + (useGI ? "&tbm=isch" : ""));
    }
}
