import React, {Component} from 'react';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <h1>Change this to whatever, the sky is the limit!</h1>
      </div>
    );
  }
}
Settings.propTypes = {
  settings: React.PropTypes.shape({
    time: React.PropTypes.number
  }).isRequired
};