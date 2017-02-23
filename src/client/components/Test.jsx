import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Test.scss';

@CSSModules(styles)
class Test extends Component {
    render() {
        return <h1 styleName="title">TestOne againnn</h1>;
    }
}

export default Test;
