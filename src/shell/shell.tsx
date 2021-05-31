import { CRTConsole } from "../Console";
import { Command } from "./command";

export class VirtualShell {
    console: CRTConsole;

    private _commands = new Map<string, Command>();
    private _halted = false;

    constructor(con: CRTConsole) {
        this.console = con;
    }

    registerCommand(commandConstructor: new () => Command) {
        let commandInstance = new commandConstructor();
        commandInstance.setExecutionEnvironment({ console: this.console, shell: this });
        this._commands.set(commandInstance.name, commandInstance);

        return this; // allow method chaining
    }

    getCommandInstances() {
        return this._commands.values();
    }

    currentTimeString() {
        /* Returns a US-formatted time string */

        return new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    async handleInvalidCommand(name: string) {
        this.console.println(`No command was found with the name "${name}".`);
    }

    async handleCommandEntry(input: string) {
        await this.console.println("");
        // check for commands

        input = input.trimStart();
        let commandName = input.split(" ")[0];

        if (commandName !== "") {
            let command = this._commands.get(commandName);

            // Run command
            if (command) {
                // get argstring (everything after the command name)
                let argstring = input.substring(commandName.length).trimLeft();
                let exitCode = await command.main(command._parseArgv(argstring));

                if (exitCode > 0) {
                    await this.console.println(`Program exited with exit code ${exitCode}`);
                }
            } else {
                await this.handleInvalidCommand(commandName);
            }
        }

        if (!this._halted) await this.prompt();
    }

    async init() {
        /* Begin a shell session */

        // register event listener
        this.console.preEventIntercept = (event) => {
            if (event.key === "Enter") {
                this.handleCommandEntry(this.console.getUserTypedString());
            }

            if (event.key === "Tab") {
                this.console.addTextAtCursor(this.console.state.autocomplete + " ");
                event.preventDefault();
            }
        };

        this.console.postEventCallback = (event) => {
            this.updateAutocomplete();
        };

        this.console.clear();
        await this.console.printLines([
            `Local time: ${this.currentTimeString()}`,
            'Type "help" for a list of commands.\n',
        ]);
        if (!this._halted) await this.prompt();
    }

    async updateAutocomplete() {
        let currText = this.console.getUserTypedString();

        if (currText.length > 0) {
            for (let cmdName of this._commands.keys()) {
                if (cmdName.startsWith(currText)) {
                    await this.console.setAutocomplete(cmdName.substring(currText.length));
                    return;
                }
            }
        }
        await this.console.clearAutocomplete();
    }

    async prompt() {
        await this.console.print("> ");
    }

    _halt() {
        this._halted = true;
        this.console.disableInput();
    }
}
