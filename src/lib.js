import { h, render } from "preact";
/**
 * Removes `-` fron a string and capetalize the letter after
 * example: data-props-hello-world =>  dataPropsHelloWorld
 * Used for props passed from host DOM element
 * @param  {String} str string
 * @return {String} Capetalized string
 */
const camelcasize = str => {
  return str.replace(/-([a-z])/gi, (all, letter) => {
    return letter.toUpperCase();
  });
};

/**
 * [getExecutedScript internal widget to provide the currently executed script]
 * @param  {document} document [Browser document object]
 * @return {HTMLElement}     [script Element]
 */
const getExecutedScript = () => {
  return (
    document.currentScript ||
    (() => {
      let scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1];
    })()
  );
};

/**
 * Get the props from a host element's data attributes
 * @param  {Element} tag The host element
 * @return {Object}  props object to be passed to the component
 */
const collectPropsFromElement = (element, defaultProps = {}) => {
  let attrs = element.attributes;

  let props = Object.assign({}, defaultProps);

  // collect from element
  Object.keys(attrs).forEach(key => {
    if (attrs.hasOwnProperty(key)) {
      let dataAttrName = attrs[key].name;
      if (!dataAttrName || typeof dataAttrName !== "string") {
        return false;
      }
      let propName = dataAttrName.split(/(data-props?-)/).pop() || '';
      propName = camelcasize(propName);
      if (dataAttrName !== propName) {
        let propValue = attrs[key].nodeValue;
        props[propName] = propValue;
      }
    }
  });

  // check for child script text/props or application/json
  [].forEach.call(element.getElementsByTagName('script'), scrp => {
    let propsObj = {}
    if(scrp.hasAttribute('type')) {
      if (
        scrp.getAttribute("type") !== "text/props" &&
        scrp.getAttribute("type") !== "application/json"
      )
        return;
      try {
        propsObj = JSON.parse(scrp.innerHTML);
      } catch(e) {
        throw new Error(e)
      }
      Object.assign(props, propsObj)
    }
  });  

  return props;
};

const getHabitatSelectorFromClient = (currentScript) => {
  let scriptTagAttrs = currentScript.attributes;
  let selector = null;
  // check for another props attached to the tag
  Object.keys(scriptTagAttrs).forEach(key => {
    if (scriptTagAttrs.hasOwnProperty(key)) {
      const dataAttrName = scriptTagAttrs[key].name;
      if (dataAttrName === 'data-mount-in') {
        selector = scriptTagAttrs[key].nodeValue;
      }
    }
  });
  return selector
}

/**
 * Return array of 0 or more elements that will host our widget
 * @param  {id} attrId the data widget id attribute the host should have
 * @param  {document} scope  Docuemnt object or DOM Element as a scope
 * @return {Array}        Array of matching habitats
 */
const widgetDOMHostElements = (
  { selector, inline, clientSpecified}
) => {
  let hostNodes = [];
  let currentScript = getExecutedScript();

  if (inline === true) {
    let parentNode = currentScript.parentNode;
    hostNodes.push(parentNode);
  }
  if (clientSpecified === true && !selector) {
    // user did not specify where to mount - get it from script tag attributes
    selector = getHabitatSelectorFromClient(currentScript);
  }
  if (selector) {
    [].forEach.call(document.querySelectorAll(selector), queriedTag => {
      hostNodes.push(queriedTag);
    });
  }
  return hostNodes;
};

/**
 * preact render function that will be queued if the DOM is not ready
 * and executed immeidatly if DOM is ready
 */
const preactRender = (widget, hostElements, root, cleanRoot, defaultProps) => {
  hostElements.forEach(elm => {
    let hostNode = elm;
    if (hostNode._habitat) {
      return; 
    }
    hostNode._habitat = true;
    let props = collectPropsFromElement(elm, defaultProps) || defaultProps;
    if(cleanRoot) {
      hostNode.innerHTML = "";
    }
    return render(h(widget, props), hostNode, root);
  });
};

export {
  collectPropsFromElement,
  widgetDOMHostElements,
  getExecutedScript,
  camelcasize,
  preactRender,
  getHabitatSelectorFromClient
};
