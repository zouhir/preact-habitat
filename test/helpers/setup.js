// helping mocha with ES6
require('babel-register');
require('babel-polyfill');

// faking a browser, JSDOM is very lightweight
global.document = require('jsdom').jsdom(
  `
  <body>
    <div id="sucess-props-check" data-prop-name="zouhir" data-prop-key="11001100"></div>
    <div data-widget="my-widget"></div>
    <div data-widget="my-widget"></div>
    <div data-widget="my-widget"></div>

    <script id="find-mount-here" data-mount="my-widget"></script>
  </body>
  `
);
// window may not required in our case, but useful to have
global.window = document.defaultView;
global.navigator = window.navigator;
