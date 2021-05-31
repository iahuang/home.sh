import React from "react";
import { CRTConsole } from "./Console";
import { Command_Clear } from "./shell/commands/clear";
import { Command_Google } from "./shell/commands/google";
import { Command_Help } from "./shell/commands/help";
import { Command_SpanishDict } from "./shell/commands/spanishdict";
import { TestCommand as Command_Test } from "./shell/commands/testCommand";
import { Command_Wikipedia } from "./shell/commands/wikipedia";
import { VirtualShell } from "./shell/shell";

export function App() {
    let shell;
    return (
        <div className="main crt">
            <CRTConsole
                ref={(el) => {
                    shell = new VirtualShell(el!);
                    shell
                        .registerCommand(Command_Test)
                        .registerCommand(Command_Help)
                        .registerCommand(Command_Clear)
                        .registerCommand(Command_SpanishDict)
                        .registerCommand(Command_Wikipedia)
                        .registerCommand(Command_Google);
                    shell.init();
                }}
            ></CRTConsole>
        </div>
    );
}
