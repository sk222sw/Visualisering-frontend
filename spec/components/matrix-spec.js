import React from "react";

import TestUtils from "react-addons-test-utils";
import expect from "expect";
import expectJSX from "expect-jsx";

expect.extend(expectJSX);

import Matrix from "../../src/components/matrix";

const fakeData = [{id: 1,
  project: "linux",
  githubUser: "torvalds",
  fileName: "bug.h",
  contributors: ["rjarzmik", "bjdooks-ct", "arndb"],
  sourceCode: `void hook_fault_code(int nr, int (*fn)(unsigned long, unsigned int,
				       struct pt_regs *),
		     int sig, int code, const char *name);

void hook_ifault_code(int nr, int (*fn)(unsigned long, unsigned int,
				       struct pt_regs *),
		     int sig, int code, const char *name);
`}];

const renderer = TestUtils.createRenderer();
renderer.render(<Matrix data={fakeData} />);
const actual = renderer.getRenderOutput();

describe("Matrix", () => {
  it("should render an h2 with project name", () => {
    const expected = <h2>linux</h2>;
    expect(actual).toIncludeJSX(expected);
  });

  it("should render an h4 with githubUser", () => {
    const expected = <h4>torvalds</h4>;
    expect(actual).toIncludeJSX(expected);
  });

  it("should render an h4 with fileName", () => {
    const expected = <h4>bug.h</h4>;
    expect(actual).toIncludeJSX(expected);
  });

  it("should render a list with contributors", () => {
    const expected = (
      <ul><li>rjarzmik</li><li>bjdooks-ct</li><li>arndb</li></ul>
    );
    expect(actual).toIncludeJSX(expected);
  });
});

