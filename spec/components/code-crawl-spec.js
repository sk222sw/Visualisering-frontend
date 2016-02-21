import React from "react";
import TestUtils from "react-addons-test-utils";
import expect from "expect";
import expectJSX from "expect-jsx";

expect.extend(expectJSX);

import CodeCrawl from "../../src/components/code-crawl";

describe("CodeCrawl", () => {
  it("should render prop test in h1", () => {
    const renderer = TestUtils.createRenderer();

    const text = "This is some sample text";

    renderer.render(<CodeCrawl text={text} />);

    const actual = renderer.getRenderOutput();
    const expected = <h1>{text}</h1>;

    expect(actual).toIncludeJSX(expected);
  });
});
