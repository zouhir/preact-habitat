import { h } from 'preact';
import { expect } from 'chai';
import {
  _propsToPassDown,
  _hostDOMElms,
  _getCurrentScriptTag,
  _capetalize,
  _isReady
} from '../src/lib/habitat';

import habitat from '../src';

describe('Habitat module utilities', () => {
  afterEach(() => {
    document.attachEvent = false
  });
  it('should find all habitat divs in document', () => {
    const DATA_VALUE = 'my-widget';
    const hostHabitats = _hostDOMElms({ value: DATA_VALUE });
    // document must find current script tag
    expect(hostHabitats.length).to.equal(3);
  });

  it('should pass props down from the client\'s div', () => {
    const habitatDiv = document.getElementById('sucess-props-check');
    const expectedProps = {
      name: 'zouhir',
      key: '11001100'
    };
    const propsObj = _propsToPassDown(habitatDiv);
    // document must find current script tag
    expect(propsObj).to.deep.equal(expectedProps);
  });

  it('should not camcelCase names with no dashes', () => {
    const propOne = 'somepropname';
    // document must find current script tag
    expect(_capetalize(propOne)).to.equal(propOne);
  });

  it('should camcelCase prop names with dashes `-`', () => {
    const propOne = 'some-prop-name';
    // document must find current script tag
    expect(_capetalize(propOne)).to.equal('somePropName');
  });

  it('should get the currently getting executed script tag', () => {
    expect(_getCurrentScriptTag(document)).to.not.be.undefined;
  });
  it('ready', () => {
    Object.defineProperty(document, "readyState", {
        configurable: true,
        get() { return "interactive"; }
    });
    expect(_isReady()).to.equal(true)
  });
  it('ready IE9', () => {
    document.attachEvent = true
    Object.defineProperty(document, "readyState", {
        configurable: true,
        get() { return "interactive"; }
    });
    expect(_isReady()).to.equal(false)
  })
  it('ready IE9 true', () => {
      document.attachEvent = true
      Object.defineProperty(document, "readyState", {
          configurable: true,
          get() { return "complete"; }
      });
      expect(_isReady()).to.equal(true)
  })
});