import React, {Component} from "react";
import filter from "lodash/filter";

export default class Settings extends Component {
  saveSettings(e) {
    e.preventDefault();

    const pathsToVisit = filter(this.refs, r => r.type === "checkbox" && r.checked).map(r => r.name);
    const time = this.refs.seconds.value;
    const settings = {
      pathsToVisit,
      time
    };

    if (time !== "" && pathsToVisit.length !== 0) {
      this.props.saveAndStart(settings);
    }
  }
  render() {
    const routes = this.props.routes.filter(r => r.path !== "settings"); // remove current settings path from array

    // console.log(routes);

    return (
      <div className="settings-component">
        <form onSubmit={this.saveSettings.bind(this)} className="centered-div">
          <h3>Settings</h3>
          <strong>Select visualizations</strong>
          <span>
            {routes.map((route, i) => <label key={route.path + i}><input ref={route.path} name={route.path} type="checkbox" />{route.path}</label>)}
          </span>
          <label>Seconds spent on each:</label>
          <input type="number" ref="seconds" />
          <input type="submit" value="Start loop" />
        </form>
      </div>
    );
  }
}
Settings.propTypes = {
  settings: React.PropTypes.shape({
    time: React.PropTypes.number
  }).isRequired
};
