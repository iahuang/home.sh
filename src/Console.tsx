/*
    The CRTConsole component represents
    a simple terminal emulator designed as a React component.
*/

import React from "react";
import { logText } from "./log_example";

interface IProps {}

interface IState {
    text: string;
    title: string;

    // cursor state
    cursorPosition: number;
    isCursorVisible: boolean;

    autocomplete: string;

    isTyping: boolean;

    allowInput: boolean;
}

function sleep(ms: number) {
    /* Asynchronous sleep function */
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class CRTConsole extends React.Component<IProps, IState> {
    // internal state
    lastKeystrokeTime: number;
    readonlyPoint: number;

    /* callbacks */

    // this function will be called every time
    // a keyboard event is observed by the console.
    // if this event returns true, the event's
    // default behaviour will be prevented.
    preEventIntercept: ((event: KeyboardEvent) => boolean | undefined | void) | null = null;

    postEventCallback: ((event: KeyboardEvent) => any) | null = null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            text: "".repeat(20),
            title: "bash",
            cursorPosition: 0,
            isCursorVisible: true,
            isTyping: false,
            autocomplete: "",
            allowInput: true,
        };
        this.lastKeystrokeTime = Date.now();
        this.readonlyPoint = 0;
    }

    componentDidMount() {
        // Register keystroke events
        window.addEventListener("keydown", async (event) => {
            await this.handleKeystroke(event);
        });

        (document.querySelector("console") as HTMLElement)?.focus();

        // Register animation loops
        setInterval(() => {
            this.setState({
                isCursorVisible: !this.state.isCursorVisible,
            });
            this.updateIsTypingState();
        }, 500);
        setInterval(() => {
            this.updateIsTypingState();
        }, 40);

        // Add reference of this object to the window, for debug purposes
        (window as any).crtConsole = this;
    }

    async disableInput() {
        await this.setState({ allowInput: false });
    }

    async enableInput() {
        await this.setState({ allowInput: true });
    }

    async handleKeystroke(event: KeyboardEvent) {
        /* Should be called on any keyboard event */

        if (this.preEventIntercept) {
            let preventDefault = this.preEventIntercept(event);
            if (preventDefault) {
                return;
            }
        }

        let key = event.key;

        if (key.length == 1) {
            await this.addTextAtCursor(key);
        }

        if (key === "Backspace") {
            if (this.state.cursorPosition > this.readonlyPoint) await this.backspaceAtCursor();
        }
        if (key === "ArrowRight") {
            await this.cursorRight();
        }
        if (key === "ArrowLeft") {
            await this.cursorLeft();
        }

        this.lastKeystrokeTime = Date.now();
        await this.updateIsTypingState();
        if (this.postEventCallback) await this.postEventCallback(event);
    }

    async updateIsTypingState() {
        /*
            This function checks whether typing has ceased long enough ago,
            and if so, resumes cursor blinking
        */

        await this.setState({
            // check if the time since last keystroke was less than half a second ago.
            isTyping: Date.now() - this.lastKeystrokeTime < 500,
        });
    }

    async cursorRight() {
        /* Moves the cursor right, limiting it to the length of the state text */

        await this.setState({
            cursorPosition: Math.min(this.state.cursorPosition + 1, this.state.text.length),
        });
    }

    async cursorLeft() {
        /* Moves the cursor right, limiting it to the "read only point" */

        await this.setState({
            cursorPosition: Math.max(this.readonlyPoint, this.state.cursorPosition - 1),
        });
    }

    async addTextAtCursor(text: string) {
        /* Writes text where the cursor is, as if being inputted by the user */

        await this.setState({
            text:
                this.state.text.substring(0, this.state.cursorPosition) +
                text +
                this.state.text.substring(this.state.cursorPosition),
            cursorPosition: this.state.cursorPosition + text.length,
        });
        this.lastKeystrokeTime = Date.now();
    }

    isCursorAtTextEnd() {
        /* Returns true if the cursor is located one character past the end of the text */

        return this.state.cursorPosition === this.state.text.length;
    }

    async printLines(lines: string[]) {
        /*
            Print an array of lines, with a slight delay between each one
        */
        let i = 0;
        for (let line of lines) {
            if (i !== 0) await this.print("\n");
            await this.print(line);
            await sleep(Math.random() * 30 + 10);
            i++;
        }
    }

    async print(text: string, readonly = true) {
        /*
            Analogous to any other print function. If readonly is set,
            the new text will not be user-editable
        */

        if (this.isCursorAtTextEnd()) {
            await this.setState({ cursorPosition: this.state.cursorPosition + text.length });
        }
        if (readonly) this.readonlyPoint = this.state.text.length + text.length;
        await this.setState({ text: this.state.text + text });

        // scroll to bottom
        document.querySelector(".console")!.scrollTop = document.querySelector(".console")!.scrollHeight;
    }

    async println(text: string) {
        await this.print(text + "\n");
    }

    async runDemoSequence() {
        /* Runs a cool looking loading sequence */

        this.clear();
        await this.print("BIOS version 1.26 build 2628");
        await sleep(1000);
        this.clear();
        await sleep(1000);

        let lineIndex = 0;
        let lines = logText.split("\n");

        for (let line of lines) {
            if (line !== "&PAUSE") {
                if (lineIndex !== 0) await this.print("\n");
                await this.print(line);
            } else {
                await sleep(Math.random() * 200 + 50);
            }
            await sleep(Math.random() * 30);
            lineIndex++;
        }
        await sleep(1000);
        this.clear();
    }

    async backspaceAtCursor() {
        /*
            This function emulates the user pressing the backspace key.
        */
        await this.setState({
            text:
                this.state.text.substring(0, this.state.cursorPosition - 1) +
                this.state.text.substring(this.state.cursorPosition),
            cursorPosition: this.state.cursorPosition - 1,
        });
    }

    async clear() {
        /*
            Clears the terminal, resetting most terminal state
            variables to their defaults.
        */

        await this.setState({
            text: "",
            cursorPosition: 0,
        });
        this.readonlyPoint = 0;
    }

    getUserTypedString() {
        /* Returns everything typed by the user, from the readonly point to the end of the text */
        return this.state.text.substr(this.readonlyPoint);
    }

    async setAutocomplete(text: string) {
        await this.setState({
            autocomplete: text,
        });
    }

    async clearAutocomplete() {
        await this.setAutocomplete("");
    }

    render() {
        /*
            Draws the terminal body
        */

        let text = this.state.text;

        let preCursor = <span>{text.substring(0, this.state.cursorPosition)}</span>;
        let atCursor: JSX.Element;

        // make atCursor
        if (this.state.isCursorVisible || this.state.isTyping) {
            atCursor = <span>{"▓"}</span>;
        } else {
            atCursor = <span>{text[this.state.cursorPosition] || " "}</span>;
            if (this.state.autocomplete && this.isCursorAtTextEnd()) {
                atCursor = <span className="console-autocomplete">{this.state.autocomplete[0]}</span>;
            }
        }
        let postCursor = <span>{text.substring(this.state.cursorPosition + 1)}</span>;

        return (
            <div className="console">
                {preCursor}
                {atCursor}
                {postCursor}
                <span className="console-autocomplete">
                    {this.state.autocomplete.substring(this.isCursorAtTextEnd() ? 1 : 0)}
                </span>
            </div>
        );
    }
}
