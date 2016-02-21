import React from "react";
import TestUtils from "react-addons-test-utils";
import expect from "expect";
import expectJSX from "expect-jsx";
import ReactWarnings from "../helpers/react-warnings";

expect.extend(expectJSX);

import Settings from "../../src/components/settings";

describe("Settings component", () => {
  beforeEach(() => ReactWarnings.watchConsole());

  afterEach(() => expect(ReactWarnings.propWarnings().length).toBe(0));

  it("should render an input field with correct type and ref", () => {
    const renderer = TestUtils.createRenderer();

    renderer.render(<Settings settings={{time: 0}} routes={[{path: "somewhere"}]} />);

    const actual = renderer.getRenderOutput();
    const expected = <input type="number" ref="seconds" />;

    expect(actual).toIncludeJSX(expected);
  });
  it("should render a checkbox for each route sent in through the routes-prop", () => {
    const renderer = TestUtils.createRenderer();
    const routes = [{
      path: "pathOne"
    }, {
      path: "pathTwo"
    }, {
      path: "pathThree"
    }];

    renderer.render(<Settings settings={{time: 0}} routes={routes} />);

    const actual = renderer.getRenderOutput();
    const expected = (<span>
        <label><input ref="pathOne" name="pathOne" type="checkbox" />pathOne</label>
        <label><input ref="pathTwo" name="pathTwo" type="checkbox" />pathTwo</label>
        <label><input ref="pathThree" name="pathThree" type="checkbox" />pathThree</label>
      </span>);

    expect(actual).toIncludeJSX(expected);
  });
});
