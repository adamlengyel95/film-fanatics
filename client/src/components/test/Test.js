import React, { Component } from 'react';
import styles from './Test.module.css';

class Test extends Component {

    constructor() {
        super();
        this.state = {
            testdata: []
        }
    }

    componentDidMount() {
        fetch('/test')
            .then(res => res.json())
            .then(data => this.setState({testdata: data}));
    }

    render() {
        return(
            <div className={styles.Container}>
            <ul>
                {this.state.testdata.map(data =>
                    <li key={data.title}>{data.content}</li>)}
            </ul>
            </div>
        );
    }
}


export default Test;