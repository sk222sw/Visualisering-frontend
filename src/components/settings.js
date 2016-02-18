import React, {Component} from 'react';

export default class Settings extends Component {
  saveSettings() {

  }
  render() {
    const routes = this.props.routes.filter(r => r.path !== 'settings'); //remove current settings path from array

    console.log(routes);

    return (
      <div>
        <select name="component-selector" id="comp-sel">
          {routes.map(route => <option key={route.path + Math.random()} value={route.path}>{route.path}</option>)}
        </select>
        <label>Sekunder:</label>
        <input type="text"/>
        <button onClick={this.saveSettings.bind(this)}>Starta</button>

      </div>
    );
  }
}
Settings.propTypes = {
  settings: React.PropTypes.shape({
    time: React.PropTypes.number
  }).isRequired
};