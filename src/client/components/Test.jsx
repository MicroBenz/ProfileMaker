import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Test.scss';

@CSSModules(styles, { allowMultiple: true })
class Test extends Component {
    render() {
        return (
            <div>
                <button styleName="button is-primary"><i className="fa fa-plus" /> Button IS PRIMARY NA JA</button>
                <h1 styleName="title">TestOne againnn</h1>
            </div>
        );
    }
}

export default Test;
