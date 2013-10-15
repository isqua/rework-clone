exports = module.exports = function (options) {
  return function clone(style) {
    return new Clone(style, options || {})
  }
}

function Clone (style, options) {
  var regexp = options.regexp || /^(clone|copy)?$/i
  var rules = style.rules;
  rules.forEach(function (rule) {
    if (rule.type === 'media') {
      return rule.rules.forEach(function (rrule) {
        processing(rules, regexp, rrule);
      });
    }
    if (rule.type !== 'rule') {
      return;
    }
    processing(rules, regexp, rule);
  });
}

function processing (rules, regexp, rule) {
  var clones = getClones(regexp, rule.declarations);
  if (clones.length !== 0) {
    rule.declarations = getProperties(rules, clones).concat(rule.declarations);
  }
}

function getClones (regexp, declarations) {
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
