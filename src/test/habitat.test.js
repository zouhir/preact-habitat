import { h, Component } from "preact";
import simulant from "simulant";

import {
  collectPropsFromElement,
  widgetDOMHostElements,
  getExecutedScript,
  camelcasize
} from "../lib";

import habitat from "../index";

const TEST_TITLE = "Hello, World!";

class TitleComponent extends Component {
  render() {
    return (
      <h1 className="test">
        {TEST_TITLE}
      </h1>
    );
  }
}

describe("Module API Specs", () => {
  it("should export habitat factory function", () => {
    expect(typeof habitat).toBe("function");
  });

  it("should return render function form the habitat factory", () => {
    expect(typeof habitat().render).toBe("function");
  });
});

/**
 * Renders the widget based on client specified attributes
 */
describe("Habitat Client Control Renderer", () => {
  it("should inline the widget and render it once", () => {
    document.body.innerHTML = `
        <script></script>
        `;
    let hb = habitat(TitleComponent);
    hb.render({ inline: true });

    let widgets = document.querySelectorAll(".test");
    expect(document.body.innerHTML).toContain(TEST_TITLE);
    expect(widgets.length).toBe(1);
  });
  it("should render the widget in 3 habitat elements", () => {
    document.body.innerHTML = `
            <div data-widget="my-widget"></div>
            <div data-widget="my-widget"></div>
            <div data-widget="my-widget"></div>
        `;
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-widget="my-widget"]' });

    let widgets = document.querySelectorAll(".test");
    expect(document.body.innerHTML).toContain(TEST_TITLE);
    expect(widgets.length).toBe(3);
  });
  it("should render 2 custom attributes habitat elements", () => {
    document.body.innerHTML = `
      <div data-widget-tv="tv-player"></div>
      <div data-widget-tv="tv-player"></div>
    `
    let hb = habitat(TitleComponent);
    hb.render({selector: '[data-widget-tv="tv-player"]'});

    let widgets = document.querySelectorAll(".test");
    expect(document.body.innerHTML).toContain(TEST_TITLE);
    expect(widgets.length).toBe(2);
  });

  it("should render 1 widget and not clean its content", () => {
    document.body.innerHTML = `
      <div data-table-widget="datatable">LOADING BIG TABLE</div>
    `
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-table-widget="datatable"]' });

    let widgets = document.querySelectorAll('[data-table-widget="datatable"]');
    expect(document.body.innerHTML).toContain("LOADING BIG TABLE");
    expect(widgets[0].innerHTML).toContain(TEST_TITLE);
    expect(widgets.length).toBe(1);
  });
});
