import preact from 'preact';

/**
 * Removes `-` fron a string and capetalize the letter after
 * example: data-props-hello-world =>  dataPropsHelloWorld
 * Used for props passed from host DOM element
 * @param  {String} str string
 * @return {String} Capetalized string
 */
var camelcasize = function (str) {
  return str.replace(/-([a-z])/gi, function (all, letter) {
    return letter.toUpperCase();
  });
};

/**
 * [getExecutedScript internal widget to provide the currently executed script]
 * @param  {document} document [Browser document object]
 * @return {HTMLElement}     [script Element]
 */
var getExecutedScript = function () {
  return (
    document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1];
    })()
  );
};

/**
 * Get the props from a host element's data attributes
 * @param  {Element} tag The host element
 * @return {Object}  props object to be passed to the component
 */
var collectPropsFromElement = function (element, defaultProps) {
  if ( defaultProps === void 0 ) defaultProps = {};

  var attrs = element.attributes;

  var props = Object.assign({}, defaultProps);

  // collect from element
  Object.keys(attrs).forEach(function (key) {
    if (attrs.hasOwnProperty(key)) {
      var dataAttrName = attrs[key].name;
      if (!dataAttrName || typeof dataAttrName !== "string") {
        return false;
      }
      var propName = dataAttrName.split(/(data-props?-)/).pop() || '';
      propName = camelcasize(propName);
      if (dataAttrName !== propName) {
        var propValue = attrs[key].nodeValue;
        props[propName] = propValue;
      }
    }
  });

  // check for child script text/props
  [].forEach.call(element.getElementsByTagName('script'), function (scrp) {
    var propsObj = {};
    if(scrp.hasAttribute('type')) {
      if (scrp.getAttribute('type') !== 'text/props' ) { return; }
      try {
        propsObj = JSON.parse(scrp.innerHTML);
      } catch(e) {
        throw new Error(e)
      }
      Object.assign(props, propsObj);
    }
  });  

  return props;
};

var getHabitatSelectorFromClient = function (currentScript) {
  var scriptTagAttrs = currentScript.attributes;
  var selector = null;
  // check for another props attached to the tag
  Object.keys(scriptTagAttrs).forEach(function (key) {
    if (scriptTagAttrs.hasOwnProperty(key)) {
      var dataAttrName = scriptTagAttrs[key].name;
      if (dataAttrName === 'data-mount-in') {
        selector = scriptTagAttrs[key].nodeValue;
      }
    }
  });
  return selector
};

/**
 * Return array of 0 or more elements that will host our widget
 * @param  {id} attrId the data widget id attribute the host should have
 * @param  {document} scope  Docuemnt object or DOM Element as a scope
 * @return {Array}        Array of matching habitats
 */
var widgetDOMHostElements = function (
  ref
) {
  var selector = ref.selector;
  var inline = ref.inline;
  var clientSpecified = ref.clientSpecified;

  var hostNodes = [];
  var currentScript = getExecutedScript();

  if (inline === true) {
    var parentNode = currentScript.parentNode;
    hostNodes.push(parentNode);
  }
  if (clientSpecified === true && !selector) {
    // user did not specify where to mount - get it from script tag attributes
    selector = getHabitatSelectorFromClient(currentScript);
  }
  if (selector) {
    [].forEach.call(document.querySelectorAll(selector), function (queriedTag) {
      hostNodes.push(queriedTag);
    });
  }
  return hostNodes;
};

/**
 * preact render function that will be queued if the DOM is not ready
 * and executed immeidatly if DOM is ready
 */
var preactRender = function (widget, hostElements, root, cleanRoot, defaultProps) {
  hostElements.forEach(function (elm) {
    var hostNode = elm;
    if (hostNode._habitat) {
      return; 
    }
    hostNode._habitat = true;
    var props = collectPropsFromElement(elm, defaultProps) || defaultProps;
    if(cleanRoot) {
      hostNode.innerHTML = "";
    }
    return preact.render(preact.h(widget, props), hostNode, root);
  });
};

var habitat = function (Widget) {
  // Widget represents the Preact component we need to mount
  var widget = Widget;
  // preact root render helper
  var root = null;

  var render = function (
    ref
  ) {
    if ( ref === void 0 ) ref = {};
    var selector = ref.selector; if ( selector === void 0 ) selector = null;
    var inline = ref.inline; if ( inline === void 0 ) inline = false;
    var clean = ref.clean; if ( clean === void 0 ) clean = false;
    var clientSpecified = ref.clientSpecified; if ( clientSpecified === void 0 ) clientSpecified = false;
    var defaultProps = ref.defaultProps; if ( defaultProps === void 0 ) defaultProps = {};

    var elements = widgetDOMHostElements({
      selector: selector,
      inline: inline,
      clientSpecified: clientSpecified
    });
    var loaded = function () {
      if (elements.length > 0) {
        var elements$1 = widgetDOMHostElements({
          selector: selector,
          inline: inline,
          clientSpecified: clientSpecified
        });

        return preactRender(widget, elements$1, root, clean, defaultProps);
      }
    };
    loaded();
    document.addEventListener("DOMContentLoaded", loaded);
    document.addEventListener("load", loaded);
  };

  return { render: render };
};

export default habitat;
//# sourceMappingURL=preact-habitat.es.js.map
