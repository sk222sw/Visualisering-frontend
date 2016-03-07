import React from "react";

// static texts
const projectText = "visualizing source code from github repo:";
const fileNameText = "filename: ";
const repoOwner = "owner: ";
const contributorTitle = "contributors: ";

// matrix settings
// font size will affect the size of the font and
// the number of drop columns
const fontSize = 12;
const fontColor = "green";
const fontFamily = "courier";
const contextFont = fontSize + "px " + fontFamily;

// eslint cant find window. change these in initMatrix()
// const matrixWidth = window.innerWidth;
// const matrixHeight = window.innerHeight;

// Lower opacity means the characters will leave a longer
// tail and the background color will be lighter
const contextOpacity = 0.05;

// contextBackground is used to reset the background before
// the next set of characters is rendered.
const contextBackground = "rgba(0, 0, 0, " + contextOpacity + ")";

// speed in milliseconds - lower is faster
const speed = 30;

// this adds an initial vertical position to each drop point.
// The value is multiplied by fontSize when rendered in makeItRain().
// This means that  1 = Initially all drops will start from the top
//                      at the same time
//                  someValueGreaterThan c.height = all drops start randomly
const initialDropValue = 1;

// used to determine whether a character drop should restart at the top.
// used as: if (Math.random() > chanceOfDropReset)
const chanceOfDropReset = 0.98;

export default class GitHubSourceCode extends React.Component {
  constructor(props) {
    super(props);

    this.loopInfo = this.loopInfo.bind(this);
  }

  componentDidMount() {
    this.initMatrix();
    this.loopInfo();
  }

  getData() {
    const dataComponents = this.props.data.map(data => {
      return (
        <div key={data.id} className="matrix-visualization">
          <div className="matrix-code-section">
            <canvas id="matrix-canvas" onClick={this.loopInfo}></canvas>
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
            <div className="contributors-section hidden">
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

  loopInfo() {
    const projectInfo = document.querySelector(".project-info-section");
    const fileName = document.querySelector(".filename-section");
    const gitHubUser = document.querySelector(".github-user-section");
    let infoElements = [];

    infoElements = [projectInfo, fileName, gitHubUser];

    // add css class "hidden" to each element if
    // it isn't hidden.
    for (let i = 0; i < infoElements.length; i++) {
      if (!hasClass(infoElements[i], "hidden")) {
        infoElements[i].classList.add("hidden");
      }
    }

    let currentlyVisibleElementIndex = 0;

    setInterval(() => {
      for (let i = 0; i < infoElements.length; i++) {
        if (i === currentlyVisibleElementIndex) {
          infoElements[i].classList.remove("hidden");
        } else {
          infoElements[i].classList.add("hidden");
        }
      }
      if (currentlyVisibleElementIndex >= infoElements.length - 1) {
        currentlyVisibleElementIndex = 0;
      } else {
        currentlyVisibleElementIndex++;
      }
    }, 1000);

    /**
     * Borrowed from http://jsperf.com/pure-js-hasclass-vs-jquery-hasclass/2
     * @param {string} el - html node
     * @param {string} selector - css class
     * @return {bool} true or false
     */
    function hasClass(el, selector) {
      const className = " " + selector + " ";
      return (" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1;
    }
  }

  initMatrix() {
    const c = document.querySelector("#matrix-canvas");
    const ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ctx.font = contextFont;
    console.log("cool", this.props.data);
    const columns = c.width / fontSize;
    const characterSet = this.props.data[0].sourceCode.split("");
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = initialDropValue;
    }

    /**
     * Matrix module logic
     */
    function makeItRain() {
      // reset canvas before next character rendering
      // then set it back to the font color
      ctx.fillStyle = contextBackground;
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = fontColor;

      for (let i = 0; i < drops.length; i++) {
        const char = characterSet[Math.floor(Math.random() * characterSet.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // if a character travels past the window height it might reset and
        // start from the top. this is what makes the drops appear randomly
        if (drops[i] * fontSize > c.height && Math.random() > chanceOfDropReset) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    setInterval(makeItRain, speed);
  }

  render() {
    return (
        <div>
          {this.getData()}
        </div>
      );
  }
}
