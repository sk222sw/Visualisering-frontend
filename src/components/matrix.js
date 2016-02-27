import React from "react";

// static texts
const projectText = "visualizing source code from github repo: ";
const fileNameText = "filename: ";
const repoOwner = "owner: ";
const contributorTitle = "contributors: ";

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
                {projectText}
              </div>
              <h2 className="project-info project-name">{data.project}</h2>
            </div>
            <div className="filename-section">
              <div className="filename-text">
                {fileNameText}
              </div>
              <h4 className="filename-name">
                {data.fileName}
              </h4>
            </div>
            <div className="github-user-section">
              <div className="github-user-text">
                {repoOwner}
              </div>
              <h3 className="github-user">{data.githubUser}</h3>
            </div>
            <div className="contributors-section">
              <div className="contributors-text">
                {contributorTitle}
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
