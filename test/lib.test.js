import { h } from 'preact';
import { expect } from 'chai';
import {
  collectPropsFromElement,
  widgetDOMHostElements,
  getExecutedScript,
  camelcasize,
  getHabitatSelectorFromClient
} from '../src/lib';

import habitat from '../src';

describe('Helper utility: Camel Casing for props', () => {
  it('should not camcelCase names with no dashes', () => {
    const propOne = 'somepropname';
    // document must find current script tag
    expect(camelcasize(propOne)).to.equal(propOne);
  });

  it('should camcelCase prop names with dashes `-`', () => {
    const propOne = 'some-prop-name';
    // document must find current script tag
    expect(camelcasize(propOne)).to.equal('somePropName');
  });
})

describe('Helper utility: Client DOM querying with widgetDOMHostElements', () => {
  it('should find host using data attribute', () => {
    const hostHabitats = widgetDOMHostElements("[data-widget='my-widget']", { clientSpecified: false, inline: false, clean: false });
    // document must find current script tag
    expect(hostHabitats.length).to.equal(3);
  });

  it('should find host using class name', () => {
    const hostHabitats = widgetDOMHostElements(".classy-widget", { clientSpecified: false, inline: false, clean: false });
    // document must find current script tag
    expect(hostHabitats.length).to.equal(3);
  });

  it('should find host using ID', () => {
    const hostHabitats = widgetDOMHostElements("#idee-widget", { clientSpecified: false, inline: false, clean: false });
    // document must find current script tag
    expect(hostHabitats.length).to.equal(1);
  });

  it('should get the currently getting executed script tag', () => {
    expect(getExecutedScript(document)).to.not.be.undefined;
  });

  it('should get habitats selectors from client script itself', () => {
    let currentScript = document.getElementById('find-mount-here')

    expect(getHabitatSelectorFromClient(currentScript)).to.equal('.my-widget');
  });
});


describe('Helper utility: collecting Client DOM props with collectPropsFromElement', () => {
  it('should pass props down from the client\'s div', () => {
    const habitatDiv = document.getElementById('sucess-props-check');
    const expectedProps = {
      name: 'zouhir',
      key: '11001100'
    };
    const propsObj = collectPropsFromElement(habitatDiv);
    // document must find current script tag
    expect(propsObj).to.deep.equal(expectedProps);
  });

  it('should accept data-props- as well as data-prop attributes on the div', () => {
    const habitatDiv = document.getElementById('sucess-props-check2');
    const expectedProps = {
      name: 'zouhir',
      key: '11001100'
    };
    const propsObj = collectPropsFromElement(habitatDiv);
    // document must find current script tag
    expect(propsObj).to.deep.equal(expectedProps);
  });
})