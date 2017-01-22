import preact from 'preact'

// default <script> `type` attribute for cloned widgets
const SCRIPT_ATTR = 'widget/config'

/**
 * [_getWidgetScriptTag internal widget to provide the currently executed script]
 * @param  {document} document [Browser document object]
 * @return {HTMLElement}     [script Element]
 */
const _getWidgetScriptTag = (document) => {
  return document.currentScript || ((() => {
    let scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }))()
}

/**
 * [_getTagContent internal function gets the content of script tag]
 * @param  {HTMLElement} tag [script tag]
 * @return {Object}     [Valid JavaScript Object]
 */
const _getTagContent = (tag) => {
  try {
    return JSON.parse(tag.textContent)
  } catch (e) {
    return null
  }
}

/**
 * [render the same Preact render function with some helpers]
 * @param  {[Function / Componenr]} Widget [Preact component]
 */
const render = (Widget) => {
  let root
  let domLoaded = false
  // DOM element where main widget going to be rendered
  let habitatNode
  // this has to be outside ready state chage
  // other than that we will not be able to know which script is getting executed
  const widgetScriptTag = _getWidgetScriptTag(document)

  // In case we need to clone the widget
  // All DOM has to be loaded
  document.onreadystatechange = function () {
    if (!domLoaded && (document.readyState === 'complete' ||
     document.readyState === 'loaded' ||
     document.readyState === 'interactive')) {
      domLoaded = true
      habitatNode = widgetScriptTag.parentNode
      // render main widget
      preact.render(
        preact.h(
          Widget
        ),
        habitatNode,
        root
      )

      // check for clones
      ;[].forEach.call(
        document.querySelectorAll('script[type]'),
          tag => {
            if (tag.getAttribute('type') !== SCRIPT_ATTR) {
              return
            }
            let config = _getTagContent(tag)
            if (!config || !config.clone) {
              return null
            }
            if (config.clone === habitatNode.id) {
              return preact.render(
                preact.h(
                  Widget
                ),
                tag.parentNode,
                root
              )
            }
          }
      )
    }
  }
}

export { _getWidgetScriptTag, _getTagContent, render }
