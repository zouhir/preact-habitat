import {
  _hostDOMElms,
  _propsToPassDown,
  _getWidgetScriptTag,
  _isReady,
  _render
} from "./lib/habitat";

const habitat = Widget => {
  // Widget represents the Preact component we need to mount
  let widget = Widget;
  // in case DOM has fired multipled readystate events, redner only once
  let hasRendered = false;
  // preact root render helper
  let root = null;

  let render = ({ name = "data-widget", value = null, inline = true } = {}) => {
    let isReady = _isReady();
    if (isReady && !hasRendered) {
      let elements = _hostDOMElms({ name, value, inline });
      hasRendered = true;
      return _render(widget, elements, root);
    }
    // document is not ready - subscurib to readystatechange event
    document.onreadystatechange = () => {
      let elements = _hostDOMElms({ name, value, inline });
      if (isReady && !hasRendered) {
        hasRendered = true;
        return _render(widget, elements, root);
      }
    };
  };

  return { render };
};

export default habitat;
