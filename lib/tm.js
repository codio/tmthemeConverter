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
  'string-2': {
    scope: 'support.constant'
  },
  property: {
    scope: 'support.type'
  },
  qualifier: {
    scope: 'entity.name.class'
  },
  tag: {
    scope: 'entity.name.tag'
  },
  attribute: {
    scope: 'entity.other.attribute-name'
  },
  number: {
    scope: 'constant.numeric'
  },
  keyword: {
    scope: 'keyword'
  },
  operator: {
    scope: 'keyword.operator'
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

function parseSettings(settings) {
  var finalScopes = {};

  _.forEach(scopeMap, function (value, key) {
    if (_.isObject(value)) {

      // Find the scope in the settings
      var val = _(settings).find(function (setting) {
        if (!setting.scope || setting.scope === 'none') {
          return;
        }

        var scopes = _(setting.scope.split(',')).map(function(sc) {
          return sc.trim();
        });

        return _(scopes).find(function (sc) {
          console.log('SC:', sc, value.scope, sc === value.scope)
          return sc === value.scope;
        });
      });

      if (val) {
        return finalScopes[key] = val.settings;
      } else {

        // Find the scope in the settings
        var val = _(settings).find(function (setting) {
          if (!setting.scope || setting.scope === 'none') {
            return;
          }

          var scopes = _(setting.scope.split(',')).map(function(sc) {
            return sc.trim();
          });

          return _(scopes).find(function (sc) {
            return sc.indexOf(value.scope) === 0;
          });
        });

        if (val) {
          return finalScopes[key] = val.settings;
        } else {
          return;
        }
      }
    }

    finalScopes[key] = getPath(settings, value);
  });

  return finalScopes;
};


exports.parse = function (raw) {
  // Replace `foreground` with `color`.
  raw = raw.replace(/foreground/g, 'color');

  var parsedPlist = plist.parseStringSync(raw);

  var result = {};
  result.name = parsedPlist.name;
  result.scopes = parseSettings(parsedPlist.settings);
  result.gutter = parsedPlist.gutterSettings;

  return result;
}
