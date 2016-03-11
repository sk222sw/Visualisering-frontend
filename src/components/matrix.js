import React from "react";
import settings from "./matrix-settings";

let initialized = false;
let currentText = "";

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
    texts.push(settings.projectText + data.repo);
    texts.push(settings.fileNameText + data.filename);
    texts.push(settings.repoOwner + data.owner);
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
    ctx.font = settings.contextFont;
    const columns = c.width / settings.fontSize;
    let characterSet = "";
    characterSet = new Buffer(this.characterSet, "base64").toString("ascii");
    // const characterSet = this.props.data[0].code.split("");
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = settings.initialDropValue;
    }

    /**
     * Matrix module logic
     */
    function makeItRain() {
      // reset canvas before next character rendering
      // then set it back to the font color
      ctx.fillStyle = settings.contextBackground;
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = settings.fontColor;

      for (let i = 0; i < drops.length; i++) {
        const char = characterSet[Math.floor(Math.random() * characterSet.length)];
        ctx.fillText(char, i * settings.fontSize, drops[i] * settings.fontSize);

        // if a character travels past the window height it might reset and
        // start from the top. this is what makes the drops appear randomly
        if (drops[i] * settings.fontSize > c.height && Math.random() > settings.chanceOfDropReset) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    setInterval(makeItRain, settings.speed);
  }

  render() {
    return (
        <div>
          {this.getData()}
        </div>
      );
  }
}
