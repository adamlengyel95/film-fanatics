import React, { Component } from 'react'
import Navbar from '../../Navigation/Navbar/Navbar'
import axios from 'axios';
import classes from './Actors.module.css'
import Actor from '../Actors/Actor'

export default class Actors extends Component {
    state = {
        actors: []
    }
    componentDidMount() {
        axios.get(`/artists/actors`)
            .then((res) => {
                this.setState({ actors: res.data })
            }).catch((err) => console.error('Error occured during fetching actors', err))
    }
    render() {
        return (
            <>
                <Navbar />
                <div className={classes.ActorsContainer}>
                    {
                        this.state.actors.map((actor) =>
                            <Actor key={actor.id} id={actor.id} name={actor.name} profilePicture={actor.profilePicture} />)
                    }
                </div>
            </>
        )
    }
}