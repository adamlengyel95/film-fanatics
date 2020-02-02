import React from 'react';
import classes from './Movie.module.css';

const Movie = (props) => {
    console.log('props', props)
    const imgSrc = `images/covers/${props.cover}`
    return(
        <div className={classes.MovieBox}>
            <h2>{props.title}</h2>
            <img src={imgSrc} alt="cover" />
            <h4>Megjelenés dátuma: {props.release}</h4>
            <h4>Leírás</h4>
            <p>{props.description}</p>
        </div>
    );
};

export default Movie;