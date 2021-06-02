# home.sh

A browser homepage modeled after a Unix-based operating system.

![Screenshot](https://raw.githubusercontent.com/iahuang/home.sh/main/screenshots/1.png)

## Features

### Shortcuts

Home.sh features shortcut commands to quickly navigate you to the websites you use the most, such as Google, Youtube, and much more. For instance, `google -i blueberries` takes you to the Google Images page for "blueberries"
### Autocomplete

The Home.sh console features a command autocomplete system to allow you to get where you want to be even faster.

### Virtual File System
Home.sh features a fully featured file system with familiar commands such as `ls`, `cd`, and `cat`.

![Screenshot](https://raw.githubusercontent.com/iahuang/home.sh/main/screenshots/2.png)

### Bootloader
Because why not, the Home.sh program itself is a physical file on its own filesystem and is loaded on startup by an external bootloader. Modifying this file will actually impact the execution of the system upon next startup. 
![Screenshot](https://raw.githubusercontent.com/iahuang/home.sh/main/screenshots/3.png)

## Usage

```bash
$ npm install
$ tsc
```

Then, use an extension like [this](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia) to set the `index.html` file in this repository as your new homepage.
