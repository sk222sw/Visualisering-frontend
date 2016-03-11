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
    const commits = this.props.data && this.props.data.map((commit, index) => {
      const codeString = atob(commit.code);
      const lines = codeString.split("\n");

      return (
          <div key={`commit.filename${index}`} id="titlecontent">
          <p className="center">{commit.filename}<br />
            from<br />
            {commit.repo}</p>
            {lines.map((l, i) => <p key={`${l.substr(0, 2)}${i}`}>{l}</p>)}
        </div>
      );
    })[0];

    console.log(commits);

    return (
      <div className="crawl-component">
        <p id="start">A short time ago in a browser very, very close&hellip;</p>
        <h1>MAY THE SOURCE<sub>be with you</sub></h1>
        <div id="titles">
          {commits}
        </div>
      </div>
    );
  }
}
CodeCrawl.propTypes = {
  text: React.PropTypes.string
};
