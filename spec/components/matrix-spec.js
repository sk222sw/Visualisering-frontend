import React from "react";

import TestUtils from "react-addons-test-utils";
import expect from "expect";
import expectJSX from "expect-jsx";

expect.extend(expectJSX);

import Matrix from "../../src/components/matrix";

describe("Matrix", () => {
  it("should render an h4 with user name", () => {
    const renderer = TestUtils.createRenderer();

    const fakeData = [{id: 1, user: "Lord Howell", commit: "Some text"}];

    renderer.render(<Matrix data={fakeData} />);

    const actual = renderer.getRenderOutput();
    const expected = <h4>Lord Howell</h4>;

    expect(actual).toIncludeJSX(expected);
  });
});
