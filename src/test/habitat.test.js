import { h, Component } from 'preact';
import habitat from '../index';

const TEST_TITLE = 'Hello, World!';

class TitleComponent extends Component {
  render() {
    return (
      <h1 className='test'>
        {TEST_TITLE}
      </h1>
    )
  }
}

class TestComponent extends Component {
  render() {
    return (
      <h1 className='another_test'>
        {TEST_TITLE}
      </h1>
    )
  }
}

describe('Module API Specs', () => {
  it('should export habitat factory function', () => {
    expect(typeof habitat).toBe('function');
  });

  it('should return render function form the habitat factory', () => {
    expect(typeof habitat().render).toBe('function');
  });
});

/**
 * Renders the widget based on client specified attributes
 */
describe('Habitat Client Control Renderer', () => {
  it('should inline the widget and render it once', () => {
    document.body.innerHTML = `
        <script></script>
        `;
    let hb = habitat(TitleComponent);
    hb.render({ inline: true });

    let widgets = document.querySelectorAll('.test');
    expect(document.body.innerHTML).toContain(TEST_TITLE);
    expect(widgets.length).toBe(1);
  });
  it('should render nothing when no options are provided', () => {
    document.body.innerHTML = `
        <script></script>
        `;
    let hb = habitat(TitleComponent);
    hb.render();

    let widgets = document.querySelectorAll('.test');
    expect(widgets.length).toBe(0);
  });
  it('should not render on existing habitat hostNode', () => {
    document.body.innerHTML = `
        <div data-widget="my-widget"></div>
        `;
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-widget="my-widget"]' });

    let hb2 = habitat(TestComponent);
    hb2.render({ selector: '[data-widget="my-widget"]' });

    const widgetsNew = document.querySelectorAll('.another_test');
    expect(widgetsNew.length).toBe(0);
    const widgets = document.querySelectorAll('.test');
    expect(widgets.length).toBe(1);
  });
  it('should render the widget in 3 habitat elements', () => {
    document.body.innerHTML = `
            <div data-widget="my-widget"></div>
            <div data-widget="my-widget"></div>
            <div data-widget="my-widget"></div>
        `;
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-widget="my-widget"]' });

    let widgets = document.querySelectorAll('.test');
    expect(document.body.innerHTML).toContain(TEST_TITLE);
    expect(widgets.length).toBe(3);
  });
  it('should render 2 custom attributes habitat elements', () => {
    document.body.innerHTML = `
      <div data-widget-tv="tv-player"></div>
      <div data-widget-tv="tv-player"></div>
    `;
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-widget-tv="tv-player"]' });

    let widgets = document.querySelectorAll('.test');
    expect(document.body.innerHTML).toContain(TEST_TITLE);
    expect(widgets.length).toBe(2);
  });

  it('should render 1 widget and not clean its content', () => {
    document.body.innerHTML = `
      <div data-table-widget="datatable">LOADING BIG TABLE</div>
    `;
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-table-widget="datatable"]' });

    let widgets = document.querySelectorAll('[data-table-widget="datatable"]');
    expect(document.body.innerHTML).toContain('LOADING BIG TABLE');
    expect(widgets[0].innerHTML).toContain(TEST_TITLE);
    expect(widgets.length).toBe(1);
  });
  it('should render 1 widget and clean its content', () => {
    document.body.innerHTML = `
      <div data-table-widget="datatable"><div className="oldElement" /></div>
    `;
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-table-widget="datatable"]', clean: true });

    let widgets = document.querySelectorAll('.oldElement');
    expect(widgets.length).toBe(0);
  });
  it('should pass component reference to global variable', () => {
    window.testGlobal = null;
    document.body.innerHTML = `
        <div data-widget="my-widget"></div>
        `;
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-widget="my-widget"]', component: 'testGlobal' });

    expect(window.testGlobal).toBeInstanceOf(TitleComponent);
  });
  it('should pass component reference to local variable', () => {
    var localTestReference = { ref: null };
    document.body.innerHTML = `
        <div data-widget="my-widget"></div>
        `;
    let hb = habitat(TitleComponent);
    hb.render({ selector: '[data-widget="my-widget"]', component: localTestReference });

    expect(localTestReference.ref).toBeInstanceOf(TitleComponent);
  });
});
