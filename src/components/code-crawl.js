import React, {Component} from 'react';

export default class CodeCrawl extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.text}</h1>
            </div>
        );
    }
}
CodeCrawl.propTypes = {
    text: React.PropTypes.string
};