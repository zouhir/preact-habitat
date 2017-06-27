(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('preact')) :
	typeof define === 'function' && define.amd ? define(['preact'], factory) :
	(global.PreactHabitat = factory(global.preact));
}(this, (function (preact) { 'use strict';

preact = 'default' in preact ? preact['default'] : preact;

/**
 * Capetalize every letter after `-`
 * Used for props passed from host DOM element
 * @param  {String} str string
 * @return {String}     Capetalized string
 */
var _capetalize = function (str) {
  return str.replace(/-([a-z])/ig, function (all, letter) {
    return letter.toUpperCase();
  });
};

/**
 * [_getCurrentScriptTag internal widget to provide the currently executed script]
 * @param  {document} document [Browser document object]
 * @return {HTMLElement}     [script Element]
 */
var _getCurrentScriptTag = function () {
  return document.currentScript || function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  }();
};

/**
 * Get the props from a host element's data attributes
 * @param  {Element} tag The host element
 * @return {Object}     props object to be passed to the component
 */
var _propsToPassDown = function (element) {
  var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data-prop';

  var attrs = element.attributes;
  var props = {};

  // ceck for another props attached to the element
  Object.keys(attrs).forEach(function (key) {
    if (attrs.hasOwnProperty(key)) {
      var dataAttrName = attrs[key].name;
      var propName = dataAttrName.split(attr + '-').pop();
      propName = _capetalize(propName);
      if (dataAttrName !== propName) {
        var propValue = attrs[key].nodeValue;
        props[propName] = propValue;
      }
    }
  });
  return props;
};

/**
 * Return array of 0 or more elements that will host our widget
 * @param  {id} attrId the data widget id attribute the host should have
 * @param  {document} scope  Docuemnt object or DOM Element as a scope
 * @return {Array}        Array of matching habitats
 */
var _hostDOMElms = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$name = _ref.name,
      name = _ref$name === undefined ? "data-widget" : _ref$name,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? null : _ref$value,
      _ref$inline = _ref.inline,
      inline = _ref$inline === undefined ? true : _ref$inline;

  var hostNodes = [];
  var currentScript = _getCurrentScriptTag();
  if (!value) {
    // user did not specify where to mount - get it from script tag attributes
    var scriptTagAttrs = currentScript.attributes;
    // ceck for another props attached to the tag
    Object.keys(scriptTagAttrs).forEach(function (key) {
      if (scriptTagAttrs.hasOwnProperty(key)) {
        var dataAttrName = scriptTagAttrs[key].name;
        if (dataAttrName === 'data-mount') {
          value = scriptTagAttrs[key].nodeValue;
        }
      }
    });
  }
  if (!value && inline) {
    return [].concat(currentScript.parentNode);
  }
  [].forEach.call(document.querySelectorAll('[' + name + ']'), function (queriedTag) {
    if (value === queriedTag.getAttribute(name)) {
      hostNodes.push(queriedTag);
    }
  });
  return hostNodes;
};

var _isReady = function () {
  return !document.attachEvent && document.readyState === 'interactive' || document.readyState === 'complete';
};

/**
 * private _render function that will be queued if the DOM is not render
 * and executed immeidatly if DOM is ready
 */
var _render = function (widget, hostElements, root) {
  hostElements.forEach(function (elm) {
    var hostNode = elm;
    var props = _propsToPassDown(elm) || {};
    return preact.render(preact.h(widget, props), hostNode, root);
  });
};

var habitat = function (Widget) {
  // Widget represents the Preact component we need to mount
  var widget = Widget;
  // in case DOM has fired multipled readystate events, redner only once
  var hasRendered = false;
  // preact root render helper
  var root = null;

  var render = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === undefined ? "data-widget" : _ref$name,
        _ref$value = _ref.value,
        value = _ref$value === undefined ? null : _ref$value,
        _ref$inline = _ref.inline,
        inline = _ref$inline === undefined ? true : _ref$inline;

    var isReady = _isReady();
    if (isReady && !hasRendered) {
      var elements = _hostDOMElms({ name: name, value: value, inline: inline });
      hasRendered = true;
      return _render(widget, elements, root);
    }
    // document is not ready - subscurib to readystatechange event
    document.onreadystatechange = function () {
      var elements = _hostDOMElms({ name: name, value: value, inline: inline });
      if (isReady && !hasRendered) {
        hasRendered = true;
        return _render(widget, elements, root);
      }
    };
  };

  return { render: render };
};

return habitat;

})));
//# sourceMappingURL=habitat.js.map
