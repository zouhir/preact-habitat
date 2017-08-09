// helping mocha with ES6
require('babel-register');
require('babel-polyfill');

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

// faking a browser
const clientDOM = new JSDOM(
  `
  <body id="body">

    <!-- testing helpers: collectPropsFromElement -->
    <div id="sucess-props-check" data-props-name="zouhir" data-props-key="11001100"></div>
    <div id="sucess-props-check2" data-prop-name="zouhir" data-prop-key="11001100"></div>

    <!-- testing helpers: 3 selected widgets with data-attribute -->
    <div data-widget="my-widget"></div>
    <div data-widget="my-widget"></div>
    <div data-widget="my-widget"></div>

    <!-- testing helpers: 4 selected widgets class name -->
    <div class="classy-widget"></div>
    <div class="classy-widget"></div>
    <div class="classy-widget"></div>

    <!-- testing helpers: 1 selected widgets using ID -->
    <div id="idee-widget"></div>

    <!-- custom tag and value -->
    <div data-widget-tv="tv-player"></div>
    <div data-widget-tv="tv-player"></div>

    <!-- cleanup widget -->
    <div class='datatable' data-table-widget="datatable"><div>LOADING BIG TABLE</div></div>

    <!-- test mount on -->
    <script id="find-mount-here" data-mount-in=".my-widget"></script>
  </body>
  `
);
// window may not required in our case, but useful to have
global.window = clientDOM.window;
global.document = global.window.document;
global.navigator = global.window.navigator;
