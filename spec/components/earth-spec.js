import React from "react";
import TestUtils from "react-addons-test-utils";
import expect from "expect";
import expectJSX from "expect-jsx";

expect.extend(expectJSX);

import Earth from "../../src/components/earth.js";

describe("Earth", () => {
  it("Renders a div with correct id", () => {
    const renderer = TestUtils.createRenderer();
    const expectedID = "earth-container";

    renderer.render(<Earth data={[{lat: 1, lng: 2, time: 3}]} />);

    const actual = renderer.getRenderOutput();
    const expected = <div id={expectedID} />;

    expect(actual).toIncludeJSX(expected);
  });
});
