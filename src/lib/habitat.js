import preact from 'preact'
/**
 * Capetalize every letter after `-`
 * Used for props passed from host DOM element
 * @param  {String} str string
 * @return {String}     Capetalized string
 */
const _capetalize = str => {
  return str.replace(/-([a-z])/ig, (all, letter) => {
    return letter.toUpperCase();
  });
};

/**
 * [_getCurrentScriptTag internal widget to provide the currently executed script]
 * @param  {document} document [Browser document object]
 * @return {HTMLElement}     [script Element]
 */
const _getCurrentScriptTag = () => {
  return document.currentScript ||
    (() => {
      let scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
};

/**
 * Get the props from a host element's data attributes
 * @param  {Element} tag The host element
 * @return {Object}  props object to be passed to the component
 */
const _propsToPassDown = (element) => {
  let attrs = element.attributes;
  let props = {};

  // ceck for another props attached to the element
  Object.keys(attrs).forEach(key => {
    if (attrs.hasOwnProperty(key)) {
      let dataAttrName = attrs[key].name;
      if (!dataAttrName || typeof dataAttrName !== 'string') {
        return false;
      }
      let propName = dataAttrName.split(/(data-props?-)/).pop();
      propName = _capetalize(propName);
      if (dataAttrName !== propName) {
        let propValue = attrs[key].nodeValue;
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
const _hostDOMElms = ({ name = "data-widget", value = null, inline = true, clean = true } = {}) => {
  let hostNodes = [];
  let currentScript = _getCurrentScriptTag();
  if (!value) {
    // user did not specify where to mount - get it from script tag attributes
    let scriptTagAttrs = currentScript.attributes;
    // ceck for another props attached to the tag
    Object.keys(scriptTagAttrs).forEach(key => {
      if (scriptTagAttrs.hasOwnProperty(key)) {
        const dataAttrName = scriptTagAttrs[key].name;
        if (dataAttrName === 'data-mount') {
          value = scriptTagAttrs[key].nodeValue;
        }
      }
    });
  }
  if (!value && inline) {
    let node = currentScript.parentNode
    if (clean) {
      node.innerHTML = '';
    }
    return [].concat(node);
  }
  [].forEach.call(document.querySelectorAll(`[${name}]`), queriedTag => {
    if (value === queriedTag.getAttribute(name)) {
      if (clean) {
        queriedTag.innerHTML = '';
      }
      hostNodes.push(queriedTag);
    }
  });
  return hostNodes;
};

const _isReady = () => {
  return (!document.attachEvent && document.readyState === 'interactive' || document.readyState === 'complete')
}

/**
 * private _render function that will be queued if the DOM is not render
 * and executed immeidatly if DOM is ready
 */
let _render = (widget, hostElements, root) => {
  hostElements.forEach(elm => {
    let hostNode = elm;
    let props = _propsToPassDown(elm) || {};
    return preact.render(preact.h(widget, props), hostNode, root);
  });
};

export {
  _propsToPassDown,
  _hostDOMElms,
  _getCurrentScriptTag,
  _capetalize,
  _isReady,
  _render
};
