// helping mocha with ES6
require('babel-register');
require('babel-polyfill');

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

// faking a browser
const clientDOM = new JSDOM(
  `
  <body>
    <div id="sucess-props-check" data-props-name="zouhir" data-prop-key="11001100"></div>
    <div data-widget="my-widget"></div>
    <div data-widget="my-widget"></div>
    <div data-widget="my-widget"></div>
    <!-- custom tag and value -->
    <div data-widget-tv="tv-player"></div>
    <div data-widget-tv="tv-player"></div>

    <!-- cleanup widget -->
    <div class='datatable' data-table-widget="datatable"><div>LOADING BIG TABLE</div></div>

    <script id="find-mount-here" data-mount="my-widget"></script>
  </body>
  `
);
// window may not required in our case, but useful to have
global.window = clientDOM.window;
global.document = global.window.document;
global.navigator = global.window.navigator;
