import preact from 'preact';

import {
  _habitatElms,
  _habitatsProps,
  _getMountAttr,
  _getWidgetScriptTag
} from './lib/habitat';

const habitat = Widget => {
  /**
   * Helpers
   */
  let hasRendered = false; // flag to not render twice if document state has changed
  let q = []; // q a function to execute when document is ready

  let widget = Widget;
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
      /**
       * add resize function as a prop
       */
      props.habitatMediaQuery = () => _getHabitatSizeQuery(elm);
      return preact.render(preact.h(widget, props), hostNode, root);
    });
  };

  /**
   * Regsiter event listener so Habitat render when DOM is ready / loaded
   */
  document.addEventListener(
    'readystatechange',
    () => {
      if (!hasRendered && q.length > 0 && document.readyState !== 'loading') {
        hasRendered = true;
        q.forEach(function(fun) {
          return fun();
        });
      }
    },
    false
  );

  let render = () => {
    if (document.readyState !== 'loading') {
      hasRendered = true;
      return _render();
    }
    return q.push(_render);
  };

  return { render };
};

export default habitat;
