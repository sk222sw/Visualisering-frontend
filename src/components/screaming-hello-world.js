import React, {Component} from 'react';

export default class ScreamingHelloWorld extends Component {
    render() {
        return (
            <div>
                <h1>Hej {this.props.name.toUpperCase()}!</h1>
            </div>
        );
    }
}