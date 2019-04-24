import React, {Component} from 'react';
import axios from 'axios';

import Movie from '../Movie/Movie';
import classes from './Movies.module.css';

class Movies extends Component {
    state = {
        movies: []
    }

    componentDidMount() {
        axios.get('/movies')
            .then(res => {
                const movies = res.data;
                this.setState({movies: movies});
            });
    }

    render() {
        console.log(this.state.movies)
        return(
            <div className={classes.Movie_container}>
                {
                    this.state.movies.map((movie, index) =>
                        <Movie key={index} title={movie.title} release={movie.release_date.slice(0,10)} description={movie.description}/>)
                }   
            </div>
        );
    }
}

export default Movies;