import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

import HelloWorld from '../../src/components/hello-world';

describe('HelloWorld', () => {

  it('should show correct greeting', () => {
    const renderer = TestUtils.createRenderer();

    renderer.render(<HelloWorld name="Krabba" />);

    const actual = renderer.getRenderOutput();
    const expected = <h1>Hej Krabba!</h1>;

    expect(actual).toIncludeJSX(expected);
  });
});
