import React, { Component } from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import { fetchMovies, fetchDirectors, fetchActors, fetchMoviesByGenre, fetchMoviesByDecade, fetchMoviesByTitle, clearCards } from '../../actions/cardActions'
import { connect } from 'react-redux';
import classes from './Cards.module.css'
import Card from './Card'

class Cards extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        if (this.props.location.pathname === '/actors') {
            this.props.fetchActors();
        } else if (this.props.location.pathname === '/directors') {
            this.props.fetchDirectors();
        } else if (this.props.location.pathname === '/movies') {
            if (this.props.location.state && this.props.location.state.genreId) {
                this.props.fetchMoviesByGenre(this.props.location.state.genreId);
            } else if (this.props.location.state && this.props.location.state.decade) {
                this.props.fetchMoviesByDecade(this.props.location.state.decade);
            } else if (this.props.location.state && this.props.location.state.searchInput) {
                console.log('fetch movies by title')
                this.props.fetchMoviesByTitle(this.props.location.state.searchInput)
            } else {
                this.props.fetchMovies();
            }
        }
    }

    componentWillUnmount() {
        console.log('Leaving cards...')
        this.props.clearCards()
    }


    render() {
        return (
            <>
                <Navbar />
                <div className={classes.ActorsContainer}>
                    {
                        this.props.data.map((actor) =>
                            <Card key={actor.id} id={actor.id} title={actor.title} imageName={actor.imageName} />)
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    data: state.cards.data
});

export default connect(mapStateToProps, { fetchMovies, fetchDirectors, fetchActors, fetchMoviesByGenre, fetchMoviesByDecade, fetchMoviesByTitle, clearCards })(Cards);