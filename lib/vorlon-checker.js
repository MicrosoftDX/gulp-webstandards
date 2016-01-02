'use strict';

var VORLON = require('../vendor/vorlon'),
  CSSJS = require('../vendor/css'),
  jsdom = require('jsdom').jsdom;

function initialiseRuleSummary (rule, analyze) {
  var current = analyze.results, id = '',
    tokens = rule.id.split('.');
  current.rules = current.rules || {};
  tokens.forEach(function (t) {
    id = id.length > 0 ? '.' + t : t;

    if (!current.rules) {
      current.rules = {};
    }

    if (!current.rules[t]) {
      current.rules[t] = {'id': id};
    }

    current = current.rules[t];
  });

  if (current.failed === undefined) {
    current.failed = false;
    current.title = rule.title;
    current.description = rule.description;
  }

  return current;
}

function prepareAnalyze (analyze) {
  var cssrule, current, n, scriptrule;

  for (n in VORLON.WebStandards.Rules.CSS) {
    cssrule = VORLON.WebStandards.Rules.CSS[n];
    if (cssrule) {
      current = initialiseRuleSummary(cssrule, analyze);
      if (cssrule.prepare) {
        cssrule.prepare(current, analyze);
      }
    }
  }

  for (n in VORLON.WebStandards.Rules.JavaScript) {
    scriptrule = VORLON.WebStandards.Rules.JavaScript[n];
    if (scriptrule) {
      current = initialiseRuleSummary(scriptrule, analyze);
      if (scriptrule.prepare) {
        scriptrule.prepare(current, analyze);
      }
    }
  }
}

function endAnalyze (analyze) {
  var rule, current, n, scriptrule;

  for (n in VORLON.WebStandards.Rules.DOM) {
    rule = VORLON.WebStandards.Rules.DOM[n];
    if (rule && !rule.generalRule && rule.endcheck) {
      current = initialiseRuleSummary(rule, analyze);
      rule.endcheck(current, analyze);
    }
  }

  for (n in VORLON.WebStandards.Rules.JavaScript) {
    scriptrule = VORLON.WebStandards.Rules.JavaScript[n];
    if (scriptrule) {
      current = initialiseRuleSummary(scriptrule, analyze);
      if (scriptrule.endcheck) {
        scriptrule.endcheck(current, analyze);
      }
    }
  }

  return analyze;
}

function analyzeCssDocument (url, content, analyze) {
  var parser = new CSSJS(),
    parsed = parser.parseCSS(content),
    n, rule, current;

  // we index rules based on target node types
  for (n in VORLON.WebStandards.Rules.CSS) {
    rule = VORLON.WebStandards.Rules.CSS[n];
    if (rule) {
      current = initialiseRuleSummary(rule, analyze);
      rule.check(url, parsed, current, analyze);
    }
  }
}

function analyzeJsDocument (url, content, analyze) {
  var n, rule, current;

  for (n in VORLON.WebStandards.Rules.JavaScript) {
    rule = VORLON.WebStandards.Rules.JavaScript[n];
    if (rule) {
      current = initialiseRuleSummary(rule, analyze);
      rule.check(url, content, current, analyze);
    }
  }
}

function applyDOMNodeRule (node, rule, analyze, htmlContent) {
  var current = initialiseRuleSummary(rule, analyze);
  rule.check(node, current, analyze, htmlContent);
}

function analyzeDOMNode (node, rules, analyze, htmlContent) {
  var domnode, i, scriptType, hasContent,
    specificRules = rules.domRulesIndex[node.nodeName.toUpperCase()];

  if (node.nodeName === 'STYLE') {
    analyzeCssDocument('inline', node.innerHTML, analyze);
  }
  if (node.nodeName === 'SCRIPT') {
    domnode = node;
    scriptType = domnode.getAttribute('type');
    hasContent = domnode.innerHTML.trim().length > 0;
    if (!scriptType || scriptType === 'text/javascript' && hasContent) {
      analyzeJsDocument('inline', domnode.innerHTML, analyze);
    }
  }

  if (specificRules && specificRules.length) {
    specificRules.forEach(function (r) {
      applyDOMNodeRule(node, r, analyze, htmlContent);
    });
  }
  if (rules.domRulesForAllNodes && rules.domRulesForAllNodes.length) {
    rules.domRulesForAllNodes.forEach(function (r) {
      applyDOMNodeRule(node, r, analyze, htmlContent);
    });
  }

  for (i = 0; i < node.childNodes.length; i++) {
    analyzeDOMNode(node.childNodes[i], rules, analyze, htmlContent);
  }
}

function analyzeDOM (document, htmlContent, analyze) {
  var generalRules = [],
    commonRules = [],
    rules = {
      'domRulesIndex': {},
      'domRulesForAllNodes': []
    },
    n, rule, rulecheck;
  // we index rules based on target node types
  for (n in VORLON.WebStandards.Rules.DOM) {
    rule = VORLON.WebStandards.Rules.DOM[n];
    if (rule) {
      rulecheck = initialiseRuleSummary(rule, analyze);
      if (rule.prepare) {
        rule.prepare(rulecheck, analyze);
      }
      if (rule.generalRule) {
        generalRules.push(rule);
      }
      else {
        commonRules.push(rule);
        if (rule.nodeTypes.length) {
          rule.nodeTypes.forEach(function (n) {
            n = n.toUpperCase();
            if (!rules.domRulesIndex[n]) {
              rules.domRulesIndex[n] = [];
            }
            rules.domRulesIndex[n].push(rule);
          });
        }
        else {
          rules.domRulesForAllNodes.push(rule);
        }
      }
    }
  }

  analyzeDOMNode(document, rules, analyze, htmlContent);
  generalRules.forEach(function (rule) {
    applyDOMNodeRule(document, rule, analyze, htmlContent);
  });
}

exports.checkJavaScript = function (content) {
  var analyze = {
      'results': {},
      'rules': {},
      'doctype': {
        'html': null,
        'name': null,
        'publicId': null,
        'systemId': null
      },
      'files': {
        'scripts': {},
        'stylesheets': {}
      }
    }, n, scriptrule, current;

  for (n in VORLON.WebStandards.Rules.JavaScript) {
    scriptrule = VORLON.WebStandards.Rules.JavaScript[n];
    if (scriptrule) {
      current = initialiseRuleSummary(scriptrule, analyze);
      if (scriptrule.prepare) {
        scriptrule.prepare(current, analyze);
      }
    }
  }

  analyzeJsDocument('inline', content, analyze);

  for (n in VORLON.WebStandards.Rules.JavaScript) {
    scriptrule = VORLON.WebStandards.Rules.JavaScript[n];
    if (scriptrule) {
      current = initialiseRuleSummary(scriptrule, analyze);
      if (scriptrule.endcheck) {
        scriptrule.endcheck(current, analyze);
      }
    }
  }

  return analyze.results;
};

exports.checkCSS = function (content) {
  var analyze = {
      'results': {},
      'rules': {},
      'doctype': {
        'html': null,
        'name': null,
        'publicId': null,
        'systemId': null
      },
      'files': {
        'scripts': {},
        'stylesheets': {}
      }
    }, n, cssrule, current;

  for (n in VORLON.WebStandards.Rules.CSS) {
    cssrule = VORLON.WebStandards.Rules.CSS[n];
    if (cssrule) {
      current = initialiseRuleSummary(cssrule, analyze);
      if (cssrule.prepare) {
        cssrule.prepare(current, analyze);
      }
    }
  }

  analyzeCssDocument(null, content, analyze);

  for (n in VORLON.WebStandards.Rules.CSS) {
    cssrule = VORLON.WebStandards.Rules.CSS[n];
    if (cssrule) {
      current = initialiseRuleSummary(cssrule, analyze);
      if (cssrule.endcheck) {
        cssrule.endcheck(current, analyze);
      }
    }
  }

  return analyze.results;
};

exports.checkHTML = function (content) {
  var analyze = {
      'results': {},
      'rules': {},
      'doctype': {
        'html': null,
        'name': null,
        'publicId': null,
        'systemId': null
      },
      'files': {
        'scripts': {},
        'stylesheets': {}
      }
    },
    doc = jsdom(content, {
      'features': {
        'FetchExternalResources': false,
        'ProcessExternalResources': false,
        'SkipExternalResources': false
      }
    }),
    document = doc.defaultView.document,
    node = document.doctype;

  prepareAnalyze(analyze);

  if (node) {
    analyze.doctype = {
      'html': '<!DOCTYPE '
        + node.name
        + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
        + (!node.publicId && node.systemId ? ' SYSTEM' : '')
        + (node.systemId ? ' "' + node.systemId + '"' : '')
        + '>',
      'name': node.name,
      'publicId': node.publicId,
      'systemId': node.systemId
    };
  }

  analyze.html = document.documentElement.outerHTML;

  analyzeDOM(document, content, analyze);

  analyze = endAnalyze(analyze);

  return analyze.results;
};
