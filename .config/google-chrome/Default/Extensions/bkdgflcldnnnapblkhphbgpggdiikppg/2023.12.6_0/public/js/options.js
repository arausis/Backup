"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // shared/js/ui/pages/mixins/set-browser-class.js
  var require_set_browser_class = __commonJS({
    "shared/js/ui/pages/mixins/set-browser-class.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        setBrowserClassOnBodyTag: function() {
          window.chrome.runtime.sendMessage({ messageType: "getBrowser" }, (browserName) => {
            if (["edg", "edge", "brave"].includes(browserName)) {
              browserName = "chrome";
            }
            const browserClass = "is-browser--" + browserName;
            window.$("html").addClass(browserClass);
            window.$("body").addClass(browserClass);
          });
        }
      };
    }
  });

  // shared/js/ui/pages/mixins/parse-query-string.js
  var require_parse_query_string = __commonJS({
    "shared/js/ui/pages/mixins/parse-query-string.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        parseQueryString: (qs) => {
          if (typeof qs !== "string") {
            throw new Error("tried to parse a non-string query string");
          }
          const parsed = {};
          if (qs[0] === "?") {
            qs = qs.substr(1);
          }
          const parts = qs.split("&");
          parts.forEach((part) => {
            const [key, val] = part.split("=");
            if (key && val) {
              parsed[key] = val;
            }
          });
          return parsed;
        }
      };
    }
  });

  // shared/js/ui/pages/mixins/index.js
  var require_mixins = __commonJS({
    "shared/js/ui/pages/mixins/index.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        setBrowserClassOnBodyTag: require_set_browser_class(),
        parseQueryString: require_parse_query_string()
      };
    }
  });

  // shared/js/ui/views/privacy-options.js
  var require_privacy_options = __commonJS({
    "shared/js/ui/views/privacy-options.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.View;
      function PrivacyOptions(ops) {
        this.model = ops.model;
        this.pageView = ops.pageView;
        this.template = ops.template;
        Parent2.call(this, ops);
        this.model.getState().then(() => {
          this.rerender();
        });
      }
      PrivacyOptions.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          _clickSetting: function(e) {
            const key = window.$(e.target).data("key") || window.$(e.target).parent().data("key");
            console.log(`privacyOptions view click for setting "${key}"`);
            this.model.toggle(key);
            this.rerender();
          },
          setup: function() {
            this._cacheElems(".js-options", ["blocktrackers", "https-everywhere-enabled", "embedded-tweets-enabled", "gpc-enabled", "youtube-previews-enabled", "firebutton-clear-history-enabled", "firebutton-tabclear-enabled"]);
            this.bindEvents([
              [this.$blocktrackers, "click", this._clickSetting],
              [this.$httpseverywhereenabled, "click", this._clickSetting],
              [this.$embeddedtweetsenabled, "click", this._clickSetting],
              [this.$gpcenabled, "click", this._clickSetting],
              [this.$youtubepreviewsenabled, "click", this._clickSetting],
              [this.$firebuttonclearhistoryenabled, "click", this._clickSetting],
              [this.$firebuttontabclearenabled, "click", this._clickSetting]
            ]);
          },
          rerender: function() {
            this.unbindEvents();
            this._rerender();
            this.setup();
          }
        }
      );
      module2.exports = PrivacyOptions;
    }
  });

  // shared/js/ui/models/privacy-options.js
  var require_privacy_options2 = __commonJS({
    "shared/js/ui/models/privacy-options.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.Model;
      function PrivacyOptions(attrs) {
        attrs.httpsEverywhereEnabled = true;
        attrs.embeddedTweetsEnabled = false;
        attrs.GPC = false;
        attrs.youtubeClickToLoadEnabled = false;
        attrs.youtubePreviewsEnabled = false;
        attrs.fireButtonClearHistoryEnabled = true;
        attrs.fireButtonTabClearEnabled = true;
        Parent2.call(this, attrs);
      }
      PrivacyOptions.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          modelName: "privacyOptions",
          toggle: function(k) {
            if (Object.hasOwnProperty.call(this, k)) {
              this[k] = !this[k];
              console.log(`PrivacyOptions model toggle ${k} is now ${this[k]}`);
              this.sendMessage("updateSetting", { name: k, value: this[k] });
            }
          },
          async getState() {
            const [settings3, youtubeClickToLoadEnabled] = await Promise.all([
              this.sendMessage("getSetting", "all"),
              this.sendMessage("isClickToLoadYoutubeEnabled")
            ]);
            this.httpsEverywhereEnabled = settings3.httpsEverywhereEnabled;
            this.embeddedTweetsEnabled = settings3.embeddedTweetsEnabled;
            this.GPC = settings3.GPC;
            this.youtubeClickToLoadEnabled = youtubeClickToLoadEnabled;
            this.youtubePreviewsEnabled = settings3.youtubePreviewsEnabled;
            this.fireButtonEnabled = true;
            this.fireButtonClearHistoryEnabled = settings3.fireButtonClearHistoryEnabled;
            this.fireButtonTabClearEnabled = settings3.fireButtonTabClearEnabled;
          }
        }
      );
      module2.exports = PrivacyOptions;
    }
  });

  // node_modules/hyperscript-attribute-to-property/index.js
  var require_hyperscript_attribute_to_property = __commonJS({
    "node_modules/hyperscript-attribute-to-property/index.js"(exports2, module2) {
      module2.exports = attributeToProperty;
      var transform = {
        "class": "className",
        "for": "htmlFor",
        "http-equiv": "httpEquiv"
      };
      function attributeToProperty(h) {
        return function(tagName, attrs, children) {
          for (var attr in attrs) {
            if (attr in transform) {
              attrs[transform[attr]] = attrs[attr];
              delete attrs[attr];
            }
          }
          return h(tagName, attrs, children);
        };
      }
    }
  });

  // node_modules/hyperx/index.js
  var require_hyperx = __commonJS({
    "node_modules/hyperx/index.js"(exports2, module2) {
      var attrToProp = require_hyperscript_attribute_to_property();
      var VAR = 0;
      var TEXT = 1;
      var OPEN = 2;
      var CLOSE = 3;
      var ATTR = 4;
      var ATTR_KEY = 5;
      var ATTR_KEY_W = 6;
      var ATTR_VALUE_W = 7;
      var ATTR_VALUE = 8;
      var ATTR_VALUE_SQ = 9;
      var ATTR_VALUE_DQ = 10;
      var ATTR_EQ = 11;
      var ATTR_BREAK = 12;
      var COMMENT = 13;
      module2.exports = function(h, opts) {
        if (!opts)
          opts = {};
        var concat2 = opts.concat || function(a, b) {
          return String(a) + String(b);
        };
        if (opts.attrToProp !== false) {
          h = attrToProp(h);
        }
        return function(strings) {
          var state = TEXT, reg = "";
          var arglen = arguments.length;
          var parts = [];
          for (var i = 0; i < strings.length; i++) {
            if (i < arglen - 1) {
              var arg = arguments[i + 1];
              var p = parse(strings[i]);
              var xstate = state;
              if (xstate === ATTR_VALUE_DQ)
                xstate = ATTR_VALUE;
              if (xstate === ATTR_VALUE_SQ)
                xstate = ATTR_VALUE;
              if (xstate === ATTR_VALUE_W)
                xstate = ATTR_VALUE;
              if (xstate === ATTR)
                xstate = ATTR_KEY;
              if (xstate === OPEN) {
                if (reg === "/") {
                  p.push([OPEN, "/", arg]);
                  reg = "";
                } else {
                  p.push([OPEN, arg]);
                }
              } else if (xstate === COMMENT && opts.comments) {
                reg += String(arg);
              } else if (xstate !== COMMENT) {
                p.push([VAR, xstate, arg]);
              }
              parts.push.apply(parts, p);
            } else
              parts.push.apply(parts, parse(strings[i]));
          }
          var tree = [null, {}, []];
          var stack = [[tree, -1]];
          for (var i = 0; i < parts.length; i++) {
            var cur = stack[stack.length - 1][0];
            var p = parts[i], s = p[0];
            if (s === OPEN && /^\//.test(p[1])) {
              var ix = stack[stack.length - 1][1];
              if (stack.length > 1) {
                stack.pop();
                stack[stack.length - 1][0][2][ix] = h(
                  cur[0],
                  cur[1],
                  cur[2].length ? cur[2] : void 0
                );
              }
            } else if (s === OPEN) {
              var c = [p[1], {}, []];
              cur[2].push(c);
              stack.push([c, cur[2].length - 1]);
            } else if (s === ATTR_KEY || s === VAR && p[1] === ATTR_KEY) {
              var key = "";
              var copyKey;
              for (; i < parts.length; i++) {
                if (parts[i][0] === ATTR_KEY) {
                  key = concat2(key, parts[i][1]);
                } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
                  if (typeof parts[i][2] === "object" && !key) {
                    for (copyKey in parts[i][2]) {
                      if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                        cur[1][copyKey] = parts[i][2][copyKey];
                      }
                    }
                  } else {
                    key = concat2(key, parts[i][2]);
                  }
                } else
                  break;
              }
              if (parts[i][0] === ATTR_EQ)
                i++;
              var j = i;
              for (; i < parts.length; i++) {
                if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
                  if (!cur[1][key])
                    cur[1][key] = strfn(parts[i][1]);
                  else
                    parts[i][1] === "" || (cur[1][key] = concat2(cur[1][key], parts[i][1]));
                } else if (parts[i][0] === VAR && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
                  if (!cur[1][key])
                    cur[1][key] = strfn(parts[i][2]);
                  else
                    parts[i][2] === "" || (cur[1][key] = concat2(cur[1][key], parts[i][2]));
                } else {
                  if (key.length && !cur[1][key] && i === j && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
                    cur[1][key] = key.toLowerCase();
                  }
                  if (parts[i][0] === CLOSE) {
                    i--;
                  }
                  break;
                }
              }
            } else if (s === ATTR_KEY) {
              cur[1][p[1]] = true;
            } else if (s === VAR && p[1] === ATTR_KEY) {
              cur[1][p[2]] = true;
            } else if (s === CLOSE) {
              if (selfClosing(cur[0]) && stack.length) {
                var ix = stack[stack.length - 1][1];
                stack.pop();
                stack[stack.length - 1][0][2][ix] = h(
                  cur[0],
                  cur[1],
                  cur[2].length ? cur[2] : void 0
                );
              }
            } else if (s === VAR && p[1] === TEXT) {
              if (p[2] === void 0 || p[2] === null)
                p[2] = "";
              else if (!p[2])
                p[2] = concat2("", p[2]);
              if (Array.isArray(p[2][0])) {
                cur[2].push.apply(cur[2], p[2]);
              } else {
                cur[2].push(p[2]);
              }
            } else if (s === TEXT) {
              cur[2].push(p[1]);
            } else if (s === ATTR_EQ || s === ATTR_BREAK) {
            } else {
              throw new Error("unhandled: " + s);
            }
          }
          if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
            tree[2].shift();
          }
          if (tree[2].length > 2 || tree[2].length === 2 && /\S/.test(tree[2][1])) {
            if (opts.createFragment)
              return opts.createFragment(tree[2]);
            throw new Error(
              "multiple root elements must be wrapped in an enclosing tag"
            );
          }
          if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === "string" && Array.isArray(tree[2][0][2])) {
            tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2]);
          }
          return tree[2][0];
          function parse(str) {
            var res = [];
            if (state === ATTR_VALUE_W)
              state = ATTR;
            for (var i2 = 0; i2 < str.length; i2++) {
              var c2 = str.charAt(i2);
              if (state === TEXT && c2 === "<") {
                if (reg.length)
                  res.push([TEXT, reg]);
                reg = "";
                state = OPEN;
              } else if (c2 === ">" && !quot(state) && state !== COMMENT) {
                if (state === OPEN && reg.length) {
                  res.push([OPEN, reg]);
                } else if (state === ATTR_KEY) {
                  res.push([ATTR_KEY, reg]);
                } else if (state === ATTR_VALUE && reg.length) {
                  res.push([ATTR_VALUE, reg]);
                }
                res.push([CLOSE]);
                reg = "";
                state = TEXT;
              } else if (state === COMMENT && /-$/.test(reg) && c2 === "-") {
                if (opts.comments) {
                  res.push([ATTR_VALUE, reg.substr(0, reg.length - 1)]);
                }
                reg = "";
                state = TEXT;
              } else if (state === OPEN && /^!--$/.test(reg)) {
                if (opts.comments) {
                  res.push([OPEN, reg], [ATTR_KEY, "comment"], [ATTR_EQ]);
                }
                reg = c2;
                state = COMMENT;
              } else if (state === TEXT || state === COMMENT) {
                reg += c2;
              } else if (state === OPEN && c2 === "/" && reg.length) {
              } else if (state === OPEN && /\s/.test(c2)) {
                if (reg.length) {
                  res.push([OPEN, reg]);
                }
                reg = "";
                state = ATTR;
              } else if (state === OPEN) {
                reg += c2;
              } else if (state === ATTR && /[^\s"'=/]/.test(c2)) {
                state = ATTR_KEY;
                reg = c2;
              } else if (state === ATTR && /\s/.test(c2)) {
                if (reg.length)
                  res.push([ATTR_KEY, reg]);
                res.push([ATTR_BREAK]);
              } else if (state === ATTR_KEY && /\s/.test(c2)) {
                res.push([ATTR_KEY, reg]);
                reg = "";
                state = ATTR_KEY_W;
              } else if (state === ATTR_KEY && c2 === "=") {
                res.push([ATTR_KEY, reg], [ATTR_EQ]);
                reg = "";
                state = ATTR_VALUE_W;
              } else if (state === ATTR_KEY) {
                reg += c2;
              } else if ((state === ATTR_KEY_W || state === ATTR) && c2 === "=") {
                res.push([ATTR_EQ]);
                state = ATTR_VALUE_W;
              } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c2)) {
                res.push([ATTR_BREAK]);
                if (/[\w-]/.test(c2)) {
                  reg += c2;
                  state = ATTR_KEY;
                } else
                  state = ATTR;
              } else if (state === ATTR_VALUE_W && c2 === '"') {
                state = ATTR_VALUE_DQ;
              } else if (state === ATTR_VALUE_W && c2 === "'") {
                state = ATTR_VALUE_SQ;
              } else if (state === ATTR_VALUE_DQ && c2 === '"') {
                res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
                reg = "";
                state = ATTR;
              } else if (state === ATTR_VALUE_SQ && c2 === "'") {
                res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
                reg = "";
                state = ATTR;
              } else if (state === ATTR_VALUE_W && !/\s/.test(c2)) {
                state = ATTR_VALUE;
                i2--;
              } else if (state === ATTR_VALUE && /\s/.test(c2)) {
                res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
                reg = "";
                state = ATTR;
              } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ) {
                reg += c2;
              }
            }
            if (state === TEXT && reg.length) {
              res.push([TEXT, reg]);
              reg = "";
            } else if (state === ATTR_VALUE && reg.length) {
              res.push([ATTR_VALUE, reg]);
              reg = "";
            } else if (state === ATTR_VALUE_DQ && reg.length) {
              res.push([ATTR_VALUE, reg]);
              reg = "";
            } else if (state === ATTR_VALUE_SQ && reg.length) {
              res.push([ATTR_VALUE, reg]);
              reg = "";
            } else if (state === ATTR_KEY) {
              res.push([ATTR_KEY, reg]);
              reg = "";
            }
            return res;
          }
        };
        function strfn(x) {
          if (typeof x === "function")
            return x;
          else if (typeof x === "string")
            return x;
          else if (x && typeof x === "object")
            return x;
          else if (x === null || x === void 0)
            return x;
          else
            return concat2("", x);
        }
      };
      function quot(state) {
        return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ;
      }
      var closeRE = RegExp("^(" + [
        "area",
        "base",
        "basefont",
        "bgsound",
        "br",
        "col",
        "command",
        "embed",
        "frame",
        "hr",
        "img",
        "input",
        "isindex",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
        "!--",
        // SVG TAGS
        "animate",
        "animateTransform",
        "circle",
        "cursor",
        "desc",
        "ellipse",
        "feBlend",
        "feColorMatrix",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "font-face-format",
        "font-face-name",
        "font-face-uri",
        "glyph",
        "glyphRef",
        "hkern",
        "image",
        "line",
        "missing-glyph",
        "mpath",
        "path",
        "polygon",
        "polyline",
        "rect",
        "set",
        "stop",
        "tref",
        "use",
        "view",
        "vkern"
      ].join("|") + ")(?:[.#][a-zA-Z0-9\x7F-\uFFFF_:-]+)*$");
      function selfClosing(tag) {
        return closeRE.test(tag);
      }
    }
  });

  // node_modules/nanohtml/lib/append-child.js
  var require_append_child = __commonJS({
    "node_modules/nanohtml/lib/append-child.js"(exports2, module2) {
      "use strict";
      var trailingNewlineRegex = /\n[\s]+$/;
      var leadingNewlineRegex = /^\n[\s]+/;
      var trailingSpaceRegex = /[\s]+$/;
      var leadingSpaceRegex = /^[\s]+/;
      var multiSpaceRegex = /[\n\s]+/g;
      var TEXT_TAGS = [
        "a",
        "abbr",
        "b",
        "bdi",
        "bdo",
        "br",
        "cite",
        "data",
        "dfn",
        "em",
        "i",
        "kbd",
        "mark",
        "q",
        "rp",
        "rt",
        "rtc",
        "ruby",
        "s",
        "amp",
        "small",
        "span",
        "strong",
        "sub",
        "sup",
        "time",
        "u",
        "var",
        "wbr"
      ];
      var VERBATIM_TAGS = [
        "code",
        "pre",
        "textarea"
      ];
      module2.exports = function appendChild(el, childs) {
        if (!Array.isArray(childs))
          return;
        var nodeName = el.nodeName.toLowerCase();
        var hadText = false;
        var value, leader;
        for (var i = 0, len = childs.length; i < len; i++) {
          var node = childs[i];
          if (Array.isArray(node)) {
            appendChild(el, node);
            continue;
          }
          if (typeof node === "number" || typeof node === "boolean" || typeof node === "function" || node instanceof Date || node instanceof RegExp) {
            node = node.toString();
          }
          var lastChild = el.childNodes[el.childNodes.length - 1];
          if (typeof node === "string") {
            hadText = true;
            if (lastChild && lastChild.nodeName === "#text") {
              lastChild.nodeValue += node;
            } else {
              node = el.ownerDocument.createTextNode(node);
              el.appendChild(node);
              lastChild = node;
            }
            if (i === len - 1) {
              hadText = false;
              if (TEXT_TAGS.indexOf(nodeName) === -1 && VERBATIM_TAGS.indexOf(nodeName) === -1) {
                value = lastChild.nodeValue.replace(leadingNewlineRegex, "").replace(trailingSpaceRegex, "").replace(trailingNewlineRegex, "").replace(multiSpaceRegex, " ");
                if (value === "") {
                  el.removeChild(lastChild);
                } else {
                  lastChild.nodeValue = value;
                }
              } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
                leader = i === 0 ? "" : " ";
                value = lastChild.nodeValue.replace(leadingNewlineRegex, leader).replace(leadingSpaceRegex, " ").replace(trailingSpaceRegex, "").replace(trailingNewlineRegex, "").replace(multiSpaceRegex, " ");
                lastChild.nodeValue = value;
              }
            }
          } else if (node && node.nodeType) {
            if (hadText) {
              hadText = false;
              if (TEXT_TAGS.indexOf(nodeName) === -1 && VERBATIM_TAGS.indexOf(nodeName) === -1) {
                value = lastChild.nodeValue.replace(leadingNewlineRegex, "").replace(trailingNewlineRegex, " ").replace(multiSpaceRegex, " ");
                if (value === "") {
                  el.removeChild(lastChild);
                } else {
                  lastChild.nodeValue = value;
                }
              } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
                value = lastChild.nodeValue.replace(leadingSpaceRegex, " ").replace(leadingNewlineRegex, "").replace(trailingNewlineRegex, " ").replace(multiSpaceRegex, " ");
                lastChild.nodeValue = value;
              }
            }
            var _nodeName = node.nodeName;
            if (_nodeName)
              nodeName = _nodeName.toLowerCase();
            el.appendChild(node);
          }
        }
      };
    }
  });

  // node_modules/nanohtml/lib/svg-tags.js
  var require_svg_tags = __commonJS({
    "node_modules/nanohtml/lib/svg-tags.js"(exports2, module2) {
      "use strict";
      module2.exports = [
        "svg",
        "altGlyph",
        "altGlyphDef",
        "altGlyphItem",
        "animate",
        "animateColor",
        "animateMotion",
        "animateTransform",
        "circle",
        "clipPath",
        "color-profile",
        "cursor",
        "defs",
        "desc",
        "ellipse",
        "feBlend",
        "feColorMatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "filter",
        "font",
        "font-face",
        "font-face-format",
        "font-face-name",
        "font-face-src",
        "font-face-uri",
        "foreignObject",
        "g",
        "glyph",
        "glyphRef",
        "hkern",
        "image",
        "line",
        "linearGradient",
        "marker",
        "mask",
        "metadata",
        "missing-glyph",
        "mpath",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialGradient",
        "rect",
        "set",
        "stop",
        "switch",
        "symbol",
        "text",
        "textPath",
        "title",
        "tref",
        "tspan",
        "use",
        "view",
        "vkern"
      ];
    }
  });

  // node_modules/nanohtml/lib/bool-props.js
  var require_bool_props = __commonJS({
    "node_modules/nanohtml/lib/bool-props.js"(exports2, module2) {
      "use strict";
      module2.exports = [
        "async",
        "autofocus",
        "autoplay",
        "checked",
        "controls",
        "default",
        "defaultchecked",
        "defer",
        "disabled",
        "formnovalidate",
        "hidden",
        "ismap",
        "loop",
        "multiple",
        "muted",
        "novalidate",
        "open",
        "playsinline",
        "readonly",
        "required",
        "reversed",
        "selected"
      ];
    }
  });

  // node_modules/nanohtml/lib/direct-props.js
  var require_direct_props = __commonJS({
    "node_modules/nanohtml/lib/direct-props.js"(exports2, module2) {
      "use strict";
      module2.exports = [
        "indeterminate"
      ];
    }
  });

  // node_modules/nanohtml/lib/dom.js
  var require_dom = __commonJS({
    "node_modules/nanohtml/lib/dom.js"(exports2, module2) {
      "use strict";
      var hyperx = require_hyperx();
      var appendChild = require_append_child();
      var SVG_TAGS = require_svg_tags();
      var BOOL_PROPS = require_bool_props();
      var DIRECT_PROPS = require_direct_props();
      var SVGNS = "http://www.w3.org/2000/svg";
      var XLINKNS = "http://www.w3.org/1999/xlink";
      var COMMENT_TAG = "!--";
      module2.exports = function(document2) {
        function nanoHtmlCreateElement(tag, props2, children) {
          var el;
          if (SVG_TAGS.indexOf(tag) !== -1) {
            props2.namespace = SVGNS;
          }
          var ns = false;
          if (props2.namespace) {
            ns = props2.namespace;
            delete props2.namespace;
          }
          var isCustomElement = false;
          if (props2.is) {
            isCustomElement = props2.is;
            delete props2.is;
          }
          if (ns) {
            if (isCustomElement) {
              el = document2.createElementNS(ns, tag, { is: isCustomElement });
            } else {
              el = document2.createElementNS(ns, tag);
            }
          } else if (tag === COMMENT_TAG) {
            return document2.createComment(props2.comment);
          } else if (isCustomElement) {
            el = document2.createElement(tag, { is: isCustomElement });
          } else {
            el = document2.createElement(tag);
          }
          for (var p in props2) {
            if (props2.hasOwnProperty(p)) {
              var key = p.toLowerCase();
              var val = props2[p];
              if (key === "classname") {
                key = "class";
                p = "class";
              }
              if (p === "htmlFor") {
                p = "for";
              }
              if (BOOL_PROPS.indexOf(key) !== -1) {
                if (String(val) === "true")
                  val = key;
                else if (String(val) === "false")
                  continue;
              }
              if (key.slice(0, 2) === "on" || DIRECT_PROPS.indexOf(key) !== -1) {
                el[p] = val;
              } else {
                if (ns) {
                  if (p === "xlink:href") {
                    el.setAttributeNS(XLINKNS, p, val);
                  } else if (/^xmlns($|:)/i.test(p)) {
                  } else {
                    el.setAttributeNS(null, p, val);
                  }
                } else {
                  el.setAttribute(p, val);
                }
              }
            }
          }
          appendChild(el, children);
          return el;
        }
        function createFragment(nodes) {
          var fragment = document2.createDocumentFragment();
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] == null)
              continue;
            if (Array.isArray(nodes[i])) {
              fragment.appendChild(createFragment(nodes[i]));
            } else {
              if (typeof nodes[i] === "string")
                nodes[i] = document2.createTextNode(nodes[i]);
              fragment.appendChild(nodes[i]);
            }
          }
          return fragment;
        }
        var exports3 = hyperx(nanoHtmlCreateElement, {
          comments: true,
          createFragment
        });
        exports3.default = exports3;
        exports3.createComment = nanoHtmlCreateElement;
        return exports3;
      };
    }
  });

  // node_modules/nanohtml/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/nanohtml/lib/browser.js"(exports2, module2) {
      module2.exports = require_dom()(document);
    }
  });

  // node_modules/nanohtml/lib/raw-browser.js
  var require_raw_browser = __commonJS({
    "node_modules/nanohtml/lib/raw-browser.js"(exports2, module2) {
      "use strict";
      function nanohtmlRawBrowser(tag) {
        var el = document.createElement("div");
        el.innerHTML = tag;
        return toArray(el.childNodes);
      }
      function toArray(arr) {
        return Array.isArray(arr) ? arr : [].slice.call(arr);
      }
      module2.exports = nanohtmlRawBrowser;
    }
  });

  // shared/js/ui/templates/shared/toggle-button.js
  var require_toggle_button = __commonJS({
    "shared/js/ui/templates/shared/toggle-button.js"(exports2, module2) {
      "use strict";
      var bel = require_browser();
      module2.exports = function(isActiveBoolean, klass, dataKey) {
        klass = klass || "";
        dataKey = dataKey || "";
        return bel`
<button class="toggle-button toggle-button--is-active-${isActiveBoolean} ${klass}"
    data-key="${dataKey}"
    type="button"
    aria-pressed="${isActiveBoolean ? "true" : "false"}"
    >
    <div class="toggle-button__bg">
    </div>
    <div class="toggle-button__knob"></div>
</button>`;
      };
    }
  });

  // shared/js/ui/templates/privacy-options.js
  var require_privacy_options3 = __commonJS({
    "shared/js/ui/templates/privacy-options.js"(exports2, module2) {
      "use strict";
      var bel = require_browser();
      var raw = require_raw_browser();
      var toggleButton = require_toggle_button();
      var t2 = window.DDG.base.i18n.t;
      module2.exports = function() {
        return bel`<section class="options-content__privacy divider-bottom">
    <h2 class="menu-title">${t2("shared:options.title")}</h2>
    <ul class="default-list">
        <li>
            ${t2("options:showEmbeddedTweets.title")}
            ${toggleButton(
          this.model.embeddedTweetsEnabled,
          "js-options-embedded-tweets-enabled",
          "embeddedTweetsEnabled"
        )}
        </li>
        <li class="options-content__gpc-enabled">
            <h2 class="menu-title">${t2("options:globalPrivacyControlAbbr.title")}</h2>
            <p class="menu-paragraph">
                ${t2("options:globalPrivacyControlDesc.title")}
            </p>
            <ul>
                <li>
                    ${t2("options:notSellYourPersonalData.title")}
                </li>
                <li>
                    ${t2("options:limitSharingOfPersonalData.title")}
                </li>
            </ul>
            ${t2("options:globalPrivacyControlAbbr.title")}
            ${toggleButton(
          this.model.GPC,
          "js-options-gpc-enabled",
          "GPC"
        )}
            <p class="gpc-disclaimer">
                ${raw(t2("options:globalPrivacyControlDisclaimer.title"))}
            </p>
            <p class="options-info">
                <a href="https://duckduckgo.com/global-privacy-control-learn-more">${t2("shared:learnMore.title")}</a>
            </p>
        </li>
    </ul>
    <ul class="default-list${this.model.youtubeClickToLoadEnabled ? "" : " is-hidden"}">
        <li>
            <h2 class="menu-title">
                ${t2("options:enableYoutubePreviews.title")}
                ${toggleButton(this.model.youtubePreviewsEnabled, "js-options-youtube-previews-enabled", "youtubePreviewsEnabled")}
            </h2>
            <p class="menu-paragraph">
                ${raw(t2("options:enableYoutubePreviewsDesc.title"))}
                <a href="https://help.duckduckgo.com/duckduckgo-help-pages/privacy/embedded-content-protection/">${t2("shared:learnMore.title")}</a>
            </p>
        </li>
    </ul>
    <ul class="default-list${this.model.fireButtonEnabled ? "" : " is-hidden"}">
        <li>
            <h2 class="menu-title fire-title">
                ${t2("options:fireButtonHeading.title")}
            </h2>
            <p class="menu-paragraph">
                ${t2("options:fireButtonDesc.title")}
            </p>
            <p class="options-info">
                <a href="https://help.duckduckgo.com/duckduckgo-help-pages/privacy/web-tracking-protections/#the-fire-button">${t2("shared:learnMore.title")}</a>
            </p>
        </li>
        <li class="fire-button-toggle">
            ${t2("options:fireButtonClearHistoryTitle.title")}
            ${toggleButton(
          this.model.fireButtonClearHistoryEnabled,
          "js-options-firebutton-clear-history-enabled",
          "fireButtonClearHistoryEnabled"
        )}
        </li>
        <li>
            <p class="menu-paragraph">${t2("options:fireButtonClearHistoryDesc.title")}</p>
        </li>
        <li class="fire-button-toggle">
            ${t2("options:fireButtonTabClosureTitle.title")}
            ${toggleButton(
          this.model.fireButtonTabClearEnabled,
          "js-options-firebutton-tabclear-enabled",
          "fireButtonTabClearEnabled"
        )}
        </li>
    </ul>
</section>`;
      };
    }
  });

  // shared/js/ui/templates/allowlist-items.js
  var require_allowlist_items = __commonJS({
    "shared/js/ui/templates/allowlist-items.js"(exports2, module2) {
      "use strict";
      var bel = require_browser();
      var t2 = window.DDG.base.i18n.t;
      module2.exports = function(list) {
        if (list.length > 0) {
          let i = 0;
          return bel`${list.map((dom) => bel`
<li class="js-allowlist-list-item">
    <a class="link-secondary" href="https://${dom}">${dom}</a>
    <button class="remove pull-right js-allowlist-remove" data-item="${i++}">×</button>
</li>`)}`;
        }
        return bel`<li>${t2("options:noUnprotectedSitesAdded.title")}</li>`;
      };
    }
  });

  // shared/js/ui/views/allowlist.js
  var require_allowlist = __commonJS({
    "shared/js/ui/views/allowlist.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.View;
      var isHiddenClass = "is-hidden";
      var isDisabledClass = "is-disabled";
      var isInvalidInputClass = "is-invalid-input";
      var allowlistItemsTemplate = require_allowlist_items();
      function Allowlist(ops) {
        this.model = ops.model;
        this.pageView = ops.pageView;
        this.template = ops.template;
        Parent2.call(this, ops);
        this.setup();
      }
      Allowlist.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          _removeItem: function(e) {
            const itemIndex = window.$(e.target).data("item");
            this.model.removeDomain(itemIndex);
            this._renderList();
          },
          _addItem: function(e) {
            if (!this.$add.hasClass(isDisabledClass)) {
              const url = this.$url.val();
              let isValidInput = false;
              if (url) {
                isValidInput = this.model.addDomain(url);
              }
              if (isValidInput) {
                this.rerender();
              } else {
                this._showErrorMessage();
              }
            }
          },
          _showErrorMessage: function() {
            this.$add.addClass(isHiddenClass);
            this.$error.removeClass(isHiddenClass);
            this.$url.addClass(isInvalidInputClass);
          },
          _hideErrorMessage: function() {
            this.$add.removeClass(isHiddenClass);
            this.$error.addClass(isHiddenClass);
            this.$url.removeClass(isInvalidInputClass);
          },
          _manageInputChange: function(e) {
            const isButtonDisabled = this.$add.hasClass(isDisabledClass);
            this._hideErrorMessage();
            if (this.$url.val() && isButtonDisabled) {
              this.$add.removeClass(isDisabledClass);
            } else if (!this.$url.val()) {
              this.$add.addClass(isDisabledClass);
            }
            if (!isButtonDisabled && e.key === "Enter") {
              this._addItem();
            }
          },
          _showAddToAllowlistInput: function(e) {
            this.$url.removeClass(isHiddenClass);
            this.$url.focus();
            this.$add.removeClass(isHiddenClass);
            this.$showadd.addClass(isHiddenClass);
            e.preventDefault();
          },
          setup: function() {
            this._cacheElems(".js-allowlist", [
              "remove",
              "add",
              "error",
              "show-add",
              "container",
              "list-item",
              "url"
            ]);
            this.bindEvents([
              [this.$remove, "click", this._removeItem],
              [this.$add, "click", this._addItem],
              [this.$showadd, "click", this._showAddToAllowlistInput],
              [this.$url, "keyup", this._manageInputChange],
              // listen to changes to the allowlist model
              [this.store.subscribe, "change:allowlist", this.rerender]
            ]);
          },
          rerender: function() {
            this.unbindEvents();
            this._rerender();
            this.setup();
          },
          _renderList: function() {
            this.unbindEvents();
            this.$container.html(allowlistItemsTemplate(this.model.list));
            this.setup();
          }
        }
      );
      module2.exports = Allowlist;
    }
  });

  // node_modules/tldts/dist/cjs/index.js
  var require_cjs = __commonJS({
    "node_modules/tldts/dist/cjs/index.js"(exports2) {
      "use strict";
      function shareSameDomainSuffix(hostname, vhost) {
        if (hostname.endsWith(vhost)) {
          return hostname.length === vhost.length || hostname[hostname.length - vhost.length - 1] === ".";
        }
        return false;
      }
      function extractDomainWithSuffix(hostname, publicSuffix) {
        const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
        const lastDotBeforeSuffixIndex = hostname.lastIndexOf(".", publicSuffixIndex);
        if (lastDotBeforeSuffixIndex === -1) {
          return hostname;
        }
        return hostname.slice(lastDotBeforeSuffixIndex + 1);
      }
      function getDomain$1(suffix, hostname, options) {
        if (options.validHosts !== null) {
          const validHosts = options.validHosts;
          for (const vhost of validHosts) {
            if (
              /*@__INLINE__*/
              shareSameDomainSuffix(hostname, vhost)
            ) {
              return vhost;
            }
          }
        }
        let numberOfLeadingDots = 0;
        if (hostname.startsWith(".")) {
          while (numberOfLeadingDots < hostname.length && hostname[numberOfLeadingDots] === ".") {
            numberOfLeadingDots += 1;
          }
        }
        if (suffix.length === hostname.length - numberOfLeadingDots) {
          return null;
        }
        return (
          /*@__INLINE__*/
          extractDomainWithSuffix(hostname, suffix)
        );
      }
      function getDomainWithoutSuffix$1(domain, suffix) {
        return domain.slice(0, -suffix.length - 1);
      }
      function extractHostname(url, urlIsValidHostname) {
        let start = 0;
        let end = url.length;
        let hasUpper = false;
        if (!urlIsValidHostname) {
          if (url.startsWith("data:")) {
            return null;
          }
          while (start < url.length && url.charCodeAt(start) <= 32) {
            start += 1;
          }
          while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
            end -= 1;
          }
          if (url.charCodeAt(start) === 47 && url.charCodeAt(start + 1) === 47) {
            start += 2;
          } else {
            const indexOfProtocol = url.indexOf(":/", start);
            if (indexOfProtocol !== -1) {
              const protocolSize = indexOfProtocol - start;
              const c0 = url.charCodeAt(start);
              const c1 = url.charCodeAt(start + 1);
              const c2 = url.charCodeAt(start + 2);
              const c3 = url.charCodeAt(start + 3);
              const c4 = url.charCodeAt(start + 4);
              if (protocolSize === 5 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112 && c4 === 115)
                ;
              else if (protocolSize === 4 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112)
                ;
              else if (protocolSize === 3 && c0 === 119 && c1 === 115 && c2 === 115)
                ;
              else if (protocolSize === 2 && c0 === 119 && c1 === 115)
                ;
              else {
                for (let i = start; i < indexOfProtocol; i += 1) {
                  const lowerCaseCode = url.charCodeAt(i) | 32;
                  if (!(lowerCaseCode >= 97 && lowerCaseCode <= 122 || // [a, z]
                  lowerCaseCode >= 48 && lowerCaseCode <= 57 || // [0, 9]
                  lowerCaseCode === 46 || // '.'
                  lowerCaseCode === 45 || // '-'
                  lowerCaseCode === 43)) {
                    return null;
                  }
                }
              }
              start = indexOfProtocol + 2;
              while (url.charCodeAt(start) === 47) {
                start += 1;
              }
            }
          }
          let indexOfIdentifier = -1;
          let indexOfClosingBracket = -1;
          let indexOfPort = -1;
          for (let i = start; i < end; i += 1) {
            const code = url.charCodeAt(i);
            if (code === 35 || // '#'
            code === 47 || // '/'
            code === 63) {
              end = i;
              break;
            } else if (code === 64) {
              indexOfIdentifier = i;
            } else if (code === 93) {
              indexOfClosingBracket = i;
            } else if (code === 58) {
              indexOfPort = i;
            } else if (code >= 65 && code <= 90) {
              hasUpper = true;
            }
          }
          if (indexOfIdentifier !== -1 && indexOfIdentifier > start && indexOfIdentifier < end) {
            start = indexOfIdentifier + 1;
          }
          if (url.charCodeAt(start) === 91) {
            if (indexOfClosingBracket !== -1) {
              return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
            }
            return null;
          } else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
            end = indexOfPort;
          }
        }
        while (end > start + 1 && url.charCodeAt(end - 1) === 46) {
          end -= 1;
        }
        const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
        if (hasUpper) {
          return hostname.toLowerCase();
        }
        return hostname;
      }
      function isProbablyIpv4(hostname) {
        if (hostname.length < 7) {
          return false;
        }
        if (hostname.length > 15) {
          return false;
        }
        let numberOfDots = 0;
        for (let i = 0; i < hostname.length; i += 1) {
          const code = hostname.charCodeAt(i);
          if (code === 46) {
            numberOfDots += 1;
          } else if (code < 48 || code > 57) {
            return false;
          }
        }
        return numberOfDots === 3 && hostname.charCodeAt(0) !== 46 && hostname.charCodeAt(hostname.length - 1) !== 46;
      }
      function isProbablyIpv6(hostname) {
        if (hostname.length < 3) {
          return false;
        }
        let start = hostname.startsWith("[") ? 1 : 0;
        let end = hostname.length;
        if (hostname[end - 1] === "]") {
          end -= 1;
        }
        if (end - start > 39) {
          return false;
        }
        let hasColon = false;
        for (; start < end; start += 1) {
          const code = hostname.charCodeAt(start);
          if (code === 58) {
            hasColon = true;
          } else if (!(code >= 48 && code <= 57 || // 0-9
          code >= 97 && code <= 102 || // a-f
          code >= 65 && code <= 90)) {
            return false;
          }
        }
        return hasColon;
      }
      function isIp(hostname) {
        return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
      }
      function isValidAscii(code) {
        return code >= 97 && code <= 122 || code >= 48 && code <= 57 || code > 127;
      }
      function isValidHostname(hostname) {
        if (hostname.length > 255) {
          return false;
        }
        if (hostname.length === 0) {
          return false;
        }
        if (
          /*@__INLINE__*/
          !isValidAscii(hostname.charCodeAt(0)) && hostname.charCodeAt(0) !== 46 && // '.' (dot)
          hostname.charCodeAt(0) !== 95
        ) {
          return false;
        }
        let lastDotIndex = -1;
        let lastCharCode = -1;
        const len = hostname.length;
        for (let i = 0; i < len; i += 1) {
          const code = hostname.charCodeAt(i);
          if (code === 46) {
            if (
              // Check that previous label is < 63 bytes long (64 = 63 + '.')
              i - lastDotIndex > 64 || // Check that previous character was not already a '.'
              lastCharCode === 46 || // Check that the previous label does not end with a '-' (dash)
              lastCharCode === 45 || // Check that the previous label does not end with a '_' (underscore)
              lastCharCode === 95
            ) {
              return false;
            }
            lastDotIndex = i;
          } else if (!/*@__INLINE__*/
          (isValidAscii(code) || code === 45 || code === 95)) {
            return false;
          }
          lastCharCode = code;
        }
        return (
          // Check that last label is shorter than 63 chars
          len - lastDotIndex - 1 <= 63 && // Check that the last character is an allowed trailing label character.
          // Since we already checked that the char is a valid hostname character,
          // we only need to check that it's different from '-'.
          lastCharCode !== 45
        );
      }
      function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, extractHostname: extractHostname2 = true, mixedInputs = true, validHosts = null, validateHostname = true }) {
        return {
          allowIcannDomains,
          allowPrivateDomains,
          detectIp,
          extractHostname: extractHostname2,
          mixedInputs,
          validHosts,
          validateHostname
        };
      }
      var DEFAULT_OPTIONS = (
        /*@__INLINE__*/
        setDefaultsImpl({})
      );
      function setDefaults(options) {
        if (options === void 0) {
          return DEFAULT_OPTIONS;
        }
        return (
          /*@__INLINE__*/
          setDefaultsImpl(options)
        );
      }
      function getSubdomain$1(hostname, domain) {
        if (domain.length === hostname.length) {
          return "";
        }
        return hostname.slice(0, -domain.length - 1);
      }
      function getEmptyResult() {
        return {
          domain: null,
          domainWithoutSuffix: null,
          hostname: null,
          isIcann: null,
          isIp: null,
          isPrivate: null,
          publicSuffix: null,
          subdomain: null
        };
      }
      function resetResult(result) {
        result.domain = null;
        result.domainWithoutSuffix = null;
        result.hostname = null;
        result.isIcann = null;
        result.isIp = null;
        result.isPrivate = null;
        result.publicSuffix = null;
        result.subdomain = null;
      }
      function parseImpl(url, step, suffixLookup2, partialOptions, result) {
        const options = (
          /*@__INLINE__*/
          setDefaults(partialOptions)
        );
        if (typeof url !== "string") {
          return result;
        }
        if (!options.extractHostname) {
          result.hostname = url;
        } else if (options.mixedInputs) {
          result.hostname = extractHostname(url, isValidHostname(url));
        } else {
          result.hostname = extractHostname(url, false);
        }
        if (step === 0 || result.hostname === null) {
          return result;
        }
        if (options.detectIp) {
          result.isIp = isIp(result.hostname);
          if (result.isIp) {
            return result;
          }
        }
        if (options.validateHostname && options.extractHostname && !isValidHostname(result.hostname)) {
          result.hostname = null;
          return result;
        }
        suffixLookup2(result.hostname, options, result);
        if (step === 2 || result.publicSuffix === null) {
          return result;
        }
        result.domain = getDomain$1(result.publicSuffix, result.hostname, options);
        if (step === 3 || result.domain === null) {
          return result;
        }
        result.subdomain = getSubdomain$1(result.hostname, result.domain);
        if (step === 4) {
          return result;
        }
        result.domainWithoutSuffix = getDomainWithoutSuffix$1(result.domain, result.publicSuffix);
        return result;
      }
      function fastPathLookup(hostname, options, out) {
        if (!options.allowPrivateDomains && hostname.length > 3) {
          const last = hostname.length - 1;
          const c3 = hostname.charCodeAt(last);
          const c2 = hostname.charCodeAt(last - 1);
          const c1 = hostname.charCodeAt(last - 2);
          const c0 = hostname.charCodeAt(last - 3);
          if (c3 === 109 && c2 === 111 && c1 === 99 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "com";
            return true;
          } else if (c3 === 103 && c2 === 114 && c1 === 111 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "org";
            return true;
          } else if (c3 === 117 && c2 === 100 && c1 === 101 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "edu";
            return true;
          } else if (c3 === 118 && c2 === 111 && c1 === 103 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "gov";
            return true;
          } else if (c3 === 116 && c2 === 101 && c1 === 110 && c0 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "net";
            return true;
          } else if (c3 === 101 && c2 === 100 && c1 === 46) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = "de";
            return true;
          }
        }
        return false;
      }
      var exceptions2 = function() {
        const _0 = [1, {}], _1 = [0, { "city": _0 }];
        const exceptions3 = [0, { "ck": [0, { "www": _0 }], "jp": [0, { "kawasaki": _1, "kitakyushu": _1, "kobe": _1, "nagoya": _1, "sapporo": _1, "sendai": _1, "yokohama": _1 }] }];
        return exceptions3;
      }();
      var rules = function() {
        const _2 = [1, {}], _3 = [2, {}], _4 = [1, { "gov": _2, "com": _2, "org": _2, "net": _2, "edu": _2 }], _5 = [0, { "*": _3 }], _6 = [1, { "blogspot": _3 }], _7 = [1, { "gov": _2 }], _8 = [0, { "notebook": _3, "studio": _3 }], _9 = [0, { "notebook": _3 }], _10 = [0, { "notebook": _3, "notebook-fips": _3, "studio": _3 }], _11 = [0, { "notebook": _3, "notebook-fips": _3, "studio": _3, "studio-fips": _3 }], _12 = [0, { "*": _2 }], _13 = [0, { "cloud": _3 }], _14 = [1, { "co": _3 }], _15 = [2, { "nodes": _3 }], _16 = [0, { "s3": _3, "s3-accesspoint": _3, "s3-website": _3 }], _17 = [0, { "s3": _3, "s3-accesspoint": _3 }], _18 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _17, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3 }], _19 = [0, { "direct": _3 }], _20 = [2, { "id": _3 }], _21 = [0, { "webview-assets": _3 }], _22 = [0, { "vfs": _3, "webview-assets": _3 }], _23 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _16, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3, "aws-cloud9": _21, "cloud9": _22 }], _24 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _17, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3, "aws-cloud9": _21, "cloud9": _22 }], _25 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _16, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _21, "cloud9": _22 }], _26 = [0, { "execute-api": _3, "dualstack": _17, "s3": _3, "s3-accesspoint": _3, "s3-object-lambda": _3, "s3-website": _3 }], _27 = [0, { "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3, "s3-website": _3 }], _28 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _27, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3, "aws-cloud9": _21, "cloud9": _22 }], _29 = [0, { "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3 }], _30 = [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _29, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3 }], _31 = [0, { "auth": _3 }], _32 = [0, { "auth": _3, "auth-fips": _3 }], _33 = [0, { "apps": _3 }], _34 = [0, { "paas": _3 }], _35 = [0, { "app": _3 }], _36 = [2, { "eu": _3 }], _37 = [0, { "site": _3 }], _38 = [0, { "pages": _3 }], _39 = [1, { "com": _2, "edu": _2, "net": _2, "org": _2 }], _40 = [0, { "j": _3 }], _41 = [0, { "jelastic": _3 }], _42 = [0, { "user": _3 }], _43 = [1, { "ybo": _3 }], _44 = [0, { "cust": _3, "reservd": _3 }], _45 = [0, { "cust": _3 }], _46 = [1, { "gov": _2, "edu": _2, "mil": _2, "com": _2, "org": _2, "net": _2 }], _47 = [0, { "s3": _3 }], _48 = [1, { "edu": _2, "biz": _2, "net": _2, "org": _2, "gov": _2, "info": _2, "com": _2 }], _49 = [1, { "gov": _2, "blogspot": _3 }], _50 = [1, { "framer": _3 }], _51 = [1, { "barsy": _3 }], _52 = [0, { "forgot": _3 }], _53 = [1, { "gs": _2 }], _54 = [0, { "nes": _2 }], _55 = [1, { "k12": _2, "cc": _2, "lib": _2 }], _56 = [1, { "cc": _2, "lib": _2 }];
        const rules2 = [0, { "ac": [1, { "com": _2, "edu": _2, "gov": _2, "net": _2, "mil": _2, "org": _2, "drr": _3 }], "ad": [1, { "nom": _2 }], "ae": [1, { "co": _2, "net": _2, "org": _2, "sch": _2, "ac": _2, "gov": _2, "mil": _2, "blogspot": _3 }], "aero": [1, { "accident-investigation": _2, "accident-prevention": _2, "aerobatic": _2, "aeroclub": _2, "aerodrome": _2, "agents": _2, "aircraft": _2, "airline": _2, "airport": _2, "air-surveillance": _2, "airtraffic": _2, "air-traffic-control": _2, "ambulance": _2, "amusement": _2, "association": _2, "author": _2, "ballooning": _2, "broker": _2, "caa": _2, "cargo": _2, "catering": _2, "certification": _2, "championship": _2, "charter": _2, "civilaviation": _2, "club": _2, "conference": _2, "consultant": _2, "consulting": _2, "control": _2, "council": _2, "crew": _2, "design": _2, "dgca": _2, "educator": _2, "emergency": _2, "engine": _2, "engineer": _2, "entertainment": _2, "equipment": _2, "exchange": _2, "express": _2, "federation": _2, "flight": _2, "fuel": _2, "gliding": _2, "government": _2, "groundhandling": _2, "group": _2, "hanggliding": _2, "homebuilt": _2, "insurance": _2, "journal": _2, "journalist": _2, "leasing": _2, "logistics": _2, "magazine": _2, "maintenance": _2, "media": _2, "microlight": _2, "modelling": _2, "navigation": _2, "parachuting": _2, "paragliding": _2, "passenger-association": _2, "pilot": _2, "press": _2, "production": _2, "recreation": _2, "repbody": _2, "res": _2, "research": _2, "rotorcraft": _2, "safety": _2, "scientist": _2, "services": _2, "show": _2, "skydiving": _2, "software": _2, "student": _2, "trader": _2, "trading": _2, "trainer": _2, "union": _2, "workinggroup": _2, "works": _2 }], "af": _4, "ag": [1, { "com": _2, "org": _2, "net": _2, "co": _2, "nom": _2 }], "ai": [1, { "off": _2, "com": _2, "net": _2, "org": _2, "uwu": _3 }], "al": [1, { "com": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "blogspot": _3 }], "am": [1, { "co": _2, "com": _2, "commune": _2, "net": _2, "org": _2, "radio": _3, "blogspot": _3, "neko": _3, "nyaa": _3 }], "ao": [1, { "ed": _2, "gv": _2, "og": _2, "co": _2, "pb": _2, "it": _2 }], "aq": _2, "ar": [1, { "bet": _2, "com": _6, "coop": _2, "edu": _2, "gob": _2, "gov": _2, "int": _2, "mil": _2, "musica": _2, "mutual": _2, "net": _2, "org": _2, "senasa": _2, "tur": _2 }], "arpa": [1, { "e164": _2, "in-addr": _2, "ip6": _2, "iris": _2, "uri": _2, "urn": _2 }], "as": _7, "asia": [1, { "cloudns": _3 }], "at": [1, { "ac": [1, { "sth": _2 }], "co": _6, "gv": _2, "or": _2, "funkfeuer": [0, { "wien": _3 }], "futurecms": [0, { "*": _3, "ex": _5, "in": _5 }], "futurehosting": _3, "futuremailing": _3, "ortsinfo": [0, { "ex": _5, "kunden": _5 }], "biz": _3, "info": _3, "123webseite": _3, "priv": _3, "myspreadshop": _3, "12hp": _3, "2ix": _3, "4lima": _3, "lima-city": _3 }], "au": [1, { "com": [1, { "blogspot": _3, "cloudlets": [0, { "mel": _3 }], "myspreadshop": _3 }], "net": _2, "org": _2, "edu": [1, { "act": _2, "catholic": _2, "nsw": [1, { "schools": _2 }], "nt": _2, "qld": _2, "sa": _2, "tas": _2, "vic": _2, "wa": _2 }], "gov": [1, { "qld": _2, "sa": _2, "tas": _2, "vic": _2, "wa": _2 }], "asn": _2, "id": _2, "info": _2, "conf": _2, "oz": _2, "act": _2, "nsw": _2, "nt": _2, "qld": _2, "sa": _2, "tas": _2, "vic": _2, "wa": _2 }], "aw": [1, { "com": _2 }], "ax": [1, { "be": _3, "cat": _3, "es": _3, "eu": _3, "gg": _3, "mc": _3, "us": _3, "xy": _3 }], "az": [1, { "com": _2, "net": _2, "int": _2, "gov": _2, "org": _2, "edu": _2, "info": _2, "pp": _2, "mil": _2, "name": _2, "pro": _2, "biz": _2 }], "ba": [1, { "com": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "rs": _3, "blogspot": _3 }], "bb": [1, { "biz": _2, "co": _2, "com": _2, "edu": _2, "gov": _2, "info": _2, "net": _2, "org": _2, "store": _2, "tv": _2 }], "bd": _12, "be": [1, { "ac": _2, "webhosting": _3, "blogspot": _3, "interhostsolutions": _13, "kuleuven": [0, { "ezproxy": _3 }], "123website": _3, "myspreadshop": _3, "transurl": _5 }], "bf": _7, "bg": [1, { "0": _2, "1": _2, "2": _2, "3": _2, "4": _2, "5": _2, "6": _2, "7": _2, "8": _2, "9": _2, "a": _2, "b": _2, "c": _2, "d": _2, "e": _2, "f": _2, "g": _2, "h": _2, "i": _2, "j": _2, "k": _2, "l": _2, "m": _2, "n": _2, "o": _2, "p": _2, "q": _2, "r": _2, "s": _2, "t": _2, "u": _2, "v": _2, "w": _2, "x": _2, "y": _2, "z": _2, "blogspot": _3, "barsy": _3 }], "bh": _4, "bi": [1, { "co": _2, "com": _2, "edu": _2, "or": _2, "org": _2 }], "biz": [1, { "activetrail": _3, "cloudns": _3, "jozi": _3, "dyndns": _3, "for-better": _3, "for-more": _3, "for-some": _3, "for-the": _3, "selfip": _3, "webhop": _3, "orx": _3, "mmafan": _3, "myftp": _3, "no-ip": _3, "dscloud": _3 }], "bj": [1, { "africa": _2, "agro": _2, "architectes": _2, "assur": _2, "avocats": _2, "co": _2, "com": _2, "eco": _2, "econo": _2, "edu": _2, "info": _2, "loisirs": _2, "money": _2, "net": _2, "org": _2, "ote": _2, "resto": _2, "restaurant": _2, "tourism": _2, "univ": _2, "blogspot": _3 }], "bm": _4, "bn": [1, { "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2, "co": _3 }], "bo": [1, { "com": _2, "edu": _2, "gob": _2, "int": _2, "org": _2, "net": _2, "mil": _2, "tv": _2, "web": _2, "academia": _2, "agro": _2, "arte": _2, "blog": _2, "bolivia": _2, "ciencia": _2, "cooperativa": _2, "democracia": _2, "deporte": _2, "ecologia": _2, "economia": _2, "empresa": _2, "indigena": _2, "industria": _2, "info": _2, "medicina": _2, "movimiento": _2, "musica": _2, "natural": _2, "nombre": _2, "noticias": _2, "patria": _2, "politica": _2, "profesional": _2, "plurinacional": _2, "pueblo": _2, "revista": _2, "salud": _2, "tecnologia": _2, "tksat": _2, "transporte": _2, "wiki": _2 }], "br": [1, { "9guacu": _2, "abc": _2, "adm": _2, "adv": _2, "agr": _2, "aju": _2, "am": _2, "anani": _2, "aparecida": _2, "app": _2, "arq": _2, "art": _2, "ato": _2, "b": _2, "barueri": _2, "belem": _2, "bhz": _2, "bib": _2, "bio": _2, "blog": _2, "bmd": _2, "boavista": _2, "bsb": _2, "campinagrande": _2, "campinas": _2, "caxias": _2, "cim": _2, "cng": _2, "cnt": _2, "com": [1, { "blogspot": _3, "simplesite": _3 }], "contagem": _2, "coop": _2, "coz": _2, "cri": _2, "cuiaba": _2, "curitiba": _2, "def": _2, "des": _2, "det": _2, "dev": _2, "ecn": _2, "eco": _2, "edu": _2, "emp": _2, "enf": _2, "eng": _2, "esp": _2, "etc": _2, "eti": _2, "far": _2, "feira": _2, "flog": _2, "floripa": _2, "fm": _2, "fnd": _2, "fortal": _2, "fot": _2, "foz": _2, "fst": _2, "g12": _2, "geo": _2, "ggf": _2, "goiania": _2, "gov": [1, { "ac": _2, "al": _2, "am": _2, "ap": _2, "ba": _2, "ce": _2, "df": _2, "es": _2, "go": _2, "ma": _2, "mg": _2, "ms": _2, "mt": _2, "pa": _2, "pb": _2, "pe": _2, "pi": _2, "pr": _2, "rj": _2, "rn": _2, "ro": _2, "rr": _2, "rs": _2, "sc": _2, "se": _2, "sp": _2, "to": _2 }], "gru": _2, "imb": _2, "ind": _2, "inf": _2, "jab": _2, "jampa": _2, "jdf": _2, "joinville": _2, "jor": _2, "jus": _2, "leg": [1, { "ac": _3, "al": _3, "am": _3, "ap": _3, "ba": _3, "ce": _3, "df": _3, "es": _3, "go": _3, "ma": _3, "mg": _3, "ms": _3, "mt": _3, "pa": _3, "pb": _3, "pe": _3, "pi": _3, "pr": _3, "rj": _3, "rn": _3, "ro": _3, "rr": _3, "rs": _3, "sc": _3, "se": _3, "sp": _3, "to": _3 }], "lel": _2, "log": _2, "londrina": _2, "macapa": _2, "maceio": _2, "manaus": _2, "maringa": _2, "mat": _2, "med": _2, "mil": _2, "morena": _2, "mp": _2, "mus": _2, "natal": _2, "net": _2, "niteroi": _2, "nom": _12, "not": _2, "ntr": _2, "odo": _2, "ong": _2, "org": _2, "osasco": _2, "palmas": _2, "poa": _2, "ppg": _2, "pro": _2, "psc": _2, "psi": _2, "pvh": _2, "qsl": _2, "radio": _2, "rec": _2, "recife": _2, "rep": _2, "ribeirao": _2, "rio": _2, "riobranco": _2, "riopreto": _2, "salvador": _2, "sampa": _2, "santamaria": _2, "santoandre": _2, "saobernardo": _2, "saogonca": _2, "seg": _2, "sjc": _2, "slg": _2, "slz": _2, "sorocaba": _2, "srv": _2, "taxi": _2, "tc": _2, "tec": _2, "teo": _2, "the": _2, "tmp": _2, "trd": _2, "tur": _2, "tv": _2, "udi": _2, "vet": _2, "vix": _2, "vlog": _2, "wiki": _2, "zlg": _2 }], "bs": [1, { "com": _2, "net": _2, "org": _2, "edu": _2, "gov": _2, "we": _3 }], "bt": _4, "bv": _2, "bw": [1, { "co": _2, "org": _2 }], "by": [1, { "gov": _2, "mil": _2, "com": _6, "of": _2, "mycloud": _3, "mediatech": _3 }], "bz": [1, { "com": _2, "net": _2, "org": _2, "edu": _2, "gov": _2, "za": _3, "gsj": _3 }], "ca": [1, { "ab": _2, "bc": _2, "mb": _2, "nb": _2, "nf": _2, "nl": _2, "ns": _2, "nt": _2, "nu": _2, "on": _2, "pe": _2, "qc": _2, "sk": _2, "yk": _2, "gc": _2, "barsy": _3, "awdev": _5, "co": _3, "blogspot": _3, "no-ip": _3, "myspreadshop": _3 }], "cat": _2, "cc": [1, { "cloudns": _3, "ftpaccess": _3, "game-server": _3, "myphotos": _3, "scrapping": _3, "twmail": _3, "csx": _3, "fantasyleague": _3, "spawn": [0, { "instances": _3 }] }], "cd": _7, "cf": _6, "cg": _2, "ch": [1, { "square7": _3, "blogspot": _3, "flow": [0, { "ae": [0, { "alp1": _3 }], "appengine": _3 }], "linkyard-cloud": _3, "dnsking": _3, "gotdns": _3, "123website": _3, "myspreadshop": _3, "firenet": [0, { "*": _3, "svc": _5 }], "12hp": _3, "2ix": _3, "4lima": _3, "lima-city": _3 }], "ci": [1, { "org": _2, "or": _2, "com": _2, "co": _2, "edu": _2, "ed": _2, "ac": _2, "net": _2, "go": _2, "asso": _2, "xn--aroport-bya": _2, "a\xE9roport": _2, "int": _2, "presse": _2, "md": _2, "gouv": _2, "fin": _3, "nl": _3 }], "ck": _12, "cl": [1, { "co": _2, "gob": _2, "gov": _2, "mil": _2, "blogspot": _3 }], "cm": [1, { "co": _2, "com": _2, "gov": _2, "net": _2 }], "cn": [1, { "ac": _2, "com": [1, { "amazonaws": [0, { "cn-north-1": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _16, "s3": _3, "s3-accesspoint": _3, "s3-deprecated": _3, "s3-object-lambda": _3, "s3-website": _3 }], "cn-northwest-1": _18, "compute": _5, "airflow": [0, { "cn-north-1": _5, "cn-northwest-1": _5 }], "eb": [0, { "cn-north-1": _3, "cn-northwest-1": _3 }], "elb": _5 }], "sagemaker": [0, { "cn-north-1": _8, "cn-northwest-1": _8 }] }], "edu": _2, "gov": _2, "net": _2, "org": _2, "mil": _2, "xn--55qx5d": _2, "\u516C\u53F8": _2, "xn--io0a7i": _2, "\u7F51\u7EDC": _2, "xn--od0alg": _2, "\u7DB2\u7D61": _2, "ah": _2, "bj": _2, "cq": _2, "fj": _2, "gd": _2, "gs": _2, "gz": _2, "gx": _2, "ha": _2, "hb": _2, "he": _2, "hi": _2, "hl": _2, "hn": _2, "jl": _2, "js": _2, "jx": _2, "ln": _2, "nm": _2, "nx": _2, "qh": _2, "sc": _2, "sd": _2, "sh": _2, "sn": _2, "sx": _2, "tj": _2, "xj": _2, "xz": _2, "yn": _2, "zj": _2, "hk": _2, "mo": _2, "tw": _2, "canva-apps": _3, "instantcloud": _3, "quickconnect": _19 }], "co": [1, { "arts": _2, "com": _6, "edu": _2, "firm": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "nom": _2, "org": _2, "rec": _2, "web": _2, "carrd": _3, "crd": _3, "otap": _5, "leadpages": _3, "lpages": _3, "mypi": _3, "n4t": _3, "firewalledreplit": _20, "repl": _20, "supabase": _3 }], "com": [1, { "devcdnaccesso": _5, "adobeaemcloud": [2, { "dev": _5 }], "airkitapps": _3, "airkitapps-au": _3, "aivencloud": _3, "kasserver": _3, "amazonaws": [0, { "af-south-1": _23, "ap-east-1": _24, "ap-northeast-1": _25, "ap-northeast-2": _25, "ap-northeast-3": _23, "ap-south-1": _25, "ap-south-2": _26, "ap-southeast-1": _25, "ap-southeast-2": _25, "ap-southeast-3": _18, "ap-southeast-4": _26, "ca-central-1": _28, "eu-central-1": _25, "eu-central-2": _26, "eu-north-1": _24, "eu-south-1": _23, "eu-south-2": _26, "eu-west-1": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _16, "s3": _3, "s3-accesspoint": _3, "s3-deprecated": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _21, "cloud9": _22 }], "eu-west-2": _24, "eu-west-3": _23, "il-central-1": _26, "me-central-1": _18, "me-south-1": _24, "sa-east-1": _23, "us-east-1": [2, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _27, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-deprecated": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _21, "cloud9": _22 }], "us-east-2": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _29, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-deprecated": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _21, "cloud9": _22 }], "us-gov-east-1": _30, "us-gov-west-1": _30, "us-west-1": _28, "us-west-2": [0, { "execute-api": _3, "emrappui-prod": _3, "emrnotebooks-prod": _3, "emrstudio-prod": _3, "dualstack": _27, "s3": _3, "s3-accesspoint": _3, "s3-accesspoint-fips": _3, "s3-deprecated": _3, "s3-fips": _3, "s3-object-lambda": _3, "s3-website": _3, "analytics-gateway": _3, "aws-cloud9": _21, "cloud9": _22 }], "compute": _5, "compute-1": _5, "airflow": [0, { "ap-northeast-1": _5, "ap-northeast-2": _5, "ap-south-1": _5, "ap-southeast-1": _5, "ap-southeast-2": _5, "ca-central-1": _5, "eu-central-1": _5, "eu-north-1": _5, "eu-west-1": _5, "eu-west-2": _5, "eu-west-3": _5, "sa-east-1": _5, "us-east-1": _5, "us-east-2": _5, "us-west-2": _5 }], "s3": _3, "s3-1": _3, "s3-ap-east-1": _3, "s3-ap-northeast-1": _3, "s3-ap-northeast-2": _3, "s3-ap-northeast-3": _3, "s3-ap-south-1": _3, "s3-ap-southeast-1": _3, "s3-ap-southeast-2": _3, "s3-ca-central-1": _3, "s3-eu-central-1": _3, "s3-eu-north-1": _3, "s3-eu-west-1": _3, "s3-eu-west-2": _3, "s3-eu-west-3": _3, "s3-external-1": _3, "s3-fips-us-gov-east-1": _3, "s3-fips-us-gov-west-1": _3, "s3-global": [0, { "accesspoint": [0, { "mrap": _3 }] }], "s3-me-south-1": _3, "s3-sa-east-1": _3, "s3-us-east-2": _3, "s3-us-gov-east-1": _3, "s3-us-gov-west-1": _3, "s3-us-west-1": _3, "s3-us-west-2": _3, "s3-website-ap-northeast-1": _3, "s3-website-ap-southeast-1": _3, "s3-website-ap-southeast-2": _3, "s3-website-eu-west-1": _3, "s3-website-sa-east-1": _3, "s3-website-us-east-1": _3, "s3-website-us-gov-west-1": _3, "s3-website-us-west-1": _3, "s3-website-us-west-2": _3, "elb": _5 }], "amazoncognito": [0, { "af-south-1": _31, "ap-northeast-1": _31, "ap-northeast-2": _31, "ap-northeast-3": _31, "ap-south-1": _31, "ap-southeast-1": _31, "ap-southeast-2": _31, "ap-southeast-3": _31, "ca-central-1": _31, "eu-central-1": _31, "eu-north-1": _31, "eu-south-1": _31, "eu-west-1": _31, "eu-west-2": _31, "eu-west-3": _31, "il-central-1": _31, "me-south-1": _31, "sa-east-1": _31, "us-east-1": _32, "us-east-2": _32, "us-gov-west-1": [0, { "auth-fips": _3 }], "us-west-1": _32, "us-west-2": _32 }], "amplifyapp": _5, "awsapprunner": _5, "elasticbeanstalk": [2, { "af-south-1": _3, "ap-east-1": _3, "ap-northeast-1": _3, "ap-northeast-2": _3, "ap-northeast-3": _3, "ap-south-1": _3, "ap-southeast-1": _3, "ap-southeast-2": _3, "ap-southeast-3": _3, "ca-central-1": _3, "eu-central-1": _3, "eu-north-1": _3, "eu-south-1": _3, "eu-west-1": _3, "eu-west-2": _3, "eu-west-3": _3, "il-central-1": _3, "me-south-1": _3, "sa-east-1": _3, "us-east-1": _3, "us-east-2": _3, "us-gov-east-1": _3, "us-gov-west-1": _3, "us-west-1": _3, "us-west-2": _3 }], "awsglobalaccelerator": _3, "siiites": _3, "appspacehosted": _3, "appspaceusercontent": _3, "on-aptible": _3, "myasustor": _3, "balena-devices": _3, "betainabox": _3, "boutir": _3, "bplaced": _3, "cafjs": _3, "canva-apps": _3, "br": _3, "cn": _3, "de": _3, "eu": _3, "jpn": _3, "mex": _3, "ru": _3, "sa": _3, "uk": _3, "us": _3, "za": _3, "ar": _3, "hu": _3, "kr": _3, "no": _3, "qc": _3, "uy": _3, "africa": _3, "gr": _3, "co": _3, "jdevcloud": _3, "wpdevcloud": _3, "cloudcontrolled": _3, "cloudcontrolapp": _3, "cf-ipfs": _3, "cloudflare-ipfs": _3, "trycloudflare": _3, "customer-oci": [0, { "*": _3, "oci": _5, "ocp": _5, "ocs": _5 }], "dattolocal": _3, "dattorelay": _3, "dattoweb": _3, "mydatto": _3, "builtwithdark": _3, "datadetect": [0, { "demo": _3, "instance": _3 }], "ddns5": _3, "discordsays": _3, "discordsez": _3, "drayddns": _3, "dreamhosters": _3, "mydrobo": _3, "dyndns-at-home": _3, "dyndns-at-work": _3, "dyndns-blog": _3, "dyndns-free": _3, "dyndns-home": _3, "dyndns-ip": _3, "dyndns-mail": _3, "dyndns-office": _3, "dyndns-pics": _3, "dyndns-remote": _3, "dyndns-server": _3, "dyndns-web": _3, "dyndns-wiki": _3, "dyndns-work": _3, "blogdns": _3, "cechire": _3, "dnsalias": _3, "dnsdojo": _3, "doesntexist": _3, "dontexist": _3, "doomdns": _3, "dyn-o-saur": _3, "dynalias": _3, "est-a-la-maison": _3, "est-a-la-masion": _3, "est-le-patron": _3, "est-mon-blogueur": _3, "from-ak": _3, "from-al": _3, "from-ar": _3, "from-ca": _3, "from-ct": _3, "from-dc": _3, "from-de": _3, "from-fl": _3, "from-ga": _3, "from-hi": _3, "from-ia": _3, "from-id": _3, "from-il": _3, "from-in": _3, "from-ks": _3, "from-ky": _3, "from-ma": _3, "from-md": _3, "from-mi": _3, "from-mn": _3, "from-mo": _3, "from-ms": _3, "from-mt": _3, "from-nc": _3, "from-nd": _3, "from-ne": _3, "from-nh": _3, "from-nj": _3, "from-nm": _3, "from-nv": _3, "from-oh": _3, "from-ok": _3, "from-or": _3, "from-pa": _3, "from-pr": _3, "from-ri": _3, "from-sc": _3, "from-sd": _3, "from-tn": _3, "from-tx": _3, "from-ut": _3, "from-va": _3, "from-vt": _3, "from-wa": _3, "from-wi": _3, "from-wv": _3, "from-wy": _3, "getmyip": _3, "gotdns": _3, "hobby-site": _3, "homelinux": _3, "homeunix": _3, "iamallama": _3, "is-a-anarchist": _3, "is-a-blogger": _3, "is-a-bookkeeper": _3, "is-a-bulls-fan": _3, "is-a-caterer": _3, "is-a-chef": _3, "is-a-conservative": _3, "is-a-cpa": _3, "is-a-cubicle-slave": _3, "is-a-democrat": _3, "is-a-designer": _3, "is-a-doctor": _3, "is-a-financialadvisor": _3, "is-a-geek": _3, "is-a-green": _3, "is-a-guru": _3, "is-a-hard-worker": _3, "is-a-hunter": _3, "is-a-landscaper": _3, "is-a-lawyer": _3, "is-a-liberal": _3, "is-a-libertarian": _3, "is-a-llama": _3, "is-a-musician": _3, "is-a-nascarfan": _3, "is-a-nurse": _3, "is-a-painter": _3, "is-a-personaltrainer": _3, "is-a-photographer": _3, "is-a-player": _3, "is-a-republican": _3, "is-a-rockstar": _3, "is-a-socialist": _3, "is-a-student": _3, "is-a-teacher": _3, "is-a-techie": _3, "is-a-therapist": _3, "is-an-accountant": _3, "is-an-actor": _3, "is-an-actress": _3, "is-an-anarchist": _3, "is-an-artist": _3, "is-an-engineer": _3, "is-an-entertainer": _3, "is-certified": _3, "is-gone": _3, "is-into-anime": _3, "is-into-cars": _3, "is-into-cartoons": _3, "is-into-games": _3, "is-leet": _3, "is-not-certified": _3, "is-slick": _3, "is-uberleet": _3, "is-with-theband": _3, "isa-geek": _3, "isa-hockeynut": _3, "issmarterthanyou": _3, "likes-pie": _3, "likescandy": _3, "neat-url": _3, "saves-the-whales": _3, "selfip": _3, "sells-for-less": _3, "sells-for-u": _3, "servebbs": _3, "simple-url": _3, "space-to-rent": _3, "teaches-yoga": _3, "writesthisblog": _3, "digitaloceanspaces": _5, "ddnsfree": _3, "ddnsgeek": _3, "giize": _3, "gleeze": _3, "kozow": _3, "loseyourip": _3, "ooguy": _3, "theworkpc": _3, "mytuleap": _3, "tuleap-partners": _3, "encoreapi": _3, "evennode": [0, { "eu-1": _3, "eu-2": _3, "eu-3": _3, "eu-4": _3, "us-1": _3, "us-2": _3, "us-3": _3, "us-4": _3 }], "onfabrica": _3, "fbsbx": _33, "fastly-edge": _3, "fastly-terrarium": _3, "fastvps-server": _3, "mydobiss": _3, "firebaseapp": _3, "fldrv": _3, "forgeblocks": _3, "framercanvas": _3, "freebox-os": _3, "freeboxos": _3, "freemyip": _3, "gentapps": _3, "gentlentapis": _3, "githubusercontent": _3, "0emm": _5, "appspot": [2, { "r": _5 }], "codespot": _3, "googleapis": _3, "googlecode": _3, "pagespeedmobilizer": _3, "publishproxy": _3, "withgoogle": _3, "withyoutube": _3, "blogspot": _3, "awsmppl": _3, "herokuapp": _3, "herokussl": _3, "impertrixcdn": _3, "impertrix": _3, "smushcdn": _3, "wphostedmail": _3, "wpmucdn": _3, "pixolino": _3, "amscompute": _3, "dopaas": _3, "hosted-by-previder": _34, "hosteur": [0, { "rag-cloud": _3, "rag-cloud-ch": _3 }], "ik-server": [0, { "jcloud": _3, "jcloud-ver-jpc": _3 }], "jelastic": [0, { "demo": _3 }], "kilatiron": _3, "massivegrid": _34, "wafaicloud": [0, { "jed": _3, "lon": _3, "ryd": _3 }], "joyent": [0, { "cns": _5 }], "ktistory": _3, "lpusercontent": _3, "lmpm": _35, "linode": [0, { "members": _3, "nodebalancer": _5 }], "linodeobjects": _5, "linodeusercontent": [0, { "ip": _3 }], "barsycenter": _3, "barsyonline": _3, "mazeplay": _3, "miniserver": _3, "meteorapp": _36, "hostedpi": _3, "mythic-beasts": [0, { "customer": _3, "caracal": _3, "fentiger": _3, "lynx": _3, "ocelot": _3, "oncilla": _3, "onza": _3, "sphinx": _3, "vs": _3, "x": _3, "yali": _3 }], "nospamproxy": _13, "4u": _3, "nfshost": _3, "001www": _3, "ddnslive": _3, "myiphost": _3, "blogsyte": _3, "ciscofreak": _3, "damnserver": _3, "ditchyourip": _3, "dnsiskinky": _3, "dynns": _3, "geekgalaxy": _3, "health-carereform": _3, "homesecuritymac": _3, "homesecuritypc": _3, "myactivedirectory": _3, "mysecuritycamera": _3, "net-freaks": _3, "onthewifi": _3, "point2this": _3, "quicksytes": _3, "securitytactics": _3, "serveexchange": _3, "servehumour": _3, "servep2p": _3, "servesarcasm": _3, "stufftoread": _3, "unusualperson": _3, "workisboring": _3, "3utilities": _3, "ddnsking": _3, "myvnc": _3, "servebeer": _3, "servecounterstrike": _3, "serveftp": _3, "servegame": _3, "servehalflife": _3, "servehttp": _3, "serveirc": _3, "servemp3": _3, "servepics": _3, "servequake": _3, "observableusercontent": [0, { "static": _3 }], "simplesite": _3, "orsites": _3, "operaunite": _3, "authgear-staging": _3, "authgearapps": _3, "skygearapp": _3, "outsystemscloud": _3, "ownprovider": _3, "pgfog": _3, "pagefrontapp": _3, "pagexl": _3, "paywhirl": _5, "gotpantheon": _3, "platter-app": _3, "pleskns": _3, "postman-echo": _3, "prgmr": [0, { "xen": _3 }], "pythonanywhere": _36, "qualifioapp": _3, "ladesk": _3, "qbuser": _3, "qa2": _3, "dev-myqnapcloud": _3, "alpha-myqnapcloud": _3, "myqnapcloud": _3, "quipelements": _5, "rackmaze": _3, "rhcloud": _3, "render": _35, "onrender": _3, "180r": _3, "dojin": _3, "sakuratan": _3, "sakuraweb": _3, "x0": _3, "code": [0, { "builder": _5, "dev-builder": _5, "stg-builder": _5 }], "logoip": _3, "scrysec": _3, "firewall-gateway": _3, "myshopblocks": _3, "myshopify": _3, "shopitsite": _3, "1kapp": _3, "appchizi": _3, "applinzi": _3, "sinaapp": _3, "vipsinaapp": _3, "bounty-full": [2, { "alpha": _3, "beta": _3 }], "streamlitapp": _3, "try-snowplow": _3, "stackhero-network": _3, "playstation-cloud": _3, "myspreadshop": _3, "stdlib": [0, { "api": _3 }], "temp-dns": _3, "dsmynas": _3, "familyds": _3, "mytabit": _3, "tb-hosting": _37, "reservd": _3, "thingdustdata": _3, "bloxcms": _3, "townnews-staging": _3, "typeform": [0, { "pro": _3 }], "hk": _3, "it": _3, "vultrobjects": _5, "wafflecell": _3, "reserve-online": _3, "hotelwithflight": _3, "remotewd": _3, "wiardweb": _38, "messwithdns": _3, "woltlab-demo": _3, "wpenginepowered": [2, { "js": _3 }], "wixsite": _3, "xnbay": [2, { "u2": _3, "u2-local": _3 }], "yolasite": _3 }], "coop": _2, "cr": [1, { "ac": _2, "co": _2, "ed": _2, "fi": _2, "go": _2, "or": _2, "sa": _2 }], "cu": [1, { "com": _2, "edu": _2, "org": _2, "net": _2, "gov": _2, "inf": _2 }], "cv": [1, { "com": _2, "edu": _2, "int": _2, "nome": _2, "org": _2, "blogspot": _3 }], "cw": _39, "cx": [1, { "gov": _2, "ath": _3, "info": _3 }], "cy": [1, { "ac": _2, "biz": _2, "com": [1, { "blogspot": _3, "scaleforce": _40 }], "ekloges": _2, "gov": _2, "ltd": _2, "mil": _2, "net": _2, "org": _2, "press": _2, "pro": _2, "tm": _2 }], "cz": [1, { "co": _3, "realm": _3, "e4": _3, "blogspot": _3, "metacentrum": [0, { "cloud": _5, "custom": _3 }], "muni": [0, { "cloud": [0, { "flt": _3, "usr": _3 }] }] }], "de": [1, { "bplaced": _3, "square7": _3, "com": _3, "cosidns": [0, { "dyn": _3 }], "dynamisches-dns": _3, "dnsupdater": _3, "internet-dns": _3, "l-o-g-i-n": _3, "dnshome": _3, "fuettertdasnetz": _3, "isteingeek": _3, "istmein": _3, "lebtimnetz": _3, "leitungsen": _3, "traeumtgerade": _3, "ddnss": [2, { "dyn": _3, "dyndns": _3 }], "dyndns1": _3, "dyn-ip24": _3, "home-webserver": [2, { "dyn": _3 }], "myhome-server": _3, "frusky": _5, "goip": _3, "blogspot": _3, "xn--gnstigbestellen-zvb": _3, "g\xFCnstigbestellen": _3, "xn--gnstigliefern-wob": _3, "g\xFCnstigliefern": _3, "hs-heilbronn": [0, { "it": _38 }], "dyn-berlin": _3, "in-berlin": _3, "in-brb": _3, "in-butter": _3, "in-dsl": _3, "in-vpn": _3, "iservschule": _3, "mein-iserv": _3, "schulplattform": _3, "schulserver": _3, "test-iserv": _3, "keymachine": _3, "git-repos": _3, "lcube-server": _3, "svn-repos": _3, "barsy": _3, "123webseite": _3, "logoip": _3, "firewall-gateway": _3, "my-gateway": _3, "my-router": _3, "spdns": _3, "speedpartner": [0, { "customer": _3 }], "myspreadshop": _3, "taifun-dns": _3, "12hp": _3, "2ix": _3, "4lima": _3, "lima-city": _3, "dd-dns": _3, "dray-dns": _3, "draydns": _3, "dyn-vpn": _3, "dynvpn": _3, "mein-vigor": _3, "my-vigor": _3, "my-wan": _3, "syno-ds": _3, "synology-diskstation": _3, "synology-ds": _3, "uberspace": _5, "virtualuser": _3, "virtual-user": _3, "community-pro": _3, "diskussionsbereich": _3 }], "dj": _2, "dk": [1, { "biz": _3, "co": _3, "firm": _3, "reg": _3, "store": _3, "blogspot": _3, "123hjemmeside": _3, "myspreadshop": _3 }], "dm": _4, "do": [1, { "art": _2, "com": _2, "edu": _2, "gob": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "sld": _2, "web": _2 }], "dz": [1, { "art": _2, "asso": _2, "com": _2, "edu": _2, "gov": _2, "org": _2, "net": _2, "pol": _2, "soc": _2, "tm": _2 }], "ec": [1, { "com": _2, "info": _2, "net": _2, "fin": _2, "k12": _2, "med": _2, "pro": _2, "org": _2, "edu": _2, "gov": _2, "gob": _2, "mil": _2, "base": _3, "official": _3 }], "edu": [1, { "rit": [0, { "git-pages": _3 }] }], "ee": [1, { "edu": _2, "gov": _2, "riik": _2, "lib": _2, "med": _2, "com": _6, "pri": _2, "aip": _2, "org": _2, "fie": _2 }], "eg": [1, { "com": _6, "edu": _2, "eun": _2, "gov": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "sci": _2 }], "er": _12, "es": [1, { "com": _6, "nom": _2, "org": _2, "gob": _2, "edu": _2, "123miweb": _3, "myspreadshop": _3 }], "et": [1, { "com": _2, "gov": _2, "org": _2, "edu": _2, "biz": _2, "name": _2, "info": _2, "net": _2 }], "eu": [1, { "airkitapps": _3, "mycd": _3, "cloudns": _3, "dogado": _41, "barsy": _3, "wellbeingzone": _3, "spdns": _3, "transurl": _5, "diskstation": _3 }], "fi": [1, { "aland": _2, "dy": _3, "blogspot": _3, "xn--hkkinen-5wa": _3, "h\xE4kkinen": _3, "iki": _3, "cloudplatform": [0, { "fi": _3 }], "datacenter": [0, { "demo": _3, "paas": _3 }], "kapsi": _3, "123kotisivu": _3, "myspreadshop": _3 }], "fj": [1, { "ac": _2, "biz": _2, "com": _2, "gov": _2, "info": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "pro": _2 }], "fk": _12, "fm": [1, { "com": _2, "edu": _2, "net": _2, "org": _2, "radio": _3, "user": _5 }], "fo": _2, "fr": [1, { "asso": _2, "com": _2, "gouv": _2, "nom": _2, "prd": _2, "tm": _2, "avoues": _2, "cci": _2, "greta": _2, "huissier-justice": _2, "en-root": _3, "fbx-os": _3, "fbxos": _3, "freebox-os": _3, "freeboxos": _3, "blogspot": _3, "goupile": _3, "123siteweb": _3, "on-web": _3, "chirurgiens-dentistes-en-france": _3, "dedibox": _3, "aeroport": _3, "avocat": _3, "chambagri": _3, "chirurgiens-dentistes": _3, "experts-comptables": _3, "medecin": _3, "notaires": _3, "pharmacien": _3, "port": _3, "veterinaire": _3, "myspreadshop": _3, "ynh": _3 }], "ga": _2, "gb": _2, "gd": [1, { "edu": _2, "gov": _2 }], "ge": [1, { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2, "net": _2, "pvt": _2 }], "gf": _2, "gg": [1, { "co": _2, "net": _2, "org": _2, "kaas": _3, "cya": _3, "panel": [2, { "daemon": _3 }] }], "gh": [1, { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2 }], "gi": [1, { "com": _2, "ltd": _2, "gov": _2, "mod": _2, "edu": _2, "org": _2 }], "gl": [1, { "co": _2, "com": _2, "edu": _2, "net": _2, "org": _2, "biz": _3, "xx": _3 }], "gm": _2, "gn": [1, { "ac": _2, "com": _2, "edu": _2, "gov": _2, "org": _2, "net": _2 }], "gov": _2, "gp": [1, { "com": _2, "net": _2, "mobi": _2, "edu": _2, "org": _2, "asso": _2, "app": _3 }], "gq": _2, "gr": [1, { "com": _2, "edu": _2, "net": _2, "org": _2, "gov": _2, "blogspot": _3, "simplesite": _3 }], "gs": _2, "gt": [1, { "com": _2, "edu": _2, "gob": _2, "ind": _2, "mil": _2, "net": _2, "org": _2, "blog": _3, "de": _3, "to": _3 }], "gu": [1, { "com": _2, "edu": _2, "gov": _2, "guam": _2, "info": _2, "net": _2, "org": _2, "web": _2 }], "gw": _2, "gy": [1, { "co": _2, "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2, "be": _3 }], "hk": [1, { "com": _2, "edu": _2, "gov": _2, "idv": _2, "net": _2, "org": _2, "xn--55qx5d": _2, "\u516C\u53F8": _2, "xn--wcvs22d": _2, "\u6559\u80B2": _2, "xn--lcvr32d": _2, "\u654E\u80B2": _2, "xn--mxtq1m": _2, "\u653F\u5E9C": _2, "xn--gmqw5a": _2, "\u500B\u4EBA": _2, "xn--ciqpn": _2, "\u4E2A\u4EBA": _2, "xn--gmq050i": _2, "\u7B87\u4EBA": _2, "xn--zf0avx": _2, "\u7DB2\u7EDC": _2, "xn--io0a7i": _2, "\u7F51\u7EDC": _2, "xn--mk0axi": _2, "\u7EC4\u7E54": _2, "xn--od0alg": _2, "\u7DB2\u7D61": _2, "xn--od0aq3b": _2, "\u7F51\u7D61": _2, "xn--tn0ag": _2, "\u7EC4\u7EC7": _2, "xn--uc0atv": _2, "\u7D44\u7E54": _2, "xn--uc0ay4a": _2, "\u7D44\u7EC7": _2, "blogspot": _3, "secaas": _3, "ltd": _3, "inc": _3 }], "hm": _2, "hn": [1, { "com": _2, "edu": _2, "org": _2, "net": _2, "mil": _2, "gob": _2, "cc": _3 }], "hr": [1, { "iz": _2, "from": _2, "name": _2, "com": _2, "blogspot": _3, "free": _3 }], "ht": [1, { "com": _2, "shop": _2, "firm": _2, "info": _2, "adult": _2, "net": _2, "pro": _2, "org": _2, "med": _2, "art": _2, "coop": _2, "pol": _2, "asso": _2, "edu": _2, "rel": _2, "gouv": _2, "perso": _2 }], "hu": [1, { "2000": _2, "co": _2, "info": _2, "org": _2, "priv": _2, "sport": _2, "tm": _2, "agrar": _2, "bolt": _2, "casino": _2, "city": _2, "erotica": _2, "erotika": _2, "film": _2, "forum": _2, "games": _2, "hotel": _2, "ingatlan": _2, "jogasz": _2, "konyvelo": _2, "lakas": _2, "media": _2, "news": _2, "reklam": _2, "sex": _2, "shop": _2, "suli": _2, "szex": _2, "tozsde": _2, "utazas": _2, "video": _2, "blogspot": _3 }], "id": [1, { "ac": _2, "biz": _2, "co": _6, "desa": _2, "go": _2, "mil": _2, "my": [1, { "rss": _5 }], "net": _2, "or": _2, "ponpes": _2, "sch": _2, "web": _2, "flap": _3, "forte": _3 }], "ie": [1, { "gov": _2, "blogspot": _3, "myspreadshop": _3 }], "il": [1, { "ac": _2, "co": [1, { "ravpage": _3, "blogspot": _3, "tabitorder": _3, "mytabit": _3 }], "gov": _2, "idf": _2, "k12": _2, "muni": _2, "net": _2, "org": _2 }], "xn--4dbrk0ce": [1, { "xn--4dbgdty6c": _2, "xn--5dbhl8d": _2, "xn--8dbq2a": _2, "xn--hebda8b": _2 }], "\u05D9\u05E9\u05E8\u05D0\u05DC": [1, { "\u05D0\u05E7\u05D3\u05DE\u05D9\u05D4": _2, "\u05D9\u05E9\u05D5\u05D1": _2, "\u05E6\u05D4\u05DC": _2, "\u05DE\u05DE\u05E9\u05DC": _2 }], "im": [1, { "ac": _2, "co": [1, { "ltd": _2, "plc": _2 }], "com": _2, "net": _2, "org": _2, "tt": _2, "tv": _2, "ro": _3 }], "in": [1, { "5g": _2, "6g": _2, "ac": _2, "ai": _2, "am": _2, "bihar": _2, "biz": _2, "business": _2, "ca": _2, "cn": _2, "co": _2, "com": _2, "coop": _2, "cs": _2, "delhi": _2, "dr": _2, "edu": _2, "er": _2, "firm": _2, "gen": _2, "gov": _2, "gujarat": _2, "ind": _2, "info": _2, "int": _2, "internet": _2, "io": _2, "me": _2, "mil": _2, "net": _2, "nic": _2, "org": _2, "pg": _2, "post": _2, "pro": _2, "res": _2, "travel": _2, "tv": _2, "uk": _2, "up": _2, "us": _2, "web": _3, "cloudns": _3, "blogspot": _3, "barsy": _3, "supabase": _3 }], "info": [1, { "cloudns": _3, "dynamic-dns": _3, "dyndns": _3, "barrel-of-knowledge": _3, "barrell-of-knowledge": _3, "for-our": _3, "groks-the": _3, "groks-this": _3, "here-for-more": _3, "knowsitall": _3, "selfip": _3, "webhop": _3, "barsy": _3, "mayfirst": _3, "forumz": _3, "nsupdate": _3, "dvrcam": _3, "ilovecollege": _3, "no-ip": _3, "dnsupdate": _3, "v-info": _3 }], "int": [1, { "eu": _2 }], "io": [1, { "2038": _3, "com": _2, "on-acorn": _5, "apigee": _3, "b-data": _3, "backplaneapp": _3, "banzaicloud": [0, { "app": _3, "backyards": _5 }], "beagleboard": _3, "bitbucket": _3, "bluebite": _3, "boxfuse": _3, "browsersafetymark": _3, "bigv": [0, { "uk0": _3 }], "cleverapps": _3, "dappnode": [0, { "dyndns": _3 }], "dedyn": _3, "drud": _3, "definima": _3, "fh-muenster": _3, "shw": _3, "forgerock": [0, { "id": _3 }], "ghost": _3, "github": _3, "gitlab": _3, "lolipop": _3, "hasura-app": _3, "hostyhosting": _3, "moonscale": _5, "beebyte": _34, "beebyteapp": [0, { "sekd1": _3 }], "jele": _3, "unispace": [0, { "cloud-fr1": _3 }], "webthings": _3, "loginline": _3, "barsy": _3, "azurecontainer": _5, "ngrok": [2, { "ap": _3, "au": _3, "eu": _3, "in": _3, "jp": _3, "sa": _3, "us": _3 }], "nodeart": [0, { "stage": _3 }], "nid": _3, "pantheonsite": _3, "dyn53": _3, "pstmn": [2, { "mock": _3 }], "protonet": _3, "qoto": _3, "qcx": [2, { "sys": _5 }], "vaporcloud": _3, "vbrplsbx": [0, { "g": _3 }], "on-k3s": _5, "on-rio": _5, "readthedocs": _3, "resindevice": _3, "resinstaging": [0, { "devices": _3 }], "hzc": _3, "sandcats": _3, "shiftcrypto": _3, "shiftedit": _3, "mo-siemens": _3, "musician": _3, "lair": _33, "stolos": _5, "spacekit": _3, "utwente": _3, "s5y": _5, "edugit": _3, "telebit": _3, "thingdust": [0, { "dev": _44, "disrec": _44, "prod": _45, "testing": _44 }], "tickets": _3, "upli": _3, "wedeploy": _3, "editorx": _3, "wixstudio": _3, "basicserver": _3, "virtualserver": _3 }], "iq": _46, "ir": [1, { "ac": _2, "co": _2, "gov": _2, "id": _2, "net": _2, "org": _2, "sch": _2, "xn--mgba3a4f16a": _2, "\u0627\u06CC\u0631\u0627\u0646": _2, "xn--mgba3a4fra": _2, "\u0627\u064A\u0631\u0627\u0646": _2 }], "is": [1, { "net": _2, "com": _2, "edu": _2, "gov": _2, "org": _2, "int": _2, "cupcake": _3, "blogspot": _3 }], "it": [1, { "gov": _2, "edu": _2, "abr": _2, "abruzzo": _2, "aosta-valley": _2, "aostavalley": _2, "bas": _2, "basilicata": _2, "cal": _2, "calabria": _2, "cam": _2, "campania": _2, "emilia-romagna": _2, "emiliaromagna": _2, "emr": _2, "friuli-v-giulia": _2, "friuli-ve-giulia": _2, "friuli-vegiulia": _2, "friuli-venezia-giulia": _2, "friuli-veneziagiulia": _2, "friuli-vgiulia": _2, "friuliv-giulia": _2, "friulive-giulia": _2, "friulivegiulia": _2, "friulivenezia-giulia": _2, "friuliveneziagiulia": _2, "friulivgiulia": _2, "fvg": _2, "laz": _2, "lazio": _2, "lig": _2, "liguria": _2, "lom": _2, "lombardia": _2, "lombardy": _2, "lucania": _2, "mar": _2, "marche": _2, "mol": _2, "molise": _2, "piedmont": _2, "piemonte": _2, "pmn": _2, "pug": _2, "puglia": _2, "sar": _2, "sardegna": _2, "sardinia": _2, "sic": _2, "sicilia": _2, "sicily": _2, "taa": _2, "tos": _2, "toscana": _2, "trentin-sud-tirol": _2, "xn--trentin-sd-tirol-rzb": _2, "trentin-s\xFCd-tirol": _2, "trentin-sudtirol": _2, "xn--trentin-sdtirol-7vb": _2, "trentin-s\xFCdtirol": _2, "trentin-sued-tirol": _2, "trentin-suedtirol": _2, "trentino-a-adige": _2, "trentino-aadige": _2, "trentino-alto-adige": _2, "trentino-altoadige": _2, "trentino-s-tirol": _2, "trentino-stirol": _2, "trentino-sud-tirol": _2, "xn--trentino-sd-tirol-c3b": _2, "trentino-s\xFCd-tirol": _2, "trentino-sudtirol": _2, "xn--trentino-sdtirol-szb": _2, "trentino-s\xFCdtirol": _2, "trentino-sued-tirol": _2, "trentino-suedtirol": _2, "trentino": _2, "trentinoa-adige": _2, "trentinoaadige": _2, "trentinoalto-adige": _2, "trentinoaltoadige": _2, "trentinos-tirol": _2, "trentinostirol": _2, "trentinosud-tirol": _2, "xn--trentinosd-tirol-rzb": _2, "trentinos\xFCd-tirol": _2, "trentinosudtirol": _2, "xn--trentinosdtirol-7vb": _2, "trentinos\xFCdtirol": _2, "trentinosued-tirol": _2, "trentinosuedtirol": _2, "trentinsud-tirol": _2, "xn--trentinsd-tirol-6vb": _2, "trentins\xFCd-tirol": _2, "trentinsudtirol": _2, "xn--trentinsdtirol-nsb": _2, "trentins\xFCdtirol": _2, "trentinsued-tirol": _2, "trentinsuedtirol": _2, "tuscany": _2, "umb": _2, "umbria": _2, "val-d-aosta": _2, "val-daosta": _2, "vald-aosta": _2, "valdaosta": _2, "valle-aosta": _2, "valle-d-aosta": _2, "valle-daosta": _2, "valleaosta": _2, "valled-aosta": _2, "valledaosta": _2, "vallee-aoste": _2, "xn--valle-aoste-ebb": _2, "vall\xE9e-aoste": _2, "vallee-d-aoste": _2, "xn--valle-d-aoste-ehb": _2, "vall\xE9e-d-aoste": _2, "valleeaoste": _2, "xn--valleaoste-e7a": _2, "vall\xE9eaoste": _2, "valleedaoste": _2, "xn--valledaoste-ebb": _2, "vall\xE9edaoste": _2, "vao": _2, "vda": _2, "ven": _2, "veneto": _2, "ag": _2, "agrigento": _2, "al": _2, "alessandria": _2, "alto-adige": _2, "altoadige": _2, "an": _2, "ancona": _2, "andria-barletta-trani": _2, "andria-trani-barletta": _2, "andriabarlettatrani": _2, "andriatranibarletta": _2, "ao": _2, "aosta": _2, "aoste": _2, "ap": _2, "aq": _2, "aquila": _2, "ar": _2, "arezzo": _2, "ascoli-piceno": _2, "ascolipiceno": _2, "asti": _2, "at": _2, "av": _2, "avellino": _2, "ba": _2, "balsan-sudtirol": _2, "xn--balsan-sdtirol-nsb": _2, "balsan-s\xFCdtirol": _2, "balsan-suedtirol": _2, "balsan": _2, "bari": _2, "barletta-trani-andria": _2, "barlettatraniandria": _2, "belluno": _2, "benevento": _2, "bergamo": _2, "bg": _2, "bi": _2, "biella": _2, "bl": _2, "bn": _2, "bo": _2, "bologna": _2, "bolzano-altoadige": _2, "bolzano": _2, "bozen-sudtirol": _2, "xn--bozen-sdtirol-2ob": _2, "bozen-s\xFCdtirol": _2, "bozen-suedtirol": _2, "bozen": _2, "br": _2, "brescia": _2, "brindisi": _2, "bs": _2, "bt": _2, "bulsan-sudtirol": _2, "xn--bulsan-sdtirol-nsb": _2, "bulsan-s\xFCdtirol": _2, "bulsan-suedtirol": _2, "bulsan": _2, "bz": _2, "ca": _2, "cagliari": _2, "caltanissetta": _2, "campidano-medio": _2, "campidanomedio": _2, "campobasso": _2, "carbonia-iglesias": _2, "carboniaiglesias": _2, "carrara-massa": _2, "carraramassa": _2, "caserta": _2, "catania": _2, "catanzaro": _2, "cb": _2, "ce": _2, "cesena-forli": _2, "xn--cesena-forl-mcb": _2, "cesena-forl\xEC": _2, "cesenaforli": _2, "xn--cesenaforl-i8a": _2, "cesenaforl\xEC": _2, "ch": _2, "chieti": _2, "ci": _2, "cl": _2, "cn": _2, "co": _2, "como": _2, "cosenza": _2, "cr": _2, "cremona": _2, "crotone": _2, "cs": _2, "ct": _2, "cuneo": _2, "cz": _2, "dell-ogliastra": _2, "dellogliastra": _2, "en": _2, "enna": _2, "fc": _2, "fe": _2, "fermo": _2, "ferrara": _2, "fg": _2, "fi": _2, "firenze": _2, "florence": _2, "fm": _2, "foggia": _2, "forli-cesena": _2, "xn--forl-cesena-fcb": _2, "forl\xEC-cesena": _2, "forlicesena": _2, "xn--forlcesena-c8a": _2, "forl\xECcesena": _2, "fr": _2, "frosinone": _2, "ge": _2, "genoa": _2, "genova": _2, "go": _2, "gorizia": _2, "gr": _2, "grosseto": _2, "iglesias-carbonia": _2, "iglesiascarbonia": _2, "im": _2, "imperia": _2, "is": _2, "isernia": _2, "kr": _2, "la-spezia": _2, "laquila": _2, "laspezia": _2, "latina": _2, "lc": _2, "le": _2, "lecce": _2, "lecco": _2, "li": _2, "livorno": _2, "lo": _2, "lodi": _2, "lt": _2, "lu": _2, "lucca": _2, "macerata": _2, "mantova": _2, "massa-carrara": _2, "massacarrara": _2, "matera": _2, "mb": _2, "mc": _2, "me": _2, "medio-campidano": _2, "mediocampidano": _2, "messina": _2, "mi": _2, "milan": _2, "milano": _2, "mn": _2, "mo": _2, "modena": _2, "monza-brianza": _2, "monza-e-della-brianza": _2, "monza": _2, "monzabrianza": _2, "monzaebrianza": _2, "monzaedellabrianza": _2, "ms": _2, "mt": _2, "na": _2, "naples": _2, "napoli": _2, "no": _2, "novara": _2, "nu": _2, "nuoro": _2, "og": _2, "ogliastra": _2, "olbia-tempio": _2, "olbiatempio": _2, "or": _2, "oristano": _2, "ot": _2, "pa": _2, "padova": _2, "padua": _2, "palermo": _2, "parma": _2, "pavia": _2, "pc": _2, "pd": _2, "pe": _2, "perugia": _2, "pesaro-urbino": _2, "pesarourbino": _2, "pescara": _2, "pg": _2, "pi": _2, "piacenza": _2, "pisa": _2, "pistoia": _2, "pn": _2, "po": _2, "pordenone": _2, "potenza": _2, "pr": _2, "prato": _2, "pt": _2, "pu": _2, "pv": _2, "pz": _2, "ra": _2, "ragusa": _2, "ravenna": _2, "rc": _2, "re": _2, "reggio-calabria": _2, "reggio-emilia": _2, "reggiocalabria": _2, "reggioemilia": _2, "rg": _2, "ri": _2, "rieti": _2, "rimini": _2, "rm": _2, "rn": _2, "ro": _2, "roma": _2, "rome": _2, "rovigo": _2, "sa": _2, "salerno": _2, "sassari": _2, "savona": _2, "si": _2, "siena": _2, "siracusa": _2, "so": _2, "sondrio": _2, "sp": _2, "sr": _2, "ss": _2, "suedtirol": _2, "xn--sdtirol-n2a": _2, "s\xFCdtirol": _2, "sv": _2, "ta": _2, "taranto": _2, "te": _2, "tempio-olbia": _2, "tempioolbia": _2, "teramo": _2, "terni": _2, "tn": _2, "to": _2, "torino": _2, "tp": _2, "tr": _2, "trani-andria-barletta": _2, "trani-barletta-andria": _2, "traniandriabarletta": _2, "tranibarlettaandria": _2, "trapani": _2, "trento": _2, "treviso": _2, "trieste": _2, "ts": _2, "turin": _2, "tv": _2, "ud": _2, "udine": _2, "urbino-pesaro": _2, "urbinopesaro": _2, "va": _2, "varese": _2, "vb": _2, "vc": _2, "ve": _2, "venezia": _2, "venice": _2, "verbania": _2, "vercelli": _2, "verona": _2, "vi": _2, "vibo-valentia": _2, "vibovalentia": _2, "vicenza": _2, "viterbo": _2, "vr": _2, "vs": _2, "vt": _2, "vv": _2, "blogspot": _3, "ibxos": _3, "iliadboxos": _3, "neen": [0, { "jc": _3 }], "tim": [0, { "open": [0, { "jelastic": _13 }] }], "16-b": _3, "32-b": _3, "64-b": _3, "123homepage": _3, "myspreadshop": _3, "syncloud": _3 }], "je": [1, { "co": _2, "net": _2, "org": _2, "of": _3 }], "jm": _12, "jo": [1, { "com": _2, "org": _2, "net": _2, "edu": _2, "sch": _2, "gov": _2, "mil": _2, "name": _2 }], "jobs": _2, "jp": [1, { "ac": _2, "ad": _2, "co": _2, "ed": _2, "go": _2, "gr": _2, "lg": _2, "ne": [1, { "aseinet": _42, "gehirn": _3, "ivory": _3, "mail-box": _3, "mints": _3, "mokuren": _3, "opal": _3, "sakura": _3, "sumomo": _3, "topaz": _3 }], "or": _2, "aichi": [1, { "aisai": _2, "ama": _2, "anjo": _2, "asuke": _2, "chiryu": _2, "chita": _2, "fuso": _2, "gamagori": _2, "handa": _2, "hazu": _2, "hekinan": _2, "higashiura": _2, "ichinomiya": _2, "inazawa": _2, "inuyama": _2, "isshiki": _2, "iwakura": _2, "kanie": _2, "kariya": _2, "kasugai": _2, "kira": _2, "kiyosu": _2, "komaki": _2, "konan": _2, "kota": _2, "mihama": _2, "miyoshi": _2, "nishio": _2, "nisshin": _2, "obu": _2, "oguchi": _2, "oharu": _2, "okazaki": _2, "owariasahi": _2, "seto": _2, "shikatsu": _2, "shinshiro": _2, "shitara": _2, "tahara": _2, "takahama": _2, "tobishima": _2, "toei": _2, "togo": _2, "tokai": _2, "tokoname": _2, "toyoake": _2, "toyohashi": _2, "toyokawa": _2, "toyone": _2, "toyota": _2, "tsushima": _2, "yatomi": _2 }], "akita": [1, { "akita": _2, "daisen": _2, "fujisato": _2, "gojome": _2, "hachirogata": _2, "happou": _2, "higashinaruse": _2, "honjo": _2, "honjyo": _2, "ikawa": _2, "kamikoani": _2, "kamioka": _2, "katagami": _2, "kazuno": _2, "kitaakita": _2, "kosaka": _2, "kyowa": _2, "misato": _2, "mitane": _2, "moriyoshi": _2, "nikaho": _2, "noshiro": _2, "odate": _2, "oga": _2, "ogata": _2, "semboku": _2, "yokote": _2, "yurihonjo": _2 }], "aomori": [1, { "aomori": _2, "gonohe": _2, "hachinohe": _2, "hashikami": _2, "hiranai": _2, "hirosaki": _2, "itayanagi": _2, "kuroishi": _2, "misawa": _2, "mutsu": _2, "nakadomari": _2, "noheji": _2, "oirase": _2, "owani": _2, "rokunohe": _2, "sannohe": _2, "shichinohe": _2, "shingo": _2, "takko": _2, "towada": _2, "tsugaru": _2, "tsuruta": _2 }], "chiba": [1, { "abiko": _2, "asahi": _2, "chonan": _2, "chosei": _2, "choshi": _2, "chuo": _2, "funabashi": _2, "futtsu": _2, "hanamigawa": _2, "ichihara": _2, "ichikawa": _2, "ichinomiya": _2, "inzai": _2, "isumi": _2, "kamagaya": _2, "kamogawa": _2, "kashiwa": _2, "katori": _2, "katsuura": _2, "kimitsu": _2, "kisarazu": _2, "kozaki": _2, "kujukuri": _2, "kyonan": _2, "matsudo": _2, "midori": _2, "mihama": _2, "minamiboso": _2, "mobara": _2, "mutsuzawa": _2, "nagara": _2, "nagareyama": _2, "narashino": _2, "narita": _2, "noda": _2, "oamishirasato": _2, "omigawa": _2, "onjuku": _2, "otaki": _2, "sakae": _2, "sakura": _2, "shimofusa": _2, "shirako": _2, "shiroi": _2, "shisui": _2, "sodegaura": _2, "sosa": _2, "tako": _2, "tateyama": _2, "togane": _2, "tohnosho": _2, "tomisato": _2, "urayasu": _2, "yachimata": _2, "yachiyo": _2, "yokaichiba": _2, "yokoshibahikari": _2, "yotsukaido": _2 }], "ehime": [1, { "ainan": _2, "honai": _2, "ikata": _2, "imabari": _2, "iyo": _2, "kamijima": _2, "kihoku": _2, "kumakogen": _2, "masaki": _2, "matsuno": _2, "matsuyama": _2, "namikata": _2, "niihama": _2, "ozu": _2, "saijo": _2, "seiyo": _2, "shikokuchuo": _2, "tobe": _2, "toon": _2, "uchiko": _2, "uwajima": _2, "yawatahama": _2 }], "fukui": [1, { "echizen": _2, "eiheiji": _2, "fukui": _2, "ikeda": _2, "katsuyama": _2, "mihama": _2, "minamiechizen": _2, "obama": _2, "ohi": _2, "ono": _2, "sabae": _2, "sakai": _2, "takahama": _2, "tsuruga": _2, "wakasa": _2 }], "fukuoka": [1, { "ashiya": _2, "buzen": _2, "chikugo": _2, "chikuho": _2, "chikujo": _2, "chikushino": _2, "chikuzen": _2, "chuo": _2, "dazaifu": _2, "fukuchi": _2, "hakata": _2, "higashi": _2, "hirokawa": _2, "hisayama": _2, "iizuka": _2, "inatsuki": _2, "kaho": _2, "kasuga": _2, "kasuya": _2, "kawara": _2, "keisen": _2, "koga": _2, "kurate": _2, "kurogi": _2, "kurume": _2, "minami": _2, "miyako": _2, "miyama": _2, "miyawaka": _2, "mizumaki": _2, "munakata": _2, "nakagawa": _2, "nakama": _2, "nishi": _2, "nogata": _2, "ogori": _2, "okagaki": _2, "okawa": _2, "oki": _2, "omuta": _2, "onga": _2, "onojo": _2, "oto": _2, "saigawa": _2, "sasaguri": _2, "shingu": _2, "shinyoshitomi": _2, "shonai": _2, "soeda": _2, "sue": _2, "tachiarai": _2, "tagawa": _2, "takata": _2, "toho": _2, "toyotsu": _2, "tsuiki": _2, "ukiha": _2, "umi": _2, "usui": _2, "yamada": _2, "yame": _2, "yanagawa": _2, "yukuhashi": _2 }], "fukushima": [1, { "aizubange": _2, "aizumisato": _2, "aizuwakamatsu": _2, "asakawa": _2, "bandai": _2, "date": _2, "fukushima": _2, "furudono": _2, "futaba": _2, "hanawa": _2, "higashi": _2, "hirata": _2, "hirono": _2, "iitate": _2, "inawashiro": _2, "ishikawa": _2, "iwaki": _2, "izumizaki": _2, "kagamiishi": _2, "kaneyama": _2, "kawamata": _2, "kitakata": _2, "kitashiobara": _2, "koori": _2, "koriyama": _2, "kunimi": _2, "miharu": _2, "mishima": _2, "namie": _2, "nango": _2, "nishiaizu": _2, "nishigo": _2, "okuma": _2, "omotego": _2, "ono": _2, "otama": _2, "samegawa": _2, "shimogo": _2, "shirakawa": _2, "showa": _2, "soma": _2, "sukagawa": _2, "taishin": _2, "tamakawa": _2, "tanagura": _2, "tenei": _2, "yabuki": _2, "yamato": _2, "yamatsuri": _2, "yanaizu": _2, "yugawa": _2 }], "gifu": [1, { "anpachi": _2, "ena": _2, "gifu": _2, "ginan": _2, "godo": _2, "gujo": _2, "hashima": _2, "hichiso": _2, "hida": _2, "higashishirakawa": _2, "ibigawa": _2, "ikeda": _2, "kakamigahara": _2, "kani": _2, "kasahara": _2, "kasamatsu": _2, "kawaue": _2, "kitagata": _2, "mino": _2, "minokamo": _2, "mitake": _2, "mizunami": _2, "motosu": _2, "nakatsugawa": _2, "ogaki": _2, "sakahogi": _2, "seki": _2, "sekigahara": _2, "shirakawa": _2, "tajimi": _2, "takayama": _2, "tarui": _2, "toki": _2, "tomika": _2, "wanouchi": _2, "yamagata": _2, "yaotsu": _2, "yoro": _2 }], "gunma": [1, { "annaka": _2, "chiyoda": _2, "fujioka": _2, "higashiagatsuma": _2, "isesaki": _2, "itakura": _2, "kanna": _2, "kanra": _2, "katashina": _2, "kawaba": _2, "kiryu": _2, "kusatsu": _2, "maebashi": _2, "meiwa": _2, "midori": _2, "minakami": _2, "naganohara": _2, "nakanojo": _2, "nanmoku": _2, "numata": _2, "oizumi": _2, "ora": _2, "ota": _2, "shibukawa": _2, "shimonita": _2, "shinto": _2, "showa": _2, "takasaki": _2, "takayama": _2, "tamamura": _2, "tatebayashi": _2, "tomioka": _2, "tsukiyono": _2, "tsumagoi": _2, "ueno": _2, "yoshioka": _2 }], "hiroshima": [1, { "asaminami": _2, "daiwa": _2, "etajima": _2, "fuchu": _2, "fukuyama": _2, "hatsukaichi": _2, "higashihiroshima": _2, "hongo": _2, "jinsekikogen": _2, "kaita": _2, "kui": _2, "kumano": _2, "kure": _2, "mihara": _2, "miyoshi": _2, "naka": _2, "onomichi": _2, "osakikamijima": _2, "otake": _2, "saka": _2, "sera": _2, "seranishi": _2, "shinichi": _2, "shobara": _2, "takehara": _2 }], "hokkaido": [1, { "abashiri": _2, "abira": _2, "aibetsu": _2, "akabira": _2, "akkeshi": _2, "asahikawa": _2, "ashibetsu": _2, "ashoro": _2, "assabu": _2, "atsuma": _2, "bibai": _2, "biei": _2, "bifuka": _2, "bihoro": _2, "biratori": _2, "chippubetsu": _2, "chitose": _2, "date": _2, "ebetsu": _2, "embetsu": _2, "eniwa": _2, "erimo": _2, "esan": _2, "esashi": _2, "fukagawa": _2, "fukushima": _2, "furano": _2, "furubira": _2, "haboro": _2, "hakodate": _2, "hamatonbetsu": _2, "hidaka": _2, "higashikagura": _2, "higashikawa": _2, "hiroo": _2, "hokuryu": _2, "hokuto": _2, "honbetsu": _2, "horokanai": _2, "horonobe": _2, "ikeda": _2, "imakane": _2, "ishikari": _2, "iwamizawa": _2, "iwanai": _2, "kamifurano": _2, "kamikawa": _2, "kamishihoro": _2, "kamisunagawa": _2, "kamoenai": _2, "kayabe": _2, "kembuchi": _2, "kikonai": _2, "kimobetsu": _2, "kitahiroshima": _2, "kitami": _2, "kiyosato": _2, "koshimizu": _2, "kunneppu": _2, "kuriyama": _2, "kuromatsunai": _2, "kushiro": _2, "kutchan": _2, "kyowa": _2, "mashike": _2, "matsumae": _2, "mikasa": _2, "minamifurano": _2, "mombetsu": _2, "moseushi": _2, "mukawa": _2, "muroran": _2, "naie": _2, "nakagawa": _2, "nakasatsunai": _2, "nakatombetsu": _2, "nanae": _2, "nanporo": _2, "nayoro": _2, "nemuro": _2, "niikappu": _2, "niki": _2, "nishiokoppe": _2, "noboribetsu": _2, "numata": _2, "obihiro": _2, "obira": _2, "oketo": _2, "okoppe": _2, "otaru": _2, "otobe": _2, "otofuke": _2, "otoineppu": _2, "oumu": _2, "ozora": _2, "pippu": _2, "rankoshi": _2, "rebun": _2, "rikubetsu": _2, "rishiri": _2, "rishirifuji": _2, "saroma": _2, "sarufutsu": _2, "shakotan": _2, "shari": _2, "shibecha": _2, "shibetsu": _2, "shikabe": _2, "shikaoi": _2, "shimamaki": _2, "shimizu": _2, "shimokawa": _2, "shinshinotsu": _2, "shintoku": _2, "shiranuka": _2, "shiraoi": _2, "shiriuchi": _2, "sobetsu": _2, "sunagawa": _2, "taiki": _2, "takasu": _2, "takikawa": _2, "takinoue": _2, "teshikaga": _2, "tobetsu": _2, "tohma": _2, "tomakomai": _2, "tomari": _2, "toya": _2, "toyako": _2, "toyotomi": _2, "toyoura": _2, "tsubetsu": _2, "tsukigata": _2, "urakawa": _2, "urausu": _2, "uryu": _2, "utashinai": _2, "wakkanai": _2, "wassamu": _2, "yakumo": _2, "yoichi": _2 }], "hyogo": [1, { "aioi": _2, "akashi": _2, "ako": _2, "amagasaki": _2, "aogaki": _2, "asago": _2, "ashiya": _2, "awaji": _2, "fukusaki": _2, "goshiki": _2, "harima": _2, "himeji": _2, "ichikawa": _2, "inagawa": _2, "itami": _2, "kakogawa": _2, "kamigori": _2, "kamikawa": _2, "kasai": _2, "kasuga": _2, "kawanishi": _2, "miki": _2, "minamiawaji": _2, "nishinomiya": _2, "nishiwaki": _2, "ono": _2, "sanda": _2, "sannan": _2, "sasayama": _2, "sayo": _2, "shingu": _2, "shinonsen": _2, "shiso": _2, "sumoto": _2, "taishi": _2, "taka": _2, "takarazuka": _2, "takasago": _2, "takino": _2, "tamba": _2, "tatsuno": _2, "toyooka": _2, "yabu": _2, "yashiro": _2, "yoka": _2, "yokawa": _2 }], "ibaraki": [1, { "ami": _2, "asahi": _2, "bando": _2, "chikusei": _2, "daigo": _2, "fujishiro": _2, "hitachi": _2, "hitachinaka": _2, "hitachiomiya": _2, "hitachiota": _2, "ibaraki": _2, "ina": _2, "inashiki": _2, "itako": _2, "iwama": _2, "joso": _2, "kamisu": _2, "kasama": _2, "kashima": _2, "kasumigaura": _2, "koga": _2, "miho": _2, "mito": _2, "moriya": _2, "naka": _2, "namegata": _2, "oarai": _2, "ogawa": _2, "omitama": _2, "ryugasaki": _2, "sakai": _2, "sakuragawa": _2, "shimodate": _2, "shimotsuma": _2, "shirosato": _2, "sowa": _2, "suifu": _2, "takahagi": _2, "tamatsukuri": _2, "tokai": _2, "tomobe": _2, "tone": _2, "toride": _2, "tsuchiura": _2, "tsukuba": _2, "uchihara": _2, "ushiku": _2, "yachiyo": _2, "yamagata": _2, "yawara": _2, "yuki": _2 }], "ishikawa": [1, { "anamizu": _2, "hakui": _2, "hakusan": _2, "kaga": _2, "kahoku": _2, "kanazawa": _2, "kawakita": _2, "komatsu": _2, "nakanoto": _2, "nanao": _2, "nomi": _2, "nonoichi": _2, "noto": _2, "shika": _2, "suzu": _2, "tsubata": _2, "tsurugi": _2, "uchinada": _2, "wajima": _2 }], "iwate": [1, { "fudai": _2, "fujisawa": _2, "hanamaki": _2, "hiraizumi": _2, "hirono": _2, "ichinohe": _2, "ichinoseki": _2, "iwaizumi": _2, "iwate": _2, "joboji": _2, "kamaishi": _2, "kanegasaki": _2, "karumai": _2, "kawai": _2, "kitakami": _2, "kuji": _2, "kunohe": _2, "kuzumaki": _2, "miyako": _2, "mizusawa": _2, "morioka": _2, "ninohe": _2, "noda": _2, "ofunato": _2, "oshu": _2, "otsuchi": _2, "rikuzentakata": _2, "shiwa": _2, "shizukuishi": _2, "sumita": _2, "tanohata": _2, "tono": _2, "yahaba": _2, "yamada": _2 }], "kagawa": [1, { "ayagawa": _2, "higashikagawa": _2, "kanonji": _2, "kotohira": _2, "manno": _2, "marugame": _2, "mitoyo": _2, "naoshima": _2, "sanuki": _2, "tadotsu": _2, "takamatsu": _2, "tonosho": _2, "uchinomi": _2, "utazu": _2, "zentsuji": _2 }], "kagoshima": [1, { "akune": _2, "amami": _2, "hioki": _2, "isa": _2, "isen": _2, "izumi": _2, "kagoshima": _2, "kanoya": _2, "kawanabe": _2, "kinko": _2, "kouyama": _2, "makurazaki": _2, "matsumoto": _2, "minamitane": _2, "nakatane": _2, "nishinoomote": _2, "satsumasendai": _2, "soo": _2, "tarumizu": _2, "yusui": _2 }], "kanagawa": [1, { "aikawa": _2, "atsugi": _2, "ayase": _2, "chigasaki": _2, "ebina": _2, "fujisawa": _2, "hadano": _2, "hakone": _2, "hiratsuka": _2, "isehara": _2, "kaisei": _2, "kamakura": _2, "kiyokawa": _2, "matsuda": _2, "minamiashigara": _2, "miura": _2, "nakai": _2, "ninomiya": _2, "odawara": _2, "oi": _2, "oiso": _2, "sagamihara": _2, "samukawa": _2, "tsukui": _2, "yamakita": _2, "yamato": _2, "yokosuka": _2, "yugawara": _2, "zama": _2, "zushi": _2 }], "kochi": [1, { "aki": _2, "geisei": _2, "hidaka": _2, "higashitsuno": _2, "ino": _2, "kagami": _2, "kami": _2, "kitagawa": _2, "kochi": _2, "mihara": _2, "motoyama": _2, "muroto": _2, "nahari": _2, "nakamura": _2, "nankoku": _2, "nishitosa": _2, "niyodogawa": _2, "ochi": _2, "okawa": _2, "otoyo": _2, "otsuki": _2, "sakawa": _2, "sukumo": _2, "susaki": _2, "tosa": _2, "tosashimizu": _2, "toyo": _2, "tsuno": _2, "umaji": _2, "yasuda": _2, "yusuhara": _2 }], "kumamoto": [1, { "amakusa": _2, "arao": _2, "aso": _2, "choyo": _2, "gyokuto": _2, "kamiamakusa": _2, "kikuchi": _2, "kumamoto": _2, "mashiki": _2, "mifune": _2, "minamata": _2, "minamioguni": _2, "nagasu": _2, "nishihara": _2, "oguni": _2, "ozu": _2, "sumoto": _2, "takamori": _2, "uki": _2, "uto": _2, "yamaga": _2, "yamato": _2, "yatsushiro": _2 }], "kyoto": [1, { "ayabe": _2, "fukuchiyama": _2, "higashiyama": _2, "ide": _2, "ine": _2, "joyo": _2, "kameoka": _2, "kamo": _2, "kita": _2, "kizu": _2, "kumiyama": _2, "kyotamba": _2, "kyotanabe": _2, "kyotango": _2, "maizuru": _2, "minami": _2, "minamiyamashiro": _2, "miyazu": _2, "muko": _2, "nagaokakyo": _2, "nakagyo": _2, "nantan": _2, "oyamazaki": _2, "sakyo": _2, "seika": _2, "tanabe": _2, "uji": _2, "ujitawara": _2, "wazuka": _2, "yamashina": _2, "yawata": _2 }], "mie": [1, { "asahi": _2, "inabe": _2, "ise": _2, "kameyama": _2, "kawagoe": _2, "kiho": _2, "kisosaki": _2, "kiwa": _2, "komono": _2, "kumano": _2, "kuwana": _2, "matsusaka": _2, "meiwa": _2, "mihama": _2, "minamiise": _2, "misugi": _2, "miyama": _2, "nabari": _2, "shima": _2, "suzuka": _2, "tado": _2, "taiki": _2, "taki": _2, "tamaki": _2, "toba": _2, "tsu": _2, "udono": _2, "ureshino": _2, "watarai": _2, "yokkaichi": _2 }], "miyagi": [1, { "furukawa": _2, "higashimatsushima": _2, "ishinomaki": _2, "iwanuma": _2, "kakuda": _2, "kami": _2, "kawasaki": _2, "marumori": _2, "matsushima": _2, "minamisanriku": _2, "misato": _2, "murata": _2, "natori": _2, "ogawara": _2, "ohira": _2, "onagawa": _2, "osaki": _2, "rifu": _2, "semine": _2, "shibata": _2, "shichikashuku": _2, "shikama": _2, "shiogama": _2, "shiroishi": _2, "tagajo": _2, "taiwa": _2, "tome": _2, "tomiya": _2, "wakuya": _2, "watari": _2, "yamamoto": _2, "zao": _2 }], "miyazaki": [1, { "aya": _2, "ebino": _2, "gokase": _2, "hyuga": _2, "kadogawa": _2, "kawaminami": _2, "kijo": _2, "kitagawa": _2, "kitakata": _2, "kitaura": _2, "kobayashi": _2, "kunitomi": _2, "kushima": _2, "mimata": _2, "miyakonojo": _2, "miyazaki": _2, "morotsuka": _2, "nichinan": _2, "nishimera": _2, "nobeoka": _2, "saito": _2, "shiiba": _2, "shintomi": _2, "takaharu": _2, "takanabe": _2, "takazaki": _2, "tsuno": _2 }], "nagano": [1, { "achi": _2, "agematsu": _2, "anan": _2, "aoki": _2, "asahi": _2, "azumino": _2, "chikuhoku": _2, "chikuma": _2, "chino": _2, "fujimi": _2, "hakuba": _2, "hara": _2, "hiraya": _2, "iida": _2, "iijima": _2, "iiyama": _2, "iizuna": _2, "ikeda": _2, "ikusaka": _2, "ina": _2, "karuizawa": _2, "kawakami": _2, "kiso": _2, "kisofukushima": _2, "kitaaiki": _2, "komagane": _2, "komoro": _2, "matsukawa": _2, "matsumoto": _2, "miasa": _2, "minamiaiki": _2, "minamimaki": _2, "minamiminowa": _2, "minowa": _2, "miyada": _2, "miyota": _2, "mochizuki": _2, "nagano": _2, "nagawa": _2, "nagiso": _2, "nakagawa": _2, "nakano": _2, "nozawaonsen": _2, "obuse": _2, "ogawa": _2, "okaya": _2, "omachi": _2, "omi": _2, "ookuwa": _2, "ooshika": _2, "otaki": _2, "otari": _2, "sakae": _2, "sakaki": _2, "saku": _2, "sakuho": _2, "shimosuwa": _2, "shinanomachi": _2, "shiojiri": _2, "suwa": _2, "suzaka": _2, "takagi": _2, "takamori": _2, "takayama": _2, "tateshina": _2, "tatsuno": _2, "togakushi": _2, "togura": _2, "tomi": _2, "ueda": _2, "wada": _2, "yamagata": _2, "yamanouchi": _2, "yasaka": _2, "yasuoka": _2 }], "nagasaki": [1, { "chijiwa": _2, "futsu": _2, "goto": _2, "hasami": _2, "hirado": _2, "iki": _2, "isahaya": _2, "kawatana": _2, "kuchinotsu": _2, "matsuura": _2, "nagasaki": _2, "obama": _2, "omura": _2, "oseto": _2, "saikai": _2, "sasebo": _2, "seihi": _2, "shimabara": _2, "shinkamigoto": _2, "togitsu": _2, "tsushima": _2, "unzen": _2 }], "nara": [1, { "ando": _2, "gose": _2, "heguri": _2, "higashiyoshino": _2, "ikaruga": _2, "ikoma": _2, "kamikitayama": _2, "kanmaki": _2, "kashiba": _2, "kashihara": _2, "katsuragi": _2, "kawai": _2, "kawakami": _2, "kawanishi": _2, "koryo": _2, "kurotaki": _2, "mitsue": _2, "miyake": _2, "nara": _2, "nosegawa": _2, "oji": _2, "ouda": _2, "oyodo": _2, "sakurai": _2, "sango": _2, "shimoichi": _2, "shimokitayama": _2, "shinjo": _2, "soni": _2, "takatori": _2, "tawaramoto": _2, "tenkawa": _2, "tenri": _2, "uda": _2, "yamatokoriyama": _2, "yamatotakada": _2, "yamazoe": _2, "yoshino": _2 }], "niigata": [1, { "aga": _2, "agano": _2, "gosen": _2, "itoigawa": _2, "izumozaki": _2, "joetsu": _2, "kamo": _2, "kariwa": _2, "kashiwazaki": _2, "minamiuonuma": _2, "mitsuke": _2, "muika": _2, "murakami": _2, "myoko": _2, "nagaoka": _2, "niigata": _2, "ojiya": _2, "omi": _2, "sado": _2, "sanjo": _2, "seiro": _2, "seirou": _2, "sekikawa": _2, "shibata": _2, "tagami": _2, "tainai": _2, "tochio": _2, "tokamachi": _2, "tsubame": _2, "tsunan": _2, "uonuma": _2, "yahiko": _2, "yoita": _2, "yuzawa": _2 }], "oita": [1, { "beppu": _2, "bungoono": _2, "bungotakada": _2, "hasama": _2, "hiji": _2, "himeshima": _2, "hita": _2, "kamitsue": _2, "kokonoe": _2, "kuju": _2, "kunisaki": _2, "kusu": _2, "oita": _2, "saiki": _2, "taketa": _2, "tsukumi": _2, "usa": _2, "usuki": _2, "yufu": _2 }], "okayama": [1, { "akaiwa": _2, "asakuchi": _2, "bizen": _2, "hayashima": _2, "ibara": _2, "kagamino": _2, "kasaoka": _2, "kibichuo": _2, "kumenan": _2, "kurashiki": _2, "maniwa": _2, "misaki": _2, "nagi": _2, "niimi": _2, "nishiawakura": _2, "okayama": _2, "satosho": _2, "setouchi": _2, "shinjo": _2, "shoo": _2, "soja": _2, "takahashi": _2, "tamano": _2, "tsuyama": _2, "wake": _2, "yakage": _2 }], "okinawa": [1, { "aguni": _2, "ginowan": _2, "ginoza": _2, "gushikami": _2, "haebaru": _2, "higashi": _2, "hirara": _2, "iheya": _2, "ishigaki": _2, "ishikawa": _2, "itoman": _2, "izena": _2, "kadena": _2, "kin": _2, "kitadaito": _2, "kitanakagusuku": _2, "kumejima": _2, "kunigami": _2, "minamidaito": _2, "motobu": _2, "nago": _2, "naha": _2, "nakagusuku": _2, "nakijin": _2, "nanjo": _2, "nishihara": _2, "ogimi": _2, "okinawa": _2, "onna": _2, "shimoji": _2, "taketomi": _2, "tarama": _2, "tokashiki": _2, "tomigusuku": _2, "tonaki": _2, "urasoe": _2, "uruma": _2, "yaese": _2, "yomitan": _2, "yonabaru": _2, "yonaguni": _2, "zamami": _2 }], "osaka": [1, { "abeno": _2, "chihayaakasaka": _2, "chuo": _2, "daito": _2, "fujiidera": _2, "habikino": _2, "hannan": _2, "higashiosaka": _2, "higashisumiyoshi": _2, "higashiyodogawa": _2, "hirakata": _2, "ibaraki": _2, "ikeda": _2, "izumi": _2, "izumiotsu": _2, "izumisano": _2, "kadoma": _2, "kaizuka": _2, "kanan": _2, "kashiwara": _2, "katano": _2, "kawachinagano": _2, "kishiwada": _2, "kita": _2, "kumatori": _2, "matsubara": _2, "minato": _2, "minoh": _2, "misaki": _2, "moriguchi": _2, "neyagawa": _2, "nishi": _2, "nose": _2, "osakasayama": _2, "sakai": _2, "sayama": _2, "sennan": _2, "settsu": _2, "shijonawate": _2, "shimamoto": _2, "suita": _2, "tadaoka": _2, "taishi": _2, "tajiri": _2, "takaishi": _2, "takatsuki": _2, "tondabayashi": _2, "toyonaka": _2, "toyono": _2, "yao": _2 }], "saga": [1, { "ariake": _2, "arita": _2, "fukudomi": _2, "genkai": _2, "hamatama": _2, "hizen": _2, "imari": _2, "kamimine": _2, "kanzaki": _2, "karatsu": _2, "kashima": _2, "kitagata": _2, "kitahata": _2, "kiyama": _2, "kouhoku": _2, "kyuragi": _2, "nishiarita": _2, "ogi": _2, "omachi": _2, "ouchi": _2, "saga": _2, "shiroishi": _2, "taku": _2, "tara": _2, "tosu": _2, "yoshinogari": _2 }], "saitama": [1, { "arakawa": _2, "asaka": _2, "chichibu": _2, "fujimi": _2, "fujimino": _2, "fukaya": _2, "hanno": _2, "hanyu": _2, "hasuda": _2, "hatogaya": _2, "hatoyama": _2, "hidaka": _2, "higashichichibu": _2, "higashimatsuyama": _2, "honjo": _2, "ina": _2, "iruma": _2, "iwatsuki": _2, "kamiizumi": _2, "kamikawa": _2, "kamisato": _2, "kasukabe": _2, "kawagoe": _2, "kawaguchi": _2, "kawajima": _2, "kazo": _2, "kitamoto": _2, "koshigaya": _2, "kounosu": _2, "kuki": _2, "kumagaya": _2, "matsubushi": _2, "minano": _2, "misato": _2, "miyashiro": _2, "miyoshi": _2, "moroyama": _2, "nagatoro": _2, "namegawa": _2, "niiza": _2, "ogano": _2, "ogawa": _2, "ogose": _2, "okegawa": _2, "omiya": _2, "otaki": _2, "ranzan": _2, "ryokami": _2, "saitama": _2, "sakado": _2, "satte": _2, "sayama": _2, "shiki": _2, "shiraoka": _2, "soka": _2, "sugito": _2, "toda": _2, "tokigawa": _2, "tokorozawa": _2, "tsurugashima": _2, "urawa": _2, "warabi": _2, "yashio": _2, "yokoze": _2, "yono": _2, "yorii": _2, "yoshida": _2, "yoshikawa": _2, "yoshimi": _2 }], "shiga": [1, { "aisho": _2, "gamo": _2, "higashiomi": _2, "hikone": _2, "koka": _2, "konan": _2, "kosei": _2, "koto": _2, "kusatsu": _2, "maibara": _2, "moriyama": _2, "nagahama": _2, "nishiazai": _2, "notogawa": _2, "omihachiman": _2, "otsu": _2, "ritto": _2, "ryuoh": _2, "takashima": _2, "takatsuki": _2, "torahime": _2, "toyosato": _2, "yasu": _2 }], "shimane": [1, { "akagi": _2, "ama": _2, "gotsu": _2, "hamada": _2, "higashiizumo": _2, "hikawa": _2, "hikimi": _2, "izumo": _2, "kakinoki": _2, "masuda": _2, "matsue": _2, "misato": _2, "nishinoshima": _2, "ohda": _2, "okinoshima": _2, "okuizumo": _2, "shimane": _2, "tamayu": _2, "tsuwano": _2, "unnan": _2, "yakumo": _2, "yasugi": _2, "yatsuka": _2 }], "shizuoka": [1, { "arai": _2, "atami": _2, "fuji": _2, "fujieda": _2, "fujikawa": _2, "fujinomiya": _2, "fukuroi": _2, "gotemba": _2, "haibara": _2, "hamamatsu": _2, "higashiizu": _2, "ito": _2, "iwata": _2, "izu": _2, "izunokuni": _2, "kakegawa": _2, "kannami": _2, "kawanehon": _2, "kawazu": _2, "kikugawa": _2, "kosai": _2, "makinohara": _2, "matsuzaki": _2, "minamiizu": _2, "mishima": _2, "morimachi": _2, "nishiizu": _2, "numazu": _2, "omaezaki": _2, "shimada": _2, "shimizu": _2, "shimoda": _2, "shizuoka": _2, "susono": _2, "yaizu": _2, "yoshida": _2 }], "tochigi": [1, { "ashikaga": _2, "bato": _2, "haga": _2, "ichikai": _2, "iwafune": _2, "kaminokawa": _2, "kanuma": _2, "karasuyama": _2, "kuroiso": _2, "mashiko": _2, "mibu": _2, "moka": _2, "motegi": _2, "nasu": _2, "nasushiobara": _2, "nikko": _2, "nishikata": _2, "nogi": _2, "ohira": _2, "ohtawara": _2, "oyama": _2, "sakura": _2, "sano": _2, "shimotsuke": _2, "shioya": _2, "takanezawa": _2, "tochigi": _2, "tsuga": _2, "ujiie": _2, "utsunomiya": _2, "yaita": _2 }], "tokushima": [1, { "aizumi": _2, "anan": _2, "ichiba": _2, "itano": _2, "kainan": _2, "komatsushima": _2, "matsushige": _2, "mima": _2, "minami": _2, "miyoshi": _2, "mugi": _2, "nakagawa": _2, "naruto": _2, "sanagochi": _2, "shishikui": _2, "tokushima": _2, "wajiki": _2 }], "tokyo": [1, { "adachi": _2, "akiruno": _2, "akishima": _2, "aogashima": _2, "arakawa": _2, "bunkyo": _2, "chiyoda": _2, "chofu": _2, "chuo": _2, "edogawa": _2, "fuchu": _2, "fussa": _2, "hachijo": _2, "hachioji": _2, "hamura": _2, "higashikurume": _2, "higashimurayama": _2, "higashiyamato": _2, "hino": _2, "hinode": _2, "hinohara": _2, "inagi": _2, "itabashi": _2, "katsushika": _2, "kita": _2, "kiyose": _2, "kodaira": _2, "koganei": _2, "kokubunji": _2, "komae": _2, "koto": _2, "kouzushima": _2, "kunitachi": _2, "machida": _2, "meguro": _2, "minato": _2, "mitaka": _2, "mizuho": _2, "musashimurayama": _2, "musashino": _2, "nakano": _2, "nerima": _2, "ogasawara": _2, "okutama": _2, "ome": _2, "oshima": _2, "ota": _2, "setagaya": _2, "shibuya": _2, "shinagawa": _2, "shinjuku": _2, "suginami": _2, "sumida": _2, "tachikawa": _2, "taito": _2, "tama": _2, "toshima": _2 }], "tottori": [1, { "chizu": _2, "hino": _2, "kawahara": _2, "koge": _2, "kotoura": _2, "misasa": _2, "nanbu": _2, "nichinan": _2, "sakaiminato": _2, "tottori": _2, "wakasa": _2, "yazu": _2, "yonago": _2 }], "toyama": [1, { "asahi": _2, "fuchu": _2, "fukumitsu": _2, "funahashi": _2, "himi": _2, "imizu": _2, "inami": _2, "johana": _2, "kamiichi": _2, "kurobe": _2, "nakaniikawa": _2, "namerikawa": _2, "nanto": _2, "nyuzen": _2, "oyabe": _2, "taira": _2, "takaoka": _2, "tateyama": _2, "toga": _2, "tonami": _2, "toyama": _2, "unazuki": _2, "uozu": _2, "yamada": _2 }], "wakayama": [1, { "arida": _2, "aridagawa": _2, "gobo": _2, "hashimoto": _2, "hidaka": _2, "hirogawa": _2, "inami": _2, "iwade": _2, "kainan": _2, "kamitonda": _2, "katsuragi": _2, "kimino": _2, "kinokawa": _2, "kitayama": _2, "koya": _2, "koza": _2, "kozagawa": _2, "kudoyama": _2, "kushimoto": _2, "mihama": _2, "misato": _2, "nachikatsuura": _2, "shingu": _2, "shirahama": _2, "taiji": _2, "tanabe": _2, "wakayama": _2, "yuasa": _2, "yura": _2 }], "yamagata": [1, { "asahi": _2, "funagata": _2, "higashine": _2, "iide": _2, "kahoku": _2, "kaminoyama": _2, "kaneyama": _2, "kawanishi": _2, "mamurogawa": _2, "mikawa": _2, "murayama": _2, "nagai": _2, "nakayama": _2, "nanyo": _2, "nishikawa": _2, "obanazawa": _2, "oe": _2, "oguni": _2, "ohkura": _2, "oishida": _2, "sagae": _2, "sakata": _2, "sakegawa": _2, "shinjo": _2, "shirataka": _2, "shonai": _2, "takahata": _2, "tendo": _2, "tozawa": _2, "tsuruoka": _2, "yamagata": _2, "yamanobe": _2, "yonezawa": _2, "yuza": _2 }], "yamaguchi": [1, { "abu": _2, "hagi": _2, "hikari": _2, "hofu": _2, "iwakuni": _2, "kudamatsu": _2, "mitou": _2, "nagato": _2, "oshima": _2, "shimonoseki": _2, "shunan": _2, "tabuse": _2, "tokuyama": _2, "toyota": _2, "ube": _2, "yuu": _2 }], "yamanashi": [1, { "chuo": _2, "doshi": _2, "fuefuki": _2, "fujikawa": _2, "fujikawaguchiko": _2, "fujiyoshida": _2, "hayakawa": _2, "hokuto": _2, "ichikawamisato": _2, "kai": _2, "kofu": _2, "koshu": _2, "kosuge": _2, "minami-alps": _2, "minobu": _2, "nakamichi": _2, "nanbu": _2, "narusawa": _2, "nirasaki": _2, "nishikatsura": _2, "oshino": _2, "otsuki": _2, "showa": _2, "tabayama": _2, "tsuru": _2, "uenohara": _2, "yamanakako": _2, "yamanashi": _2 }], "xn--4pvxs": _2, "\u6803\u6728": _2, "xn--vgu402c": _2, "\u611B\u77E5": _2, "xn--c3s14m": _2, "\u611B\u5A9B": _2, "xn--f6qx53a": _2, "\u5175\u5EAB": _2, "xn--8pvr4u": _2, "\u718A\u672C": _2, "xn--uist22h": _2, "\u8328\u57CE": _2, "xn--djrs72d6uy": _2, "\u5317\u6D77\u9053": _2, "xn--mkru45i": _2, "\u5343\u8449": _2, "xn--0trq7p7nn": _2, "\u548C\u6B4C\u5C71": _2, "xn--8ltr62k": _2, "\u9577\u5D0E": _2, "xn--2m4a15e": _2, "\u9577\u91CE": _2, "xn--efvn9s": _2, "\u65B0\u6F5F": _2, "xn--32vp30h": _2, "\u9752\u68EE": _2, "xn--4it797k": _2, "\u9759\u5CA1": _2, "xn--1lqs71d": _2, "\u6771\u4EAC": _2, "xn--5rtp49c": _2, "\u77F3\u5DDD": _2, "xn--5js045d": _2, "\u57FC\u7389": _2, "xn--ehqz56n": _2, "\u4E09\u91CD": _2, "xn--1lqs03n": _2, "\u4EAC\u90FD": _2, "xn--qqqt11m": _2, "\u4F50\u8CC0": _2, "xn--kbrq7o": _2, "\u5927\u5206": _2, "xn--pssu33l": _2, "\u5927\u962A": _2, "xn--ntsq17g": _2, "\u5948\u826F": _2, "xn--uisz3g": _2, "\u5BAE\u57CE": _2, "xn--6btw5a": _2, "\u5BAE\u5D0E": _2, "xn--1ctwo": _2, "\u5BCC\u5C71": _2, "xn--6orx2r": _2, "\u5C71\u53E3": _2, "xn--rht61e": _2, "\u5C71\u5F62": _2, "xn--rht27z": _2, "\u5C71\u68A8": _2, "xn--djty4k": _2, "\u5CA9\u624B": _2, "xn--nit225k": _2, "\u5C90\u961C": _2, "xn--rht3d": _2, "\u5CA1\u5C71": _2, "xn--klty5x": _2, "\u5CF6\u6839": _2, "xn--kltx9a": _2, "\u5E83\u5CF6": _2, "xn--kltp7d": _2, "\u5FB3\u5CF6": _2, "xn--uuwu58a": _2, "\u6C96\u7E04": _2, "xn--zbx025d": _2, "\u6ECB\u8CC0": _2, "xn--ntso0iqx3a": _2, "\u795E\u5948\u5DDD": _2, "xn--elqq16h": _2, "\u798F\u4E95": _2, "xn--4it168d": _2, "\u798F\u5CA1": _2, "xn--klt787d": _2, "\u798F\u5CF6": _2, "xn--rny31h": _2, "\u79CB\u7530": _2, "xn--7t0a264c": _2, "\u7FA4\u99AC": _2, "xn--5rtq34k": _2, "\u9999\u5DDD": _2, "xn--k7yn95e": _2, "\u9AD8\u77E5": _2, "xn--tor131o": _2, "\u9CE5\u53D6": _2, "xn--d5qv7z876c": _2, "\u9E7F\u5150\u5CF6": _2, "kawasaki": _12, "kitakyushu": _12, "kobe": _12, "nagoya": _12, "sapporo": _12, "sendai": _12, "yokohama": _12, "buyshop": _3, "fashionstore": _3, "handcrafted": _3, "kawaiishop": _3, "supersale": _3, "theshop": _3, "usercontent": _3, "angry": _3, "babyblue": _3, "babymilk": _3, "backdrop": _3, "bambina": _3, "bitter": _3, "blush": _3, "boo": _3, "boy": _3, "boyfriend": _3, "but": _3, "candypop": _3, "capoo": _3, "catfood": _3, "cheap": _3, "chicappa": _3, "chillout": _3, "chips": _3, "chowder": _3, "chu": _3, "ciao": _3, "cocotte": _3, "coolblog": _3, "cranky": _3, "cutegirl": _3, "daa": _3, "deca": _3, "deci": _3, "digick": _3, "egoism": _3, "fakefur": _3, "fem": _3, "flier": _3, "floppy": _3, "fool": _3, "frenchkiss": _3, "girlfriend": _3, "girly": _3, "gloomy": _3, "gonna": _3, "greater": _3, "hacca": _3, "heavy": _3, "her": _3, "hiho": _3, "hippy": _3, "holy": _3, "hungry": _3, "icurus": _3, "itigo": _3, "jellybean": _3, "kikirara": _3, "kill": _3, "kilo": _3, "kuron": _3, "littlestar": _3, "lolipopmc": _3, "lolitapunk": _3, "lomo": _3, "lovepop": _3, "lovesick": _3, "main": _3, "mods": _3, "mond": _3, "mongolian": _3, "moo": _3, "namaste": _3, "nikita": _3, "nobushi": _3, "noor": _3, "oops": _3, "parallel": _3, "parasite": _3, "pecori": _3, "peewee": _3, "penne": _3, "pepper": _3, "perma": _3, "pigboat": _3, "pinoko": _3, "punyu": _3, "pupu": _3, "pussycat": _3, "pya": _3, "raindrop": _3, "readymade": _3, "sadist": _3, "schoolbus": _3, "secret": _3, "staba": _3, "stripper": _3, "sub": _3, "sunnyday": _3, "thick": _3, "tonkotsu": _3, "under": _3, "upper": _3, "velvet": _3, "verse": _3, "versus": _3, "vivian": _3, "watson": _3, "weblike": _3, "whitesnow": _3, "zombie": _3, "blogspot": _3, "2-d": _3, "bona": _3, "crap": _3, "daynight": _3, "eek": _3, "flop": _3, "halfmoon": _3, "jeez": _3, "matrix": _3, "mimoza": _3, "netgamers": _3, "nyanta": _3, "o0o0": _3, "rdy": _3, "rgr": _3, "rulez": _3, "sakurastorage": [0, { "isk01": _47, "isk02": _47 }], "saloon": _3, "sblo": _3, "skr": _3, "tank": _3, "uh-oh": _3, "undo": _3, "webaccel": [0, { "rs": _3, "user": _3 }], "websozai": _3, "xii": _3 }], "ke": [1, { "ac": _2, "co": _6, "go": _2, "info": _2, "me": _2, "mobi": _2, "ne": _2, "or": _2, "sc": _2 }], "kg": [1, { "org": _2, "net": _2, "com": _2, "edu": _2, "gov": _2, "mil": _2, "blog": _3, "io": _3, "jp": _3, "tv": _3, "uk": _3, "us": _3 }], "kh": _12, "ki": _48, "km": [1, { "org": _2, "nom": _2, "gov": _2, "prd": _2, "tm": _2, "edu": _2, "mil": _2, "ass": _2, "com": _2, "coop": _2, "asso": _2, "presse": _2, "medecin": _2, "notaires": _2, "pharmaciens": _2, "veterinaire": _2, "gouv": _2 }], "kn": [1, { "net": _2, "org": _2, "edu": _2, "gov": _2 }], "kp": [1, { "com": _2, "edu": _2, "gov": _2, "org": _2, "rep": _2, "tra": _2 }], "kr": [1, { "ac": _2, "co": _2, "es": _2, "go": _2, "hs": _2, "kg": _2, "mil": _2, "ms": _2, "ne": _2, "or": _2, "pe": _2, "re": _2, "sc": _2, "busan": _2, "chungbuk": _2, "chungnam": _2, "daegu": _2, "daejeon": _2, "gangwon": _2, "gwangju": _2, "gyeongbuk": _2, "gyeonggi": _2, "gyeongnam": _2, "incheon": _2, "jeju": _2, "jeonbuk": _2, "jeonnam": _2, "seoul": _2, "ulsan": _2, "blogspot": _3 }], "kw": [1, { "com": _2, "edu": _2, "emb": _2, "gov": _2, "ind": _2, "net": _2, "org": _2 }], "ky": _39, "kz": [1, { "org": _2, "edu": _2, "net": _2, "gov": _2, "mil": _2, "com": _2, "jcloud": _3, "kazteleport": [0, { "upaas": _3 }] }], "la": [1, { "int": _2, "net": _2, "info": _2, "edu": _2, "gov": _2, "per": _2, "com": _2, "org": _2, "bnr": _3, "c": _3 }], "lb": _4, "lc": [1, { "com": _2, "net": _2, "co": _2, "org": _2, "edu": _2, "gov": _2, "oy": _3 }], "li": [1, { "blogspot": _3, "caa": _3 }], "lk": [1, { "gov": _2, "sch": _2, "net": _2, "int": _2, "com": _2, "org": _2, "edu": _2, "ngo": _2, "soc": _2, "web": _2, "ltd": _2, "assn": _2, "grp": _2, "hotel": _2, "ac": _2 }], "lr": _4, "ls": [1, { "ac": _2, "biz": _2, "co": _2, "edu": _2, "gov": _2, "info": _2, "net": _2, "org": _2, "sc": _2, "de": _3 }], "lt": _49, "lu": [1, { "blogspot": _3, "123website": _3 }], "lv": [1, { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2, "id": _2, "net": _2, "asn": _2, "conf": _2 }], "ly": [1, { "com": _2, "net": _2, "gov": _2, "plc": _2, "edu": _2, "sch": _2, "med": _2, "org": _2, "id": _2 }], "ma": [1, { "co": _2, "net": _2, "gov": _2, "org": _2, "ac": _2, "press": _2 }], "mc": [1, { "tm": _2, "asso": _2 }], "md": [1, { "blogspot": _3, "at": _3, "de": _3, "jp": _3, "to": _3 }], "me": [1, { "co": _2, "net": _2, "org": _2, "edu": _2, "ac": _2, "gov": _2, "its": _2, "priv": _2, "c66": _3, "daplie": [2, { "localhost": _3 }], "edgestack": _3, "filegear": _3, "filegear-au": _3, "filegear-de": _3, "filegear-gb": _3, "filegear-ie": _3, "filegear-jp": _3, "filegear-sg": _3, "glitch": _3, "ravendb": _3, "lohmus": _3, "barsy": _3, "mcpe": _3, "mcdir": _3, "soundcast": _3, "tcp4": _3, "brasilia": _3, "ddns": _3, "dnsfor": _3, "hopto": _3, "loginto": _3, "noip": _3, "webhop": _3, "vp4": _3, "diskstation": _3, "dscloud": _3, "i234": _3, "myds": _3, "synology": _3, "transip": _37, "wedeploy": _3, "yombo": _3, "nohost": _3 }], "mg": [1, { "org": _2, "nom": _2, "gov": _2, "prd": _2, "tm": _2, "edu": _2, "mil": _2, "com": _2, "co": _2 }], "mh": _2, "mil": _2, "mk": [1, { "com": _2, "org": _2, "net": _2, "edu": _2, "gov": _2, "inf": _2, "name": _2, "blogspot": _3 }], "ml": [1, { "com": _2, "edu": _2, "gouv": _2, "gov": _2, "net": _2, "org": _2, "presse": _2 }], "mm": _12, "mn": [1, { "gov": _2, "edu": _2, "org": _2, "nyc": _3 }], "mo": _4, "mobi": [1, { "barsy": _3, "dscloud": _3 }], "mp": [1, { "ju": _3 }], "mq": _2, "mr": _49, "ms": [1, { "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2, "lab": _3, "minisite": _3 }], "mt": [1, { "com": _6, "edu": _2, "net": _2, "org": _2 }], "mu": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "ac": _2, "co": _2, "or": _2 }], "museum": _2, "mv": [1, { "aero": _2, "biz": _2, "com": _2, "coop": _2, "edu": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "museum": _2, "name": _2, "net": _2, "org": _2, "pro": _2 }], "mw": [1, { "ac": _2, "biz": _2, "co": _2, "com": _2, "coop": _2, "edu": _2, "gov": _2, "int": _2, "museum": _2, "net": _2, "org": _2 }], "mx": [1, { "com": _2, "org": _2, "gob": _2, "edu": _2, "net": _2, "blogspot": _3 }], "my": [1, { "biz": _2, "com": _2, "edu": _2, "gov": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "blogspot": _3 }], "mz": [1, { "ac": _2, "adv": _2, "co": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 }], "na": [1, { "info": _2, "pro": _2, "name": _2, "school": _2, "or": _2, "dr": _2, "us": _2, "mx": _2, "ca": _2, "in": _2, "cc": _2, "tv": _2, "ws": _2, "mobi": _2, "co": _2, "com": _2, "org": _2 }], "name": [1, { "her": _52, "his": _52 }], "nc": [1, { "asso": _2, "nom": _2 }], "ne": _2, "net": [1, { "adobeaemcloud": _3, "adobeio-static": _3, "adobeioruntime": _3, "akadns": _3, "akamai": _3, "akamai-staging": _3, "akamaiedge": _3, "akamaiedge-staging": _3, "akamaihd": _3, "akamaihd-staging": _3, "akamaiorigin": _3, "akamaiorigin-staging": _3, "akamaized": _3, "akamaized-staging": _3, "edgekey": _3, "edgekey-staging": _3, "edgesuite": _3, "edgesuite-staging": _3, "alwaysdata": _3, "myamaze": _3, "cloudfront": _3, "t3l3p0rt": _3, "appudo": _3, "atlassian-dev": [0, { "prod": [0, { "cdn": _3 }] }], "myfritz": _3, "onavstack": _3, "shopselect": _3, "blackbaudcdn": _3, "boomla": _3, "bplaced": _3, "square7": _3, "gb": _3, "hu": _3, "jp": _3, "se": _3, "uk": _3, "in": _3, "clickrising": _3, "cloudaccess": _3, "cdn77-ssl": _3, "cdn77": [0, { "r": _3 }], "feste-ip": _3, "knx-server": _3, "static-access": _3, "cryptonomic": _5, "dattolocal": _3, "mydatto": _3, "debian": _3, "bitbridge": _3, "at-band-camp": _3, "blogdns": _3, "broke-it": _3, "buyshouses": _3, "dnsalias": _3, "dnsdojo": _3, "does-it": _3, "dontexist": _3, "dynalias": _3, "dynathome": _3, "endofinternet": _3, "from-az": _3, "from-co": _3, "from-la": _3, "from-ny": _3, "gets-it": _3, "ham-radio-op": _3, "homeftp": _3, "homeip": _3, "homelinux": _3, "homeunix": _3, "in-the-band": _3, "is-a-chef": _3, "is-a-geek": _3, "isa-geek": _3, "kicks-ass": _3, "office-on-the": _3, "podzone": _3, "scrapper-site": _3, "selfip": _3, "sells-it": _3, "servebbs": _3, "serveftp": _3, "thruhere": _3, "webhop": _3, "definima": _3, "casacam": _3, "dynu": _3, "dynv6": _3, "twmail": _3, "ru": _3, "channelsdvr": [2, { "u": _3 }], "fastlylb": [2, { "map": _3 }], "fastly": [0, { "freetls": _3, "map": _3, "prod": [0, { "a": _3, "global": _3 }], "ssl": [0, { "a": _3, "b": _3, "global": _3 }] }], "edgeapp": _3, "flynnhosting": _3, "cdn-edges": _3, "heteml": _3, "cloudfunctions": _3, "moonscale": _3, "in-dsl": _3, "in-vpn": _3, "ipifony": _3, "iobb": _3, "cloudjiffy": [2, { "fra1-de": _3, "west1-us": _3 }], "elastx": [0, { "jls-sto1": _3, "jls-sto2": _3, "jls-sto3": _3 }], "faststacks": _3, "massivegrid": [0, { "paas": [0, { "fr-1": _3, "lon-1": _3, "lon-2": _3, "ny-1": _3, "ny-2": _3, "sg-1": _3 }] }], "saveincloud": [0, { "jelastic": _3, "nordeste-idc": _3 }], "scaleforce": _40, "tsukaeru": _41, "kinghost": _3, "uni5": _3, "krellian": _3, "barsy": _3, "memset": _3, "azurewebsites": _3, "azure-mobile": _3, "cloudapp": _3, "azurestaticapps": [2, { "1": _3, "2": _3, "3": _3, "4": _3, "5": _3, "6": _3, "7": _3, "centralus": _3, "eastasia": _3, "eastus2": _3, "westeurope": _3, "westus2": _3 }], "dnsup": _3, "hicam": _3, "now-dns": _3, "ownip": _3, "vpndns": _3, "eating-organic": _3, "mydissent": _3, "myeffect": _3, "mymediapc": _3, "mypsx": _3, "mysecuritycamera": _3, "nhlfan": _3, "no-ip": _3, "pgafan": _3, "privatizehealthinsurance": _3, "bounceme": _3, "ddns": _3, "redirectme": _3, "serveblog": _3, "serveminecraft": _3, "sytes": _3, "cloudycluster": _3, "ovh": [0, { "webpaas": _5, "hosting": _5 }], "bar0": _3, "bar1": _3, "bar2": _3, "rackmaze": _3, "squares": _3, "schokokeks": _3, "firewall-gateway": _3, "seidat": _3, "senseering": _3, "siteleaf": _3, "vps-host": [2, { "jelastic": [0, { "atl": _3, "njs": _3, "ric": _3 }] }], "myspreadshop": _3, "srcf": [0, { "soc": _3, "user": _3 }], "supabase": _3, "dsmynas": _3, "familyds": _3, "tailscale": [0, { "beta": _3 }], "ts": _3, "torproject": [2, { "pages": _3 }], "reserve-online": _3, "community-pro": _3, "meinforum": _3, "yandexcloud": [2, { "storage": _3, "website": _3 }], "za": _3 }], "nf": [1, { "com": _2, "net": _2, "per": _2, "rec": _2, "web": _2, "arts": _2, "firm": _2, "info": _2, "other": _2, "store": _2 }], "ng": [1, { "com": _6, "edu": _2, "gov": _2, "i": _2, "mil": _2, "mobi": _2, "name": _2, "net": _2, "org": _2, "sch": _2, "col": _3, "firm": _3, "gen": _3, "ltd": _3, "ngo": _3 }], "ni": [1, { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "gob": _2, "in": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "nom": _2, "org": _2, "web": _2 }], "nl": [1, { "co": _3, "hosting-cluster": _3, "blogspot": _3, "gov": _3, "khplay": _3, "123website": _3, "myspreadshop": _3, "transurl": _5, "cistron": _3, "demon": _3 }], "no": [1, { "fhs": _2, "vgs": _2, "fylkesbibl": _2, "folkebibl": _2, "museum": _2, "idrett": _2, "priv": _2, "mil": _2, "stat": _2, "dep": _2, "kommune": _2, "herad": _2, "aa": _53, "ah": _53, "bu": _53, "fm": _53, "hl": _53, "hm": _53, "jan-mayen": _53, "mr": _53, "nl": _53, "nt": _53, "of": _53, "ol": _53, "oslo": _53, "rl": _53, "sf": _53, "st": _53, "svalbard": _53, "tm": _53, "tr": _53, "va": _53, "vf": _53, "akrehamn": _2, "xn--krehamn-dxa": _2, "\xE5krehamn": _2, "algard": _2, "xn--lgrd-poac": _2, "\xE5lg\xE5rd": _2, "arna": _2, "brumunddal": _2, "bryne": _2, "bronnoysund": _2, "xn--brnnysund-m8ac": _2, "br\xF8nn\xF8ysund": _2, "drobak": _2, "xn--drbak-wua": _2, "dr\xF8bak": _2, "egersund": _2, "fetsund": _2, "floro": _2, "xn--flor-jra": _2, "flor\xF8": _2, "fredrikstad": _2, "hokksund": _2, "honefoss": _2, "xn--hnefoss-q1a": _2, "h\xF8nefoss": _2, "jessheim": _2, "jorpeland": _2, "xn--jrpeland-54a": _2, "j\xF8rpeland": _2, "kirkenes": _2, "kopervik": _2, "krokstadelva": _2, "langevag": _2, "xn--langevg-jxa": _2, "langev\xE5g": _2, "leirvik": _2, "mjondalen": _2, "xn--mjndalen-64a": _2, "mj\xF8ndalen": _2, "mo-i-rana": _2, "mosjoen": _2, "xn--mosjen-eya": _2, "mosj\xF8en": _2, "nesoddtangen": _2, "orkanger": _2, "osoyro": _2, "xn--osyro-wua": _2, "os\xF8yro": _2, "raholt": _2, "xn--rholt-mra": _2, "r\xE5holt": _2, "sandnessjoen": _2, "xn--sandnessjen-ogb": _2, "sandnessj\xF8en": _2, "skedsmokorset": _2, "slattum": _2, "spjelkavik": _2, "stathelle": _2, "stavern": _2, "stjordalshalsen": _2, "xn--stjrdalshalsen-sqb": _2, "stj\xF8rdalshalsen": _2, "tananger": _2, "tranby": _2, "vossevangen": _2, "afjord": _2, "xn--fjord-lra": _2, "\xE5fjord": _2, "agdenes": _2, "al": _2, "xn--l-1fa": _2, "\xE5l": _2, "alesund": _2, "xn--lesund-hua": _2, "\xE5lesund": _2, "alstahaug": _2, "alta": _2, "xn--lt-liac": _2, "\xE1lt\xE1": _2, "alaheadju": _2, "xn--laheadju-7ya": _2, "\xE1laheadju": _2, "alvdal": _2, "amli": _2, "xn--mli-tla": _2, "\xE5mli": _2, "amot": _2, "xn--mot-tla": _2, "\xE5mot": _2, "andebu": _2, "andoy": _2, "xn--andy-ira": _2, "and\xF8y": _2, "andasuolo": _2, "ardal": _2, "xn--rdal-poa": _2, "\xE5rdal": _2, "aremark": _2, "arendal": _2, "xn--s-1fa": _2, "\xE5s": _2, "aseral": _2, "xn--seral-lra": _2, "\xE5seral": _2, "asker": _2, "askim": _2, "askvoll": _2, "askoy": _2, "xn--asky-ira": _2, "ask\xF8y": _2, "asnes": _2, "xn--snes-poa": _2, "\xE5snes": _2, "audnedaln": _2, "aukra": _2, "aure": _2, "aurland": _2, "aurskog-holand": _2, "xn--aurskog-hland-jnb": _2, "aurskog-h\xF8land": _2, "austevoll": _2, "austrheim": _2, "averoy": _2, "xn--avery-yua": _2, "aver\xF8y": _2, "balestrand": _2, "ballangen": _2, "balat": _2, "xn--blt-elab": _2, "b\xE1l\xE1t": _2, "balsfjord": _2, "bahccavuotna": _2, "xn--bhccavuotna-k7a": _2, "b\xE1hccavuotna": _2, "bamble": _2, "bardu": _2, "beardu": _2, "beiarn": _2, "bajddar": _2, "xn--bjddar-pta": _2, "b\xE1jddar": _2, "baidar": _2, "xn--bidr-5nac": _2, "b\xE1id\xE1r": _2, "berg": _2, "bergen": _2, "berlevag": _2, "xn--berlevg-jxa": _2, "berlev\xE5g": _2, "bearalvahki": _2, "xn--bearalvhki-y4a": _2, "bearalv\xE1hki": _2, "bindal": _2, "birkenes": _2, "bjarkoy": _2, "xn--bjarky-fya": _2, "bjark\xF8y": _2, "bjerkreim": _2, "bjugn": _2, "bodo": _2, "xn--bod-2na": _2, "bod\xF8": _2, "badaddja": _2, "xn--bdddj-mrabd": _2, "b\xE5d\xE5ddj\xE5": _2, "budejju": _2, "bokn": _2, "bremanger": _2, "bronnoy": _2, "xn--brnny-wuac": _2, "br\xF8nn\xF8y": _2, "bygland": _2, "bykle": _2, "barum": _2, "xn--brum-voa": _2, "b\xE6rum": _2, "telemark": [0, { "bo": _2, "xn--b-5ga": _2, "b\xF8": _2 }], "nordland": [0, { "bo": _2, "xn--b-5ga": _2, "b\xF8": _2, "heroy": _2, "xn--hery-ira": _2, "her\xF8y": _2 }], "bievat": _2, "xn--bievt-0qa": _2, "biev\xE1t": _2, "bomlo": _2, "xn--bmlo-gra": _2, "b\xF8mlo": _2, "batsfjord": _2, "xn--btsfjord-9za": _2, "b\xE5tsfjord": _2, "bahcavuotna": _2, "xn--bhcavuotna-s4a": _2, "b\xE1hcavuotna": _2, "dovre": _2, "drammen": _2, "drangedal": _2, "dyroy": _2, "xn--dyry-ira": _2, "dyr\xF8y": _2, "donna": _2, "xn--dnna-gra": _2, "d\xF8nna": _2, "eid": _2, "eidfjord": _2, "eidsberg": _2, "eidskog": _2, "eidsvoll": _2, "eigersund": _2, "elverum": _2, "enebakk": _2, "engerdal": _2, "etne": _2, "etnedal": _2, "evenes": _2, "evenassi": _2, "xn--eveni-0qa01ga": _2, "even\xE1\u0161\u0161i": _2, "evje-og-hornnes": _2, "farsund": _2, "fauske": _2, "fuossko": _2, "fuoisku": _2, "fedje": _2, "fet": _2, "finnoy": _2, "xn--finny-yua": _2, "finn\xF8y": _2, "fitjar": _2, "fjaler": _2, "fjell": _2, "flakstad": _2, "flatanger": _2, "flekkefjord": _2, "flesberg": _2, "flora": _2, "fla": _2, "xn--fl-zia": _2, "fl\xE5": _2, "folldal": _2, "forsand": _2, "fosnes": _2, "frei": _2, "frogn": _2, "froland": _2, "frosta": _2, "frana": _2, "xn--frna-woa": _2, "fr\xE6na": _2, "froya": _2, "xn--frya-hra": _2, "fr\xF8ya": _2, "fusa": _2, "fyresdal": _2, "forde": _2, "xn--frde-gra": _2, "f\xF8rde": _2, "gamvik": _2, "gangaviika": _2, "xn--ggaviika-8ya47h": _2, "g\xE1\u014Bgaviika": _2, "gaular": _2, "gausdal": _2, "gildeskal": _2, "xn--gildeskl-g0a": _2, "gildesk\xE5l": _2, "giske": _2, "gjemnes": _2, "gjerdrum": _2, "gjerstad": _2, "gjesdal": _2, "gjovik": _2, "xn--gjvik-wua": _2, "gj\xF8vik": _2, "gloppen": _2, "gol": _2, "gran": _2, "grane": _2, "granvin": _2, "gratangen": _2, "grimstad": _2, "grong": _2, "kraanghke": _2, "xn--kranghke-b0a": _2, "kr\xE5anghke": _2, "grue": _2, "gulen": _2, "hadsel": _2, "halden": _2, "halsa": _2, "hamar": _2, "hamaroy": _2, "habmer": _2, "xn--hbmer-xqa": _2, "h\xE1bmer": _2, "hapmir": _2, "xn--hpmir-xqa": _2, "h\xE1pmir": _2, "hammerfest": _2, "hammarfeasta": _2, "xn--hmmrfeasta-s4ac": _2, "h\xE1mm\xE1rfeasta": _2, "haram": _2, "hareid": _2, "harstad": _2, "hasvik": _2, "aknoluokta": _2, "xn--koluokta-7ya57h": _2, "\xE1k\u014Boluokta": _2, "hattfjelldal": _2, "aarborte": _2, "haugesund": _2, "hemne": _2, "hemnes": _2, "hemsedal": _2, "more-og-romsdal": [0, { "heroy": _2, "sande": _2 }], "xn--mre-og-romsdal-qqb": [0, { "xn--hery-ira": _2, "sande": _2 }], "m\xF8re-og-romsdal": [0, { "her\xF8y": _2, "sande": _2 }], "hitra": _2, "hjartdal": _2, "hjelmeland": _2, "hobol": _2, "xn--hobl-ira": _2, "hob\xF8l": _2, "hof": _2, "hol": _2, "hole": _2, "holmestrand": _2, "holtalen": _2, "xn--holtlen-hxa": _2, "holt\xE5len": _2, "hornindal": _2, "horten": _2, "hurdal": _2, "hurum": _2, "hvaler": _2, "hyllestad": _2, "hagebostad": _2, "xn--hgebostad-g3a": _2, "h\xE6gebostad": _2, "hoyanger": _2, "xn--hyanger-q1a": _2, "h\xF8yanger": _2, "hoylandet": _2, "xn--hylandet-54a": _2, "h\xF8ylandet": _2, "ha": _2, "xn--h-2fa": _2, "h\xE5": _2, "ibestad": _2, "inderoy": _2, "xn--indery-fya": _2, "inder\xF8y": _2, "iveland": _2, "jevnaker": _2, "jondal": _2, "jolster": _2, "xn--jlster-bya": _2, "j\xF8lster": _2, "karasjok": _2, "karasjohka": _2, "xn--krjohka-hwab49j": _2, "k\xE1r\xE1\u0161johka": _2, "karlsoy": _2, "galsa": _2, "xn--gls-elac": _2, "g\xE1ls\xE1": _2, "karmoy": _2, "xn--karmy-yua": _2, "karm\xF8y": _2, "kautokeino": _2, "guovdageaidnu": _2, "klepp": _2, "klabu": _2, "xn--klbu-woa": _2, "kl\xE6bu": _2, "kongsberg": _2, "kongsvinger": _2, "kragero": _2, "xn--krager-gya": _2, "krager\xF8": _2, "kristiansand": _2, "kristiansund": _2, "krodsherad": _2, "xn--krdsherad-m8a": _2, "kr\xF8dsherad": _2, "kvalsund": _2, "rahkkeravju": _2, "xn--rhkkervju-01af": _2, "r\xE1hkker\xE1vju": _2, "kvam": _2, "kvinesdal": _2, "kvinnherad": _2, "kviteseid": _2, "kvitsoy": _2, "xn--kvitsy-fya": _2, "kvits\xF8y": _2, "kvafjord": _2, "xn--kvfjord-nxa": _2, "kv\xE6fjord": _2, "giehtavuoatna": _2, "kvanangen": _2, "xn--kvnangen-k0a": _2, "kv\xE6nangen": _2, "navuotna": _2, "xn--nvuotna-hwa": _2, "n\xE1vuotna": _2, "kafjord": _2, "xn--kfjord-iua": _2, "k\xE5fjord": _2, "gaivuotna": _2, "xn--givuotna-8ya": _2, "g\xE1ivuotna": _2, "larvik": _2, "lavangen": _2, "lavagis": _2, "loabat": _2, "xn--loabt-0qa": _2, "loab\xE1t": _2, "lebesby": _2, "davvesiida": _2, "leikanger": _2, "leirfjord": _2, "leka": _2, "leksvik": _2, "lenvik": _2, "leangaviika": _2, "xn--leagaviika-52b": _2, "lea\u014Bgaviika": _2, "lesja": _2, "levanger": _2, "lier": _2, "lierne": _2, "lillehammer": _2, "lillesand": _2, "lindesnes": _2, "lindas": _2, "xn--linds-pra": _2, "lind\xE5s": _2, "lom": _2, "loppa": _2, "lahppi": _2, "xn--lhppi-xqa": _2, "l\xE1hppi": _2, "lund": _2, "lunner": _2, "luroy": _2, "xn--lury-ira": _2, "lur\xF8y": _2, "luster": _2, "lyngdal": _2, "lyngen": _2, "ivgu": _2, "lardal": _2, "lerdal": _2, "xn--lrdal-sra": _2, "l\xE6rdal": _2, "lodingen": _2, "xn--ldingen-q1a": _2, "l\xF8dingen": _2, "lorenskog": _2, "xn--lrenskog-54a": _2, "l\xF8renskog": _2, "loten": _2, "xn--lten-gra": _2, "l\xF8ten": _2, "malvik": _2, "masoy": _2, "xn--msy-ula0h": _2, "m\xE5s\xF8y": _2, "muosat": _2, "xn--muost-0qa": _2, "muos\xE1t": _2, "mandal": _2, "marker": _2, "marnardal": _2, "masfjorden": _2, "meland": _2, "meldal": _2, "melhus": _2, "meloy": _2, "xn--mely-ira": _2, "mel\xF8y": _2, "meraker": _2, "xn--merker-kua": _2, "mer\xE5ker": _2, "moareke": _2, "xn--moreke-jua": _2, "mo\xE5reke": _2, "midsund": _2, "midtre-gauldal": _2, "modalen": _2, "modum": _2, "molde": _2, "moskenes": _2, "moss": _2, "mosvik": _2, "malselv": _2, "xn--mlselv-iua": _2, "m\xE5lselv": _2, "malatvuopmi": _2, "xn--mlatvuopmi-s4a": _2, "m\xE1latvuopmi": _2, "namdalseid": _2, "aejrie": _2, "namsos": _2, "namsskogan": _2, "naamesjevuemie": _2, "xn--nmesjevuemie-tcba": _2, "n\xE5\xE5mesjevuemie": _2, "laakesvuemie": _2, "nannestad": _2, "narvik": _2, "narviika": _2, "naustdal": _2, "nedre-eiker": _2, "akershus": _54, "buskerud": _54, "nesna": _2, "nesodden": _2, "nesseby": _2, "unjarga": _2, "xn--unjrga-rta": _2, "unj\xE1rga": _2, "nesset": _2, "nissedal": _2, "nittedal": _2, "nord-aurdal": _2, "nord-fron": _2, "nord-odal": _2, "norddal": _2, "nordkapp": _2, "davvenjarga": _2, "xn--davvenjrga-y4a": _2, "davvenj\xE1rga": _2, "nordre-land": _2, "nordreisa": _2, "raisa": _2, "xn--risa-5na": _2, "r\xE1isa": _2, "nore-og-uvdal": _2, "notodden": _2, "naroy": _2, "xn--nry-yla5g": _2, "n\xE6r\xF8y": _2, "notteroy": _2, "xn--nttery-byae": _2, "n\xF8tter\xF8y": _2, "odda": _2, "oksnes": _2, "xn--ksnes-uua": _2, "\xF8ksnes": _2, "oppdal": _2, "oppegard": _2, "xn--oppegrd-ixa": _2, "oppeg\xE5rd": _2, "orkdal": _2, "orland": _2, "xn--rland-uua": _2, "\xF8rland": _2, "orskog": _2, "xn--rskog-uua": _2, "\xF8rskog": _2, "orsta": _2, "xn--rsta-fra": _2, "\xF8rsta": _2, "hedmark": [0, { "os": _2, "valer": _2, "xn--vler-qoa": _2, "v\xE5ler": _2 }], "hordaland": [0, { "os": _2 }], "osen": _2, "osteroy": _2, "xn--ostery-fya": _2, "oster\xF8y": _2, "ostre-toten": _2, "xn--stre-toten-zcb": _2, "\xF8stre-toten": _2, "overhalla": _2, "ovre-eiker": _2, "xn--vre-eiker-k8a": _2, "\xF8vre-eiker": _2, "oyer": _2, "xn--yer-zna": _2, "\xF8yer": _2, "oygarden": _2, "xn--ygarden-p1a": _2, "\xF8ygarden": _2, "oystre-slidre": _2, "xn--ystre-slidre-ujb": _2, "\xF8ystre-slidre": _2, "porsanger": _2, "porsangu": _2, "xn--porsgu-sta26f": _2, "pors\xE1\u014Bgu": _2, "porsgrunn": _2, "radoy": _2, "xn--rady-ira": _2, "rad\xF8y": _2, "rakkestad": _2, "rana": _2, "ruovat": _2, "randaberg": _2, "rauma": _2, "rendalen": _2, "rennebu": _2, "rennesoy": _2, "xn--rennesy-v1a": _2, "rennes\xF8y": _2, "rindal": _2, "ringebu": _2, "ringerike": _2, "ringsaker": _2, "rissa": _2, "risor": _2, "xn--risr-ira": _2, "ris\xF8r": _2, "roan": _2, "rollag": _2, "rygge": _2, "ralingen": _2, "xn--rlingen-mxa": _2, "r\xE6lingen": _2, "rodoy": _2, "xn--rdy-0nab": _2, "r\xF8d\xF8y": _2, "romskog": _2, "xn--rmskog-bya": _2, "r\xF8mskog": _2, "roros": _2, "xn--rros-gra": _2, "r\xF8ros": _2, "rost": _2, "xn--rst-0na": _2, "r\xF8st": _2, "royken": _2, "xn--ryken-vua": _2, "r\xF8yken": _2, "royrvik": _2, "xn--ryrvik-bya": _2, "r\xF8yrvik": _2, "rade": _2, "xn--rde-ula": _2, "r\xE5de": _2, "salangen": _2, "siellak": _2, "saltdal": _2, "salat": _2, "xn--slt-elab": _2, "s\xE1l\xE1t": _2, "xn--slat-5na": _2, "s\xE1lat": _2, "samnanger": _2, "vestfold": [0, { "sande": _2 }], "sandefjord": _2, "sandnes": _2, "sandoy": _2, "xn--sandy-yua": _2, "sand\xF8y": _2, "sarpsborg": _2, "sauda": _2, "sauherad": _2, "sel": _2, "selbu": _2, "selje": _2, "seljord": _2, "sigdal": _2, "siljan": _2, "sirdal": _2, "skaun": _2, "skedsmo": _2, "ski": _2, "skien": _2, "skiptvet": _2, "skjervoy": _2, "xn--skjervy-v1a": _2, "skjerv\xF8y": _2, "skierva": _2, "xn--skierv-uta": _2, "skierv\xE1": _2, "skjak": _2, "xn--skjk-soa": _2, "skj\xE5k": _2, "skodje": _2, "skanland": _2, "xn--sknland-fxa": _2, "sk\xE5nland": _2, "skanit": _2, "xn--sknit-yqa": _2, "sk\xE1nit": _2, "smola": _2, "xn--smla-hra": _2, "sm\xF8la": _2, "snillfjord": _2, "snasa": _2, "xn--snsa-roa": _2, "sn\xE5sa": _2, "snoasa": _2, "snaase": _2, "xn--snase-nra": _2, "sn\xE5ase": _2, "sogndal": _2, "sokndal": _2, "sola": _2, "solund": _2, "songdalen": _2, "sortland": _2, "spydeberg": _2, "stange": _2, "stavanger": _2, "steigen": _2, "steinkjer": _2, "stjordal": _2, "xn--stjrdal-s1a": _2, "stj\xF8rdal": _2, "stokke": _2, "stor-elvdal": _2, "stord": _2, "stordal": _2, "storfjord": _2, "omasvuotna": _2, "strand": _2, "stranda": _2, "stryn": _2, "sula": _2, "suldal": _2, "sund": _2, "sunndal": _2, "surnadal": _2, "sveio": _2, "svelvik": _2, "sykkylven": _2, "sogne": _2, "xn--sgne-gra": _2, "s\xF8gne": _2, "somna": _2, "xn--smna-gra": _2, "s\xF8mna": _2, "sondre-land": _2, "xn--sndre-land-0cb": _2, "s\xF8ndre-land": _2, "sor-aurdal": _2, "xn--sr-aurdal-l8a": _2, "s\xF8r-aurdal": _2, "sor-fron": _2, "xn--sr-fron-q1a": _2, "s\xF8r-fron": _2, "sor-odal": _2, "xn--sr-odal-q1a": _2, "s\xF8r-odal": _2, "sor-varanger": _2, "xn--sr-varanger-ggb": _2, "s\xF8r-varanger": _2, "matta-varjjat": _2, "xn--mtta-vrjjat-k7af": _2, "m\xE1tta-v\xE1rjjat": _2, "sorfold": _2, "xn--srfold-bya": _2, "s\xF8rfold": _2, "sorreisa": _2, "xn--srreisa-q1a": _2, "s\xF8rreisa": _2, "sorum": _2, "xn--srum-gra": _2, "s\xF8rum": _2, "tana": _2, "deatnu": _2, "time": _2, "tingvoll": _2, "tinn": _2, "tjeldsund": _2, "dielddanuorri": _2, "tjome": _2, "xn--tjme-hra": _2, "tj\xF8me": _2, "tokke": _2, "tolga": _2, "torsken": _2, "tranoy": _2, "xn--trany-yua": _2, "tran\xF8y": _2, "tromso": _2, "xn--troms-zua": _2, "troms\xF8": _2, "tromsa": _2, "romsa": _2, "trondheim": _2, "troandin": _2, "trysil": _2, "trana": _2, "xn--trna-woa": _2, "tr\xE6na": _2, "trogstad": _2, "xn--trgstad-r1a": _2, "tr\xF8gstad": _2, "tvedestrand": _2, "tydal": _2, "tynset": _2, "tysfjord": _2, "divtasvuodna": _2, "divttasvuotna": _2, "tysnes": _2, "tysvar": _2, "xn--tysvr-vra": _2, "tysv\xE6r": _2, "tonsberg": _2, "xn--tnsberg-q1a": _2, "t\xF8nsberg": _2, "ullensaker": _2, "ullensvang": _2, "ulvik": _2, "utsira": _2, "vadso": _2, "xn--vads-jra": _2, "vads\xF8": _2, "cahcesuolo": _2, "xn--hcesuolo-7ya35b": _2, "\u010D\xE1hcesuolo": _2, "vaksdal": _2, "valle": _2, "vang": _2, "vanylven": _2, "vardo": _2, "xn--vard-jra": _2, "vard\xF8": _2, "varggat": _2, "xn--vrggt-xqad": _2, "v\xE1rgg\xE1t": _2, "vefsn": _2, "vaapste": _2, "vega": _2, "vegarshei": _2, "xn--vegrshei-c0a": _2, "veg\xE5rshei": _2, "vennesla": _2, "verdal": _2, "verran": _2, "vestby": _2, "vestnes": _2, "vestre-slidre": _2, "vestre-toten": _2, "vestvagoy": _2, "xn--vestvgy-ixa6o": _2, "vestv\xE5g\xF8y": _2, "vevelstad": _2, "vik": _2, "vikna": _2, "vindafjord": _2, "volda": _2, "voss": _2, "varoy": _2, "xn--vry-yla5g": _2, "v\xE6r\xF8y": _2, "vagan": _2, "xn--vgan-qoa": _2, "v\xE5gan": _2, "voagat": _2, "vagsoy": _2, "xn--vgsy-qoa0j": _2, "v\xE5gs\xF8y": _2, "vaga": _2, "xn--vg-yiab": _2, "v\xE5g\xE5": _2, "ostfold": [0, { "valer": _2 }], "xn--stfold-9xa": [0, { "xn--vler-qoa": _2 }], "\xF8stfold": [0, { "v\xE5ler": _2 }], "co": _3, "blogspot": _3, "123hjemmeside": _3, "myspreadshop": _3 }], "np": _12, "nr": _48, "nu": [1, { "merseine": _3, "mine": _3, "shacknet": _3, "enterprisecloud": _3 }], "nz": [1, { "ac": _2, "co": _6, "cri": _2, "geek": _2, "gen": _2, "govt": _2, "health": _2, "iwi": _2, "kiwi": _2, "maori": _2, "mil": _2, "xn--mori-qsa": _2, "m\u0101ori": _2, "net": _2, "org": _2, "parliament": _2, "school": _2 }], "om": [1, { "co": _2, "com": _2, "edu": _2, "gov": _2, "med": _2, "museum": _2, "net": _2, "org": _2, "pro": _2 }], "onion": _2, "org": [1, { "altervista": _3, "amune": [0, { "tele": _3 }], "pimienta": _3, "poivron": _3, "potager": _3, "sweetpepper": _3, "ae": _3, "us": _3, "certmgr": _3, "cdn77": [0, { "c": _3, "rsc": _3 }], "cdn77-secure": [0, { "origin": [0, { "ssl": _3 }] }], "cloudns": _3, "duckdns": _3, "tunk": _3, "dyndns": [2, { "go": _3, "home": _3 }], "blogdns": _3, "blogsite": _3, "boldlygoingnowhere": _3, "dnsalias": _3, "dnsdojo": _3, "doesntexist": _3, "dontexist": _3, "doomdns": _3, "dvrdns": _3, "dynalias": _3, "endofinternet": _3, "endoftheinternet": _3, "from-me": _3, "game-host": _3, "gotdns": _3, "hobby-site": _3, "homedns": _3, "homeftp": _3, "homelinux": _3, "homeunix": _3, "is-a-bruinsfan": _3, "is-a-candidate": _3, "is-a-celticsfan": _3, "is-a-chef": _3, "is-a-geek": _3, "is-a-knight": _3, "is-a-linux-user": _3, "is-a-patsfan": _3, "is-a-soxfan": _3, "is-found": _3, "is-lost": _3, "is-saved": _3, "is-very-bad": _3, "is-very-evil": _3, "is-very-good": _3, "is-very-nice": _3, "is-very-sweet": _3, "isa-geek": _3, "kicks-ass": _3, "misconfused": _3, "podzone": _3, "readmyblog": _3, "selfip": _3, "sellsyourhome": _3, "servebbs": _3, "serveftp": _3, "servegame": _3, "stuff-4-sale": _3, "webhop": _3, "ddnss": _3, "accesscam": _3, "camdvr": _3, "freeddns": _3, "mywire": _3, "webredirect": _3, "eu": [2, { "al": _3, "asso": _3, "at": _3, "au": _3, "be": _3, "bg": _3, "ca": _3, "cd": _3, "ch": _3, "cn": _3, "cy": _3, "cz": _3, "de": _3, "dk": _3, "edu": _3, "ee": _3, "es": _3, "fi": _3, "fr": _3, "gr": _3, "hr": _3, "hu": _3, "ie": _3, "il": _3, "in": _3, "int": _3, "is": _3, "it": _3, "jp": _3, "kr": _3, "lt": _3, "lu": _3, "lv": _3, "mc": _3, "me": _3, "mk": _3, "mt": _3, "my": _3, "net": _3, "ng": _3, "nl": _3, "no": _3, "nz": _3, "paris": _3, "pl": _3, "pt": _3, "q-a": _3, "ro": _3, "ru": _3, "se": _3, "si": _3, "sk": _3, "tr": _3, "uk": _3, "us": _3 }], "twmail": _3, "fedorainfracloud": _3, "fedorapeople": _3, "fedoraproject": [0, { "cloud": _3, "os": _35, "stg": [0, { "os": _35 }] }], "freedesktop": _3, "hepforge": _3, "in-dsl": _3, "in-vpn": _3, "js": _3, "barsy": _3, "mayfirst": _3, "mozilla-iot": _3, "bmoattachments": _3, "dynserv": _3, "now-dns": _3, "cable-modem": _3, "collegefan": _3, "couchpotatofries": _3, "mlbfan": _3, "mysecuritycamera": _3, "nflfan": _3, "read-books": _3, "ufcfan": _3, "hopto": _3, "myftp": _3, "no-ip": _3, "zapto": _3, "httpbin": _3, "pubtls": _3, "jpn": _3, "my-firewall": _3, "myfirewall": _3, "spdns": _3, "small-web": _3, "dsmynas": _3, "familyds": _3, "teckids": _47, "tuxfamily": _3, "diskstation": _3, "hk": _3, "wmflabs": _3, "toolforge": _3, "wmcloud": _3, "za": _3 }], "pa": [1, { "ac": _2, "gob": _2, "com": _2, "org": _2, "sld": _2, "edu": _2, "net": _2, "ing": _2, "abo": _2, "med": _2, "nom": _2 }], "pe": [1, { "edu": _2, "gob": _2, "nom": _2, "mil": _2, "org": _2, "com": _2, "net": _2, "blogspot": _3 }], "pf": [1, { "com": _2, "org": _2, "edu": _2 }], "pg": _12, "ph": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "ngo": _2, "mil": _2, "i": _2 }], "pk": [1, { "com": _2, "net": _2, "edu": _2, "org": _2, "fam": _2, "biz": _2, "web": _2, "gov": _2, "gob": _2, "gok": _2, "gon": _2, "gop": _2, "gos": _2, "info": _2 }], "pl": [1, { "com": _2, "net": _2, "org": _2, "aid": _2, "agro": _2, "atm": _2, "auto": _2, "biz": _2, "edu": _2, "gmina": _2, "gsm": _2, "info": _2, "mail": _2, "miasta": _2, "media": _2, "mil": _2, "nieruchomosci": _2, "nom": _2, "pc": _2, "powiat": _2, "priv": _2, "realestate": _2, "rel": _2, "sex": _2, "shop": _2, "sklep": _2, "sos": _2, "szkola": _2, "targi": _2, "tm": _2, "tourism": _2, "travel": _2, "turystyka": _2, "gov": [1, { "ap": _2, "griw": _2, "ic": _2, "is": _2, "kmpsp": _2, "konsulat": _2, "kppsp": _2, "kwp": _2, "kwpsp": _2, "mup": _2, "mw": _2, "oia": _2, "oirm": _2, "oke": _2, "oow": _2, "oschr": _2, "oum": _2, "pa": _2, "pinb": _2, "piw": _2, "po": _2, "pr": _2, "psp": _2, "psse": _2, "pup": _2, "rzgw": _2, "sa": _2, "sdn": _2, "sko": _2, "so": _2, "sr": _2, "starostwo": _2, "ug": _2, "ugim": _2, "um": _2, "umig": _2, "upow": _2, "uppo": _2, "us": _2, "uw": _2, "uzs": _2, "wif": _2, "wiih": _2, "winb": _2, "wios": _2, "witd": _2, "wiw": _2, "wkz": _2, "wsa": _2, "wskr": _2, "wsse": _2, "wuoz": _2, "wzmiuw": _2, "zp": _2, "zpisdn": _2 }], "augustow": _2, "babia-gora": _2, "bedzin": _2, "beskidy": _2, "bialowieza": _2, "bialystok": _2, "bielawa": _2, "bieszczady": _2, "boleslawiec": _2, "bydgoszcz": _2, "bytom": _2, "cieszyn": _2, "czeladz": _2, "czest": _2, "dlugoleka": _2, "elblag": _2, "elk": _2, "glogow": _2, "gniezno": _2, "gorlice": _2, "grajewo": _2, "ilawa": _2, "jaworzno": _2, "jelenia-gora": _2, "jgora": _2, "kalisz": _2, "kazimierz-dolny": _2, "karpacz": _2, "kartuzy": _2, "kaszuby": _2, "katowice": _2, "kepno": _2, "ketrzyn": _2, "klodzko": _2, "kobierzyce": _2, "kolobrzeg": _2, "konin": _2, "konskowola": _2, "kutno": _2, "lapy": _2, "lebork": _2, "legnica": _2, "lezajsk": _2, "limanowa": _2, "lomza": _2, "lowicz": _2, "lubin": _2, "lukow": _2, "malbork": _2, "malopolska": _2, "mazowsze": _2, "mazury": _2, "mielec": _2, "mielno": _2, "mragowo": _2, "naklo": _2, "nowaruda": _2, "nysa": _2, "olawa": _2, "olecko": _2, "olkusz": _2, "olsztyn": _2, "opoczno": _2, "opole": _2, "ostroda": _2, "ostroleka": _2, "ostrowiec": _2, "ostrowwlkp": _2, "pila": _2, "pisz": _2, "podhale": _2, "podlasie": _2, "polkowice": _2, "pomorze": _2, "pomorskie": _2, "prochowice": _2, "pruszkow": _2, "przeworsk": _2, "pulawy": _2, "radom": _2, "rawa-maz": _2, "rybnik": _2, "rzeszow": _2, "sanok": _2, "sejny": _2, "slask": _2, "slupsk": _2, "sosnowiec": _2, "stalowa-wola": _2, "skoczow": _2, "starachowice": _2, "stargard": _2, "suwalki": _2, "swidnica": _2, "swiebodzin": _2, "swinoujscie": _2, "szczecin": _2, "szczytno": _2, "tarnobrzeg": _2, "tgory": _2, "turek": _2, "tychy": _2, "ustka": _2, "walbrzych": _2, "warmia": _2, "warszawa": _2, "waw": _2, "wegrow": _2, "wielun": _2, "wlocl": _2, "wloclawek": _2, "wodzislaw": _2, "wolomin": _2, "wroclaw": _2, "zachpomor": _2, "zagan": _2, "zarow": _2, "zgora": _2, "zgorzelec": _2, "beep": _3, "ecommerce-shop": _3, "shoparena": _3, "homesklep": _3, "sdscloud": _3, "unicloud": _3, "krasnik": _3, "leczna": _3, "lubartow": _3, "lublin": _3, "poniatowa": _3, "swidnik": _3, "co": _3, "torun": _3, "simplesite": _3, "art": _3, "gliwice": _3, "krakow": _3, "poznan": _3, "wroc": _3, "zakopane": _3, "myspreadshop": _3, "gda": _3, "gdansk": _3, "gdynia": _3, "med": _3, "sopot": _3 }], "pm": [1, { "own": _3, "name": _3 }], "pn": [1, { "gov": _2, "co": _2, "org": _2, "edu": _2, "net": _2 }], "post": _2, "pr": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "isla": _2, "pro": _2, "biz": _2, "info": _2, "name": _2, "est": _2, "prof": _2, "ac": _2 }], "pro": [1, { "aaa": _2, "aca": _2, "acct": _2, "avocat": _2, "bar": _2, "cpa": _2, "eng": _2, "jur": _2, "law": _2, "med": _2, "recht": _2, "cloudns": _3, "dnstrace": [0, { "bci": _3 }], "barsy": _3 }], "ps": [1, { "edu": _2, "gov": _2, "sec": _2, "plo": _2, "com": _2, "org": _2, "net": _2 }], "pt": [1, { "net": _2, "gov": _2, "org": _2, "edu": _2, "int": _2, "publ": _2, "com": _2, "nome": _2, "blogspot": _3, "123paginaweb": _3 }], "pw": [1, { "co": _2, "ne": _2, "or": _2, "ed": _2, "go": _2, "belau": _2, "cloudns": _3, "x443": _3 }], "py": [1, { "com": _2, "coop": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 }], "qa": [1, { "com": _2, "edu": _2, "gov": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "sch": _2, "blogspot": _3 }], "re": [1, { "asso": _2, "com": _2, "nom": _2, "blogspot": _3 }], "ro": [1, { "arts": _2, "com": _2, "firm": _2, "info": _2, "nom": _2, "nt": _2, "org": _2, "rec": _2, "store": _2, "tm": _2, "www": _2, "co": _3, "shop": _3, "blogspot": _3, "barsy": _3 }], "rs": [1, { "ac": _2, "co": _2, "edu": _2, "gov": _2, "in": _2, "org": _2, "brendly": [0, { "shop": _3 }], "blogspot": _3, "ua": _3, "ox": _3 }], "ru": [1, { "ac": _3, "edu": _3, "gov": _3, "int": _3, "mil": _3, "test": _3, "eurodir": _3, "adygeya": _3, "bashkiria": _3, "bir": _3, "cbg": _3, "com": _3, "dagestan": _3, "grozny": _3, "kalmykia": _3, "kustanai": _3, "marine": _3, "mordovia": _3, "msk": _3, "mytis": _3, "nalchik": _3, "nov": _3, "pyatigorsk": _3, "spb": _3, "vladikavkaz": _3, "vladimir": _3, "blogspot": _3, "na4u": _3, "mircloud": _3, "regruhosting": _41, "myjino": [2, { "hosting": _5, "landing": _5, "spectrum": _5, "vps": _5 }], "cldmail": [0, { "hb": _3 }], "mcdir": [2, { "vps": _3 }], "mcpre": _3, "net": _3, "org": _3, "pp": _3, "123sait": _3, "lk3": _3, "ras": _3 }], "rw": [1, { "ac": _2, "co": _2, "coop": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 }], "sa": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "med": _2, "pub": _2, "edu": _2, "sch": _2 }], "sb": _4, "sc": _4, "sd": [1, { "com": _2, "net": _2, "org": _2, "edu": _2, "med": _2, "tv": _2, "gov": _2, "info": _2 }], "se": [1, { "a": _2, "ac": _2, "b": _2, "bd": _2, "brand": _2, "c": _2, "d": _2, "e": _2, "f": _2, "fh": _2, "fhsk": _2, "fhv": _2, "g": _2, "h": _2, "i": _2, "k": _2, "komforb": _2, "kommunalforbund": _2, "komvux": _2, "l": _2, "lanbib": _2, "m": _2, "n": _2, "naturbruksgymn": _2, "o": _2, "org": _2, "p": _2, "parti": _2, "pp": _2, "press": _2, "r": _2, "s": _2, "t": _2, "tm": _2, "u": _2, "w": _2, "x": _2, "y": _2, "z": _2, "com": _3, "blogspot": _3, "conf": _3, "iopsys": _3, "123minsida": _3, "itcouldbewor": _3, "myspreadshop": _3, "paba": [0, { "su": _3 }] }], "sg": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "per": _2, "blogspot": _3, "enscaled": _3 }], "sh": [1, { "com": _2, "net": _2, "gov": _2, "org": _2, "mil": _2, "bip": _3, "hashbang": _3, "platform": [0, { "bc": _3, "ent": _3, "eu": _3, "us": _3 }], "now": _3, "vxl": _3, "wedeploy": _3 }], "si": [1, { "gitapp": _3, "gitpage": _3, "blogspot": _3 }], "sj": _2, "sk": _6, "sl": _4, "sm": _2, "sn": [1, { "art": _2, "com": _2, "edu": _2, "gouv": _2, "org": _2, "perso": _2, "univ": _2, "blogspot": _3 }], "so": [1, { "com": _2, "edu": _2, "gov": _2, "me": _2, "net": _2, "org": _2, "sch": _3 }], "sr": _2, "ss": [1, { "biz": _2, "com": _2, "edu": _2, "gov": _2, "me": _2, "net": _2, "org": _2, "sch": _2 }], "st": [1, { "co": _2, "com": _2, "consulado": _2, "edu": _2, "embaixada": _2, "mil": _2, "net": _2, "org": _2, "principe": _2, "saotome": _2, "store": _2, "kirara": _3, "noho": _3 }], "su": [1, { "abkhazia": _3, "adygeya": _3, "aktyubinsk": _3, "arkhangelsk": _3, "armenia": _3, "ashgabad": _3, "azerbaijan": _3, "balashov": _3, "bashkiria": _3, "bryansk": _3, "bukhara": _3, "chimkent": _3, "dagestan": _3, "east-kazakhstan": _3, "exnet": _3, "georgia": _3, "grozny": _3, "ivanovo": _3, "jambyl": _3, "kalmykia": _3, "kaluga": _3, "karacol": _3, "karaganda": _3, "karelia": _3, "khakassia": _3, "krasnodar": _3, "kurgan": _3, "kustanai": _3, "lenug": _3, "mangyshlak": _3, "mordovia": _3, "msk": _3, "murmansk": _3, "nalchik": _3, "navoi": _3, "north-kazakhstan": _3, "nov": _3, "obninsk": _3, "penza": _3, "pokrovsk": _3, "sochi": _3, "spb": _3, "tashkent": _3, "termez": _3, "togliatti": _3, "troitsk": _3, "tselinograd": _3, "tula": _3, "tuva": _3, "vladikavkaz": _3, "vladimir": _3, "vologda": _3 }], "sv": [1, { "com": _2, "edu": _2, "gob": _2, "org": _2, "red": _2 }], "sx": _7, "sy": _46, "sz": [1, { "co": _2, "ac": _2, "org": _2 }], "tc": [1, { "ch": _3, "me": _3, "we": _3 }], "td": _6, "tel": _2, "tf": [1, { "sch": _3 }], "tg": _2, "th": [1, { "ac": _2, "co": _2, "go": _2, "in": _2, "mi": _2, "net": _2, "or": _2, "online": _3, "shop": _3 }], "tj": [1, { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "go": _2, "gov": _2, "int": _2, "mil": _2, "name": _2, "net": _2, "nic": _2, "org": _2, "test": _2, "web": _2 }], "tk": _2, "tl": _7, "tm": [1, { "com": _2, "co": _2, "org": _2, "net": _2, "nom": _2, "gov": _2, "mil": _2, "edu": _2 }], "tn": [1, { "com": _2, "ens": _2, "fin": _2, "gov": _2, "ind": _2, "info": _2, "intl": _2, "mincom": _2, "nat": _2, "net": _2, "org": _2, "perso": _2, "tourism": _2, "orangecloud": _3 }], "to": [1, { "611": _3, "com": _2, "gov": _2, "net": _2, "org": _2, "edu": _2, "mil": _2, "oya": _3, "rdv": _3, "x0": _3, "vpnplus": _3, "quickconnect": _19, "nyan": _3 }], "tr": [1, { "av": _2, "bbs": _2, "bel": _2, "biz": _2, "com": _6, "dr": _2, "edu": _2, "gen": _2, "gov": _2, "info": _2, "mil": _2, "k12": _2, "kep": _2, "name": _2, "net": _2, "org": _2, "pol": _2, "tel": _2, "tsk": _2, "tv": _2, "web": _2, "nc": _7 }], "tt": [1, { "co": _2, "com": _2, "org": _2, "net": _2, "biz": _2, "info": _2, "pro": _2, "int": _2, "coop": _2, "jobs": _2, "mobi": _2, "travel": _2, "museum": _2, "aero": _2, "name": _2, "gov": _2, "edu": _2 }], "tv": [1, { "dyndns": _3, "better-than": _3, "on-the-web": _3, "worse-than": _3, "from": _3, "sakura": _3 }], "tw": [1, { "edu": _2, "gov": _2, "mil": _2, "com": [1, { "mymailer": _3 }], "net": _2, "org": _2, "idv": _2, "game": _2, "ebiz": _2, "club": _2, "xn--zf0ao64a": _2, "\u7DB2\u8DEF": _2, "xn--uc0atv": _2, "\u7D44\u7E54": _2, "xn--czrw28b": _2, "\u5546\u696D": _2, "url": _3, "blogspot": _3 }], "tz": [1, { "ac": _2, "co": _2, "go": _2, "hotel": _2, "info": _2, "me": _2, "mil": _2, "mobi": _2, "ne": _2, "or": _2, "sc": _2, "tv": _2 }], "ua": [1, { "com": _2, "edu": _2, "gov": _2, "in": _2, "net": _2, "org": _2, "cherkassy": _2, "cherkasy": _2, "chernigov": _2, "chernihiv": _2, "chernivtsi": _2, "chernovtsy": _2, "ck": _2, "cn": _2, "cr": _2, "crimea": _2, "cv": _2, "dn": _2, "dnepropetrovsk": _2, "dnipropetrovsk": _2, "donetsk": _2, "dp": _2, "if": _2, "ivano-frankivsk": _2, "kh": _2, "kharkiv": _2, "kharkov": _2, "kherson": _2, "khmelnitskiy": _2, "khmelnytskyi": _2, "kiev": _2, "kirovograd": _2, "km": _2, "kr": _2, "kropyvnytskyi": _2, "krym": _2, "ks": _2, "kv": _2, "kyiv": _2, "lg": _2, "lt": _2, "lugansk": _2, "luhansk": _2, "lutsk": _2, "lv": _2, "lviv": _2, "mk": _2, "mykolaiv": _2, "nikolaev": _2, "od": _2, "odesa": _2, "odessa": _2, "pl": _2, "poltava": _2, "rivne": _2, "rovno": _2, "rv": _2, "sb": _2, "sebastopol": _2, "sevastopol": _2, "sm": _2, "sumy": _2, "te": _2, "ternopil": _2, "uz": _2, "uzhgorod": _2, "uzhhorod": _2, "vinnica": _2, "vinnytsia": _2, "vn": _2, "volyn": _2, "yalta": _2, "zakarpattia": _2, "zaporizhzhe": _2, "zaporizhzhia": _2, "zhitomir": _2, "zhytomyr": _2, "zp": _2, "zt": _2, "cc": _3, "inf": _3, "ltd": _3, "cx": _3, "ie": _3, "biz": _3, "co": _3, "pp": _3, "v": _3 }], "ug": [1, { "co": _2, "or": _2, "ac": _2, "sc": _2, "go": _2, "ne": _2, "com": _2, "org": _2, "blogspot": _3 }], "uk": [1, { "ac": _2, "co": [1, { "bytemark": [0, { "dh": _3, "vm": _3 }], "blogspot": _3, "layershift": _40, "barsy": _3, "barsyonline": _3, "retrosnub": _45, "nh-serv": _3, "no-ip": _3, "wellbeingzone": _3, "adimo": _3, "myspreadshop": _3 }], "gov": [1, { "campaign": _3, "service": _3, "api": _3, "homeoffice": _3 }], "ltd": _2, "me": _2, "net": _2, "nhs": _2, "org": [1, { "glug": _3, "lug": _3, "lugs": _3, "affinitylottery": _3, "raffleentry": _3, "weeklylottery": _3 }], "plc": _2, "police": _2, "sch": _12, "conn": _3, "copro": _3, "hosp": _3, "independent-commission": _3, "independent-inquest": _3, "independent-inquiry": _3, "independent-panel": _3, "independent-review": _3, "public-inquiry": _3, "royal-commission": _3, "pymnt": _3, "barsy": _3 }], "us": [1, { "dni": _2, "fed": _2, "isa": _2, "kids": _2, "nsn": _2, "ak": _55, "al": _55, "ar": _55, "as": _55, "az": _55, "ca": _55, "co": _55, "ct": _55, "dc": _55, "de": [1, { "cc": _2, "lib": _3 }], "fl": _55, "ga": _55, "gu": _55, "hi": _56, "ia": _55, "id": _55, "il": _55, "in": _55, "ks": _55, "ky": _55, "la": _55, "ma": [1, { "k12": [1, { "pvt": _2, "chtr": _2, "paroch": _2 }], "cc": _2, "lib": _2 }], "md": _55, "me": _55, "mi": [1, { "k12": _2, "cc": _2, "lib": _2, "ann-arbor": _2, "cog": _2, "dst": _2, "eaton": _2, "gen": _2, "mus": _2, "tec": _2, "washtenaw": _2 }], "mn": _55, "mo": _55, "ms": _55, "mt": _55, "nc": _55, "nd": _56, "ne": _55, "nh": _55, "nj": _55, "nm": _55, "nv": _55, "ny": _55, "oh": _55, "ok": _55, "or": _55, "pa": _55, "pr": _55, "ri": _56, "sc": _55, "sd": _56, "tn": _55, "tx": _55, "ut": _55, "vi": _55, "vt": _55, "va": _55, "wa": _55, "wi": _55, "wv": [1, { "cc": _2 }], "wy": _55, "graphox": _3, "cloudns": _3, "drud": _3, "is-by": _3, "land-4-sale": _3, "stuff-4-sale": _3, "enscaled": [0, { "phx": _3 }], "mircloud": _3, "freeddns": _3, "golffan": _3, "noip": _3, "pointto": _3, "platterp": _3 }], "uy": [1, { "com": _6, "edu": _2, "gub": _2, "mil": _2, "net": _2, "org": _2 }], "uz": [1, { "co": _2, "com": _2, "net": _2, "org": _2 }], "va": _2, "vc": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "mil": _2, "edu": _2, "gv": [2, { "d": _3 }], "0e": _3 }], "ve": [1, { "arts": _2, "bib": _2, "co": _2, "com": _2, "e12": _2, "edu": _2, "firm": _2, "gob": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "nom": _2, "org": _2, "rar": _2, "rec": _2, "store": _2, "tec": _2, "web": _2 }], "vg": [1, { "at": _3 }], "vi": [1, { "co": _2, "com": _2, "k12": _2, "net": _2, "org": _2 }], "vn": [1, { "ac": _2, "ai": _2, "biz": _2, "com": _2, "edu": _2, "gov": _2, "health": _2, "id": _2, "info": _2, "int": _2, "io": _2, "name": _2, "net": _2, "org": _2, "pro": _2, "angiang": _2, "bacgiang": _2, "backan": _2, "baclieu": _2, "bacninh": _2, "baria-vungtau": _2, "bentre": _2, "binhdinh": _2, "binhduong": _2, "binhphuoc": _2, "binhthuan": _2, "camau": _2, "cantho": _2, "caobang": _2, "daklak": _2, "daknong": _2, "danang": _2, "dienbien": _2, "dongnai": _2, "dongthap": _2, "gialai": _2, "hagiang": _2, "haiduong": _2, "haiphong": _2, "hanam": _2, "hanoi": _2, "hatinh": _2, "haugiang": _2, "hoabinh": _2, "hungyen": _2, "khanhhoa": _2, "kiengiang": _2, "kontum": _2, "laichau": _2, "lamdong": _2, "langson": _2, "laocai": _2, "longan": _2, "namdinh": _2, "nghean": _2, "ninhbinh": _2, "ninhthuan": _2, "phutho": _2, "phuyen": _2, "quangbinh": _2, "quangnam": _2, "quangngai": _2, "quangninh": _2, "quangtri": _2, "soctrang": _2, "sonla": _2, "tayninh": _2, "thaibinh": _2, "thainguyen": _2, "thanhhoa": _2, "thanhphohochiminh": _2, "thuathienhue": _2, "tiengiang": _2, "travinh": _2, "tuyenquang": _2, "vinhlong": _2, "vinhphuc": _2, "yenbai": _2, "blogspot": _3 }], "vu": [1, { "com": _2, "edu": _2, "net": _2, "org": _2, "cn": _3, "blog": _3, "dev": _3, "me": _3 }], "wf": [1, { "biz": _3, "sch": _3 }], "ws": [1, { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "advisor": _5, "cloud66": _3, "dyndns": _3, "mypets": _3 }], "yt": [1, { "org": _3 }], "xn--mgbaam7a8h": _2, "\u0627\u0645\u0627\u0631\u0627\u062A": _2, "xn--y9a3aq": _2, "\u0570\u0561\u0575": _2, "xn--54b7fta0cc": _2, "\u09AC\u09BE\u0982\u09B2\u09BE": _2, "xn--90ae": _2, "\u0431\u0433": _2, "xn--mgbcpq6gpa1a": _2, "\u0627\u0644\u0628\u062D\u0631\u064A\u0646": _2, "xn--90ais": _2, "\u0431\u0435\u043B": _2, "xn--fiqs8s": _2, "\u4E2D\u56FD": _2, "xn--fiqz9s": _2, "\u4E2D\u570B": _2, "xn--lgbbat1ad8j": _2, "\u0627\u0644\u062C\u0632\u0627\u0626\u0631": _2, "xn--wgbh1c": _2, "\u0645\u0635\u0631": _2, "xn--e1a4c": _2, "\u0435\u044E": _2, "xn--qxa6a": _2, "\u03B5\u03C5": _2, "xn--mgbah1a3hjkrd": _2, "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627": _2, "xn--node": _2, "\u10D2\u10D4": _2, "xn--qxam": _2, "\u03B5\u03BB": _2, "xn--j6w193g": [1, { "xn--55qx5d": _2, "xn--wcvs22d": _2, "xn--mxtq1m": _2, "xn--gmqw5a": _2, "xn--od0alg": _2, "xn--uc0atv": _2 }], "\u9999\u6E2F": [1, { "\u516C\u53F8": _2, "\u6559\u80B2": _2, "\u653F\u5E9C": _2, "\u500B\u4EBA": _2, "\u7DB2\u7D61": _2, "\u7D44\u7E54": _2 }], "xn--2scrj9c": _2, "\u0CAD\u0CBE\u0CB0\u0CA4": _2, "xn--3hcrj9c": _2, "\u0B2D\u0B3E\u0B30\u0B24": _2, "xn--45br5cyl": _2, "\u09AD\u09BE\u09F0\u09A4": _2, "xn--h2breg3eve": _2, "\u092D\u093E\u0930\u0924\u092E\u094D": _2, "xn--h2brj9c8c": _2, "\u092D\u093E\u0930\u094B\u0924": _2, "xn--mgbgu82a": _2, "\u0680\u0627\u0631\u062A": _2, "xn--rvc1e0am3e": _2, "\u0D2D\u0D3E\u0D30\u0D24\u0D02": _2, "xn--h2brj9c": _2, "\u092D\u093E\u0930\u0924": _2, "xn--mgbbh1a": _2, "\u0628\u0627\u0631\u062A": _2, "xn--mgbbh1a71e": _2, "\u0628\u06BE\u0627\u0631\u062A": _2, "xn--fpcrj9c3d": _2, "\u0C2D\u0C3E\u0C30\u0C24\u0C4D": _2, "xn--gecrj9c": _2, "\u0AAD\u0ABE\u0AB0\u0AA4": _2, "xn--s9brj9c": _2, "\u0A2D\u0A3E\u0A30\u0A24": _2, "xn--45brj9c": _2, "\u09AD\u09BE\u09B0\u09A4": _2, "xn--xkc2dl3a5ee0h": _2, "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE": _2, "xn--mgba3a4f16a": _2, "\u0627\u06CC\u0631\u0627\u0646": _2, "xn--mgba3a4fra": _2, "\u0627\u064A\u0631\u0627\u0646": _2, "xn--mgbtx2b": _2, "\u0639\u0631\u0627\u0642": _2, "xn--mgbayh7gpa": _2, "\u0627\u0644\u0627\u0631\u062F\u0646": _2, "xn--3e0b707e": _2, "\uD55C\uAD6D": _2, "xn--80ao21a": _2, "\u049B\u0430\u0437": _2, "xn--q7ce6a": _2, "\u0EA5\u0EB2\u0EA7": _2, "xn--fzc2c9e2c": _2, "\u0DBD\u0D82\u0D9A\u0DCF": _2, "xn--xkc2al3hye2a": _2, "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8": _2, "xn--mgbc0a9azcg": _2, "\u0627\u0644\u0645\u063A\u0631\u0628": _2, "xn--d1alf": _2, "\u043C\u043A\u0434": _2, "xn--l1acc": _2, "\u043C\u043E\u043D": _2, "xn--mix891f": _2, "\u6FB3\u9580": _2, "xn--mix082f": _2, "\u6FB3\u95E8": _2, "xn--mgbx4cd0ab": _2, "\u0645\u0644\u064A\u0633\u064A\u0627": _2, "xn--mgb9awbf": _2, "\u0639\u0645\u0627\u0646": _2, "xn--mgbai9azgqp6j": _2, "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646": _2, "xn--mgbai9a5eva00b": _2, "\u067E\u0627\u0643\u0633\u062A\u0627\u0646": _2, "xn--ygbi2ammx": _2, "\u0641\u0644\u0633\u0637\u064A\u0646": _2, "xn--90a3ac": [1, { "xn--o1ac": _2, "xn--c1avg": _2, "xn--90azh": _2, "xn--d1at": _2, "xn--o1ach": _2, "xn--80au": _2 }], "\u0441\u0440\u0431": [1, { "\u043F\u0440": _2, "\u043E\u0440\u0433": _2, "\u043E\u0431\u0440": _2, "\u043E\u0434": _2, "\u0443\u043F\u0440": _2, "\u0430\u043A": _2 }], "xn--p1ai": _2, "\u0440\u0444": _2, "xn--wgbl6a": _2, "\u0642\u0637\u0631": _2, "xn--mgberp4a5d4ar": _2, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629": _2, "xn--mgberp4a5d4a87g": _2, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u0629": _2, "xn--mgbqly7c0a67fbc": _2, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u06C3": _2, "xn--mgbqly7cvafr": _2, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0647": _2, "xn--mgbpl2fh": _2, "\u0633\u0648\u062F\u0627\u0646": _2, "xn--yfro4i67o": _2, "\u65B0\u52A0\u5761": _2, "xn--clchc0ea0b2g2a9gcd": _2, "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD": _2, "xn--ogbpf8fl": _2, "\u0633\u0648\u0631\u064A\u0629": _2, "xn--mgbtf8fl": _2, "\u0633\u0648\u0631\u064A\u0627": _2, "xn--o3cw4h": [1, { "xn--12c1fe0br": _2, "xn--12co0c3b4eva": _2, "xn--h3cuzk1di": _2, "xn--o3cyx2a": _2, "xn--m3ch0j3a": _2, "xn--12cfi8ixb8l": _2 }], "\u0E44\u0E17\u0E22": [1, { "\u0E28\u0E36\u0E01\u0E29\u0E32": _2, "\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08": _2, "\u0E23\u0E31\u0E10\u0E1A\u0E32\u0E25": _2, "\u0E17\u0E2B\u0E32\u0E23": _2, "\u0E40\u0E19\u0E47\u0E15": _2, "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E23": _2 }], "xn--pgbs0dh": _2, "\u062A\u0648\u0646\u0633": _2, "xn--kpry57d": _2, "\u53F0\u7063": _2, "xn--kprw13d": _2, "\u53F0\u6E7E": _2, "xn--nnx388a": _2, "\u81FA\u7063": _2, "xn--j1amh": _2, "\u0443\u043A\u0440": _2, "xn--mgb2ddes": _2, "\u0627\u0644\u064A\u0645\u0646": _2, "xxx": _2, "ye": _46, "za": [0, { "ac": _2, "agric": _2, "alt": _2, "co": _6, "edu": _2, "gov": _2, "grondar": _2, "law": _2, "mil": _2, "net": _2, "ngo": _2, "nic": _2, "nis": _2, "nom": _2, "org": _2, "school": _2, "tm": _2, "web": _2 }], "zm": [1, { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "gov": _2, "info": _2, "mil": _2, "net": _2, "org": _2, "sch": _2 }], "zw": [1, { "ac": _2, "co": _2, "gov": _2, "mil": _2, "org": _2 }], "aaa": _2, "aarp": _2, "abb": _2, "abbott": _2, "abbvie": _2, "abc": _2, "able": _2, "abogado": _2, "abudhabi": _2, "academy": [1, { "official": _3 }], "accenture": _2, "accountant": _2, "accountants": _2, "aco": _2, "actor": _2, "ads": _2, "adult": _2, "aeg": _2, "aetna": _2, "afl": _2, "africa": _2, "agakhan": _2, "agency": _2, "aig": _2, "airbus": _2, "airforce": _2, "airtel": _2, "akdn": _2, "alibaba": _2, "alipay": _2, "allfinanz": _2, "allstate": _2, "ally": _2, "alsace": _2, "alstom": _2, "amazon": _2, "americanexpress": _2, "americanfamily": _2, "amex": _2, "amfam": _2, "amica": _2, "amsterdam": _2, "analytics": _2, "android": _2, "anquan": _2, "anz": _2, "aol": _2, "apartments": _2, "app": [1, { "beget": _5, "clerk": _3, "clerkstage": _3, "wnext": _3, "platform0": _3, "deta": _3, "ondigitalocean": _3, "easypanel": _3, "encr": _3, "edgecompute": _3, "fireweb": _3, "onflashdrive": _3, "framer": _3, "run": [2, { "a": _3 }], "web": _3, "hasura": _3, "loginline": _3, "messerli": _3, "netlify": _3, "ngrok": _3, "ngrok-free": _3, "developer": _5, "noop": _3, "northflank": _5, "snowflake": [2, { "privatelink": _3 }], "streamlit": _3, "storipress": _3, "telebit": _3, "typedream": _3, "vercel": _3, "bookonline": _3 }], "apple": _2, "aquarelle": _2, "arab": _2, "aramco": _2, "archi": _2, "army": _2, "art": _2, "arte": _2, "asda": _2, "associates": _2, "athleta": _2, "attorney": _2, "auction": _2, "audi": _2, "audible": _2, "audio": _2, "auspost": _2, "author": _2, "auto": _2, "autos": _2, "avianca": _2, "aws": [1, { "sagemaker": [0, { "af-south-1": _8, "ap-east-1": _8, "ap-northeast-1": _8, "ap-northeast-2": _8, "ap-northeast-3": _8, "ap-south-1": _8, "ap-south-2": _9, "ap-southeast-1": _8, "ap-southeast-2": _8, "ap-southeast-3": _8, "ap-southeast-4": _9, "ca-central-1": _8, "eu-central-1": _8, "eu-central-2": _9, "eu-north-1": _8, "eu-south-1": _8, "eu-south-2": _9, "eu-west-1": _8, "eu-west-2": _8, "eu-west-3": _8, "il-central-1": _8, "me-central-1": _8, "me-south-1": _8, "sa-east-1": _8, "us-east-1": _10, "us-east-2": _10, "us-gov-east-1": _11, "us-gov-west-1": _11, "us-west-1": _8, "us-west-2": _10 }] }], "axa": _2, "azure": _2, "baby": _2, "baidu": _2, "banamex": _2, "bananarepublic": _2, "band": _2, "bank": _2, "bar": _2, "barcelona": _2, "barclaycard": _2, "barclays": _2, "barefoot": _2, "bargains": _2, "baseball": _2, "basketball": [1, { "aus": _3, "nz": _3 }], "bauhaus": _2, "bayern": _2, "bbc": _2, "bbt": _2, "bbva": _2, "bcg": _2, "bcn": _2, "beats": _2, "beauty": _2, "beer": _2, "bentley": _2, "berlin": _2, "best": _2, "bestbuy": _2, "bet": _2, "bharti": _2, "bible": _2, "bid": _2, "bike": _2, "bing": _2, "bingo": _2, "bio": _2, "black": _2, "blackfriday": _2, "blockbuster": _2, "blog": _2, "bloomberg": _2, "blue": _2, "bms": _2, "bmw": _2, "bnpparibas": _2, "boats": _2, "boehringer": _2, "bofa": _2, "bom": _2, "bond": _2, "boo": _2, "book": _2, "booking": _2, "bosch": _2, "bostik": _2, "boston": _2, "bot": _2, "boutique": _2, "box": _2, "bradesco": _2, "bridgestone": _2, "broadway": _2, "broker": _2, "brother": _2, "brussels": _2, "build": _2, "builders": [1, { "cloudsite": _3 }], "business": _14, "buy": _2, "buzz": _2, "bzh": _2, "cab": _2, "cafe": _2, "cal": _2, "call": _2, "calvinklein": _2, "cam": _2, "camera": _2, "camp": _2, "canon": _2, "capetown": _2, "capital": _2, "capitalone": _2, "car": _2, "caravan": _2, "cards": _2, "care": _2, "career": _2, "careers": _2, "cars": _2, "casa": [1, { "nabu": [0, { "ui": _3 }] }], "case": _2, "cash": _2, "casino": _2, "catering": _2, "catholic": _2, "cba": _2, "cbn": _2, "cbre": _2, "center": _2, "ceo": _2, "cern": _2, "cfa": _2, "cfd": _2, "chanel": _2, "channel": _2, "charity": _2, "chase": _2, "chat": _2, "cheap": _2, "chintai": _2, "christmas": _2, "chrome": _2, "church": _2, "cipriani": _2, "circle": _2, "cisco": _2, "citadel": _2, "citi": _2, "citic": _2, "city": _2, "claims": _2, "cleaning": _2, "click": _2, "clinic": _2, "clinique": _2, "clothing": _2, "cloud": [1, { "banzai": _5, "elementor": _3, "encoway": [0, { "eu": _3 }], "statics": _5, "ravendb": _3, "axarnet": [0, { "es-1": _3 }], "diadem": _3, "jelastic": [0, { "vip": _3 }], "jele": _3, "jenv-aruba": [0, { "aruba": [0, { "eur": [0, { "it1": _3 }] }], "it1": _3 }], "keliweb": [2, { "cs": _3 }], "oxa": [2, { "tn": _3, "uk": _3 }], "primetel": [2, { "uk": _3 }], "reclaim": [0, { "ca": _3, "uk": _3, "us": _3 }], "trendhosting": [0, { "ch": _3, "de": _3 }], "jotelulu": _3, "kuleuven": _3, "linkyard": _3, "magentosite": _5, "perspecta": _3, "vapor": _3, "on-rancher": _5, "scw": [0, { "baremetal": [0, { "fr-par-1": _3, "fr-par-2": _3, "nl-ams-1": _3 }], "fr-par": [0, { "fnc": [2, { "functions": _3 }], "k8s": _15, "s3": _3, "s3-website": _3, "whm": _3 }], "instances": [0, { "priv": _3, "pub": _3 }], "k8s": _3, "nl-ams": [0, { "k8s": _15, "s3": _3, "s3-website": _3, "whm": _3 }], "pl-waw": [0, { "k8s": _15, "s3": _3, "s3-website": _3 }], "scalebook": _3, "smartlabeling": _3 }], "sensiosite": _5, "trafficplex": _3, "urown": _3, "voorloper": _3 }], "club": [1, { "cloudns": _3, "jele": _3, "barsy": _3 }], "clubmed": _2, "coach": _2, "codes": [1, { "owo": _5 }], "coffee": _2, "college": _2, "cologne": _2, "comcast": _2, "commbank": _2, "community": [1, { "nog": _3, "ravendb": _3, "myforum": _3 }], "company": _2, "compare": _2, "computer": _2, "comsec": _2, "condos": _2, "construction": _2, "consulting": _2, "contact": _2, "contractors": _2, "cooking": _2, "cool": [1, { "elementor": _3, "de": _3 }], "corsica": _2, "country": _2, "coupon": _2, "coupons": _2, "courses": _2, "cpa": _2, "credit": _2, "creditcard": _2, "creditunion": _2, "cricket": _2, "crown": _2, "crs": _2, "cruise": _2, "cruises": _2, "cuisinella": _2, "cymru": _2, "cyou": _2, "dabur": _2, "dad": _2, "dance": _2, "data": _2, "date": _2, "dating": _2, "datsun": _2, "day": _2, "dclk": _2, "dds": _2, "deal": _2, "dealer": _2, "deals": _2, "degree": _2, "delivery": _2, "dell": _2, "deloitte": _2, "delta": _2, "democrat": _2, "dental": _2, "dentist": _2, "design": [1, { "bss": _3 }], "dev": [1, { "autocode": _3, "lcl": _5, "lclstage": _5, "stg": _5, "stgstage": _5, "pages": _3, "r2": _3, "workers": _3, "curv": _3, "deno": _3, "deno-staging": _3, "deta": _3, "fly": _3, "githubpreview": _3, "gateway": _5, "iserv": _3, "localcert": [0, { "user": _5 }], "loginline": _3, "mediatech": _3, "ngrok": _3, "ngrok-free": _3, "platter-app": _3, "shiftcrypto": _3, "vercel": _3, "webhare": _5 }], "dhl": _2, "diamonds": _2, "diet": _2, "digital": [1, { "cloudapps": [2, { "london": _3 }] }], "direct": _2, "directory": _2, "discount": _2, "discover": _2, "dish": _2, "diy": _2, "dnp": _2, "docs": _2, "doctor": _2, "dog": _2, "domains": _2, "dot": _2, "download": _2, "drive": _2, "dtv": _2, "dubai": _2, "dunlop": _2, "dupont": _2, "durban": _2, "dvag": _2, "dvr": _2, "earth": [1, { "dapps": [0, { "*": _3, "bzz": _5 }] }], "eat": _2, "eco": _2, "edeka": _2, "education": _14, "email": _2, "emerck": _2, "energy": _2, "engineer": _2, "engineering": _2, "enterprises": _2, "epson": _2, "equipment": _2, "ericsson": _2, "erni": _2, "esq": _2, "estate": [1, { "compute": _5 }], "etisalat": _2, "eurovision": _2, "eus": [1, { "party": _42 }], "events": [1, { "koobin": _3, "co": _3 }], "exchange": _2, "expert": _2, "exposed": _2, "express": _2, "extraspace": _2, "fage": _2, "fail": _2, "fairwinds": _2, "faith": _43, "family": _2, "fan": _2, "fans": _2, "farm": [1, { "storj": _3 }], "farmers": _2, "fashion": _2, "fast": _2, "fedex": _2, "feedback": _2, "ferrari": _2, "ferrero": _2, "fidelity": _2, "fido": _2, "film": _2, "final": _2, "finance": _2, "financial": _14, "fire": _2, "firestone": _2, "firmdale": _2, "fish": _2, "fishing": _2, "fit": _2, "fitness": _2, "flickr": _2, "flights": _2, "flir": _2, "florist": _2, "flowers": _2, "fly": _2, "foo": _2, "food": _2, "football": _2, "ford": _2, "forex": _2, "forsale": _2, "forum": _2, "foundation": _2, "fox": _2, "free": _2, "fresenius": _2, "frl": _2, "frogans": _2, "frontier": _2, "ftr": _2, "fujitsu": _2, "fun": _2, "fund": _2, "furniture": _2, "futbol": _2, "fyi": _2, "gal": _2, "gallery": _2, "gallo": _2, "gallup": _2, "game": _2, "games": _2, "gap": _2, "garden": _2, "gay": _2, "gbiz": _2, "gdn": [1, { "cnpy": _3 }], "gea": _2, "gent": _2, "genting": _2, "george": _2, "ggee": _2, "gift": _2, "gifts": _2, "gives": _2, "giving": _2, "glass": _2, "gle": _2, "global": _2, "globo": _2, "gmail": _2, "gmbh": _2, "gmo": _2, "gmx": _2, "godaddy": _2, "gold": _2, "goldpoint": _2, "golf": _2, "goo": _2, "goodyear": _2, "goog": [1, { "cloud": _3, "translate": _3, "usercontent": _5 }], "google": _2, "gop": _2, "got": _2, "grainger": _2, "graphics": _2, "gratis": _2, "green": _2, "gripe": _2, "grocery": _2, "group": [1, { "discourse": _3 }], "guardian": _2, "gucci": _2, "guge": _2, "guide": _2, "guitars": _2, "guru": _2, "hair": _2, "hamburg": _2, "hangout": _2, "haus": _2, "hbo": _2, "hdfc": _2, "hdfcbank": _2, "health": [1, { "hra": _3 }], "healthcare": _2, "help": _2, "helsinki": _2, "here": _2, "hermes": _2, "hiphop": _2, "hisamitsu": _2, "hitachi": _2, "hiv": _2, "hkt": _2, "hockey": _2, "holdings": _2, "holiday": _2, "homedepot": _2, "homegoods": _2, "homes": _2, "homesense": _2, "honda": _2, "horse": _2, "hospital": _2, "host": [1, { "cloudaccess": _3, "freesite": _3, "easypanel": _3, "fastvps": _3, "myfast": _3, "tempurl": _3, "wpmudev": _3, "jele": _3, "mircloud": _3, "pcloud": _3, "half": _3 }], "hosting": [1, { "opencraft": _3 }], "hot": _2, "hotels": _2, "hotmail": _2, "house": _2, "how": _2, "hsbc": _2, "hughes": _2, "hyatt": _2, "hyundai": _2, "ibm": _2, "icbc": _2, "ice": _2, "icu": _2, "ieee": _2, "ifm": _2, "ikano": _2, "imamat": _2, "imdb": _2, "immo": _2, "immobilien": _2, "inc": _2, "industries": _2, "infiniti": _2, "ing": _2, "ink": _2, "institute": _2, "insurance": _2, "insure": _2, "international": _2, "intuit": _2, "investments": _2, "ipiranga": _2, "irish": _2, "ismaili": _2, "ist": _2, "istanbul": _2, "itau": _2, "itv": _2, "jaguar": _2, "java": _2, "jcb": _2, "jeep": _2, "jetzt": _2, "jewelry": _2, "jio": _2, "jll": _2, "jmp": _2, "jnj": _2, "joburg": _2, "jot": _2, "joy": _2, "jpmorgan": _2, "jprs": _2, "juegos": _2, "juniper": _2, "kaufen": _2, "kddi": _2, "kerryhotels": _2, "kerrylogistics": _2, "kerryproperties": _2, "kfh": _2, "kia": _2, "kids": _2, "kim": _2, "kindle": _2, "kitchen": _2, "kiwi": _2, "koeln": _2, "komatsu": _2, "kosher": _2, "kpmg": _2, "kpn": _2, "krd": [1, { "co": _3, "edu": _3 }], "kred": _2, "kuokgroup": _2, "kyoto": _2, "lacaixa": _2, "lamborghini": _2, "lamer": _2, "lancaster": _2, "land": [1, { "static": [2, { "dev": _3, "sites": _3 }] }], "landrover": _2, "lanxess": _2, "lasalle": _2, "lat": _2, "latino": _2, "latrobe": _2, "law": _2, "lawyer": _2, "lds": _2, "lease": _2, "leclerc": _2, "lefrak": _2, "legal": _2, "lego": _2, "lexus": _2, "lgbt": _2, "lidl": _2, "life": _2, "lifeinsurance": _2, "lifestyle": _2, "lighting": _2, "like": _2, "lilly": _2, "limited": _2, "limo": _2, "lincoln": _2, "link": [1, { "cyon": _3, "mypep": _3, "dweb": _5 }], "lipsy": _2, "live": [1, { "hlx": _3 }], "living": _2, "llc": _2, "llp": _2, "loan": _2, "loans": _2, "locker": _2, "locus": _2, "lol": [1, { "omg": _3 }], "london": _2, "lotte": _2, "lotto": _2, "love": _2, "lpl": _2, "lplfinancial": _2, "ltd": _2, "ltda": _2, "lundbeck": _2, "luxe": _2, "luxury": _2, "madrid": _2, "maif": _2, "maison": _2, "makeup": _2, "man": _2, "management": [1, { "router": _3 }], "mango": _2, "map": _2, "market": _2, "marketing": _2, "markets": _2, "marriott": _2, "marshalls": _2, "mattel": _2, "mba": _2, "mckinsey": _2, "med": _2, "media": _50, "meet": _2, "melbourne": _2, "meme": _2, "memorial": _2, "men": _2, "menu": _51, "merckmsd": _2, "miami": _2, "microsoft": _2, "mini": _2, "mint": _2, "mit": _2, "mitsubishi": _2, "mlb": _2, "mls": _2, "mma": _2, "mobile": _2, "moda": _2, "moe": _2, "moi": _2, "mom": _2, "monash": _2, "money": _2, "monster": _2, "mormon": _2, "mortgage": _2, "moscow": _2, "moto": _2, "motorcycles": _2, "mov": _2, "movie": _2, "msd": _2, "mtn": _2, "mtr": _2, "music": _2, "nab": _2, "nagoya": _2, "natura": _2, "navy": _2, "nba": _2, "nec": _2, "netbank": _2, "netflix": _2, "network": [1, { "alces": _5, "co": _3, "arvo": _3, "azimuth": _3, "tlon": _3 }], "neustar": _2, "new": _2, "news": [1, { "noticeable": _3 }], "next": _2, "nextdirect": _2, "nexus": _2, "nfl": _2, "ngo": _2, "nhk": _2, "nico": _2, "nike": _2, "nikon": _2, "ninja": _2, "nissan": _2, "nissay": _2, "nokia": _2, "norton": _2, "now": _2, "nowruz": _2, "nowtv": _2, "nra": _2, "nrw": _2, "ntt": _2, "nyc": _2, "obi": _2, "observer": _2, "office": _2, "okinawa": _2, "olayan": _2, "olayangroup": _2, "oldnavy": _2, "ollo": _2, "omega": _2, "one": [1, { "onred": [2, { "staging": _3 }], "service": _3, "homelink": _3 }], "ong": _2, "onl": _2, "online": [1, { "eero": _3, "eero-stage": _3, "barsy": _3 }], "ooo": _2, "open": _2, "oracle": _2, "orange": [1, { "tech": _3 }], "organic": _2, "origins": _2, "osaka": _2, "otsuka": _2, "ott": _2, "ovh": [1, { "nerdpol": _3 }], "page": [1, { "hlx": _3, "hlx3": _3, "translated": _3, "codeberg": _3, "pdns": _3, "plesk": _3, "prvcy": _3, "rocky": _3, "magnet": _3 }], "panasonic": _2, "paris": _2, "pars": _2, "partners": _2, "parts": _2, "party": _43, "pay": _2, "pccw": _2, "pet": _2, "pfizer": _2, "pharmacy": _2, "phd": _2, "philips": _2, "phone": _2, "photo": _2, "photography": _2, "photos": _50, "physio": _2, "pics": _2, "pictet": _2, "pictures": [1, { "1337": _3 }], "pid": _2, "pin": _2, "ping": _2, "pink": _2, "pioneer": _2, "pizza": [1, { "ngrok": _3 }], "place": _14, "play": _2, "playstation": _2, "plumbing": _2, "plus": _2, "pnc": _2, "pohl": _2, "poker": _2, "politie": _2, "porn": [1, { "indie": _3 }], "pramerica": _2, "praxi": _2, "press": _2, "prime": _2, "prod": _2, "productions": _2, "prof": _2, "progressive": _2, "promo": _2, "properties": _2, "property": _2, "protection": _2, "pru": _2, "prudential": _2, "pub": _51, "pwc": _2, "qpon": _2, "quebec": _2, "quest": _2, "racing": _2, "radio": _2, "read": _2, "realestate": _2, "realtor": _2, "realty": _2, "recipes": _2, "red": _2, "redstone": _2, "redumbrella": _2, "rehab": _2, "reise": _2, "reisen": _2, "reit": _2, "reliance": _2, "ren": _2, "rent": _2, "rentals": _2, "repair": _2, "report": _2, "republican": _2, "rest": _2, "restaurant": _2, "review": _43, "reviews": _2, "rexroth": _2, "rich": _2, "richardli": _2, "ricoh": _2, "ril": _2, "rio": _2, "rip": [1, { "clan": _3 }], "rocks": [1, { "myddns": _3, "lima-city": _3, "webspace": _3 }], "rodeo": _2, "rogers": _2, "room": _2, "rsvp": _2, "rugby": _2, "ruhr": _2, "run": [1, { "hs": _3, "development": _3, "ravendb": _3, "servers": _3, "build": _5, "code": _5, "database": _5, "migration": _5, "onporter": _3, "repl": _3, "wix": _3 }], "rwe": _2, "ryukyu": _2, "saarland": _2, "safe": _2, "safety": _2, "sakura": _2, "sale": _2, "salon": _2, "samsclub": _2, "samsung": _2, "sandvik": _2, "sandvikcoromant": _2, "sanofi": _2, "sap": _2, "sarl": _2, "sas": _2, "save": _2, "saxo": _2, "sbi": _2, "sbs": _2, "sca": _2, "scb": _2, "schaeffler": _2, "schmidt": _2, "scholarships": _2, "school": _2, "schule": _2, "schwarz": _2, "science": _43, "scot": [1, { "edu": _3, "gov": [2, { "service": _3 }] }], "search": _2, "seat": _2, "secure": _2, "security": _2, "seek": _2, "select": _2, "sener": _2, "services": [1, { "loginline": _3 }], "seven": _2, "sew": _2, "sex": _2, "sexy": _2, "sfr": _2, "shangrila": _2, "sharp": _2, "shaw": _2, "shell": _2, "shia": _2, "shiksha": _2, "shoes": _2, "shop": [1, { "base": _3, "hoplix": _3, "barsy": _3 }], "shopping": _2, "shouji": _2, "show": _2, "silk": _2, "sina": _2, "singles": _2, "site": [1, { "cloudera": _5, "cyon": _3, "fnwk": _3, "folionetwork": _3, "fastvps": _3, "jele": _3, "lelux": _3, "loginline": _3, "barsy": _3, "mintere": _3, "omniwe": _3, "opensocial": _3, "platformsh": _5, "tst": _5, "byen": _3, "srht": _3, "novecore": _3 }], "ski": _2, "skin": _2, "sky": _2, "skype": _2, "sling": _2, "smart": _2, "smile": _2, "sncf": _2, "soccer": _2, "social": _2, "softbank": _2, "software": _2, "sohu": _2, "solar": _2, "solutions": [1, { "diher": _5 }], "song": _2, "sony": _2, "soy": _2, "spa": _2, "space": [1, { "myfast": _3, "uber": _3, "xs4all": _3 }], "sport": _2, "spot": _2, "srl": _2, "stada": _2, "staples": _2, "star": _2, "statebank": _2, "statefarm": _2, "stc": _2, "stcgroup": _2, "stockholm": _2, "storage": _2, "store": [1, { "sellfy": _3, "shopware": _3, "storebase": _3 }], "stream": _2, "studio": _2, "study": _2, "style": _2, "sucks": _2, "supplies": _2, "supply": _2, "support": _51, "surf": _2, "surgery": _2, "suzuki": _2, "swatch": _2, "swiss": _2, "sydney": _2, "systems": [1, { "knightpoint": _3 }], "tab": _2, "taipei": _2, "talk": _2, "taobao": _2, "target": _2, "tatamotors": _2, "tatar": _2, "tattoo": _2, "tax": _2, "taxi": _2, "tci": _2, "tdk": _2, "team": [1, { "discourse": _3, "jelastic": _3 }], "tech": _2, "technology": _14, "temasek": _2, "tennis": _2, "teva": _2, "thd": _2, "theater": _2, "theatre": _2, "tiaa": _2, "tickets": _2, "tienda": _2, "tips": _2, "tires": _2, "tirol": _2, "tjmaxx": _2, "tjx": _2, "tkmaxx": _2, "tmall": _2, "today": [1, { "prequalifyme": _3 }], "tokyo": _2, "tools": _2, "top": [1, { "now-dns": _3, "ntdll": _3 }], "toray": _2, "toshiba": _2, "total": _2, "tours": _2, "town": _2, "toyota": _2, "toys": _2, "trade": _43, "trading": _2, "training": _2, "travel": _2, "travelers": _2, "travelersinsurance": _2, "trust": _2, "trv": _2, "tube": _2, "tui": _2, "tunes": _2, "tushu": _2, "tvs": _2, "ubank": _2, "ubs": _2, "unicom": _2, "university": _2, "uno": _2, "uol": _2, "ups": _2, "vacations": _2, "vana": _2, "vanguard": _2, "vegas": _2, "ventures": _2, "verisign": _2, "versicherung": _2, "vet": _2, "viajes": _2, "video": _2, "vig": _2, "viking": _2, "villas": _2, "vin": _2, "vip": _2, "virgin": _2, "visa": _2, "vision": _2, "viva": _2, "vivo": _2, "vlaanderen": _2, "vodka": _2, "volkswagen": _2, "volvo": _2, "vote": _2, "voting": _2, "voto": _2, "voyage": _2, "wales": _2, "walmart": _2, "walter": _2, "wang": _2, "wanggou": _2, "watch": _2, "watches": _2, "weather": _2, "weatherchannel": _2, "webcam": _2, "weber": _2, "website": _50, "wedding": _2, "weibo": _2, "weir": _2, "whoswho": _2, "wien": _2, "wiki": _50, "williamhill": _2, "win": _2, "windows": _2, "wine": _2, "winners": _2, "wme": _2, "wolterskluwer": _2, "woodside": _2, "work": _2, "works": _2, "world": _2, "wow": _2, "wtc": _2, "wtf": _2, "xbox": _2, "xerox": _2, "xfinity": _2, "xihuan": _2, "xin": _2, "xn--11b4c3d": _2, "\u0915\u0949\u092E": _2, "xn--1ck2e1b": _2, "\u30BB\u30FC\u30EB": _2, "xn--1qqw23a": _2, "\u4F5B\u5C71": _2, "xn--30rr7y": _2, "\u6148\u5584": _2, "xn--3bst00m": _2, "\u96C6\u56E2": _2, "xn--3ds443g": _2, "\u5728\u7EBF": _2, "xn--3pxu8k": _2, "\u70B9\u770B": _2, "xn--42c2d9a": _2, "\u0E04\u0E2D\u0E21": _2, "xn--45q11c": _2, "\u516B\u5366": _2, "xn--4gbrim": _2, "\u0645\u0648\u0642\u0639": _2, "xn--55qw42g": _2, "\u516C\u76CA": _2, "xn--55qx5d": _2, "\u516C\u53F8": _2, "xn--5su34j936bgsg": _2, "\u9999\u683C\u91CC\u62C9": _2, "xn--5tzm5g": _2, "\u7F51\u7AD9": _2, "xn--6frz82g": _2, "\u79FB\u52A8": _2, "xn--6qq986b3xl": _2, "\u6211\u7231\u4F60": _2, "xn--80adxhks": _2, "\u043C\u043E\u0441\u043A\u0432\u0430": _2, "xn--80aqecdr1a": _2, "\u043A\u0430\u0442\u043E\u043B\u0438\u043A": _2, "xn--80asehdb": _2, "\u043E\u043D\u043B\u0430\u0439\u043D": _2, "xn--80aswg": _2, "\u0441\u0430\u0439\u0442": _2, "xn--8y0a063a": _2, "\u8054\u901A": _2, "xn--9dbq2a": _2, "\u05E7\u05D5\u05DD": _2, "xn--9et52u": _2, "\u65F6\u5C1A": _2, "xn--9krt00a": _2, "\u5FAE\u535A": _2, "xn--b4w605ferd": _2, "\u6DE1\u9A6C\u9521": _2, "xn--bck1b9a5dre4c": _2, "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3": _2, "xn--c1avg": _2, "\u043E\u0440\u0433": _2, "xn--c2br7g": _2, "\u0928\u0947\u091F": _2, "xn--cck2b3b": _2, "\u30B9\u30C8\u30A2": _2, "xn--cckwcxetd": _2, "\u30A2\u30DE\u30BE\u30F3": _2, "xn--cg4bki": _2, "\uC0BC\uC131": _2, "xn--czr694b": _2, "\u5546\u6807": _2, "xn--czrs0t": _2, "\u5546\u5E97": _2, "xn--czru2d": _2, "\u5546\u57CE": _2, "xn--d1acj3b": _2, "\u0434\u0435\u0442\u0438": _2, "xn--eckvdtc9d": _2, "\u30DD\u30A4\u30F3\u30C8": _2, "xn--efvy88h": _2, "\u65B0\u95FB": _2, "xn--fct429k": _2, "\u5BB6\u96FB": _2, "xn--fhbei": _2, "\u0643\u0648\u0645": _2, "xn--fiq228c5hs": _2, "\u4E2D\u6587\u7F51": _2, "xn--fiq64b": _2, "\u4E2D\u4FE1": _2, "xn--fjq720a": _2, "\u5A31\u4E50": _2, "xn--flw351e": _2, "\u8C37\u6B4C": _2, "xn--fzys8d69uvgm": _2, "\u96FB\u8A0A\u76C8\u79D1": _2, "xn--g2xx48c": _2, "\u8D2D\u7269": _2, "xn--gckr3f0f": _2, "\u30AF\u30E9\u30A6\u30C9": _2, "xn--gk3at1e": _2, "\u901A\u8CA9": _2, "xn--hxt814e": _2, "\u7F51\u5E97": _2, "xn--i1b6b1a6a2e": _2, "\u0938\u0902\u0917\u0920\u0928": _2, "xn--imr513n": _2, "\u9910\u5385": _2, "xn--io0a7i": _2, "\u7F51\u7EDC": _2, "xn--j1aef": _2, "\u043A\u043E\u043C": _2, "xn--jlq480n2rg": _2, "\u4E9A\u9A6C\u900A": _2, "xn--jvr189m": _2, "\u98DF\u54C1": _2, "xn--kcrx77d1x4a": _2, "\u98DE\u5229\u6D66": _2, "xn--kput3i": _2, "\u624B\u673A": _2, "xn--mgba3a3ejt": _2, "\u0627\u0631\u0627\u0645\u0643\u0648": _2, "xn--mgba7c0bbn0a": _2, "\u0627\u0644\u0639\u0644\u064A\u0627\u0646": _2, "xn--mgbaakc7dvf": _2, "\u0627\u062A\u0635\u0627\u0644\u0627\u062A": _2, "xn--mgbab2bd": _2, "\u0628\u0627\u0632\u0627\u0631": _2, "xn--mgbca7dzdo": _2, "\u0627\u0628\u0648\u0638\u0628\u064A": _2, "xn--mgbi4ecexp": _2, "\u0643\u0627\u062B\u0648\u0644\u064A\u0643": _2, "xn--mgbt3dhd": _2, "\u0647\u0645\u0631\u0627\u0647": _2, "xn--mk1bu44c": _2, "\uB2F7\uCEF4": _2, "xn--mxtq1m": _2, "\u653F\u5E9C": _2, "xn--ngbc5azd": _2, "\u0634\u0628\u0643\u0629": _2, "xn--ngbe9e0a": _2, "\u0628\u064A\u062A\u0643": _2, "xn--ngbrx": _2, "\u0639\u0631\u0628": _2, "xn--nqv7f": _2, "\u673A\u6784": _2, "xn--nqv7fs00ema": _2, "\u7EC4\u7EC7\u673A\u6784": _2, "xn--nyqy26a": _2, "\u5065\u5EB7": _2, "xn--otu796d": _2, "\u62DB\u8058": _2, "xn--p1acf": [1, { "xn--90amc": _3, "xn--j1aef": _3, "xn--j1ael8b": _3, "xn--h1ahn": _3, "xn--j1adp": _3, "xn--c1avg": _3, "xn--80aaa0cvac": _3, "xn--h1aliz": _3, "xn--90a1af": _3, "xn--41a": _3 }], "\u0440\u0443\u0441": [1, { "\u0431\u0438\u0437": _3, "\u043A\u043E\u043C": _3, "\u043A\u0440\u044B\u043C": _3, "\u043C\u0438\u0440": _3, "\u043C\u0441\u043A": _3, "\u043E\u0440\u0433": _3, "\u0441\u0430\u043C\u0430\u0440\u0430": _3, "\u0441\u043E\u0447\u0438": _3, "\u0441\u043F\u0431": _3, "\u044F": _3 }], "xn--pssy2u": _2, "\u5927\u62FF": _2, "xn--q9jyb4c": _2, "\u307F\u3093\u306A": _2, "xn--qcka1pmc": _2, "\u30B0\u30FC\u30B0\u30EB": _2, "xn--rhqv96g": _2, "\u4E16\u754C": _2, "xn--rovu88b": _2, "\u66F8\u7C4D": _2, "xn--ses554g": _2, "\u7F51\u5740": _2, "xn--t60b56a": _2, "\uB2F7\uB137": _2, "xn--tckwe": _2, "\u30B3\u30E0": _2, "xn--tiq49xqyj": _2, "\u5929\u4E3B\u6559": _2, "xn--unup4y": _2, "\u6E38\u620F": _2, "xn--vermgensberater-ctb": _2, "verm\xF6gensberater": _2, "xn--vermgensberatung-pwb": _2, "verm\xF6gensberatung": _2, "xn--vhquv": _2, "\u4F01\u4E1A": _2, "xn--vuq861b": _2, "\u4FE1\u606F": _2, "xn--w4r85el8fhu5dnra": _2, "\u5609\u91CC\u5927\u9152\u5E97": _2, "xn--w4rs40l": _2, "\u5609\u91CC": _2, "xn--xhq521b": _2, "\u5E7F\u4E1C": _2, "xn--zfr164b": _2, "\u653F\u52A1": _2, "xyz": [1, { "blogsite": _3, "localzone": _3, "crafting": _3, "zapto": _3, "telebit": _5 }], "yachts": _2, "yahoo": _2, "yamaxun": _2, "yandex": _2, "yodobashi": _2, "yoga": _2, "yokohama": _2, "you": _2, "youtube": _2, "yun": _2, "zappos": _2, "zara": _2, "zero": _2, "zip": _2, "zone": [1, { "cloud66": _3, "hs": _3, "triton": _5, "lima": _3 }], "zuerich": _2 }];
        return rules2;
      }();
      function lookupInTrie(parts, trie, index, allowedMask) {
        let result = null;
        let node = trie;
        while (node !== void 0) {
          if ((node[0] & allowedMask) !== 0) {
            result = {
              index: index + 1,
              isIcann: node[0] === 1,
              isPrivate: node[0] === 2
            };
          }
          if (index === -1) {
            break;
          }
          const succ = node[1];
          node = Object.prototype.hasOwnProperty.call(succ, parts[index]) ? succ[parts[index]] : succ["*"];
          index -= 1;
        }
        return result;
      }
      function suffixLookup(hostname, options, out) {
        var _a;
        if (fastPathLookup(hostname, options, out)) {
          return;
        }
        const hostnameParts = hostname.split(".");
        const allowedMask = (options.allowPrivateDomains ? 2 : 0) | (options.allowIcannDomains ? 1 : 0);
        const exceptionMatch = lookupInTrie(hostnameParts, exceptions2, hostnameParts.length - 1, allowedMask);
        if (exceptionMatch !== null) {
          out.isIcann = exceptionMatch.isIcann;
          out.isPrivate = exceptionMatch.isPrivate;
          out.publicSuffix = hostnameParts.slice(exceptionMatch.index + 1).join(".");
          return;
        }
        const rulesMatch = lookupInTrie(hostnameParts, rules, hostnameParts.length - 1, allowedMask);
        if (rulesMatch !== null) {
          out.isIcann = rulesMatch.isIcann;
          out.isPrivate = rulesMatch.isPrivate;
          out.publicSuffix = hostnameParts.slice(rulesMatch.index).join(".");
          return;
        }
        out.isIcann = false;
        out.isPrivate = false;
        out.publicSuffix = (_a = hostnameParts[hostnameParts.length - 1]) !== null && _a !== void 0 ? _a : null;
      }
      var RESULT = getEmptyResult();
      function parse(url, options = {}) {
        return parseImpl(url, 5, suffixLookup, options, getEmptyResult());
      }
      function getHostname(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 0, suffixLookup, options, RESULT).hostname;
      }
      function getPublicSuffix(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 2, suffixLookup, options, RESULT).publicSuffix;
      }
      function getDomain(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 3, suffixLookup, options, RESULT).domain;
      }
      function getSubdomain(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 4, suffixLookup, options, RESULT).subdomain;
      }
      function getDomainWithoutSuffix(url, options = {}) {
        resetResult(RESULT);
        return parseImpl(url, 5, suffixLookup, options, RESULT).domainWithoutSuffix;
      }
      exports2.getDomain = getDomain;
      exports2.getDomainWithoutSuffix = getDomainWithoutSuffix;
      exports2.getHostname = getHostname;
      exports2.getPublicSuffix = getPublicSuffix;
      exports2.getSubdomain = getSubdomain;
      exports2.parse = parse;
    }
  });

  // shared/js/ui/models/allowlist.js
  var require_allowlist2 = __commonJS({
    "shared/js/ui/models/allowlist.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.Model;
      var tldts = require_cjs();
      function Allowlist(attrs) {
        attrs.list = {};
        Parent2.call(this, attrs);
        this.setAllowlistFromSettings();
      }
      Allowlist.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          modelName: "allowlist",
          removeDomain(itemIndex) {
            const domain = this.list[itemIndex];
            console.log(`allowlist: remove ${domain}`);
            this.sendMessage("setList", {
              list: "allowlisted",
              domain,
              value: false
            });
            this.sendMessage("allowlistOptIn", {
              list: "allowlistOptIn",
              domain,
              value: false
            });
            this.list.splice(itemIndex, 1);
          },
          addDomain: function(url) {
            url = url ? url.replace(/^www\./, "") : "";
            const parsedDomain = tldts.parse(url);
            const localDomain = url.match(/^localhost(:[0-9]+)?$/i) ? "localhost" : null;
            const subDomain = parsedDomain.subdomain;
            const domain = localDomain || (parsedDomain.isIp ? parsedDomain.hostname : parsedDomain.domain);
            if (domain) {
              const domainToAllowlist = subDomain ? subDomain + "." + domain : domain;
              console.log(`allowlist: add ${domainToAllowlist}`);
              this.sendMessage("setList", {
                list: "allowlisted",
                domain: domainToAllowlist,
                value: true
              });
              this.setAllowlistFromSettings();
            }
            return domain;
          },
          setAllowlistFromSettings: function() {
            const self2 = this;
            this.sendMessage("getSetting", { name: "allowlisted" }).then((allowlist) => {
              allowlist = allowlist || {};
              const wlist = Object.keys(allowlist);
              wlist.sort();
              self2.set("list", wlist);
            });
          }
        }
      );
      module2.exports = Allowlist;
    }
  });

  // shared/js/ui/templates/allowlist.js
  var require_allowlist3 = __commonJS({
    "shared/js/ui/templates/allowlist.js"(exports2, module2) {
      "use strict";
      var bel = require_browser();
      var allowlistItems = require_allowlist_items();
      var t2 = window.DDG.base.i18n.t;
      module2.exports = function() {
        return bel`<section class="options-content__allowlist">
    <h2 class="menu-title">${t2("options:unprotectedSites.title")}</h2>
    <p class="menu-paragraph">${t2("options:unprotectedSitesDesc.title")}</p>
    <ul class="default-list js-allowlist-container">
        ${allowlistItems(this.model.list)}
    </ul>
    ${addToAllowlist()}
</section>`;
        function addToAllowlist() {
          return bel`<div>
    <p class="allowlist-show-add js-allowlist-show-add">
        <a href="javascript:void(0)" role="button">${t2("options:addUnprotectedSite.title")}</a>
    </p>
    <input class="is-hidden allowlist-url float-left js-allowlist-url" type="text" placeholder="${t2("options:enterURL.title")}">
    <div class="is-hidden allowlist-add is-disabled float-right js-allowlist-add">${t2("shared:add.title")}</div>

    <div class="is-hidden modal-box js-allowlist-error float-right">
        <div class="modal-box__popout">
            <div class="modal-box__popout__body">
            </div>
        </div>
        <div class="modal-box__body">
            <span class="icon icon__error">
            </span>
            <span class="modal__body__text">
                ${t2("options:invalidURL.title")}
            </span>
        </div>
    </div>
</div>`;
        }
      };
    }
  });

  // shared/js/ui/views/user-data.js
  var require_user_data = __commonJS({
    "shared/js/ui/views/user-data.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.View;
      function UserData(ops) {
        this.model = ops.model;
        this.pageView = ops.pageView;
        this.template = ops.template;
        Parent2.call(this, ops);
        this.setup();
      }
      UserData.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          _logout: function(e) {
            e.preventDefault();
            this.model.logout();
          },
          setup: function() {
            this._cacheElems(".js-userdata", ["logout"]);
            this.bindEvents([
              [this.$logout, "click", this._logout],
              // listen for changes to the userData model
              [this.store.subscribe, "change:userData", this.rerender]
            ]);
          },
          rerender: function() {
            this.unbindEvents();
            this._rerender();
            this.setup();
          }
        }
      );
      module2.exports = UserData;
    }
  });

  // shared/js/ui/models/user-data.js
  var require_user_data2 = __commonJS({
    "shared/js/ui/models/user-data.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.Model;
      function UserData(attrs) {
        Parent2.call(this, attrs);
        this.setUserDataFromSettings();
      }
      UserData.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          modelName: "userData",
          logout() {
            this.sendMessage("logout").then(() => this.set("userName", null));
          },
          setUserDataFromSettings: function() {
            this.sendMessage("getSetting", { name: "userData" }).then((data) => this.set("userName", data?.userName));
          }
        }
      );
      module2.exports = UserData;
    }
  });

  // node_modules/webextension-polyfill/dist/browser-polyfill.js
  var require_browser_polyfill = __commonJS({
    "node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports2, module2) {
      (function(global2, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports2 !== "undefined") {
          factory(module2);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global2.browser = mod.exports;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports2, function(module3) {
        "use strict";
        if (!globalThis.chrome?.runtime?.id) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) {
                  this.set(key, this.createItem(key));
                }
                return super.get(key);
              }
            }
            const isThenable = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method2, wrapper) => {
              return new Proxy(method2, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(
                  req,
                  {},
                  {
                    getContent: {
                      minArgs: 0,
                      maxArgs: 0
                    }
                  }
                );
                listener(wrappedReq);
              };
            });
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result;
                try {
                  result = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result = Promise.reject(err);
                }
                const isResultThenable = result !== true && isThenable(result);
                if (result !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module3.exports = wrapAPIs(chrome);
        } else {
          module3.exports = globalThis.browser;
        }
      });
    }
  });

  // shared/js/background/wrapper.js
  var wrapper_exports = {};
  __export(wrapper_exports, {
    changeTabURL: () => changeTabURL,
    createAlarm: () => createAlarm,
    executeScript: () => executeScript,
    getDDGTabUrls: () => getDDGTabUrls,
    getExtensionId: () => getExtensionId,
    getExtensionURL: () => getExtensionURL,
    getExtensionVersion: () => getExtensionVersion,
    getFromManagedStorage: () => getFromManagedStorage,
    getFromSessionStorage: () => getFromSessionStorage,
    getFromStorage: () => getFromStorage,
    getManifestVersion: () => getManifestVersion,
    insertCSS: () => insertCSS,
    mergeSavedSettings: () => mergeSavedSettings,
    normalizeTabData: () => normalizeTabData,
    notifyPopup: () => notifyPopup,
    openExtensionPage: () => openExtensionPage,
    removeFromSessionStorage: () => removeFromSessionStorage,
    sessionStorageFallback: () => sessionStorageFallback,
    setActionIcon: () => setActionIcon,
    setToSessionStorage: () => setToSessionStorage,
    setUninstallURL: () => setUninstallURL,
    syncToStorage: () => syncToStorage
  });
  function getExtensionURL(path) {
    return import_webextension_polyfill.default.runtime.getURL(path);
  }
  function getExtensionVersion() {
    const manifest = import_webextension_polyfill.default.runtime.getManifest();
    return manifest.version;
  }
  function openExtensionPage(path) {
    import_webextension_polyfill.default.tabs.create({ url: getExtensionURL(path) });
  }
  async function setActionIcon(iconPath, tabId) {
    if (typeof import_webextension_polyfill.default.action === "undefined") {
      return import_webextension_polyfill.default.browserAction.setIcon({ path: iconPath, tabId });
    }
    return import_webextension_polyfill.default.action.setIcon({ path: iconPath, tabId });
  }
  function getManifestVersion() {
    const manifest = import_webextension_polyfill.default.runtime.getManifest();
    return manifest.manifest_version;
  }
  function syncToStorage(data) {
    return import_webextension_polyfill.default.storage.local.set(data);
  }
  async function getFromStorage(key, cb) {
    const result = await import_webextension_polyfill.default.storage.local.get(key);
    return result[key];
  }
  async function getFromManagedStorage(keys2, cb) {
    try {
      return await import_webextension_polyfill.default.storage.managed.get(keys2);
    } catch (e) {
      console.log("get managed failed", e);
    }
    return {};
  }
  function getExtensionId() {
    return import_webextension_polyfill.default.runtime.id;
  }
  async function notifyPopup(message) {
    try {
      await import_webextension_polyfill.default.runtime.sendMessage(message);
    } catch {
    }
  }
  function normalizeTabData(tabData) {
    const tabId = "tabId" in tabData ? tabData.tabId : tabData.id;
    const url = tabData.url;
    const status = "status" in tabData ? tabData.status : null;
    const requestId = "requestId" in tabData ? tabData.requestId : void 0;
    return {
      tabId,
      url,
      requestId,
      status
    };
  }
  function mergeSavedSettings(settings3, results) {
    return Object.assign(settings3, results);
  }
  async function getDDGTabUrls() {
    const tabs = await import_webextension_polyfill.default.tabs.query({ url: "https://*.duckduckgo.com/*" }) || [];
    return tabs.map((tab) => tab.url);
  }
  function setUninstallURL(url) {
    import_webextension_polyfill.default.runtime.setUninstallURL(url);
  }
  function changeTabURL(tabId, url) {
    return import_webextension_polyfill.default.tabs.update(tabId, { url });
  }
  function convertScriptingAPIOptionsForTabsAPI(options) {
    if (typeof options !== "object") {
      throw new Error(
        "Missing/invalid options Object."
      );
    }
    if (typeof options.file !== "undefined" || typeof options.frameId !== "undefined" || typeof options.runAt !== "undefined" || typeof options.allFrames !== "undefined" || typeof options.code !== "undefined") {
      throw new Error(
        "Please provide options compatible with the (MV3) scripting API, instead of the (MV2) tabs API."
      );
    }
    if (typeof options.world !== "undefined") {
      throw new Error(
        "World targetting not supported by MV2."
      );
    }
    const { allFrames, frameIds, tabId } = options.target;
    delete options.target;
    if (Array.isArray(frameIds) && frameIds.length > 0) {
      if (frameIds.length > 1) {
        throw new Error(
          "Targetting multiple frames by ID not supported by MV2."
        );
      }
      options.frameId = frameIds[0];
    }
    if (typeof options.files !== "undefined") {
      if (Array.isArray(options.files) && options.files.length > 0) {
        if (options.files.length > 1) {
          throw new Error(
            "Inserting multiple stylesheets/scripts in one go not supported by MV2."
          );
        }
        options.file = options.files[0];
      }
      delete options.files;
    }
    if (typeof allFrames !== "undefined") {
      options.allFrames = allFrames;
    }
    if (typeof options.injectImmediately !== "undefined") {
      if (options.injectImmediately) {
        options.runAt = "document_start";
      }
      delete options.injectImmediately;
    }
    let stringifiedArgs = "";
    if (typeof options.args !== "undefined") {
      if (Array.isArray(options.args)) {
        stringifiedArgs = "..." + JSON.stringify(options.args);
      }
      delete options.args;
    }
    if (typeof options.func !== "undefined") {
      if (typeof options.func === "function") {
        options.code = "(" + options.func.toString() + ")(" + stringifiedArgs + ")";
      }
      delete options.func;
    }
    return [tabId, options];
  }
  async function executeScript(options) {
    if (typeof import_webextension_polyfill.default.scripting === "undefined") {
      return await import_webextension_polyfill.default.tabs.executeScript(
        ...convertScriptingAPIOptionsForTabsAPI(options)
      );
    }
    return await import_webextension_polyfill.default.scripting.executeScript(options);
  }
  async function insertCSS(options) {
    if (typeof import_webextension_polyfill.default.scripting === "undefined") {
      return await import_webextension_polyfill.default.tabs.insertCSS(
        ...convertScriptingAPIOptionsForTabsAPI(options)
      );
    }
    return await import_webextension_polyfill.default.scripting.insertCSS(options);
  }
  async function setToSessionStorage(key, data) {
    if (typeof key !== "string") {
      throw new Error("Invalid storage key, string expected.");
    }
    if (sessionStorageSupported) {
      return await import_webextension_polyfill.default.storage.session.set({ [key]: data });
    }
    sessionStorageFallback.set(key, data);
  }
  async function getFromSessionStorage(key) {
    if (typeof key !== "string") {
      throw new Error("Invalid storage key, string expected.");
    }
    if (sessionStorageSupported) {
      const result = await import_webextension_polyfill.default.storage.session.get([key]);
      return result[key];
    }
    return sessionStorageFallback.get(key);
  }
  async function removeFromSessionStorage(key) {
    if (typeof key !== "string") {
      throw new Error("Invalid storage key, string expected.");
    }
    if (sessionStorageSupported) {
      return await import_webextension_polyfill.default.storage.session.remove(key);
    }
    return sessionStorageFallback.delete(key);
  }
  async function createAlarm(name, alarmInfo) {
    const existingAlarm = await import_webextension_polyfill.default.alarms.get(name);
    if (!existingAlarm) {
      return await import_webextension_polyfill.default.alarms.create(name, alarmInfo);
    }
  }
  var import_webextension_polyfill, sessionStorageSupported, sessionStorageFallback;
  var init_wrapper = __esm({
    "shared/js/background/wrapper.js"() {
      "use strict";
      import_webextension_polyfill = __toESM(require_browser_polyfill());
      sessionStorageSupported = typeof import_webextension_polyfill.default.storage.session !== "undefined";
      sessionStorageFallback = sessionStorageSupported ? null : /* @__PURE__ */ new Map();
    }
  });

  // shared/js/background/load.js
  var require_load = __commonJS({
    "shared/js/background/load.js"(exports2, module2) {
      "use strict";
      var browserWrapper3 = (init_wrapper(), __toCommonJS(wrapper_exports));
      function JSONfromLocalFile(path) {
        return loadExtensionFile({ url: path, returnType: "json" });
      }
      function JSONfromExternalFile(urlString) {
        return loadExtensionFile({ url: urlString, returnType: "json", source: "external" });
      }
      function url(urlString) {
        return loadExtensionFile({ url: urlString, source: "external" });
      }
      async function loadExtensionFile(params) {
        const headers = new Headers();
        let urlString = params.url;
        if (params.source === "external") {
          if (await browserWrapper3.getFromSessionStorage("dev")) {
            if (urlString.indexOf("?") > -1) {
              urlString += "&";
            } else {
              urlString += "?";
            }
            urlString += "test=1";
          }
          if (params.etag) {
            headers.append("If-None-Match", params.etag);
          }
        } else {
          urlString = browserWrapper3.getExtensionURL(urlString);
        }
        let rej;
        const timeoutPromise = new Promise((resolve, reject) => {
          rej = reject;
        });
        const fetchTimeout = setTimeout(rej, params.timeout || 3e4);
        const fetchResult = fetch(urlString, {
          method: "GET",
          headers
        }).then(async (response) => {
          clearTimeout(fetchTimeout);
          const status = response.status;
          const etag = response.headers.get("etag");
          const date = response.headers.get("Date");
          let data;
          if (status === 200) {
            if (params.returnType === "json") {
              data = await response.json();
            } else if (params.returnType === "arraybuffer") {
              data = await response.arrayBuffer();
            } else {
              data = await response.text();
            }
            return {
              status,
              date,
              etag,
              data
            };
          } else if (status === 304) {
            console.log(`${urlString} returned 304, resource not changed`);
            return {
              status,
              date,
              etag
            };
          } else {
            throw new Error(`${urlString} returned ${response.status}`);
          }
        });
        return Promise.race([timeoutPromise, fetchResult]);
      }
      module2.exports = {
        loadExtensionFile,
        JSONfromLocalFile,
        JSONfromExternalFile,
        url
      };
    }
  });

  // shared/js/background/pixels.js
  function getURL(pixelName) {
    if (!pixelName)
      throw new Error("pixelName is required");
    const url = "https://improving.duckduckgo.com/t/";
    return url + pixelName;
  }
  function sendPixelRequest(pixelName, params = {}) {
    const randomNum = Math.ceil(Math.random() * 1e7);
    const searchParams = new URLSearchParams(Object.entries(params));
    const url = getURL(pixelName) + `?${randomNum}&${searchParams.toString()}`;
    import_load.default.url(url);
  }
  var import_load;
  var init_pixels = __esm({
    "shared/js/background/pixels.js"() {
      "use strict";
      import_load = __toESM(require_load());
    }
  });

  // shared/data/defaultSettings.js
  var require_defaultSettings = __commonJS({
    "shared/data/defaultSettings.js"(exports2, module2) {
      "use strict";
      module2.exports = {
        httpsEverywhereEnabled: true,
        embeddedTweetsEnabled: false,
        GPC: true,
        youtubePreviewsEnabled: false,
        atb: null,
        set_atb: null,
        "config-etag": null,
        "httpsUpgradeBloomFilter-etag": null,
        "httpsDontUpgradeBloomFilters-etag": null,
        "httpsUpgradeList-etag": null,
        "httpsDontUpgradeList-etag": null,
        hasSeenPostInstall: false,
        extiSent: false,
        "tds-etag": null,
        lastTdsUpdate: 0,
        fireButtonClearHistoryEnabled: true,
        fireButtonTabClearEnabled: true
      };
    }
  });

  // shared/js/background/settings.js
  var require_settings = __commonJS({
    "shared/js/background/settings.js"(exports2, module2) {
      "use strict";
      var defaultSettings = require_defaultSettings();
      var browserWrapper3 = (init_wrapper(), __toCommonJS(wrapper_exports));
      var onSettingUpdate = new EventTarget();
      if (typeof CustomEvent === "undefined")
        globalThis.CustomEvent = Event;
      var MANAGED_SETTINGS = ["hasSeenPostInstall"];
      var settings3 = {};
      var isReady = false;
      var _ready = init().then(() => {
        isReady = true;
        console.log("Settings are loaded");
      });
      async function init() {
        buildSettingsFromDefaults();
        await buildSettingsFromManagedStorage();
        await buildSettingsFromLocalStorage();
      }
      function ready() {
        return _ready;
      }
      function checkForLegacyKeys() {
        const legacyKeys = {
          // Keys to migrate
          whitelisted: "allowlisted",
          whitelistOptIn: "allowlistOptIn",
          // Keys to remove
          advanced_options: null,
          clickToLoadClicks: null,
          cookieExcludeList: null,
          dev: null,
          ducky: null,
          extensionIsEnabled: null,
          failedUpgrades: null,
          last_search: null,
          lastsearch_enabled: null,
          meanings: null,
          safesearch: null,
          socialBlockingIsEnabled: null,
          totalUpgrades: null,
          trackerBlockingEnabled: null,
          use_post: null,
          version: null,
          zeroclick_google_right: null,
          "surrogates-etag": null,
          "brokenSiteList-etag": null,
          "surrogateList-etag": null,
          "trackersWhitelist-etag": null,
          "trackersWhitelistTemporary-etag": null
        };
        let syncNeeded = false;
        for (const legacyKey in legacyKeys) {
          const key = legacyKeys[legacyKey];
          if (!(legacyKey in settings3)) {
            continue;
          }
          syncNeeded = true;
          const legacyValue = settings3[legacyKey];
          if (key && legacyValue) {
            settings3[key] = legacyValue;
          }
          delete settings3[legacyKey];
        }
        if (syncNeeded) {
          syncSettingTolocalStorage();
        }
      }
      async function buildSettingsFromLocalStorage() {
        const results = await browserWrapper3.getFromStorage(["settings"]);
        if (!results)
          return;
        settings3 = browserWrapper3.mergeSavedSettings(settings3, results);
        checkForLegacyKeys();
      }
      async function buildSettingsFromManagedStorage() {
        const results = await browserWrapper3.getFromManagedStorage(MANAGED_SETTINGS);
        settings3 = browserWrapper3.mergeSavedSettings(settings3, results);
      }
      function buildSettingsFromDefaults() {
        settings3 = Object.assign({}, defaultSettings);
      }
      function syncSettingTolocalStorage() {
        return browserWrapper3.syncToStorage({ settings: settings3 });
      }
      function getSetting2(name) {
        if (!isReady) {
          console.warn(`Settings: getSetting() Settings not loaded: ${name}`);
          return;
        }
        if (name === "all")
          name = null;
        if (name) {
          return settings3[name];
        } else {
          return settings3;
        }
      }
      function updateSetting2(name, value) {
        if (!isReady) {
          console.warn(`Settings: updateSetting() Setting not loaded: ${name}`);
          return;
        }
        settings3[name] = value;
        syncSettingTolocalStorage().then(() => {
          onSettingUpdate.dispatchEvent(new CustomEvent(name, { detail: value }));
        });
      }
      function removeSetting(name) {
        if (!isReady) {
          console.warn(`Settings: removeSetting() Setting not loaded: ${name}`);
          return;
        }
        if (settings3[name]) {
          delete settings3[name];
          syncSettingTolocalStorage();
        }
      }
      function logSettings() {
        browserWrapper3.getFromStorage(["settings"]).then((s) => {
          console.log(s.settings);
        });
      }
      module2.exports = {
        getSetting: getSetting2,
        updateSetting: updateSetting2,
        removeSetting,
        logSettings,
        ready,
        onSettingUpdate
      };
    }
  });

  // node_modules/dexie/dist/modern/dexie.mjs
  function extend(obj, extension) {
    if (typeof extension !== "object")
      return obj;
    keys(extension).forEach(function(key) {
      obj[key] = extension[key];
    });
    return obj;
  }
  function hasOwn(obj, prop) {
    return _hasOwn.call(obj, prop);
  }
  function props(proto, extension) {
    if (typeof extension === "function")
      extension = extension(getProto(proto));
    (typeof Reflect === "undefined" ? keys : Reflect.ownKeys)(extension).forEach((key) => {
      setProp(proto, key, extension[key]);
    });
  }
  function setProp(obj, prop, functionOrGetSet, options) {
    defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === "function" ? { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } : { value: functionOrGetSet, configurable: true, writable: true }, options));
  }
  function derive(Child) {
    return {
      from: function(Parent2) {
        Child.prototype = Object.create(Parent2.prototype);
        setProp(Child.prototype, "constructor", Child);
        return {
          extend: props.bind(null, Child.prototype)
        };
      }
    };
  }
  function getPropertyDescriptor(obj, prop) {
    const pd = getOwnPropertyDescriptor(obj, prop);
    let proto;
    return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
  }
  function slice(args, start, end) {
    return _slice.call(args, start, end);
  }
  function override(origFunc, overridedFactory) {
    return overridedFactory(origFunc);
  }
  function assert(b) {
    if (!b)
      throw new Error("Assertion Failed");
  }
  function asap$1(fn) {
    if (_global.setImmediate)
      setImmediate(fn);
    else
      setTimeout(fn, 0);
  }
  function arrayToObject(array, extractor) {
    return array.reduce((result, item, i) => {
      var nameAndValue = extractor(item, i);
      if (nameAndValue)
        result[nameAndValue[0]] = nameAndValue[1];
      return result;
    }, {});
  }
  function tryCatch(fn, onerror, args) {
    try {
      fn.apply(null, args);
    } catch (ex) {
      onerror && onerror(ex);
    }
  }
  function getByKeyPath(obj, keyPath) {
    if (hasOwn(obj, keyPath))
      return obj[keyPath];
    if (!keyPath)
      return obj;
    if (typeof keyPath !== "string") {
      var rv = [];
      for (var i = 0, l = keyPath.length; i < l; ++i) {
        var val = getByKeyPath(obj, keyPath[i]);
        rv.push(val);
      }
      return rv;
    }
    var period = keyPath.indexOf(".");
    if (period !== -1) {
      var innerObj = obj[keyPath.substr(0, period)];
      return innerObj === void 0 ? void 0 : getByKeyPath(innerObj, keyPath.substr(period + 1));
    }
    return void 0;
  }
  function setByKeyPath(obj, keyPath, value) {
    if (!obj || keyPath === void 0)
      return;
    if ("isFrozen" in Object && Object.isFrozen(obj))
      return;
    if (typeof keyPath !== "string" && "length" in keyPath) {
      assert(typeof value !== "string" && "length" in value);
      for (var i = 0, l = keyPath.length; i < l; ++i) {
        setByKeyPath(obj, keyPath[i], value[i]);
      }
    } else {
      var period = keyPath.indexOf(".");
      if (period !== -1) {
        var currentKeyPath = keyPath.substr(0, period);
        var remainingKeyPath = keyPath.substr(period + 1);
        if (remainingKeyPath === "")
          if (value === void 0) {
            if (isArray(obj) && !isNaN(parseInt(currentKeyPath)))
              obj.splice(currentKeyPath, 1);
            else
              delete obj[currentKeyPath];
          } else
            obj[currentKeyPath] = value;
        else {
          var innerObj = obj[currentKeyPath];
          if (!innerObj || !hasOwn(obj, currentKeyPath))
            innerObj = obj[currentKeyPath] = {};
          setByKeyPath(innerObj, remainingKeyPath, value);
        }
      } else {
        if (value === void 0) {
          if (isArray(obj) && !isNaN(parseInt(keyPath)))
            obj.splice(keyPath, 1);
          else
            delete obj[keyPath];
        } else
          obj[keyPath] = value;
      }
    }
  }
  function delByKeyPath(obj, keyPath) {
    if (typeof keyPath === "string")
      setByKeyPath(obj, keyPath, void 0);
    else if ("length" in keyPath)
      [].map.call(keyPath, function(kp) {
        setByKeyPath(obj, kp, void 0);
      });
  }
  function shallowClone(obj) {
    var rv = {};
    for (var m in obj) {
      if (hasOwn(obj, m))
        rv[m] = obj[m];
    }
    return rv;
  }
  function flatten(a) {
    return concat.apply([], a);
  }
  function deepClone(any) {
    circularRefs = typeof WeakMap !== "undefined" && /* @__PURE__ */ new WeakMap();
    const rv = innerDeepClone(any);
    circularRefs = null;
    return rv;
  }
  function innerDeepClone(any) {
    if (!any || typeof any !== "object")
      return any;
    let rv = circularRefs && circularRefs.get(any);
    if (rv)
      return rv;
    if (isArray(any)) {
      rv = [];
      circularRefs && circularRefs.set(any, rv);
      for (var i = 0, l = any.length; i < l; ++i) {
        rv.push(innerDeepClone(any[i]));
      }
    } else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
      rv = any;
    } else {
      const proto = getProto(any);
      rv = proto === Object.prototype ? {} : Object.create(proto);
      circularRefs && circularRefs.set(any, rv);
      for (var prop in any) {
        if (hasOwn(any, prop)) {
          rv[prop] = innerDeepClone(any[prop]);
        }
      }
    }
    return rv;
  }
  function toStringTag(o) {
    return toString.call(o).slice(8, -1);
  }
  function getArrayOf(arrayLike) {
    var i, a, x, it;
    if (arguments.length === 1) {
      if (isArray(arrayLike))
        return arrayLike.slice();
      if (this === NO_CHAR_ARRAY && typeof arrayLike === "string")
        return [arrayLike];
      if (it = getIteratorOf(arrayLike)) {
        a = [];
        while (x = it.next(), !x.done)
          a.push(x.value);
        return a;
      }
      if (arrayLike == null)
        return [arrayLike];
      i = arrayLike.length;
      if (typeof i === "number") {
        a = new Array(i);
        while (i--)
          a[i] = arrayLike[i];
        return a;
      }
      return [arrayLike];
    }
    i = arguments.length;
    a = new Array(i);
    while (i--)
      a[i] = arguments[i];
    return a;
  }
  function setDebug(value, filter) {
    debug = value;
    libraryFilter = filter;
  }
  function getErrorWithStack() {
    if (NEEDS_THROW_FOR_STACK)
      try {
        getErrorWithStack.arguments;
        throw new Error();
      } catch (e) {
        return e;
      }
    return new Error();
  }
  function prettyStack(exception, numIgnoredFrames) {
    var stack = exception.stack;
    if (!stack)
      return "";
    numIgnoredFrames = numIgnoredFrames || 0;
    if (stack.indexOf(exception.name) === 0)
      numIgnoredFrames += (exception.name + exception.message).split("\n").length;
    return stack.split("\n").slice(numIgnoredFrames).filter(libraryFilter).map((frame) => "\n" + frame).join("");
  }
  function DexieError(name, msg) {
    this._e = getErrorWithStack();
    this.name = name;
    this.message = msg;
  }
  function getMultiErrorMessage(msg, failures) {
    return msg + ". Errors: " + Object.keys(failures).map((key) => failures[key].toString()).filter((v, i, s) => s.indexOf(v) === i).join("\n");
  }
  function ModifyError(msg, failures, successCount, failedKeys) {
    this._e = getErrorWithStack();
    this.failures = failures;
    this.failedKeys = failedKeys;
    this.successCount = successCount;
    this.message = getMultiErrorMessage(msg, failures);
  }
  function BulkError(msg, failures) {
    this._e = getErrorWithStack();
    this.name = "BulkError";
    this.failures = Object.keys(failures).map((pos) => failures[pos]);
    this.failuresByPos = failures;
    this.message = getMultiErrorMessage(msg, failures);
  }
  function mapError(domError, message) {
    if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
      return domError;
    var rv = new exceptionMap[domError.name](message || domError.message, domError);
    if ("stack" in domError) {
      setProp(rv, "stack", { get: function() {
        return this.inner.stack;
      } });
    }
    return rv;
  }
  function nop() {
  }
  function mirror(val) {
    return val;
  }
  function pureFunctionChain(f1, f2) {
    if (f1 == null || f1 === mirror)
      return f2;
    return function(val) {
      return f2(f1(val));
    };
  }
  function callBoth(on1, on2) {
    return function() {
      on1.apply(this, arguments);
      on2.apply(this, arguments);
    };
  }
  function hookCreatingChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function() {
      var res = f1.apply(this, arguments);
      if (res !== void 0)
        arguments[0] = res;
      var onsuccess = this.onsuccess, onerror = this.onerror;
      this.onsuccess = null;
      this.onerror = null;
      var res2 = f2.apply(this, arguments);
      if (onsuccess)
        this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
      if (onerror)
        this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
      return res2 !== void 0 ? res2 : res;
    };
  }
  function hookDeletingChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function() {
      f1.apply(this, arguments);
      var onsuccess = this.onsuccess, onerror = this.onerror;
      this.onsuccess = this.onerror = null;
      f2.apply(this, arguments);
      if (onsuccess)
        this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
      if (onerror)
        this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    };
  }
  function hookUpdatingChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function(modifications) {
      var res = f1.apply(this, arguments);
      extend(modifications, res);
      var onsuccess = this.onsuccess, onerror = this.onerror;
      this.onsuccess = null;
      this.onerror = null;
      var res2 = f2.apply(this, arguments);
      if (onsuccess)
        this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
      if (onerror)
        this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
      return res === void 0 ? res2 === void 0 ? void 0 : res2 : extend(res, res2);
    };
  }
  function reverseStoppableEventChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function() {
      if (f2.apply(this, arguments) === false)
        return false;
      return f1.apply(this, arguments);
    };
  }
  function promisableChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function() {
      var res = f1.apply(this, arguments);
      if (res && typeof res.then === "function") {
        var thiz = this, i = arguments.length, args = new Array(i);
        while (i--)
          args[i] = arguments[i];
        return res.then(function() {
          return f2.apply(thiz, args);
        });
      }
      return f2.apply(this, arguments);
    };
  }
  function DexiePromise(fn) {
    if (typeof this !== "object")
      throw new TypeError("Promises must be constructed via new");
    this._listeners = [];
    this.onuncatched = nop;
    this._lib = false;
    var psd = this._PSD = PSD;
    if (debug) {
      this._stackHolder = getErrorWithStack();
      this._prev = null;
      this._numPrev = 0;
    }
    if (typeof fn !== "function") {
      if (fn !== INTERNAL)
        throw new TypeError("Not a function");
      this._state = arguments[1];
      this._value = arguments[2];
      if (this._state === false)
        handleRejection(this, this._value);
      return;
    }
    this._state = null;
    this._value = null;
    ++psd.ref;
    executePromiseTask(this, fn);
  }
  function Listener(onFulfilled, onRejected, resolve, reject, zone) {
    this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
    this.onRejected = typeof onRejected === "function" ? onRejected : null;
    this.resolve = resolve;
    this.reject = reject;
    this.psd = zone;
  }
  function executePromiseTask(promise, fn) {
    try {
      fn((value) => {
        if (promise._state !== null)
          return;
        if (value === promise)
          throw new TypeError("A promise cannot be resolved with itself.");
        var shouldExecuteTick = promise._lib && beginMicroTickScope();
        if (value && typeof value.then === "function") {
          executePromiseTask(promise, (resolve, reject) => {
            value instanceof DexiePromise ? value._then(resolve, reject) : value.then(resolve, reject);
          });
        } else {
          promise._state = true;
          promise._value = value;
          propagateAllListeners(promise);
        }
        if (shouldExecuteTick)
          endMicroTickScope();
      }, handleRejection.bind(null, promise));
    } catch (ex) {
      handleRejection(promise, ex);
    }
  }
  function handleRejection(promise, reason) {
    rejectingErrors.push(reason);
    if (promise._state !== null)
      return;
    var shouldExecuteTick = promise._lib && beginMicroTickScope();
    reason = rejectionMapper(reason);
    promise._state = false;
    promise._value = reason;
    debug && reason !== null && typeof reason === "object" && !reason._promise && tryCatch(() => {
      var origProp = getPropertyDescriptor(reason, "stack");
      reason._promise = promise;
      setProp(reason, "stack", {
        get: () => stack_being_generated ? origProp && (origProp.get ? origProp.get.apply(reason) : origProp.value) : promise.stack
      });
    });
    addPossiblyUnhandledError(promise);
    propagateAllListeners(promise);
    if (shouldExecuteTick)
      endMicroTickScope();
  }
  function propagateAllListeners(promise) {
    var listeners = promise._listeners;
    promise._listeners = [];
    for (var i = 0, len = listeners.length; i < len; ++i) {
      propagateToListener(promise, listeners[i]);
    }
    var psd = promise._PSD;
    --psd.ref || psd.finalize();
    if (numScheduledCalls === 0) {
      ++numScheduledCalls;
      asap(() => {
        if (--numScheduledCalls === 0)
          finalizePhysicalTick();
      }, []);
    }
  }
  function propagateToListener(promise, listener) {
    if (promise._state === null) {
      promise._listeners.push(listener);
      return;
    }
    var cb = promise._state ? listener.onFulfilled : listener.onRejected;
    if (cb === null) {
      return (promise._state ? listener.resolve : listener.reject)(promise._value);
    }
    ++listener.psd.ref;
    ++numScheduledCalls;
    asap(callListener, [cb, promise, listener]);
  }
  function callListener(cb, promise, listener) {
    try {
      currentFulfiller = promise;
      var ret, value = promise._value;
      if (promise._state) {
        ret = cb(value);
      } else {
        if (rejectingErrors.length)
          rejectingErrors = [];
        ret = cb(value);
        if (rejectingErrors.indexOf(value) === -1)
          markErrorAsHandled(promise);
      }
      listener.resolve(ret);
    } catch (e) {
      listener.reject(e);
    } finally {
      currentFulfiller = null;
      if (--numScheduledCalls === 0)
        finalizePhysicalTick();
      --listener.psd.ref || listener.psd.finalize();
    }
  }
  function getStack(promise, stacks, limit) {
    if (stacks.length === limit)
      return stacks;
    var stack = "";
    if (promise._state === false) {
      var failure = promise._value, errorName, message;
      if (failure != null) {
        errorName = failure.name || "Error";
        message = failure.message || failure;
        stack = prettyStack(failure, 0);
      } else {
        errorName = failure;
        message = "";
      }
      stacks.push(errorName + (message ? ": " + message : "") + stack);
    }
    if (debug) {
      stack = prettyStack(promise._stackHolder, 2);
      if (stack && stacks.indexOf(stack) === -1)
        stacks.push(stack);
      if (promise._prev)
        getStack(promise._prev, stacks, limit);
    }
    return stacks;
  }
  function linkToPreviousPromise(promise, prev) {
    var numPrev = prev ? prev._numPrev + 1 : 0;
    if (numPrev < LONG_STACKS_CLIP_LIMIT) {
      promise._prev = prev;
      promise._numPrev = numPrev;
    }
  }
  function physicalTick() {
    beginMicroTickScope() && endMicroTickScope();
  }
  function beginMicroTickScope() {
    var wasRootExec = isOutsideMicroTick;
    isOutsideMicroTick = false;
    needsNewPhysicalTick = false;
    return wasRootExec;
  }
  function endMicroTickScope() {
    var callbacks, i, l;
    do {
      while (microtickQueue.length > 0) {
        callbacks = microtickQueue;
        microtickQueue = [];
        l = callbacks.length;
        for (i = 0; i < l; ++i) {
          var item = callbacks[i];
          item[0].apply(null, item[1]);
        }
      }
    } while (microtickQueue.length > 0);
    isOutsideMicroTick = true;
    needsNewPhysicalTick = true;
  }
  function finalizePhysicalTick() {
    var unhandledErrs = unhandledErrors;
    unhandledErrors = [];
    unhandledErrs.forEach((p) => {
      p._PSD.onunhandled.call(null, p._value, p);
    });
    var finalizers = tickFinalizers.slice(0);
    var i = finalizers.length;
    while (i)
      finalizers[--i]();
  }
  function run_at_end_of_this_or_next_physical_tick(fn) {
    function finalizer() {
      fn();
      tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
    }
    tickFinalizers.push(finalizer);
    ++numScheduledCalls;
    asap(() => {
      if (--numScheduledCalls === 0)
        finalizePhysicalTick();
    }, []);
  }
  function addPossiblyUnhandledError(promise) {
    if (!unhandledErrors.some((p) => p._value === promise._value))
      unhandledErrors.push(promise);
  }
  function markErrorAsHandled(promise) {
    var i = unhandledErrors.length;
    while (i)
      if (unhandledErrors[--i]._value === promise._value) {
        unhandledErrors.splice(i, 1);
        return;
      }
  }
  function PromiseReject(reason) {
    return new DexiePromise(INTERNAL, false, reason);
  }
  function wrap(fn, errorCatcher) {
    var psd = PSD;
    return function() {
      var wasRootExec = beginMicroTickScope(), outerScope = PSD;
      try {
        switchToZone(psd, true);
        return fn.apply(this, arguments);
      } catch (e) {
        errorCatcher && errorCatcher(e);
      } finally {
        switchToZone(outerScope, false);
        if (wasRootExec)
          endMicroTickScope();
      }
    };
  }
  function newScope(fn, props2, a1, a2) {
    var parent = PSD, psd = Object.create(parent);
    psd.parent = parent;
    psd.ref = 0;
    psd.global = false;
    psd.id = ++zone_id_counter;
    var globalEnv = globalPSD.env;
    psd.env = patchGlobalPromise ? {
      Promise: DexiePromise,
      PromiseProp: { value: DexiePromise, configurable: true, writable: true },
      all: DexiePromise.all,
      race: DexiePromise.race,
      allSettled: DexiePromise.allSettled,
      any: DexiePromise.any,
      resolve: DexiePromise.resolve,
      reject: DexiePromise.reject,
      nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
      gthen: getPatchedPromiseThen(globalEnv.gthen, psd)
    } : {};
    if (props2)
      extend(psd, props2);
    ++parent.ref;
    psd.finalize = function() {
      --this.parent.ref || this.parent.finalize();
    };
    var rv = usePSD(psd, fn, a1, a2);
    if (psd.ref === 0)
      psd.finalize();
    return rv;
  }
  function incrementExpectedAwaits() {
    if (!task.id)
      task.id = ++taskCounter;
    ++task.awaits;
    task.echoes += ZONE_ECHO_LIMIT;
    return task.id;
  }
  function decrementExpectedAwaits() {
    if (!task.awaits)
      return false;
    if (--task.awaits === 0)
      task.id = 0;
    task.echoes = task.awaits * ZONE_ECHO_LIMIT;
    return true;
  }
  function onPossibleParallellAsync(possiblePromise) {
    if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
      incrementExpectedAwaits();
      return possiblePromise.then((x) => {
        decrementExpectedAwaits();
        return x;
      }, (e) => {
        decrementExpectedAwaits();
        return rejection(e);
      });
    }
    return possiblePromise;
  }
  function zoneEnterEcho(targetZone) {
    ++totalEchoes;
    if (!task.echoes || --task.echoes === 0) {
      task.echoes = task.id = 0;
    }
    zoneStack.push(PSD);
    switchToZone(targetZone, true);
  }
  function zoneLeaveEcho() {
    var zone = zoneStack[zoneStack.length - 1];
    zoneStack.pop();
    switchToZone(zone, false);
  }
  function switchToZone(targetZone, bEnteringZone) {
    var currentZone = PSD;
    if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
      enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
    }
    if (targetZone === PSD)
      return;
    PSD = targetZone;
    if (currentZone === globalPSD)
      globalPSD.env = snapShot();
    if (patchGlobalPromise) {
      var GlobalPromise = globalPSD.env.Promise;
      var targetEnv = targetZone.env;
      nativePromiseProto.then = targetEnv.nthen;
      GlobalPromise.prototype.then = targetEnv.gthen;
      if (currentZone.global || targetZone.global) {
        Object.defineProperty(_global, "Promise", targetEnv.PromiseProp);
        GlobalPromise.all = targetEnv.all;
        GlobalPromise.race = targetEnv.race;
        GlobalPromise.resolve = targetEnv.resolve;
        GlobalPromise.reject = targetEnv.reject;
        if (targetEnv.allSettled)
          GlobalPromise.allSettled = targetEnv.allSettled;
        if (targetEnv.any)
          GlobalPromise.any = targetEnv.any;
      }
    }
  }
  function snapShot() {
    var GlobalPromise = _global.Promise;
    return patchGlobalPromise ? {
      Promise: GlobalPromise,
      PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
      all: GlobalPromise.all,
      race: GlobalPromise.race,
      allSettled: GlobalPromise.allSettled,
      any: GlobalPromise.any,
      resolve: GlobalPromise.resolve,
      reject: GlobalPromise.reject,
      nthen: nativePromiseProto.then,
      gthen: GlobalPromise.prototype.then
    } : {};
  }
  function usePSD(psd, fn, a1, a2, a3) {
    var outerScope = PSD;
    try {
      switchToZone(psd, true);
      return fn(a1, a2, a3);
    } finally {
      switchToZone(outerScope, false);
    }
  }
  function enqueueNativeMicroTask(job) {
    nativePromiseThen.call(resolvedNativePromise, job);
  }
  function nativeAwaitCompatibleWrap(fn, zone, possibleAwait, cleanup) {
    return typeof fn !== "function" ? fn : function() {
      var outerZone = PSD;
      if (possibleAwait)
        incrementExpectedAwaits();
      switchToZone(zone, true);
      try {
        return fn.apply(this, arguments);
      } finally {
        switchToZone(outerZone, false);
        if (cleanup)
          enqueueNativeMicroTask(decrementExpectedAwaits);
      }
    };
  }
  function getPatchedPromiseThen(origThen, zone) {
    return function(onResolved, onRejected) {
      return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone), nativeAwaitCompatibleWrap(onRejected, zone));
    };
  }
  function globalError(err, promise) {
    var rv;
    try {
      rv = promise.onuncatched(err);
    } catch (e) {
    }
    if (rv !== false)
      try {
        var event, eventData = { promise, reason: err };
        if (_global.document && document.createEvent) {
          event = document.createEvent("Event");
          event.initEvent(UNHANDLEDREJECTION, true, true);
          extend(event, eventData);
        } else if (_global.CustomEvent) {
          event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
          extend(event, eventData);
        }
        if (event && _global.dispatchEvent) {
          dispatchEvent(event);
          if (!_global.PromiseRejectionEvent && _global.onunhandledrejection)
            try {
              _global.onunhandledrejection(event);
            } catch (_) {
            }
        }
        if (debug && event && !event.defaultPrevented) {
          console.warn(`Unhandled rejection: ${err.stack || err}`);
        }
      } catch (e) {
      }
  }
  function tempTransaction(db, mode, storeNames, fn) {
    if (!db.idbdb || !db._state.openComplete && (!PSD.letThrough && !db._vip)) {
      if (db._state.openComplete) {
        return rejection(new exceptions.DatabaseClosed(db._state.dbOpenError));
      }
      if (!db._state.isBeingOpened) {
        if (!db._options.autoOpen)
          return rejection(new exceptions.DatabaseClosed());
        db.open().catch(nop);
      }
      return db._state.dbReadyPromise.then(() => tempTransaction(db, mode, storeNames, fn));
    } else {
      var trans = db._createTransaction(mode, storeNames, db._dbSchema);
      try {
        trans.create();
        db._state.PR1398_maxLoop = 3;
      } catch (ex) {
        if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
          console.warn("Dexie: Need to reopen db");
          db._close();
          return db.open().then(() => tempTransaction(db, mode, storeNames, fn));
        }
        return rejection(ex);
      }
      return trans._promise(mode, (resolve, reject) => {
        return newScope(() => {
          PSD.trans = trans;
          return fn(resolve, reject, trans);
        });
      }).then((result) => {
        return trans._completion.then(() => result);
      });
    }
  }
  function combine(filter1, filter2) {
    return filter1 ? filter2 ? function() {
      return filter1.apply(this, arguments) && filter2.apply(this, arguments);
    } : filter1 : filter2;
  }
  function workaroundForUndefinedPrimKey(keyPath) {
    return typeof keyPath === "string" && !/\./.test(keyPath) ? (obj) => {
      if (obj[keyPath] === void 0 && keyPath in obj) {
        obj = deepClone(obj);
        delete obj[keyPath];
      }
      return obj;
    } : (obj) => obj;
  }
  function Events(ctx) {
    var evs = {};
    var rv = function(eventName, subscriber) {
      if (subscriber) {
        var i2 = arguments.length, args = new Array(i2 - 1);
        while (--i2)
          args[i2 - 1] = arguments[i2];
        evs[eventName].subscribe.apply(null, args);
        return ctx;
      } else if (typeof eventName === "string") {
        return evs[eventName];
      }
    };
    rv.addEventType = add;
    for (var i = 1, l = arguments.length; i < l; ++i) {
      add(arguments[i]);
    }
    return rv;
    function add(eventName, chainFunction, defaultFunction) {
      if (typeof eventName === "object")
        return addConfiguredEvents(eventName);
      if (!chainFunction)
        chainFunction = reverseStoppableEventChain;
      if (!defaultFunction)
        defaultFunction = nop;
      var context = {
        subscribers: [],
        fire: defaultFunction,
        subscribe: function(cb) {
          if (context.subscribers.indexOf(cb) === -1) {
            context.subscribers.push(cb);
            context.fire = chainFunction(context.fire, cb);
          }
        },
        unsubscribe: function(cb) {
          context.subscribers = context.subscribers.filter(function(fn) {
            return fn !== cb;
          });
          context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
        }
      };
      evs[eventName] = rv[eventName] = context;
      return context;
    }
    function addConfiguredEvents(cfg) {
      keys(cfg).forEach(function(eventName) {
        var args = cfg[eventName];
        if (isArray(args)) {
          add(eventName, cfg[eventName][0], cfg[eventName][1]);
        } else if (args === "asap") {
          var context = add(eventName, mirror, function fire() {
            var i2 = arguments.length, args2 = new Array(i2);
            while (i2--)
              args2[i2] = arguments[i2];
            context.subscribers.forEach(function(fn) {
              asap$1(function fireEvent() {
                fn.apply(null, args2);
              });
            });
          });
        } else
          throw new exceptions.InvalidArgument("Invalid event config");
      });
    }
  }
  function makeClassConstructor(prototype, constructor) {
    derive(constructor).from({ prototype });
    return constructor;
  }
  function createTableConstructor(db) {
    return makeClassConstructor(Table.prototype, function Table2(name, tableSchema, trans) {
      this.db = db;
      this._tx = trans;
      this.name = name;
      this.schema = tableSchema;
      this.hook = db._allTables[name] ? db._allTables[name].hook : Events(null, {
        "creating": [hookCreatingChain, nop],
        "reading": [pureFunctionChain, mirror],
        "updating": [hookUpdatingChain, nop],
        "deleting": [hookDeletingChain, nop]
      });
    });
  }
  function isPlainKeyRange(ctx, ignoreLimitFilter) {
    return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
  }
  function addFilter(ctx, fn) {
    ctx.filter = combine(ctx.filter, fn);
  }
  function addReplayFilter(ctx, factory, isLimitFilter) {
    var curr = ctx.replayFilter;
    ctx.replayFilter = curr ? () => combine(curr(), factory()) : factory;
    ctx.justLimit = isLimitFilter && !curr;
  }
  function addMatchFilter(ctx, fn) {
    ctx.isMatch = combine(ctx.isMatch, fn);
  }
  function getIndexOrStore(ctx, coreSchema) {
    if (ctx.isPrimKey)
      return coreSchema.primaryKey;
    const index = coreSchema.getIndexByKeyPath(ctx.index);
    if (!index)
      throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + coreSchema.name + " is not indexed");
    return index;
  }
  function openCursor(ctx, coreTable, trans) {
    const index = getIndexOrStore(ctx, coreTable.schema);
    return coreTable.openCursor({
      trans,
      values: !ctx.keysOnly,
      reverse: ctx.dir === "prev",
      unique: !!ctx.unique,
      query: {
        index,
        range: ctx.range
      }
    });
  }
  function iter(ctx, fn, coreTrans, coreTable) {
    const filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
    if (!ctx.or) {
      return iterate(openCursor(ctx, coreTable, coreTrans), combine(ctx.algorithm, filter), fn, !ctx.keysOnly && ctx.valueMapper);
    } else {
      const set = {};
      const union = (item, cursor, advance) => {
        if (!filter || filter(cursor, advance, (result) => cursor.stop(result), (err) => cursor.fail(err))) {
          var primaryKey = cursor.primaryKey;
          var key = "" + primaryKey;
          if (key === "[object ArrayBuffer]")
            key = "" + new Uint8Array(primaryKey);
          if (!hasOwn(set, key)) {
            set[key] = true;
            fn(item, cursor, advance);
          }
        }
      };
      return Promise.all([
        ctx.or._iterate(union, coreTrans),
        iterate(openCursor(ctx, coreTable, coreTrans), ctx.algorithm, union, !ctx.keysOnly && ctx.valueMapper)
      ]);
    }
  }
  function iterate(cursorPromise, filter, fn, valueMapper) {
    var mappedFn = valueMapper ? (x, c, a) => fn(valueMapper(x), c, a) : fn;
    var wrappedFn = wrap(mappedFn);
    return cursorPromise.then((cursor) => {
      if (cursor) {
        return cursor.start(() => {
          var c = () => cursor.continue();
          if (!filter || filter(cursor, (advancer) => c = advancer, (val) => {
            cursor.stop(val);
            c = nop;
          }, (e) => {
            cursor.fail(e);
            c = nop;
          }))
            wrappedFn(cursor.value, cursor, (advancer) => c = advancer);
          c();
        });
      }
    });
  }
  function cmp(a, b) {
    try {
      const ta = type(a);
      const tb = type(b);
      if (ta !== tb) {
        if (ta === "Array")
          return 1;
        if (tb === "Array")
          return -1;
        if (ta === "binary")
          return 1;
        if (tb === "binary")
          return -1;
        if (ta === "string")
          return 1;
        if (tb === "string")
          return -1;
        if (ta === "Date")
          return 1;
        if (tb !== "Date")
          return NaN;
        return -1;
      }
      switch (ta) {
        case "number":
        case "Date":
        case "string":
          return a > b ? 1 : a < b ? -1 : 0;
        case "binary": {
          return compareUint8Arrays(getUint8Array(a), getUint8Array(b));
        }
        case "Array":
          return compareArrays(a, b);
      }
    } catch (_a) {
    }
    return NaN;
  }
  function compareArrays(a, b) {
    const al = a.length;
    const bl = b.length;
    const l = al < bl ? al : bl;
    for (let i = 0; i < l; ++i) {
      const res = cmp(a[i], b[i]);
      if (res !== 0)
        return res;
    }
    return al === bl ? 0 : al < bl ? -1 : 1;
  }
  function compareUint8Arrays(a, b) {
    const al = a.length;
    const bl = b.length;
    const l = al < bl ? al : bl;
    for (let i = 0; i < l; ++i) {
      if (a[i] !== b[i])
        return a[i] < b[i] ? -1 : 1;
    }
    return al === bl ? 0 : al < bl ? -1 : 1;
  }
  function type(x) {
    const t2 = typeof x;
    if (t2 !== "object")
      return t2;
    if (ArrayBuffer.isView(x))
      return "binary";
    const tsTag = toStringTag(x);
    return tsTag === "ArrayBuffer" ? "binary" : tsTag;
  }
  function getUint8Array(a) {
    if (a instanceof Uint8Array)
      return a;
    if (ArrayBuffer.isView(a))
      return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    return new Uint8Array(a);
  }
  function createCollectionConstructor(db) {
    return makeClassConstructor(Collection.prototype, function Collection2(whereClause, keyRangeGenerator) {
      this.db = db;
      let keyRange = AnyRange, error = null;
      if (keyRangeGenerator)
        try {
          keyRange = keyRangeGenerator();
        } catch (ex) {
          error = ex;
        }
      const whereCtx = whereClause._ctx;
      const table = whereCtx.table;
      const readingHook = table.hook.reading.fire;
      this._ctx = {
        table,
        index: whereCtx.index,
        isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
        range: keyRange,
        keysOnly: false,
        dir: "next",
        unique: "",
        algorithm: null,
        filter: null,
        replayFilter: null,
        justLimit: true,
        isMatch: null,
        offset: 0,
        limit: Infinity,
        error,
        or: whereCtx.or,
        valueMapper: readingHook !== mirror ? readingHook : null
      };
    });
  }
  function simpleCompare(a, b) {
    return a < b ? -1 : a === b ? 0 : 1;
  }
  function simpleCompareReverse(a, b) {
    return a > b ? -1 : a === b ? 0 : 1;
  }
  function fail(collectionOrWhereClause, err, T) {
    var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause.Collection(collectionOrWhereClause) : collectionOrWhereClause;
    collection._ctx.error = T ? new T(err) : new TypeError(err);
    return collection;
  }
  function emptyCollection(whereClause) {
    return new whereClause.Collection(whereClause, () => rangeEqual("")).limit(0);
  }
  function upperFactory(dir) {
    return dir === "next" ? (s) => s.toUpperCase() : (s) => s.toLowerCase();
  }
  function lowerFactory(dir) {
    return dir === "next" ? (s) => s.toLowerCase() : (s) => s.toUpperCase();
  }
  function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp2, dir) {
    var length = Math.min(key.length, lowerNeedle.length);
    var llp = -1;
    for (var i = 0; i < length; ++i) {
      var lwrKeyChar = lowerKey[i];
      if (lwrKeyChar !== lowerNeedle[i]) {
        if (cmp2(key[i], upperNeedle[i]) < 0)
          return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
        if (cmp2(key[i], lowerNeedle[i]) < 0)
          return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
        if (llp >= 0)
          return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
        return null;
      }
      if (cmp2(key[i], lwrKeyChar) < 0)
        llp = i;
    }
    if (length < lowerNeedle.length && dir === "next")
      return key + upperNeedle.substr(key.length);
    if (length < key.length && dir === "prev")
      return key.substr(0, upperNeedle.length);
    return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
  }
  function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
    var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
    if (!needles.every((s) => typeof s === "string")) {
      return fail(whereClause, STRING_EXPECTED);
    }
    function initDirection(dir) {
      upper = upperFactory(dir);
      lower = lowerFactory(dir);
      compare = dir === "next" ? simpleCompare : simpleCompareReverse;
      var needleBounds = needles.map(function(needle) {
        return { lower: lower(needle), upper: upper(needle) };
      }).sort(function(a, b) {
        return compare(a.lower, b.lower);
      });
      upperNeedles = needleBounds.map(function(nb) {
        return nb.upper;
      });
      lowerNeedles = needleBounds.map(function(nb) {
        return nb.lower;
      });
      direction = dir;
      nextKeySuffix = dir === "next" ? "" : suffix;
    }
    initDirection("next");
    var c = new whereClause.Collection(whereClause, () => createRange(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix));
    c._ondirectionchange = function(direction2) {
      initDirection(direction2);
    };
    var firstPossibleNeedle = 0;
    c._addAlgorithm(function(cursor, advance, resolve) {
      var key = cursor.key;
      if (typeof key !== "string")
        return false;
      var lowerKey = lower(key);
      if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
        return true;
      } else {
        var lowestPossibleCasing = null;
        for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
          var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
          if (casing === null && lowestPossibleCasing === null)
            firstPossibleNeedle = i + 1;
          else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
            lowestPossibleCasing = casing;
          }
        }
        if (lowestPossibleCasing !== null) {
          advance(function() {
            cursor.continue(lowestPossibleCasing + nextKeySuffix);
          });
        } else {
          advance(resolve);
        }
        return false;
      }
    });
    return c;
  }
  function createRange(lower, upper, lowerOpen, upperOpen) {
    return {
      type: 2,
      lower,
      upper,
      lowerOpen,
      upperOpen
    };
  }
  function rangeEqual(value) {
    return {
      type: 1,
      lower: value,
      upper: value
    };
  }
  function createWhereClauseConstructor(db) {
    return makeClassConstructor(WhereClause.prototype, function WhereClause2(table, index, orCollection) {
      this.db = db;
      this._ctx = {
        table,
        index: index === ":id" ? null : index,
        or: orCollection
      };
      const indexedDB2 = db._deps.indexedDB;
      if (!indexedDB2)
        throw new exceptions.MissingAPI();
      this._cmp = this._ascending = indexedDB2.cmp.bind(indexedDB2);
      this._descending = (a, b) => indexedDB2.cmp(b, a);
      this._max = (a, b) => indexedDB2.cmp(a, b) > 0 ? a : b;
      this._min = (a, b) => indexedDB2.cmp(a, b) < 0 ? a : b;
      this._IDBKeyRange = db._deps.IDBKeyRange;
    });
  }
  function eventRejectHandler(reject) {
    return wrap(function(event) {
      preventDefault(event);
      reject(event.target.error);
      return false;
    });
  }
  function preventDefault(event) {
    if (event.stopPropagation)
      event.stopPropagation();
    if (event.preventDefault)
      event.preventDefault();
  }
  function createTransactionConstructor(db) {
    return makeClassConstructor(Transaction.prototype, function Transaction2(mode, storeNames, dbschema, chromeTransactionDurability, parent) {
      this.db = db;
      this.mode = mode;
      this.storeNames = storeNames;
      this.schema = dbschema;
      this.chromeTransactionDurability = chromeTransactionDurability;
      this.idbtrans = null;
      this.on = Events(this, "complete", "error", "abort");
      this.parent = parent || null;
      this.active = true;
      this._reculock = 0;
      this._blockedFuncs = [];
      this._resolve = null;
      this._reject = null;
      this._waitingFor = null;
      this._waitingQueue = null;
      this._spinCount = 0;
      this._completion = new DexiePromise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
      this._completion.then(() => {
        this.active = false;
        this.on.complete.fire();
      }, (e) => {
        var wasActive = this.active;
        this.active = false;
        this.on.error.fire(e);
        this.parent ? this.parent._reject(e) : wasActive && this.idbtrans && this.idbtrans.abort();
        return rejection(e);
      });
    });
  }
  function createIndexSpec(name, keyPath, unique, multi, auto, compound, isPrimKey) {
    return {
      name,
      keyPath,
      unique,
      multi,
      auto,
      compound,
      src: (unique && !isPrimKey ? "&" : "") + (multi ? "*" : "") + (auto ? "++" : "") + nameFromKeyPath(keyPath)
    };
  }
  function nameFromKeyPath(keyPath) {
    return typeof keyPath === "string" ? keyPath : keyPath ? "[" + [].join.call(keyPath, "+") + "]" : "";
  }
  function createTableSchema(name, primKey, indexes) {
    return {
      name,
      primKey,
      indexes,
      mappedClass: null,
      idxByName: arrayToObject(indexes, (index) => [index.name, index])
    };
  }
  function safariMultiStoreFix(storeNames) {
    return storeNames.length === 1 ? storeNames[0] : storeNames;
  }
  function getKeyExtractor(keyPath) {
    if (keyPath == null) {
      return () => void 0;
    } else if (typeof keyPath === "string") {
      return getSinglePathKeyExtractor(keyPath);
    } else {
      return (obj) => getByKeyPath(obj, keyPath);
    }
  }
  function getSinglePathKeyExtractor(keyPath) {
    const split = keyPath.split(".");
    if (split.length === 1) {
      return (obj) => obj[keyPath];
    } else {
      return (obj) => getByKeyPath(obj, keyPath);
    }
  }
  function arrayify(arrayLike) {
    return [].slice.call(arrayLike);
  }
  function getKeyPathAlias(keyPath) {
    return keyPath == null ? ":id" : typeof keyPath === "string" ? keyPath : `[${keyPath.join("+")}]`;
  }
  function createDBCore(db, IdbKeyRange, tmpTrans) {
    function extractSchema(db2, trans) {
      const tables2 = arrayify(db2.objectStoreNames);
      return {
        schema: {
          name: db2.name,
          tables: tables2.map((table) => trans.objectStore(table)).map((store) => {
            const { keyPath, autoIncrement } = store;
            const compound = isArray(keyPath);
            const outbound = keyPath == null;
            const indexByKeyPath = {};
            const result = {
              name: store.name,
              primaryKey: {
                name: null,
                isPrimaryKey: true,
                outbound,
                compound,
                keyPath,
                autoIncrement,
                unique: true,
                extractKey: getKeyExtractor(keyPath)
              },
              indexes: arrayify(store.indexNames).map((indexName) => store.index(indexName)).map((index) => {
                const { name, unique, multiEntry, keyPath: keyPath2 } = index;
                const compound2 = isArray(keyPath2);
                const result2 = {
                  name,
                  compound: compound2,
                  keyPath: keyPath2,
                  unique,
                  multiEntry,
                  extractKey: getKeyExtractor(keyPath2)
                };
                indexByKeyPath[getKeyPathAlias(keyPath2)] = result2;
                return result2;
              }),
              getIndexByKeyPath: (keyPath2) => indexByKeyPath[getKeyPathAlias(keyPath2)]
            };
            indexByKeyPath[":id"] = result.primaryKey;
            if (keyPath != null) {
              indexByKeyPath[getKeyPathAlias(keyPath)] = result.primaryKey;
            }
            return result;
          })
        },
        hasGetAll: tables2.length > 0 && "getAll" in trans.objectStore(tables2[0]) && !(typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
      };
    }
    function makeIDBKeyRange(range) {
      if (range.type === 3)
        return null;
      if (range.type === 4)
        throw new Error("Cannot convert never type to IDBKeyRange");
      const { lower, upper, lowerOpen, upperOpen } = range;
      const idbRange = lower === void 0 ? upper === void 0 ? null : IdbKeyRange.upperBound(upper, !!upperOpen) : upper === void 0 ? IdbKeyRange.lowerBound(lower, !!lowerOpen) : IdbKeyRange.bound(lower, upper, !!lowerOpen, !!upperOpen);
      return idbRange;
    }
    function createDbCoreTable(tableSchema) {
      const tableName = tableSchema.name;
      function mutate({ trans, type: type2, keys: keys2, values, range }) {
        return new Promise((resolve, reject) => {
          resolve = wrap(resolve);
          const store = trans.objectStore(tableName);
          const outbound = store.keyPath == null;
          const isAddOrPut = type2 === "put" || type2 === "add";
          if (!isAddOrPut && type2 !== "delete" && type2 !== "deleteRange")
            throw new Error("Invalid operation type: " + type2);
          const { length } = keys2 || values || { length: 1 };
          if (keys2 && values && keys2.length !== values.length) {
            throw new Error("Given keys array must have same length as given values array.");
          }
          if (length === 0)
            return resolve({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
          let req;
          const reqs = [];
          const failures = [];
          let numFailures = 0;
          const errorHandler = (event) => {
            ++numFailures;
            preventDefault(event);
          };
          if (type2 === "deleteRange") {
            if (range.type === 4)
              return resolve({ numFailures, failures, results: [], lastResult: void 0 });
            if (range.type === 3)
              reqs.push(req = store.clear());
            else
              reqs.push(req = store.delete(makeIDBKeyRange(range)));
          } else {
            const [args1, args2] = isAddOrPut ? outbound ? [values, keys2] : [values, null] : [keys2, null];
            if (isAddOrPut) {
              for (let i = 0; i < length; ++i) {
                reqs.push(req = args2 && args2[i] !== void 0 ? store[type2](args1[i], args2[i]) : store[type2](args1[i]));
                req.onerror = errorHandler;
              }
            } else {
              for (let i = 0; i < length; ++i) {
                reqs.push(req = store[type2](args1[i]));
                req.onerror = errorHandler;
              }
            }
          }
          const done = (event) => {
            const lastResult = event.target.result;
            reqs.forEach((req2, i) => req2.error != null && (failures[i] = req2.error));
            resolve({
              numFailures,
              failures,
              results: type2 === "delete" ? keys2 : reqs.map((req2) => req2.result),
              lastResult
            });
          };
          req.onerror = (event) => {
            errorHandler(event);
            done(event);
          };
          req.onsuccess = done;
        });
      }
      function openCursor2({ trans, values, query: query2, reverse, unique }) {
        return new Promise((resolve, reject) => {
          resolve = wrap(resolve);
          const { index, range } = query2;
          const store = trans.objectStore(tableName);
          const source = index.isPrimaryKey ? store : store.index(index.name);
          const direction = reverse ? unique ? "prevunique" : "prev" : unique ? "nextunique" : "next";
          const req = values || !("openKeyCursor" in source) ? source.openCursor(makeIDBKeyRange(range), direction) : source.openKeyCursor(makeIDBKeyRange(range), direction);
          req.onerror = eventRejectHandler(reject);
          req.onsuccess = wrap((ev) => {
            const cursor = req.result;
            if (!cursor) {
              resolve(null);
              return;
            }
            cursor.___id = ++_id_counter;
            cursor.done = false;
            const _cursorContinue = cursor.continue.bind(cursor);
            let _cursorContinuePrimaryKey = cursor.continuePrimaryKey;
            if (_cursorContinuePrimaryKey)
              _cursorContinuePrimaryKey = _cursorContinuePrimaryKey.bind(cursor);
            const _cursorAdvance = cursor.advance.bind(cursor);
            const doThrowCursorIsNotStarted = () => {
              throw new Error("Cursor not started");
            };
            const doThrowCursorIsStopped = () => {
              throw new Error("Cursor not stopped");
            };
            cursor.trans = trans;
            cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsNotStarted;
            cursor.fail = wrap(reject);
            cursor.next = function() {
              let gotOne = 1;
              return this.start(() => gotOne-- ? this.continue() : this.stop()).then(() => this);
            };
            cursor.start = (callback) => {
              const iterationPromise = new Promise((resolveIteration, rejectIteration) => {
                resolveIteration = wrap(resolveIteration);
                req.onerror = eventRejectHandler(rejectIteration);
                cursor.fail = rejectIteration;
                cursor.stop = (value) => {
                  cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsStopped;
                  resolveIteration(value);
                };
              });
              const guardedCallback = () => {
                if (req.result) {
                  try {
                    callback();
                  } catch (err) {
                    cursor.fail(err);
                  }
                } else {
                  cursor.done = true;
                  cursor.start = () => {
                    throw new Error("Cursor behind last entry");
                  };
                  cursor.stop();
                }
              };
              req.onsuccess = wrap((ev2) => {
                req.onsuccess = guardedCallback;
                guardedCallback();
              });
              cursor.continue = _cursorContinue;
              cursor.continuePrimaryKey = _cursorContinuePrimaryKey;
              cursor.advance = _cursorAdvance;
              guardedCallback();
              return iterationPromise;
            };
            resolve(cursor);
          }, reject);
        });
      }
      function query(hasGetAll2) {
        return (request) => {
          return new Promise((resolve, reject) => {
            resolve = wrap(resolve);
            const { trans, values, limit, query: query2 } = request;
            const nonInfinitLimit = limit === Infinity ? void 0 : limit;
            const { index, range } = query2;
            const store = trans.objectStore(tableName);
            const source = index.isPrimaryKey ? store : store.index(index.name);
            const idbKeyRange = makeIDBKeyRange(range);
            if (limit === 0)
              return resolve({ result: [] });
            if (hasGetAll2) {
              const req = values ? source.getAll(idbKeyRange, nonInfinitLimit) : source.getAllKeys(idbKeyRange, nonInfinitLimit);
              req.onsuccess = (event) => resolve({ result: event.target.result });
              req.onerror = eventRejectHandler(reject);
            } else {
              let count = 0;
              const req = values || !("openKeyCursor" in source) ? source.openCursor(idbKeyRange) : source.openKeyCursor(idbKeyRange);
              const result = [];
              req.onsuccess = (event) => {
                const cursor = req.result;
                if (!cursor)
                  return resolve({ result });
                result.push(values ? cursor.value : cursor.primaryKey);
                if (++count === limit)
                  return resolve({ result });
                cursor.continue();
              };
              req.onerror = eventRejectHandler(reject);
            }
          });
        };
      }
      return {
        name: tableName,
        schema: tableSchema,
        mutate,
        getMany({ trans, keys: keys2 }) {
          return new Promise((resolve, reject) => {
            resolve = wrap(resolve);
            const store = trans.objectStore(tableName);
            const length = keys2.length;
            const result = new Array(length);
            let keyCount = 0;
            let callbackCount = 0;
            let req;
            const successHandler = (event) => {
              const req2 = event.target;
              if ((result[req2._pos] = req2.result) != null)
                ;
              if (++callbackCount === keyCount)
                resolve(result);
            };
            const errorHandler = eventRejectHandler(reject);
            for (let i = 0; i < length; ++i) {
              const key = keys2[i];
              if (key != null) {
                req = store.get(keys2[i]);
                req._pos = i;
                req.onsuccess = successHandler;
                req.onerror = errorHandler;
                ++keyCount;
              }
            }
            if (keyCount === 0)
              resolve(result);
          });
        },
        get({ trans, key }) {
          return new Promise((resolve, reject) => {
            resolve = wrap(resolve);
            const store = trans.objectStore(tableName);
            const req = store.get(key);
            req.onsuccess = (event) => resolve(event.target.result);
            req.onerror = eventRejectHandler(reject);
          });
        },
        query: query(hasGetAll),
        openCursor: openCursor2,
        count({ query: query2, trans }) {
          const { index, range } = query2;
          return new Promise((resolve, reject) => {
            const store = trans.objectStore(tableName);
            const source = index.isPrimaryKey ? store : store.index(index.name);
            const idbKeyRange = makeIDBKeyRange(range);
            const req = idbKeyRange ? source.count(idbKeyRange) : source.count();
            req.onsuccess = wrap((ev) => resolve(ev.target.result));
            req.onerror = eventRejectHandler(reject);
          });
        }
      };
    }
    const { schema, hasGetAll } = extractSchema(db, tmpTrans);
    const tables = schema.tables.map((tableSchema) => createDbCoreTable(tableSchema));
    const tableMap = {};
    tables.forEach((table) => tableMap[table.name] = table);
    return {
      stack: "dbcore",
      transaction: db.transaction.bind(db),
      table(name) {
        const result = tableMap[name];
        if (!result)
          throw new Error(`Table '${name}' not found`);
        return tableMap[name];
      },
      MIN_KEY: -Infinity,
      MAX_KEY: getMaxKey(IdbKeyRange),
      schema
    };
  }
  function createMiddlewareStack(stackImpl, middlewares) {
    return middlewares.reduce((down, { create }) => ({ ...down, ...create(down) }), stackImpl);
  }
  function createMiddlewareStacks(middlewares, idbdb, { IDBKeyRange, indexedDB: indexedDB2 }, tmpTrans) {
    const dbcore = createMiddlewareStack(createDBCore(idbdb, IDBKeyRange, tmpTrans), middlewares.dbcore);
    return {
      dbcore
    };
  }
  function generateMiddlewareStacks({ _novip: db }, tmpTrans) {
    const idbdb = tmpTrans.db;
    const stacks = createMiddlewareStacks(db._middlewares, idbdb, db._deps, tmpTrans);
    db.core = stacks.dbcore;
    db.tables.forEach((table) => {
      const tableName = table.name;
      if (db.core.schema.tables.some((tbl) => tbl.name === tableName)) {
        table.core = db.core.table(tableName);
        if (db[tableName] instanceof db.Table) {
          db[tableName].core = table.core;
        }
      }
    });
  }
  function setApiOnPlace({ _novip: db }, objs, tableNames, dbschema) {
    tableNames.forEach((tableName) => {
      const schema = dbschema[tableName];
      objs.forEach((obj) => {
        const propDesc = getPropertyDescriptor(obj, tableName);
        if (!propDesc || "value" in propDesc && propDesc.value === void 0) {
          if (obj === db.Transaction.prototype || obj instanceof db.Transaction) {
            setProp(obj, tableName, {
              get() {
                return this.table(tableName);
              },
              set(value) {
                defineProperty(this, tableName, { value, writable: true, configurable: true, enumerable: true });
              }
            });
          } else {
            obj[tableName] = new db.Table(tableName, schema);
          }
        }
      });
    });
  }
  function removeTablesApi({ _novip: db }, objs) {
    objs.forEach((obj) => {
      for (let key in obj) {
        if (obj[key] instanceof db.Table)
          delete obj[key];
      }
    });
  }
  function lowerVersionFirst(a, b) {
    return a._cfg.version - b._cfg.version;
  }
  function runUpgraders(db, oldVersion, idbUpgradeTrans, reject) {
    const globalSchema = db._dbSchema;
    const trans = db._createTransaction("readwrite", db._storeNames, globalSchema);
    trans.create(idbUpgradeTrans);
    trans._completion.catch(reject);
    const rejectTransaction = trans._reject.bind(trans);
    const transless = PSD.transless || PSD;
    newScope(() => {
      PSD.trans = trans;
      PSD.transless = transless;
      if (oldVersion === 0) {
        keys(globalSchema).forEach((tableName) => {
          createTable(idbUpgradeTrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
        });
        generateMiddlewareStacks(db, idbUpgradeTrans);
        DexiePromise.follow(() => db.on.populate.fire(trans)).catch(rejectTransaction);
      } else
        updateTablesAndIndexes(db, oldVersion, trans, idbUpgradeTrans).catch(rejectTransaction);
    });
  }
  function updateTablesAndIndexes({ _novip: db }, oldVersion, trans, idbUpgradeTrans) {
    const queue = [];
    const versions = db._versions;
    let globalSchema = db._dbSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
    let anyContentUpgraderHasRun = false;
    const versToRun = versions.filter((v) => v._cfg.version >= oldVersion);
    versToRun.forEach((version) => {
      queue.push(() => {
        const oldSchema = globalSchema;
        const newSchema = version._cfg.dbschema;
        adjustToExistingIndexNames(db, oldSchema, idbUpgradeTrans);
        adjustToExistingIndexNames(db, newSchema, idbUpgradeTrans);
        globalSchema = db._dbSchema = newSchema;
        const diff = getSchemaDiff(oldSchema, newSchema);
        diff.add.forEach((tuple) => {
          createTable(idbUpgradeTrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
        });
        diff.change.forEach((change) => {
          if (change.recreate) {
            throw new exceptions.Upgrade("Not yet support for changing primary key");
          } else {
            const store = idbUpgradeTrans.objectStore(change.name);
            change.add.forEach((idx) => addIndex(store, idx));
            change.change.forEach((idx) => {
              store.deleteIndex(idx.name);
              addIndex(store, idx);
            });
            change.del.forEach((idxName) => store.deleteIndex(idxName));
          }
        });
        const contentUpgrade = version._cfg.contentUpgrade;
        if (contentUpgrade && version._cfg.version > oldVersion) {
          generateMiddlewareStacks(db, idbUpgradeTrans);
          trans._memoizedTables = {};
          anyContentUpgraderHasRun = true;
          let upgradeSchema = shallowClone(newSchema);
          diff.del.forEach((table) => {
            upgradeSchema[table] = oldSchema[table];
          });
          removeTablesApi(db, [db.Transaction.prototype]);
          setApiOnPlace(db, [db.Transaction.prototype], keys(upgradeSchema), upgradeSchema);
          trans.schema = upgradeSchema;
          const contentUpgradeIsAsync = isAsyncFunction(contentUpgrade);
          if (contentUpgradeIsAsync) {
            incrementExpectedAwaits();
          }
          let returnValue;
          const promiseFollowed = DexiePromise.follow(() => {
            returnValue = contentUpgrade(trans);
            if (returnValue) {
              if (contentUpgradeIsAsync) {
                var decrementor = decrementExpectedAwaits.bind(null, null);
                returnValue.then(decrementor, decrementor);
              }
            }
          });
          return returnValue && typeof returnValue.then === "function" ? DexiePromise.resolve(returnValue) : promiseFollowed.then(() => returnValue);
        }
      });
      queue.push((idbtrans) => {
        if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
          const newSchema = version._cfg.dbschema;
          deleteRemovedTables(newSchema, idbtrans);
        }
        removeTablesApi(db, [db.Transaction.prototype]);
        setApiOnPlace(db, [db.Transaction.prototype], db._storeNames, db._dbSchema);
        trans.schema = db._dbSchema;
      });
    });
    function runQueue() {
      return queue.length ? DexiePromise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : DexiePromise.resolve();
    }
    return runQueue().then(() => {
      createMissingTables(globalSchema, idbUpgradeTrans);
    });
  }
  function getSchemaDiff(oldSchema, newSchema) {
    const diff = {
      del: [],
      add: [],
      change: []
    };
    let table;
    for (table in oldSchema) {
      if (!newSchema[table])
        diff.del.push(table);
    }
    for (table in newSchema) {
      const oldDef = oldSchema[table], newDef = newSchema[table];
      if (!oldDef) {
        diff.add.push([table, newDef]);
      } else {
        const change = {
          name: table,
          def: newDef,
          recreate: false,
          del: [],
          add: [],
          change: []
        };
        if ("" + (oldDef.primKey.keyPath || "") !== "" + (newDef.primKey.keyPath || "") || oldDef.primKey.auto !== newDef.primKey.auto && !isIEOrEdge) {
          change.recreate = true;
          diff.change.push(change);
        } else {
          const oldIndexes = oldDef.idxByName;
          const newIndexes = newDef.idxByName;
          let idxName;
          for (idxName in oldIndexes) {
            if (!newIndexes[idxName])
              change.del.push(idxName);
          }
          for (idxName in newIndexes) {
            const oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
            if (!oldIdx)
              change.add.push(newIdx);
            else if (oldIdx.src !== newIdx.src)
              change.change.push(newIdx);
          }
          if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
            diff.change.push(change);
          }
        }
      }
    }
    return diff;
  }
  function createTable(idbtrans, tableName, primKey, indexes) {
    const store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
    indexes.forEach((idx) => addIndex(store, idx));
    return store;
  }
  function createMissingTables(newSchema, idbtrans) {
    keys(newSchema).forEach((tableName) => {
      if (!idbtrans.db.objectStoreNames.contains(tableName)) {
        createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
      }
    });
  }
  function deleteRemovedTables(newSchema, idbtrans) {
    [].slice.call(idbtrans.db.objectStoreNames).forEach((storeName) => newSchema[storeName] == null && idbtrans.db.deleteObjectStore(storeName));
  }
  function addIndex(store, idx) {
    store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
  }
  function buildGlobalSchema(db, idbdb, tmpTrans) {
    const globalSchema = {};
    const dbStoreNames = slice(idbdb.objectStoreNames, 0);
    dbStoreNames.forEach((storeName) => {
      const store = tmpTrans.objectStore(storeName);
      let keyPath = store.keyPath;
      const primKey = createIndexSpec(nameFromKeyPath(keyPath), keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== "string", true);
      const indexes = [];
      for (let j = 0; j < store.indexNames.length; ++j) {
        const idbindex = store.index(store.indexNames[j]);
        keyPath = idbindex.keyPath;
        var index = createIndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== "string", false);
        indexes.push(index);
      }
      globalSchema[storeName] = createTableSchema(storeName, primKey, indexes);
    });
    return globalSchema;
  }
  function readGlobalSchema({ _novip: db }, idbdb, tmpTrans) {
    db.verno = idbdb.version / 10;
    const globalSchema = db._dbSchema = buildGlobalSchema(db, idbdb, tmpTrans);
    db._storeNames = slice(idbdb.objectStoreNames, 0);
    setApiOnPlace(db, [db._allTables], keys(globalSchema), globalSchema);
  }
  function verifyInstalledSchema(db, tmpTrans) {
    const installedSchema = buildGlobalSchema(db, db.idbdb, tmpTrans);
    const diff = getSchemaDiff(installedSchema, db._dbSchema);
    return !(diff.add.length || diff.change.some((ch) => ch.add.length || ch.change.length));
  }
  function adjustToExistingIndexNames({ _novip: db }, schema, idbtrans) {
    const storeNames = idbtrans.db.objectStoreNames;
    for (let i = 0; i < storeNames.length; ++i) {
      const storeName = storeNames[i];
      const store = idbtrans.objectStore(storeName);
      db._hasGetAll = "getAll" in store;
      for (let j = 0; j < store.indexNames.length; ++j) {
        const indexName = store.indexNames[j];
        const keyPath = store.index(indexName).keyPath;
        const dexieName = typeof keyPath === "string" ? keyPath : "[" + slice(keyPath).join("+") + "]";
        if (schema[storeName]) {
          const indexSpec = schema[storeName].idxByName[dexieName];
          if (indexSpec) {
            indexSpec.name = indexName;
            delete schema[storeName].idxByName[dexieName];
            schema[storeName].idxByName[indexName] = indexSpec;
          }
        }
      }
    }
    if (typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
      db._hasGetAll = false;
    }
  }
  function parseIndexSyntax(primKeyAndIndexes) {
    return primKeyAndIndexes.split(",").map((index, indexNum) => {
      index = index.trim();
      const name = index.replace(/([&*]|\+\+)/g, "");
      const keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split("+") : name;
      return createIndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), indexNum === 0);
    });
  }
  function createVersionConstructor(db) {
    return makeClassConstructor(Version.prototype, function Version2(versionNumber) {
      this.db = db;
      this._cfg = {
        version: versionNumber,
        storesSource: null,
        dbschema: {},
        tables: {},
        contentUpgrade: null
      };
    });
  }
  function getDbNamesTable(indexedDB2, IDBKeyRange) {
    let dbNamesDB = indexedDB2["_dbNamesDB"];
    if (!dbNamesDB) {
      dbNamesDB = indexedDB2["_dbNamesDB"] = new Dexie$1(DBNAMES_DB, {
        addons: [],
        indexedDB: indexedDB2,
        IDBKeyRange
      });
      dbNamesDB.version(1).stores({ dbnames: "name" });
    }
    return dbNamesDB.table("dbnames");
  }
  function hasDatabasesNative(indexedDB2) {
    return indexedDB2 && typeof indexedDB2.databases === "function";
  }
  function getDatabaseNames({ indexedDB: indexedDB2, IDBKeyRange }) {
    return hasDatabasesNative(indexedDB2) ? Promise.resolve(indexedDB2.databases()).then((infos) => infos.map((info) => info.name).filter((name) => name !== DBNAMES_DB)) : getDbNamesTable(indexedDB2, IDBKeyRange).toCollection().primaryKeys();
  }
  function _onDatabaseCreated({ indexedDB: indexedDB2, IDBKeyRange }, name) {
    !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).put({ name }).catch(nop);
  }
  function _onDatabaseDeleted({ indexedDB: indexedDB2, IDBKeyRange }, name) {
    !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).delete(name).catch(nop);
  }
  function vip(fn) {
    return newScope(function() {
      PSD.letThrough = true;
      return fn();
    });
  }
  function idbReady() {
    var isSafari = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
    if (!isSafari || !indexedDB.databases)
      return Promise.resolve();
    var intervalId;
    return new Promise(function(resolve) {
      var tryIdb = function() {
        return indexedDB.databases().finally(resolve);
      };
      intervalId = setInterval(tryIdb, 100);
      tryIdb();
    }).finally(function() {
      return clearInterval(intervalId);
    });
  }
  function dexieOpen(db) {
    const state = db._state;
    const { indexedDB: indexedDB2 } = db._deps;
    if (state.isBeingOpened || db.idbdb)
      return state.dbReadyPromise.then(() => state.dbOpenError ? rejection(state.dbOpenError) : db);
    debug && (state.openCanceller._stackHolder = getErrorWithStack());
    state.isBeingOpened = true;
    state.dbOpenError = null;
    state.openComplete = false;
    const openCanceller = state.openCanceller;
    function throwIfCancelled() {
      if (state.openCanceller !== openCanceller)
        throw new exceptions.DatabaseClosed("db.open() was cancelled");
    }
    let resolveDbReady = state.dbReadyResolve, upgradeTransaction = null, wasCreated = false;
    return DexiePromise.race([openCanceller, (typeof navigator === "undefined" ? DexiePromise.resolve() : idbReady()).then(() => new DexiePromise((resolve, reject) => {
      throwIfCancelled();
      if (!indexedDB2)
        throw new exceptions.MissingAPI();
      const dbName = db.name;
      const req = state.autoSchema ? indexedDB2.open(dbName) : indexedDB2.open(dbName, Math.round(db.verno * 10));
      if (!req)
        throw new exceptions.MissingAPI();
      req.onerror = eventRejectHandler(reject);
      req.onblocked = wrap(db._fireOnBlocked);
      req.onupgradeneeded = wrap((e) => {
        upgradeTransaction = req.transaction;
        if (state.autoSchema && !db._options.allowEmptyDB) {
          req.onerror = preventDefault;
          upgradeTransaction.abort();
          req.result.close();
          const delreq = indexedDB2.deleteDatabase(dbName);
          delreq.onsuccess = delreq.onerror = wrap(() => {
            reject(new exceptions.NoSuchDatabase(`Database ${dbName} doesnt exist`));
          });
        } else {
          upgradeTransaction.onerror = eventRejectHandler(reject);
          var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion;
          wasCreated = oldVer < 1;
          db._novip.idbdb = req.result;
          runUpgraders(db, oldVer / 10, upgradeTransaction, reject);
        }
      }, reject);
      req.onsuccess = wrap(() => {
        upgradeTransaction = null;
        const idbdb = db._novip.idbdb = req.result;
        const objectStoreNames = slice(idbdb.objectStoreNames);
        if (objectStoreNames.length > 0)
          try {
            const tmpTrans = idbdb.transaction(safariMultiStoreFix(objectStoreNames), "readonly");
            if (state.autoSchema)
              readGlobalSchema(db, idbdb, tmpTrans);
            else {
              adjustToExistingIndexNames(db, db._dbSchema, tmpTrans);
              if (!verifyInstalledSchema(db, tmpTrans)) {
                console.warn(`Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.`);
              }
            }
            generateMiddlewareStacks(db, tmpTrans);
          } catch (e) {
          }
        connections.push(db);
        idbdb.onversionchange = wrap((ev) => {
          state.vcFired = true;
          db.on("versionchange").fire(ev);
        });
        idbdb.onclose = wrap((ev) => {
          db.on("close").fire(ev);
        });
        if (wasCreated)
          _onDatabaseCreated(db._deps, dbName);
        resolve();
      }, reject);
    }))]).then(() => {
      throwIfCancelled();
      state.onReadyBeingFired = [];
      return DexiePromise.resolve(vip(() => db.on.ready.fire(db.vip))).then(function fireRemainders() {
        if (state.onReadyBeingFired.length > 0) {
          let remainders = state.onReadyBeingFired.reduce(promisableChain, nop);
          state.onReadyBeingFired = [];
          return DexiePromise.resolve(vip(() => remainders(db.vip))).then(fireRemainders);
        }
      });
    }).finally(() => {
      state.onReadyBeingFired = null;
      state.isBeingOpened = false;
    }).then(() => {
      return db;
    }).catch((err) => {
      state.dbOpenError = err;
      try {
        upgradeTransaction && upgradeTransaction.abort();
      } catch (_a) {
      }
      if (openCanceller === state.openCanceller) {
        db._close();
      }
      return rejection(err);
    }).finally(() => {
      state.openComplete = true;
      resolveDbReady();
    });
  }
  function awaitIterator(iterator) {
    var callNext = (result) => iterator.next(result), doThrow = (error) => iterator.throw(error), onSuccess = step(callNext), onError = step(doThrow);
    function step(getNext) {
      return (val) => {
        var next = getNext(val), value = next.value;
        return next.done ? value : !value || typeof value.then !== "function" ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
      };
    }
    return step(callNext)();
  }
  function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
    var i = arguments.length;
    if (i < 2)
      throw new exceptions.InvalidArgument("Too few arguments");
    var args = new Array(i - 1);
    while (--i)
      args[i - 1] = arguments[i];
    scopeFunc = args.pop();
    var tables = flatten(args);
    return [mode, tables, scopeFunc];
  }
  function enterTransactionScope(db, mode, storeNames, parentTransaction, scopeFunc) {
    return DexiePromise.resolve().then(() => {
      const transless = PSD.transless || PSD;
      const trans = db._createTransaction(mode, storeNames, db._dbSchema, parentTransaction);
      const zoneProps = {
        trans,
        transless
      };
      if (parentTransaction) {
        trans.idbtrans = parentTransaction.idbtrans;
      } else {
        try {
          trans.create();
          db._state.PR1398_maxLoop = 3;
        } catch (ex) {
          if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
            console.warn("Dexie: Need to reopen db");
            db._close();
            return db.open().then(() => enterTransactionScope(db, mode, storeNames, null, scopeFunc));
          }
          return rejection(ex);
        }
      }
      const scopeFuncIsAsync = isAsyncFunction(scopeFunc);
      if (scopeFuncIsAsync) {
        incrementExpectedAwaits();
      }
      let returnValue;
      const promiseFollowed = DexiePromise.follow(() => {
        returnValue = scopeFunc.call(trans, trans);
        if (returnValue) {
          if (scopeFuncIsAsync) {
            var decrementor = decrementExpectedAwaits.bind(null, null);
            returnValue.then(decrementor, decrementor);
          } else if (typeof returnValue.next === "function" && typeof returnValue.throw === "function") {
            returnValue = awaitIterator(returnValue);
          }
        }
      }, zoneProps);
      return (returnValue && typeof returnValue.then === "function" ? DexiePromise.resolve(returnValue).then((x) => trans.active ? x : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))) : promiseFollowed.then(() => returnValue)).then((x) => {
        if (parentTransaction)
          trans._resolve();
        return trans._completion.then(() => x);
      }).catch((e) => {
        trans._reject(e);
        return rejection(e);
      });
    });
  }
  function pad(a, value, count) {
    const result = isArray(a) ? a.slice() : [a];
    for (let i = 0; i < count; ++i)
      result.push(value);
    return result;
  }
  function createVirtualIndexMiddleware(down) {
    return {
      ...down,
      table(tableName) {
        const table = down.table(tableName);
        const { schema } = table;
        const indexLookup = {};
        const allVirtualIndexes = [];
        function addVirtualIndexes(keyPath, keyTail, lowLevelIndex) {
          const keyPathAlias = getKeyPathAlias(keyPath);
          const indexList = indexLookup[keyPathAlias] = indexLookup[keyPathAlias] || [];
          const keyLength = keyPath == null ? 0 : typeof keyPath === "string" ? 1 : keyPath.length;
          const isVirtual = keyTail > 0;
          const virtualIndex = {
            ...lowLevelIndex,
            isVirtual,
            keyTail,
            keyLength,
            extractKey: getKeyExtractor(keyPath),
            unique: !isVirtual && lowLevelIndex.unique
          };
          indexList.push(virtualIndex);
          if (!virtualIndex.isPrimaryKey) {
            allVirtualIndexes.push(virtualIndex);
          }
          if (keyLength > 1) {
            const virtualKeyPath = keyLength === 2 ? keyPath[0] : keyPath.slice(0, keyLength - 1);
            addVirtualIndexes(virtualKeyPath, keyTail + 1, lowLevelIndex);
          }
          indexList.sort((a, b) => a.keyTail - b.keyTail);
          return virtualIndex;
        }
        const primaryKey = addVirtualIndexes(schema.primaryKey.keyPath, 0, schema.primaryKey);
        indexLookup[":id"] = [primaryKey];
        for (const index of schema.indexes) {
          addVirtualIndexes(index.keyPath, 0, index);
        }
        function findBestIndex(keyPath) {
          const result2 = indexLookup[getKeyPathAlias(keyPath)];
          return result2 && result2[0];
        }
        function translateRange(range, keyTail) {
          return {
            type: range.type === 1 ? 2 : range.type,
            lower: pad(range.lower, range.lowerOpen ? down.MAX_KEY : down.MIN_KEY, keyTail),
            lowerOpen: true,
            upper: pad(range.upper, range.upperOpen ? down.MIN_KEY : down.MAX_KEY, keyTail),
            upperOpen: true
          };
        }
        function translateRequest(req) {
          const index = req.query.index;
          return index.isVirtual ? {
            ...req,
            query: {
              index,
              range: translateRange(req.query.range, index.keyTail)
            }
          } : req;
        }
        const result = {
          ...table,
          schema: {
            ...schema,
            primaryKey,
            indexes: allVirtualIndexes,
            getIndexByKeyPath: findBestIndex
          },
          count(req) {
            return table.count(translateRequest(req));
          },
          query(req) {
            return table.query(translateRequest(req));
          },
          openCursor(req) {
            const { keyTail, isVirtual, keyLength } = req.query.index;
            if (!isVirtual)
              return table.openCursor(req);
            function createVirtualCursor(cursor) {
              function _continue(key) {
                key != null ? cursor.continue(pad(key, req.reverse ? down.MAX_KEY : down.MIN_KEY, keyTail)) : req.unique ? cursor.continue(cursor.key.slice(0, keyLength).concat(req.reverse ? down.MIN_KEY : down.MAX_KEY, keyTail)) : cursor.continue();
              }
              const virtualCursor = Object.create(cursor, {
                continue: { value: _continue },
                continuePrimaryKey: {
                  value(key, primaryKey2) {
                    cursor.continuePrimaryKey(pad(key, down.MAX_KEY, keyTail), primaryKey2);
                  }
                },
                primaryKey: {
                  get() {
                    return cursor.primaryKey;
                  }
                },
                key: {
                  get() {
                    const key = cursor.key;
                    return keyLength === 1 ? key[0] : key.slice(0, keyLength);
                  }
                },
                value: {
                  get() {
                    return cursor.value;
                  }
                }
              });
              return virtualCursor;
            }
            return table.openCursor(translateRequest(req)).then((cursor) => cursor && createVirtualCursor(cursor));
          }
        };
        return result;
      }
    };
  }
  function getObjectDiff(a, b, rv, prfx) {
    rv = rv || {};
    prfx = prfx || "";
    keys(a).forEach((prop) => {
      if (!hasOwn(b, prop)) {
        rv[prfx + prop] = void 0;
      } else {
        var ap = a[prop], bp = b[prop];
        if (typeof ap === "object" && typeof bp === "object" && ap && bp) {
          const apTypeName = toStringTag(ap);
          const bpTypeName = toStringTag(bp);
          if (apTypeName !== bpTypeName) {
            rv[prfx + prop] = b[prop];
          } else if (apTypeName === "Object") {
            getObjectDiff(ap, bp, rv, prfx + prop + ".");
          } else if (ap !== bp) {
            rv[prfx + prop] = b[prop];
          }
        } else if (ap !== bp)
          rv[prfx + prop] = b[prop];
      }
    });
    keys(b).forEach((prop) => {
      if (!hasOwn(a, prop)) {
        rv[prfx + prop] = b[prop];
      }
    });
    return rv;
  }
  function getEffectiveKeys(primaryKey, req) {
    if (req.type === "delete")
      return req.keys;
    return req.keys || req.values.map(primaryKey.extractKey);
  }
  function getExistingValues(table, req, effectiveKeys) {
    return req.type === "add" ? Promise.resolve([]) : table.getMany({ trans: req.trans, keys: effectiveKeys, cache: "immutable" });
  }
  function getFromTransactionCache(keys2, cache, clone) {
    try {
      if (!cache)
        return null;
      if (cache.keys.length < keys2.length)
        return null;
      const result = [];
      for (let i = 0, j = 0; i < cache.keys.length && j < keys2.length; ++i) {
        if (cmp(cache.keys[i], keys2[j]) !== 0)
          continue;
        result.push(clone ? deepClone(cache.values[i]) : cache.values[i]);
        ++j;
      }
      return result.length === keys2.length ? result : null;
    } catch (_a) {
      return null;
    }
  }
  function isEmptyRange(node) {
    return !("from" in node);
  }
  function addRange(target, from, to) {
    const diff = cmp(from, to);
    if (isNaN(diff))
      return;
    if (diff > 0)
      throw RangeError();
    if (isEmptyRange(target))
      return extend(target, { from, to, d: 1 });
    const left = target.l;
    const right = target.r;
    if (cmp(to, target.from) < 0) {
      left ? addRange(left, from, to) : target.l = { from, to, d: 1, l: null, r: null };
      return rebalance(target);
    }
    if (cmp(from, target.to) > 0) {
      right ? addRange(right, from, to) : target.r = { from, to, d: 1, l: null, r: null };
      return rebalance(target);
    }
    if (cmp(from, target.from) < 0) {
      target.from = from;
      target.l = null;
      target.d = right ? right.d + 1 : 1;
    }
    if (cmp(to, target.to) > 0) {
      target.to = to;
      target.r = null;
      target.d = target.l ? target.l.d + 1 : 1;
    }
    const rightWasCutOff = !target.r;
    if (left && !target.l) {
      mergeRanges(target, left);
    }
    if (right && rightWasCutOff) {
      mergeRanges(target, right);
    }
  }
  function mergeRanges(target, newSet) {
    function _addRangeSet(target2, { from, to, l, r }) {
      addRange(target2, from, to);
      if (l)
        _addRangeSet(target2, l);
      if (r)
        _addRangeSet(target2, r);
    }
    if (!isEmptyRange(newSet))
      _addRangeSet(target, newSet);
  }
  function rangesOverlap(rangeSet1, rangeSet2) {
    const i1 = getRangeSetIterator(rangeSet2);
    let nextResult1 = i1.next();
    if (nextResult1.done)
      return false;
    let a = nextResult1.value;
    const i2 = getRangeSetIterator(rangeSet1);
    let nextResult2 = i2.next(a.from);
    let b = nextResult2.value;
    while (!nextResult1.done && !nextResult2.done) {
      if (cmp(b.from, a.to) <= 0 && cmp(b.to, a.from) >= 0)
        return true;
      cmp(a.from, b.from) < 0 ? a = (nextResult1 = i1.next(b.from)).value : b = (nextResult2 = i2.next(a.from)).value;
    }
    return false;
  }
  function getRangeSetIterator(node) {
    let state = isEmptyRange(node) ? null : { s: 0, n: node };
    return {
      next(key) {
        const keyProvided = arguments.length > 0;
        while (state) {
          switch (state.s) {
            case 0:
              state.s = 1;
              if (keyProvided) {
                while (state.n.l && cmp(key, state.n.from) < 0)
                  state = { up: state, n: state.n.l, s: 1 };
              } else {
                while (state.n.l)
                  state = { up: state, n: state.n.l, s: 1 };
              }
            case 1:
              state.s = 2;
              if (!keyProvided || cmp(key, state.n.to) <= 0)
                return { value: state.n, done: false };
            case 2:
              if (state.n.r) {
                state.s = 3;
                state = { up: state, n: state.n.r, s: 0 };
                continue;
              }
            case 3:
              state = state.up;
          }
        }
        return { done: true };
      }
    };
  }
  function rebalance(target) {
    var _a, _b;
    const diff = (((_a = target.r) === null || _a === void 0 ? void 0 : _a.d) || 0) - (((_b = target.l) === null || _b === void 0 ? void 0 : _b.d) || 0);
    const r = diff > 1 ? "r" : diff < -1 ? "l" : "";
    if (r) {
      const l = r === "r" ? "l" : "r";
      const rootClone = { ...target };
      const oldRootRight = target[r];
      target.from = oldRootRight.from;
      target.to = oldRootRight.to;
      target[r] = oldRootRight[r];
      rootClone[r] = oldRootRight[l];
      target[l] = rootClone;
      rootClone.d = computeDepth(rootClone);
    }
    target.d = computeDepth(target);
  }
  function computeDepth({ r, l }) {
    return (r ? l ? Math.max(r.d, l.d) : r.d : l ? l.d : 0) + 1;
  }
  function trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs) {
    function addAffectedIndex(ix) {
      const rangeSet = getRangeSet(ix.name || "");
      function extractKey(obj) {
        return obj != null ? ix.extractKey(obj) : null;
      }
      const addKeyOrKeys = (key) => ix.multiEntry && isArray(key) ? key.forEach((key2) => rangeSet.addKey(key2)) : rangeSet.addKey(key);
      (oldObjs || newObjs).forEach((_, i) => {
        const oldKey = oldObjs && extractKey(oldObjs[i]);
        const newKey = newObjs && extractKey(newObjs[i]);
        if (cmp(oldKey, newKey) !== 0) {
          if (oldKey != null)
            addKeyOrKeys(oldKey);
          if (newKey != null)
            addKeyOrKeys(newKey);
        }
      });
    }
    schema.indexes.forEach(addAffectedIndex);
  }
  function extendObservabilitySet(target, newSet) {
    keys(newSet).forEach((part) => {
      const rangeSet = target[part] || (target[part] = new RangeSet());
      mergeRanges(rangeSet, newSet[part]);
    });
    return target;
  }
  function liveQuery(querier) {
    let hasValue = false;
    let currentValue = void 0;
    const observable = new Observable((observer) => {
      const scopeFuncIsAsync = isAsyncFunction(querier);
      function execute(subscr) {
        if (scopeFuncIsAsync) {
          incrementExpectedAwaits();
        }
        const exec = () => newScope(querier, { subscr, trans: null });
        const rv = PSD.trans ? usePSD(PSD.transless, exec) : exec();
        if (scopeFuncIsAsync) {
          rv.then(decrementExpectedAwaits, decrementExpectedAwaits);
        }
        return rv;
      }
      let closed = false;
      let accumMuts = {};
      let currentObs = {};
      const subscription = {
        get closed() {
          return closed;
        },
        unsubscribe: () => {
          closed = true;
          globalEvents.storagemutated.unsubscribe(mutationListener);
        }
      };
      observer.start && observer.start(subscription);
      let querying = false, startedListening = false;
      function shouldNotify() {
        return keys(currentObs).some((key) => accumMuts[key] && rangesOverlap(accumMuts[key], currentObs[key]));
      }
      const mutationListener = (parts) => {
        extendObservabilitySet(accumMuts, parts);
        if (shouldNotify()) {
          doQuery();
        }
      };
      const doQuery = () => {
        if (querying || closed)
          return;
        accumMuts = {};
        const subscr = {};
        const ret = execute(subscr);
        if (!startedListening) {
          globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, mutationListener);
          startedListening = true;
        }
        querying = true;
        Promise.resolve(ret).then((result) => {
          hasValue = true;
          currentValue = result;
          querying = false;
          if (closed)
            return;
          if (shouldNotify()) {
            doQuery();
          } else {
            accumMuts = {};
            currentObs = subscr;
            observer.next && observer.next(result);
          }
        }, (err) => {
          querying = false;
          hasValue = false;
          observer.error && observer.error(err);
          subscription.unsubscribe();
        });
      };
      doQuery();
      return subscription;
    });
    observable.hasValue = () => hasValue;
    observable.getValue = () => currentValue;
    return observable;
  }
  function propagateLocally(updateParts) {
    let wasMe = propagatingLocally;
    try {
      propagatingLocally = true;
      globalEvents.storagemutated.fire(updateParts);
    } finally {
      propagatingLocally = wasMe;
    }
  }
  function propagateMessageLocally({ data }) {
    if (data && data.type === STORAGE_MUTATED_DOM_EVENT_NAME) {
      propagateLocally(data.changedParts);
    }
  }
  var _global, keys, isArray, getProto, _hasOwn, defineProperty, getOwnPropertyDescriptor, _slice, concat, intrinsicTypeNames, intrinsicTypes, circularRefs, toString, iteratorSymbol, getIteratorOf, NO_CHAR_ARRAY, isAsyncFunction, debug, libraryFilter, NEEDS_THROW_FOR_STACK, dexieErrorNames, idbDomErrorNames, errorList, defaultTexts, errnames, BaseException, exceptions, exceptionMap, fullNameExceptions, INTERNAL, LONG_STACKS_CLIP_LIMIT, MAX_LONG_STACKS, ZONE_ECHO_LIMIT, resolvedNativePromise, nativePromiseProto, resolvedGlobalPromise, nativePromiseThen, NativePromise, patchGlobalPromise, stack_being_generated, schedulePhysicalTick, asap, isOutsideMicroTick, needsNewPhysicalTick, unhandledErrors, rejectingErrors, currentFulfiller, rejectionMapper, globalPSD, PSD, microtickQueue, numScheduledCalls, tickFinalizers, thenProp, task, taskCounter, zoneStack, zoneEchoes, totalEchoes, zone_id_counter, UNHANDLEDREJECTION, rejection, DEXIE_VERSION, maxString, minKey, INVALID_KEY_ARGUMENT, STRING_EXPECTED, connections, isIEOrEdge, hasIEDeleteObjectStoreBug, hangsOnDeleteLargeKeyRange, dexieStackFrameFilter, DBNAMES_DB, READONLY, READWRITE, AnyRange, Table, Collection, deleteCallback, WhereClause, DEXIE_STORAGE_MUTATED_EVENT_NAME, STORAGE_MUTATED_DOM_EVENT_NAME, globalEvents, Transaction, getMaxKey, _id_counter, Version, virtualIndexMiddleware, hooksMiddleware, cacheExistingValuesMiddleware, RangeSet, observabilityMiddleware, Dexie$1, symbolObservable, Observable, domDeps, Dexie, propagatingLocally;
  var init_dexie = __esm({
    "node_modules/dexie/dist/modern/dexie.mjs"() {
      _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
      keys = Object.keys;
      isArray = Array.isArray;
      if (typeof Promise !== "undefined" && !_global.Promise) {
        _global.Promise = Promise;
      }
      getProto = Object.getPrototypeOf;
      _hasOwn = {}.hasOwnProperty;
      defineProperty = Object.defineProperty;
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      _slice = [].slice;
      concat = [].concat;
      intrinsicTypeNames = "Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(flatten([8, 16, 32, 64].map((num) => ["Int", "Uint", "Float"].map((t2) => t2 + num + "Array")))).filter((t2) => _global[t2]);
      intrinsicTypes = intrinsicTypeNames.map((t2) => _global[t2]);
      arrayToObject(intrinsicTypeNames, (x) => [x, true]);
      circularRefs = null;
      ({ toString } = {});
      iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
      getIteratorOf = typeof iteratorSymbol === "symbol" ? function(x) {
        var i;
        return x != null && (i = x[iteratorSymbol]) && i.apply(x);
      } : function() {
        return null;
      };
      NO_CHAR_ARRAY = {};
      isAsyncFunction = typeof Symbol !== "undefined" ? (fn) => fn[Symbol.toStringTag] === "AsyncFunction" : () => false;
      debug = typeof location !== "undefined" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
      libraryFilter = () => true;
      NEEDS_THROW_FOR_STACK = !new Error("").stack;
      dexieErrorNames = [
        "Modify",
        "Bulk",
        "OpenFailed",
        "VersionChange",
        "Schema",
        "Upgrade",
        "InvalidTable",
        "MissingAPI",
        "NoSuchDatabase",
        "InvalidArgument",
        "SubTransaction",
        "Unsupported",
        "Internal",
        "DatabaseClosed",
        "PrematureCommit",
        "ForeignAwait"
      ];
      idbDomErrorNames = [
        "Unknown",
        "Constraint",
        "Data",
        "TransactionInactive",
        "ReadOnly",
        "Version",
        "NotFound",
        "InvalidState",
        "InvalidAccess",
        "Abort",
        "Timeout",
        "QuotaExceeded",
        "Syntax",
        "DataClone"
      ];
      errorList = dexieErrorNames.concat(idbDomErrorNames);
      defaultTexts = {
        VersionChanged: "Database version changed by other database connection",
        DatabaseClosed: "Database has been closed",
        Abort: "Transaction aborted",
        TransactionInactive: "Transaction has already completed or failed",
        MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
      };
      derive(DexieError).from(Error).extend({
        stack: {
          get: function() {
            return this._stack || (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
          }
        },
        toString: function() {
          return this.name + ": " + this.message;
        }
      });
      derive(ModifyError).from(DexieError);
      derive(BulkError).from(DexieError);
      errnames = errorList.reduce((obj, name) => (obj[name] = name + "Error", obj), {});
      BaseException = DexieError;
      exceptions = errorList.reduce((obj, name) => {
        var fullName = name + "Error";
        function DexieError2(msgOrInner, inner) {
          this._e = getErrorWithStack();
          this.name = fullName;
          if (!msgOrInner) {
            this.message = defaultTexts[name] || fullName;
            this.inner = null;
          } else if (typeof msgOrInner === "string") {
            this.message = `${msgOrInner}${!inner ? "" : "\n " + inner}`;
            this.inner = inner || null;
          } else if (typeof msgOrInner === "object") {
            this.message = `${msgOrInner.name} ${msgOrInner.message}`;
            this.inner = msgOrInner;
          }
        }
        derive(DexieError2).from(BaseException);
        obj[name] = DexieError2;
        return obj;
      }, {});
      exceptions.Syntax = SyntaxError;
      exceptions.Type = TypeError;
      exceptions.Range = RangeError;
      exceptionMap = idbDomErrorNames.reduce((obj, name) => {
        obj[name + "Error"] = exceptions[name];
        return obj;
      }, {});
      fullNameExceptions = errorList.reduce((obj, name) => {
        if (["Syntax", "Type", "Range"].indexOf(name) === -1)
          obj[name + "Error"] = exceptions[name];
        return obj;
      }, {});
      fullNameExceptions.ModifyError = ModifyError;
      fullNameExceptions.DexieError = DexieError;
      fullNameExceptions.BulkError = BulkError;
      INTERNAL = {};
      LONG_STACKS_CLIP_LIMIT = 100;
      MAX_LONG_STACKS = 20;
      ZONE_ECHO_LIMIT = 100;
      [resolvedNativePromise, nativePromiseProto, resolvedGlobalPromise] = typeof Promise === "undefined" ? [] : (() => {
        let globalP = Promise.resolve();
        if (typeof crypto === "undefined" || !crypto.subtle)
          return [globalP, getProto(globalP), globalP];
        const nativeP = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
        return [
          nativeP,
          getProto(nativeP),
          globalP
        ];
      })();
      nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
      NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
      patchGlobalPromise = !!resolvedGlobalPromise;
      stack_being_generated = false;
      schedulePhysicalTick = resolvedGlobalPromise ? () => {
        resolvedGlobalPromise.then(physicalTick);
      } : _global.setImmediate ? setImmediate.bind(null, physicalTick) : _global.MutationObserver ? () => {
        var hiddenDiv = document.createElement("div");
        new MutationObserver(() => {
          physicalTick();
          hiddenDiv = null;
        }).observe(hiddenDiv, { attributes: true });
        hiddenDiv.setAttribute("i", "1");
      } : () => {
        setTimeout(physicalTick, 0);
      };
      asap = function(callback, args) {
        microtickQueue.push([callback, args]);
        if (needsNewPhysicalTick) {
          schedulePhysicalTick();
          needsNewPhysicalTick = false;
        }
      };
      isOutsideMicroTick = true;
      needsNewPhysicalTick = true;
      unhandledErrors = [];
      rejectingErrors = [];
      currentFulfiller = null;
      rejectionMapper = mirror;
      globalPSD = {
        id: "global",
        global: true,
        ref: 0,
        unhandleds: [],
        onunhandled: globalError,
        pgp: false,
        env: {},
        finalize: function() {
          this.unhandleds.forEach((uh) => {
            try {
              globalError(uh[0], uh[1]);
            } catch (e) {
            }
          });
        }
      };
      PSD = globalPSD;
      microtickQueue = [];
      numScheduledCalls = 0;
      tickFinalizers = [];
      thenProp = {
        get: function() {
          var psd = PSD, microTaskId = totalEchoes;
          function then(onFulfilled, onRejected) {
            var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
            const cleanup = possibleAwait && !decrementExpectedAwaits();
            var rv = new DexiePromise((resolve, reject) => {
              propagateToListener(this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait, cleanup), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait, cleanup), resolve, reject, psd));
            });
            debug && linkToPreviousPromise(rv, this);
            return rv;
          }
          then.prototype = INTERNAL;
          return then;
        },
        set: function(value) {
          setProp(this, "then", value && value.prototype === INTERNAL ? thenProp : {
            get: function() {
              return value;
            },
            set: thenProp.set
          });
        }
      };
      props(DexiePromise.prototype, {
        then: thenProp,
        _then: function(onFulfilled, onRejected) {
          propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
        },
        catch: function(onRejected) {
          if (arguments.length === 1)
            return this.then(null, onRejected);
          var type2 = arguments[0], handler = arguments[1];
          return typeof type2 === "function" ? this.then(null, (err) => err instanceof type2 ? handler(err) : PromiseReject(err)) : this.then(null, (err) => err && err.name === type2 ? handler(err) : PromiseReject(err));
        },
        finally: function(onFinally) {
          return this.then((value) => {
            onFinally();
            return value;
          }, (err) => {
            onFinally();
            return PromiseReject(err);
          });
        },
        stack: {
          get: function() {
            if (this._stack)
              return this._stack;
            try {
              stack_being_generated = true;
              var stacks = getStack(this, [], MAX_LONG_STACKS);
              var stack = stacks.join("\nFrom previous: ");
              if (this._state !== null)
                this._stack = stack;
              return stack;
            } finally {
              stack_being_generated = false;
            }
          }
        },
        timeout: function(ms, msg) {
          return ms < Infinity ? new DexiePromise((resolve, reject) => {
            var handle = setTimeout(() => reject(new exceptions.Timeout(msg)), ms);
            this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
          }) : this;
        }
      });
      if (typeof Symbol !== "undefined" && Symbol.toStringTag)
        setProp(DexiePromise.prototype, Symbol.toStringTag, "Dexie.Promise");
      globalPSD.env = snapShot();
      props(DexiePromise, {
        all: function() {
          var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
          return new DexiePromise(function(resolve, reject) {
            if (values.length === 0)
              resolve([]);
            var remaining = values.length;
            values.forEach((a, i) => DexiePromise.resolve(a).then((x) => {
              values[i] = x;
              if (!--remaining)
                resolve(values);
            }, reject));
          });
        },
        resolve: (value) => {
          if (value instanceof DexiePromise)
            return value;
          if (value && typeof value.then === "function")
            return new DexiePromise((resolve, reject) => {
              value.then(resolve, reject);
            });
          var rv = new DexiePromise(INTERNAL, true, value);
          linkToPreviousPromise(rv, currentFulfiller);
          return rv;
        },
        reject: PromiseReject,
        race: function() {
          var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
          return new DexiePromise((resolve, reject) => {
            values.map((value) => DexiePromise.resolve(value).then(resolve, reject));
          });
        },
        PSD: {
          get: () => PSD,
          set: (value) => PSD = value
        },
        totalEchoes: { get: () => totalEchoes },
        newPSD: newScope,
        usePSD,
        scheduler: {
          get: () => asap,
          set: (value) => {
            asap = value;
          }
        },
        rejectionMapper: {
          get: () => rejectionMapper,
          set: (value) => {
            rejectionMapper = value;
          }
        },
        follow: (fn, zoneProps) => {
          return new DexiePromise((resolve, reject) => {
            return newScope((resolve2, reject2) => {
              var psd = PSD;
              psd.unhandleds = [];
              psd.onunhandled = reject2;
              psd.finalize = callBoth(function() {
                run_at_end_of_this_or_next_physical_tick(() => {
                  this.unhandleds.length === 0 ? resolve2() : reject2(this.unhandleds[0]);
                });
              }, psd.finalize);
              fn();
            }, zoneProps, resolve, reject);
          });
        }
      });
      if (NativePromise) {
        if (NativePromise.allSettled)
          setProp(DexiePromise, "allSettled", function() {
            const possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise((resolve) => {
              if (possiblePromises.length === 0)
                resolve([]);
              let remaining = possiblePromises.length;
              const results = new Array(remaining);
              possiblePromises.forEach((p, i) => DexiePromise.resolve(p).then((value) => results[i] = { status: "fulfilled", value }, (reason) => results[i] = { status: "rejected", reason }).then(() => --remaining || resolve(results)));
            });
          });
        if (NativePromise.any && typeof AggregateError !== "undefined")
          setProp(DexiePromise, "any", function() {
            const possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise((resolve, reject) => {
              if (possiblePromises.length === 0)
                reject(new AggregateError([]));
              let remaining = possiblePromises.length;
              const failures = new Array(remaining);
              possiblePromises.forEach((p, i) => DexiePromise.resolve(p).then((value) => resolve(value), (failure) => {
                failures[i] = failure;
                if (!--remaining)
                  reject(new AggregateError(failures));
              }));
            });
          });
      }
      task = { awaits: 0, echoes: 0, id: 0 };
      taskCounter = 0;
      zoneStack = [];
      zoneEchoes = 0;
      totalEchoes = 0;
      zone_id_counter = 0;
      if (("" + nativePromiseThen).indexOf("[native code]") === -1) {
        incrementExpectedAwaits = decrementExpectedAwaits = nop;
      }
      UNHANDLEDREJECTION = "unhandledrejection";
      rejection = DexiePromise.reject;
      DEXIE_VERSION = "3.2.4";
      maxString = String.fromCharCode(65535);
      minKey = -Infinity;
      INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
      STRING_EXPECTED = "String expected.";
      connections = [];
      isIEOrEdge = typeof navigator !== "undefined" && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
      hasIEDeleteObjectStoreBug = isIEOrEdge;
      hangsOnDeleteLargeKeyRange = isIEOrEdge;
      dexieStackFrameFilter = (frame) => !/(dexie\.js|dexie\.min\.js)/.test(frame);
      DBNAMES_DB = "__dbnames";
      READONLY = "readonly";
      READWRITE = "readwrite";
      AnyRange = {
        type: 3,
        lower: -Infinity,
        lowerOpen: false,
        upper: [[]],
        upperOpen: false
      };
      Table = class {
        _trans(mode, fn, writeLocked) {
          const trans = this._tx || PSD.trans;
          const tableName = this.name;
          function checkTableInTransaction(resolve, reject, trans2) {
            if (!trans2.schema[tableName])
              throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
            return fn(trans2.idbtrans, trans2);
          }
          const wasRootExec = beginMicroTickScope();
          try {
            return trans && trans.db === this.db ? trans === PSD.trans ? trans._promise(mode, checkTableInTransaction, writeLocked) : newScope(() => trans._promise(mode, checkTableInTransaction, writeLocked), { trans, transless: PSD.transless || PSD }) : tempTransaction(this.db, mode, [this.name], checkTableInTransaction);
          } finally {
            if (wasRootExec)
              endMicroTickScope();
          }
        }
        get(keyOrCrit, cb) {
          if (keyOrCrit && keyOrCrit.constructor === Object)
            return this.where(keyOrCrit).first(cb);
          return this._trans("readonly", (trans) => {
            return this.core.get({ trans, key: keyOrCrit }).then((res) => this.hook.reading.fire(res));
          }).then(cb);
        }
        where(indexOrCrit) {
          if (typeof indexOrCrit === "string")
            return new this.db.WhereClause(this, indexOrCrit);
          if (isArray(indexOrCrit))
            return new this.db.WhereClause(this, `[${indexOrCrit.join("+")}]`);
          const keyPaths = keys(indexOrCrit);
          if (keyPaths.length === 1)
            return this.where(keyPaths[0]).equals(indexOrCrit[keyPaths[0]]);
          const compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter((ix) => ix.compound && keyPaths.every((keyPath) => ix.keyPath.indexOf(keyPath) >= 0) && ix.keyPath.every((keyPath) => keyPaths.indexOf(keyPath) >= 0))[0];
          if (compoundIndex && this.db._maxKey !== maxString)
            return this.where(compoundIndex.name).equals(compoundIndex.keyPath.map((kp) => indexOrCrit[kp]));
          if (!compoundIndex && debug)
            console.warn(`The query ${JSON.stringify(indexOrCrit)} on ${this.name} would benefit of a compound index [${keyPaths.join("+")}]`);
          const { idxByName } = this.schema;
          const idb = this.db._deps.indexedDB;
          function equals(a, b) {
            try {
              return idb.cmp(a, b) === 0;
            } catch (e) {
              return false;
            }
          }
          const [idx, filterFunction] = keyPaths.reduce(([prevIndex, prevFilterFn], keyPath) => {
            const index = idxByName[keyPath];
            const value = indexOrCrit[keyPath];
            return [
              prevIndex || index,
              prevIndex || !index ? combine(prevFilterFn, index && index.multi ? (x) => {
                const prop = getByKeyPath(x, keyPath);
                return isArray(prop) && prop.some((item) => equals(value, item));
              } : (x) => equals(value, getByKeyPath(x, keyPath))) : prevFilterFn
            ];
          }, [null, null]);
          return idx ? this.where(idx.name).equals(indexOrCrit[idx.keyPath]).filter(filterFunction) : compoundIndex ? this.filter(filterFunction) : this.where(keyPaths).equals("");
        }
        filter(filterFunction) {
          return this.toCollection().and(filterFunction);
        }
        count(thenShortcut) {
          return this.toCollection().count(thenShortcut);
        }
        offset(offset) {
          return this.toCollection().offset(offset);
        }
        limit(numRows) {
          return this.toCollection().limit(numRows);
        }
        each(callback) {
          return this.toCollection().each(callback);
        }
        toArray(thenShortcut) {
          return this.toCollection().toArray(thenShortcut);
        }
        toCollection() {
          return new this.db.Collection(new this.db.WhereClause(this));
        }
        orderBy(index) {
          return new this.db.Collection(new this.db.WhereClause(this, isArray(index) ? `[${index.join("+")}]` : index));
        }
        reverse() {
          return this.toCollection().reverse();
        }
        mapToClass(constructor) {
          this.schema.mappedClass = constructor;
          const readHook = (obj) => {
            if (!obj)
              return obj;
            const res = Object.create(constructor.prototype);
            for (var m in obj)
              if (hasOwn(obj, m))
                try {
                  res[m] = obj[m];
                } catch (_) {
                }
            return res;
          };
          if (this.schema.readHook) {
            this.hook.reading.unsubscribe(this.schema.readHook);
          }
          this.schema.readHook = readHook;
          this.hook("reading", readHook);
          return constructor;
        }
        defineClass() {
          function Class(content) {
            extend(this, content);
          }
          return this.mapToClass(Class);
        }
        add(obj, key) {
          const { auto, keyPath } = this.schema.primKey;
          let objToAdd = obj;
          if (keyPath && auto) {
            objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
          }
          return this._trans("readwrite", (trans) => {
            return this.core.mutate({ trans, type: "add", keys: key != null ? [key] : null, values: [objToAdd] });
          }).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult).then((lastResult) => {
            if (keyPath) {
              try {
                setByKeyPath(obj, keyPath, lastResult);
              } catch (_) {
              }
            }
            return lastResult;
          });
        }
        update(keyOrObject, modifications) {
          if (typeof keyOrObject === "object" && !isArray(keyOrObject)) {
            const key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
            if (key === void 0)
              return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
            try {
              if (typeof modifications !== "function") {
                keys(modifications).forEach((keyPath) => {
                  setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
                });
              } else {
                modifications(keyOrObject, { value: keyOrObject, primKey: key });
              }
            } catch (_a) {
            }
            return this.where(":id").equals(key).modify(modifications);
          } else {
            return this.where(":id").equals(keyOrObject).modify(modifications);
          }
        }
        put(obj, key) {
          const { auto, keyPath } = this.schema.primKey;
          let objToAdd = obj;
          if (keyPath && auto) {
            objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
          }
          return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "put", values: [objToAdd], keys: key != null ? [key] : null })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult).then((lastResult) => {
            if (keyPath) {
              try {
                setByKeyPath(obj, keyPath, lastResult);
              } catch (_) {
              }
            }
            return lastResult;
          });
        }
        delete(key) {
          return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "delete", keys: [key] })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0);
        }
        clear() {
          return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "deleteRange", range: AnyRange })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0);
        }
        bulkGet(keys2) {
          return this._trans("readonly", (trans) => {
            return this.core.getMany({
              keys: keys2,
              trans
            }).then((result) => result.map((res) => this.hook.reading.fire(res)));
          });
        }
        bulkAdd(objects, keysOrOptions, options) {
          const keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
          options = options || (keys2 ? void 0 : keysOrOptions);
          const wantResults = options ? options.allKeys : void 0;
          return this._trans("readwrite", (trans) => {
            const { auto, keyPath } = this.schema.primKey;
            if (keyPath && keys2)
              throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
            if (keys2 && keys2.length !== objects.length)
              throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
            const numObjects = objects.length;
            let objectsToAdd = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
            return this.core.mutate({ trans, type: "add", keys: keys2, values: objectsToAdd, wantResults }).then(({ numFailures, results, lastResult, failures }) => {
              const result = wantResults ? results : lastResult;
              if (numFailures === 0)
                return result;
              throw new BulkError(`${this.name}.bulkAdd(): ${numFailures} of ${numObjects} operations failed`, failures);
            });
          });
        }
        bulkPut(objects, keysOrOptions, options) {
          const keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
          options = options || (keys2 ? void 0 : keysOrOptions);
          const wantResults = options ? options.allKeys : void 0;
          return this._trans("readwrite", (trans) => {
            const { auto, keyPath } = this.schema.primKey;
            if (keyPath && keys2)
              throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
            if (keys2 && keys2.length !== objects.length)
              throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
            const numObjects = objects.length;
            let objectsToPut = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
            return this.core.mutate({ trans, type: "put", keys: keys2, values: objectsToPut, wantResults }).then(({ numFailures, results, lastResult, failures }) => {
              const result = wantResults ? results : lastResult;
              if (numFailures === 0)
                return result;
              throw new BulkError(`${this.name}.bulkPut(): ${numFailures} of ${numObjects} operations failed`, failures);
            });
          });
        }
        bulkDelete(keys2) {
          const numKeys = keys2.length;
          return this._trans("readwrite", (trans) => {
            return this.core.mutate({ trans, type: "delete", keys: keys2 });
          }).then(({ numFailures, lastResult, failures }) => {
            if (numFailures === 0)
              return lastResult;
            throw new BulkError(`${this.name}.bulkDelete(): ${numFailures} of ${numKeys} operations failed`, failures);
          });
        }
      };
      Collection = class {
        _read(fn, cb) {
          var ctx = this._ctx;
          return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readonly", fn).then(cb);
        }
        _write(fn) {
          var ctx = this._ctx;
          return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readwrite", fn, "locked");
        }
        _addAlgorithm(fn) {
          var ctx = this._ctx;
          ctx.algorithm = combine(ctx.algorithm, fn);
        }
        _iterate(fn, coreTrans) {
          return iter(this._ctx, fn, coreTrans, this._ctx.table.core);
        }
        clone(props2) {
          var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
          if (props2)
            extend(ctx, props2);
          rv._ctx = ctx;
          return rv;
        }
        raw() {
          this._ctx.valueMapper = null;
          return this;
        }
        each(fn) {
          var ctx = this._ctx;
          return this._read((trans) => iter(ctx, fn, trans, ctx.table.core));
        }
        count(cb) {
          return this._read((trans) => {
            const ctx = this._ctx;
            const coreTable = ctx.table.core;
            if (isPlainKeyRange(ctx, true)) {
              return coreTable.count({
                trans,
                query: {
                  index: getIndexOrStore(ctx, coreTable.schema),
                  range: ctx.range
                }
              }).then((count2) => Math.min(count2, ctx.limit));
            } else {
              var count = 0;
              return iter(ctx, () => {
                ++count;
                return false;
              }, trans, coreTable).then(() => count);
            }
          }).then(cb);
        }
        sortBy(keyPath, cb) {
          const parts = keyPath.split(".").reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
          function getval(obj, i) {
            if (i)
              return getval(obj[parts[i]], i - 1);
            return obj[lastPart];
          }
          var order = this._ctx.dir === "next" ? 1 : -1;
          function sorter(a, b) {
            var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
            return aVal < bVal ? -order : aVal > bVal ? order : 0;
          }
          return this.toArray(function(a) {
            return a.sort(sorter);
          }).then(cb);
        }
        toArray(cb) {
          return this._read((trans) => {
            var ctx = this._ctx;
            if (ctx.dir === "next" && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
              const { valueMapper } = ctx;
              const index = getIndexOrStore(ctx, ctx.table.core.schema);
              return ctx.table.core.query({
                trans,
                limit: ctx.limit,
                values: true,
                query: {
                  index,
                  range: ctx.range
                }
              }).then(({ result }) => valueMapper ? result.map(valueMapper) : result);
            } else {
              const a = [];
              return iter(ctx, (item) => a.push(item), trans, ctx.table.core).then(() => a);
            }
          }, cb);
        }
        offset(offset) {
          var ctx = this._ctx;
          if (offset <= 0)
            return this;
          ctx.offset += offset;
          if (isPlainKeyRange(ctx)) {
            addReplayFilter(ctx, () => {
              var offsetLeft = offset;
              return (cursor, advance) => {
                if (offsetLeft === 0)
                  return true;
                if (offsetLeft === 1) {
                  --offsetLeft;
                  return false;
                }
                advance(() => {
                  cursor.advance(offsetLeft);
                  offsetLeft = 0;
                });
                return false;
              };
            });
          } else {
            addReplayFilter(ctx, () => {
              var offsetLeft = offset;
              return () => --offsetLeft < 0;
            });
          }
          return this;
        }
        limit(numRows) {
          this._ctx.limit = Math.min(this._ctx.limit, numRows);
          addReplayFilter(this._ctx, () => {
            var rowsLeft = numRows;
            return function(cursor, advance, resolve) {
              if (--rowsLeft <= 0)
                advance(resolve);
              return rowsLeft >= 0;
            };
          }, true);
          return this;
        }
        until(filterFunction, bIncludeStopEntry) {
          addFilter(this._ctx, function(cursor, advance, resolve) {
            if (filterFunction(cursor.value)) {
              advance(resolve);
              return bIncludeStopEntry;
            } else {
              return true;
            }
          });
          return this;
        }
        first(cb) {
          return this.limit(1).toArray(function(a) {
            return a[0];
          }).then(cb);
        }
        last(cb) {
          return this.reverse().first(cb);
        }
        filter(filterFunction) {
          addFilter(this._ctx, function(cursor) {
            return filterFunction(cursor.value);
          });
          addMatchFilter(this._ctx, filterFunction);
          return this;
        }
        and(filter) {
          return this.filter(filter);
        }
        or(indexName) {
          return new this.db.WhereClause(this._ctx.table, indexName, this);
        }
        reverse() {
          this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
          if (this._ondirectionchange)
            this._ondirectionchange(this._ctx.dir);
          return this;
        }
        desc() {
          return this.reverse();
        }
        eachKey(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          return this.each(function(val, cursor) {
            cb(cursor.key, cursor);
          });
        }
        eachUniqueKey(cb) {
          this._ctx.unique = "unique";
          return this.eachKey(cb);
        }
        eachPrimaryKey(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          return this.each(function(val, cursor) {
            cb(cursor.primaryKey, cursor);
          });
        }
        keys(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          var a = [];
          return this.each(function(item, cursor) {
            a.push(cursor.key);
          }).then(function() {
            return a;
          }).then(cb);
        }
        primaryKeys(cb) {
          var ctx = this._ctx;
          if (ctx.dir === "next" && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
            return this._read((trans) => {
              var index = getIndexOrStore(ctx, ctx.table.core.schema);
              return ctx.table.core.query({
                trans,
                values: false,
                limit: ctx.limit,
                query: {
                  index,
                  range: ctx.range
                }
              });
            }).then(({ result }) => result).then(cb);
          }
          ctx.keysOnly = !ctx.isMatch;
          var a = [];
          return this.each(function(item, cursor) {
            a.push(cursor.primaryKey);
          }).then(function() {
            return a;
          }).then(cb);
        }
        uniqueKeys(cb) {
          this._ctx.unique = "unique";
          return this.keys(cb);
        }
        firstKey(cb) {
          return this.limit(1).keys(function(a) {
            return a[0];
          }).then(cb);
        }
        lastKey(cb) {
          return this.reverse().firstKey(cb);
        }
        distinct() {
          var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
          if (!idx || !idx.multi)
            return this;
          var set = {};
          addFilter(this._ctx, function(cursor) {
            var strKey = cursor.primaryKey.toString();
            var found = hasOwn(set, strKey);
            set[strKey] = true;
            return !found;
          });
          return this;
        }
        modify(changes) {
          var ctx = this._ctx;
          return this._write((trans) => {
            var modifyer;
            if (typeof changes === "function") {
              modifyer = changes;
            } else {
              var keyPaths = keys(changes);
              var numKeys = keyPaths.length;
              modifyer = function(item) {
                var anythingModified = false;
                for (var i = 0; i < numKeys; ++i) {
                  var keyPath = keyPaths[i], val = changes[keyPath];
                  if (getByKeyPath(item, keyPath) !== val) {
                    setByKeyPath(item, keyPath, val);
                    anythingModified = true;
                  }
                }
                return anythingModified;
              };
            }
            const coreTable = ctx.table.core;
            const { outbound, extractKey } = coreTable.schema.primaryKey;
            const limit = this.db._options.modifyChunkSize || 200;
            const totalFailures = [];
            let successCount = 0;
            const failedKeys = [];
            const applyMutateResult = (expectedCount, res) => {
              const { failures, numFailures } = res;
              successCount += expectedCount - numFailures;
              for (let pos of keys(failures)) {
                totalFailures.push(failures[pos]);
              }
            };
            return this.clone().primaryKeys().then((keys2) => {
              const nextChunk = (offset) => {
                const count = Math.min(limit, keys2.length - offset);
                return coreTable.getMany({
                  trans,
                  keys: keys2.slice(offset, offset + count),
                  cache: "immutable"
                }).then((values) => {
                  const addValues = [];
                  const putValues = [];
                  const putKeys = outbound ? [] : null;
                  const deleteKeys = [];
                  for (let i = 0; i < count; ++i) {
                    const origValue = values[i];
                    const ctx2 = {
                      value: deepClone(origValue),
                      primKey: keys2[offset + i]
                    };
                    if (modifyer.call(ctx2, ctx2.value, ctx2) !== false) {
                      if (ctx2.value == null) {
                        deleteKeys.push(keys2[offset + i]);
                      } else if (!outbound && cmp(extractKey(origValue), extractKey(ctx2.value)) !== 0) {
                        deleteKeys.push(keys2[offset + i]);
                        addValues.push(ctx2.value);
                      } else {
                        putValues.push(ctx2.value);
                        if (outbound)
                          putKeys.push(keys2[offset + i]);
                      }
                    }
                  }
                  const criteria = isPlainKeyRange(ctx) && ctx.limit === Infinity && (typeof changes !== "function" || changes === deleteCallback) && {
                    index: ctx.index,
                    range: ctx.range
                  };
                  return Promise.resolve(addValues.length > 0 && coreTable.mutate({ trans, type: "add", values: addValues }).then((res) => {
                    for (let pos in res.failures) {
                      deleteKeys.splice(parseInt(pos), 1);
                    }
                    applyMutateResult(addValues.length, res);
                  })).then(() => (putValues.length > 0 || criteria && typeof changes === "object") && coreTable.mutate({
                    trans,
                    type: "put",
                    keys: putKeys,
                    values: putValues,
                    criteria,
                    changeSpec: typeof changes !== "function" && changes
                  }).then((res) => applyMutateResult(putValues.length, res))).then(() => (deleteKeys.length > 0 || criteria && changes === deleteCallback) && coreTable.mutate({
                    trans,
                    type: "delete",
                    keys: deleteKeys,
                    criteria
                  }).then((res) => applyMutateResult(deleteKeys.length, res))).then(() => {
                    return keys2.length > offset + count && nextChunk(offset + limit);
                  });
                });
              };
              return nextChunk(0).then(() => {
                if (totalFailures.length > 0)
                  throw new ModifyError("Error modifying one or more objects", totalFailures, successCount, failedKeys);
                return keys2.length;
              });
            });
          });
        }
        delete() {
          var ctx = this._ctx, range = ctx.range;
          if (isPlainKeyRange(ctx) && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || range.type === 3)) {
            return this._write((trans) => {
              const { primaryKey } = ctx.table.core.schema;
              const coreRange = range;
              return ctx.table.core.count({ trans, query: { index: primaryKey, range: coreRange } }).then((count) => {
                return ctx.table.core.mutate({ trans, type: "deleteRange", range: coreRange }).then(({ failures, lastResult, results, numFailures }) => {
                  if (numFailures)
                    throw new ModifyError("Could not delete some values", Object.keys(failures).map((pos) => failures[pos]), count - numFailures);
                  return count - numFailures;
                });
              });
            });
          }
          return this.modify(deleteCallback);
        }
      };
      deleteCallback = (value, ctx) => ctx.value = null;
      WhereClause = class {
        get Collection() {
          return this._ctx.table.db.Collection;
        }
        between(lower, upper, includeLower, includeUpper) {
          includeLower = includeLower !== false;
          includeUpper = includeUpper === true;
          try {
            if (this._cmp(lower, upper) > 0 || this._cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper))
              return emptyCollection(this);
            return new this.Collection(this, () => createRange(lower, upper, !includeLower, !includeUpper));
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
        }
        equals(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, () => rangeEqual(value));
        }
        above(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, () => createRange(value, void 0, true));
        }
        aboveOrEqual(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, () => createRange(value, void 0, false));
        }
        below(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, () => createRange(void 0, value, false, true));
        }
        belowOrEqual(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, () => createRange(void 0, value));
        }
        startsWith(str) {
          if (typeof str !== "string")
            return fail(this, STRING_EXPECTED);
          return this.between(str, str + maxString, true, true);
        }
        startsWithIgnoreCase(str) {
          if (str === "")
            return this.startsWith(str);
          return addIgnoreCaseAlgorithm(this, (x, a) => x.indexOf(a[0]) === 0, [str], maxString);
        }
        equalsIgnoreCase(str) {
          return addIgnoreCaseAlgorithm(this, (x, a) => x === a[0], [str], "");
        }
        anyOfIgnoreCase() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return emptyCollection(this);
          return addIgnoreCaseAlgorithm(this, (x, a) => a.indexOf(x) !== -1, set, "");
        }
        startsWithAnyOfIgnoreCase() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return emptyCollection(this);
          return addIgnoreCaseAlgorithm(this, (x, a) => a.some((n) => x.indexOf(n) === 0), set, maxString);
        }
        anyOf() {
          const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          let compare = this._cmp;
          try {
            set.sort(compare);
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          if (set.length === 0)
            return emptyCollection(this);
          const c = new this.Collection(this, () => createRange(set[0], set[set.length - 1]));
          c._ondirectionchange = (direction) => {
            compare = direction === "next" ? this._ascending : this._descending;
            set.sort(compare);
          };
          let i = 0;
          c._addAlgorithm((cursor, advance, resolve) => {
            const key = cursor.key;
            while (compare(key, set[i]) > 0) {
              ++i;
              if (i === set.length) {
                advance(resolve);
                return false;
              }
            }
            if (compare(key, set[i]) === 0) {
              return true;
            } else {
              advance(() => {
                cursor.continue(set[i]);
              });
              return false;
            }
          });
          return c;
        }
        notEqual(value) {
          return this.inAnyRange([[minKey, value], [value, this.db._maxKey]], { includeLowers: false, includeUppers: false });
        }
        noneOf() {
          const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return new this.Collection(this);
          try {
            set.sort(this._ascending);
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          const ranges = set.reduce((res, val) => res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]], null);
          ranges.push([set[set.length - 1], this.db._maxKey]);
          return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
        }
        inAnyRange(ranges, options) {
          const cmp2 = this._cmp, ascending = this._ascending, descending = this._descending, min = this._min, max = this._max;
          if (ranges.length === 0)
            return emptyCollection(this);
          if (!ranges.every((range) => range[0] !== void 0 && range[1] !== void 0 && ascending(range[0], range[1]) <= 0)) {
            return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
          }
          const includeLowers = !options || options.includeLowers !== false;
          const includeUppers = options && options.includeUppers === true;
          function addRange2(ranges2, newRange) {
            let i = 0, l = ranges2.length;
            for (; i < l; ++i) {
              const range = ranges2[i];
              if (cmp2(newRange[0], range[1]) < 0 && cmp2(newRange[1], range[0]) > 0) {
                range[0] = min(range[0], newRange[0]);
                range[1] = max(range[1], newRange[1]);
                break;
              }
            }
            if (i === l)
              ranges2.push(newRange);
            return ranges2;
          }
          let sortDirection = ascending;
          function rangeSorter(a, b) {
            return sortDirection(a[0], b[0]);
          }
          let set;
          try {
            set = ranges.reduce(addRange2, []);
            set.sort(rangeSorter);
          } catch (ex) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          let rangePos = 0;
          const keyIsBeyondCurrentEntry = includeUppers ? (key) => ascending(key, set[rangePos][1]) > 0 : (key) => ascending(key, set[rangePos][1]) >= 0;
          const keyIsBeforeCurrentEntry = includeLowers ? (key) => descending(key, set[rangePos][0]) > 0 : (key) => descending(key, set[rangePos][0]) >= 0;
          function keyWithinCurrentRange(key) {
            return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
          }
          let checkKey = keyIsBeyondCurrentEntry;
          const c = new this.Collection(this, () => createRange(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers));
          c._ondirectionchange = (direction) => {
            if (direction === "next") {
              checkKey = keyIsBeyondCurrentEntry;
              sortDirection = ascending;
            } else {
              checkKey = keyIsBeforeCurrentEntry;
              sortDirection = descending;
            }
            set.sort(rangeSorter);
          };
          c._addAlgorithm((cursor, advance, resolve) => {
            var key = cursor.key;
            while (checkKey(key)) {
              ++rangePos;
              if (rangePos === set.length) {
                advance(resolve);
                return false;
              }
            }
            if (keyWithinCurrentRange(key)) {
              return true;
            } else if (this._cmp(key, set[rangePos][1]) === 0 || this._cmp(key, set[rangePos][0]) === 0) {
              return false;
            } else {
              advance(() => {
                if (sortDirection === ascending)
                  cursor.continue(set[rangePos][0]);
                else
                  cursor.continue(set[rangePos][1]);
              });
              return false;
            }
          });
          return c;
        }
        startsWithAnyOf() {
          const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (!set.every((s) => typeof s === "string")) {
            return fail(this, "startsWithAnyOf() only works with strings");
          }
          if (set.length === 0)
            return emptyCollection(this);
          return this.inAnyRange(set.map((str) => [str, str + maxString]));
        }
      };
      DEXIE_STORAGE_MUTATED_EVENT_NAME = "storagemutated";
      STORAGE_MUTATED_DOM_EVENT_NAME = "x-storagemutated-1";
      globalEvents = Events(null, DEXIE_STORAGE_MUTATED_EVENT_NAME);
      Transaction = class {
        _lock() {
          assert(!PSD.global);
          ++this._reculock;
          if (this._reculock === 1 && !PSD.global)
            PSD.lockOwnerFor = this;
          return this;
        }
        _unlock() {
          assert(!PSD.global);
          if (--this._reculock === 0) {
            if (!PSD.global)
              PSD.lockOwnerFor = null;
            while (this._blockedFuncs.length > 0 && !this._locked()) {
              var fnAndPSD = this._blockedFuncs.shift();
              try {
                usePSD(fnAndPSD[1], fnAndPSD[0]);
              } catch (e) {
              }
            }
          }
          return this;
        }
        _locked() {
          return this._reculock && PSD.lockOwnerFor !== this;
        }
        create(idbtrans) {
          if (!this.mode)
            return this;
          const idbdb = this.db.idbdb;
          const dbOpenError = this.db._state.dbOpenError;
          assert(!this.idbtrans);
          if (!idbtrans && !idbdb) {
            switch (dbOpenError && dbOpenError.name) {
              case "DatabaseClosedError":
                throw new exceptions.DatabaseClosed(dbOpenError);
              case "MissingAPIError":
                throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
              default:
                throw new exceptions.OpenFailed(dbOpenError);
            }
          }
          if (!this.active)
            throw new exceptions.TransactionInactive();
          assert(this._completion._state === null);
          idbtrans = this.idbtrans = idbtrans || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : idbdb.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }));
          idbtrans.onerror = wrap((ev) => {
            preventDefault(ev);
            this._reject(idbtrans.error);
          });
          idbtrans.onabort = wrap((ev) => {
            preventDefault(ev);
            this.active && this._reject(new exceptions.Abort(idbtrans.error));
            this.active = false;
            this.on("abort").fire(ev);
          });
          idbtrans.oncomplete = wrap(() => {
            this.active = false;
            this._resolve();
            if ("mutatedParts" in idbtrans) {
              globalEvents.storagemutated.fire(idbtrans["mutatedParts"]);
            }
          });
          return this;
        }
        _promise(mode, fn, bWriteLock) {
          if (mode === "readwrite" && this.mode !== "readwrite")
            return rejection(new exceptions.ReadOnly("Transaction is readonly"));
          if (!this.active)
            return rejection(new exceptions.TransactionInactive());
          if (this._locked()) {
            return new DexiePromise((resolve, reject) => {
              this._blockedFuncs.push([() => {
                this._promise(mode, fn, bWriteLock).then(resolve, reject);
              }, PSD]);
            });
          } else if (bWriteLock) {
            return newScope(() => {
              var p2 = new DexiePromise((resolve, reject) => {
                this._lock();
                const rv = fn(resolve, reject, this);
                if (rv && rv.then)
                  rv.then(resolve, reject);
              });
              p2.finally(() => this._unlock());
              p2._lib = true;
              return p2;
            });
          } else {
            var p = new DexiePromise((resolve, reject) => {
              var rv = fn(resolve, reject, this);
              if (rv && rv.then)
                rv.then(resolve, reject);
            });
            p._lib = true;
            return p;
          }
        }
        _root() {
          return this.parent ? this.parent._root() : this;
        }
        waitFor(promiseLike) {
          var root2 = this._root();
          const promise = DexiePromise.resolve(promiseLike);
          if (root2._waitingFor) {
            root2._waitingFor = root2._waitingFor.then(() => promise);
          } else {
            root2._waitingFor = promise;
            root2._waitingQueue = [];
            var store = root2.idbtrans.objectStore(root2.storeNames[0]);
            (function spin() {
              ++root2._spinCount;
              while (root2._waitingQueue.length)
                root2._waitingQueue.shift()();
              if (root2._waitingFor)
                store.get(-Infinity).onsuccess = spin;
            })();
          }
          var currentWaitPromise = root2._waitingFor;
          return new DexiePromise((resolve, reject) => {
            promise.then((res) => root2._waitingQueue.push(wrap(resolve.bind(null, res))), (err) => root2._waitingQueue.push(wrap(reject.bind(null, err)))).finally(() => {
              if (root2._waitingFor === currentWaitPromise) {
                root2._waitingFor = null;
              }
            });
          });
        }
        abort() {
          if (this.active) {
            this.active = false;
            if (this.idbtrans)
              this.idbtrans.abort();
            this._reject(new exceptions.Abort());
          }
        }
        table(tableName) {
          const memoizedTables = this._memoizedTables || (this._memoizedTables = {});
          if (hasOwn(memoizedTables, tableName))
            return memoizedTables[tableName];
          const tableSchema = this.schema[tableName];
          if (!tableSchema) {
            throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
          }
          const transactionBoundTable = new this.db.Table(tableName, tableSchema, this);
          transactionBoundTable.core = this.db.core.table(tableName);
          memoizedTables[tableName] = transactionBoundTable;
          return transactionBoundTable;
        }
      };
      getMaxKey = (IdbKeyRange) => {
        try {
          IdbKeyRange.only([[]]);
          getMaxKey = () => [[]];
          return [[]];
        } catch (e) {
          getMaxKey = () => maxString;
          return maxString;
        }
      };
      _id_counter = 0;
      Version = class {
        _parseStoresSpec(stores, outSchema) {
          keys(stores).forEach((tableName) => {
            if (stores[tableName] !== null) {
              var indexes = parseIndexSyntax(stores[tableName]);
              var primKey = indexes.shift();
              if (primKey.multi)
                throw new exceptions.Schema("Primary key cannot be multi-valued");
              indexes.forEach((idx) => {
                if (idx.auto)
                  throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                if (!idx.keyPath)
                  throw new exceptions.Schema("Index must have a name and cannot be an empty string");
              });
              outSchema[tableName] = createTableSchema(tableName, primKey, indexes);
            }
          });
        }
        stores(stores) {
          const db = this.db;
          this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;
          const versions = db._versions;
          const storesSpec = {};
          let dbschema = {};
          versions.forEach((version) => {
            extend(storesSpec, version._cfg.storesSource);
            dbschema = version._cfg.dbschema = {};
            version._parseStoresSpec(storesSpec, dbschema);
          });
          db._dbSchema = dbschema;
          removeTablesApi(db, [db._allTables, db, db.Transaction.prototype]);
          setApiOnPlace(db, [db._allTables, db, db.Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
          db._storeNames = keys(dbschema);
          return this;
        }
        upgrade(upgradeFunction) {
          this._cfg.contentUpgrade = promisableChain(this._cfg.contentUpgrade || nop, upgradeFunction);
          return this;
        }
      };
      virtualIndexMiddleware = {
        stack: "dbcore",
        name: "VirtualIndexMiddleware",
        level: 1,
        create: createVirtualIndexMiddleware
      };
      hooksMiddleware = {
        stack: "dbcore",
        name: "HooksMiddleware",
        level: 2,
        create: (downCore) => ({
          ...downCore,
          table(tableName) {
            const downTable = downCore.table(tableName);
            const { primaryKey } = downTable.schema;
            const tableMiddleware = {
              ...downTable,
              mutate(req) {
                const dxTrans = PSD.trans;
                const { deleting, creating, updating } = dxTrans.table(tableName).hook;
                switch (req.type) {
                  case "add":
                    if (creating.fire === nop)
                      break;
                    return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
                  case "put":
                    if (creating.fire === nop && updating.fire === nop)
                      break;
                    return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
                  case "delete":
                    if (deleting.fire === nop)
                      break;
                    return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
                  case "deleteRange":
                    if (deleting.fire === nop)
                      break;
                    return dxTrans._promise("readwrite", () => deleteRange(req), true);
                }
                return downTable.mutate(req);
                function addPutOrDelete(req2) {
                  const dxTrans2 = PSD.trans;
                  const keys2 = req2.keys || getEffectiveKeys(primaryKey, req2);
                  if (!keys2)
                    throw new Error("Keys missing");
                  req2 = req2.type === "add" || req2.type === "put" ? { ...req2, keys: keys2 } : { ...req2 };
                  if (req2.type !== "delete")
                    req2.values = [...req2.values];
                  if (req2.keys)
                    req2.keys = [...req2.keys];
                  return getExistingValues(downTable, req2, keys2).then((existingValues) => {
                    const contexts = keys2.map((key, i) => {
                      const existingValue = existingValues[i];
                      const ctx = { onerror: null, onsuccess: null };
                      if (req2.type === "delete") {
                        deleting.fire.call(ctx, key, existingValue, dxTrans2);
                      } else if (req2.type === "add" || existingValue === void 0) {
                        const generatedPrimaryKey = creating.fire.call(ctx, key, req2.values[i], dxTrans2);
                        if (key == null && generatedPrimaryKey != null) {
                          key = generatedPrimaryKey;
                          req2.keys[i] = key;
                          if (!primaryKey.outbound) {
                            setByKeyPath(req2.values[i], primaryKey.keyPath, key);
                          }
                        }
                      } else {
                        const objectDiff = getObjectDiff(existingValue, req2.values[i]);
                        const additionalChanges = updating.fire.call(ctx, objectDiff, key, existingValue, dxTrans2);
                        if (additionalChanges) {
                          const requestedValue = req2.values[i];
                          Object.keys(additionalChanges).forEach((keyPath) => {
                            if (hasOwn(requestedValue, keyPath)) {
                              requestedValue[keyPath] = additionalChanges[keyPath];
                            } else {
                              setByKeyPath(requestedValue, keyPath, additionalChanges[keyPath]);
                            }
                          });
                        }
                      }
                      return ctx;
                    });
                    return downTable.mutate(req2).then(({ failures, results, numFailures, lastResult }) => {
                      for (let i = 0; i < keys2.length; ++i) {
                        const primKey = results ? results[i] : keys2[i];
                        const ctx = contexts[i];
                        if (primKey == null) {
                          ctx.onerror && ctx.onerror(failures[i]);
                        } else {
                          ctx.onsuccess && ctx.onsuccess(
                            req2.type === "put" && existingValues[i] ? req2.values[i] : primKey
                          );
                        }
                      }
                      return { failures, results, numFailures, lastResult };
                    }).catch((error) => {
                      contexts.forEach((ctx) => ctx.onerror && ctx.onerror(error));
                      return Promise.reject(error);
                    });
                  });
                }
                function deleteRange(req2) {
                  return deleteNextChunk(req2.trans, req2.range, 1e4);
                }
                function deleteNextChunk(trans, range, limit) {
                  return downTable.query({ trans, values: false, query: { index: primaryKey, range }, limit }).then(({ result }) => {
                    return addPutOrDelete({ type: "delete", keys: result, trans }).then((res) => {
                      if (res.numFailures > 0)
                        return Promise.reject(res.failures[0]);
                      if (result.length < limit) {
                        return { failures: [], numFailures: 0, lastResult: void 0 };
                      } else {
                        return deleteNextChunk(trans, { ...range, lower: result[result.length - 1], lowerOpen: true }, limit);
                      }
                    });
                  });
                }
              }
            };
            return tableMiddleware;
          }
        })
      };
      cacheExistingValuesMiddleware = {
        stack: "dbcore",
        level: -1,
        create: (core) => {
          return {
            table: (tableName) => {
              const table = core.table(tableName);
              return {
                ...table,
                getMany: (req) => {
                  if (!req.cache) {
                    return table.getMany(req);
                  }
                  const cachedResult = getFromTransactionCache(req.keys, req.trans["_cache"], req.cache === "clone");
                  if (cachedResult) {
                    return DexiePromise.resolve(cachedResult);
                  }
                  return table.getMany(req).then((res) => {
                    req.trans["_cache"] = {
                      keys: req.keys,
                      values: req.cache === "clone" ? deepClone(res) : res
                    };
                    return res;
                  });
                },
                mutate: (req) => {
                  if (req.type !== "add")
                    req.trans["_cache"] = null;
                  return table.mutate(req);
                }
              };
            }
          };
        }
      };
      RangeSet = function(fromOrTree, to) {
        if (this) {
          extend(this, arguments.length ? { d: 1, from: fromOrTree, to: arguments.length > 1 ? to : fromOrTree } : { d: 0 });
        } else {
          const rv = new RangeSet();
          if (fromOrTree && "d" in fromOrTree) {
            extend(rv, fromOrTree);
          }
          return rv;
        }
      };
      props(RangeSet.prototype, {
        add(rangeSet) {
          mergeRanges(this, rangeSet);
          return this;
        },
        addKey(key) {
          addRange(this, key, key);
          return this;
        },
        addKeys(keys2) {
          keys2.forEach((key) => addRange(this, key, key));
          return this;
        },
        [iteratorSymbol]() {
          return getRangeSetIterator(this);
        }
      });
      observabilityMiddleware = {
        stack: "dbcore",
        level: 0,
        create: (core) => {
          const dbName = core.schema.name;
          const FULL_RANGE = new RangeSet(core.MIN_KEY, core.MAX_KEY);
          return {
            ...core,
            table: (tableName) => {
              const table = core.table(tableName);
              const { schema } = table;
              const { primaryKey } = schema;
              const { extractKey, outbound } = primaryKey;
              const tableClone = {
                ...table,
                mutate: (req) => {
                  const trans = req.trans;
                  const mutatedParts = trans.mutatedParts || (trans.mutatedParts = {});
                  const getRangeSet = (indexName) => {
                    const part = `idb://${dbName}/${tableName}/${indexName}`;
                    return mutatedParts[part] || (mutatedParts[part] = new RangeSet());
                  };
                  const pkRangeSet = getRangeSet("");
                  const delsRangeSet = getRangeSet(":dels");
                  const { type: type2 } = req;
                  let [keys2, newObjs] = req.type === "deleteRange" ? [req.range] : req.type === "delete" ? [req.keys] : req.values.length < 50 ? [[], req.values] : [];
                  const oldCache = req.trans["_cache"];
                  return table.mutate(req).then((res) => {
                    if (isArray(keys2)) {
                      if (type2 !== "delete")
                        keys2 = res.results;
                      pkRangeSet.addKeys(keys2);
                      const oldObjs = getFromTransactionCache(keys2, oldCache);
                      if (!oldObjs && type2 !== "add") {
                        delsRangeSet.addKeys(keys2);
                      }
                      if (oldObjs || newObjs) {
                        trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs);
                      }
                    } else if (keys2) {
                      const range = { from: keys2.lower, to: keys2.upper };
                      delsRangeSet.add(range);
                      pkRangeSet.add(range);
                    } else {
                      pkRangeSet.add(FULL_RANGE);
                      delsRangeSet.add(FULL_RANGE);
                      schema.indexes.forEach((idx) => getRangeSet(idx.name).add(FULL_RANGE));
                    }
                    return res;
                  });
                }
              };
              const getRange = ({ query: { index, range } }) => {
                var _a, _b;
                return [
                  index,
                  new RangeSet((_a = range.lower) !== null && _a !== void 0 ? _a : core.MIN_KEY, (_b = range.upper) !== null && _b !== void 0 ? _b : core.MAX_KEY)
                ];
              };
              const readSubscribers = {
                get: (req) => [primaryKey, new RangeSet(req.key)],
                getMany: (req) => [primaryKey, new RangeSet().addKeys(req.keys)],
                count: getRange,
                query: getRange,
                openCursor: getRange
              };
              keys(readSubscribers).forEach((method2) => {
                tableClone[method2] = function(req) {
                  const { subscr } = PSD;
                  if (subscr) {
                    const getRangeSet = (indexName) => {
                      const part = `idb://${dbName}/${tableName}/${indexName}`;
                      return subscr[part] || (subscr[part] = new RangeSet());
                    };
                    const pkRangeSet = getRangeSet("");
                    const delsRangeSet = getRangeSet(":dels");
                    const [queriedIndex, queriedRanges] = readSubscribers[method2](req);
                    getRangeSet(queriedIndex.name || "").add(queriedRanges);
                    if (!queriedIndex.isPrimaryKey) {
                      if (method2 === "count") {
                        delsRangeSet.add(FULL_RANGE);
                      } else {
                        const keysPromise = method2 === "query" && outbound && req.values && table.query({
                          ...req,
                          values: false
                        });
                        return table[method2].apply(this, arguments).then((res) => {
                          if (method2 === "query") {
                            if (outbound && req.values) {
                              return keysPromise.then(({ result: resultingKeys }) => {
                                pkRangeSet.addKeys(resultingKeys);
                                return res;
                              });
                            }
                            const pKeys = req.values ? res.result.map(extractKey) : res.result;
                            if (req.values) {
                              pkRangeSet.addKeys(pKeys);
                            } else {
                              delsRangeSet.addKeys(pKeys);
                            }
                          } else if (method2 === "openCursor") {
                            const cursor = res;
                            const wantValues = req.values;
                            return cursor && Object.create(cursor, {
                              key: {
                                get() {
                                  delsRangeSet.addKey(cursor.primaryKey);
                                  return cursor.key;
                                }
                              },
                              primaryKey: {
                                get() {
                                  const pkey = cursor.primaryKey;
                                  delsRangeSet.addKey(pkey);
                                  return pkey;
                                }
                              },
                              value: {
                                get() {
                                  wantValues && pkRangeSet.addKey(cursor.primaryKey);
                                  return cursor.value;
                                }
                              }
                            });
                          }
                          return res;
                        });
                      }
                    }
                  }
                  return table[method2].apply(this, arguments);
                };
              });
              return tableClone;
            }
          };
        }
      };
      Dexie$1 = class _Dexie$1 {
        constructor(name, options) {
          this._middlewares = {};
          this.verno = 0;
          const deps = _Dexie$1.dependencies;
          this._options = options = {
            addons: _Dexie$1.addons,
            autoOpen: true,
            indexedDB: deps.indexedDB,
            IDBKeyRange: deps.IDBKeyRange,
            ...options
          };
          this._deps = {
            indexedDB: options.indexedDB,
            IDBKeyRange: options.IDBKeyRange
          };
          const { addons } = options;
          this._dbSchema = {};
          this._versions = [];
          this._storeNames = [];
          this._allTables = {};
          this.idbdb = null;
          this._novip = this;
          const state = {
            dbOpenError: null,
            isBeingOpened: false,
            onReadyBeingFired: null,
            openComplete: false,
            dbReadyResolve: nop,
            dbReadyPromise: null,
            cancelOpen: nop,
            openCanceller: null,
            autoSchema: true,
            PR1398_maxLoop: 3
          };
          state.dbReadyPromise = new DexiePromise((resolve) => {
            state.dbReadyResolve = resolve;
          });
          state.openCanceller = new DexiePromise((_, reject) => {
            state.cancelOpen = reject;
          });
          this._state = state;
          this.name = name;
          this.on = Events(this, "populate", "blocked", "versionchange", "close", { ready: [promisableChain, nop] });
          this.on.ready.subscribe = override(this.on.ready.subscribe, (subscribe) => {
            return (subscriber, bSticky) => {
              _Dexie$1.vip(() => {
                const state2 = this._state;
                if (state2.openComplete) {
                  if (!state2.dbOpenError)
                    DexiePromise.resolve().then(subscriber);
                  if (bSticky)
                    subscribe(subscriber);
                } else if (state2.onReadyBeingFired) {
                  state2.onReadyBeingFired.push(subscriber);
                  if (bSticky)
                    subscribe(subscriber);
                } else {
                  subscribe(subscriber);
                  const db = this;
                  if (!bSticky)
                    subscribe(function unsubscribe() {
                      db.on.ready.unsubscribe(subscriber);
                      db.on.ready.unsubscribe(unsubscribe);
                    });
                }
              });
            };
          });
          this.Collection = createCollectionConstructor(this);
          this.Table = createTableConstructor(this);
          this.Transaction = createTransactionConstructor(this);
          this.Version = createVersionConstructor(this);
          this.WhereClause = createWhereClauseConstructor(this);
          this.on("versionchange", (ev) => {
            if (ev.newVersion > 0)
              console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`);
            else
              console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`);
            this.close();
          });
          this.on("blocked", (ev) => {
            if (!ev.newVersion || ev.newVersion < ev.oldVersion)
              console.warn(`Dexie.delete('${this.name}') was blocked`);
            else
              console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${ev.oldVersion / 10}`);
          });
          this._maxKey = getMaxKey(options.IDBKeyRange);
          this._createTransaction = (mode, storeNames, dbschema, parentTransaction) => new this.Transaction(mode, storeNames, dbschema, this._options.chromeTransactionDurability, parentTransaction);
          this._fireOnBlocked = (ev) => {
            this.on("blocked").fire(ev);
            connections.filter((c) => c.name === this.name && c !== this && !c._state.vcFired).map((c) => c.on("versionchange").fire(ev));
          };
          this.use(virtualIndexMiddleware);
          this.use(hooksMiddleware);
          this.use(observabilityMiddleware);
          this.use(cacheExistingValuesMiddleware);
          this.vip = Object.create(this, { _vip: { value: true } });
          addons.forEach((addon) => addon(this));
        }
        version(versionNumber) {
          if (isNaN(versionNumber) || versionNumber < 0.1)
            throw new exceptions.Type(`Given version is not a positive number`);
          versionNumber = Math.round(versionNumber * 10) / 10;
          if (this.idbdb || this._state.isBeingOpened)
            throw new exceptions.Schema("Cannot add version when database is open");
          this.verno = Math.max(this.verno, versionNumber);
          const versions = this._versions;
          var versionInstance = versions.filter((v) => v._cfg.version === versionNumber)[0];
          if (versionInstance)
            return versionInstance;
          versionInstance = new this.Version(versionNumber);
          versions.push(versionInstance);
          versions.sort(lowerVersionFirst);
          versionInstance.stores({});
          this._state.autoSchema = false;
          return versionInstance;
        }
        _whenReady(fn) {
          return this.idbdb && (this._state.openComplete || PSD.letThrough || this._vip) ? fn() : new DexiePromise((resolve, reject) => {
            if (this._state.openComplete) {
              return reject(new exceptions.DatabaseClosed(this._state.dbOpenError));
            }
            if (!this._state.isBeingOpened) {
              if (!this._options.autoOpen) {
                reject(new exceptions.DatabaseClosed());
                return;
              }
              this.open().catch(nop);
            }
            this._state.dbReadyPromise.then(resolve, reject);
          }).then(fn);
        }
        use({ stack, create, level, name }) {
          if (name)
            this.unuse({ stack, name });
          const middlewares = this._middlewares[stack] || (this._middlewares[stack] = []);
          middlewares.push({ stack, create, level: level == null ? 10 : level, name });
          middlewares.sort((a, b) => a.level - b.level);
          return this;
        }
        unuse({ stack, name, create }) {
          if (stack && this._middlewares[stack]) {
            this._middlewares[stack] = this._middlewares[stack].filter((mw) => create ? mw.create !== create : name ? mw.name !== name : false);
          }
          return this;
        }
        open() {
          return dexieOpen(this);
        }
        _close() {
          const state = this._state;
          const idx = connections.indexOf(this);
          if (idx >= 0)
            connections.splice(idx, 1);
          if (this.idbdb) {
            try {
              this.idbdb.close();
            } catch (e) {
            }
            this._novip.idbdb = null;
          }
          state.dbReadyPromise = new DexiePromise((resolve) => {
            state.dbReadyResolve = resolve;
          });
          state.openCanceller = new DexiePromise((_, reject) => {
            state.cancelOpen = reject;
          });
        }
        close() {
          this._close();
          const state = this._state;
          this._options.autoOpen = false;
          state.dbOpenError = new exceptions.DatabaseClosed();
          if (state.isBeingOpened)
            state.cancelOpen(state.dbOpenError);
        }
        delete() {
          const hasArguments = arguments.length > 0;
          const state = this._state;
          return new DexiePromise((resolve, reject) => {
            const doDelete = () => {
              this.close();
              var req = this._deps.indexedDB.deleteDatabase(this.name);
              req.onsuccess = wrap(() => {
                _onDatabaseDeleted(this._deps, this.name);
                resolve();
              });
              req.onerror = eventRejectHandler(reject);
              req.onblocked = this._fireOnBlocked;
            };
            if (hasArguments)
              throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
            if (state.isBeingOpened) {
              state.dbReadyPromise.then(doDelete);
            } else {
              doDelete();
            }
          });
        }
        backendDB() {
          return this.idbdb;
        }
        isOpen() {
          return this.idbdb !== null;
        }
        hasBeenClosed() {
          const dbOpenError = this._state.dbOpenError;
          return dbOpenError && dbOpenError.name === "DatabaseClosed";
        }
        hasFailed() {
          return this._state.dbOpenError !== null;
        }
        dynamicallyOpened() {
          return this._state.autoSchema;
        }
        get tables() {
          return keys(this._allTables).map((name) => this._allTables[name]);
        }
        transaction() {
          const args = extractTransactionArgs.apply(this, arguments);
          return this._transaction.apply(this, args);
        }
        _transaction(mode, tables, scopeFunc) {
          let parentTransaction = PSD.trans;
          if (!parentTransaction || parentTransaction.db !== this || mode.indexOf("!") !== -1)
            parentTransaction = null;
          const onlyIfCompatible = mode.indexOf("?") !== -1;
          mode = mode.replace("!", "").replace("?", "");
          let idbMode, storeNames;
          try {
            storeNames = tables.map((table) => {
              var storeName = table instanceof this.Table ? table.name : table;
              if (typeof storeName !== "string")
                throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
              return storeName;
            });
            if (mode == "r" || mode === READONLY)
              idbMode = READONLY;
            else if (mode == "rw" || mode == READWRITE)
              idbMode = READWRITE;
            else
              throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
            if (parentTransaction) {
              if (parentTransaction.mode === READONLY && idbMode === READWRITE) {
                if (onlyIfCompatible) {
                  parentTransaction = null;
                } else
                  throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
              }
              if (parentTransaction) {
                storeNames.forEach((storeName) => {
                  if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                    if (onlyIfCompatible) {
                      parentTransaction = null;
                    } else
                      throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
                  }
                });
              }
              if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
                parentTransaction = null;
              }
            }
          } catch (e) {
            return parentTransaction ? parentTransaction._promise(null, (_, reject) => {
              reject(e);
            }) : rejection(e);
          }
          const enterTransaction = enterTransactionScope.bind(null, this, idbMode, storeNames, parentTransaction, scopeFunc);
          return parentTransaction ? parentTransaction._promise(idbMode, enterTransaction, "lock") : PSD.trans ? usePSD(PSD.transless, () => this._whenReady(enterTransaction)) : this._whenReady(enterTransaction);
        }
        table(tableName) {
          if (!hasOwn(this._allTables, tableName)) {
            throw new exceptions.InvalidTable(`Table ${tableName} does not exist`);
          }
          return this._allTables[tableName];
        }
      };
      symbolObservable = typeof Symbol !== "undefined" && "observable" in Symbol ? Symbol.observable : "@@observable";
      Observable = class {
        constructor(subscribe) {
          this._subscribe = subscribe;
        }
        subscribe(x, error, complete) {
          return this._subscribe(!x || typeof x === "function" ? { next: x, error, complete } : x);
        }
        [symbolObservable]() {
          return this;
        }
      };
      try {
        domDeps = {
          indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
          IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
        };
      } catch (e) {
        domDeps = { indexedDB: null, IDBKeyRange: null };
      }
      Dexie = Dexie$1;
      props(Dexie, {
        ...fullNameExceptions,
        delete(databaseName) {
          const db = new Dexie(databaseName, { addons: [] });
          return db.delete();
        },
        exists(name) {
          return new Dexie(name, { addons: [] }).open().then((db) => {
            db.close();
            return true;
          }).catch("NoSuchDatabaseError", () => false);
        },
        getDatabaseNames(cb) {
          try {
            return getDatabaseNames(Dexie.dependencies).then(cb);
          } catch (_a) {
            return rejection(new exceptions.MissingAPI());
          }
        },
        defineClass() {
          function Class(content) {
            extend(this, content);
          }
          return Class;
        },
        ignoreTransaction(scopeFunc) {
          return PSD.trans ? usePSD(PSD.transless, scopeFunc) : scopeFunc();
        },
        vip,
        async: function(generatorFn) {
          return function() {
            try {
              var rv = awaitIterator(generatorFn.apply(this, arguments));
              if (!rv || typeof rv.then !== "function")
                return DexiePromise.resolve(rv);
              return rv;
            } catch (e) {
              return rejection(e);
            }
          };
        },
        spawn: function(generatorFn, args, thiz) {
          try {
            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== "function")
              return DexiePromise.resolve(rv);
            return rv;
          } catch (e) {
            return rejection(e);
          }
        },
        currentTransaction: {
          get: () => PSD.trans || null
        },
        waitFor: function(promiseOrFunction, optionalTimeout) {
          const promise = DexiePromise.resolve(typeof promiseOrFunction === "function" ? Dexie.ignoreTransaction(promiseOrFunction) : promiseOrFunction).timeout(optionalTimeout || 6e4);
          return PSD.trans ? PSD.trans.waitFor(promise) : promise;
        },
        Promise: DexiePromise,
        debug: {
          get: () => debug,
          set: (value) => {
            setDebug(value, value === "dexie" ? () => true : dexieStackFrameFilter);
          }
        },
        derive,
        extend,
        props,
        override,
        Events,
        on: globalEvents,
        liveQuery,
        extendObservabilitySet,
        getByKeyPath,
        setByKeyPath,
        delByKeyPath,
        shallowClone,
        deepClone,
        getObjectDiff,
        cmp,
        asap: asap$1,
        minKey,
        addons: [],
        connections,
        errnames,
        dependencies: domDeps,
        semVer: DEXIE_VERSION,
        version: DEXIE_VERSION.split(".").map((n) => parseInt(n)).reduce((p, c, i) => p + c / Math.pow(10, i * 2))
      });
      Dexie.maxKey = getMaxKey(Dexie.dependencies.IDBKeyRange);
      if (typeof dispatchEvent !== "undefined" && typeof addEventListener !== "undefined") {
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (updatedParts) => {
          if (!propagatingLocally) {
            let event;
            if (isIEOrEdge) {
              event = document.createEvent("CustomEvent");
              event.initCustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, true, true, updatedParts);
            } else {
              event = new CustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, {
                detail: updatedParts
              });
            }
            propagatingLocally = true;
            dispatchEvent(event);
            propagatingLocally = false;
          }
        });
        addEventListener(STORAGE_MUTATED_DOM_EVENT_NAME, ({ detail }) => {
          if (!propagatingLocally) {
            propagateLocally(detail);
          }
        });
      }
      propagatingLocally = false;
      if (typeof BroadcastChannel !== "undefined") {
        const bc = new BroadcastChannel(STORAGE_MUTATED_DOM_EVENT_NAME);
        if (typeof bc.unref === "function") {
          bc.unref();
        }
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (changedParts) => {
          if (!propagatingLocally) {
            bc.postMessage(changedParts);
          }
        });
        bc.onmessage = (ev) => {
          if (ev.data)
            propagateLocally(ev.data);
        };
      } else if (typeof self !== "undefined" && typeof navigator !== "undefined") {
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (changedParts) => {
          try {
            if (!propagatingLocally) {
              if (typeof localStorage !== "undefined") {
                localStorage.setItem(STORAGE_MUTATED_DOM_EVENT_NAME, JSON.stringify({
                  trig: Math.random(),
                  changedParts
                }));
              }
              if (typeof self["clients"] === "object") {
                [...self["clients"].matchAll({ includeUncontrolled: true })].forEach((client) => client.postMessage({
                  type: STORAGE_MUTATED_DOM_EVENT_NAME,
                  changedParts
                }));
              }
            }
          } catch (_a) {
          }
        });
        if (typeof addEventListener !== "undefined") {
          addEventListener("storage", (ev) => {
            if (ev.key === STORAGE_MUTATED_DOM_EVENT_NAME) {
              const data = JSON.parse(ev.newValue);
              if (data)
                propagateLocally(data.changedParts);
            }
          });
        }
        const swContainer = self.document && navigator.serviceWorker;
        if (swContainer) {
          swContainer.addEventListener("message", propagateMessageLocally);
        }
      }
      DexiePromise.rejectionMapper = mapError;
      setDebug(debug, dexieStackFrameFilter);
    }
  });

  // shared/js/shared-utils/parse-user-agent-string.js
  var require_parse_user_agent_string = __commonJS({
    "shared/js/shared-utils/parse-user-agent-string.js"(exports2, module2) {
      "use strict";
      module2.exports = (uaString) => {
        if (!globalThis.navigator)
          return {};
        if (!uaString)
          uaString = globalThis.navigator.userAgent;
        let browser5;
        let version;
        try {
          let parsedUaParts = uaString.match(/(Firefox|Chrome|Edg)\/([0-9]+)/);
          const isEdge = /(Edge?)\/([0-9]+)/;
          const isOpera = /(OPR)\/([0-9]+)/;
          if (uaString.match(isEdge)) {
            parsedUaParts = uaString.match(isEdge);
          } else if (uaString.match(isOpera)) {
            parsedUaParts = uaString.match(isOpera);
            parsedUaParts[1] = "Opera";
          }
          browser5 = parsedUaParts[1];
          version = parsedUaParts[2];
          if (globalThis.navigator.brave) {
            browser5 = "Brave";
          }
        } catch (e) {
          browser5 = version = "";
        }
        let os = "o";
        if (globalThis.navigator.userAgent.indexOf("Windows") !== -1)
          os = "w";
        if (globalThis.navigator.userAgent.indexOf("Mac") !== -1)
          os = "m";
        if (globalThis.navigator.userAgent.indexOf("Linux") !== -1)
          os = "l";
        return {
          os,
          browser: browser5,
          version
        };
      };
    }
  });

  // shared/data/constants.js
  var require_constants = __commonJS({
    "shared/data/constants.js"(exports2, module2) {
      "use strict";
      var parseUserAgentString2 = require_parse_user_agent_string();
      var browserInfo2 = parseUserAgentString2();
      var trackerBlockingEndpointBase = "https://staticcdn.duckduckgo.com/trackerblocking";
      function isMV3() {
        if (typeof chrome !== "undefined") {
          return chrome?.runtime.getManifest().manifest_version === 3;
        }
        return false;
      }
      function getConfigFileName() {
        let browserName = browserInfo2?.browser?.toLowerCase() || "";
        if (!["chrome", "firefox", "brave", "edg"].includes(browserName)) {
          browserName = "";
        } else {
          browserName = "-" + browserName + (isMV3() ? "mv3" : "");
        }
        return `${trackerBlockingEndpointBase}/config/v4/extension${browserName}-config.json`;
      }
      function getTDSEndpoint(version) {
        const thisPlatform = `extension${isMV3() ? "-mv3" : ""}`;
        return `${trackerBlockingEndpointBase}/${version}/${thisPlatform}-tds.json`;
      }
      module2.exports = {
        displayCategories: ["Analytics", "Advertising", "Social Network", "Content Delivery", "Embedded Content"],
        feedbackUrl: "https://duckduckgo.com/feedback.js?type=extension-feedback",
        tosdrMessages: {
          A: "Good",
          B: "Mixed",
          C: "Poor",
          D: "Poor",
          E: "Poor",
          good: "Good",
          bad: "Poor",
          unknown: "Unknown",
          mixed: "Mixed"
        },
        httpsService: "https://duckduckgo.com/smarter_encryption.js",
        duckDuckGoSerpHostname: "duckduckgo.com",
        httpsMessages: {
          secure: "Encrypted Connection",
          upgraded: "Forced Encryption",
          none: "Unencrypted Connection"
        },
        /**
         * Major tracking networks data:
         * percent of the top 1 million sites a tracking network has been seen on.
         * see: https://webtransparency.cs.princeton.edu/webcensus/
         */
        majorTrackingNetworks: {
          google: 84,
          facebook: 36,
          twitter: 16,
          amazon: 14,
          appnexus: 10,
          oracle: 10,
          mediamath: 9,
          oath: 9,
          maxcdn: 7,
          automattic: 7
        },
        /*
         * Mapping entity names to CSS class name for popup icons
         */
        entityIconMapping: {
          "Google LLC": "google",
          "Facebook, Inc.": "facebook",
          "Twitter, Inc.": "twitter",
          "Amazon Technologies, Inc.": "amazon",
          "AppNexus, Inc.": "appnexus",
          "MediaMath, Inc.": "mediamath",
          "StackPath, LLC": "maxcdn",
          "Automattic, Inc.": "automattic",
          "Adobe Inc.": "adobe",
          "Quantcast Corporation": "quantcast",
          "The Nielsen Company": "nielsen"
        },
        httpsDBName: "https",
        httpsLists: [
          {
            type: "upgrade bloom filter",
            name: "httpsUpgradeBloomFilter",
            url: "https://staticcdn.duckduckgo.com/https/https-bloom.json"
          },
          {
            type: "don't upgrade bloom filter",
            name: "httpsDontUpgradeBloomFilters",
            url: "https://staticcdn.duckduckgo.com/https/negative-https-bloom.json"
          },
          {
            type: "upgrade safelist",
            name: "httpsUpgradeList",
            url: "https://staticcdn.duckduckgo.com/https/negative-https-allowlist.json"
          },
          {
            type: "don't upgrade safelist",
            name: "httpsDontUpgradeList",
            url: "https://staticcdn.duckduckgo.com/https/https-allowlist.json"
          }
        ],
        tdsLists: [
          {
            name: "surrogates",
            url: "/data/surrogates.txt",
            format: "text",
            source: "local"
          },
          {
            name: "tds",
            url: getTDSEndpoint("v6/current"),
            format: "json",
            source: "external",
            channels: {
              live: getTDSEndpoint("v6/current"),
              next: getTDSEndpoint("v6/next"),
              beta: getTDSEndpoint("beta")
            }
          },
          {
            name: "config",
            url: getConfigFileName(),
            format: "json",
            source: "external"
          }
        ],
        httpsErrorCodes: {
          "net::ERR_CONNECTION_REFUSED": 1,
          "net::ERR_ABORTED": 2,
          "net::ERR_SSL_PROTOCOL_ERROR": 3,
          "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH": 4,
          "net::ERR_NAME_NOT_RESOLVED": 5,
          NS_ERROR_CONNECTION_REFUSED: 6,
          NS_ERROR_UNKNOWN_HOST: 7,
          "An additional policy constraint failed when validating this certificate.": 8,
          "Unable to communicate securely with peer: requested domain name does not match the server\u2019s certificate.": 9,
          "Cannot communicate securely with peer: no common encryption algorithm(s).": 10,
          "SSL received a record that exceeded the maximum permissible length.": 11,
          "The certificate is not trusted because it is self-signed.": 12,
          downgrade_redirect_loop: 13
        },
        iconPaths: (
          /** @type {const} */
          {
            regular: "/img/icon_browser_action.png",
            withSpecialState: "/img/icon_browser_action_special.png"
          }
        ),
        platform: {
          name: "extension"
        },
        trackerStats: (
          /** @type {const} */
          {
            allowedOrigin: "https://duckduckgo.com",
            allowedPathname: "ntp-tracker-stats.html",
            redirectTarget: "html/tracker-stats.html",
            clientPortName: "newtab-tracker-stats",
            /** @type {ReadonlyArray<string>} */
            excludedCompanies: ["ExoClick"],
            events: {
              incoming: {
                newTabPage_heartbeat: "newTabPage_heartbeat"
              },
              outgoing: {
                newTabPage_data: "newTabPage_data",
                newTabPage_disconnect: "newTabPage_disconnect"
              }
            }
          }
        )
      };
    }
  });

  // shared/data/bundled/extension-config.json
  var require_extension_config = __commonJS({
    "shared/data/bundled/extension-config.json"(exports2, module2) {
      module2.exports = {
        readme: "https://github.com/duckduckgo/privacy-configuration",
        version: 1701873376184,
        features: {
          adClickAttribution: {
            readme: "https://help.duckduckgo.com/duckduckgo-help-pages/privacy/web-tracking-protections/#3rd-party-tracker-loading-protection",
            state: "enabled",
            exceptions: [],
            settings: {
              linkFormats: [
                {
                  url: "duckduckgo.com/y.js",
                  adDomainParameterName: "ad_domain",
                  desc: "SERP Ads"
                },
                {
                  url: "www.search-company.site/y.js",
                  adDomainParameterName: "ad_domain",
                  desc: "Test Domain"
                },
                {
                  url: "www.search-company.example/y.js",
                  adDomainParameterName: "ad_domain",
                  desc: "Test Domain"
                },
                {
                  url: "links.duckduckgo.com/m.js",
                  adDomainParameterName: "ad_domain",
                  desc: "Shopping Ads"
                },
                {
                  url: "www.search-company.site/m.js",
                  adDomainParameterName: "ad_domain",
                  desc: "Test Domain"
                },
                {
                  url: "www.search-company.example/m.js",
                  adDomainParameterName: "ad_domain",
                  desc: "Test Domain"
                }
              ],
              allowlist: [
                {
                  blocklistEntry: "bing.com",
                  host: "bat.bing.com"
                },
                {
                  blocklistEntry: "ad-company.site",
                  host: "convert.ad-company.site"
                },
                {
                  blocklistEntry: "ad-company.example",
                  host: "convert.ad-company.example"
                }
              ],
              navigationExpiration: 1800,
              totalExpiration: 604800,
              heuristicDetection: "enabled",
              domainDetection: "enabled"
            },
            hash: "b813ade8472a097ffbd43a3331116fe1"
          },
          ampLinks: {
            exceptions: [
              {
                domain: "freecodecamp.org"
              },
              {
                domain: "www.audiosciencereview.com"
              },
              {
                domain: "golf.com"
              },
              {
                domain: "thehustle.co"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              deepExtractionEnabled: true,
              deepExtractionTimeout: 1500,
              linkFormats: [
                "^https?:\\/\\/(?:w{3}\\.)?google\\.\\S{2,}\\/amp\\/s\\/(\\S+)$",
                "^https?:\\/\\/\\S+ampproject\\.org\\/\\S\\/s\\/(\\S+)$"
              ],
              keywords: [
                "=amp",
                "&amp",
                "amp&",
                "/amp",
                "amp/",
                ".amp",
                "amp.",
                "%amp",
                "amp%",
                "_amp",
                "amp_",
                "?amp"
              ]
            },
            state: "enabled",
            hash: "e32a761ca9287a276d43a5cc431d9f57"
          },
          androidBrowserConfig: {
            exceptions: [],
            state: "disabled",
            hash: "728493ef7a1488e4781656d3f9db84aa"
          },
          autoconsent: {
            exceptions: [
              {
                domain: "allocine.fr"
              },
              {
                domain: "bild.de"
              },
              {
                domain: "derstandard.de"
              },
              {
                domain: "duden.de"
              },
              {
                domain: "ksta.de"
              },
              {
                domain: "motherdenim.com"
              },
              {
                domain: "nationalgrid.co.uk"
              },
              {
                domain: "t-online.de"
              },
              {
                domain: "tomsguide.com"
              },
              {
                domain: "welt.de"
              },
              {
                domain: "zeitraum-moebel.de"
              },
              {
                domain: "mathebibel.de"
              },
              {
                domain: "focus.de"
              },
              {
                domain: "computerbild.de"
              },
              {
                domain: "techtarget.com"
              },
              {
                domain: "n-tv.de"
              },
              {
                domain: "spiegel.de"
              },
              {
                domain: "derstandard.at"
              },
              {
                domain: "concursolutions.com"
              },
              {
                domain: "asus.com"
              },
              {
                domain: "swm.de"
              },
              {
                domain: "heise.de"
              },
              {
                domain: "voici.fr"
              },
              {
                domain: "tfl.gov.uk"
              },
              {
                domain: "corporatefinanceinstitute.com"
              },
              {
                domain: "kicker.de"
              },
              {
                domain: "epojisteni.cz"
              },
              {
                domain: "nhm.ac.uk"
              },
              {
                domain: "virginmoney.com"
              },
              {
                domain: "shellenergy.co.uk"
              },
              {
                domain: "castorama.pl"
              },
              {
                domain: "bugatti-fashion.com"
              },
              {
                domain: "hl.co.uk"
              },
              {
                domain: "jesus.de"
              },
              {
                domain: "linux-praxis.de"
              },
              {
                domain: "gfds.de"
              },
              {
                domain: "motorsport.com"
              },
              {
                domain: "paypal.com"
              },
              {
                domain: "elmundotoday.com"
              },
              {
                domain: "yum.com"
              },
              {
                domain: "capital.fr"
              },
              {
                domain: "metro.co.uk"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              disabledCMPs: [
                "generic-cosmetic"
              ]
            },
            state: "disabled",
            hash: "ea5120d5f805be49ae1f13e59ed84b59"
          },
          autofill: {
            exceptions: [
              {
                domain: "roll20.net"
              }
            ],
            state: "enabled",
            hash: "b1ae580a636957bcbe90d16aa92c40bd"
          },
          clickToLoad: {
            exceptions: [
              {
                domain: "beatsense.com"
              },
              {
                domain: "discogs.com"
              },
              {
                domain: "duckduckgo.com"
              },
              {
                domain: "khanacademy.org"
              },
              {
                domain: "last.fm"
              },
              {
                domain: "turntable.fm"
              },
              {
                domain: "www.google.ad"
              },
              {
                domain: "www.google.ae"
              },
              {
                domain: "www.google.al"
              },
              {
                domain: "www.google.am"
              },
              {
                domain: "www.google.as"
              },
              {
                domain: "www.google.at"
              },
              {
                domain: "www.google.az"
              },
              {
                domain: "www.google.ba"
              },
              {
                domain: "www.google.be"
              },
              {
                domain: "www.google.bf"
              },
              {
                domain: "www.google.bg"
              },
              {
                domain: "www.google.bi"
              },
              {
                domain: "www.google.bj"
              },
              {
                domain: "www.google.bs"
              },
              {
                domain: "www.google.bt"
              },
              {
                domain: "www.google.by"
              },
              {
                domain: "www.google.ca"
              },
              {
                domain: "www.google.cat"
              },
              {
                domain: "www.google.cd"
              },
              {
                domain: "www.google.cf"
              },
              {
                domain: "www.google.cg"
              },
              {
                domain: "www.google.ch"
              },
              {
                domain: "www.google.ci"
              },
              {
                domain: "www.google.cl"
              },
              {
                domain: "www.google.cm"
              },
              {
                domain: "www.google.cn"
              },
              {
                domain: "www.google.co.ao"
              },
              {
                domain: "www.google.co.bw"
              },
              {
                domain: "www.google.co.ck"
              },
              {
                domain: "www.google.co.cr"
              },
              {
                domain: "www.google.co.id"
              },
              {
                domain: "www.google.co.il"
              },
              {
                domain: "www.google.co.in"
              },
              {
                domain: "www.google.co.jp"
              },
              {
                domain: "www.google.co.ke"
              },
              {
                domain: "www.google.co.kr"
              },
              {
                domain: "www.google.co.ls"
              },
              {
                domain: "www.google.co.ma"
              },
              {
                domain: "www.google.co.mz"
              },
              {
                domain: "www.google.co.nz"
              },
              {
                domain: "www.google.co.th"
              },
              {
                domain: "www.google.co.tz"
              },
              {
                domain: "www.google.co.ug"
              },
              {
                domain: "www.google.co.uk"
              },
              {
                domain: "www.google.co.uz"
              },
              {
                domain: "www.google.co.ve"
              },
              {
                domain: "www.google.co.vi"
              },
              {
                domain: "www.google.co.za"
              },
              {
                domain: "www.google.co.zm"
              },
              {
                domain: "www.google.co.zw"
              },
              {
                domain: "www.google.com"
              },
              {
                domain: "www.google.com.af"
              },
              {
                domain: "www.google.com.ag"
              },
              {
                domain: "www.google.com.ai"
              },
              {
                domain: "www.google.com.ar"
              },
              {
                domain: "www.google.com.au"
              },
              {
                domain: "www.google.com.bd"
              },
              {
                domain: "www.google.com.bh"
              },
              {
                domain: "www.google.com.bn"
              },
              {
                domain: "www.google.com.bo"
              },
              {
                domain: "www.google.com.br"
              },
              {
                domain: "www.google.com.bz"
              },
              {
                domain: "www.google.com.co"
              },
              {
                domain: "www.google.com.cu"
              },
              {
                domain: "www.google.com.cy"
              },
              {
                domain: "www.google.com.do"
              },
              {
                domain: "www.google.com.ec"
              },
              {
                domain: "www.google.com.eg"
              },
              {
                domain: "www.google.com.et"
              },
              {
                domain: "www.google.com.fj"
              },
              {
                domain: "www.google.com.gh"
              },
              {
                domain: "www.google.com.gi"
              },
              {
                domain: "www.google.com.gt"
              },
              {
                domain: "www.google.com.hk"
              },
              {
                domain: "www.google.com.jm"
              },
              {
                domain: "www.google.com.kh"
              },
              {
                domain: "www.google.com.kw"
              },
              {
                domain: "www.google.com.lb"
              },
              {
                domain: "www.google.com.ly"
              },
              {
                domain: "www.google.com.mm"
              },
              {
                domain: "www.google.com.mt"
              },
              {
                domain: "www.google.com.mx"
              },
              {
                domain: "www.google.com.my"
              },
              {
                domain: "www.google.com.na"
              },
              {
                domain: "www.google.com.ng"
              },
              {
                domain: "www.google.com.ni"
              },
              {
                domain: "www.google.com.np"
              },
              {
                domain: "www.google.com.om"
              },
              {
                domain: "www.google.com.pa"
              },
              {
                domain: "www.google.com.pe"
              },
              {
                domain: "www.google.com.pg"
              },
              {
                domain: "www.google.com.ph"
              },
              {
                domain: "www.google.com.pk"
              },
              {
                domain: "www.google.com.pr"
              },
              {
                domain: "www.google.com.py"
              },
              {
                domain: "www.google.com.qa"
              },
              {
                domain: "www.google.com.sa"
              },
              {
                domain: "www.google.com.sb"
              },
              {
                domain: "www.google.com.sg"
              },
              {
                domain: "www.google.com.sl"
              },
              {
                domain: "www.google.com.sv"
              },
              {
                domain: "www.google.com.tj"
              },
              {
                domain: "www.google.com.tr"
              },
              {
                domain: "www.google.com.tw"
              },
              {
                domain: "www.google.com.ua"
              },
              {
                domain: "www.google.com.uy"
              },
              {
                domain: "www.google.com.vc"
              },
              {
                domain: "www.google.com.vn"
              },
              {
                domain: "www.google.cv"
              },
              {
                domain: "www.google.cz"
              },
              {
                domain: "www.google.de"
              },
              {
                domain: "www.google.dj"
              },
              {
                domain: "www.google.dk"
              },
              {
                domain: "www.google.dm"
              },
              {
                domain: "www.google.dz"
              },
              {
                domain: "www.google.ee"
              },
              {
                domain: "www.google.es"
              },
              {
                domain: "www.google.fi"
              },
              {
                domain: "www.google.fm"
              },
              {
                domain: "www.google.fr"
              },
              {
                domain: "www.google.ga"
              },
              {
                domain: "www.google.ge"
              },
              {
                domain: "www.google.gg"
              },
              {
                domain: "www.google.gl"
              },
              {
                domain: "www.google.gm"
              },
              {
                domain: "www.google.gr"
              },
              {
                domain: "www.google.gy"
              },
              {
                domain: "www.google.hn"
              },
              {
                domain: "www.google.hr"
              },
              {
                domain: "www.google.ht"
              },
              {
                domain: "www.google.hu"
              },
              {
                domain: "www.google.ie"
              },
              {
                domain: "www.google.im"
              },
              {
                domain: "www.google.iq"
              },
              {
                domain: "www.google.is"
              },
              {
                domain: "www.google.it"
              },
              {
                domain: "www.google.je"
              },
              {
                domain: "www.google.jo"
              },
              {
                domain: "www.google.kg"
              },
              {
                domain: "www.google.ki"
              },
              {
                domain: "www.google.kz"
              },
              {
                domain: "www.google.la"
              },
              {
                domain: "www.google.li"
              },
              {
                domain: "www.google.lk"
              },
              {
                domain: "www.google.lt"
              },
              {
                domain: "www.google.lu"
              },
              {
                domain: "www.google.lv"
              },
              {
                domain: "www.google.md"
              },
              {
                domain: "www.google.me"
              },
              {
                domain: "www.google.mg"
              },
              {
                domain: "www.google.mk"
              },
              {
                domain: "www.google.ml"
              },
              {
                domain: "www.google.mn"
              },
              {
                domain: "www.google.ms"
              },
              {
                domain: "www.google.mu"
              },
              {
                domain: "www.google.mv"
              },
              {
                domain: "www.google.mw"
              },
              {
                domain: "www.google.ne"
              },
              {
                domain: "www.google.nl"
              },
              {
                domain: "www.google.no"
              },
              {
                domain: "www.google.nr"
              },
              {
                domain: "www.google.nu"
              },
              {
                domain: "www.google.pl"
              },
              {
                domain: "www.google.pn"
              },
              {
                domain: "www.google.ps"
              },
              {
                domain: "www.google.pt"
              },
              {
                domain: "www.google.ro"
              },
              {
                domain: "www.google.rs"
              },
              {
                domain: "www.google.ru"
              },
              {
                domain: "www.google.rw"
              },
              {
                domain: "www.google.sc"
              },
              {
                domain: "www.google.se"
              },
              {
                domain: "www.google.sh"
              },
              {
                domain: "www.google.si"
              },
              {
                domain: "www.google.sk"
              },
              {
                domain: "www.google.sm"
              },
              {
                domain: "www.google.sn"
              },
              {
                domain: "www.google.so"
              },
              {
                domain: "www.google.sr"
              },
              {
                domain: "www.google.st"
              },
              {
                domain: "www.google.td"
              },
              {
                domain: "www.google.tg"
              },
              {
                domain: "www.google.tl"
              },
              {
                domain: "www.google.tm"
              },
              {
                domain: "www.google.tn"
              },
              {
                domain: "www.google.to"
              },
              {
                domain: "www.google.tt"
              },
              {
                domain: "www.google.vg"
              },
              {
                domain: "www.google.vu"
              },
              {
                domain: "www.google.ws"
              },
              {
                domain: "freenom.com"
              },
              {
                domain: "isra.org"
              },
              {
                domain: "iamexpat.nl"
              },
              {
                domain: "pocketbook.digital"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              "Facebook, Inc.": {
                ruleActions: [
                  "block-ctl-fb"
                ],
                state: "enabled"
              },
              Youtube: {
                ruleActions: [
                  "block-ctl-yt"
                ],
                state: "disabled"
              }
            },
            state: "enabled",
            minSupportedVersion: "2023.7.7.2",
            hash: "ba049926f6e0d796bffefac055b9950a"
          },
          clickToPlay: {
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              Facebook: {
                clicksBeforeSimpleVersion: 3,
                ruleActions: [
                  "block-ctl-fb"
                ],
                state: "enabled"
              }
            },
            state: "enabled",
            hash: "0636b3fc8f8086febe75124d532f80ce"
          },
          contentBlocking: {
            state: "enabled",
            exceptions: [
              {
                domain: "strava.com"
              },
              {
                domain: "welt.de"
              },
              {
                domain: "optout.aboutads.info"
              },
              {
                domain: "optout.networkadvertising.org"
              },
              {
                domain: "ads.google.com"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            hash: "87175a35f0c4873e8047f4465fbce805"
          },
          cookie: {
            settings: {
              trackerCookie: "enabled",
              nonTrackerCookie: "disabled",
              excludedCookieDomains: [
                {
                  domain: "accounts.google.com",
                  reason: "On some Google sign-in flows, there is an error after entering username and proceeding: 'Your browser has cookies disabled. Make sure that your cookies are enabled and try again.'"
                },
                {
                  domain: "pay.google.com",
                  reason: "After sign-in for Google Pay flows, there is repeated flickering and a loading spinner, preventing the flow from proceeding."
                },
                {
                  domain: "payments.google.com",
                  reason: "After sign-in for Google Pay flows (after flickering is resolved), blocking this causes the loading spinner to spin indefinitely, and the payment flow cannot proceed."
                }
              ],
              firstPartyTrackerCookiePolicy: {
                threshold: 86400,
                maxAge: 86400
              },
              firstPartyCookiePolicy: {
                threshold: 604800,
                maxAge: 604800
              }
            },
            exceptions: [
              {
                domain: "nespresso.com"
              },
              {
                domain: "optout.aboutads.info"
              },
              {
                domain: "optout.networkadvertising.org"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "soundcloud.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            minSupportedVersion: "2022.6.1",
            hash: "65899b03b4571ca0dd6de154794ad32a"
          },
          customUserAgent: {
            settings: {
              omitApplicationSites: [
                {
                  domain: "thingiverse.com"
                },
                {
                  domain: "qubushotel.com"
                },
                {
                  domain: "digid.nl"
                },
                {
                  domain: "intymna.pl"
                },
                {
                  domain: "sme.sk"
                },
                {
                  domain: "tiktok.com"
                },
                {
                  domain: "wykop.pl"
                },
                {
                  domain: "nypost.com"
                },
                {
                  domain: "crunchynihongo.com"
                },
                {
                  domain: "vsp.com"
                },
                {
                  domain: "earth.google.com"
                },
                {
                  domain: "iscorp.com"
                },
                {
                  domain: "marvel.com"
                },
                {
                  domain: "sundancecatalog.com"
                },
                {
                  domain: "localhost"
                },
                {
                  domain: "127.0.0.1"
                },
                {
                  domain: "::1"
                },
                {
                  domain: "livenation.com"
                },
                {
                  domain: "ticketmaster.com"
                }
              ],
              omitVersionSites: [
                {
                  domain: "crunchynihongo.com"
                },
                {
                  domain: "earth.google.com"
                },
                {
                  domain: "iscorp.com"
                },
                {
                  domain: "marvel.com"
                },
                {
                  domain: "sundancecatalog.com"
                },
                {
                  domain: "localhost"
                },
                {
                  domain: "127.0.0.1"
                },
                {
                  domain: "::1"
                },
                {
                  domain: "livenation.com"
                },
                {
                  domain: "ticketmaster.com"
                }
              ]
            },
            exceptions: [],
            state: "disabled",
            hash: "4bc6e2c1c3a844da2a462eac6b020d0c"
          },
          dbp: {
            state: "disabled",
            features: {
              waitlist: {
                state: "disabled"
              },
              waitlistBetaActive: {
                state: "disabled"
              }
            },
            exceptions: [],
            hash: "ba52a36920a4a76343fc3c44d98936f9"
          },
          duckPlayer: {
            exceptions: [],
            settings: {
              tryDuckPlayerLink: "https://www.youtube.com/watch?v=yKWIA-Pys4c",
              overlays: {
                youtube: {
                  state: "disabled",
                  selectors: {
                    thumbLink: "a[href^='/watch']",
                    excludedRegions: [
                      "#playlist",
                      "ytd-movie-renderer",
                      "ytd-grid-movie-renderer"
                    ],
                    videoElement: "#player video",
                    videoElementContainer: "#player .html5-video-player",
                    hoverExcluded: [],
                    clickExcluded: [],
                    allowedEventTargets: [
                      ".ytp-inline-preview-scrim",
                      ".ytd-video-preview",
                      "#thumbnail-container",
                      "#video-title-link",
                      "#video-title"
                    ]
                  },
                  thumbnailOverlays: {
                    state: "enabled"
                  },
                  clickInterception: {
                    state: "enabled"
                  },
                  videoOverlays: {
                    state: "enabled"
                  }
                },
                serpProxy: {
                  state: "disabled"
                }
              },
              domains: [
                {
                  domain: "www.youtube.com",
                  patchSettings: [
                    {
                      op: "replace",
                      path: "/overlays/youtube/state",
                      value: "enabled"
                    }
                  ]
                },
                {
                  domain: "duckduckgo.com",
                  patchSettings: [
                    {
                      op: "replace",
                      path: "/overlays/serpProxy/state",
                      value: "enabled"
                    }
                  ]
                }
              ]
            },
            state: "disabled",
            hash: "04c97c3c7425cc18984dd34eda95a112"
          },
          elementHiding: {
            exceptions: [
              {
                domain: "duckduckgo.com"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              useStrictHideStyleTag: true,
              rules: [
                {
                  selector: "[id*='gpt-']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='gpt-']",
                  type: "closest-empty"
                },
                {
                  selector: "[class*='dfp-']",
                  type: "hide-empty"
                },
                {
                  selector: "[id*='dfp-']",
                  type: "hide-empty"
                },
                {
                  selector: "[id*='dfp_']",
                  type: "closest-empty"
                },
                {
                  selector: "[id*='google_ads_iframe']",
                  type: "hide"
                },
                {
                  selector: "#google_ads",
                  type: "hide-empty"
                },
                {
                  selector: ".adsbygoogle",
                  type: "hide-empty"
                },
                {
                  selector: "[id*='taboola-']",
                  type: "hide"
                },
                {
                  selector: ".taboolaHeight",
                  type: "hide"
                },
                {
                  selector: ".taboola-placeholder",
                  type: "hide"
                },
                {
                  selector: ".adHolder",
                  type: "closest-empty"
                },
                {
                  selector: ".adplaceholder",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-placeholder",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='ad_unit']",
                  type: "closest-empty"
                },
                {
                  selector: "[class^='adunit']",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-unit",
                  type: "hide-empty"
                },
                {
                  selector: ".column-ad",
                  type: "hide-empty"
                },
                {
                  selector: ".wide-ad",
                  type: "hide-empty"
                },
                {
                  selector: ".ad",
                  type: "hide-empty"
                },
                {
                  selector: ".AD",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-adhesion",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='ad-content']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='ad-slot_']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='_ad-slot']",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-block",
                  type: "hide-empty"
                },
                {
                  selector: ".adBox",
                  type: "hide-empty"
                },
                {
                  selector: ".apexAd",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-placement",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-leaderboard",
                  type: "closest-empty"
                },
                {
                  selector: ".leaderboard",
                  type: "closest-empty"
                },
                {
                  selector: "#leaderboard",
                  type: "closest-empty"
                },
                {
                  selector: ".leaderboard_wrapper",
                  type: "hide-empty"
                },
                {
                  selector: ".banner-leaderboard",
                  type: "hide-empty"
                },
                {
                  selector: ".top-banner",
                  type: "hide-empty"
                },
                {
                  selector: "#top-banner",
                  type: "hide-empty"
                },
                {
                  selector: "#topBanner",
                  type: "hide-empty"
                },
                {
                  selector: ".top-ad",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-banner-container",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='bannerAd']",
                  type: "hide-empty"
                },
                {
                  selector: ".banner-placeholder",
                  type: "hide-empty"
                },
                {
                  selector: ".header-ads",
                  type: "hide-empty"
                },
                {
                  selector: ".header-ad-slot",
                  type: "hide-empty"
                },
                {
                  selector: "#credential_picker_container",
                  type: "hide"
                },
                {
                  selector: "#credentials-picker-container",
                  type: "hide"
                },
                {
                  selector: "#credential_picker_iframe",
                  type: "hide"
                },
                {
                  selector: "[id*='google-one-tap-iframe']",
                  type: "hide"
                },
                {
                  selector: "#google-one-tap-popup-container",
                  type: "hide"
                },
                {
                  selector: ".google-one-tap-modal-div",
                  type: "hide"
                },
                {
                  selector: ".google-one-tap",
                  type: "hide-empty"
                },
                {
                  selector: ".ad_container",
                  type: "closest-empty"
                },
                {
                  selector: ".ad-container--leaderboard",
                  type: "hide-empty"
                },
                {
                  selector: ".ads_container",
                  type: "hide-empty"
                },
                {
                  selector: ".ad__container",
                  type: "closest-empty"
                },
                {
                  selector: "[class^='ad-container']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='-ad-container']",
                  type: "hide-empty"
                },
                {
                  selector: ".adcontainer",
                  type: "closest-empty"
                },
                {
                  selector: ".ad-current",
                  type: "hide-empty"
                },
                {
                  selector: ".advertisement",
                  type: "closest-empty"
                },
                {
                  selector: "[class*='advert-']",
                  type: "hide-empty"
                },
                {
                  selector: "[id*='advert-']",
                  type: "hide-empty"
                },
                {
                  selector: ".ads__inline",
                  type: "closest-empty"
                },
                {
                  selector: ".ads__native",
                  type: "closest-empty"
                },
                {
                  selector: ".fixed-slots",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-slot",
                  type: "closest-empty"
                },
                {
                  selector: "#ad-top",
                  type: "hide-empty"
                },
                {
                  selector: "#ad-wrap",
                  type: "hide-empty"
                },
                {
                  selector: ".ad-wrap",
                  type: "closest-empty"
                },
                {
                  selector: ".ad-wrapper",
                  type: "closest-empty"
                },
                {
                  selector: ".ads-wrapper",
                  type: "closest-empty"
                },
                {
                  selector: "[class^='adWrapper']",
                  type: "closest-empty"
                },
                {
                  selector: "[class*='container--ads']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='page-ad']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='module__ad']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='advertising']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='AdvertisingSlot']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='AdSlot']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='werbung']",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='am-bazaar-ad']",
                  type: "hide-empty"
                },
                {
                  selector: ".adBanner",
                  type: "hide-empty"
                },
                {
                  selector: ".adModule",
                  type: "hide-empty"
                },
                {
                  selector: "[class^='Display_displayAd']",
                  type: "hide-empty"
                },
                {
                  selector: "[class^='Display_displayAd']",
                  type: "hide-empty"
                },
                {
                  selector: "#premium_ddb_0",
                  type: "hide-empty"
                },
                {
                  selector: "[class*='ad-zone']",
                  type: "hide-empty"
                },
                {
                  selector: "[data-adunitpath]",
                  type: "closest-empty"
                },
                {
                  selector: "[data-targeting]",
                  type: "closest-empty"
                },
                {
                  selector: "[data-ad-placeholder]",
                  type: "closest-empty"
                },
                {
                  selector: "[data-ad]",
                  type: "hide-empty"
                },
                {
                  selector: ".instream_ad",
                  type: "hide-empty"
                },
                {
                  selector: ".adthrive",
                  type: "hide-empty"
                },
                {
                  selector: ".adthrive-ad",
                  type: "hide-empty"
                },
                {
                  selector: ".adthrive-content",
                  type: "hide-empty"
                },
                {
                  selector: ".arc-ad-wrapper",
                  type: "hide-empty"
                },
                {
                  selector: ".dmpu-ad",
                  type: "hide-empty"
                },
                {
                  selector: "#bfad-slot",
                  type: "hide-empty"
                },
                {
                  selector: ".ezoic-ad",
                  type: "hide-empty"
                },
                {
                  selector: ".ezo_ad",
                  type: "hide-empty"
                },
                {
                  selector: "[data-ez-ph-id]",
                  type: "hide-empty"
                },
                {
                  selector: "#amp_floatingAdDiv",
                  type: "hide"
                },
                {
                  selector: ".bordeaux-slot",
                  type: "closest-empty"
                },
                {
                  selector: ".bordeaux-anchored-container",
                  type: "hide-empty"
                },
                {
                  selector: ".rightAd",
                  type: "hide-empty"
                },
                {
                  selector: ".sponsored-slot",
                  type: "hide-empty"
                },
                {
                  selector: "#ez-content-blocker-container",
                  type: "hide"
                }
              ],
              styleTagExceptions: [
                {
                  domain: "github.com",
                  reason: "https://github.com/duckduckgo/privacy-configuration/issues/1058"
                },
                {
                  domain: "pocketbook.digital",
                  reason: "https://github.com/duckduckgo/privacy-configuration/issues/1365"
                }
              ],
              hideTimeouts: [
                0,
                100,
                300,
                500,
                1e3,
                1500,
                2e3,
                3e3,
                5e3
              ],
              unhideTimeouts: [
                1250,
                2250,
                3250,
                5250
              ],
              mediaAndFormSelectors: "video,canvas,embed,object,audio,map,form,input,textarea,select,option",
              adLabelStrings: [
                "ad",
                "advert",
                "advert10",
                "advertisement",
                "advertisements",
                "advertisment",
                "advertisementclose",
                "advertisementadvertisement",
                "advertisementcontinue reading the main story",
                "advertisement\ncontinue reading the main story",
                "advertisement\n\ncontinue reading the main story",
                "advertisement\n\nhide ad",
                "advertisementhide ad",
                "advertisement - scroll to continue",
                "advertisement \xB7 scroll to continue",
                "advertisement - story continues below",
                "advertising",
                "advertising\nskip ad",
                "advertising\nskip ad\nskip ad\nskip ad",
                "ad feedback",
                "annonse",
                "anzeige",
                "close ad",
                "close this ad",
                "x",
                "sponsored",
                "sponsoris\xE9",
                "story continues below advertisement",
                "story continues below advertisementadvertisement",
                "oglas",
                "publicit\xE9",
                "publicidade",
                "- publicidade -",
                "reklama",
                "skip ad",
                "sponsored news",
                "continue reading the main story",
                "this advertisement has not loaded yet, but your article continues below.",
                "story continues below\nthis advertisement has not loaded yet, but your article continues below.",
                "upgrade to flickr pro to hide these ads"
              ],
              domains: [
                {
                  domain: "3bmeteo.com",
                  rules: [
                    {
                      type: "disable-default"
                    },
                    {
                      selector: "#admasthead",
                      type: "hide-empty"
                    },
                    {
                      selector: "#ads_container",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "abc.es",
                  rules: [
                    {
                      selector: ".voc-advertising",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "acidadeon.com",
                  rules: [
                    {
                      selector: "[class*='mrf-adv']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class*='td-block']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "allgemeine-zeitung.de",
                  rules: [
                    {
                      type: "disable-default"
                    },
                    {
                      selector: ".adSlot",
                      type: "hide-empty"
                    },
                    {
                      selector: ".adBorder",
                      type: "hide-empty"
                    },
                    {
                      selector: ".nativeAd",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "androidpolice.com",
                  rules: [
                    {
                      selector: "[class*='ad-zone']",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "apnews.com",
                  rules: [
                    {
                      selector: ".proper-dynamic-insertion",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "avito.ru",
                  rules: [
                    {
                      selector: "[class*='advert-mimicry-block']",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "bbc.com",
                  rules: [
                    {
                      selector: ".dotcom-ad",
                      type: "closest-empty"
                    },
                    {
                      selector: ".leaderboard-ad-placeholder",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "bestbuy.com",
                  rules: [
                    {
                      selector: "#credential_picker_container",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "bild.de",
                  rules: [
                    {
                      type: "disable-default"
                    },
                    {
                      selector: "[id^='mrec']",
                      type: "hide-empty"
                    },
                    {
                      selector: "#superbanner",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "bizjournals.com",
                  rules: [
                    {
                      selector: ".adwrap",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "bleacherreport.com",
                  rules: [
                    {
                      selector: ".br-ad-wrapper",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "bleedcubbieblue.com",
                  rules: [
                    {
                      selector: "[class*='ad_unit']",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "blick.ch",
                  rules: [
                    {
                      selector: "[id*='appnexus-placement-']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "bloomberg.com",
                  rules: [
                    {
                      selector: ".unsupported-browser-notification-container",
                      type: "hide"
                    },
                    {
                      selector: "[class^='FullWidthAd']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[data-testid='sparkle-ad']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "bostonglobe.com",
                  rules: [
                    {
                      selector: ".arc_ad",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "carandclassic.com",
                  rules: [
                    {
                      selector: "[id*='advert-']",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "cbc.ca",
                  rules: [
                    {
                      selector: ".ad-risingstar-container",
                      type: "hide-empty"
                    },
                    {
                      selector: ".bigBoxContainer",
                      type: "hide-empty"
                    },
                    {
                      selector: ".stickyRailAd",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "cbssports.com",
                  rules: [
                    {
                      selector: ".leaderboard-wrap",
                      type: "hide-empty"
                    },
                    {
                      selector: ".skybox-top-wrapper",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "cleartax.in",
                  rules: [
                    {
                      selector: "#credential_picker_container",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "cnbc.com",
                  rules: [
                    {
                      selector: ".TopBanner-container",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "coingecko.com",
                  rules: [
                    {
                      selector: "[data-target='ads.banner']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "cyclingtips.com",
                  rules: [
                    {
                      selector: "[data-block-name='ads']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "dailyherald.com",
                  rules: [
                    {
                      selector: ".instoryAdBlock",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "dailymail.co.uk",
                  rules: [
                    {
                      type: "disable-default"
                    },
                    {
                      selector: "[class*='dmg-ads']",
                      type: "hide-empty"
                    },
                    {
                      selector: ".mol-ads-label-container",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "dallasnews.com",
                  rules: [
                    {
                      selector: ".adhesiveAdWrapper",
                      type: "hide-empty"
                    },
                    {
                      selector: "[data-cy='Ad']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[data-cy='InstreamPlayer']",
                      type: "hide-empty"
                    },
                    {
                      selector: ".bg-neutral-grey-4.items-center",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "deseret.com",
                  rules: [
                    {
                      selector: "[data-targeting]",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "dpreview.com",
                  rules: [
                    {
                      selector: ".ad-wrapper",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "ebay.com",
                  rules: [
                    {
                      selector: "#g-yolo-overlay-holder",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "ebay-kleinanzeigen.de",
                  rules: [
                    {
                      selector: "[data-liberty-position-name]",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "eniro.se",
                  rules: [
                    {
                      selector: "#page .e-banner.e-embed-aware",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "eonline.com",
                  rules: [
                    {
                      selector: "[class*='mps-']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "essentiallysports.com",
                  rules: [
                    {
                      selector: ".es-ad-space-container",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "examiner.com.au",
                  rules: [
                    {
                      selector: "[class*='flex items']",
                      type: "hide-empty"
                    },
                    {
                      selector: ".hidden",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "express.de",
                  rules: [
                    {
                      selector: ".dm-slot",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "express.co.uk",
                  rules: [
                    {
                      selector: ".superbanner",
                      type: "hide-empty"
                    },
                    {
                      selector: "#ad-vip-article",
                      type: "hide-empty"
                    },
                    {
                      selector: ".taboola-above-article",
                      type: "hide"
                    },
                    {
                      selector: "#taboola-ad",
                      type: "hide"
                    },
                    {
                      selector: ".viafoura-standalone-mpu",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "fandom.com",
                  rules: [
                    {
                      selector: ".top-ads-container",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "flickr.com",
                  rules: [
                    {
                      selector: ".feed-b",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "focus.de",
                  rules: [
                    {
                      selector: "[id*='M_CONTENTAD']",
                      type: "closest-empty"
                    },
                    {
                      selector: "[id*='M_TRSCT_hor']",
                      type: "closest-empty"
                    },
                    {
                      selector: "[id*='M_FLYCPT_hor']",
                      type: "closest-empty"
                    },
                    {
                      selector: "#tfm_admanagerTeaser",
                      type: "closest-empty"
                    },
                    {
                      selector: ".cls_slot_xxoutstreamxx",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "foodnetwork.co.uk",
                  rules: [
                    {
                      selector: ".bg-bodyBg",
                      type: "hide-empty"
                    },
                    {
                      selector: ".module--ad-module-primary",
                      type: "hide-empty"
                    },
                    {
                      selector: "#mtf-1",
                      type: "closest-empty"
                    },
                    {
                      selector: "#btf-1",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "football365.com",
                  rules: [
                    {
                      selector: ".bs-block",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "forbes.com",
                  rules: [
                    {
                      selector: "fbs-ad",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "fortune.com",
                  rules: [
                    {
                      selector: "[id*='Leaderboard']",
                      type: "closest-empty"
                    },
                    {
                      selector: "[id*='RightRailFlex']",
                      type: "closest-empty"
                    },
                    {
                      selector: "[id*='InStream']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "foxnews.com",
                  rules: [
                    {
                      type: "disable-default"
                    },
                    {
                      selector: ".vendor-unit",
                      type: "hide-empty"
                    },
                    {
                      selector: ".pre-content",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class*='rr-ad-']",
                      type: "hide-empty"
                    },
                    {
                      selector: ".ad-h-250",
                      type: "hide-empty"
                    },
                    {
                      selector: ".sticky-pre-header",
                      type: "hide-empty"
                    },
                    {
                      selector: ".adhesion-ad",
                      type: "hide-empty"
                    },
                    {
                      selector: ".sticky-pre-header-inner",
                      type: "hide-empty"
                    },
                    {
                      selector: ".site-header",
                      type: "modify-style",
                      values: [
                        {
                          property: "min-height",
                          value: "50px"
                        }
                      ]
                    }
                  ]
                },
                {
                  domain: "gamingbible.com",
                  rules: [
                    {
                      selector: "[class*='Advert']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "getpocket.com",
                  rules: [
                    {
                      selector: "[class*='syndication-ad']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "ghacks.net",
                  rules: [
                    {
                      selector: ".box-banner",
                      type: "hide-empty"
                    },
                    {
                      selector: "[id^='ghacks_ad_code']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "google.com",
                  rules: [
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19026802']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19015398']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19026796']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19018053']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19018054']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19016403']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19015972']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19016223']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19015952']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19030391']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19030389']))",
                      type: "hide"
                    },
                    {
                      selector: ":is(div:has(> iframe[src*='prid=19030167']))",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "gute-garne.de",
                  rules: [
                    {
                      selector: ".ad",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "guard.io",
                  rules: [
                    {
                      selector: "#credential_picker_container",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "harpygee.com",
                  rules: [
                    {
                      selector: "#leaderboard",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "healthline.com",
                  rules: [
                    {
                      selector: "[data-testid='header-leaderboard']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[data-testid='sticky-inline-ad']",
                      type: "closest-empty"
                    },
                    {
                      selector: "[data-ad='true']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "hindustantimes.com",
                  rules: [
                    {
                      selector: ".desktopAd",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class^='adHeight']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class^='adMinHeight']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "howstuffworks.com",
                  rules: [
                    {
                      selector: ".leaderboard-banner",
                      type: "hide-empty"
                    },
                    {
                      selector: ".ad-container",
                      type: "hide"
                    },
                    {
                      selector: ".ad-inline",
                      type: "hide-empty"
                    },
                    {
                      selector: "#ad-wrap-mobadhesion",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "huffpost.com",
                  rules: [
                    {
                      selector: ".connatix-player",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "ilfattoquotidiano.it",
                  rules: [
                    {
                      selector: "[class*='adv']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "indeed.com",
                  rules: [
                    {
                      selector: ".google-Only-Modal",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "indiatimes.com",
                  rules: [
                    {
                      selector: ".ad-cls",
                      type: "hide-empty"
                    },
                    {
                      selector: "._3JJMX",
                      type: "hide-empty"
                    },
                    {
                      selector: ".paisa-wrapper",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "indy100.com",
                  rules: [
                    {
                      selector: "[id*='thirdparty']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "insider.com",
                  rules: [
                    {
                      selector: ".in-post-sticky",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "investing.com",
                  rules: [
                    {
                      selector: ".dfpVideo",
                      type: "hide-empty"
                    },
                    {
                      selector: ".adDrawer",
                      type: "hide-empty"
                    },
                    {
                      selector: "#hpAdVideo",
                      type: "hide-empty"
                    },
                    {
                      selector: "[advertisementtext='Advertisement']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "kbb.com",
                  rules: [
                    {
                      selector: "#contentFor_kbbAdsSimplifiedNativeAd",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "kentonline.co.uk",
                  rules: [
                    {
                      type: "disable-default"
                    },
                    {
                      selector: "[id*='p_mpu']",
                      type: "closest-empty"
                    },
                    {
                      selector: "[id*='p_dmp']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "komputerswiat.pl",
                  rules: [
                    {
                      selector: "[class*='extraList']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class*='placeholder']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "leboncoin.fr",
                  rules: [
                    {
                      selector: "#lht-space-ad",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class*='styles__ad']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "livemint.com",
                  rules: [
                    {
                      selector: "#adfreeDeskSpace",
                      type: "hide-empty"
                    },
                    {
                      selector: "#dekBudgetAd",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "macrumors.com",
                  rules: [
                    {
                      selector: ".tertiary",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class*='sidebarblock']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "mail.com",
                  rules: [
                    {
                      selector: ".primis",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "marketwatch.com",
                  rules: [
                    {
                      selector: ".j-ad",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "metro.co.uk",
                  rules: [
                    {
                      type: "disable-default"
                    },
                    {
                      selector: ".ad-slot-container",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "mirror.co.uk",
                  rules: [
                    {
                      selector: "#comments-standalone-mpu",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "motortrend.com",
                  rules: [
                    {
                      selector: "[id*='AboveNavAd']",
                      type: "closest-empty"
                    },
                    {
                      selector: "._11KmK",
                      type: "hide-empty"
                    },
                    {
                      selector: ".AtFxB",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "n1info.si",
                  rules: [
                    {
                      selector: "[class*='banner-placeholder']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "nasdaq.com",
                  rules: [
                    {
                      selector: "[class^='ads__midpage']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class^='ads__right-rail']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "nbcsports.com",
                  rules: [
                    {
                      selector: ".block-mps",
                      type: "hide-empty"
                    },
                    {
                      selector: "#nbcsports-leaderboard",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "nerdist.com",
                  rules: [
                    {
                      selector: ".kskdCls",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "newser.com",
                  rules: [
                    {
                      selector: ".RightRailAds",
                      type: "hide-empty"
                    },
                    {
                      selector: "#headerAdSection",
                      type: "hide-empty"
                    },
                    {
                      selector: "#FreeStarVideoAdContainer",
                      type: "closest-empty"
                    },
                    {
                      selector: "[id^='div-insticator-ad']",
                      type: "closest-empty"
                    },
                    {
                      selector: "#divMobileHeaderAd",
                      type: "closest-empty"
                    },
                    {
                      selector: "#divImageAd",
                      type: "closest-empty"
                    },
                    {
                      selector: ".divNColAdRepeating",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "newsmax.com",
                  rules: [
                    {
                      selector: ".DFPad",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "nottinghampost.com",
                  rules: [
                    {
                      selector: "#auth-ui_one-tap-container",
                      type: "hide"
                    },
                    {
                      selector: "#comments-standalone-mpu",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "nytimes.com",
                  rules: [
                    {
                      selector: "#top-wrapper",
                      type: "hide-empty"
                    },
                    {
                      selector: "#bottom-wrapper",
                      type: "hide-empty"
                    },
                    {
                      selector: "#mid1-wrapper",
                      type: "hide-empty"
                    },
                    {
                      selector: "#mid2-wrapper",
                      type: "hide-empty"
                    },
                    {
                      selector: "#mid3-wrapper",
                      type: "hide-empty"
                    },
                    {
                      selector: "#mktg-wrapper",
                      type: "hide-empty"
                    },
                    {
                      selector: ".e1xxpj0j1",
                      type: "hide-empty"
                    },
                    {
                      selector: "[id*='story-ad']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[data-testid='StandardAd']",
                      type: "closest-empty"
                    },
                    {
                      selector: ".pz-ad-box",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "observador.pt",
                  rules: [
                    {
                      selector: ".obs-ad-placeholder",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "orange.fr",
                  rules: [
                    {
                      selector: ".tag-rm",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "on.cc",
                  rules: [
                    {
                      selector: "#mOverLay-container",
                      type: "hide"
                    },
                    {
                      selector: ".lrec",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "ouest-france.fr",
                  rules: [
                    {
                      selector: "[id*='pub_banniere']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[id*='pub_pave']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "paypal.com",
                  rules: [
                    {
                      selector: "#gslFrame",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "petapixel.com",
                  rules: [
                    {
                      selector: ".banners",
                      type: "hide-empty"
                    },
                    {
                      selector: "#ppvideoadvertisement",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "peterboroughtoday.co.uk",
                  rules: [
                    {
                      selector: ".mpu-item",
                      type: "closest-empty"
                    },
                    {
                      selector: "[class*='AdContainer']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "polygon.com",
                  rules: [
                    {
                      selector: "[class*='ad_unit']",
                      type: "override"
                    },
                    {
                      selector: "[id*='gpt-']",
                      type: "override"
                    },
                    {
                      selector: ".m-ad",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "popsci.com",
                  rules: [
                    {
                      selector: ".mtc-unit-prefill-container",
                      type: "hide-empty"
                    },
                    {
                      selector: ".ad-slot-wrapper",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "psypost.com",
                  rules: [
                    {
                      selector: ".jeg_midbar",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "publico.es",
                  rules: [
                    {
                      selector: ".pb-ads",
                      type: "hide-empty"
                    },
                    {
                      selector: "#sc_intxt_container",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "qz.com",
                  rules: [
                    {
                      selector: "#marquee-ad",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "rawstory.com",
                  rules: [
                    {
                      selector: ".container_proper-ad-unit",
                      type: "hide"
                    },
                    {
                      selector: ".controlled_via_ad_manager",
                      type: "hide"
                    },
                    {
                      selector: ".mgid_3x2",
                      type: "hide-empty"
                    },
                    {
                      selector: ".proper-ad-unit",
                      type: "hide"
                    },
                    {
                      selector: "[id^='rc-widget-']",
                      type: "hide-empty"
                    },
                    {
                      selector: "#story-top-ad",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "reddit.com",
                  rules: [
                    {
                      selector: "._233XfOVq91N_ugGQDBb_OT",
                      type: "hide"
                    },
                    {
                      selector: "._2vPrb00OnreVznxQ-SNql9",
                      type: "hide"
                    },
                    {
                      selector: `[devicetype="desktop"] .grid:not([style='filter: blur(4px);']) ~ shreddit-experience-tree`,
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "refinery29.com",
                  rules: [
                    {
                      selector: ".section-ad",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "reuters.com",
                  rules: [
                    {
                      selector: "[testid='ResponsiveAdSlot']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "rumble.com",
                  rules: [
                    {
                      selector: "[id^='rumble-ad']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "scmp.com",
                  rules: [
                    {
                      selector: "[class*='ad-slot-container']",
                      type: "hide-empty"
                    },
                    {
                      selector: ".top-ad",
                      type: "hide-empty"
                    },
                    {
                      selector: ".advertisement--mobile",
                      type: "hide-empty"
                    },
                    {
                      selector: ".bottom-ad",
                      type: "hide-empty"
                    },
                    {
                      selector: ".article-list__inline-ad",
                      type: "hide-empty"
                    },
                    {
                      selector: ".page-container__mobile-native-ad",
                      type: "hide-empty"
                    },
                    {
                      selector: ".ad-area",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "semafor.com",
                  rules: [
                    {
                      selector: "[class*='adMargin']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class*='adHeaderMargin']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "sfchronicle.com",
                  rules: [
                    {
                      selector: "[class*='belowMastheadWrapper']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "si.com",
                  rules: [
                    {
                      selector: ".m-ad",
                      type: "closest-empty"
                    },
                    {
                      selector: ".m-header-ad",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "skysports.com",
                  rules: [
                    {
                      selector: "[data-format='leaderboard']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "slate.com",
                  rules: [
                    {
                      selector: ".slate-ad",
                      type: "hide-empty"
                    },
                    {
                      selector: ".top-ad",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "snopes.com",
                  rules: [
                    {
                      selector: ".proper-dynamic-insertion",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "spanishdict.com",
                  rules: [
                    {
                      selector: "[id*='adSide']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[id*='adTop']",
                      type: "hide-empty"
                    },
                    {
                      selector: "[id*='adMiddle']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "spankbang.com",
                  rules: [
                    {
                      selector: ".ptgncdn_holder",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "sportbible.com",
                  rules: [
                    {
                      selector: "[class*='Advert']",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "startpagina.nl",
                  rules: [
                    {
                      type: "disable-default"
                    },
                    {
                      selector: ".ad-widget",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "takealot.com",
                  rules: [
                    {
                      selector: "[class*='ad-slot_']",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "target.com",
                  rules: [
                    {
                      selector: "[class^='styles__PubAdWrapper']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "theatlantic.com",
                  rules: [
                    {
                      selector: "[class*='ArticleInjector']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "thegatewaypundit.com",
                  rules: [
                    {
                      selector: ".code-block",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "thehour.com",
                  rules: [
                    {
                      selector: ".belowMastheadWrapper",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "thehindu.com",
                  rules: [
                    {
                      selector: "#articledivrec",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "thetimes.co.uk",
                  rules: [
                    {
                      selector: "#ad-header",
                      type: "closest-empty"
                    },
                    {
                      selector: ".Section-ad",
                      type: "hide-empty"
                    },
                    {
                      selector: "[class*='responsive__NativeAd']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "thewordfinder.com",
                  rules: [
                    {
                      selector: "[id*='adngin']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "thingiverse.com",
                  rules: [
                    {
                      selector: "[class*='AdCard__leaderboard']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "tinybeans.com",
                  rules: [
                    {
                      selector: ".tb-ad",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "tripadvisor.ca",
                  rules: [
                    {
                      selector: "#tripGoogleOnetapContainer",
                      type: "hide"
                    },
                    {
                      selector: ".ZkqhQ",
                      type: "hide"
                    },
                    {
                      selector: ".mxEhR",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "tripadvisor.de",
                  rules: [
                    {
                      selector: "#tripGoogleOnetapContainer",
                      type: "hide"
                    },
                    {
                      selector: ".ZkqhQ",
                      type: "hide"
                    },
                    {
                      selector: ".mxEhR",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "tripadvisor.co.uk",
                  rules: [
                    {
                      selector: "#tripGoogleOnetapContainer",
                      type: "hide"
                    },
                    {
                      selector: ".ZkqhQ",
                      type: "hide"
                    },
                    {
                      selector: ".mxEhR",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "tripadvisor.com",
                  rules: [
                    {
                      selector: "#tripGoogleOnetapContainer",
                      type: "hide"
                    },
                    {
                      selector: ".ZkqhQ",
                      type: "hide"
                    },
                    {
                      selector: ".mxEhR",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "tripadvisor.fr",
                  rules: [
                    {
                      selector: "#tripGoogleOnetapContainer",
                      type: "hide"
                    },
                    {
                      selector: ".ZkqhQ",
                      type: "hide"
                    },
                    {
                      selector: ".mxEhR",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "tvtropes.org",
                  rules: [
                    {
                      selector: "[class*='-fad-unit']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "uol.com.br",
                  rules: [
                    {
                      selector: ".model-base-bnr",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "usnews.com",
                  rules: [
                    {
                      selector: "[class^='Ad__Container-']",
                      type: "hide"
                    },
                    {
                      selector: "#ac-lre-player",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "vinted.fr",
                  rules: [
                    {
                      selector: ".ad-container--leaderboard",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "vice.com",
                  rules: [
                    {
                      selector: ".adph",
                      type: "hide-empty"
                    },
                    {
                      selector: ".vice-ad__container",
                      type: "hide-empty"
                    },
                    {
                      selector: ".fixed-slot",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "westernjournal.com",
                  rules: [
                    {
                      selector: ".sponsor",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "washingtonpost.com",
                  rules: [
                    {
                      selector: "wp-ad",
                      type: "closest-empty"
                    },
                    {
                      selector: "#leaderboard-wrapper",
                      type: "hide-empty"
                    },
                    {
                      selector: ".outbrain-wrapper",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "whitakerfuneralhome.com",
                  rules: [
                    {
                      selector: ".top-banner",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "winnipegfreepress.com",
                  rules: [
                    {
                      selector: ".article-ad",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "wiwo.de",
                  rules: [
                    {
                      type: "disable-default"
                    }
                  ]
                },
                {
                  domain: "wsj.com",
                  rules: [
                    {
                      selector: "#cx-what-to-read-next",
                      type: "closest-empty"
                    },
                    {
                      selector: "[class*='WSJTheme--adWrapper']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "wunderground.com",
                  rules: [
                    {
                      selector: ".pane-wu-fullscreenweather-ad-box-atf",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "wykop.pl",
                  rules: [
                    {
                      selector: ".pub-slot-wrapper",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "yahoo.com",
                  rules: [
                    {
                      selector: ".darla",
                      type: "closest-empty"
                    },
                    {
                      selector: "[data-content='Advertisement']",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "gazeta.pl",
                  rules: [
                    {
                      selector: "[class*='DFP-']",
                      type: "closest-empty"
                    },
                    {
                      selector: "[id*='banC']",
                      type: "hide-empty"
                    },
                    {
                      selector: ".indexPremium__adv",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "nfl.com",
                  rules: [
                    {
                      selector: "[class*='adv-block']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "usatoday.com",
                  rules: [
                    {
                      selector: "[aria-label='advertisement']",
                      type: "closest-empty"
                    },
                    {
                      selector: ".gnt_tb",
                      type: "hide-empty"
                    },
                    {
                      selector: ".gnt_flp",
                      type: "hide-empty"
                    }
                  ]
                },
                {
                  domain: "washingtontimes.com",
                  rules: [
                    {
                      selector: ".connatixcontainer",
                      type: "hide"
                    },
                    {
                      selector: "[id*='cxense-']",
                      type: "closest-empty"
                    }
                  ]
                },
                {
                  domain: "xfinity.com",
                  rules: [
                    {
                      selector: ".f-gpc-flyout",
                      type: "hide"
                    },
                    {
                      selector: ".f-gpc-banner",
                      type: "hide"
                    }
                  ]
                },
                {
                  domain: "first-party.site",
                  rules: [
                    {
                      selector: ".hide-test",
                      type: "hide"
                    },
                    {
                      selector: ".hide-empty-test",
                      type: "hide-empty"
                    },
                    {
                      selector: ".closest-empty-test",
                      type: "closest-empty"
                    },
                    {
                      selector: "[class^='ad-container']",
                      type: "override"
                    }
                  ]
                },
                {
                  domain: "privacy-test-pages.site",
                  rules: [
                    {
                      selector: ".hide-test",
                      type: "hide"
                    },
                    {
                      selector: ".hide-empty-test",
                      type: "hide-empty"
                    },
                    {
                      selector: ".closest-empty-test",
                      type: "closest-empty"
                    },
                    {
                      selector: "[class^='ad-container']",
                      type: "override"
                    }
                  ]
                }
              ]
            },
            state: "enabled",
            hash: "dbcdfcea415b7c71b57275a3c6e63187"
          },
          exceptionHandler: {
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "c888aea9f4999dde3009dedc690da963"
          },
          fingerprintingAudio: {
            state: "disabled",
            exceptions: [
              {
                domain: "litebluesso.usps.gov"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            hash: "d57e472e3617639adb6c08c56610e323"
          },
          fingerprintingBattery: {
            exceptions: [
              {
                domain: "litebluesso.usps.gov"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "7807aa35da34caf0a439cba895cf731a"
          },
          fingerprintingCanvas: {
            settings: {
              webGl: "enabled"
            },
            exceptions: [
              {
                domain: "adidas.com"
              },
              {
                domain: "adidas.co.uk"
              },
              {
                domain: "amtrak.com"
              },
              {
                domain: "att.com"
              },
              {
                domain: "bloomingdales.com"
              },
              {
                domain: "capitalone.com"
              },
              {
                domain: "chase.com"
              },
              {
                domain: "citi.com"
              },
              {
                domain: "emirates.com"
              },
              {
                domain: "fedex.com"
              },
              {
                domain: "finishline.com"
              },
              {
                domain: "gynzykids.com"
              },
              {
                domain: "hm.com"
              },
              {
                domain: "ikea.com"
              },
              {
                domain: "litebluesso.usps.gov"
              },
              {
                domain: "manulife.ca"
              },
              {
                domain: "navyfederal.org"
              },
              {
                domain: "northernrailway.co.uk"
              },
              {
                domain: "online-calculator.com"
              },
              {
                domain: "online-stopwatch.com"
              },
              {
                domain: "spirit.com"
              },
              {
                domain: "suncoastcreditunion.com"
              },
              {
                domain: "thetrainline.com"
              },
              {
                domain: "usps.com"
              },
              {
                domain: "walgreens.com"
              },
              {
                domain: "wellsfargo.com"
              },
              {
                domain: "xfinity.com"
              },
              {
                domain: "godaddy.com"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "disabled",
            hash: "74b50434d92a4647e118f0a896744e7e"
          },
          fingerprintingHardware: {
            settings: {
              keyboard: {
                type: "undefined"
              },
              hardwareConcurrency: {
                type: "number",
                value: 2
              },
              deviceMemory: {
                type: "number",
                value: 8
              }
            },
            exceptions: [
              {
                domain: "www.ticketmaster.com"
              },
              {
                domain: "gamestop.com"
              },
              {
                domain: "godaddy.com"
              },
              {
                domain: "fedex.com"
              },
              {
                domain: "litebluesso.usps.gov"
              },
              {
                domain: "realestate.com.au"
              },
              {
                domain: "secureserver.net"
              },
              {
                domain: "hyatt.com"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "fbed3cabbe0ae2c0b2dec681c09ae64c"
          },
          fingerprintingScreenSize: {
            settings: {
              availTop: {
                type: "number",
                value: 0
              },
              availLeft: {
                type: "number",
                value: 0
              },
              colorDepth: {
                type: "number",
                value: 24
              },
              pixelDepth: {
                type: "number",
                value: 24
              }
            },
            exceptions: [
              {
                domain: "fedex.com"
              },
              {
                domain: "gamestop.com"
              },
              {
                domain: "godaddy.com"
              },
              {
                domain: "hyatt.com"
              },
              {
                domain: "litebluesso.usps.gov"
              },
              {
                domain: "secureserver.net"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "8e3b2400317a827a4a2abf90ea599487"
          },
          fingerprintingTemporaryStorage: {
            exceptions: [
              {
                domain: "fedex.com"
              },
              {
                domain: "litebluesso.usps.gov"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "b28d9b996faf37d8086eacf76114fe7a"
          },
          googleRejected: {
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "c888aea9f4999dde3009dedc690da963"
          },
          gpc: {
            state: "enabled",
            exceptions: [
              {
                domain: "allegiantair.com"
              },
              {
                domain: "boston.com"
              },
              {
                domain: "costco.com"
              },
              {
                domain: "crunchyroll.com"
              },
              {
                domain: "eventbrite.com"
              },
              {
                domain: "duluthtrading.com"
              },
              {
                domain: "web.whatsapp.com"
              },
              {
                domain: "verizon.com"
              },
              {
                domain: "chime.com"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              gpcHeaderEnabledSites: [
                "global-privacy-control.glitch.me",
                "globalprivacycontrol.org",
                "washingtonpost.com",
                "nytimes.com",
                "privacy-test-pages.site"
              ]
            },
            hash: "400b8187a85a25199cddf1f67eeaa111"
          },
          harmfulApis: {
            settings: {
              deviceOrientation: {
                state: "enabled",
                filterEvents: [
                  "deviceorientation",
                  "devicemotion"
                ]
              },
              GenericSensor: {
                state: "enabled",
                filterPermissions: [
                  "accelerometer",
                  "ambient-light-sensor",
                  "gyroscope",
                  "magnetometer"
                ],
                blockSensorStart: true
              },
              UaClientHints: {
                state: "enabled",
                highEntropyValues: {
                  trimBrands: true,
                  model: "",
                  trimPlatformVersion: 2,
                  trimUaFullVersion: 1,
                  trimFullVersionList: 1
                }
              },
              NetworkInformation: {
                state: "enabled"
              },
              getInstalledRelatedApps: {
                state: "enabled",
                returnValue: []
              },
              FileSystemAccess: {
                state: "enabled",
                disableOpenFilePicker: true,
                disableSaveFilePicker: true,
                disableDirectoryPicker: true,
                disableGetAsFileSystemHandle: true
              },
              WindowPlacement: {
                state: "enabled",
                filterPermissions: [
                  "window-placement",
                  "window-management"
                ],
                screenIsExtended: false
              },
              WebBluetooth: {
                state: "enabled",
                filterPermissions: [
                  "bluetooth"
                ],
                filterEvents: [
                  "availabilitychanged"
                ],
                blockGetAvailability: true,
                blockRequestDevice: true
              },
              WebUsb: {
                state: "enabled"
              },
              WebSerial: {
                state: "enabled"
              },
              WebHid: {
                state: "enabled"
              },
              WebMidi: {
                state: "enabled",
                filterPermissions: [
                  "midi"
                ]
              },
              IdleDetection: {
                state: "enabled",
                filterPermissions: [
                  "idle-detection"
                ]
              },
              WebNfc: {
                state: "enabled",
                disableNdefReader: true,
                disableNdefMessage: true,
                disableNdefRecord: true
              },
              StorageManager: {
                state: "enabled",
                allowedQuotaValues: [
                  1073741824,
                  4294967296,
                  9999999999
                ]
              },
              domains: []
            },
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "disabled",
            hash: "c8e60da301ddebe387cf05cf84f79bec"
          },
          https: {
            state: "enabled",
            exceptions: [
              {
                domain: "act.alz.org"
              },
              {
                domain: "amica.com"
              },
              {
                domain: "jp.square-enix.com"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            hash: "e940590357742e105c70d398c2ef71b9"
          },
          incontextSignup: {
            exceptions: [],
            state: "enabled",
            minSupportedVersion: "2023.3.28.1",
            settings: {
              installedDays: 21
            },
            hash: "5ba6a8cee3d3b216cd864ab5a1441dc3"
          },
          incrementalRolloutTest: {
            state: "disabled",
            features: {
              rollout: {
                state: "enabled",
                rollout: {
                  steps: [
                    {
                      percent: 0.5
                    }
                  ]
                }
              }
            },
            exceptions: [],
            hash: "429cea8d27316dc62af04159ec7c42b5"
          },
          navigatorInterface: {
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              privilegedDomains: [
                {
                  domain: "duckduckgo.com"
                }
              ]
            },
            state: "enabled",
            hash: "533819f9b914fb46e43497a154e3dc95"
          },
          networkProtection: {
            state: "disabled",
            features: {
              waitlist: {
                state: "disabled"
              },
              waitlistBetaActive: {
                state: "disabled"
              }
            },
            exceptions: [],
            hash: "ba52a36920a4a76343fc3c44d98936f9"
          },
          newTabContinueSetUp: {
            exceptions: [],
            state: "disabled",
            hash: "728493ef7a1488e4781656d3f9db84aa"
          },
          nonTracking3pCookies: {
            settings: {
              excludedCookieDomains: []
            },
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "disabled",
            hash: "59853660774b501f095e537f5c59bd69"
          },
          privacyDashboard: {
            exceptions: [],
            features: {
              highlightedProtectionsToggle: {
                state: "disabled",
                rollout: {
                  steps: []
                }
              }
            },
            state: "disabled",
            hash: "dede7e70939822f5ecb9eb5fae577fa3"
          },
          referrer: {
            exceptions: [
              {
                domain: "atlassian.com"
              },
              {
                domain: "learning.edx.org"
              },
              {
                domain: "login-seconnecter.ca"
              },
              {
                domain: "canadapost-postescanada.ca"
              },
              {
                domain: "player.vimeo.com"
              },
              {
                domain: "xcelenergy.com"
              },
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "bc8f3db8d5dbd956472869ea3884861e"
          },
          requestFilterer: {
            state: "disabled",
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              windowInMs: 0
            },
            hash: "777e86de6c97f1ed9542b46c1eed73c0"
          },
          runtimeChecks: {
            state: "disabled",
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {},
            hash: "2e06efb9937cc1343de9da9afe5341e1"
          },
          serviceworkerInitiatedRequests: {
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "c888aea9f4999dde3009dedc690da963"
          },
          trackerAllowlist: {
            state: "enabled",
            settings: {
              allowlistedTrackers: {
                "3lift.com": {
                  rules: [
                    {
                      rule: "tlx.3lift.com/header/auction",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "4dex.io": {
                  rules: [
                    {
                      rule: "mp.4dex.io/prebid",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "a-mo.net": {
                  rules: [
                    {
                      rule: "prebid.a-mo.net/a/c",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "acsbapp.com": {
                  rules: [
                    {
                      rule: "acsbapp.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "addthis.com": {
                  rules: [
                    {
                      rule: "s7.addthis.com/js/300/addthis_widget.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "s7.addthis.com/l10n/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "s7.addthis.com/static/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "addtoany.com": {
                  rules: [
                    {
                      rule: "static.addtoany.com/menu/page.js",
                      domains: [
                        "frankspeech.com",
                        "x22report.com"
                      ]
                    }
                  ]
                },
                "adform.net": {
                  rules: [
                    {
                      rule: "adx.adform.net/adx/openrtb",
                      domains: [
                        "aternos.org"
                      ]
                    },
                    {
                      rule: "c1.adform.net/serving/cookie/match",
                      domains: [
                        "dhl.de"
                      ]
                    }
                  ]
                },
                "ads-twitter.com": {
                  rules: [
                    {
                      rule: "static.ads-twitter.com/uwt.js",
                      domains: [
                        "hentaihaven.xxx"
                      ]
                    }
                  ]
                },
                "adsafeprotected.com": {
                  rules: [
                    {
                      rule: "static.adsafeprotected.com/favicon.ico",
                      domains: [
                        "tf1info.fr"
                      ]
                    },
                    {
                      rule: "static.adsafeprotected.com/iasPET.1.js",
                      domains: [
                        "corriere.it"
                      ]
                    },
                    {
                      rule: "static.adsafeprotected.com/vans-adapter-google-ima.js",
                      domains: [
                        "nhl.com"
                      ]
                    }
                  ]
                },
                "adswizz.com": {
                  rules: [
                    {
                      rule: "synchrobox.adswizz.com",
                      domains: [
                        "tunein.com"
                      ]
                    },
                    {
                      rule: "adswizz.com/adswizz/js/SynchroClient2.js",
                      domains: [
                        "tunein.com"
                      ]
                    }
                  ]
                },
                "adthrive.com": {
                  rules: [
                    {
                      rule: "adthrive.com",
                      domains: [
                        "adamtheautomator.com",
                        "gardeningknowhow.com",
                        "packhacker.com"
                      ]
                    }
                  ]
                },
                "advertising.com": {
                  rules: [
                    {
                      rule: "adserver.adtech.advertising.com/pubapi/3.0/1/54669.7/0/0/ADTECH;v=2;cmd=bid;cors=yes",
                      domains: [
                        "collider.com"
                      ]
                    }
                  ]
                },
                "ahacdn.me": {
                  rules: [
                    {
                      rule: "ahacdn.me",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "aimbase.com": {
                  rules: [
                    {
                      rule: "ws.aimbase.com/Scripts/awa.js",
                      domains: [
                        "chriscraft.com",
                        "regulatormarine.com"
                      ]
                    }
                  ]
                },
                "akadns.net": {
                  rules: [
                    {
                      rule: "login.fidelity.com.febsec-fidelity.com.akadns.net",
                      domains: [
                        "fidelity.com"
                      ]
                    }
                  ]
                },
                "aldi-digital.co.uk": {
                  rules: [
                    {
                      rule: "assets.aldi-digital.co.uk/assets/050b4966c22c430e5c9308903ebb87e1/dist/scripts/main.js",
                      domains: [
                        "aldi.co.uk"
                      ]
                    }
                  ]
                },
                "alicdn.com": {
                  rules: [
                    {
                      rule: "alicdn.com",
                      domains: [
                        "aliexpress.us"
                      ]
                    }
                  ]
                },
                "amazon-adsystem.com": {
                  rules: [
                    {
                      rule: "c.amazon-adsystem.com/aax2/apstag.js",
                      domains: [
                        "4029tv.com",
                        "cnn.com",
                        "corriere.it",
                        "eurogamer.net",
                        "foxweather.com",
                        "kcci.com",
                        "kcra.com",
                        "ketv.com",
                        "kmbc.com",
                        "koat.com",
                        "koco.com",
                        "ksbw.com",
                        "mynbc5.com",
                        "seattletimes.com",
                        "thesurfersview.com",
                        "wapt.com",
                        "wbaltv.com",
                        "wcvb.com",
                        "wdsu.com",
                        "wesh.com",
                        "wgal.com",
                        "wildrivers.lostcoastoutpost.com",
                        "wisn.com",
                        "wlky.com",
                        "wlwt.com",
                        "wmtw.com",
                        "wmur.com",
                        "wpbf.com",
                        "wtae.com",
                        "wvtm13.com",
                        "wxii12.com",
                        "wyff4.com"
                      ]
                    }
                  ]
                },
                "amazon.dev": {
                  rules: [
                    {
                      rule: "prime.amazon.dev",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "amazonaws.com": {
                  rules: [
                    {
                      rule: "elb.amazonaws.com/public/digital-experience/js/common.js",
                      domains: [
                        "cigna.com"
                      ]
                    }
                  ]
                },
                "analytics-egain.com": {
                  rules: [
                    {
                      rule: "analytics.analytics-egain.com/onetag/",
                      domains: [
                        "support.norton.com"
                      ]
                    }
                  ]
                },
                "aticdn.net": {
                  rules: [
                    {
                      rule: "tag.aticdn.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "att.com": {
                  rules: [
                    {
                      rule: "att.com/scripts/att_common.js",
                      domains: [
                        "directv.com"
                      ]
                    }
                  ]
                },
                "aweber.com": {
                  rules: [
                    {
                      rule: "aweber.com/form/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "azure.net": {
                  rules: [
                    {
                      rule: "amp.azure.net/libs/amp/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "azureedge.net": {
                  rules: [
                    {
                      rule: "orderweb-cdn-endpoint-centralus.azureedge.net/js/chunk-vendors.js",
                      domains: [
                        "chipotle.com"
                      ]
                    }
                  ]
                },
                "bc0a.com": {
                  rules: [
                    {
                      rule: "marvel-b1-cdn.bc0a.com/f00000000269380/www.beretta.com/assets/",
                      domains: [
                        "beretta.com"
                      ]
                    }
                  ]
                },
                "bing.com": {
                  rules: [
                    {
                      rule: "r.bing.com/rp/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "bing.com/th",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.bing.com/api/maps/mapcontrol",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.bing.com/api/v6/Places/AutoSuggest",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.bing.com/maps/sdk/mapcontrol",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.bing.com/maps/sdkrelease/mapcontrol",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.bing.com/rp/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "boldapps.net": {
                  rules: [
                    {
                      rule: "option.boldapps.net/js/options.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "captcha-delivery.com": {
                  rules: [
                    {
                      rule: "captcha-delivery.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "casalemedia.com": {
                  rules: [
                    {
                      rule: "htlb.casalemedia.com/cygnus",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "certona.net": {
                  rules: [
                    {
                      rule: "edge1.certona.net/cd/dd7aa8af/www.asics.com/scripts/resonance.js",
                      domains: [
                        "asics.com"
                      ]
                    }
                  ]
                },
                "civiccomputing.com": {
                  rules: [
                    {
                      rule: "civiccomputing\\.com\\/9\\/cookieControl-9\\.x\\.min\\.js",
                      domains: [
                        "collisionconf.com"
                      ]
                    }
                  ]
                },
                "cloudflare.com": {
                  rules: [
                    {
                      rule: "cdnjs.cloudflare.com/cdn-cgi/scripts/.*/cloudflare-static/rocket-loader.min.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdnjs.cloudflare.com/ajax/libs/leaflet/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdnjs.cloudflare.com/ajax/libs/three.js/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdnjs.cloudflare.com/ajax/libs/vue/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdnjs.cloudflare.com/ajax/libs/video.js/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdnjs.cloudflare.com/ajax/libs/headjs/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdnjs.cloudflare.com/ajax/libs/hola_player/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/1.8.6/fingerprint2.min.js",
                      domains: [
                        "winnipegfreepress.com"
                      ]
                    },
                    {
                      rule: "challenges.cloudflare.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "cloudfront.net": {
                  rules: [
                    {
                      rule: "d3oxtup47gylpj.cloudfront.net/theme/onlyfans/spa/chunk-vendors.js",
                      domains: [
                        "onlyfans.com"
                      ]
                    },
                    {
                      rule: "d3nn82uaxijpm6.cloudfront.net/",
                      domains: [
                        "strava.com"
                      ]
                    },
                    {
                      rule: "d9k0w0y3delq8.cloudfront.net",
                      domains: [
                        "hoyolab.com",
                        "hoyoverse.com"
                      ]
                    },
                    {
                      rule: "d2s6j0ghajv79z.cloudfront.net",
                      domains: [
                        "sigalert.com"
                      ]
                    },
                    {
                      rule: "dbukjj6eu5tsf.cloudfront.net/assets.sidearmsports.com/common/js/20170825/video.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "computerworld.com": {
                  rules: [
                    {
                      rule: "cmpv2.computerworld.com/",
                      domains: [
                        "computerworld.com"
                      ]
                    }
                  ]
                },
                "connatix.com": {
                  rules: [
                    {
                      rule: "cd.connatix.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cds.connatix.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdn.connatix.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "capi.connatix.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "vid.connatix.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "img.connatix.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "connatix.com",
                      domains: [
                        "accuweather.com",
                        "dailymail.co.uk"
                      ]
                    }
                  ]
                },
                "cookielaw.org": {
                  rules: [
                    {
                      rule: "cookielaw.org",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "cookiepro.com": {
                  rules: [
                    {
                      rule: "cookie-cdn.cookiepro.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "cquotient.com": {
                  rules: [
                    {
                      rule: "cdn.cquotient.com/js/v2/gretel.min.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "e.cquotient.com/recs/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "p.cquotient.com/pebble",
                      domains: [
                        "scheels.com"
                      ]
                    }
                  ]
                },
                "crisp.chat": {
                  rules: [
                    {
                      rule: "crisp.chat",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "criteo.com": {
                  rules: [
                    {
                      rule: "bidder.criteo.com/cdb",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "criteo.net": {
                  rules: [
                    {
                      rule: "static.criteo.net/js/ld/publishertag.js",
                      domains: [
                        "wp.pl"
                      ]
                    },
                    {
                      rule: "static.criteo.net/js/ld/publishertag.prebid.js",
                      domains: [
                        "wp.pl"
                      ]
                    }
                  ]
                },
                "cudasvc.com": {
                  rules: [
                    {
                      rule: "cudasvc.com/url",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "cxense.com": {
                  rules: [
                    {
                      rule: "cxense.com/public/widget",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cxense.com/cx.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cxense.com/cx.cce.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "datadoghq-browser-agent.com": {
                  rules: [
                    {
                      rule: "www.datadoghq-browser-agent.com/datadog-logs-v4.js",
                      domains: [
                        "shapermint.com"
                      ]
                    }
                  ]
                },
                "datadome.co": {
                  rules: [
                    {
                      rule: "datadome.co",
                      domains: [
                        "thetrainline.com"
                      ]
                    }
                  ]
                },
                "daumcdn.net": {
                  rules: [
                    {
                      rule: "daumcdn.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "demdex.net": {
                  rules: [
                    {
                      rule: "dpm.demdex.net/id",
                      domains: [
                        "dhl.de",
                        "homedepot.com"
                      ]
                    }
                  ]
                },
                "derstandard.de": {
                  rules: [
                    {
                      rule: "spcmp.r53.derstandard.de/",
                      domains: [
                        "derstandard.de"
                      ]
                    }
                  ]
                },
                "doubleclick.net": {
                  rules: [
                    {
                      rule: "doubleclick.net/ondemand/hls/content/",
                      domains: [
                        "history.com"
                      ]
                    },
                    {
                      rule: "securepubads.g.doubleclick.net/gampad/ads",
                      domains: [
                        "ah.nl",
                        "rocketnews24.com"
                      ]
                    },
                    {
                      rule: "pubads.g.doubleclick.net/gampad/ads",
                      domains: [
                        "crunchyroll.com",
                        "nhl.com",
                        "rocketnews24.com",
                        "viki.com"
                      ]
                    },
                    {
                      rule: "pubads.g.doubleclick.net/ssai/event/",
                      domains: [
                        "cbssports.com",
                        "rocketnews24.com"
                      ]
                    },
                    {
                      rule: "pubads.g.doubleclick.net/ssai/pods/",
                      domains: [
                        "foxweather.com"
                      ]
                    },
                    {
                      rule: "securepubads.g.doubleclick.net/tag/js/gpt.js",
                      domains: [
                        "ah.nl",
                        "nytimes.com",
                        "rocketnews24.com",
                        "wunderground.com",
                        "youmath.it"
                      ]
                    },
                    {
                      rule: "securepubads.g.doubleclick.net/gpt/pubads_impl_",
                      domains: [
                        "ah.nl",
                        "rocketnews24.com",
                        "wunderground.com"
                      ]
                    },
                    {
                      rule: "securepubads.g.doubleclick.net/pagead/ppub_config",
                      domains: [
                        "rocketnews24.com",
                        "weather.com",
                        "wunderground.com"
                      ]
                    },
                    {
                      rule: "doubleclick.net",
                      domains: [
                        "rocketnews24.com"
                      ]
                    }
                  ]
                },
                "driftt.com": {
                  rules: [
                    {
                      rule: "driftt.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "dynamicyield.com": {
                  rules: [
                    {
                      rule: "cdn.dynamicyield.com/api/",
                      domains: [
                        "asics.com",
                        "brooklinen.com",
                        "carters.com",
                        "seatosummit.com"
                      ]
                    }
                  ]
                },
                "eccmp.com": {
                  rules: [
                    {
                      rule: "eccmp.com/sts/scripts/conversen-SDK.js",
                      domains: [
                        "pch.com"
                      ]
                    }
                  ]
                },
                "edgekey.net": {
                  rules: [
                    {
                      rule: "scene7.com.edgekey.net/s7viewersdk",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "nintendo.com.edgekey.net/account/js/common.js",
                      domains: [
                        "nintendo.com"
                      ]
                    },
                    {
                      rule: "cdn.agoda.net.edgekey.net/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "edgesuite.net": {
                  rules: [
                    {
                      rule: "sky.com.edgesuite.net/assets/sky_common.js",
                      domains: [
                        "sky.com"
                      ]
                    },
                    {
                      rule: "a.espncdn.com.stls.edgesuite.net/",
                      domains: [
                        "espn.co.uk",
                        "espn.com",
                        "espn.com.au",
                        "espn.com.br",
                        "espn.com.mx",
                        "espn.in",
                        "espnfc.com"
                      ]
                    }
                  ]
                },
                "ensighten.com": {
                  rules: [
                    {
                      rule: "ensighten.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "ezodn.com": {
                  rules: [
                    {
                      rule: "ezodn.com/cmp",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "ezoic.com": {
                  rules: [
                    {
                      rule: "videosvc.ezoic.com/play",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "video-streaming.ezoic.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "ezoic.net": {
                  rules: [
                    {
                      rule: "g.ezoic.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "ezoiccdn.com": {
                  rules: [
                    {
                      rule: "sf.ezoiccdn.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "facebook.net": {
                  rules: [
                    {
                      rule: "connect.facebook.net/en_US/sdk.js",
                      domains: [
                        "bandsintown.com",
                        "nextdoor.co.uk",
                        "nextdoor.com"
                      ]
                    },
                    {
                      rule: "connect.facebook.net/en_US/all.js",
                      domains: [
                        "nordicwellness.se"
                      ]
                    },
                    {
                      rule: "connect.facebook.net/en_US/fbevents.js",
                      domains: [
                        "wp.pl"
                      ]
                    }
                  ]
                },
                "fastly.net": {
                  rules: [
                    {
                      rule: "mslc-prod-herokuapp-com.global.ssl.fastly.net/main.8736233213226195.js",
                      domains: [
                        "masslottery.com"
                      ]
                    },
                    {
                      rule: "ticketmaster4.map.fastly.net/eps-d",
                      domains: [
                        "ticketmaster.ca",
                        "ticketmaster.com",
                        "ticketmaster.com.au",
                        "ticketmaster.com.mx"
                      ]
                    },
                    {
                      rule: "target-opus.map.fastly.net/",
                      domains: [
                        "target.com"
                      ]
                    }
                  ]
                },
                "five9.com": {
                  rules: [
                    {
                      rule: "app.five9.com",
                      domains: [
                        "gmsdnv.com",
                        "machiassavings.bank"
                      ]
                    }
                  ]
                },
                "flowplayer.org": {
                  rules: [
                    {
                      rule: "flowplayer.org",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "fox.com": {
                  rules: [
                    {
                      rule: "fox.com",
                      domains: [
                        "adrise.tv",
                        "fncstatic.com",
                        "fox10phoenix.com",
                        "fox13news.com",
                        "fox26houston.com",
                        "fox29.com",
                        "fox2detroit.com",
                        "fox32chicago.com",
                        "fox35orlando.com",
                        "fox46charlotte.com",
                        "fox4news.com",
                        "fox5atlanta.com",
                        "fox5dc.com",
                        "fox5ny.com",
                        "fox7austin.com",
                        "fox9.com",
                        "foxbusiness.com",
                        "foxla.com",
                        "foxnews.com",
                        "foxsports.com",
                        "foxsportsasia.com",
                        "foxsportsgo.com",
                        "foxweather.com",
                        "ktvu.com",
                        "tubi.io",
                        "tubi.tv",
                        "tubi.video",
                        "tubitv.com"
                      ]
                    }
                  ]
                },
                "fwmrm.net": {
                  rules: [
                    {
                      rule: "2a7e9.v.fwmrm.net/ad/g/1",
                      domains: [
                        "channel4.com"
                      ]
                    }
                  ]
                },
                "geetest.com": {
                  rules: [
                    {
                      rule: "api.geetest.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "static.geetest.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "gemius.pl": {
                  rules: [
                    {
                      rule: "gapl.hit.gemius.pl/gplayer.js",
                      domains: [
                        "tvp.pl"
                      ]
                    },
                    {
                      rule: "pro.hit.gemius.pl/gstream.js",
                      domains: [
                        "tvp.pl"
                      ]
                    },
                    {
                      rule: "wp.hit.gemius.pl/xgemius.js",
                      domains: [
                        "wp.pl"
                      ]
                    }
                  ]
                },
                "geoip-js.com": {
                  rules: [
                    {
                      rule: "geoip-js.com/js/apis/geoip2/v2.1/geoip2.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "getshogun.com": {
                  rules: [
                    {
                      rule: "cdn.getshogun.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "lib.getshogun.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "google-analytics.com": {
                  rules: [
                    {
                      rule: "google-analytics.com/analytics.js",
                      domains: [
                        "doterra.com",
                        "easyjet.com",
                        "worlddutyfree.com"
                      ]
                    },
                    {
                      rule: "www.google-analytics.com/plugins/ua/ecommerce.js",
                      domains: [
                        "doterra.com"
                      ]
                    },
                    {
                      rule: "www.google-analytics.com/collect",
                      domains: [
                        "youmath.it"
                      ]
                    }
                  ]
                },
                "google.co.uk": {
                  rules: [
                    {
                      rule: "maps.google.co.uk/maps",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "google.com": {
                  rules: [
                    {
                      rule: "accounts.google.com/o/oauth2/iframerpc",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "accounts.google.com/o/oauth2/iframe",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "apis.google.com/js/platform.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "apis.google.com/_/scs/abc-static/_/js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cse.google.com/cse.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cse.google.com/cse/element/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "google.com/cse/cse.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.google.com/cse/static/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.google.com/url",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.google.com/maps/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "googleapis.com": {
                  rules: [
                    {
                      rule: "imasdk.googleapis.com/js/sdkloader/ima3.js",
                      domains: [
                        "gamak.tv",
                        "metro.co.uk",
                        "paper-io.com",
                        "rawstory.com"
                      ]
                    }
                  ]
                },
                "googleoptimize.com": {
                  rules: [
                    {
                      rule: "googleoptimize.com/optimize.js",
                      domains: [
                        "motherdenim.com"
                      ]
                    }
                  ]
                },
                "googlesyndication.com": {
                  rules: [
                    {
                      rule: "pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
                      domains: [
                        "drakescans.com",
                        "duden.de",
                        "magicgameworld.com",
                        "rocketnews24.com",
                        "youmath.it",
                        "zefoy.com"
                      ]
                    },
                    {
                      rule: "pagead2.googlesyndication.com/pagead/show_ads.js",
                      domains: [
                        "luckylandslots.com",
                        "rocketnews24.com",
                        "zefoy.com"
                      ]
                    },
                    {
                      rule: "tpc.googlesyndication.com/pagead/js/loader21.html",
                      domains: [
                        "laprensa.hn",
                        "rocketnews24.com",
                        "rumble.com",
                        "zefoy.com"
                      ]
                    },
                    {
                      rule: "googlesyndication.com",
                      domains: [
                        "rocketnews24.com",
                        "zefoy.com"
                      ]
                    }
                  ]
                },
                "googletagmanager.com": {
                  rules: [
                    {
                      rule: "googletagmanager.com/gtag/js",
                      domains: [
                        "abril.com.br",
                        "cosmicbook.news"
                      ]
                    }
                  ]
                },
                "googletagservices.com": {
                  rules: [
                    {
                      rule: "googletagservices.com/tag/js/gpt.js",
                      domains: [
                        "13wham.com",
                        "22thepoint.com",
                        "abc3340.com",
                        "abc45.com",
                        "abc6onyourside.com",
                        "abc7amarillo.com",
                        "abcnews4.com",
                        "abcstlouis.com",
                        "azteca48.com",
                        "bakersfieldnow.com",
                        "cbs12.com",
                        "cbs2iowa.com",
                        "cbs4local.com",
                        "cbs6albany.com",
                        "cbsaustin.com",
                        "chattanoogacw.com",
                        "cnycentral.com",
                        "cw14online.com",
                        "cw18milwaukee.com",
                        "cw23tv.com",
                        "cw34.com",
                        "cw35.com",
                        "cw7michigan.com",
                        "cwalbany.com",
                        "cwbaltimore.com",
                        "cwcentralpa.com",
                        "cwcincinnati.com",
                        "cwcolumbus.com",
                        "cwlasvegas.com",
                        "cwnashville.tv",
                        "cwokc.com",
                        "cwomaha.tv",
                        "cwrochester.com",
                        "cwtreasurevalley.com",
                        "dayton247now.com",
                        "fox11online.com",
                        "fox17.com",
                        "fox23maine.com",
                        "fox28savannah.com",
                        "fox38corpuschristi.com",
                        "fox42kptm.com",
                        "fox47.com",
                        "fox49.tv",
                        "fox4beaumont.com",
                        "fox56.com",
                        "foxbaltimore.com",
                        "foxchattanooga.com",
                        "foxillinois.com",
                        "foxkansas.com",
                        "foxnebraska.com",
                        "foxreno.com",
                        "foxrichmond.com",
                        "foxrochester.com",
                        "foxsanantonio.com",
                        "idahonews.com",
                        "katu.com",
                        "katv.com",
                        "kcby.com",
                        "kdsm17.com",
                        "keprtv.com",
                        "kfdm.com",
                        "kfoxtv.com",
                        "khqa.com",
                        "kimatv.com",
                        "kjzz.com",
                        "klewtv.com",
                        "kmph.com",
                        "kmyu.tv",
                        "komonews.com",
                        "kpic.com",
                        "krcgtv.com",
                        "ktul.com",
                        "ktvl.com",
                        "ktvo.com",
                        "ktxs.com",
                        "kunptv.com",
                        "kunwtv.com",
                        "kutv.com",
                        "kval.com",
                        "local12.com",
                        "local21news.com",
                        "midmichigannow.com",
                        "my15wtcn.com",
                        "my24milwaukee.com",
                        "my48.tv",
                        "mycbs4.com",
                        "myfox28columbus.com",
                        "mylvtv.com",
                        "mynbc15.com",
                        "mynews4.com",
                        "myrdctv.com",
                        "mytv30web.com",
                        "mytvbaltimore.com",
                        "mytvbuffalo.com",
                        "mytvcharleston.com",
                        "mytvrichmond.com",
                        "mytvwichita.com",
                        "mytvz.com",
                        "nbc16.com",
                        "nbc24.com",
                        "nbcmontana.com",
                        "nebraska.tv",
                        "nevadasportsnet.com",
                        "news3lv.com",
                        "news4sanantonio.com",
                        "newschannel20.com",
                        "newschannel9.com",
                        "okcfox.com",
                        "raleighcw.com",
                        "siouxlandnews.com",
                        "southernoregoncw.com",
                        "star64.tv",
                        "thecw38.com",
                        "thecw46.com",
                        "thecwtc.com",
                        "thenationaldesk.com",
                        "turnto10.com",
                        "univisionseattle.com",
                        "upnorthlive.com",
                        "utv44.com",
                        "wabm68.com",
                        "wach.com",
                        "wchstv.com",
                        "wcti12.com",
                        "wcyb.com",
                        "weartv.com",
                        "wfgxtv.com",
                        "wfxl.com",
                        "wgme.com",
                        "wgxa.tv",
                        "wjactv.com",
                        "wjla.com",
                        "wlos.com",
                        "wpde.com",
                        "wpgh53.com",
                        "wsbt.com",
                        "wset.com",
                        "wtov9.com",
                        "wtto21.com",
                        "wtwc40.com",
                        "wutv29.com",
                        "wvah.com",
                        "wwmt.com"
                      ]
                    }
                  ]
                },
                "gorgias.chat": {
                  rules: [
                    {
                      rule: "config.gorgias.chat",
                      domains: [
                        "help.athleticbrewing.com"
                      ]
                    },
                    {
                      rule: "assets.gorgias.chat",
                      domains: [
                        "help.athleticbrewing.com"
                      ]
                    }
                  ]
                },
                "greylabeldelivery.com": {
                  rules: [
                    {
                      rule: "tags.asics.com.greylabeldelivery.com",
                      domains: [
                        "asics.com"
                      ]
                    },
                    {
                      rule: "tags.focus.de.greylabeldelivery.com/focus-web/prod/utag.js",
                      domains: [
                        "focus.de"
                      ]
                    }
                  ]
                },
                "groovehq.com": {
                  rules: [
                    {
                      rule: "widget.cluster.groovehq.com/_next/static/chunks/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "gstatic.com": {
                  rules: [
                    {
                      rule: "maps.gstatic.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "www.gstatic.com/_/mss/boq-identity/_/js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "heapanalytics.com": {
                  rules: [
                    {
                      rule: "cdn.heapanalytics.com",
                      domains: [
                        "mejuri.com"
                      ]
                    }
                  ]
                },
                "htlbid.com": {
                  rules: [
                    {
                      rule: "htlbid.com/v3/dangerousminds.net/htlbid.js",
                      domains: [
                        "dangerousminds.net"
                      ]
                    }
                  ]
                },
                "hubspot.com": {
                  rules: [
                    {
                      rule: "api.hubspot.com/livechat-public/v1/message/public",
                      domains: [
                        "pippintitle.com"
                      ]
                    },
                    {
                      rule: "no-cache.hubspot.com/cta/default/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "iesnare.com": {
                  rules: [
                    {
                      rule: "mpsnare.iesnare.com/snare.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "iheart.com": {
                  rules: [
                    {
                      rule: "iheart.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "impervadns.net": {
                  rules: [
                    {
                      rule: "e9pkvlf.impervadns.net",
                      domains: [
                        "cox.com",
                        "cox.net"
                      ]
                    }
                  ]
                },
                "inq.com": {
                  rules: [
                    {
                      rule: "inq.com/chatrouter",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "inq.com/chatskins",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "inq.com/tagserver/init",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "inq.com/tagserver/launch",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "inq.com/tagserver/postToServer",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "instagram.com": {
                  rules: [
                    {
                      rule: "platform.instagram.com/en_US/embeds.js",
                      domains: [
                        "livejournal.com"
                      ]
                    },
                    {
                      rule: "www.instagram.com/embed.js",
                      domains: [
                        "buzzfeed.com",
                        "livejournal.com"
                      ]
                    }
                  ]
                },
                "ipify.org": {
                  rules: [
                    {
                      rule: "api.ipify.org/",
                      domains: [
                        "mass.gov"
                      ]
                    }
                  ]
                },
                "jimstatic.com": {
                  rules: [
                    {
                      rule: "assets.jimstatic.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "jsdelivr.net": {
                  rules: [
                    {
                      rule: "cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.js",
                      domains: [
                        "sbermarket.ru"
                      ]
                    }
                  ]
                },
                "kampyle.com": {
                  rules: [
                    {
                      rule: "nebula-cdn.kampyle.com/wu/392339/onsite/embed.js",
                      domains: [
                        "lowes.com"
                      ]
                    },
                    {
                      rule: "kampyle.com",
                      domains: [
                        "basspro.com"
                      ]
                    }
                  ]
                },
                "klarnaservices.com": {
                  rules: [
                    {
                      rule: "na-library.klarnaservices.com/lib.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "eu-library.klarnaservices.com/lib.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "osm.library.klarnaservices.com/lib.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "klaviyo.com": {
                  rules: [
                    {
                      rule: "www.klaviyo.com/media/js/public/klaviyo_subscribe.js",
                      domains: [
                        "fearofgod.com",
                        "shopyalehome.com"
                      ]
                    },
                    {
                      rule: "static.klaviyo.com/onsite/js/klaviyo.js",
                      domains: [
                        "essentialpraxis.com",
                        "kidsguide.com",
                        "urbanebikes.com"
                      ]
                    },
                    {
                      rule: "a.klaviyo.com/media/js/onsite/onsite.js",
                      domains: [
                        "tanglefree.com"
                      ]
                    },
                    {
                      rule: "klaviyo.com/",
                      domains: [
                        "andieswim.com",
                        "footweartruth.com",
                        "kmail-lists.com"
                      ]
                    }
                  ]
                },
                "lightboxcdn.com": {
                  rules: [
                    {
                      rule: "www.lightboxcdn.com/vendor/c605dbd7-cbfb-4e9b-801e-387b0656384c/user.js",
                      domains: [
                        "andieswim.com"
                      ]
                    },
                    {
                      rule: "lightboxcdn.com/vendor/.*/user.js",
                      domains: [
                        "nascar.com"
                      ]
                    }
                  ]
                },
                "listrakbi.com": {
                  rules: [
                    {
                      rule: "cdn.listrakbi.com/scripts/script.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "livechatinc.com": {
                  rules: [
                    {
                      rule: "livechatinc.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "liveperson.net": {
                  rules: [
                    {
                      rule: "liveperson.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "loggly.com": {
                  rules: [
                    {
                      rule: "cloudfront.loggly.com/js/loggly.tracker-2.1.min.js",
                      domains: [
                        "rte.ie"
                      ]
                    }
                  ]
                },
                "lpsnmedia.net": {
                  rules: [
                    {
                      rule: "lpsnmedia.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "ltwebstatic.com": {
                  rules: [
                    {
                      rule: "sheinsz.ltwebstatic.com/she_dist/libs/geetest/fullpage.1.1.9.js",
                      domains: [
                        "shein.co.uk",
                        "shein.com"
                      ]
                    }
                  ]
                },
                "maxymiser.net": {
                  rules: [
                    {
                      rule: "service.maxymiser.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "medallia.com": {
                  rules: [
                    {
                      rule: "cdn.medallia.com/react-surveys/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "survey.medallia.com/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "mediavine.com": {
                  rules: [
                    {
                      rule: "scripts.mediavine.com/tags/cosmic-book-news.js",
                      domains: [
                        "cosmicbook.news"
                      ]
                    }
                  ]
                },
                "medicare.gov": {
                  rules: [
                    {
                      rule: "frontend.medicare.gov/static/js/2.6c6651b4.chunk.js",
                      domains: [
                        "medicare.gov"
                      ]
                    }
                  ]
                },
                "memberful.com": {
                  rules: [
                    {
                      rule: "memberful.com/embed.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "myfonts.net": {
                  rules: [
                    {
                      rule: "hello.myfonts.net/count/3f4e3a",
                      domains: [
                        "ottolenghi.co.uk"
                      ]
                    }
                  ]
                },
                "nc0.co": {
                  rules: [
                    {
                      rule: "nc0.co/vaa/Bootstrap.js",
                      domains: [
                        "virginatlantic.com"
                      ]
                    }
                  ]
                },
                "nextdoor.com": {
                  rules: [
                    {
                      rule: "nextdoor.com",
                      domains: [
                        "nextdoor.co.uk"
                      ]
                    }
                  ]
                },
                "nintendo.com": {
                  rules: [
                    {
                      rule: "cdn.accounts.nintendo.com/account/js/common.js",
                      domains: [
                        "nintendo.com"
                      ]
                    }
                  ]
                },
                "nosto.com": {
                  rules: [
                    {
                      rule: "connect.nosto.com/script/shopify/nosto.js",
                      domains: [
                        "oneill.com"
                      ]
                    }
                  ]
                },
                "nuance.com": {
                  rules: [
                    {
                      rule: "nuance.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "omappapi.com": {
                  rules: [
                    {
                      rule: "omappapi.com",
                      domains: [
                        "dogfoodadvisor.com"
                      ]
                    }
                  ]
                },
                "omnitagjs.com": {
                  rules: [
                    {
                      rule: "hb-api.omnitagjs.com/hb-api/prebid/v1",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "omtrdc.net": {
                  rules: [
                    {
                      rule: "bankofamerica.tt.omtrdc.net/m2/bankofamerica/mbox/json",
                      domains: [
                        "bankofamerica.com"
                      ]
                    },
                    {
                      rule: "cigna.sc.omtrdc.net/public/digital-experience/js/common.js",
                      domains: [
                        "cigna.com"
                      ]
                    },
                    {
                      rule: "omtrdc.net",
                      domains: [
                        "pizzahut.com"
                      ]
                    }
                  ]
                },
                "onesignal.com": {
                  rules: [
                    {
                      rule: "cdn.onesignal.com/sdks/OneSignalSDK.js",
                      domains: [
                        "cosmicbook.news"
                      ]
                    }
                  ]
                },
                "onlyfans.com": {
                  rules: [
                    {
                      rule: "static.onlyfans.com",
                      domains: [
                        "onlyfans.com"
                      ]
                    }
                  ]
                },
                "openx.net": {
                  rules: [
                    {
                      rule: "venatusmedia-d.openx.net/w/1.0/arj",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "opta.net": {
                  rules: [
                    {
                      rule: "secure.widget.cloud.opta.net/v3/v3.opta-widgets.js",
                      domains: [
                        "abc.net.au",
                        "emol.com",
                        "oufc.co.uk"
                      ]
                    }
                  ]
                },
                "optimizely.com": {
                  rules: [
                    {
                      rule: "optimizely.com/datafiles/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "osano.com": {
                  rules: [
                    {
                      rule: "dsar.api.osano.com/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp.osano.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "pardot.com": {
                  rules: [
                    {
                      rule: "go.pardot.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "storage.pardot.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "patreon.com": {
                  rules: [
                    {
                      rule: "patreon.com/becomePatronButton.bundle.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "permutive.app": {
                  rules: [
                    {
                      rule: "edge.permutive.app",
                      domains: [
                        "globaltv.com"
                      ]
                    }
                  ]
                },
                "plotrabbit.com": {
                  rules: [
                    {
                      rule: "plotrabbit.com",
                      domains: [
                        "cbssports.com"
                      ]
                    }
                  ]
                },
                "primaryarms.com": {
                  rules: [
                    {
                      rule: "images.primaryarms.com/f00000000191638/www.primaryarms.com/SSP%20Applications/NetSuite%20Inc.%20-%20SCA%20Mont%20Blanc/Development/img/",
                      domains: [
                        "primaryarms.com"
                      ]
                    },
                    {
                      rule: "images.primaryarms.com/f00000000191638/www.primaryarms.com/core/media/media.nl",
                      domains: [
                        "primaryarms.com"
                      ]
                    }
                  ]
                },
                "primis.tech": {
                  rules: [
                    {
                      rule: "live.primis.tech/live/liveView.php",
                      domains: [
                        "belfastlive.co.uk",
                        "cornwalllive.com"
                      ]
                    }
                  ]
                },
                "privacy-center.org": {
                  rules: [
                    {
                      rule: "sdk.privacy-center.org",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "privacy-mgmt.com": {
                  rules: [
                    {
                      rule: "privacy-mgmt.com/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "privacymanager.io": {
                  rules: [
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/605.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/650.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/847.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/assets/icons/.*.svg",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/defaultTheme.css",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/index.html",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/main.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/polyfills.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/runtime.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cmp-consent-tool.privacymanager.io/latest/vendor.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "gdpr.privacymanager.io/1/gdpr.bundle.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "gdpr.privacymanager.io/latest/gdpr.bundle.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "gdpr-wrapper.privacymanager.io/gdpr/.*/gdpr-liveramp.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "gdpr-wrapper.privacymanager.io/gdpr/.*/manager-logo.png",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "vendors.privacymanager.io/vendor-list.json",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "proofpoint.com": {
                  rules: [
                    {
                      rule: "proofpoint.com/v2/url",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "pubmatic.com": {
                  rules: [
                    {
                      rule: "ads.pubmatic.com/AdServer/",
                      domains: [
                        "hindustantimes.com"
                      ]
                    },
                    {
                      rule: "hbopenbid.pubmatic.com/translator",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "qualtrics.com": {
                  rules: [
                    {
                      rule: "qualtrics.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "quantcast.com": {
                  rules: [
                    {
                      rule: "cmp.quantcast.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "quantserve.com": {
                  rules: [
                    {
                      rule: "secure.quantserve.com/quant.js",
                      domains: [
                        "aternos.org"
                      ]
                    }
                  ]
                },
                "reddit.com": {
                  rules: [
                    {
                      rule: "embed.reddit.com/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "gql.reddit.com/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "redditstatic.com": {
                  rules: [
                    {
                      rule: "redditstatic.com/shreddit/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "rncdn7.com": {
                  rules: [
                    {
                      rule: "rncdn7.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "rokt.com": {
                  rules: [
                    {
                      rule: "rokt.com/wsdk/integrations/snippet.js",
                      domains: [
                        "pch.com"
                      ]
                    }
                  ]
                },
                "route.com": {
                  rules: [
                    {
                      rule: "protection-widget.route.com/protect.core.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "rumble.com": {
                  rules: [
                    {
                      rule: "rumble.com/j/p/ui.r2.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "sail-horizon.com": {
                  rules: [
                    {
                      rule: "ak.sail-horizon.com/spm/spm.v1.min.js",
                      domains: [
                        "financialpost.com"
                      ]
                    }
                  ]
                },
                "scene7.com": {
                  rules: [
                    {
                      rule: "scene7.com/is/image/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "scene7.com/s7viewersdk",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "searchspring.io": {
                  rules: [
                    {
                      rule: "searchspring.io",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "segment.com": {
                  rules: [
                    {
                      rule: "cdn.segment.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "shop.app": {
                  rules: [
                    {
                      rule: "shop.app/pay/session",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "shopeemobile.com": {
                  rules: [
                    {
                      rule: "deo.shopeemobile.com/shopee",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "shopifyapps.com": {
                  rules: [
                    {
                      rule: "shopifyapps.com/locale_bar/script.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "shopifyapps.com/selectors/script.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "shortpixel.ai": {
                  rules: [
                    {
                      rule: "cdn.shortpixel.ai/assets/js/bundles/spai-lib-bg",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "slickstream.com": {
                  rules: [
                    {
                      rule: "app.slickstream.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "snapkit.com": {
                  rules: [
                    {
                      rule: "snapkit.com/js/v1/create.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "speedcurve.com": {
                  rules: [
                    {
                      rule: "cdn.speedcurve.com/js/lux.js",
                      domains: [
                        "inquirer.com"
                      ]
                    }
                  ]
                },
                "spiegel.de": {
                  rules: [
                    {
                      rule: "sp-spiegel-de.spiegel.de/",
                      domains: [
                        "spiegel.de"
                      ]
                    }
                  ]
                },
                "spot.im": {
                  rules: [
                    {
                      rule: "spot.im/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "strpst.com": {
                  rules: [
                    {
                      rule: "strpst.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "succeedscene.com": {
                  rules: [
                    {
                      rule: "succeedscene.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "taboola.com": {
                  rules: [
                    {
                      rule: "cdn.taboola.com/libtrc/tipranks-tipranks/loader.js",
                      domains: [
                        "tipranks.com"
                      ]
                    }
                  ]
                },
                "tealiumiq.com": {
                  rules: [
                    {
                      rule: "visitor-service-us-east-1.tealiumiq.com/asics/main/",
                      domains: [
                        "asics.com"
                      ]
                    }
                  ]
                },
                "techlab-cdn.com": {
                  rules: [
                    {
                      rule: "techlab-cdn.com/collect",
                      domains: [
                        "jcrew.com"
                      ]
                    }
                  ]
                },
                "tfaforms.net": {
                  rules: [
                    {
                      rule: "tfaforms.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "theplatform.com": {
                  rules: [
                    {
                      rule: "theplatform.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "tidiochat.com": {
                  rules: [
                    {
                      rule: "tidiochat.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "tiktok.com": {
                  rules: [
                    {
                      rule: "www.tiktok.com/embed",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "tiqcdn.com": {
                  rules: [
                    {
                      rule: "tags.tiqcdn.com/utag/.*/utag.js",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "tags.tiqcdn.com/utag/.*/utag..*.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "trackjs.com": {
                  rules: [
                    {
                      rule: "cdn.trackjs.com/agent/v3/latest/t.js",
                      domains: [
                        "delta.com"
                      ]
                    }
                  ]
                },
                "trustpilot.com": {
                  rules: [
                    {
                      rule: "widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js",
                      domains: [
                        "azurestandard.com",
                        "domesticandgeneral.com",
                        "www.hotpoint.co.uk"
                      ]
                    },
                    {
                      rule: "widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js",
                      domains: [
                        "www.hotpoint.co.uk"
                      ]
                    }
                  ]
                },
                "twitter.com": {
                  rules: [
                    {
                      rule: "platform.twitter.com/embed/embed",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "platform.twitter.com/widgets/tweet_button",
                      domains: [
                        "winnipegfreepress.com"
                      ]
                    }
                  ]
                },
                "usabilla.com": {
                  rules: [
                    {
                      rule: "api.usabilla.com",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "w.usabilla.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "usercentrics.eu": {
                  rules: [
                    {
                      rule: "api.usercentrics.eu/settings",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "api.usercentrics.eu/tcf",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "api.usercentrics.eu/translations",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "app.usercentrics.eu/browser",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "app.usercentrics.eu/session/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "graphql.usercentrics.eu/graphql",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "privacy-proxy.usercentrics.eu/latest/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "aggregator.service.usercentrics.eu/aggregate",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "viafoura.net": {
                  rules: [
                    {
                      rule: "cdn.viafoura.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "viglink.com": {
                  rules: [
                    {
                      rule: "cdn.viglink.com/api/vglnk.js",
                      domains: [
                        "9to5mac.com"
                      ]
                    }
                  ]
                },
                "voxmedia.com": {
                  rules: [
                    {
                      rule: "voxmedia.com/sso/unison_request",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "wovn.io": {
                  rules: [
                    {
                      rule: "j.wovn.io/1",
                      domains: [
                        "tamashiiweb.com"
                      ]
                    }
                  ]
                },
                "wpadmngr.com": {
                  rules: [
                    {
                      rule: "js.wpadmngr.com/static/adManager.js",
                      domains: [
                        "luscious.net"
                      ]
                    }
                  ]
                },
                "yandex.ru": {
                  rules: [
                    {
                      rule: "frontend.vh.yandex.ru/player/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "strm.yandex.ru/get/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "strm.yandex.ru/vh-special-converted/vod-content/",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "yandex.ru/map-widget/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "yotpo.com": {
                  rules: [
                    {
                      rule: "yotpo.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "yottaa.com": {
                  rules: [
                    {
                      rule: "cdn.yottaa.com/rapid.min.",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "cdn.yottaa.com/rapid.security.min.",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "rapid-cdn.yottaa.com/rapid/lib/ows8CdAyrC5lTw.js",
                      domains: [
                        "scheels.com"
                      ]
                    },
                    {
                      rule: "rapid-cdn.yottaa.com/rapid/lib/3ZzYwky2C-3YQw.js",
                      domains: [
                        "fashionnova.com"
                      ]
                    }
                  ]
                },
                "zencdn.net": {
                  rules: [
                    {
                      rule: "vjs.zencdn.net",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "zeustechnology.com": {
                  rules: [
                    {
                      rule: "seattle-times.zeustechnology.com/main.js",
                      domains: [
                        "seattletimes.com"
                      ]
                    }
                  ]
                },
                "zip.co": {
                  rules: [
                    {
                      rule: "zip.co/v1/quadpay.js",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "zopim.com": {
                  rules: [
                    {
                      rule: "zopim.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "citi.com": {
                  rules: [
                    {
                      rule: "lp-03.chat.online.citi.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "bupa.com.au": {
                  rules: [
                    {
                      rule: "lp-07.customermessaging.bupa.com.au",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "optus.com.au": {
                  rules: [
                    {
                      rule: "lp-07.messaging.optus.com.au",
                      domains: [
                        "<all>"
                      ]
                    },
                    {
                      rule: "lptag.messaging.optus.com.au",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "canadapost-postescanada.ca": {
                  rules: [
                    {
                      rule: "evaluation.canadapost-postescanada.ca",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "goto.com": {
                  rules: [
                    {
                      rule: "feedback.goto.com",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                },
                "yandex.tm": {
                  rules: [
                    {
                      rule: "mc.yandex.tm/map-widget/",
                      domains: [
                        "<all>"
                      ]
                    }
                  ]
                }
              }
            },
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            hash: "b3ee534a1ad20f0eeeb62c7e015ccff5"
          },
          trackingCookies1p: {
            settings: {
              firstPartyTrackerCookiePolicy: {
                threshold: 86400,
                maxAge: 86400
              }
            },
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "dd4e0fabd96da8feac161f65941b20cb"
          },
          trackingCookies3p: {
            settings: {
              excludedCookieDomains: []
            },
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "enabled",
            hash: "0a13af083145072bc11e43d20ec9dbc8"
          },
          trackingParameters: {
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            settings: {
              parameters: [
                "utm_source",
                "utm_medium",
                "utm_campaign",
                "utm_term",
                "utm_content",
                "gclid",
                "fbclid",
                "fb_action_ids",
                "fb_action_types",
                "fb_source",
                "fb_ref",
                "ga_source",
                "ga_medium",
                "ga_term",
                "ga_content",
                "ga_campaign",
                "ga_place",
                "action_object_map",
                "action_type_map",
                "action_ref_map",
                "gs_l",
                "mkt_tok",
                "hmb_campaign",
                "hmb_source",
                "hmb_medium"
              ]
            },
            state: "enabled",
            minSupportedVersion: "2023.5.23",
            hash: "eb32b7513f28186cb3e208edcfcba954"
          },
          userAgentRotation: {
            settings: {
              agentExcludePatterns: []
            },
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "disabled",
            hash: "08c23312ab5ce02ed4a4e56e2f176517"
          },
          voiceSearch: {
            exceptions: [],
            state: "disabled",
            hash: "728493ef7a1488e4781656d3f9db84aa"
          },
          webCompat: {
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "disabled",
            hash: "f38902347ef4b5046416b093e79dca6a"
          },
          windowsPermissionUsage: {
            exceptions: [],
            state: "disabled",
            hash: "728493ef7a1488e4781656d3f9db84aa"
          },
          windowsStartupBoost: {
            exceptions: [
              {
                domain: "earth.google.com"
              },
              {
                domain: "iscorp.com"
              },
              {
                domain: "marvel.com"
              },
              {
                domain: "sundancecatalog.com"
              },
              {
                domain: "localhost"
              },
              {
                domain: "127.0.0.1"
              },
              {
                domain: "::1"
              },
              {
                domain: "livenation.com"
              },
              {
                domain: "ticketmaster.com"
              }
            ],
            state: "disabled",
            hash: "f38902347ef4b5046416b093e79dca6a"
          },
          windowsWaitlist: {
            exceptions: [],
            state: "disabled",
            hash: "728493ef7a1488e4781656d3f9db84aa"
          },
          windowsDownloadLink: {
            exceptions: [],
            state: "disabled",
            hash: "728493ef7a1488e4781656d3f9db84aa"
          }
        },
        unprotectedTemporary: []
      };
    }
  });

  // shared/data/etags.json
  var require_etags = __commonJS({
    "shared/data/etags.json"(exports2, module2) {
      module2.exports = {
        "config-etag": 'W/"033fb476c3ece609a8e9bf534c116328"',
        "current-mv3-tds-etag": "3c222272c0e8376cded30b095e62ea51",
        "fallback-mv3-tds-etag": "da18c835eadd0a76dbe9b09b7c4e8608"
      };
    }
  });

  // shared/js/background/storage/tds.js
  var load2, constants, settings, browserWrapper, extensionConfig, etags, configNames, TDSStorage, tds_default;
  var init_tds = __esm({
    "shared/js/background/storage/tds.js"() {
      "use strict";
      init_dexie();
      load2 = require_load();
      constants = require_constants();
      settings = require_settings();
      browserWrapper = (init_wrapper(), __toCommonJS(wrapper_exports));
      extensionConfig = require_extension_config();
      etags = require_etags();
      configNames = constants.tdsLists.map(({ name }) => name);
      TDSStorage = class {
        constructor() {
          this.dbc = new Dexie$1("tdsStorage");
          this.dbc.version(1).stores({
            tdsStorage: "name,data"
          });
          this.table = this.dbc.table("tdsStorage");
          this.tds = { entities: {}, trackers: {}, domains: {}, cnames: {} };
          this.surrogates = "";
          this.config = { features: {} };
          this.isInstalling = false;
          this._onUpdatedListeners = /* @__PURE__ */ new Map();
          this._onReadyResolvers = /* @__PURE__ */ new Map();
          this._onReadyPromises = /* @__PURE__ */ new Map();
          for (const configName of configNames) {
            this._onReadyPromises.set(
              configName,
              new Promise(
                (resolve) => {
                  this._onReadyResolvers.set(configName, resolve);
                }
              )
            );
          }
          this.updatePeriodInMinutes = 30;
          this.removeLegacyLists();
        }
        async initOnInstall() {
          this.isInstalling = true;
          this._installingPromise = await this._internalInitOnInstall();
          this.isInstalling = false;
        }
        async _internalInitOnInstall() {
          await settings.ready();
          const etagKey = "config-etag";
          const etagValue = settings.getSetting(etagKey);
          if (!etagValue) {
            settings.updateSetting(etagKey, etags[etagKey]);
            this.config = extensionConfig;
            await this.storeInLocalDB("config", extensionConfig);
          }
        }
        _internalOnListUpdate(configName, configValue) {
          return new Promise((resolve, reject) => {
            setTimeout(async () => {
              try {
                const readyResolve = this._onReadyResolvers.get(configName);
                if (readyResolve) {
                  readyResolve();
                  this._onReadyResolvers.delete(configName);
                }
                const etag = settings.getSetting(`${configName}-etag`) || "";
                const listeners = this._onUpdatedListeners.get(configName);
                if (listeners) {
                  for (const listener of listeners.slice()) {
                    await listener(configName, etag, configValue);
                  }
                }
                resolve(null);
              } catch (e) {
                reject(e);
              }
            }, 0);
          });
        }
        getLists(preferLocal = false) {
          return Promise.all(constants.tdsLists.map(
            async (list) => {
              if (preferLocal) {
                const lastUpdate = settings.getSetting(`${list.name}-lastUpdate`) || 0;
                const millisecondsSinceUpdate = Date.now() - lastUpdate;
                if (millisecondsSinceUpdate < this.updatePeriodInMinutes * 60 * 1e3) {
                  const localList = await this.getListFromLocalDB(list.name);
                  if (localList) {
                    return localList;
                  }
                }
              }
              return await this.getList(list);
            }
          ));
        }
        /**
         * @param {TDSList} list
         */
        async getList(list) {
          if (this.isInstalling) {
            await this._installingPromise;
          }
          const listCopy = JSON.parse(JSON.stringify(list));
          const etag = settings.getSetting(`${listCopy.name}-etag`) || "";
          const version = this.getVersionParam();
          const activeExperiment = settings.getSetting("activeExperiment");
          const channel = settings.getSetting(`${listCopy.name}-channel`) || "";
          let experiment = "";
          if (activeExperiment) {
            experiment = settings.getSetting("experimentData");
          }
          if (channel && listCopy.channels && listCopy.channels[channel]) {
            listCopy.url = listCopy.channels[channel];
          }
          if (experiment && experiment.listName === listCopy.name) {
            listCopy.url = experiment.url;
          }
          if (version && listCopy.source === "external") {
            listCopy.url += version;
          }
          const source = listCopy.source ? listCopy.source : "external";
          return this.getDataXHR(listCopy, etag, source).then((response) => {
            const localTime = Date.now();
            const serverTime = Date.parse(response.date);
            const updateTime = Math.min(localTime, serverTime || localTime);
            settings.updateSetting(`${listCopy.name}-lastUpdate`, updateTime);
            if (response && response.status === 200) {
              const newEtag = response.etag || "";
              settings.updateSetting(`${listCopy.name}-etag`, newEtag);
            }
            return this.processData(listCopy.name, response.data).then((resultData) => {
              if (resultData) {
                this[listCopy.name] = resultData;
                this._internalOnListUpdate(listCopy.name, resultData);
                return { name: listCopy.name, data: resultData };
              } else {
                throw new Error("TDS: process list xhr failed");
              }
            });
          }).catch(async (e) => {
            const result = await this.getListFromLocalDB(listCopy.name);
            if (result) {
              return result;
            }
            settings.updateSetting(`${listCopy.name}-etag`, "");
            settings.updateSetting(`${listCopy.name}-lastUpdate`, "");
            throw new Error("TDS: data update failed");
          });
        }
        processData(name, xhrData) {
          if (xhrData) {
            const parsedData = this.parsedata(name, xhrData);
            this.storeInLocalDB(name, parsedData);
            return Promise.resolve(parsedData);
          } else {
            return Promise.resolve();
          }
        }
        getDataXHR(list, etag, source) {
          return load2.loadExtensionFile({ url: list.url, etag, returnType: list.format, source, timeout: 6e4 });
        }
        async getListFromLocalDB(name) {
          console.log("TDS: getting from db", name);
          try {
            await this.dbc.open();
            const list = await this.dbc.table("tdsStorage").get({ name });
            if (list && list.data) {
              this[name] = list.data;
              this._internalOnListUpdate(name, list.data);
              return { name, data: list.data };
            }
          } catch (e) {
            console.warn(`getListFromLocalDB failed for ${name}`, e);
            return null;
          }
        }
        storeInLocalDB(name, data) {
          return this.table.put({ name, data }).catch((e) => {
            console.warn(`storeInLocalDB failed for ${name}: resetting stored etag`, e);
            settings.updateSetting(`${name}-etag`, "");
            settings.updateSetting(`${name}-lastUpdate`, "");
          });
        }
        parsedata(name, data) {
          const parsers = {
            brokenSiteList: (dataIn) => {
              return dataIn.trim().split("\n");
            }
          };
          if (parsers[name]) {
            return parsers[name](data);
          } else {
            return data;
          }
        }
        // add version param to url on the first install and only once a day after that
        getVersionParam() {
          const ONEDAY = 1e3 * 60 * 60 * 24;
          const version = browserWrapper.getExtensionVersion();
          const lastTdsUpdate = settings.getSetting("lastTdsUpdate");
          const now = Date.now();
          let versionParam;
          if (lastTdsUpdate) {
            const delta = now - new Date(lastTdsUpdate);
            if (delta > ONEDAY) {
              versionParam = `&v=${version}`;
            }
          } else {
            versionParam = `&v=${version}`;
          }
          if (versionParam)
            settings.updateSetting("lastTdsUpdate", now);
          return versionParam;
        }
        /**
         * Convert the given list into stringified form.
         * @param {*} name
         * @returns list in a fully serialisable format
         */
        getSerializableList(name) {
          if (name === "tds") {
            const listCopy = JSON.parse(JSON.stringify(this.tds));
            Object.values(listCopy.trackers).forEach((tracker) => {
              tracker.rules?.forEach((rule, i) => {
                const ruleRegexStr = this.tds.trackers[tracker.domain].rules[i].rule.toString();
                rule.rule = ruleRegexStr.slice(1, ruleRegexStr.length - 3);
              });
            });
            return listCopy;
          } else {
            return this[name];
          }
        }
        removeLegacyLists() {
          this.table.delete("ReferrerExcludeList");
          this.table.delete("brokenSiteList");
          this.table.delete("protections");
        }
        onUpdate(name, listener) {
          let listeners = this._onUpdatedListeners.get(name);
          if (!listeners) {
            listeners = [];
            this._onUpdatedListeners.set(name, listeners);
          }
          listeners.push(listener);
        }
        ready(configName) {
          if (!configName) {
            return Promise.all(this._onReadyPromises.values());
          }
          const readyPromise = this._onReadyPromises.get(configName);
          if (!readyPromise) {
            throw new Error(`Unknown configuration: ${configName}`);
          }
          return readyPromise;
        }
      };
      tds_default = new TDSStorage();
    }
  });

  // shared/js/shared-utils/sha1.js
  var require_sha1 = __commonJS({
    "shared/js/shared-utils/sha1.js"(exports, module) {
      "use strict";
      (function() {
        "use strict";
        var root = typeof window === "object" ? window : {};
        var NODE_JS = !root.JS_SHA1_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
        if (NODE_JS) {
          root = global;
        }
        var COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && typeof module === "object" && module.exports;
        var AMD = typeof define === "function" && define.amd;
        var HEX_CHARS = "0123456789abcdef".split("");
        var EXTRA = [-2147483648, 8388608, 32768, 128];
        var SHIFT = [24, 16, 8, 0];
        var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
        var blocks = [];
        var createOutputMethod = function(outputType) {
          return function(message) {
            return new Sha1(true).update(message)[outputType]();
          };
        };
        var createMethod = function() {
          var method2 = createOutputMethod("hex");
          if (NODE_JS) {
            method2 = nodeWrap(method2);
          }
          method2.create = function() {
            return new Sha1();
          };
          method2.update = function(message) {
            return method2.create().update(message);
          };
          for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
            var type2 = OUTPUT_TYPES[i];
            method2[type2] = createOutputMethod(type2);
          }
          return method2;
        };
        var nodeWrap = function(method) {
          var crypto = eval("require('crypto')");
          var Buffer = eval("require('buffer').Buffer");
          var nodeMethod = function(message) {
            if (typeof message === "string") {
              return crypto.createHash("sha1").update(message, "utf8").digest("hex");
            } else if (message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (message.length === void 0) {
              return method(message);
            }
            return crypto.createHash("sha1").update(new Buffer(message)).digest("hex");
          };
          return nodeMethod;
        };
        function Sha1(sharedMemory) {
          if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            this.blocks = blocks;
          } else {
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
          this.h0 = 1732584193;
          this.h1 = 4023233417;
          this.h2 = 2562383102;
          this.h3 = 271733878;
          this.h4 = 3285377520;
          this.block = this.start = this.bytes = this.hBytes = 0;
          this.finalized = this.hashed = false;
          this.first = true;
        }
        Sha1.prototype.update = function(message) {
          if (this.finalized) {
            return;
          }
          var notString = typeof message !== "string";
          if (notString && message.constructor === root.ArrayBuffer) {
            message = new Uint8Array(message);
          }
          var code, index = 0, i, length = message.length || 0, blocks2 = this.blocks;
          while (index < length) {
            if (this.hashed) {
              this.hashed = false;
              blocks2[0] = this.block;
              blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
            }
            if (notString) {
              for (i = this.start; index < length && i < 64; ++index) {
                blocks2[i >> 2] |= message[index] << SHIFT[i++ & 3];
              }
            } else {
              for (i = this.start; index < length && i < 64; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  blocks2[i >> 2] |= code << SHIFT[i++ & 3];
                } else if (code < 2048) {
                  blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else if (code < 55296 || code >= 57344) {
                  blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                }
              }
            }
            this.lastByteIndex = i;
            this.bytes += i - this.start;
            if (i >= 64) {
              this.block = blocks2[16];
              this.start = i - 64;
              this.hash();
              this.hashed = true;
            } else {
              this.start = i;
            }
          }
          if (this.bytes > 4294967295) {
            this.hBytes += this.bytes / 4294967296 << 0;
            this.bytes = this.bytes % 4294967296;
          }
          return this;
        };
        Sha1.prototype.finalize = function() {
          if (this.finalized) {
            return;
          }
          this.finalized = true;
          var blocks2 = this.blocks, i = this.lastByteIndex;
          blocks2[16] = this.block;
          blocks2[i >> 2] |= EXTRA[i & 3];
          this.block = blocks2[16];
          if (i >= 56) {
            if (!this.hashed) {
              this.hash();
            }
            blocks2[0] = this.block;
            blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
          blocks2[15] = this.bytes << 3;
          this.hash();
        };
        Sha1.prototype.hash = function() {
          var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
          var f, j, t2, blocks2 = this.blocks;
          for (j = 16; j < 80; ++j) {
            t2 = blocks2[j - 3] ^ blocks2[j - 8] ^ blocks2[j - 14] ^ blocks2[j - 16];
            blocks2[j] = t2 << 1 | t2 >>> 31;
          }
          for (j = 0; j < 20; j += 5) {
            f = b & c | ~b & d;
            t2 = a << 5 | a >>> 27;
            e = t2 + f + e + 1518500249 + blocks2[j] << 0;
            b = b << 30 | b >>> 2;
            f = a & b | ~a & c;
            t2 = e << 5 | e >>> 27;
            d = t2 + f + d + 1518500249 + blocks2[j + 1] << 0;
            a = a << 30 | a >>> 2;
            f = e & a | ~e & b;
            t2 = d << 5 | d >>> 27;
            c = t2 + f + c + 1518500249 + blocks2[j + 2] << 0;
            e = e << 30 | e >>> 2;
            f = d & e | ~d & a;
            t2 = c << 5 | c >>> 27;
            b = t2 + f + b + 1518500249 + blocks2[j + 3] << 0;
            d = d << 30 | d >>> 2;
            f = c & d | ~c & e;
            t2 = b << 5 | b >>> 27;
            a = t2 + f + a + 1518500249 + blocks2[j + 4] << 0;
            c = c << 30 | c >>> 2;
          }
          for (; j < 40; j += 5) {
            f = b ^ c ^ d;
            t2 = a << 5 | a >>> 27;
            e = t2 + f + e + 1859775393 + blocks2[j] << 0;
            b = b << 30 | b >>> 2;
            f = a ^ b ^ c;
            t2 = e << 5 | e >>> 27;
            d = t2 + f + d + 1859775393 + blocks2[j + 1] << 0;
            a = a << 30 | a >>> 2;
            f = e ^ a ^ b;
            t2 = d << 5 | d >>> 27;
            c = t2 + f + c + 1859775393 + blocks2[j + 2] << 0;
            e = e << 30 | e >>> 2;
            f = d ^ e ^ a;
            t2 = c << 5 | c >>> 27;
            b = t2 + f + b + 1859775393 + blocks2[j + 3] << 0;
            d = d << 30 | d >>> 2;
            f = c ^ d ^ e;
            t2 = b << 5 | b >>> 27;
            a = t2 + f + a + 1859775393 + blocks2[j + 4] << 0;
            c = c << 30 | c >>> 2;
          }
          for (; j < 60; j += 5) {
            f = b & c | b & d | c & d;
            t2 = a << 5 | a >>> 27;
            e = t2 + f + e - 1894007588 + blocks2[j] << 0;
            b = b << 30 | b >>> 2;
            f = a & b | a & c | b & c;
            t2 = e << 5 | e >>> 27;
            d = t2 + f + d - 1894007588 + blocks2[j + 1] << 0;
            a = a << 30 | a >>> 2;
            f = e & a | e & b | a & b;
            t2 = d << 5 | d >>> 27;
            c = t2 + f + c - 1894007588 + blocks2[j + 2] << 0;
            e = e << 30 | e >>> 2;
            f = d & e | d & a | e & a;
            t2 = c << 5 | c >>> 27;
            b = t2 + f + b - 1894007588 + blocks2[j + 3] << 0;
            d = d << 30 | d >>> 2;
            f = c & d | c & e | d & e;
            t2 = b << 5 | b >>> 27;
            a = t2 + f + a - 1894007588 + blocks2[j + 4] << 0;
            c = c << 30 | c >>> 2;
          }
          for (; j < 80; j += 5) {
            f = b ^ c ^ d;
            t2 = a << 5 | a >>> 27;
            e = t2 + f + e - 899497514 + blocks2[j] << 0;
            b = b << 30 | b >>> 2;
            f = a ^ b ^ c;
            t2 = e << 5 | e >>> 27;
            d = t2 + f + d - 899497514 + blocks2[j + 1] << 0;
            a = a << 30 | a >>> 2;
            f = e ^ a ^ b;
            t2 = d << 5 | d >>> 27;
            c = t2 + f + c - 899497514 + blocks2[j + 2] << 0;
            e = e << 30 | e >>> 2;
            f = d ^ e ^ a;
            t2 = c << 5 | c >>> 27;
            b = t2 + f + b - 899497514 + blocks2[j + 3] << 0;
            d = d << 30 | d >>> 2;
            f = c ^ d ^ e;
            t2 = b << 5 | b >>> 27;
            a = t2 + f + a - 899497514 + blocks2[j + 4] << 0;
            c = c << 30 | c >>> 2;
          }
          this.h0 = this.h0 + a << 0;
          this.h1 = this.h1 + b << 0;
          this.h2 = this.h2 + c << 0;
          this.h3 = this.h3 + d << 0;
          this.h4 = this.h4 + e << 0;
        };
        Sha1.prototype.hex = function() {
          this.finalize();
          var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
          return HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15];
        };
        Sha1.prototype.toString = Sha1.prototype.hex;
        Sha1.prototype.digest = function() {
          this.finalize();
          var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;
          return [
            h0 >> 24 & 255,
            h0 >> 16 & 255,
            h0 >> 8 & 255,
            h0 & 255,
            h1 >> 24 & 255,
            h1 >> 16 & 255,
            h1 >> 8 & 255,
            h1 & 255,
            h2 >> 24 & 255,
            h2 >> 16 & 255,
            h2 >> 8 & 255,
            h2 & 255,
            h3 >> 24 & 255,
            h3 >> 16 & 255,
            h3 >> 8 & 255,
            h3 & 255,
            h4 >> 24 & 255,
            h4 >> 16 & 255,
            h4 >> 8 & 255,
            h4 & 255
          ];
        };
        Sha1.prototype.array = Sha1.prototype.digest;
        Sha1.prototype.arrayBuffer = function() {
          this.finalize();
          var buffer = new ArrayBuffer(20);
          var dataView = new DataView(buffer);
          dataView.setUint32(0, this.h0);
          dataView.setUint32(4, this.h1);
          dataView.setUint32(8, this.h2);
          dataView.setUint32(12, this.h3);
          dataView.setUint32(16, this.h4);
          return buffer;
        };
        var exports = createMethod();
        if (COMMON_JS) {
          module.exports = exports;
        } else {
          root.sha1 = exports;
          if (AMD) {
            define(function() {
              return exports;
            });
          }
        }
      })();
    }
  });

  // shared/js/background/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    brokenListIndex: () => brokenListIndex,
    daysInstalled: () => daysInstalled,
    extractHostFromURL: () => extractHostFromURL,
    extractLimitedDomainFromURL: () => extractLimitedDomainFromURL,
    extractTopSubdomainFromHost: () => extractTopSubdomainFromHost,
    findParent: () => findParent,
    findParentDisplayName: () => findParentDisplayName,
    getAsyncBlockingSupport: () => getAsyncBlockingSupport,
    getBaseDomain: () => getBaseDomain,
    getBrokenScriptLists: () => getBrokenScriptLists,
    getBrowserName: () => getBrowserName,
    getCurrentTab: () => getCurrentTab,
    getCurrentURL: () => getCurrentURL,
    getEnabledFeatures: () => getEnabledFeatures,
    getEnabledFeaturesAboutBlank: () => getEnabledFeaturesAboutBlank,
    getFeatureSettings: () => getFeatureSettings,
    getInstallTimestamp: () => getInstallTimestamp,
    getOsName: () => getOsName,
    getSessionKey: () => getSessionKey,
    getURLWithoutQueryString: () => getURLWithoutQueryString,
    getUpgradeToSecureSupport: () => getUpgradeToSecureSupport,
    isBroken: () => isBroken,
    isCookieExcluded: () => isCookieExcluded,
    isFeatureEnabled: () => isFeatureEnabled,
    isInstalledWithinDays: () => isInstalledWithinDays,
    isRedirect: () => isRedirect,
    isSafeListed: () => isSafeListed,
    isSameTopLevelDomain: () => isSameTopLevelDomain,
    parseVersionString: () => parseVersionString,
    reloadCurrentTab: () => reloadCurrentTab,
    removeBroken: () => removeBroken,
    resetSessionKey: () => resetSessionKey,
    satisfiesMinVersion: () => satisfiesMinVersion,
    sendAllTabsMessage: () => sendAllTabsMessage,
    sendTabMessage: () => sendTabMessage
  });
  function getRandomFloat() {
    return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
  }
  async function getSessionKey() {
    let sessionKey = await getFromSessionStorage("sessionKey");
    if (!sessionKey) {
      sessionKey = await resetSessionKey();
    }
    return sessionKey;
  }
  async function resetSessionKey() {
    const sessionKey = (0, import_sha1.default)(getRandomFloat().toString());
    await setToSessionStorage("sessionKey", sessionKey);
    return sessionKey;
  }
  async function sendTabMessage(id, message, details) {
    try {
      await import_webextension_polyfill2.default.tabs.sendMessage(id, message, details);
    } catch {
    }
  }
  async function sendAllTabsMessage(message, details) {
    try {
      for (const { id: tabId } of await import_webextension_polyfill2.default.tabs.query({})) {
        sendTabMessage(tabId, message, details);
      }
    } catch {
    }
  }
  function getBaseDomain(urlString) {
    const parsedUrl = (0, import_tldts.parse)(urlString, { allowPrivateDomains: true });
    if (parsedUrl.hostname === "localhost" || parsedUrl.hostname?.endsWith(".localhost") || parsedUrl.isIp) {
      return parsedUrl.hostname;
    }
    return parsedUrl.domain;
  }
  function extractHostFromURL(url, shouldKeepWWW) {
    if (!url)
      return "";
    if (url.startsWith("about:") && url[6] !== "/") {
      url = "about://" + url.substr(6);
    }
    const urlObj = (0, import_tldts.parse)(url);
    let hostname = urlObj.hostname || "";
    if (!shouldKeepWWW) {
      hostname = hostname.replace(/^www\./, "");
    }
    return hostname;
  }
  function extractLimitedDomainFromURL(url, { keepSubdomains } = {}) {
    if (!url)
      return void 0;
    try {
      const parsedURL = new URL(url);
      const tld = (0, import_tldts.parse)(url);
      if (!parsedURL || !tld)
        return "";
      let finalURL = tld.domain || tld.hostname;
      if (keepSubdomains) {
        finalURL = tld.hostname;
      } else if (tld.subdomain && tld.subdomain.toLowerCase() === "www") {
        finalURL = "www." + tld.domain;
      }
      const port = parsedURL.port ? `:${parsedURL.port}` : "";
      return `${parsedURL.protocol}//${finalURL}${port}/`;
    } catch (e) {
      return void 0;
    }
  }
  function extractTopSubdomainFromHost(host) {
    if (typeof host !== "string")
      return false;
    const rgx = /\./g;
    if (host.match(rgx) && host.match(rgx).length > 1) {
      return host.split(".")[0];
    }
    return false;
  }
  function findParent(url) {
    const parts = extractHostFromURL(url).split(".");
    while (parts.length > 1) {
      const joinURL = parts.join(".");
      if (tds_default.tds.trackers[joinURL]?.owner?.ownedBy) {
        return tds_default.tds.trackers[joinURL].owner.ownedBy;
      } else if (tds_default.tds.domains[joinURL]) {
        return tds_default.tds.domains[joinURL];
      }
      parts.shift();
    }
  }
  function findParentDisplayName(url) {
    const parent = findParent(url);
    const entity = tds_default.tds.entities[parent];
    if (entity && entity.displayName) {
      return entity.displayName;
    }
    return "unknown";
  }
  function getCurrentURL(callback) {
    import_webextension_polyfill2.default.tabs.query({ active: true, lastFocusedWindow: true }).then((tabData) => {
      if (tabData.length) {
        callback(tabData[0].url);
      }
    });
  }
  async function getCurrentTab(callback) {
    const tabData = await import_webextension_polyfill2.default.tabs.query({ active: true, lastFocusedWindow: true });
    if (tabData.length) {
      return tabData[0];
    }
  }
  function getBrowserName() {
    if (!browserInfo || !browserInfo.browser)
      return;
    let browserName = browserInfo.browser.toLowerCase();
    if (browserName === "firefox")
      browserName = "moz";
    return browserName;
  }
  function getOsName() {
    if (!browserInfo || !browserInfo.os)
      return;
    return browserInfo.os;
  }
  function getUpgradeToSecureSupport() {
    let canUpgrade = false;
    if (getBrowserName() !== "moz")
      return canUpgrade;
    if (browserInfo && browserInfo.version >= 59) {
      canUpgrade = true;
    }
    return canUpgrade;
  }
  function getAsyncBlockingSupport() {
    const browserName = getBrowserName();
    if (browserName === "moz" && browserInfo && browserInfo.version >= 52) {
      return true;
    } else if (["edg", "edge", "brave", "chrome"].includes(browserName)) {
      return false;
    }
    console.warn(`Unrecognized browser "${browserName}" - async response disallowed`);
    return false;
  }
  function isRedirect(statusCode) {
    return statusCode >= 300 && statusCode <= 399;
  }
  function isBroken(url) {
    if (!tds_default?.config.unprotectedTemporary)
      return;
    return brokenListIndex(url, tds_default?.config.unprotectedTemporary) !== -1;
  }
  function removeBroken(domain) {
    const index = brokenListIndex(domain, tds_default.config.unprotectedTemporary);
    if (index !== -1) {
      console.log("remove", tds_default.config.unprotectedTemporary.splice(index, 1));
    }
  }
  function getEnabledFeaturesAboutBlank(url) {
    if (!tds_default.config.features)
      return [];
    const enabledFeatures = [];
    for (const feature in tds_default.config.features) {
      const featureSettings = getFeatureSettings(feature);
      if (featureSettings.aboutBlankEnabled !== "disabled" && brokenListIndex(url, featureSettings.aboutBlankSites || []) === -1) {
        enabledFeatures.push(feature);
      }
    }
    return enabledFeatures;
  }
  function getEnabledFeatures(url) {
    if (!tds_default.config.features)
      return [];
    const enabledFeatures = [];
    for (const feature in tds_default.config.features) {
      if (isFeatureEnabled(feature) && brokenListIndex(url, tds_default.config.features[feature].exceptions || []) === -1) {
        enabledFeatures.push(feature);
      }
    }
    return enabledFeatures;
  }
  function brokenListIndex(url, list) {
    const parsedDomain = (0, import_tldts.parse)(url);
    const hostname = parsedDomain.hostname || url;
    return list.findIndex((brokenSiteDomain) => {
      if (brokenSiteDomain.domain) {
        return hostname === brokenSiteDomain.domain || hostname.endsWith(`.${brokenSiteDomain.domain}`);
      }
      return false;
    });
  }
  function getBrokenScriptLists() {
    const brokenScripts = {};
    for (const key in tds_default.config.features) {
      const featureSettings = getFeatureSettings(key);
      brokenScripts[key] = featureSettings.scripts?.map((obj) => obj.domain) || [];
    }
    return brokenScripts;
  }
  function isSafeListed(url) {
    const hostname = extractHostFromURL(url);
    const safeList = import_settings.default.getSetting("allowlisted");
    const subdomains = hostname.split(".");
    while (subdomains.length > 1) {
      if (safeList && safeList[subdomains.join(".")]) {
        return true;
      }
      subdomains.shift();
    }
    if (isBroken(hostname)) {
      return true;
    }
    return false;
  }
  function isCookieExcluded(url) {
    const domain = new URL(url).host;
    return isDomainCookieExcluded(domain);
  }
  function isDomainCookieExcluded(domain) {
    const cookieSettings = getFeatureSettings("cookie");
    if (!cookieSettings || !cookieSettings.excludedCookieDomains) {
      return false;
    }
    if (cookieSettings.excludedCookieDomains.find((elem) => elem.domain === domain)) {
      return true;
    }
    const comps = domain.split(".");
    if (comps.length > 2) {
      comps.shift();
      return isDomainCookieExcluded(comps.join("."));
    }
    return false;
  }
  function isSameTopLevelDomain(url1, url2) {
    const first = getBaseDomain(url1);
    const second = getBaseDomain(url2);
    if (!first || !second) {
      return false;
    }
    return first === second;
  }
  function parseVersionString(versionString) {
    return versionString.split(".").map(Number);
  }
  function satisfiesMinVersion(minVersionString, extensionVersionString) {
    const minVersions = parseVersionString(minVersionString);
    const currentVersions = parseVersionString(extensionVersionString);
    const maxLength = Math.max(minVersions.length, currentVersions.length);
    for (let i = 0; i < maxLength; i++) {
      const minNumberPart = minVersions[i] || 0;
      const currentVersionPart = currentVersions[i] || 0;
      if (currentVersionPart > minNumberPart) {
        return true;
      }
      if (currentVersionPart < minNumberPart) {
        return false;
      }
    }
    return true;
  }
  function isFeatureEnabled(featureName) {
    const feature = tds_default.config.features[featureName];
    if (!feature) {
      return false;
    }
    if ("minSupportedVersion" in feature) {
      const extensionVersionString = getExtensionVersion();
      if (!satisfiesMinVersion(feature.minSupportedVersion, extensionVersionString)) {
        return false;
      }
    }
    return feature.state === "enabled";
  }
  function getFeatureSettings(featureName) {
    const feature = tds_default.config.features[featureName];
    if (typeof feature !== "object" || feature === null || !feature.settings) {
      return {};
    }
    return feature.settings;
  }
  function getURLWithoutQueryString(urlString) {
    return urlString?.split("?")[0];
  }
  async function reloadCurrentTab() {
    const tab = await getCurrentTab();
    if (tab && tab.id) {
      import_webextension_polyfill2.default.tabs.reload(tab.id);
    }
  }
  function getInstallTimestamp(atb) {
    const match = atb.match(/^v?(\d+)-(\d)(.+)?$/i);
    if (!match)
      return null;
    const startDate = 1456272e6;
    const weeksSince = (parseInt(match[1], 10) - 1) * 7 * dayMultiplier;
    const daysSince = (parseInt(match[2], 10) - 1) * dayMultiplier;
    const installTimestamp = new Date(startDate + weeksSince + daysSince).getTime();
    return isNaN(installTimestamp) ? null : installTimestamp;
  }
  function isInstalledWithinDays(numberOfDays, fromDate = Date.now(), atb = import_settings.default.getSetting("atb")) {
    return daysInstalled(fromDate, atb) <= numberOfDays;
  }
  function daysInstalled(fromDate = Date.now(), atb = import_settings.default.getSetting("atb")) {
    if (!atb)
      return NaN;
    const installTimestamp = getInstallTimestamp(atb);
    if (!installTimestamp)
      return NaN;
    return (fromDate - installTimestamp) / dayMultiplier;
  }
  var import_webextension_polyfill2, import_settings, import_tldts, import_parse_user_agent_string, import_sha1, browserInfo, dayMultiplier;
  var init_utils = __esm({
    "shared/js/background/utils.js"() {
      "use strict";
      import_webextension_polyfill2 = __toESM(require_browser_polyfill());
      init_wrapper();
      init_tds();
      import_settings = __toESM(require_settings());
      import_tldts = __toESM(require_cjs());
      import_parse_user_agent_string = __toESM(require_parse_user_agent_string());
      import_sha1 = __toESM(require_sha1());
      browserInfo = (0, import_parse_user_agent_string.default)();
      dayMultiplier = 24 * 60 * 60 * 1e3;
    }
  });

  // shared/js/background/email-utils.js
  var email_utils_exports = {};
  __export(email_utils_exports, {
    REFETCH_ALIAS_ALARM: () => REFETCH_ALIAS_ALARM,
    fetchAlias: () => fetchAlias,
    formatAddress: () => formatAddress,
    getAddresses: () => getAddresses,
    hideContextMenuAction: () => hideContextMenuAction,
    isValidToken: () => isValidToken,
    isValidUsername: () => isValidUsername,
    sendJSPixel: () => sendJSPixel,
    showContextMenuAction: () => showContextMenuAction
  });
  function currentDate() {
    return (/* @__PURE__ */ new Date()).toLocaleString("en-CA", {
      timeZone: "America/New_York",
      dateStyle: "short"
    });
  }
  var import_webextension_polyfill3, getSetting, updateSetting, browserWrapper2, utils, REFETCH_ALIAS_ALARM, REFETCH_ALIAS_ATTEMPT, pixelsEnabled, fetchAlias, MENU_ITEM_ID, showContextMenuAction, hideContextMenuAction, getAddresses, getFullPixelName, fireAutofillPixel, fireIncontextSignupPixel, sendJSPixel, formatAddress, isValidUsername, isValidToken;
  var init_email_utils = __esm({
    "shared/js/background/email-utils.js"() {
      "use strict";
      import_webextension_polyfill3 = __toESM(require_browser_polyfill());
      init_pixels();
      ({ getSetting, updateSetting } = require_settings());
      browserWrapper2 = (init_wrapper(), __toCommonJS(wrapper_exports));
      utils = (init_utils(), __toCommonJS(utils_exports));
      REFETCH_ALIAS_ALARM = "refetchAlias";
      REFETCH_ALIAS_ATTEMPT = "refetchAliasAttempt";
      pixelsEnabled = utils.getBrowserName() !== "moz";
      fetchAlias = () => {
        import_webextension_polyfill3.default.alarms.clear(REFETCH_ALIAS_ALARM);
        const userData = getSetting("userData");
        if (!userData?.token)
          return;
        return fetch("https://quack.duckduckgo.com/api/email/addresses", {
          method: "post",
          headers: { Authorization: `Bearer ${userData.token}` }
        }).then(async (response) => {
          if (response.ok) {
            return response.json().then(async ({ address }) => {
              if (!/^[a-z0-9]+$/.test(address))
                throw new Error("Invalid address");
              updateSetting("userData", Object.assign(userData, { nextAlias: `${address}` }));
              await browserWrapper2.removeFromSessionStorage(REFETCH_ALIAS_ATTEMPT);
              return { success: true };
            });
          } else {
            throw new Error("An error occurred while fetching the alias");
          }
        }).catch(async (e) => {
          console.log("Error fetching new alias", e);
          const attempts = await browserWrapper2.getFromSessionStorage(REFETCH_ALIAS_ATTEMPT) || 1;
          if (attempts < 5) {
            browserWrapper2.createAlarm(REFETCH_ALIAS_ALARM, { delayInMinutes: 2 });
            await browserWrapper2.setToSessionStorage(REFETCH_ALIAS_ATTEMPT, attempts + 1);
          }
          return { error: e };
        });
      };
      MENU_ITEM_ID = "ddg-autofill-context-menu-item";
      import_webextension_polyfill3.default.contextMenus.create({
        id: MENU_ITEM_ID,
        title: "Generate Private Duck Address",
        contexts: ["editable"],
        documentUrlPatterns: ["https://*/*"],
        visible: false
      }, () => {
        const { lastError } = import_webextension_polyfill3.default.runtime;
        if (lastError && lastError.message && !lastError.message.startsWith("Cannot create item with duplicate id")) {
          throw lastError;
        }
      });
      import_webextension_polyfill3.default.contextMenus.onClicked.addListener((info, tab) => {
        const userData = getSetting("userData");
        if (tab?.id && userData.nextAlias) {
          import_webextension_polyfill3.default.tabs.sendMessage(tab.id, {
            type: "contextualAutofill",
            alias: userData.nextAlias
          });
        }
      });
      showContextMenuAction = () => import_webextension_polyfill3.default.contextMenus.update(MENU_ITEM_ID, { visible: true });
      hideContextMenuAction = () => import_webextension_polyfill3.default.contextMenus.update(MENU_ITEM_ID, { visible: false });
      getAddresses = () => {
        const userData = getSetting("userData");
        return {
          personalAddress: userData?.userName,
          privateAddress: userData?.nextAlias
        };
      };
      getFullPixelName = (name, browserName) => {
        return `${name}_${browserName.toLowerCase()}`;
      };
      fireAutofillPixel = (pixel, shouldUpdateLastUsed = false) => {
        const browserName = utils.getBrowserName() ?? "unknown";
        if (!pixelsEnabled)
          return;
        const userData = getSetting("userData");
        if (!userData?.userName)
          return;
        const lastAddressUsedAt = getSetting("lastAddressUsedAt") ?? "";
        sendPixelRequest(getFullPixelName(pixel, browserName), { duck_address_last_used: lastAddressUsedAt, cohort: userData.cohort });
        if (shouldUpdateLastUsed) {
          updateSetting("lastAddressUsedAt", currentDate());
        }
      };
      fireIncontextSignupPixel = (pixel, params) => {
        const browserName = utils.getBrowserName() ?? "unknown";
        if (!pixelsEnabled)
          return;
        sendPixelRequest(getFullPixelName(pixel, browserName), params);
      };
      sendJSPixel = (options) => {
        const { pixelName } = options;
        switch (pixelName) {
          case "autofill_show":
            fireAutofillPixel("email_tooltip_show_extension");
            break;
          case "autofill_private_address":
            fireAutofillPixel("email_filled_random_extension", true);
            break;
          case "autofill_personal_address":
            fireAutofillPixel("email_filled_main_extension", true);
            break;
          case "incontext_show":
            fireIncontextSignupPixel("incontext_show_extension");
            break;
          case "incontext_primary_cta":
            fireIncontextSignupPixel("incontext_primary_cta_extension");
            break;
          case "incontext_dismiss_persisted":
            fireIncontextSignupPixel("incontext_dismiss_persisted_extension");
            break;
          case "incontext_close_x":
            fireIncontextSignupPixel("incontext_close_x_extension");
            break;
          default:
            browserWrapper2.getFromSessionStorage("dev").then((isDev) => {
              if (isDev)
                console.error("Unknown pixel name", pixelName);
            });
        }
      };
      formatAddress = (address) => address + "@duck.com";
      isValidUsername = (userName) => /^[a-z0-9_]+$/.test(userName);
      isValidToken = (token) => /^[a-z0-9]+$/.test(token);
    }
  });

  // shared/js/ui/templates/user-data.js
  var require_user_data3 = __commonJS({
    "shared/js/ui/templates/user-data.js"(exports2, module2) {
      "use strict";
      var bel = require_browser();
      var raw = require_raw_browser();
      var { formatAddress: formatAddress2 } = (init_email_utils(), __toCommonJS(email_utils_exports));
      var t2 = window.DDG.base.i18n.t;
      module2.exports = function() {
        return bel`<section class="options-content__user-data divider-bottom">
        <h2 class="menu-title">${t2("options:emailProtection.title")}</h2>
        ${renderUserDataContent(this.model)}
    </section>`;
      };
      function renderUserDataContent(model) {
        return !model.userName ? bel`<div>
                <p class="menu-paragraph">${t2("options:autofillDisabled.title")}</p>
                <p class="options-info">
                    <a href="https://duckduckgo.com/email/enable-autofill">${t2("shared:enable.title")}</a>
                </p>
            </div>` : bel`<div>
                <p class="menu-paragraph">
                    ${raw(t2("options:autofillEnabled.title", { userName: formatAddress2(model.userName) }))}
                </p>
                <p class="options-info js-userdata-logout">
                    <a href="#">${t2("shared:disable.title")}</a>
                </p>
            </div>`;
      }
    }
  });

  // shared/js/ui/base/ui-wrapper.js
  var ui_wrapper_exports = {};
  __export(ui_wrapper_exports, {
    backgroundMessage: () => backgroundMessage,
    getExtensionURL: () => getExtensionURL2,
    openExtensionPage: () => openExtensionPage2,
    sendMessage: () => sendMessage
  });
  var import_webextension_polyfill4, sendMessage, backgroundMessage, getExtensionURL2, openExtensionPage2;
  var init_ui_wrapper = __esm({
    "shared/js/ui/base/ui-wrapper.js"() {
      "use strict";
      import_webextension_polyfill4 = __toESM(require_browser_polyfill());
      sendMessage = async (messageType, options) => {
        return await import_webextension_polyfill4.default.runtime.sendMessage({ messageType, options });
      };
      backgroundMessage = (thisModel) => {
        import_webextension_polyfill4.default.runtime.onMessage.addListener((req, sender) => {
          if (sender.id !== import_webextension_polyfill4.default.runtime.id)
            return;
          if (req.updateTabData)
            thisModel.send("updateTabData");
          if (req.didResetTrackersData)
            thisModel.send("didResetTrackersData", req.didResetTrackersData);
          if (req.closePopup)
            window.close();
        });
      };
      getExtensionURL2 = (path) => {
        return import_webextension_polyfill4.default.runtime.getURL(path);
      };
      openExtensionPage2 = (path) => {
        import_webextension_polyfill4.default.tabs.create({ url: getExtensionURL2(path) });
      };
    }
  });

  // shared/js/ui/models/background-message.js
  var require_background_message = __commonJS({
    "shared/js/ui/models/background-message.js"(exports2, module2) {
      "use strict";
      var Parent2 = window.DDG.base.Model;
      var browserUIWrapper2 = (init_ui_wrapper(), __toCommonJS(ui_wrapper_exports));
      function BackgroundMessage(attrs) {
        Parent2.call(this, attrs);
        const thisModel = this;
        browserUIWrapper2.backgroundMessage(thisModel);
      }
      BackgroundMessage.prototype = window.$.extend(
        {},
        Parent2.prototype,
        {
          modelName: "backgroundMessage"
        }
      );
      module2.exports = BackgroundMessage;
    }
  });

  // shared/js/ui/pages/options.js
  var Parent = window.DDG.base.Page;
  var mixins = require_mixins();
  var PrivacyOptionsView = require_privacy_options();
  var PrivacyOptionsModel = require_privacy_options2();
  var privacyOptionsTemplate = require_privacy_options3();
  var AllowlistView = require_allowlist();
  var AllowlistModel = require_allowlist2();
  var allowlistTemplate = require_allowlist3();
  var UserDataView = require_user_data();
  var UserDataModel = require_user_data2();
  var userDataTemplate = require_user_data3();
  var BackgroundMessageModel = require_background_message();
  var browserUIWrapper = (init_ui_wrapper(), __toCommonJS(ui_wrapper_exports));
  var t = window.DDG.base.i18n.t;
  function Options(ops) {
    Parent.call(this, ops);
  }
  Options.prototype = window.$.extend(
    {},
    Parent.prototype,
    mixins.setBrowserClassOnBodyTag,
    {
      pageName: "options",
      ready: function() {
        const $parent = window.$("#options-content");
        Parent.prototype.ready.call(this);
        this.setBrowserClassOnBodyTag();
        window.$(".js-feedback-link").click(this._onFeedbackClick.bind(this));
        window.$(".js-report-site-link").click(this._onReportSiteClick.bind(this));
        const textContainers = document.querySelectorAll("[data-text]");
        textContainers.forEach((el) => {
          const textID = el.getAttribute("data-text");
          const text = t(textID);
          el.innerHTML = text;
        });
        this.views.options = new PrivacyOptionsView({
          pageView: this,
          model: new PrivacyOptionsModel({}),
          appendTo: $parent,
          template: privacyOptionsTemplate
        });
        this.views.userData = new UserDataView({
          pageView: this,
          model: new UserDataModel({}),
          appendTo: $parent,
          template: userDataTemplate
        });
        this.views.allowlist = new AllowlistView({
          pageView: this,
          model: new AllowlistModel({}),
          appendTo: $parent,
          template: allowlistTemplate
        });
        this.message = new BackgroundMessageModel({});
      },
      _onFeedbackClick: function(e) {
        e.preventDefault();
        browserUIWrapper.openExtensionPage("/html/feedback.html");
      },
      _onReportSiteClick: function(e) {
        e.preventDefault();
        browserUIWrapper.openExtensionPage("/html/feedback.html?broken=1");
      }
    }
  );
  window.DDG = window.DDG || {};
  window.DDG.page = new Options();
})();
/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
