import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import ReactWarnings from '../helpers/react-warnings';

expect.extend(expectJSX);

import Settings from '../../src/components/settings';

describe('Settings component', () => {

  beforeEach(() => ReactWarnings.watchConsole());

  afterEach(() => expect(ReactWarnings.propWarnings().length).toBe(0));

  it('should render an input field', () => {
    const renderer = TestUtils.createRenderer();

    renderer.render(<Settings settings={{time: 0}} />);

    const actual = renderer.getRenderOutput();
    const expected = <input type="text" />;

    expect(actual).toIncludeJSX(expected);
  });
});