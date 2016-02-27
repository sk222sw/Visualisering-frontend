import React from "react";

export default class GitHubSourceCode extends React.Component {
  getData() {
    const dataComponents = this.props.data.map(data => {
      return (
        <div key={data.id} className="matrix-visualization">
          <div className="matrix-code-section">
            <code>{data.sourceCode}</code>;
          </div>
          <div className="matrix-info-section">
            <div className="project-info-section">
              <div className="project-info project-text">
                visualizing source code from github repo:
              </div>
              <h2 className="project-info project-name">{data.project}</h2>
            </div>
            <div className="filename-section">
              <div className="filename-text">
                filename:
              </div>
              <h4 className="filename-name">
                {data.fileName}
              </h4>
            </div>
            <div className="github-user-section">
              <div className="github-user-text">
                owner:
              </div>
              <h3 className="github-user">{data.githubUser}</h3>
            </div>
            <div className="contributors-section">
              <div className="contributors-text">
                contributors:
              </div>
              <ul className="contributors-list">
                {data.contributors.map(contributor => {
                  return <li className="contributor" key={contributor.id}>{contributor}, </li>;
                })}
              </ul>
            </div>
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
