import React from "react";

import Code from "./code";

export default class Commit extends React.Component {

  getData() {
    let dataComponents = this.props.data.map(function(data) {
      return (
        <div key={data.id}>
          <h4>{data.user}</h4>
            <Code code={data.commit} />
          </div>
      );
    });

    return dataComponents;
  }

  render() {
    return (
        <div>
          {this.getData()}
        </div>
      );
  }
}
