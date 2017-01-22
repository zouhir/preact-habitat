!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? factory(exports, require("preact")) : "function" == typeof define && define.amd ? define([ "exports", "preact" ], factory) : factory(global.PreactHabitat = global.PreactHabitat || {}, global.preact);
}(this, function(exports, preact) {
    "use strict";
    preact = "default" in preact ? preact.default : preact;
    var SCRIPT_ATTR = "widget/config", _getWidgetScriptTag = function(document) {
        return document.currentScript || function() {
            var scripts = document.getElementsByTagName("script");
            return scripts[scripts.length - 1];
        }();
    }, _getTagContent = function(tag) {
        try {
            return JSON.parse(tag.textContent);
        } catch (e) {
            return null;
        }
    }, render = function(Widget) {
        var root = void 0, habitatNode = void 0, widgetScriptTag = _getWidgetScriptTag(document);
        document.onreadystatechange = function() {
            "interactive" !== document.readyState && "complete" !== document.readyState || (habitatNode = widgetScriptTag.parentNode, 
            preact.render(preact.h(Widget), habitatNode, root), [].forEach.call(document.querySelectorAll("script[type]"), function(tag) {
                if (tag.getAttribute("type") === SCRIPT_ATTR) {
                    var config = _getTagContent(tag);
                    return config && config.clone ? config.clone === habitatNode.id ? preact.render(preact.h(Widget), tag.parentNode, root) : void 0 : null;
                }
            }));
        };
    };
    exports._getWidgetScriptTag = _getWidgetScriptTag, exports._getTagContent = _getTagContent, 
    exports.render = render, Object.defineProperty(exports, "__esModule", {
        value: !0
    });
});
//# sourceMappingURL=habitat.js.map