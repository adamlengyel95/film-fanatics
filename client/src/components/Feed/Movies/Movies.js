import React, {Component} from 'react';
import Movie from '../Movie/Movie';
import classes from './Movies.module.css';

class Movies extends Component {

    state = {
        movies: []
    }


    componentDidMount() {
        fetch('/movies')
            .then(res => res.json())
            .then(movies => this.setState({movies: movies}));

    }


    render() {
        return(
            <div className={classes.Movie_container}>
                {
                    this.state.movies.map(movie =>
                        <Movie key={movie.id} title={movie.title} release={movie.release_date.slice(0,10)} description={movie.description}/>)
                }
               
            </div>
        );
    }
}

export default Movies;