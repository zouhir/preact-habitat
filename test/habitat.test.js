import { h } from 'preact';
import { expect } from 'chai';
import {
  _habitatsProps,
  _habitatElms,
  _getWidgetScriptTag,
  _getMountAttr,
  _capetalize
} from '../src/lib/habitat';

import habitat from '../src';

describe('Habitat lib functions', () => {
  it('should find habitat divs in document', () => {
    const DATA_VALUE = 'my-widget';
    const hostHabitats = _habitatElms(DATA_VALUE);
    // document must find current script tag
    expect(hostHabitats.length).to.equal(3);
  });

  it('should get props object from habitat div', () => {
    const habitatDiv = document.getElementById('sucess-props-check');
    const expectedProps = {
      name: 'zouhir',
      key: '11001100'
    };
    const propsObj = _habitatsProps(habitatDiv);
    // document must find current script tag
    expect(propsObj).to.deep.equal(expectedProps);
  });

  it('should not affect or capetalise propnames with no dashes', () => {
    const propOne = 'somepropname';
    // document must find current script tag
    expect(_capetalize(propOne)).to.equal(propOne);
  });

  it('should capetalise prop names with dashes `-`', () => {
    const propOne = 'some-prop-name';
    // document must find current script tag
    expect(_capetalize(propOne)).to.equal('somePropName');
  });

  it('should get the current script getting executed', () => {
    expect(_getWidgetScriptTag(document)).to.not.be.undefined;
  });

  it('should get the mount attribute on the tag', () => {
    let mountTo = 'my-widget';
    let myScript = document.getElementById('find-mount-here');
    expect(_getMountAttr(myScript)).to.equal(mountTo);
  });
});

describe('Module', () => {
  it('should export habitat factory function', () => {
    expect(habitat).to.be.a('function');
  });

  it('should return render function form the habitat factory', () => {
    expect(habitat().render).to.be.a('function');
  });
});
