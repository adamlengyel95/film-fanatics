import React, { Component } from 'react'
import Rating from '@material-ui/lab/Rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

import Navbar from '../Navigation/Navbar/Navbar'
import classes from './MovieDetails.module.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class MovieDetails extends Component {
    state = {
        movie: {
            title: '',
            releaseDate: '',
            description: '',
            rating: 0,
            cover: '',
            directors: [],
            actors: [],
            comments: []
        },
        open: false,
        showRatingForbidden: false,
        showRatingError: false,
        snackbarMessage: '',
        commentText: ''
    }

    componentDidMount() {
        axios.get(`/movies/${this.props.match.params.id}`)
            .then((res) => {
                this.setState({ movie: res.data })
            }).catch((err) => console.error('Error occured during fetching movie details', err))
    }

    onRatingChange = (value) => {
        axios.post('/movies/rate', null, {
            params: {
                movieId: this.props.match.params.id,
                rating: value
            }
        }).then(() => {
            this.setState({ snackbarMessage: 'Sikeresen értékelte a filmet: ' + value })
            this.setState({ open: true })
        }).catch((err) => {
            if (err.response && err.response.status === 403) {
                this.setState({ snackbarMessage: 'Az értékeléshez be kell jelentkeznie'})
                this.setState({ showRatingForbidden: true })
            } else {
                this.setState({ snackbarMessage: 'Hiba történt az értékelés közben'})
                this.setState({ showRatingError: true })
            }
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    handleForbiddenClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ showRatingForbidden: false });
    };

    handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ showRatingError: false });
    };

    onCommentChange = (event) => {
        this.setState({commentText: event.target.value})
    }

    onSendComment = () => {
        axios.post('movies/comment', null, {params: {
            movieId: this.props.match.params.id,
            content: this.state.commentText
        }});
    }

    render() {
        console.log('route', this.props.match.params.id)
        let directors = '';
        let actors = '';
        this.state.movie.directors.forEach((director, index) => {
            if (index < this.state.movie.directors.length - 1) {
                directors += director.name + ', ';
            } else {
                directors += director.name;
            }
        });
        this.state.movie.actors.forEach((actor, index) => {
            if (index < this.state.movie.actors.length - 1) {
                actors += actor.name + ', ';
            } else {
                actors += actor.name;
            }
        })
        return (
            <>
                <Navbar />
                <div className={classes.MovieDetails}>
                    <div className={classes.MovieDetailsHeader}>
                        <div>
                            <img src={'../../../images/covers/' + this.state.movie.cover} className={classes.MovieCover} alt="cover" />
                        </div>
                        <div className={classes.MovieInfo}>
                            <h4 className={classes.MainTitle}>{this.state.movie.title}</h4>
                            <Rating
                                name="movieRating"
                                value={this.state.movie.rating}
                                precision={0.5}
                                onChange={(event, value) => this.onRatingChange(value)} />
                            <h5 className={classes.SubTitle}>Megjelenés: </h5>
                            <p className={classes.HeaderText}>{new Date(this.state.movie.releaseDate).toLocaleDateString()}</p>
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
                                return <div key={comment.id} className={classes.Comment}>
                                    <p className={classes.CommentAuthor}>{comment.displayName}</p>
                                    <p className={classes.CommentContent}>{comment.content}</p>
                                </div>
                            })
                        }
                    </div>
                    <h5 className={classes.UserCommentTitle}>Szólj hozzá</h5>
                    <textarea className={classes.NewComment} onChange={this.onCommentChange}></textarea>
                    <button className={classes.SendButton}>Küldés</button>
                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="success">
                            {this.state.snackbarMessage}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.showRatingForbidden} autoHideDuration={6000} onClose={this.handleForbiddenClose}>
                        <Alert onClose={this.handleForbiddenClose} severity="info">
                            {this.state.snackbarMessage}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.showRatingError} autoHideDuration={6000} onClose={this.handleErrorClose}>
                        <Alert onClose={this.handleErrorClose} severity="error">
                            {this.state.snackbarMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </>
        )
    }
}

export default MovieDetails
