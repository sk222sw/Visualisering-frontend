import React from "react";
import {connect} from "react-redux";
import Matrix from "../components/matrix";

const MatrixPage = ({data}) => <Matrix data={data} />;

const mapStateToProps = appState => {
  console.log(appState);
  return {
    data: appState.components.commits
  };
};

export default connect(mapStateToProps)(MatrixPage);
