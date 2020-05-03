import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Navbar from '../Navigation/Navbar/Navbar';
import MovieListItem from '../Movie/MovieListItem'
import classes from './Profile.module.css';

export class Profile extends Component {
    state = {
        user: {},
        triggerRedirect: false,
        ratedMovies: [],
        followedArtists: [],
        pageIsReady: false
    }

    componentDidMount() {
        this.fetchProfileDetails();
    }

    fetchProfileDetails() {
        axios.get('/profile/details')
            .then((res) => {
                this.setState({ followedArtists: res.data.followedArtists })
                this.setState({ ratedMovies: res.data.ratedMovies })
                this.setState({ pageIsReady: true })
            })
            .catch((err) => {
                this.setState({ triggerRedirect: true })
            });
    }

    onStopFollowClicked = (artistId) => {
        axios.delete('/artists/follow', {
            params: {
                artistId: artistId
            }
        }).then(() => {
            this.fetchProfileDetails()
        })
    }

    render() {
        if (this.state.triggerRedirect) {
            return <Redirect from="*" to={{ pathname: '/login' }} />;
        } else if (!this.state.pageIsReady) {
            return null;
        } else {
            return (
                <>
                    <Navbar />
                    <div className={classes.ProfileDetailsContainer}>
                        <div className={classes.RatedMoviesContainer}>
                            <h4 className={classes.MainTitle}>Értékelt filmek</h4>
                            {
                                this.state.ratedMovies.map((movie) => {
                                    return <MovieListItem
                                        id={movie.id}
                                        imageName={movie.imageName}
                                        title={movie.title}
                                        releaseDate={movie.releaseDate}
                                        rating={movie.rating}
                                        ratingCount={movie.ratingCount}
                                        directors={movie.directors}
                                        showRatingCount={false}
                                    />
                                })
                            }
                        </div>
                        <div className={classes.FollowedArtistsContainer}>
                            <h4 className={classes.MainTitle}>Követések</h4>
                            {
                                this.state.followedArtists.map((artist) => {
                                    return <div className={classes.ArtistContainer}>
                                        <div className={classes.ArtistImageContainer}>
                                            <img src={`../../../images/artist-pictures/${artist.imageName}`} className={classes.ArtistImage} alt="profile"></img>
                                        </div>
                                        <div className={classes.ActorInfo}>
                                            <h4 className={classes.ArtistName}>{artist.name}</h4>
                                            <p className={classes.StopFollowButton} onClick={() => this.onStopFollowClicked(artist.id)}>Követés leállítása</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </>
            );
        }
    }
}

export default Profile;
