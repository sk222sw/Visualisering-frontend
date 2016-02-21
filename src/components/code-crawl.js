import React, {Component} from 'react';
import {hashHistory} from 'react-router';

export default class CodeCrawl extends Component {
  componentDidMount() {
    console.log(hashHistory);
  }
  clickHandler() {
    hashHistory.push('sphere');
  }
  render() {
    return (
      <div onClick={this.clickHandler.bind(this)}>
        <h1>{this.props.text}</h1>
      </div>
    );
  }
}
CodeCrawl.propTypes = {
  text: React.PropTypes.string
};
