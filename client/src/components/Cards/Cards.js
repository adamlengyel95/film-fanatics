import React, { Component } from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import axios from 'axios';
import classes from './Cards.module.css'
import Card from './Card'

export default class Actors extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        console.log('this.props.location.pathname', this.props.location.pathname)
        if (this.props.location.pathname === '/actors') {
            axios.get(`/artists/actors`)
                .then((res) => {
                    const actors = res.data.map((actor) => {
                        return { id: actor.id, title: actor.name, imageName: actor.profilePicture }
                    })
                    console.log('actors', actors)
                    this.setState({ data: actors })
                }).catch((err) => console.error('Error occured during fetching actors', err))
        }
        else if (this.props.location.pathname === '/directors') {
            axios.get(`/artists/directors`)
                .then((res) => {
                    const directors = res.data.map((director) => {
                        return { id: director.id, title: director.name, imageName: director.profilePicture }
                    })
                    this.setState({ data: directors })
                }).catch((err) => console.error('Error occured during fetching directors', err))
        } else {
            axios.get('/movies')
                .then((res) => {
                    const movies = res.data.map((movie) => {
                        return { id: movie.id, title: movie.title, imageName: movie.imageName}
                    })
                    this.setState({ data: movies})
                }).catch((err) => console.error('Error occured during fetching movies', err))
        }
    }
    render() {
        return (
            <>
                <Navbar />
                <div className={classes.ActorsContainer}>
                    {
                        this.state.data.map((actor) =>
                            <Card key={actor.id} id={actor.id} title={actor.title} imageName={actor.imageName} />)
                    }
                </div>
            </>
        )
    }
}