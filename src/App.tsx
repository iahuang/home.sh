import React from "react";
import { CRTConsole } from "./Console";
import { Command_Help } from "./shell/commands/help";
import { TestCommand as Command_Test } from "./shell/commands/testCommand";
import { VirtualShell } from "./shell/shell";

export function App() {
    let shell;
    return (
        <div className="main crt">
            <CRTConsole
                ref={(el) => {
                    shell = new VirtualShell(el!);
                    shell.registerCommand(Command_Test).registerCommand(Command_Help);
                    shell.init();
                }}
            ></CRTConsole>
        </div>
    );
}
