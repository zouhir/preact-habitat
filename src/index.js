import preact from 'preact'

const CONF_ATTR = 'widget/config'

const _getWidgetScriptTag = (document) => {
  return document.currentScript || ((() => {
    let scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }))()
}

const _getTagContent = (tag) => {
  try {
    return JSON.parse(tag.textContent)
  } catch (e) {
    return null
  }
}

const render = (Widget) => {
  let root
  let habitatNode // the DOM element where our widget going to be rendered
  const widgetScriptTag = _getWidgetScriptTag(document)
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
        if (tag.getAttribute('type') !== CONF_ATTR) {
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

export { _getWidgetScriptTag, _getTagContent, render }
