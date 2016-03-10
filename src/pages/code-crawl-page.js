import React from "react";
import {connect} from "react-redux";
import CodeCrawl from "../components/code-crawl";

const CodeCrawlPage = ({data}) => <CodeCrawl data={data} />;

const mapStateToProps = appState => {
  return {
    data: appState.components.commits
  };
};

export default connect(mapStateToProps)(CodeCrawlPage);
