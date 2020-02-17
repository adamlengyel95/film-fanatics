
import React from 'react';
import classes from './Movie.module.css';

const Movie = (props) => {
    const imgSrc = `images/covers/${props.cover}`
    return (
        <div className={classes.MovieBox}>
            <h2 className={classes.MovieTitle}>{props.title} (2010)</h2>
            <img src={imgSrc} className={classes.MovieCover} alt="cover" />
            <h4 className={classes.DescriptionTitle}>Leírás</h4>
            <div className={classes.Description}>{props.description}</div>
        </div>
    );
};

export default Movie;