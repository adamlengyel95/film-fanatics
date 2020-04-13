import React, { Component } from 'react'
import classes from './Actor.module.css'

export default class Actor extends Component {
    render() {
        const imgSrc = `images/artist-pictures/${this.props.profilePicture}`
        return (
            <div className={classes.ActorContainer}>
                <img className={classes.ActorImage} src={imgSrc} alt="profile picure"></img>
                <p>{this.props.name}</p>
                <button className={classes.DetailsButton}>Adatlap</button>
            </div>
        )
    }
}
