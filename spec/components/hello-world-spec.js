'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HelloWorld from '../../src/components/hello-world';

describe("HelloWorld", () => {

  it("exists", () => {
    var doc = TestUtils.renderIntoDocument(
      <HelloWorld name="Krabba" />
    );

    var component = ReactDOM.findDOMNode(doc);

    expect(component.textContent).toMatch(/Hej Krabba/);
  });
});
