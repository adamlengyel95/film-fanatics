import React, { Component } from 'react'
import Rating from '@material-ui/lab/Rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import Navbar from '../Navigation/Navbar/Navbar'
import classes from './MovieDetails.module.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class MovieDetails extends Component {
    state = {
        movie: {
            title: 'Bosszúállók',
            releaseDate: '2019. 01. 12.',
            description: 'A galaxis őrzőinek és a bosszúállóknak a háborúja Thanos-szal a végső szakaszába lép. A végső csata kimenetele mindörökre megváltoztathatja nemcsak a Föld, de az egész univerzum sorsát.',
            rating: 7.8,
            cover: 'images/covers/avatar.jpg',
            directors: ['Anthony Russo', 'Joe Russo'],
            actors: ['Robert Downey Jr.', 'Scarlett Johanson', 'Chris Evans', 'Mark Ruffalo', 'Samuel L. Jackson'],
            comments: [
                {
                    author: 'Filmkedvelő Béla',
                    content: 'Életem legjobb filmje!'
                },
                {
                    author: 'Kis Aladár',
                    content: 'Tetszett, bár egy fél órával lehetett volna rövidebb'
                },
                {
                    author: 'Tony Stark',
                    content: 'Nem rossz'
                }
            ]
        },
        open: false,
        snackbarMessage: ''
    }

    handleClick = (value) => {
        this.setState({snackbarMessage: 'Sikeresen értékelte a filmet: ' + value})
        this.setState({ open: true })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };

    render() {
        let directors = '';
        let actors = '';
        this.state.movie.directors.forEach((director, index) => {
            if (index < this.state.movie.directors.length - 1) {
                directors += director + ', ';
            } else {
                directors += director;
            }
        });
        this.state.movie.actors.forEach((actor, index) => {
            if (index < this.state.movie.actors.length - 1) {
                actors += actor + ', ';
            } else {
                actors += actor;
            }
        })
        return (
            <>
                <Navbar />
                <div className={classes.MovieDetails}>
                    <div className={classes.MovieDetailsHeader}>
                        <div>
                            <img src={this.state.movie.cover} className={classes.MovieCover} alt="cover" />
                        </div>
                        <div className={classes.MovieInfo}>
                            <h4 className={classes.MainTitle}>{this.state.movie.title}</h4>
                            <Rating
                                value={2}
                                precision={0.5}
                                onChange={(event, value) => this.handleClick(value)} />
                            <h5 className={classes.SubTitle}>Megjelenés: </h5>
                            <p className={classes.HeaderText}>{this.state.movie.releaseDate}</p>
                            <h5 className={classes.SubTitle}>Rendezte: </h5>
                            <p className={classes.HeaderText}>{directors}</p>
                            <h5 className={classes.SubTitle}>Szereplők: </h5>
                            <p className={classes.HeaderText}>{actors}</p>
                        </div>
                    </div>
                    <div className={classes.Description}>{this.state.movie.description}</div>
                    <h5 className={classes.CommentsTitle}>Hozzászólások</h5>
                    <div className={classes.Comments}>
                        {
                            this.state.movie.comments.map(comment => {
                                return <div className={classes.Comment}>
                                    <p className={classes.CommentAuthor}>{comment.author}</p>
                                    <p className={classes.CommentContent}>{comment.content}</p>
                                </div>
                            })
                        }
                    </div>
                    <h5 className={classes.UserCommentTitle}>Szólj hozzá</h5>
                    <textarea className={classes.NewComment}></textarea>
                    <button className={classes.SendButton}>Küldés</button>
                    <Button variant="outlined" onClick={this.handleClick}>
                        Open success snackbar
                    </Button>
                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="success">
                            {this.state.snackbarMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </>
        )
    }
}

export default MovieDetails
