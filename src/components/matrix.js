import React from "react";

// static texts
const projectText = "visualizing source code from github repo:";
const fileNameText = "filename: ";
const repoOwner = "owner: ";
const contributorTitle = "contributors: ";

export default class GitHubSourceCode extends React.Component {
  componentDidMount() {
    this.initMatrix();
  }

  getData() {
    const dataComponents = this.props.data.map(data => {
      return (
        <div key={data.id} className="matrix-visualization">
          <div className="matrix-code-section">
            <canvas id="matrix-canvas"></canvas>
          </div>
          <div className="matrix-info-section">
            <div className="project-info-section">
              <div className="project-info info-section-text">
                {projectText}
              </div>
              <div className="project-info project-name info-section-name">
                <h2>{data.project}</h2>
              </div>
            </div>
            <div className="filename-section">
              <div className="filename-text info-section-text">
                {fileNameText}
              </div>
              <div className="filename-name info-section-name">
                <h4>
                  {data.fileName}
                </h4>
              </div>
            </div>
            <div className="github-user-section">
              <div className="github-user-text info-section-text">
                {repoOwner}
              </div>
              <div className="github-user info-section-name">
                <h4>
                  {data.githubUser}
                </h4>
              </div>
            </div>
            <div className="contributors-section">
              <div className="contributors-text info-section-text">
                {contributorTitle}
              </div>
              <div className="contributor-list">
                <ul>
                  {data.contributors.map(contributor => {
                    return <li key={contributor.id}>{contributor}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return dataComponents;
  }

  initMatrix() {
    const c = document.querySelector("#matrix-canvas");
    const ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    const fontColor = "green";
    const fontSize = 30;
    const fontFamily = "courier";
    const columns = c.width / fontSize;

    const characterSet = "HEJ LITE TEXT".split("");

    const drops = [];
    // for (const column of columns) {
    //   drops[column] = 1;
    // }

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function makeItRain() {
      // resets the canvas to a black screen
      // but with a slight opacity to make the
      // old characters create a new background
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = fontColor;
      ctx.font = fontSize + "px " + fontFamily;

      for (let i = 0; i < drops.length; i++) {
        const char = characterSet[Math.floor(Math.random() * characterSet.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > c.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    setInterval(makeItRain, 50);
  }

  render() {
    return (
        <div>
          {this.getData()}
        </div>
      );
  }
}
