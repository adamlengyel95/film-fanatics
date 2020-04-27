import { SEARCH_MOVIES, FETCH_CARDS } from './types';
import axios from 'axios';

export const fetchMovies = () => dispatch => {
    axios.get('/movies')
        .then((res) => {
            const movies = res.data.map((movie) => {
                return { id: movie.id, title: movie.title, imageName: movie.imageName }
            })
            dispatch({
                type: FETCH_CARDS,
                payload: movies
            })
        }).catch((err) => console.error('Error occured during fetching movies', err))
}

export const fetchDirectors = () => dispatch => {
    axios.get(`/artists/directors`)
        .then((res) => {
            const directors = res.data.map((director) => {
                return { id: director.id, title: director.name, imageName: director.profilePicture }
            })
            dispatch({
                type: FETCH_CARDS,
                payload: directors
            })
        }).catch((err) => console.error('Error occured during fetching directors', err))
}

export const fetchActors = () => dispatch => {
    axios.get(`/artists/actors`)
        .then((res) => {
            const actors = res.data.map((actor) => {
                return { id: actor.id, title: actor.name, imageName: actor.profilePicture }
            })
            dispatch({
                type: FETCH_CARDS,
                payload: actors
            })
        }).catch((err) => console.error('Error occured during fetching actors', err))
}

export const searchMovies = title => dispatch => {
    axios.get('/movies/search', {
        params:
            { title: title }
    }).then(res => {
        const movies = res.data;
        dispatch({
            type: SEARCH_MOVIES,
            payload: movies
        })
    })
}