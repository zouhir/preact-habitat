import {
  _hostDOMElms,
  _render
} from "./lib/habitat";

const habitat = Widget => {
  // Widget represents the Preact component we need to mount
  let widget = Widget;
  // in case DOM has fired multipled readystate events, redner only once
  let hasRendered = false;
  // preact root render helper
  let root = null;

  let render = ({ name = "data-widget", value = null, inline = true, clean = true } = {}) => {
    let elements = _hostDOMElms({ name, value, inline, clean });
    if (!hasRendered && elements.length > 0) {
      hasRendered = true;
      return _render(widget, elements, root);
    }
    // document is not ready - subscurib to readystatechange event
    document.addEventListener('DOMContentLoaded', (e) => {
      let elements = _hostDOMElms({ name, value, inline, clean });
      if (!hasRendered && elements.length > 0) {
        hasRendered = true;
        return _render(widget, elements, root);
      }
    })
  };

  return { render };
};

export default habitat;
