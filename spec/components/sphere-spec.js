import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

import Sphere from '../../src/components/sphere.js';

describe('Sphere', () => {

    it('Renders a div with correct id', () => {
        const renderer = TestUtils.createRenderer();
        const expectedID = "sphere-container";

        renderer.render(<Sphere /* ADD PROPS HERE */ />);

        const actual = renderer.getRenderOutput();
        const expected = <div id={expectedID} />;

        expect(actual).toIncludeJSX(expected);
    });
});
