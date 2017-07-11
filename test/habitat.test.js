import { h, Component } from 'preact';
import { expect } from 'chai';
import simulant from 'simulant';

import {
  _propsToPassDown,
  _hostDOMElms,
  _getCurrentScriptTag,
  _capetalize,
} from '../src/lib/habitat';

import habitat from '../src';

const TEST_TITLE = 'Hello, World!';

class TitleComponent extends Component {
  render() {
    return (<h1 className="test">{TEST_TITLE}</h1>);
  }
}

describe('Module API Specs', () => {
    it('should export habitat factory function', () => {
        expect(habitat).to.be.a('function');
    });

    it('should return render function form the habitat factory', () => {
        expect(habitat().render).to.be.a('function');
    });
});

/**
 * Renders the widget based on client specified attributes
 */
describe('Habitat Client Control Renderer', () => {
    afterEach(() => {
        let widgetsClientMounted = _hostDOMElms({ value: 'my-widget' });
        let widgetsDveloperMounted = _hostDOMElms({ name: 'data-widget-tv', value: 'tv-player' });
        widgetsClientMounted.forEach(widget => {
            widget.innerHTML = ''
        })
        widgetsDveloperMounted.forEach(widget => {
            widget.innerHTML = ''
        })
        document.querySelectorAll('.datatable')[0].innerHTML = 'LOADING BIG TABLE'
    });
    it('should render the widget in 3 habitat elements', () => {
      let hb = habitat(TitleComponent);
      hb.render();

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(3);

    });
    it('should render the widget in 3 habitat elements', () => {
      let hb = habitat(TitleComponent);
      hb.render({ value: 'my-widget' });

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(3);

    });
    it('should render 2 custom attributes habitat elements', () => {
      let hb = habitat(TitleComponent);
      hb.render({ name: 'data-widget-tv', value: 'tv-player' });

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(2);

    });

    it('should render 1 widget and not clean its content', () => {
      let hb = habitat(TitleComponent);
      hb.render({ name: 'data-table-widget', value: 'datatable', clean: false });

      let widgets = document.querySelectorAll('.datatable');
      expect(document.body.innerHTML).to.contain('LOADING BIG TABLE');
      expect(widgets[0].innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(1);
    });

    it('should render 1 widget and clean loading conten tent', () => {
      let hb = habitat(TitleComponent);
      hb.render({ name: 'data-table-widget', value: 'datatable', clean: true});

      let widgets = document.querySelectorAll('.datatable');
      expect(widgets[0].innerHTML).to.not.contain('LOADING BIG TABLE');
      expect(widgets[0].innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(1);
    });

    it('should cleanup the DOM after each test', () => {
        let w2 = document.querySelectorAll('.test');
        expect(w2.length).to.equal(0);
    });
    it('should render if document readyState is complete', () => {
      Object.defineProperty(document, "readyState", {
        configurable: true,
        get() { return "complete"; }
      });
      expect(document.readyState).to.equal('complete');

      let hb = habitat(TitleComponent);
      hb.render();

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.contain(TEST_TITLE);
    });
});
