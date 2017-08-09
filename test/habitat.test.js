import { h, Component } from 'preact';
import { expect } from 'chai';
import simulant from 'simulant';

import {
  collectPropsFromElement,
  widgetDOMHostElements,
  getExecutedScript,
  camelcasize,
} from '../src/lib';

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
        let widgetsClientMounted = widgetDOMHostElements('[data-widget="my-widget"]');
        let widgetsDveloperMounted = widgetDOMHostElements('[data-widget-tv="tv-player"]');
        widgetsClientMounted.forEach(widget => {
            widget.innerHTML = ''
        })
        widgetsDveloperMounted.forEach(widget => {
            widget.innerHTML = ''
        })
        document.querySelectorAll('.datatable')[0].innerHTML = 'LOADING BIG TABLE';

        [].forEach.call(document.querySelectorAll('.test'), queriedTag => {
            document.getElementById('body').removeChild(queriedTag)
        });

    });
    it('should inline the widget and render it once', () => {
      let hb = habitat(TitleComponent);
      hb.render(null, {inline: true});

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(1);

    });
    it('should render the widget in 3 habitat elements', () => {
      let hb = habitat(TitleComponent);
      hb.render('[data-widget="my-widget"]');

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(3);

    });
    it('should render 2 custom attributes habitat elements', () => {
      let hb = habitat(TitleComponent);
      hb.render('[data-widget-tv="tv-player"]');

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(2);

    });

    it('should render 1 widget and not clean its content', () => {
      let hb = habitat(TitleComponent);
      hb.render('[data-table-widget="datatable"]');

      let widgets = document.querySelectorAll('.datatable');
      expect(document.body.innerHTML).to.contain('LOADING BIG TABLE');
      expect(widgets[0].innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(1);
    });

    it('should render 1 widget and clean loading conten tent', () => {
      let hb = habitat(TitleComponent);
      hb.render('[data-table-widget="datatable"]', { clean: true });

      let widgets = document.querySelectorAll('.datatable');
      expect(widgets[0].innerHTML).to.not.contain('LOADING BIG TABLE');
      expect(widgets[0].innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(1);
    });

    it('should cleanup the DOM after each test', () => {
        let w2 = document.querySelectorAll('.test');
        expect(w2.length).to.equal(0);
    });
});
