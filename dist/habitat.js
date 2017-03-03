!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = factory(require("preact")) : "function" == typeof define && define.amd ? define([ "preact" ], factory) : global.PreactHabitat = factory(global.preact);
}(this, function(preact) {
    "use strict";
    preact = "default" in preact ? preact.default : preact;
    var _capetalize = function(str) {
        return str.replace(/-([a-z])/gi, function(all, letter) {
            return letter.toUpperCase();
        });
    }, _habitatsProps = function(tag) {
        var attr = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "data-prop", attrs = tag.attributes, props = {};
        return Object.keys(attrs).forEach(function(key) {
            if (attrs.hasOwnProperty(key)) {
                var dataAttrName = attrs[key].name, propName = dataAttrName.split(attr + "-").pop();
                if (propName = _capetalize(propName), dataAttrName !== propName) {
                    var propValue = attrs[key].nodeValue;
                    props[propName] = propValue;
                }
            }
        }), props;
    }, _habitatElms = function(attrValue) {
        var attrKey = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "data-widget", hostNodes = [];
        return [].forEach.call(document.querySelectorAll("[" + attrKey + "]"), function(queriedTag) {
            attrValue === queriedTag.getAttribute(attrKey) && hostNodes.push(queriedTag);
        }), hostNodes;
    }, _getWidgetScriptTag = function() {
        return document.currentScript || function() {
            var scripts = document.getElementsByTagName("script");
            return scripts[scripts.length - 1];
        }();
    }, _getMountAttr = function(script) {
        var attr = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "data-mount", attrs = script.attributes, mountValue = null;
        return Object.keys(attrs).forEach(function(key) {
            if (attrs.hasOwnProperty(key)) {
                attrs[key].name === attr && (mountValue = attrs[key].nodeValue);
            }
        }), mountValue;
    };
    return function(Widget) {
        var hasRendered = !1, q = [], widget = Widget, currentScript = _getWidgetScriptTag(), mountTo = _getMountAttr(currentScript);
        document.addEventListener("readystatechange", function() {
            hasRendered || "loading" === document.readyState || (hasRendered = !0, q.forEach(function(fun) {
                return fun();
            }));
        }, !1);
        var _render = function() {
            var habitats = null;
            habitats = mountTo ? _habitatElms(mountTo) : [].concat(currentScript.parentNode), 
            habitats.forEach(function(elm) {
                var hostNode = elm, props = _habitatsProps(elm) || {};
                return props.habitatMediaQuery = function() {
                    return _getHabitatSizeQuery(elm);
                }, preact.render(preact.h(widget, props), hostNode, null);
            });
        };
        return {
            render: function() {
                return "loading" !== document.readyState ? (hasRendered = !0, _render()) : q.push(_render);
            }
        };
    };
});
//# sourceMappingURL=habitat.js.map