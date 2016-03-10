import React from "react";

import TestUtils from "react-addons-test-utils";
import expect from "expect";
import expectJSX from "expect-jsx";

expect.extend(expectJSX);

import Matrix from "../../src/components/matrix";

const fakeData = [{}];

const renderer = TestUtils.createRenderer();
renderer.render(<Matrix data={fakeData} />);
const actual = renderer.getRenderOutput();

describe("Matrix", () => {

});

