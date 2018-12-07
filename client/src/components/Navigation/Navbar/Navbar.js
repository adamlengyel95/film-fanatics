import React from 'react';
import classes from './Navbar.module.css';

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
            <a className={classes.Login_button} href="#news">Bejelentkezés</a>
        </div>
    );
};

export default Navbar;