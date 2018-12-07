import React from 'react';
import classes from './Movie.module.css';

const Movie = (props) => {
    return(
        <div className={classes.MovieBox}>
            <h2>{props.title}</h2>
            <h4>Megjelenés dátuma: {props.release}</h4>
            <h4>Leírás</h4>
            <p>{props.description}</p>
        </div>
    );
};

export default Movie;