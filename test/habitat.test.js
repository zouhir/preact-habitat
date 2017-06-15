import { h, Component } from 'preact';
import { expect } from 'chai';
import simulant from 'simulant';

import {
  _habitatsProps,
  _habitatElms,
  _getWidgetScriptTag,
  _getMountAttr,
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


describe('Habitat Renderer', () => {
    afterEach(() => {
        let widgets = _habitatElms('my-widget');
        widgets.forEach(widget => {
            widget.innerHTML = ''
        })
    });
    it('should render the widget in 3 habitat elements', () => {
      let hb = habitat(TitleComponent);
      hb.render();

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.contain(TEST_TITLE);
      expect(widgets.length).to.equal(3);

    });
    it('should cleanup the DOM after each test', () => {
        let w2 = document.querySelectorAll('.test');
        expect(w2.length).to.equal(0);
    });
    it('should not render if document readyState is loading', () => {
      Object.defineProperty(document, "readyState", {
        configurable: true,
        get() { return "loading"; }
      });
      expect(document.readyState).to.equal('loading');

      let hb = habitat(TitleComponent);
      hb.render();

      let widgets = document.querySelectorAll('.test');
      expect(document.body.innerHTML).to.not.contain(TEST_TITLE);
      expect(widgets.length).to.equal(0);
    });
});
