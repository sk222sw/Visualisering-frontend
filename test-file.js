import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

import ScreamingHelloWorld from '../../src/components/screaming-hello-world.js';

describe('ScreamingHelloWorld', () => {

    it('WRITE DESCRIPTION HERE', () => {
        const renderer = TestUtils.createRenderer();

        renderer.render(<ScreamingHelloWorld ADD PROPS HERE />);

        const actual = renderer.getRenderOutput();
        const expected = <p>This is what you want</p>;

        expect(actual).toIncludeJSX(expected);
    });
});