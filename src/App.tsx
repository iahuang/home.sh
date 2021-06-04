import React from "react";
import { CRTConsole } from "./Console";
import { Command_Clear } from "./shell/commands/clear";
import { Command_CAT, Command_CD, Command_DiskUtil, Command_LS, Command_RM } from "./shell/commands/fs";
import { Command_Google } from "./shell/commands/google";
import { Command_Help } from "./shell/commands/help";
import { Command_Reboot, Command_SysUpdate } from "./shell/commands/sys";
import { Command_SpanishDict } from "./shell/commands/spanishdict";
import { TestCommand as Command_Test } from "./shell/commands/testCommand";
import { Command_Wikipedia } from "./shell/commands/wikipedia";
import { Command_Youtube } from "./shell/commands/youtube";
import { VirtualShell } from "./shell/shell";

export function App() {
    let shell;
    return (
        <div className="main crt">
            <CRTConsole
                ref={(el) => {
                    
                }}
            ></CRTConsole>
        </div>
    );
}
