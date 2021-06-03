import { CRTConsole } from "../Console";
import { Command } from "./command";
import { VFS } from "./vfs";

export class VirtualShell {
    console: CRTConsole;

    private _commands = new Map<string, Command>();
    private _halted = false;

    vfs: VFS;

    _userInputOnEnterCallback: Function | null = null;
    _busy = false; // true if currently executing a command

    constructor(con: CRTConsole) {
        this.console = con;
        this.vfs = new VFS();
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
        await this.console.println(`No command was found with the name "${name}".`);
    }

    async handleCommandEntry(input: string) {
        this._busy = true;
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
                let exitCode = await command._launcher(command._parseArgv(argstring));
            } else {
                await this.handleInvalidCommand(commandName);
            }
        }
        this._busy = false;
        if (!this._halted) await this.promptNextCommand();
    }

    async init() {
        /* Begin a shell session */

        // register event listener
        this.console.preEventIntercept = (event) => {
            if (event.key === "Enter") {
                if (!this._busy) this.handleCommandEntry(this.console.getUserTypedString());

                if (this._userInputOnEnterCallback) this._userInputOnEnterCallback();
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
            'Type "help" for a list of commands.',
        ]);
        if (!this._halted) await this.promptNextCommand();
        (window as any).shell = this;
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

    async promptNextCommand() {
        await this.console.print(this.vfs.cwd + "$ ");
    }

    async getUserInput() {
        return new Promise((resolve, reject) => {
            this._userInputOnEnterCallback = () => {
                this._userInputOnEnterCallback = null;
                let typed = this.console.getUserTypedString();
                this.console.println("").then(() => {
                    resolve(typed);
                });
            };
        });

    }

    _halt() {
        this._halted = true;
        this.console.disableInput();
    }
}
