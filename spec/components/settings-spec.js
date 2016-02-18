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

  // Tests that the console logs a warning if the component is created
  // with incorrect props. Unsure if this is really needed
  it('should console error with invalid props', () => {
    const renderer = TestUtils.createRenderer();

    renderer.render(<Settings settings={"not correct"} />);
    renderer.getRenderOutput();

    expect(ReactWarnings.propWarnings().length).toBe(1);
  });

  it('should not console error with invalid props', () => {
    const renderer = TestUtils.createRenderer();

    renderer.render(<Settings settings={{time: 2}} />);
    renderer.getRenderOutput();

    expect(ReactWarnings.propWarnings().length).toBe(0);
  });
});