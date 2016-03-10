import React from "react";
// static texts
const projectText = "visualizing source code from github repo: ";
const fileNameText = "filename: ";
const repoOwner = "owner: ";

let initialized = false;
let currentText = "";

// matrix settings
// font size will affect the size of the font and
// the number of drop columns
const fontSize = 12;
const fontColor = "green";
const fontFamily = "courier";
const contextFont = fontSize + "px " + fontFamily;

// eslint cant find window. change these in initMatrix() in matrix.js
// const matrixWidth = window.innerWidth;
// const matrixHeight = window.innerHeight;

// Lower opacity means the characters will leave a longer
// tail and the background color will be lighter
const contextOpacity = 0.05;

// contextBackground is used to reset the background before
// the next set of characters is rendered.
const contextBackground = "rgba(0, 0, 0, " + contextOpacity + ")";

// speed in milliseconds - lower is faster
const speed = 100;

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
    this.getNextData = this.getNextData.bind(this);
    this.dataCounter = 0;
    this.loopInfo = this.loopInfo.bind(this);
    this.resetMatrix = this.resetMatrix.bind(this);
    this.characterSet = "Hhejehejhe".split("");
  }

  componentDidMount() {
    this.c = document.getElementById("matrix-canvas");
    this.ctx = this.c.getContext("2d");
    if (!initialized) {
      this.initMatrix();
    }
    window.addEventListener("click", e => {
      console.log(this.props.data);
      console.log("this.getdata::::", this.dataCounter, this.getNextData());
      this.code = this.props.data[this.dataCounter].code;
      this.ctx.restore();
      this.resetMatrix();
      if (this.dataCounter >= this.props.data.length - 1) {
        this.dataCounter = 0;
      } else {
        this.dataCounter++;
      }
    });
  }

  getNextData() {
    return this.props.data[this.dataCounter];
  }

  resetMatrix() {
    // removes all intervals, but this is so ugly and should be
    // handled differently after a big refactor.
    for (let i = 1; i < 9999; i++) {
      window.clearInterval(i);
    }
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.ctx.restore();
    this.characterSet = this.props.data[this.dataCounter].code;
    this.initMatrix();
    this.loopInfo();
  }

  getData() {
    return (
        <div className="matrix-visualization">
          <div className="matrix-info-section">
            <div className="project-info-section">
            </div>
            <div id="low"></div>
          </div>
          <div className="matrix-code-section">
            <canvas id="matrix-canvas"></canvas>
          </div>
        </div>
      );
  }

  loopInfo() {
    const infoSection = document.querySelector(".project-info-section");
    infoSection.innerHTML = "";
    console.log(infoSection.innerHTML);
    const low = document.getElementById("low");
    low.innerHTML = "_";
    const texts = [];
    const data = this.props.data[this.dataCounter];
    texts.push(projectText + data.repo);
    texts.push(fileNameText + data.filename);
    texts.push(repoOwner + data.owner);
    let ms = 1;
    let show = false;
    let textCounter = 0;
    let waitCounter = 0;
    let index = 0;
    currentText = " ";
    let interval;

    /**
     * simulates writing in a console
     */
    function write() {
      currentText = texts[textCounter];
      clearInterval(interval);
      if (index <= currentText.length) {
        infoSection.innerHTML += currentText.charAt(index);
        index++;
        ms = 100;
      } else if (index > currentText.length) {
        if (waitCounter > 5) {
          waitCounter = 0;
          clearInterval(interval);
          if (textCounter === texts.length - 1) {
            textCounter = 0;
          } else {
            textCounter++;
          }
          infoSection.innerHTML = "";
          index = 0;
        } else {
          ms = 500;
          blinkingLowDash();
          waitCounter++;
        }
      }
      interval = setInterval(write, ms);
    }

    /**
     * sets the value for the low dash blink effect
     */
    function blinkingLowDash() {
      if (show) {
        low.innerHTML = "_";
        show = false;
      } else {
        low.innerHTML = "";
        show = true;
      }
    }

    interval = setInterval(write, ms);
  }

  initMatrix() {
    if (!initialized) {
      initialized = true;
    }
    // const c = document.getElementById("matrix-canvas");
    const c = this.c;
    const ctx = this.ctx;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ctx.font = contextFont;
    const columns = c.width / fontSize;
    let characterSet = "";
    characterSet = new Buffer(this.characterSet, "base64").toString("ascii");
    // const characterSet = this.props.data[0].code.split("");
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
