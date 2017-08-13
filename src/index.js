import { widgetDOMHostElements, _render } from "./lib";

const habitat = Widget => {
  // Widget represents the Preact component we need to mount
  let widget = Widget;
  // in case DOM has fired multipled readystate events, redner only once
  let hasRendered = false;
  // preact root render helper
  let root = null;

  let render = (
    {
      selector = null,
      inline = false,
      clean = false,
      clientSpecified = false
    } = {}
  ) => {
    let elements = widgetDOMHostElements({
      selector,
      inline,
      clean,
      clientSpecified
    });
    if (!hasRendered && elements.length > 0) {
      hasRendered = true;
      return _render(widget, elements, root);
    }
    // document is not ready - subscurib to readystatechange event
    document.addEventListener("DOMContentLoaded", e => {
      if (!hasRendered && elements.length > 0) {
        let elements = widgetDOMHostElements({
          selector,
          inline,
          clean,
          clientSpecified
        });
        hasRendered = true;
        return _render(widget, elements, root);
      }
    });
  };

  return { render };
};

export default habitat;
