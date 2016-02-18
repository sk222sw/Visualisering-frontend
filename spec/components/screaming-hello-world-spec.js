import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

import ScreamingHelloWorld from '../../src/components/screaming-hello-world.js';

describe('ScreamingHelloWorld', () => {

  it('this one screams', () => {
    const renderer = TestUtils.createRenderer();

    renderer.render(<ScreamingHelloWorld name="mattias" />);

    const actual = renderer.getRenderOutput();
    const expected = <h1>Hej MATTIAS!</h1>;

    expect(actual).toIncludeJSX(expected);
  });
});