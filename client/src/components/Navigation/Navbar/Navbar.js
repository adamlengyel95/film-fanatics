import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { searchMovies } from '../../../actions/movieActions';
import constants from '../../../constants/constants';
import classes from './Navbar.module.css';

class Navbar extends React.Component {
    state = {
        isAuthenticated: false,
        actualUser: '',
        searchInput: ''
    }

    componentDidMount() {
        console.log('nav rendered')
        axios.get('/profile')
            .then(res => {
                if (res.data.user_id) {
                    this.setState({ isAuthenticated: true });
                    this.setState({ actualUser: res.data.display_name })
                }
            });
    }

    onSignOutClick = () => {
        console.log('signout')
        axios.get('/auth/logout', { withCredentials: true })
            .then(function (response) {
                window.location.href = constants.BASE_URL;
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    onSearchInputChange = (e) => {
        this.setState({ searchInput: e.target.value })
    }

    onSearch = () => {
        this.props.searchMovies(this.state.searchInput);
    }

    enterPressed = (event) => {
        if (event.which === 13) {
            this.onSearch();
        }
    }

    render() {
        if (!this.state.isAuthenticated) {

            return (
                <div className={classes.Navbar}>
                    <div className={classes.Logo}>
                        <a href={constants.BASE_URL}>Film Fanatics</a>
                    </div>
                    <div className={classes.Search_container}>
                        <input
                            type="text"
                            value={this.state.searchInput}
                            onChange={this.onSearchInputChange}
                            onKeyPress={this.enterPressed}
                            placeholder="Film keresése..">
                        </input>
                        <button type="submit" onClick={this.onSearch}>Keresés</button>
                        <div className={classes.autoCompleteList}></div>
                    </div>
                    <Link to="/login" className={classes.Login_button}>Bejelentkezés</Link>
                </div>
            );
        }
        else if (this.state.isAuthenticated) {
            return (
                <>
                    <div className={classes.Navbar}>
                        <div className={classes.Logo}>
                            <a href={constants.BASE_URL}>Film Fanatics</a>
                        </div>
                        <div className={classes.Search_container}>
                            <input type="text" value={this.state.searchInput} placeholder="Film keresése.."></input>
                            <button type="submit">Keresés</button>
                        </div>
                        <p className={classes.Login_button} onClick={this.onSignOutClick}>Kijelentkezés</p>
                    </div>
                    <div className={classes.UserContainer}>
                        <p className={classes.LoggedInAs}>Bejelentkezve: {this.state.actualUser}</p>
                    </div>
                </>
            );
        } else {
            return null;
        }
    }

};

export default connect(null, { searchMovies })(Navbar);