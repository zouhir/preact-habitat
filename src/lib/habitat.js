const DEF_PROP_ATTR = 'data-prop';
const DEF_WIDGET_ID = 'data-widget';
const DEF_MOUNT = 'data-mount';

/**
 * Capetalize every letter after `-`
 * @param  {String} str string
 * @return {String}     Capetalized string
 */
const _capetalize = str => {
  return str.replace(/-([a-z])/ig, (all, letter) => {
    return letter.toUpperCase();
  });
};

/**
 * Get the props from a host element's data attributes
 * @param  {Element} tag The host element
 * @return {Object}     props object to be passed to the component
 */
const _habitatsProps = (tag, attr = DEF_PROP_ATTR) => {
  let attrs = tag.attributes;
  let props = {};

  // ceck for another props attached to the tag
  Object.keys(attrs).forEach(key => {
    if (attrs.hasOwnProperty(key)) {
      let dataAttrName = attrs[key].name;
      let propName = dataAttrName.split(attr + `-`).pop();
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
const _habitatElms = (attrValue, attrKey = DEF_WIDGET_ID) => {
  let hostNodes = [];
  [].forEach.call(document.querySelectorAll(`[${attrKey}]`), queriedTag => {
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
const _getWidgetScriptTag = () => {
  return document.currentScript ||
    (() => {
      let scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
};

// TODO: abstract and reuse with ./habitat.js _habitatsProps
const _getMountAttr = (script, attr = DEF_MOUNT) => {
  let attrs = script.attributes;
  let mountValue = null;
  // ceck for another props attached to the tag
  Object.keys(attrs).forEach(key => {
    if (attrs.hasOwnProperty(key)) {
      const dataAttrName = attrs[key].name;
      if (dataAttrName === attr) {
        mountValue = attrs[key].nodeValue;
      }
    }
  });
  return mountValue;
};

export {
  _habitatsProps,
  _habitatElms,
  _getWidgetScriptTag,
  _getMountAttr,
  _capetalize
};
