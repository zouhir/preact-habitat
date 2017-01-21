/*  eslint-disable no-undef, no-unused-vars */

import { h } from 'preact'
import { _getWidgetScriptTag, _getTagContent, render } from '../src'

// test value in script config
const val = '{ "clone": "test-component" }'
// faking a browser using JSDOM
let document = require('jsdom').jsdom(`
    <body>
      <div id="test-component">
        <script type="text/javascript"></script>
      </div>
      <script type='widget/config'>${val}</script>
    </body>
  `)
// Good to have, probably not required in our case
global.document = document
global.window = document.defaultView
global.navigator = window.navigator

test('Habitat internal util fn _getWidgetScriptTag able to find script', () => {
  // document must find 2 tags
  expect(document.querySelectorAll('script')).toHaveLength(2)

  // document must find current script tag
  expect(_getWidgetScriptTag(document)).toBeTruthy()
})

test('Habitat internal util fn _getTagContent able to find script', () => {
  // manually mocked the config script as the 2nd
  let tag = document.querySelectorAll('script')[1]
  // config objects must match
  expect(_getTagContent(tag)).toMatchObject(JSON.parse(val))
})

test('Habitat library exports render function', () => {
  // config objects must match
  expect(typeof render).toBe('function')
})
