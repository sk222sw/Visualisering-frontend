import sourceCode from "./source-code";

export default {
  components: {
    matrix: {
      data: [{
        id: 1,
        project: "linux",
        githubUser: "torvalds",
        fileName: "bug.h",
        contributors: ["rjarzmik", "bjdooks-ct", "arndb"],
        sourceCode
      }]
    },
    commits: null,
    positions: null
  },
  settings: {
    time: null
  }
};
