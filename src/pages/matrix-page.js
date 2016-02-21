import React from "react";
import {connect} from "react-redux";
import Matrix from "../components/matrix";

const MatrixPage = ({data}) => (<Matrix data={data} />);

const mapStateToProps = appState => {
  return {
    data: appState.matrix.data
  };
};

export default connect(mapStateToProps)(MatrixPage);
