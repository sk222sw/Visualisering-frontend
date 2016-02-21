import React from "react";
import {connect} from "react-redux";
import CodeCrawl from "../components/code-crawl";

const CodeCrawlPage = ({text}) => (<CodeCrawl text={text} />);

const mapStateToProps = appState => {
  return {
    text: appState.codeCrawl.text
  };
};

export default connect(mapStateToProps)(CodeCrawlPage);
