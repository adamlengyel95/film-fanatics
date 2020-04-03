import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../../actions/movieActions'

import Movie from '../Movie/Movie';
import classes from './Movies.module.css';

class Movies extends Component {

    componentDidMount() {
        this.props.fetchMovies();
    }
    
    render() {

        if (this.props.movies.length > 0) {
            return (
                <div className={classes.Movie_container}>
                    {
                        this.props.movies.map((movie, index) =>
                            <Movie key={index} id={movie.movie_id} title={movie.title} release={movie.release_date.slice(0, 10)} description={movie.description} cover={movie.movie_cover} />)
                    }
                </div>
            );
        } else {
            return (
                <div className={classes.Movie_container}>
                    <h4 className={classes.NoResult}>Nincs találat</h4>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    movies: state.movies.items
});

export default connect(mapStateToProps, { fetchMovies })(Movies)