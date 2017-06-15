(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('preact')) :
	typeof define === 'function' && define.amd ? define(['preact'], factory) :
	(global.PreactHabitat = factory(global.preact));
}(this, (function (preact) { 'use strict';

preact = 'default' in preact ? preact['default'] : preact;

var DEF_PROP_ATTR = 'data-prop';
var DEF_WIDGET_ID = 'data-widget';
var DEF_MOUNT = 'data-mount';

/**
 * Capetalize every letter after `-`
 * @param  {String} str string
 * @return {String}     Capetalized string
 */
var _capetalize = function (str) {
  return str.replace(/-([a-z])/ig, function (all, letter) {
    return letter.toUpperCase();
  });
};

/**
 * Get the props from a host element's data attributes
 * @param  {Element} tag The host element
 * @return {Object}     props object to be passed to the component
 */
var _habitatsProps = function (tag) {
  var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_PROP_ATTR;

  var attrs = tag.attributes;
  var props = {};

  // ceck for another props attached to the tag
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
var _habitatElms = function (attrValue) {
  var attrKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_WIDGET_ID;

  var hostNodes = [];
  [].forEach.call(document.querySelectorAll('[' + attrKey + ']'), function (queriedTag) {
    if (attrValue === queriedTag.getAttribute(attrKey)) {
      hostNodes.push(queriedTag);
    }
  });
  return hostNodes;
};

/**
 * [_getWidgetScriptTag internal widget to provide the currently executed script]
 * @param  {document} document [Browser document object]
 * @return {HTMLElement}     [script Element]
 */
var _getWidgetScriptTag = function () {
  return document.currentScript || function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  }();
};

// TODO: abstract and reuse with ./habitat.js _habitatsProps
var _getMountAttr = function (script) {
  var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_MOUNT;

  var attrs = script.attributes;
  var mountValue = null;
  // ceck for another props attached to the tag
  Object.keys(attrs).forEach(function (key) {
    if (attrs.hasOwnProperty(key)) {
      var dataAttrName = attrs[key].name;
      if (dataAttrName === attr) {
        mountValue = attrs[key].nodeValue;
      }
    }
  });
  return mountValue;
};

var _isReady = function () {
  return !document.attachEvent && document.readyState === 'interactive' || document.readyState === 'complete';
};

var habitat = function (Widget) {

  var widget = Widget;
  var hasRendered = false; // flag to not render twice if document state has changed
  var root = null;
  var currentScript = _getWidgetScriptTag(); // get current script

  var mountTo = _getMountAttr(currentScript);

  /**
   * private _render function that will be queued if the DOM is not render
   * and executed immeidatly if DOM is ready
   */
  var _render = function () {
    var habitats = null;
    if (mountTo) {
      habitats = _habitatElms(mountTo);
    } else {
      habitats = [].concat(currentScript.parentNode);
    }
    habitats.forEach(function (elm) {
      var hostNode = elm;
      var props = _habitatsProps(elm) || {};
      return preact.render(preact.h(widget, props), hostNode, root);
    });
  };

  var render = function () {
    if (_isReady() && !hasRendered) {
      hasRendered = true;
      return _render();
    } else {
      document.onreadystatechange = function () {
        if (_isReady() && !hasRendered) {
          hasRendered = true;
          return _render();
        }
      };
    }
  };

  return { render: render };
};

return habitat;

})));
//# sourceMappingURL=habitat.js.map
