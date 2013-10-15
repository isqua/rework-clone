exports = module.exports = function (options) {
  return function clone(style) {
    return new Clone(style, options || {})
  }
}

var rules, regexp;

function Clone (style, options) {
  regexp = options.regexp || /^(clone|copy)?$/i
  var clones, properties;
  rules = style.rules;
  rules.forEach(function (rule) {
    if (rule.type === 'media') {
      return rule.rules.forEach(processing);
    }
    if (rule.type !== 'rule') {
      return;
    }
    processing(rule);
  });
}

function processing (rule) {
  var clones, properties;
  clones = getClones(rule.declarations);
  if (clones.length !== 0) {
    properties = getProperties(rules, clones);
    duplicateProperties(rule, properties);
  }
}

function getClones (declarations) {
  var clones = [], i, dec;
  for (i = 0; i < declarations.length; i++) {
    dec = declarations[i];
    if (regexp.test(dec.property)) {
      clones.push(dec.value);
      declarations.splice(i--, 1);
    }
  }
  return clones;
}

function getProperties (rules, selectors) {
  var declarations = [];
  rules.forEach(function (rule) {
    if (rule.selectors && rule.selectors.length > 0) {
      selectors.forEach(function (selector) {
        if (rule.selectors.indexOf(selector) !== -1) {
          declarations = declarations.concat(rule.declarations);
        }
      });
    }
  });
  return declarations;
}

function duplicateProperties (item, declarations) {
  item.declarations = declarations.concat(item.declarations);
}

