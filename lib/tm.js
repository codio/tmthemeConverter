// Textmate theme parser

var plist = require('plist');
var _ = require('lodash');

// Map for scopes
var scopeMap = {
  color: '0.settings.color',
  background: '0.settings.background',
  cursor: '0.settings.caret',
  activeline: '0.settings.lineHighlight',
  selected: '0.settings.selection',
  comment: {
    scope: 'comment'
  },
  string: {
    scope: 'string'
  },
  number: {
    scope: 'constant.numeric'
  },
  keyword: {
    scope: 'keyword'
  },
  error: {
    scope: 'invalid'
  },
  invalidchar: {
    scope: 'invalid'
  },
  variable: {
    scope: 'variable'
  },
  'variable-2': {
    scope: 'entity.name'
  }
};

// Get path from an object
function getPath(obj, path) {
  var parts = path.split('.');
  return _.reduce(parts, function (result, part) {
    return result[part];
  }, obj);
}


exports.parse = function (raw) {
  // Replace `foreground` with `color`.
  raw = raw.replace(/foreground/g, 'color');

  var parsedPlist = plist.parseStringSync(raw);
  var settings = parsedPlist.settings;
  var result = {};

  result.name = parsedPlist.name;
  result.scopes = {};

  _.forEach(scopeMap, function (path, scope) {
    if (_.isObject(path)) {
      var val = _(settings).find(function (setting) {
        if (!setting.scope) {
          return;
        };

        var scopes = _(setting.scope.split(',')).map(function(scope) {
          return scope.trim();
        });

        return _(scopes).find(function (scope) {
          return scope.indexOf(path.scope) === 0;
        });
      });

      if (val) {
        return result.scopes[scope] = val.settings;
      }
    }

    result.scopes[scope] = getPath(settings, path);
  });


  return result;

};