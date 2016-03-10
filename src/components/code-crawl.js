import React, {Component} from "react";
import {hashHistory} from "react-router";

export default class CodeCrawl extends Component {
  componentDidMount() {
    console.log(hashHistory);
  }
  clickHandler() {
    hashHistory.push("sphere");
  }
  render() {
    return (
      <div className="crawl-component">
        <p id="start">A short time ago in a browser very, very close&hellip;</p>
        <h1>MAY THE SOURCE<sub>be with you</sub></h1>
      </div>
    );
  }
}
CodeCrawl.propTypes = {
  text: React.PropTypes.string
};
