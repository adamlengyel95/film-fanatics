import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

export class Profile extends Component {
    state = {
        user: {},
        triggerRedirect: false
    }

    componentDidMount() {
        axios.get('/profile')
            .then(res => {
                if(res.data.authError) {
                    this.setState({triggerRedirect: true}); 
                } else {
                    const profile = res.data;
                    this.setState({user: profile});
                } 
            })
            .catch(err => console.warn(err));
    }

    render() {
        if(this.state.triggerRedirect) {
            return <Redirect from="*" to={{pathname: '/login'}} />;
        }
        if(this.state.user.display_name) {
            return (
                <div>
                    <h1>Profilom</h1>
                    <h3>{this.state.user.display_name}</h3>
                    <Link to="/">Vissza a főoldalra</Link>
                </div>
                )
        }
        else {
            return null;
        }
    }
}

export default Profile;
