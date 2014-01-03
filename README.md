# Textmate to CodeMirror theme converter

This Node script will accept any TextMate Theme and convert it into a plain CSS file, suitable for use with [CodeMirror](http://codemirror.net/).


## Usage

```bash
$ node index.js [PATH_TO_tmTHEME_FILE]
```

Example:

```bash
$ node index.js textmate.tmTheme
```

The following options are supported:

- `-n NAME, --name=NAME` - Name of the theme. Defaults to the filename that is being converted.
- `-o OUTPUT, --output=OUTPUT` - Folder to output the theme. Defaults to the current directory.


## Using in Codio

If you have a theme that you would like to see included in [Codio](https://codio.com), then [drop us a line](mailto:help@codio.com) and we will try our best to make it available for you.
