import React, { Component } from 'react';
import Navbar from '../Navigation/Navbar/Navbar';
import Movies from '../Feed/Movies/Movies';

class Layout extends Component {

    render() {
        return(
            <div>
                <Navbar />
                <Movies />
            </div>
        );
    }
}

export default Layout;