// CodeMirror theme creator
//
//
// Sample theme from codemirror:
//
// /* Default THEME */
//
// .cm-s-3024-day.CodeMirror {background: #f7f7f7; color: #3a3432;}
// .cm-s-3024-day div.CodeMirror-selected {background: #d6d5d4 !important;}
// .cm-s-3024-day .CodeMirror-gutters {background: #f7f7f7; border-right: 0px;}
// .cm-s-3024-day .CodeMirror-linenumber {color: #807d7c;}
// .cm-s-3024-day .CodeMirror-cursor {border-left: 1px solid #5c5855 !important;}
//
// .cm-s-default .cm-keyword {color: #708;}
// .cm-s-default .cm-atom {color: #219;}
// .cm-s-default .cm-number {color: #164;}
// .cm-s-default .cm-def {color: #00f;}
// .cm-s-default .cm-variable {color: black;}
// .cm-s-default .cm-variable-2 {color: #05a;}
// .cm-s-default .cm-variable-3 {color: #085;}
// .cm-s-default .cm-property {color: black;}
// .cm-s-default .cm-operator {color: black;}
// .cm-s-default .cm-comment {color: #a50;}
// .cm-s-default .cm-string {color: #a11;}
// .cm-s-default .cm-string-2 {color: #f50;}
// .cm-s-default .cm-meta {color: #555;}
// .cm-s-default .cm-error {color: #f00;}
// .cm-s-default .cm-qualifier {color: #555;}
// .cm-s-default .cm-builtin {color: #30a;}
// .cm-s-default .cm-bracket {color: #997;}
// .cm-s-default .cm-tag {color: #170;}
// .cm-s-default .cm-attribute {color: #00c;}
// .cm-s-default .cm-header {color: blue;}
// .cm-s-default .cm-quote {color: #090;}
// .cm-s-default .cm-hr {color: #999;}
// .cm-s-default .cm-link {color: #00c;}
//
// .cm-negative {color: #d44;}
// .cm-positive {color: #292;}
// .cm-header, .cm-strong {font-weight: bold;}
// .cm-em {font-style: italic;}
// .cm-link {text-decoration: underline;}
//
// .cm-invalidchar {color: #f00;}
//
// div.CodeMirror span.CodeMirror-matchingbracket {color: #0f0;}
// div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #f22;}
// .CodeMirror-activeline-background {background: #e8f2ff;}


var _ = require('lodash');

// Create a css file
//
// theme - object
//
// Example theme:
//   {
//     name: 'default',
//     scopes: {
//       keyword: {
//         color: '#292',
//         background: '#eee'
//       }
//     }
//   }

function convertToCss(values) {
  return  _.reduce(values, function (result, value, name) {
    if (_.isEmpty(value)) {
      return result;
    }

    if (name === 'fontStyle') {
      if (value === 'italic') {
        return result += 'font-style: italic; ';
      } else if (value === 'bold') {
        return result += 'font-weight: bold; ';
      }
    }

    return result += name + ': ' + value + '; ';
  }, '');
}

// Get the codemirror class for a given scope name
function getCmClass(name, values) {
  switch (name) {
  case 'background':
    return '.CodeMirror { background: ' + values + '; }'
    break;
  case 'color':
    return '.CodeMirror { color: ' + values + '; }';
    break;
  case 'activeline':
    return ' .CodeMirror-activeline-background { background: ' + values  + '; }';
    break;
  case 'selected':
    return ' .CodeMirror-selected { background: ' + values + '; }';
    break;
  case 'cursor':
    return ' .cm-cursor { color: ' + values + '; }';
    break;
  default:
    return ' .cm-' + name + ' { ' + convertToCss(values) + '}';
  }
}

exports.create = function (theme) {
  console.log(JSON.stringify(theme));

  var cssClass = '.cm-s-' + theme.name;
  var result = '/* Theme: ' + theme.name + ' */\n\n'

  return _.reduce(theme.scopes, function (result, values, name) {
    return result + cssClass + getCmClass(name, values) + '\n';
  }, result);
};