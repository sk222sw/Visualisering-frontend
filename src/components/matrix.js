import React from "react";

export default class GitHubSourceCode extends React.Component {
  getData() {
    const dataComponents = this.props.data.map(data => {
      return (
        <div key={data.id}>
          <div className="matrix-information-section">
            <h2>{data.project}</h2>
            <h3>{data.githubUser}</h3>
            <h4>{data.fileName}</h4>
            <ul>{data.contributors.map(function(contributor) {
              return <li key={contributor.id}>{contributor}</li>;
            })}</ul>
          </div>
          <div className="matrix-code-section">
            <code>{data.sourceCode}</code>;
          </div>
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
