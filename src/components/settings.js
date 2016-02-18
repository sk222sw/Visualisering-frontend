import React, {Component} from 'react';

export default class Settings extends Component {
  saveSettings() {

  }
  render() {
    const routes = this.props.routes.filter(r => r.path !== 'settings'); //remove current settings path from array

    // console.log(routes);

    return (
      <div>
        <span>
          {routes.map(route => <label><input key={route.path + Math.random()} type="checkbox" id={route.path + '_checkbox'} />{route.path}</label>)}
        </span>
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