exports = module.exports = function (options) {
  return function clone(style) {
    return new Clone(style, options || {});
  };
};

function Clone (style, options) {
  var regexp = options.regexp || /^(clone|copy)?$/i,
  rules = style.rules,
  doProcess = function(rule) {
    return process(rules, regexp, rule);
  };
  rules = rules.map(function (rule) {
    if (rule.type === 'media') {
      rule.rules = rule.rules.map(doProcess);
      return rule;
    }
    if (rule.type === 'rule') {
      return doProcess(rule);
    }
  });
}

function process (rules, regexp, rule) {
  var clones = getClones(regexp, rule.declarations);
  rule.declarations = getProperties(rules, clones)
    .concat(rule.declarations)
    .filter(function (dec) {
      return !regexp.test(dec.property);
    });
  return rule;
}

function getClones (regexp, declarations) {
  return declarations.filter(function (dec) {
    return regexp.test(dec.property);
  }).map(function (dec) {
    return dec.value;
  });
}

function getProperties (rules, selectors) {
  var declarations = [];
  rules.filter(function (rule) {
    return rule.selectors && rule.selectors.length > 0;
  }).forEach(function (rule) {
    selectors.filter(function (selector) {
      return rule.selectors.indexOf(selector) !== -1;
    }).forEach(function (selector) {
      declarations = declarations.concat(rule.declarations);
    });
  });
  return declarations;
}
