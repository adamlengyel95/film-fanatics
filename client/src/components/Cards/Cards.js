import React, { Component } from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import { fetchMovies, fetchDirectors, fetchActors } from '../../actions/cardActions'
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
        }
        else if (this.props.location.pathname === '/directors') {
            this.props.fetchDirectors();
        } else {
            this.props.fetchMovies();
        }
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

export default connect(mapStateToProps, { fetchMovies, fetchDirectors, fetchActors })(Cards);