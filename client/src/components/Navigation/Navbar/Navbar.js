import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return(
        <div className={classes.Navbar}>
            <div className={classes.Logo}>
                <a href="#home">Film Fanatics</a>
            </div>
            <div className={classes.Search_container}>
                <input type="text" placeholder="Film keresése.."></input>
                <button type="submit">Keresés</button>
            </div>
            <Link to="/login" className={classes.Login_button}>Bejelentkezés</Link>
        </div>
    );
};

export default Navbar;