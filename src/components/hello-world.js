import React, {Component} from 'react';

export default class HelloWorld extends Component {
  render() {
    return (
      <div>
        <h1>Hej {this.props.name}!</h1>
      </div>
    );
  }
}
