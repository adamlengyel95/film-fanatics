import React, { Component } from 'react'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';

import Navbar from '../Navigation/Navbar/Navbar'
import classes from './ArtistDetails.module.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ArtistDetails extends Component {

    state = {
        artistDetails: {
            name: '',
            imageName: '',
            movies: []
        },
        showForbiddenMessage: false
    }

    componentWillMount() {
        this.fetchArtistDetails();
    }

    fetchArtistDetails = () => {
        axios.get(`/artists/${this.props.match.params.id}`)
            .then((res) => {
                this.setState({ artistDetails: res.data })
            }).catch((err) => console.error('Error occured during fetching artist details', err))
    }

    goToMovieDetailsPage = (movieId) => {
        this.props.history.push(`/movie/${movieId}`)
    }

    onFollowClicked = () => {
        axios.post('/artists/follows', null, {
            params: {
                artistId: this.state.artistDetails.id
            }
        }).then(() => {
            this.fetchArtistDetails();
        }).catch((err) => {
            if (err.response && err.response.status === 403) {
                this.setState({ snackbarMessage: 'Az értékeléshez be kell jelentkeznie' })
                this.setState({ showForbiddenMessage: true })
            } else {
                this.setState({ snackbarMessage: 'Hiba történt az értékelés közben' })
                this.setState({ showErrorMessage: true })
            }
        })
    }

    onStopFollowClicked = () => {
        axios.delete('/artists/follow', {
            params: {
                artistId: this.state.artistDetails.id
            }
        }).then(() => {
            this.fetchArtistDetails()
        })
    }

    handleForbiddenClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ showForbiddenMessage: false });
    };

    handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ showErrorMessage: false });
    };

    render() {
        const followButton = this.state.artistDetails.isFollowed ?
            <button className={`${classes.FollowButton} ${classes.StopFollow}`} onClick={this.onStopFollowClicked}>Követés leállítása</button> :
            <button className={classes.FollowButton} onClick={this.onFollowClicked}>Követés</button>
        return (
            <>
                <Navbar />
                <div className={classes.ArtistDetailsContainer}>
                    <div className={classes.ArtistDetailsHeader}>
                        <div>
                            <img src={'../../../images/artist-pictures/' + this.state.artistDetails.imageName} className={classes.ProfilePicture} alt="cover" />
                        </div>
                        <div className={classes.ArtistInfo}>
                            <h4 className={classes.ActorName}>{this.state.artistDetails.name}</h4>
                            <p><span className={classes.ArtistInfoTitle}>Született:</span> 1978. 04. 22.</p>
                            <p><span className={classes.ArtistInfoTitle}>Születési hely:</span> USA, California</p>
                            <p><span className={classes.ArtistInfoTitle}>Magasság:</span> 183 cm</p>
                            {followButton}
                        </div>
                    </div>
                    <div>
                        <h4 className={classes.MoviesLabel}>Filmek</h4>
                        <div className={classes.Comments}>
                            {
                                this.state.artistDetails.movies.map(movie => {
                                    return <div key={movie.id} className={classes.MovieContainer} onClick={() => this.goToMovieDetailsPage(movie.id)}>
                                        <div className={classes.moveCoverContainer}>
                                            <img className={classes.MovieCover} src={`../../../images/covers/${movie.imageName}`} alt="cover" />
                                        </div>
                                        <div className={classes.MovieInfo}>
                                            <p className={classes.MovieTitle}>{movie.title} ({new Date(movie.releaseDate).getFullYear()})</p>
                                            <Rating
                                                name="movieRating"
                                                className={classes.Rating}
                                                value={movie.rating == null ? 0 : movie.rating}
                                                precision={0.5}
                                                readOnly
                                                onChange={(event, value) => this.onRatingChange(value)} />
                                            <p className={classes.RatingCount}>({movie.ratingCount})</p>
                                            <p className={classes.DirectorLabel}><span className={classes.ArtistInfoTitle}>Rendezte:</span> {movie.directors}</p>

                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.showForbiddenMessage} autoHideDuration={6000} onClose={this.handleForbiddenClose}>
                    <Alert onClose={this.handleForbiddenClose} severity="info">
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.showErrorMessage} autoHideDuration={6000} onClose={this.handleErrorClose}>
                    <Alert onClose={this.handleErrorClose} severity="error">
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}

export default withRouter(ArtistDetails);
