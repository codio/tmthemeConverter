// .tmtheme to CodeMirror theme converter.


var dashdash = require('dashdash');
var fs = require('fs');
var path = require('path');

var tm = require('./lib/tm');
var cm = require('./lib/cm');

var options = [
  {
    names: ['help', 'h'],
    type: 'bool',
    help: 'Print this help and exit.'
  },
  {
    names: ['output', 'o'],
    type: 'string',
    help: 'Folder to output the theme. Defaults to the current directory',
    default: './',
    helpArg: 'OUTPUT'
  }
];

var parser = dashdash.createParser({options: options});

try {
  var opts = parser.parse(process.argv);
} catch (e) {
  console.error('Error: %s', e.message);
  process.exit(1);
}

if (opts.help) {
  printHelp();
  process.exit(0);
}

if (!opts._args) {
  printHelp();
  process.exit(1);
}

// Actual action is happening here:
var source = opts._args[0];
var filename = path.basename(source);
var outputFile = path.join(opts.output, filename.replace(/\.tmtheme/i,  '.css'));

var input = fs.readFile(source, function (err, content) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  console.log('Read file from: ' + filename);
  var parsed = tm.parse(content.toString());
  var cssTheme = cm.create(parsed);

  console.log('Writing file to: ' + outputFile);
  console.log(cssTheme);
  fs.writeFile(outputFile, cssTheme);
});




function printHelp() {
  var help = parser.help({includeEnv: true}).trimRight();
  console.log('Usage: node index.js [OPTIONS] [INPUT]\n'
              + 'options:\n'
              + help);
}