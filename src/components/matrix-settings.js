const settings = {};

// static texts
settings.projectText = "github repo: ";
settings.fileNameText = "filename: ";
settings.repoOwner = "owner: ";

// font size will affect the size of the font and
// the number of drop columns
settings.fontSize = 12;
settings.fontColor = "green";
settings.fontFamily = "courier";
settings.contextFont = settings.fontSize + "px " + settings.fontFamily;

// eslint cant find window. change these in initMatrix() in matrix.js
// const matrixWidth = window.innerWidth;
// const matrixHeight = window.innerHeight;

// Lower opacity means the characters will leave a longer
// tail and the background color will be lighter
settings.contextOpacity = 0.05;
settings.contextBackground = "rgba(0, 0, 0, " + settings.contextOpacity + ")";

// drop speed in milliseconds - lower is faster
settings.speed = 33;

// this adds an initial vertical position to each drop point.
// The value is multiplied by fontSize when rendered in makeItRain().
// This means that  1 = Initially all drops will start from the top
//                      at the same time
//                  someValueGreaterThan c.height = all drops start randomly
settings.initialDropValue = 1;

// used to determine whether a character drop should restart at the top.
// used as: if (Math.random() > chanceOfDropReset)
settings.chanceOfDropReset = 0.98;

// when the next data should be loaded
settings.updateFrequency = 1000 * 30; // 1 second * x seconds

module.exports = settings;
