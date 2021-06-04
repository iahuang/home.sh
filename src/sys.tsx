import { CRTConsole } from "./Console";
import { Command_Clear } from "./shell/commands/clear";
import { Command_LS, Command_CD, Command_CAT, Command_RM, Command_DiskUtil } from "./shell/commands/fs";
import { Command_Google } from "./shell/commands/google";
import { Command_Help } from "./shell/commands/help";
import { Command_SpanishDict } from "./shell/commands/spanishdict";
import { Command_Reboot, Command_SysUpdate } from "./shell/commands/sys";
import { Command_Wikipedia } from "./shell/commands/wikipedia";
import { Command_Youtube } from "./shell/commands/youtube";
import { VirtualShell } from "./shell/shell";
import { VFS } from "./shell/vfs";

export class System {
    private _console: CRTConsole | null;
    vfs: VFS;
    private _shell: VirtualShell | null;

    constructor() {
        this._console = null;
        this._shell = null;
        this.vfs = new VFS();
    }

    onBootInit() {
        // set environment
    }

    bindConsoleInterface(consoleInterface: CRTConsole) {
        this._console = consoleInterface;
    }

    initShell() {
        this._shell = new VirtualShell(this.getConsole());
        this._shell
            .registerCommand(Command_Help)
            .registerCommand(Command_Clear)
            .registerCommand(Command_SpanishDict)
            .registerCommand(Command_Wikipedia)
            .registerCommand(Command_Google)
            .registerCommand(Command_Youtube)
            .registerCommand(Command_LS)
            .registerCommand(Command_CD)
            .registerCommand(Command_CAT)
            .registerCommand(Command_RM)
            .registerCommand(Command_DiskUtil)
            .registerCommand(Command_Reboot)
            .registerCommand(Command_SysUpdate);
        this._shell.init();
    }

    getShell() {
        if (!this._shell) throw new Error("Shell has not been initialized!");
        return this._shell;
    }

    getConsole() {
        if (!this._console) throw new Error("Console has not been initialized!");
        return this._console;
    }
}
