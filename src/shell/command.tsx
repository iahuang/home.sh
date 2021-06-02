import { CRTConsole } from "../Console";
import { VirtualShell } from "./shell";

export interface CommandExecutionEnvironment {
    console: CRTConsole;
    shell: VirtualShell;
}

export abstract class Command {
    abstract name: string;
    description: string | null = null;

    private _env: CommandExecutionEnvironment | null;

    constructor() {
        this._env = null;
    }

    setExecutionEnvironment(env: CommandExecutionEnvironment) {
        this._env = env;
    }

    getEnv() {
        if (!this._env) throw new Error("An execution environment has not been defined to this process!");
        return this._env;
    }

    async openPage(url: string) {
        await this.getEnv().console.println("Redirecting...");
        window.location.href = url;
        await new Promise((res, rej)=>{});
    }

    async sleep(ms: number) {
        /* simulate a Thread Sleep by using async/promises */
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async systemRestart() {
        await this.getEnv().console.clear();
        location.reload();
    }

    _parseArgv(argsString: string) {
        /*
            This method is used to parse everything after the command
            for instance, when invoking
            "rm -rf /"
            argsString is "-rf /" (Everything except the command name and the trailing space.)

            Should return an ARGV array.
        */

        let currArg = "";
        let args: string[] = [];

        let i = 0;

        let inString = false;
        let escapedCharacters = {
            [`\\"`]: `"`, // `\"` should be `"`
            [`\\ `]: " ", // `\ ` should be ` `
            [`\\\\`]: "\\", // `\\` should be `\`
        };

        let pushCurrArg = () => {
            if (currArg) args.push(currArg);
            currArg = "";
        };

        while (i < argsString.length) {
            let stringSubset = argsString.substring(i);

            // check if the next characters are one of the above escaped characters
            let escapeSequence: string | null = null;

            for (let escp of Object.keys(escapedCharacters)) {
                if (stringSubset.startsWith(escp)) {
                    escapeSequence = escp;
                }
            }

            // if an escape sequence match is found
            if (escapeSequence) {
                // consume the next characters
                i += escapeSequence.length;

                let interpretAs = (escapedCharacters as any)[escapeSequence];
                // add the literal character
                currArg += interpretAs;
            } else {
                // handle other characters

                let char = stringSubset[0];

                if (char === " " && !inString) {
                    pushCurrArg();
                } else if (char === '"') {
                    inString = !inString;
                } else {
                    currArg += char;
                }

                i++;
            }
        }
        pushCurrArg();
        return args;
    }

    // This function will be invoked when the command is used.
    // argv is a list of arguments passed to the command.
    // this function should return an exit code
    abstract main(argv: string[]): Promise<number | void>;

    async _launcher(argv: string[]) {
        try {
            return await this.main(argv);
        } catch (err) {
            await this.getEnv().console.println(err.stack);
            return 1;
        }
    }
}
