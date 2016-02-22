// Found at: https://medium.com/about-codecademy/proptypes-validation-in-react-karma-683c7d52abe#.vxn0s7u9v
import {spyOn} from "expect";

export default {
  spy: null,
  watchConsole() {
    this.spy = spyOn(console, "error");
  },
  propWarnings() {
    const propWarnings = this.spy.calls.filter(c => {
      return (c.arguments &&
      c.arguments.length > 0 &&
      /(Invalid prop|Failed propType)/.test(c.arguments[0]));
    });

    return propWarnings;
  }
};
