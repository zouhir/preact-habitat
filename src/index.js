import preact from 'preact';

import {
  _habitatElms,
  _habitatsProps,
  _getMountAttr,
  _getWidgetScriptTag,
  _isReady
} from './lib/habitat';

const habitat = Widget => {

  let widget = Widget;
  let hasRendered = false; // flag to not render twice if document state has changed
  let root = null;
  let currentScript = _getWidgetScriptTag(); // get current script

  let mountTo = _getMountAttr(currentScript);

  /**
   * private _render function that will be queued if the DOM is not render
   * and executed immeidatly if DOM is ready
   */
  let _render = () => {
    let habitats = null;
    if (mountTo) {
      habitats = _habitatElms(mountTo);
    } else {
      habitats = [].concat(currentScript.parentNode);
    }
    habitats.forEach(elm => {
      let hostNode = elm;
      let props = _habitatsProps(elm) || {};
      return preact.render(preact.h(widget, props), hostNode, root);
    });
  };

  let render = () => {
    if(_isReady() && !hasRendered) {
      hasRendered = true;
      return _render();
    } else {
      document.onreadystatechange = () => {
        if (_isReady() && !hasRendered) {
          hasRendered = true;
          return _render();
        }
      };
    }
  };

  return { render };
};

export default habitat;
