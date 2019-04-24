import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './Navbar.module.css';

class Navbar extends React.Component {

    onSignOutClick = () => {
        axios.get('http://localhost:5000/auth/logout',{withCredentials: true})
        .then(function (response) {
          console.log(response)

        })
        .catch(function (error) {
          console.log(error)
        });
    }

    render() {
        return(
            <div className={classes.Navbar}>
                <div className={classes.Logo}>
                    <a href="#home">Film Fanatics</a>
                </div>
                <div className={classes.Search_container}>
                    <input type="text" placeholder="Film keresése.."></input>
                    <button type="submit">Keresés</button>
                </div>
                <a className={classes.Login_button} href="http://localhost:5000/auth/logout">Kijelentkezés</a>
                <Link to="/login" className={classes.Login_button} onClick={this.onSignOutClick}>Bejelentkezés</Link>
            </div>
        );
    }
    
};

export default Navbar;