import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './Navbar.module.css';

class Navbar extends React.Component {
    state = {
        isAuthenticated: false,
        actualUser: ''
    }

    componentDidMount() {
        axios.get('/profile')
            .then(res => {
                if(res.data.user_id) {
                    this.setState({isAuthenticated: true});
                    this.setState({actualUser: res.data.display_name})
                }
            });
    }

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
        if(!this.state.isAuthenticated) {
            
            return(
                <div className={classes.Navbar}>
                    <div className={classes.Logo}>
                        <a href="#home">Film Fanatics</a>
                    </div>
                    <div className={classes.Search_container}>
                        <input type="text" placeholder="Film keresése.."></input>
                        <button type="submit">Keresés</button>
                    </div>
                    <Link to="/login" className={classes.Login_button} onClick={this.onSignOutClick}>Bejelentkezés</Link>
                </div>
            );
        }
        else if (this.state.isAuthenticated) {
            return(
                <>
                <div className={classes.Navbar}>
                    <div className={classes.Logo}>
                        <a href="#home">Film Fanatics</a>
                    </div>
                    <div className={classes.Search_container}>
                        <input type="text" placeholder="Film keresése.."></input>
                        <button type="submit">Keresés</button>
                    </div>
                    <a className={classes.Login_button} href="http://localhost:5000/auth/logout">Kijelentkezés</a>
                </div>
                <div className={classes.UserContainer}>
                    <a className={classes.LoggedInAs} href="#">Bejelentkezve: {this.state.actualUser}</a>
                </div>
                </>
            );
        } else {
            return null;
        }
    }
    
};

export default Navbar;