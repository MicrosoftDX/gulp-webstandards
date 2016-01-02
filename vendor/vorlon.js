var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.deviceIcons = {
                    id: "mobileweb.deviceIcons",
                    title: "define platform icons",
                    description: "Platform icons helps user pinning your website with an icon that fits well on mobile device home.",
                    nodeTypes: ["meta", "link"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                        rulecheck.data = {
                            hasWindowsIcons: false,
                            hasWindowsNotification: false,
                            hasIOSIcons: false
                        };
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        if (node.nodeName == "LINK") {
                            var rel = node.getAttribute("rel");
                            if (rel && rel == "apple-touch-icon-precomposed") {
                                rulecheck.data.hasIOSIcons = true;
                            }
                        }
                        else if (node.nodeName == "META") {
                            var name = node.getAttribute("name");
                            if (name) {
                                if (name.toLowerCase() == "msapplication-notification") {
                                    rulecheck.data.hasWindowsNotification = true;
                                }
                                else if (name.toLowerCase().indexOf("msapplication-") == 0) {
                                    rulecheck.data.hasWindowsIcons = true;
                                }
                            }
                        }
                    },
                    endcheck: function (rulecheck, analyzeSummary) {
                        if (!rulecheck.data.hasIOSIcons) {
                            rulecheck.failed = true;
                            rulecheck.items.push({
                                title: VORLON.Tools.htmlToString('add Apple - iOS icons by adding link tags like <link rel="apple-touch-icon-precomposed" href="youricon" sizes="57x57" />')
                            });
                        }
                        if (!rulecheck.data.hasWindowsIcons) {
                            rulecheck.failed = true;
                            //https://msdn.microsoft.com/en-us/library/dn255024(v=vs.85).aspx
                            rulecheck.items.push({
                                title: VORLON.Tools.htmlToString('add Microsoft - Windows tiles by adding meta tags like <link name="msapplication-square150x150logo" content="yourimage" />')
                            });
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));

var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var CSS;
            (function (CSS) {
                CSS.mobileMediaqueries = {
                    id: "mobileweb.usemediaqueries",
                    title: "use responsive web design (media queries)",
                    description: "Even if your website targets only certain devices, you may have users with unexpected devices or screen ratio.",
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                        if (!rulecheck.data) {
                            rulecheck.data = {
                                cssnbqueries: 0,
                                domnbqueries: 0
                            };
                        }
                    },
                    check: function (url, ast, rulecheck, analyzeSummary) {
                        //console.log("check css prefixes");
                        this.checkNodes(url, rulecheck, ast);
                    },
                    checkNodes: function (url, rulecheck, ast) {
                        if (!ast)
                            return;
                        ast.forEach(function (node, i) {
                            var nodeitem = null;
                            //scan content for media queries
                            if (node.type === "media") {
                                var media = node.selector;
                                if (media) {
                                    media = media.toLowerCase();
                                    if (media.indexOf("width") >= 0 || media.indexOf("height") >= 0) {
                                        rulecheck.data.cssnbqueries++;
                                    }
                                }
                            }
                        });
                    },
                    endcheck: function (rulecheck, analyzeSummary) {
                    }
                };
            })(CSS = Rules.CSS || (Rules.CSS = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));
var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.mobileMediaqueries = {
                    id: "mobileweb.usemediaqueries",
                    title: "use responsive approaches",
                    description: "Even if your website target only certain devices, you may have users with unexpected devices or screen ratio.",
                    nodeTypes: ["link"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        if (!rulecheck.data) {
                            rulecheck.data = {
                                cssnbqueries: 0,
                                domnbqueries: 0
                            };
                        }
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlstring) {
                        if (!node.getAttribute)
                            return;
                        var rel = node.getAttribute("rel");
                        if (rel && rel.toLocaleLowerCase() == "stylesheet") {
                            var media = node.getAttribute("media");
                            if (media) {
                                media = media.toLowerCase();
                                if (media.indexOf("width") >= 0 || media.indexOf("height") >= 0) {
                                    rulecheck.data.domnbqueries++;
                                }
                            }
                        }
                    },
                    endcheck: function (rulecheck, analyzeSummary) {
                        //console.log("media queries css:" + rulecheck.cssnbqueries + ", dom:" + rulecheck.domnbqueries);
                        if (rulecheck.data.cssnbqueries == 0 && rulecheck.data.domnbqueries == 0) {
                            if (rulecheck.data.cssnbqueries == 0) {
                                rulecheck.failed = true;
                                rulecheck.items.push({
                                    title: 'your css (either files or inline) does not use any media queries'
                                });
                            }
                            if (rulecheck.data.domnbqueries == 0) {
                                rulecheck.failed = true;
                                rulecheck.items.push({
                                    title: 'your link tags does not use any media queries'
                                });
                            }
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));

var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.useViewport = {
                    id: "mobileweb.use-viewport",
                    title: "use meta viewport",
                    description: "Use meta viewport tag to choose how your website will get scaled on smaller devices like phones. Define at least &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;",
                    nodeTypes: ["meta"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.failed = true;
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        var viewportattr = node.getAttribute("name");
                        if (viewportattr && viewportattr.toLowerCase() == "viewport") {
                            rulecheck.failed = false;
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));

var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.dontUsePlugins = {
                    id: "webstandards.dont-use-plugins",
                    title: "not using object and embed",
                    description: "With HTML5, embed or object tags can often be replaced with HTML5 features.",
                    nodeTypes: ["EMBED", "OBJECT"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        //console.log("check for plugins");
                        var source = null, data = null, type = null;
                        var source = node.getAttribute("src");
                        if (source)
                            source = source.toLowerCase();
                        else
                            source = "";
                        var data = node.getAttribute("data");
                        if (data)
                            data = data.toLowerCase();
                        else
                            data = "";
                        var type = node.getAttribute("type");
                        if (type)
                            type = type.toLowerCase();
                        else
                            type = "";
                        if (source.indexOf(".swf") > 0 || data.indexOf("swf") > 0) {
                            rulecheck.failed = true;
                            rulecheck.items.push({ message: "consider using HTML5 instead of Flash", content: VORLON.Tools.htmlToString(node.outerHTML) });
                        }
                        else if (type.indexOf("silverlight") > 0) {
                            rulecheck.failed = true;
                            rulecheck.items.push({ message: "consider using HTML5 instead of Silverlight", content: VORLON.Tools.htmlToString(node.outerHTML) });
                        }
                        else if (source.indexOf(".svg") > 0 || data.indexOf("svg") > 0) {
                            rulecheck.failed = true;
                            rulecheck.items.push({ message: "dont't use SVG with " + node.nodeType, content: VORLON.Tools.htmlToString(node.outerHTML) });
                        }
                        else {
                            rulecheck.failed = true;
                            rulecheck.items.push({ message: "use HTML5 instead of embed or object elements", content: VORLON.Tools.htmlToString(node.outerHTML) });
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));

var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.dontUseBrowserConditionalComment = {
                    id: "webstandards.avoid-browser-specific-css",
                    title: "avoid conditional comments",
                    description: "Conditional comments are not the best way to adapt your website to target browser, and support is dropped for IE > 9.",
                    nodeTypes: ["#comment"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        //console.log("checking comment " + node.nodeValue);
                        var commentContent = node.nodeValue.toLowerCase();
                        var hasConditionalComment = commentContent.indexOf("[if ie ") >= 0 ||
                            commentContent.indexOf("[if !ie]") >= 0 ||
                            commentContent.indexOf("[if gt ie ") >= 0 ||
                            commentContent.indexOf("[if gte ie ") >= 0 ||
                            commentContent.indexOf("[if lt ie ") >= 0 ||
                            commentContent.indexOf("[if lte ie ") >= 0;
                        if (hasConditionalComment) {
                            rulecheck.failed = true;
                            rulecheck.items.push({
                                title: VORLON.Tools.htmlToString(node.nodeValue)
                            });
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));

var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var CSS;
            (function (CSS) {
                var compatiblePrefixes = {
                    'animation': 'webkit',
                    'animation-delay': 'webkit',
                    'animation-direction': 'webkit',
                    'animation-duration': 'webkit',
                    'animation-fill-mode': 'webkit',
                    'animation-iteration-count': 'webkit',
                    'animation-name': 'webkit',
                    'animation-play-state': 'webkit',
                    'animation-timing-function': 'webkit',
                    'appearance': 'webkit moz',
                    'border-end': 'webkit moz',
                    'border-end-color': 'webkit moz',
                    'border-end-style': 'webkit moz',
                    'border-end-width': 'webkit moz',
                    'border-image': 'webkit o',
                    'border-start': 'webkit moz',
                    'border-start-color': 'webkit moz',
                    'border-start-style': 'webkit moz',
                    'border-start-width': 'webkit moz',
                    'box-sizing': 'webkit',
                    'column-count': 'webkit moz',
                    'column-gap': 'webkit moz',
                    'column-rule': 'webkit moz',
                    'column-rule-color': 'webkit moz',
                    'column-rule-style': 'webkit moz',
                    'column-rule-width': 'webkit moz',
                    'column-width': 'webkit moz',
                    'hyphens': 'webkit moz ms',
                    'margin-end': 'webkit moz',
                    'margin-start': 'webkit moz',
                    'padding-end': 'webkit moz',
                    'padding-start': 'webkit moz',
                    'tab-size': 'webkit moz o',
                    'text-size-adjust': 'webkit moz ms',
                    'transform': 'webkit ms',
                    'transform-origin': 'webkit ms',
                    'transition': 'webkit moz o',
                    'transition-delay': 'webkit moz o',
                    'transition-duration': 'webkit',
                    'transition-property': 'webkit',
                    'transition-timing-function': 'webkit',
                    'user-select': 'webkit moz ms'
                };
                var variations, prefixed, arrayPush = Array.prototype.push, applyTo = new Array();
                for (var prop in compatiblePrefixes) {
                    if (compatiblePrefixes.hasOwnProperty(prop)) {
                        variations = [];
                        prefixed = compatiblePrefixes[prop].split(' ');
                        for (var i = 0, len = prefixed.length; i < len; i++) {
                            variations.push('-' + prefixed[i] + '-' + prop);
                        }
                        compatiblePrefixes[prop] = variations;
                        variations.forEach(function (obj, i) {
                            applyTo[obj] = i;
                        });
                    }
                }
                CSS.cssprefixes = {
                    id: "webstandards.prefixes",
                    title: "incorrect use of css prefixes",
                    description: "Ensure you use all vendor prefixes and unprefixed version for HTML5 CSS properties.",
                    check: function (url, ast, rulecheck, analyzeSummary) {
                        //console.log("check css prefixes");
                        var nodes = [];
                        var filerules = {
                            title: url,
                            type: "itemslist",
                            items: []
                        };
                        rulecheck.items = rulecheck.items || [];
                        this.checkNodes(url, compatiblePrefixes, filerules, ast, nodes);
                        if (filerules.items.length) {
                            rulecheck.items.push(filerules);
                            rulecheck.failed = true;
                        }
                    },
                    unprefixedPropertyName: function (property) {
                        return property.replace("-webkit-", "").replace("-moz-", "").replace("-o-", "").replace("-ms-", "");
                    },
                    getMissingPrefixes: function (compatiblePrefixes, node, property) {
                        var allProperty = compatiblePrefixes[property];
                        var prefixes = [];
                        allProperty.forEach(function (prop, y) {
                            var hasPrefix = node.rules.some(function (r) { return r.directive == prop; });
                            if (!hasPrefix) {
                                prefixes.push(prop);
                            }
                        });
                        return prefixes;
                    },
                    checkNodes: function (url, compatiblePrefixes, rulecheck, ast, nodes) {
                        var _this = this;
                        if (!ast)
                            return;
                        ast.forEach(function (node, i) {
                            var nodeitem = null;
                            if (node.rules && node.rules.length > 0) {
                                var checked = {};
                                for (var x = 0, len = node.rules.length; x < len; x++) {
                                    var property = node.rules[x].directive;
                                    var unprefixed = _this.unprefixedPropertyName(property);
                                    if (!checked[unprefixed] && compatiblePrefixes.hasOwnProperty(unprefixed)) {
                                        if (compatiblePrefixes[unprefixed].indexOf(unprefixed) == -1)
                                            compatiblePrefixes[unprefixed].push(unprefixed);
                                        var missings = _this.getMissingPrefixes(compatiblePrefixes, node, unprefixed);
                                        if (missings.length) {
                                            if (!nodeitem) {
                                                rulecheck.failed = true;
                                                rulecheck.items = rulecheck.items || [];
                                                nodeitem = {
                                                    title: node.selector,
                                                    items: []
                                                };
                                                rulecheck.items.push(nodeitem);
                                            }
                                            nodeitem.items.push({
                                                title: "<strong>" + unprefixed + "</strong> : missing " + missings,
                                            });
                                        }
                                    }
                                    checked[unprefixed] = true;
                                }
                            }
                            //scan content of media queries
                            if (node.type === "media") {
                                _this.checkNodes(url, compatiblePrefixes, rulecheck, node.subStyles, nodes);
                            }
                        });
                    }
                };
            })(CSS = Rules.CSS || (Rules.CSS = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));

var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var DOM;
            (function (DOM) {
                DOM.modernDocType = {
                    id: "webstandards.documentmode",
                    title: "use a modern doctype",
                    description: "Modern doctype like &lt;!DOCTYPE html&gt; are better for browser compatibility and enable using HTML5 features.",
                    nodeTypes: ["META"],
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                    },
                    check: function (node, rulecheck, analyzeSummary, htmlString) {
                        var httpequiv = node.getAttribute("http-equiv");
                        if (httpequiv && httpequiv.toLowerCase() == "x-ua-compatible") {
                            var content = node.getAttribute("content");
                            if (!(content.toLowerCase().indexOf("edge") >= 0)) {
                                rulecheck.failed = true;
                                //current.content = doctype.html;
                                rulecheck.items.push({
                                    title: "your website use IE's document mode compatibility for an older version of IE ",
                                    content: VORLON.Tools.htmlToString(node.outerHTML)
                                });
                            }
                        }
                    },
                    endcheck: function (rulecheck, analyzeSummary) {
                        //console.log("checking comment " + node.nodeValue);
                        var doctype = analyzeSummary.doctype || {};
                        var current = {
                            title: "used doctype is <br/>" + VORLON.Tools.htmlToString(doctype.html)
                        };
                        if (doctype.publicId || doctype.systemId) {
                            rulecheck.failed = true;
                            //current.content = doctype.html;
                            rulecheck.items.push(current);
                        }
                    }
                };
            })(DOM = Rules.DOM || (Rules.DOM = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));

var VORLON;
(function (VORLON) {
    var WebStandards;
    (function (WebStandards) {
        var Rules;
        (function (Rules) {
            var JavaScript;
            (function (JavaScript) {
                var libraries = [
                    {
                        name: 'Prototype',
                        minVersions: [
                            { major: '1.7.', minor: '2' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/Prototype JavaScript framework, version (\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'Dojo',
                        minVersions: [
                            { major: '1.5.', minor: '3' },
                            { major: '1.6.', minor: '2' },
                            { major: '1.7.', minor: '5' },
                            { major: '1.8.', minor: '5' },
                            { major: '1.9.', minor: '2' },
                            { major: '1.10.', minor: '0' }
                        ],
                        check: function (checkVersion, scriptText) {
                            if (scriptText.indexOf('dojo') === -1) {
                                return false;
                            }
                            var version = scriptText.match(/\.version\s*=\s*\{\s*major:\s*(\d+)\D+(\d+)\D+(\d+)/m);
                            if (version) {
                                return checkVersion(this, version[1] + '.' + version[2] + '.' + version[3]);
                            }
                            version = scriptText.match(/\s*major:\s*(\d+),\s*minor:\s*(\d+),\s*patch:\s*(\d+),/mi);
                            return version && checkVersion(this, version[1] + '.' + version[2] + '.' + version[3]);
                        }
                    },
                    {
                        name: 'Mootools',
                        minVersions: [
                            { major: '1.2.', minor: '6' },
                            { major: '1.4.', minor: '5' },
                            { major: '1.5.', minor: '' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/this.MooTools\s*=\s*\{version:\s*'(\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'SWFObject',
                        minVersions: [
                            { major: '2.', minor: '2' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s+SWFObject v(\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery Form Plugin',
                        minVersions: [
                            { major: '3.', minor: '22' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/Form Plugin\s+\*\s+version: (\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'Modernizr',
                        minVersions: [
                            { major: '2.5.', minor: '2' },
                            { major: '2.6.', minor: '2' },
                            { major: '2.7.', minor: '1' },
                            { major: '2.8.', minor: '3' }
                        ],
                        check: function (checkVersion, scriptText) {
                            // Static analysis. :(  The version is set as a local variable, far from
                            // where Modernizr._version is set. Just see if we have a comment header.
                            // ALT: look for /VAR="1.2.3"/ then for /._version=VAR/ ... ugh.
                            var version = scriptText.match(/\*\s*Modernizr\s+(\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery cookie',
                        minVersions: [
                            { major: '1.3.', minor: '1' },
                            { major: '1.4.', minor: '1' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s*jQuery Cookie Plugin v(\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'hoverIntent',
                        minVersions: [
                            { major: '1.8.', minor: '1' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s*hoverIntent v(\d+\.\d+\.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery Easing',
                        minVersions: [
                            { major: '1.3.', minor: '0' }
                        ],
                        patchOptional: true,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\*\s*jQuery Easing v(\d+\.\d+)\s*/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'underscore',
                        minVersions: [
                            { major: '1.8.', minor: '3' },
                            { major: '1.7.', minor: '0' },
                            { major: '1.6.', minor: '0' },
                            { major: '1.5.', minor: '2' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/exports._(?:.*)?.VERSION="(\d+.\d+.\d+)"/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'hammer js',
                        minVersions: [
                            { major: '2.0.', minor: '4' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            if (scriptText.indexOf('hammer.input') !== -1) {
                                var version = scriptText.match(/.VERSION\s*=\s*['|"](\d+.\d+.\d+)['|"]/m);
                                return version && checkVersion(this, version[1]);
                            }
                            return false;
                        }
                    },
                    {
                        name: 'jQuery Superfish',
                        minVersions: [
                            { major: '1.7.', minor: '4' }
                        ],
                        patchOptional: false,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/jQuery Superfish Menu Plugin - v(\d+.\d+.\d+)"/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery mousewheel',
                        minVersions: [
                            { major: '3.1.', minor: '12' }
                        ],
                        patchOptional: true,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/.mousewheel={version:"(\d+.\d+.\d+)/);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery mobile',
                        minVersions: [
                            { major: '1.4.', minor: '5' },
                            { major: '1.3.', minor: '2' }
                        ],
                        patchOptional: true,
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/.mobile,{version:"(\d+.\d+.\d+)/);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery UI',
                        minVersions: [
                            { major: '1.8.', minor: '24' },
                            { major: '1.9.', minor: '2' },
                            { major: '1.10.', minor: '4' },
                            { major: '1.11.', minor: '4' }
                        ],
                        check: function (checkVersion, scriptText) {
                            var version = scriptText.match(/\.ui,[\s\r\n]*\{[\s\r\n]*version:\s*"(\d+.\d+.\d+)/m);
                            return version && checkVersion(this, version[1]);
                        }
                    },
                    {
                        name: 'jQuery',
                        minVersions: [
                            { major: '1.6.', minor: '4' },
                            { major: '1.7.', minor: '2' },
                            { major: '1.8.', minor: '2' },
                            { major: '1.9.', minor: '1' },
                            { major: '1.10.', minor: '2' },
                            { major: '1.11.', minor: '3' },
                            { major: '2.0.', minor: '3' },
                            { major: '2.1.', minor: '4' }
                        ],
                        patchOptional: true,
                        check: function (checkVersion, scriptText) {
                            //We search the version in the header
                            //Explanation: Some libraries have things like: Requires: jQuery v1.7.1 (cycle, for example)
                            //We are matching regex that contain jQuery vx.y.z but do not have : right before jQuery
                            var regex = /(?:jQuery\s*v)(\d+.\d+.\d+)\s/g;
                            var regversion = regex.exec(scriptText);
                            if (regversion) {
                                var isPluginRegExp = new RegExp('(?::\\s*)' + regversion[0], 'g');
                                if (!isPluginRegExp.exec(scriptText)) {
                                    return checkVersion(this, regversion[1]);
                                }
                            }
                            var matchversion = scriptText.match(/jquery:\s*"([^"]+)/);
                            if (matchversion) {
                                return checkVersion(this, matchversion[1]);
                            }
                            //If header fails, we look with another pattern
                            var regex = /(?:jquery[,\)].{0,200}=")(\d+\.\d+)(\..*?)"/gi;
                            var results = regex.exec(scriptText);
                            var version = results ? (results[1] + (results[2] || '')) : null;
                            return version && checkVersion(this, version);
                        }
                    }
                ];
                JavaScript.librariesVersions = {
                    id: "webstandards.javascript-libraries-versions",
                    title: "up to date javascript libraries",
                    description: "Try being up to date with your JavaScript libraries like jQuery. Latest versions usually improves performances and browsers compatibility.",
                    prepare: function (rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        rulecheck.type = "blockitems";
                    },
                    check: function (url, javascriptContent, rulecheck, analyzeSummary) {
                        rulecheck.items = rulecheck.items || [];
                        var filecheck = null;
                        if (!javascriptContent || url == "inline")
                            return;
                        for (var i = 0; i < libraries.length; i++) {
                            var lib = libraries[i], result;
                            result = lib.check.call(lib, this.checkVersion, javascriptContent);
                            if (result && result.needsUpdate) {
                                if (!filecheck) {
                                    filecheck = {
                                        title: url,
                                        items: []
                                    };
                                    rulecheck.items.push(filecheck);
                                }
                                filecheck.items.push({
                                    title: "detected " + result.name + " version " + result.version,
                                });
                                rulecheck.failed = true;
                                break;
                            }
                        }
                    },
                    checkVersion: function (library, version) {
                        var vinfo = {
                            name: library.name,
                            needsUpdate: true,
                            minVersion: library.minVersions[0].major + library.minVersions[0].minor,
                            version: version,
                            bannedVersion: null
                        };
                        if (library.patchOptional) {
                            // If lib can have an implied ".0", add it when needed
                            // match 1.17, 1.17b2, 1.17-beta2; not 1.17.0, 1.17.2, 1.17b2
                            var parts = version.match(/^(\d+\.\d+)(.*)$/);
                            if (parts && !/^\.\d+/.test(parts[2])) {
                                version = parts[1] + '.0' + parts[2];
                            }
                        }
                        for (var i = 0; i < library.minVersions.length; i++) {
                            var gv = library.minVersions[i];
                            if (version.indexOf(gv.major) === 0) {
                                vinfo.minVersion = gv.major + gv.minor;
                                vinfo.needsUpdate = +version.slice(gv.major.length) < +gv.minor;
                                break;
                            }
                        }
                        if (library.bannedVersions) {
                            if (library.bannedVersions.indexOf(version) >= 0) {
                                vinfo.bannedVersion = version;
                                vinfo.needsUpdate = true;
                            }
                        }
                        return vinfo;
                    }
                };
            })(JavaScript = Rules.JavaScript || (Rules.JavaScript = {}));
        })(Rules = WebStandards.Rules || (WebStandards.Rules = {}));
    })(WebStandards = VORLON.WebStandards || (VORLON.WebStandards = {}));
})(VORLON || (VORLON = {}));

var VORLON;
(function (VORLON) {
    var Tools = (function () {
        function Tools() {
        }
        Tools.QuerySelectorById = function (root, id) {
            if (root.querySelector) {
                return root.querySelector("#" + id);
            }
            return document.getElementById(id);
        };
        Tools.SetImmediate = function (func) {
            if (window.setImmediate) {
                setImmediate(func);
            }
            else {
                setTimeout(func, 0);
            }
        };
        Tools.setLocalStorageValue = function (key, data) {
            if (localStorage) {
                try {
                    localStorage.setItem(key, data);
                }
                catch (e) {
                }
            }
        };
        Tools.getLocalStorageValue = function (key) {
            if (localStorage) {
                try {
                    return localStorage.getItem(key);
                }
                catch (e) {
                    //local storage is not available (private mode maybe)
                    return "";
                }
            }
        };
        Tools.Hook = function (rootObject, functionToHook, hookingFunction) {
            var previousFunction = rootObject[functionToHook];
            rootObject[functionToHook] = function () {
                var optionalParams = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    optionalParams[_i - 0] = arguments[_i];
                }
                hookingFunction(optionalParams);
                previousFunction.apply(rootObject, optionalParams);
            };
            return previousFunction;
        };
        Tools.HookProperty = function (rootObject, propertyToHook, callback) {
            var initialValue = rootObject[propertyToHook];
            Object.defineProperty(rootObject, propertyToHook, {
                get: function () {
                    if (callback) {
                        callback(VORLON.Tools.getCallStack(1));
                    }
                    return initialValue;
                }
            });
        };
        Tools.getCallStack = function (skipped) {
            skipped = skipped || 0;
            try {
                //Throw an error to generate a stack trace
                throw new Error();
            }
            catch (e) {
                //Split the stack trace into each line
                var stackLines = e.stack.split('\n');
                var callerIndex = 0;
                //Now walk though each line until we find a path reference
                for (var i = 2 + skipped, l = stackLines.length; i < l; i++) {
                    if (!(stackLines[i].indexOf("http://") >= 0))
                        continue;
                    //We skipped all the lines with out an http so we now have a script reference
                    //This one is the class constructor, the next is the getScriptPath() call
                    //The one after that is the user code requesting the path info (so offset by 2)
                    callerIndex = i;
                    break;
                }
                var res = {
                    stack: e.stack,
                };
                var linetext = stackLines[callerIndex];
                //Now parse the string for each section we want to return
                //var pathParts = linetext.match(/((http[s]?:\/\/.+\/)([^\/]+\.js))([\/]):/);
                // if (pathParts){
                //     
                // }
                var opening = linetext.indexOf("http://") || linetext.indexOf("https://");
                if (opening > 0) {
                    var closing = linetext.indexOf(")", opening);
                    if (closing < 0)
                        closing = linetext.length - 1;
                    var filename = linetext.substr(opening, closing - opening);
                    var linestart = filename.indexOf(":", filename.lastIndexOf("/"));
                    res.file = filename.substr(0, linestart);
                }
                return res;
            }
        };
        Tools.CreateCookie = function (name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        };
        Tools.ReadCookie = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return "";
        };
        // from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#answer-2117523
        Tools.CreateGUID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        Tools.RemoveEmpties = function (arr) {
            var len = arr.length;
            for (var i = len - 1; i >= 0; i--) {
                if (!arr[i]) {
                    arr.splice(i, 1);
                    len--;
                }
            }
            return len;
        };
        Tools.AddClass = function (e, name) {
            if (e.classList) {
                if (name.indexOf(" ") < 0) {
                    e.classList.add(name);
                }
                else {
                    var namesToAdd = name.split(" ");
                    Tools.RemoveEmpties(namesToAdd);
                    for (var i = 0, len = namesToAdd.length; i < len; i++) {
                        e.classList.add(namesToAdd[i]);
                    }
                }
                return e;
            }
            else {
                var className = e.className;
                var names = className.split(" ");
                var l = Tools.RemoveEmpties(names);
                var toAdd;
                if (name.indexOf(" ") >= 0) {
                    namesToAdd = name.split(" ");
                    Tools.RemoveEmpties(namesToAdd);
                    for (i = 0; i < l; i++) {
                        var found = namesToAdd.indexOf(names[i]);
                        if (found >= 0) {
                            namesToAdd.splice(found, 1);
                        }
                    }
                    if (namesToAdd.length > 0) {
                        toAdd = namesToAdd.join(" ");
                    }
                }
                else {
                    var saw = false;
                    for (i = 0; i < l; i++) {
                        if (names[i] === name) {
                            saw = true;
                            break;
                        }
                    }
                    if (!saw) {
                        toAdd = name;
                    }
                }
                if (toAdd) {
                    if (l > 0 && names[0].length > 0) {
                        e.className = className + " " + toAdd;
                    }
                    else {
                        e.className = toAdd;
                    }
                }
                return e;
            }
        };
        Tools.RemoveClass = function (e, name) {
            if (e.classList) {
                if (e.classList.length === 0) {
                    return e;
                }
                var namesToRemove = name.split(" ");
                Tools.RemoveEmpties(namesToRemove);
                for (var i = 0, len = namesToRemove.length; i < len; i++) {
                    e.classList.remove(namesToRemove[i]);
                }
                return e;
            }
            else {
                var original = e.className;
                if (name.indexOf(" ") >= 0) {
                    namesToRemove = name.split(" ");
                    Tools.RemoveEmpties(namesToRemove);
                }
                else {
                    if (original.indexOf(name) < 0) {
                        return e;
                    }
                    namesToRemove = [name];
                }
                var removed;
                var names = original.split(" ");
                var namesLen = Tools.RemoveEmpties(names);
                for (i = namesLen - 1; i >= 0; i--) {
                    if (namesToRemove.indexOf(names[i]) >= 0) {
                        names.splice(i, 1);
                        removed = true;
                    }
                }
                if (removed) {
                    e.className = names.join(" ");
                }
                return e;
            }
        };
        Tools.ToggleClass = function (e, name, callback) {
            if (e.className.match(name)) {
                Tools.RemoveClass(e, name);
                if (callback)
                    callback(false);
            }
            else {
                Tools.AddClass(e, name);
                if (callback)
                    callback(true);
            }
        };
        Tools.htmlToString = function (text) {
            return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };
        return Tools;
    })();
    VORLON.Tools = Tools;
    var FluentDOM = (function () {
        function FluentDOM(nodeType, className, parentElt, parent) {
            this.childs = [];
            if (nodeType) {
                this.element = document.createElement(nodeType);
                if (className)
                    this.element.className = className;
                if (parentElt)
                    parentElt.appendChild(this.element);
                this.parent = parent;
                if (parent) {
                    parent.childs.push(this);
                }
            }
        }
        FluentDOM.forElement = function (element) {
            var res = new FluentDOM(null);
            res.element = element;
            return res;
        };
        FluentDOM.prototype.addClass = function (classname) {
            this.element.classList.add(classname);
            return this;
        };
        FluentDOM.prototype.toggleClass = function (classname) {
            this.element.classList.toggle(classname);
            return this;
        };
        FluentDOM.prototype.className = function (classname) {
            this.element.className = classname;
            return this;
        };
        FluentDOM.prototype.opacity = function (opacity) {
            this.element.style.opacity = opacity;
            return this;
        };
        FluentDOM.prototype.display = function (display) {
            this.element.style.display = display;
            return this;
        };
        FluentDOM.prototype.hide = function () {
            this.element.style.display = 'none';
            return this;
        };
        FluentDOM.prototype.visibility = function (visibility) {
            this.element.style.visibility = visibility;
            return this;
        };
        FluentDOM.prototype.text = function (text) {
            this.element.textContent = text;
            return this;
        };
        FluentDOM.prototype.html = function (text) {
            this.element.innerHTML = text;
            return this;
        };
        FluentDOM.prototype.attr = function (name, val) {
            this.element.setAttribute(name, val);
            return this;
        };
        FluentDOM.prototype.editable = function (editable) {
            this.element.contentEditable = editable ? "true" : "false";
            return this;
        };
        FluentDOM.prototype.style = function (name, val) {
            this.element.style[name] = val;
            return this;
        };
        FluentDOM.prototype.appendTo = function (elt) {
            elt.appendChild(this.element);
            return this;
        };
        FluentDOM.prototype.append = function (nodeType, className, callback) {
            var child = new FluentDOM(nodeType, className, this.element, this);
            if (callback) {
                callback(child);
            }
            return this;
        };
        FluentDOM.prototype.createChild = function (nodeType, className) {
            var child = new FluentDOM(nodeType, className, this.element, this);
            return child;
        };
        FluentDOM.prototype.click = function (callback) {
            this.element.addEventListener('click', callback);
            return this;
        };
        FluentDOM.prototype.blur = function (callback) {
            this.element.addEventListener('blur', callback);
            return this;
        };
        FluentDOM.prototype.keydown = function (callback) {
            this.element.addEventListener('keydown', callback);
            return this;
        };
        return FluentDOM;
    })();
    VORLON.FluentDOM = FluentDOM;
})(VORLON || (VORLON = {}));


module.exports = VORLON;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL21vYmlsZXdlYi5kZXZpY2VpY29ucy50cyIsInJ1bGVzL21vYmlsZXdlYi5tZWRpYXF1ZXJpZXMudHMiLCJydWxlcy9tb2JpbGV3ZWIudmlld3BvcnQudHMiLCJydWxlcy93ZWJzdGFuZGFyZHMuYWN0aXZleC50cyIsInJ1bGVzL3dlYnN0YW5kYXJkcy5jb25kaXRpb25hbGNvbW1lbnRzLnRzIiwicnVsZXMvd2Vic3RhbmRhcmRzLmNzc3ByZWZpeGVzLnRzIiwicnVsZXMvd2Vic3RhbmRhcmRzLmRvY3VtZW50bW9kZS50cyIsInJ1bGVzL3dlYnN0YW5kYXJkcy5qc2xpYnZlcnNpb25zLnRzIiwidm9ybG9uLnRvb2xzLnRzIiwidm9ybG9uLndlYnN0YW5kYXJkcy5pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbIlZPUkxPTiIsIlZPUkxPTi5XZWJTdGFuZGFyZHMiLCJWT1JMT04uV2ViU3RhbmRhcmRzLlJ1bGVzIiwiVk9STE9OLldlYlN0YW5kYXJkcy5SdWxlcy5ET00iLCJWT1JMT04uV2ViU3RhbmRhcmRzLlJ1bGVzLkNTUyIsIlZPUkxPTi5XZWJTdGFuZGFyZHMuUnVsZXMuSmF2YVNjcmlwdCIsIlZPUkxPTi5Ub29scyIsIlZPUkxPTi5Ub29scy5jb25zdHJ1Y3RvciIsIlZPUkxPTi5Ub29scy5RdWVyeVNlbGVjdG9yQnlJZCIsIlZPUkxPTi5Ub29scy5TZXRJbW1lZGlhdGUiLCJWT1JMT04uVG9vbHMuc2V0TG9jYWxTdG9yYWdlVmFsdWUiLCJWT1JMT04uVG9vbHMuZ2V0TG9jYWxTdG9yYWdlVmFsdWUiLCJWT1JMT04uVG9vbHMuSG9vayIsIlZPUkxPTi5Ub29scy5Ib29rUHJvcGVydHkiLCJWT1JMT04uVG9vbHMuZ2V0Q2FsbFN0YWNrIiwiVk9STE9OLlRvb2xzLkNyZWF0ZUNvb2tpZSIsIlZPUkxPTi5Ub29scy5SZWFkQ29va2llIiwiVk9STE9OLlRvb2xzLkNyZWF0ZUdVSUQiLCJWT1JMT04uVG9vbHMuUmVtb3ZlRW1wdGllcyIsIlZPUkxPTi5Ub29scy5BZGRDbGFzcyIsIlZPUkxPTi5Ub29scy5SZW1vdmVDbGFzcyIsIlZPUkxPTi5Ub29scy5Ub2dnbGVDbGFzcyIsIlZPUkxPTi5Ub29scy5odG1sVG9TdHJpbmciLCJWT1JMT04uRmx1ZW50RE9NIiwiVk9STE9OLkZsdWVudERPTS5jb25zdHJ1Y3RvciIsIlZPUkxPTi5GbHVlbnRET00uZm9yRWxlbWVudCIsIlZPUkxPTi5GbHVlbnRET00uYWRkQ2xhc3MiLCJWT1JMT04uRmx1ZW50RE9NLnRvZ2dsZUNsYXNzIiwiVk9STE9OLkZsdWVudERPTS5jbGFzc05hbWUiLCJWT1JMT04uRmx1ZW50RE9NLm9wYWNpdHkiLCJWT1JMT04uRmx1ZW50RE9NLmRpc3BsYXkiLCJWT1JMT04uRmx1ZW50RE9NLmhpZGUiLCJWT1JMT04uRmx1ZW50RE9NLnZpc2liaWxpdHkiLCJWT1JMT04uRmx1ZW50RE9NLnRleHQiLCJWT1JMT04uRmx1ZW50RE9NLmh0bWwiLCJWT1JMT04uRmx1ZW50RE9NLmF0dHIiLCJWT1JMT04uRmx1ZW50RE9NLmVkaXRhYmxlIiwiVk9STE9OLkZsdWVudERPTS5zdHlsZSIsIlZPUkxPTi5GbHVlbnRET00uYXBwZW5kVG8iLCJWT1JMT04uRmx1ZW50RE9NLmFwcGVuZCIsIlZPUkxPTi5GbHVlbnRET00uY3JlYXRlQ2hpbGQiLCJWT1JMT04uRmx1ZW50RE9NLmNsaWNrIiwiVk9STE9OLkZsdWVudERPTS5ibHVyIiwiVk9STE9OLkZsdWVudERPTS5rZXlkb3duIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0F1RFo7QUF2REQsV0FBTyxNQUFNO0lBQUNBLElBQUFBLFlBQVlBLENBdUR6QkE7SUF2RGFBLFdBQUFBLFlBQVlBO1FBQUNDLElBQUFBLEtBQUtBLENBdUQvQkE7UUF2RDBCQSxXQUFBQSxLQUFLQTtZQUFDQyxJQUFBQSxHQUFHQSxDQXVEbkNBO1lBdkRnQ0EsV0FBQUEsR0FBR0EsRUFBQ0EsQ0FBQ0E7Z0JBRXZCQyxlQUFXQSxHQUFhQTtvQkFDL0JBLEVBQUVBLEVBQUVB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LENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEZiwwQkFBTUEsR0FBTkEsVUFBT0EsUUFBZ0JBLEVBQUVBLFNBQWtCQSxFQUFFQSxRQUFvQ0E7WUFDN0VnQixJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNuRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3BCQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFRGhCLCtCQUFXQSxHQUFYQSxVQUFZQSxRQUFnQkEsRUFBRUEsU0FBa0JBO1lBQzVDaUIsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsU0FBU0EsQ0FBQ0EsUUFBUUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDbkVBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQ2pCQSxDQUFDQTtRQUVEakIseUJBQUtBLEdBQUxBLFVBQU1BLFFBQStCQTtZQUNqQ2tCLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsT0FBT0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDakRBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEbEIsd0JBQUlBLEdBQUpBLFVBQUtBLFFBQStCQTtZQUNoQ21CLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDaERBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEbkIsMkJBQU9BLEdBQVBBLFVBQVFBLFFBQStCQTtZQUNuQ29CLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDbkRBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUNMcEIsZ0JBQUNBO0lBQURBLENBdkhBdkIsQUF1SEN1QixJQUFBdkI7SUF2SFlBLGdCQUFTQSxZQXVIckJBLENBQUFBO0FBQ0xBLENBQUNBLEVBeFlNLE1BQU0sS0FBTixNQUFNLFFBd1laOztBQ2hXQSIsImZpbGUiOiJ2ZW5kb3Ivdm9ybG9uLmpzIiwic291cmNlUm9vdCI6Ii4uIn0=
