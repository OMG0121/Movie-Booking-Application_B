import React, { Component } from 'react';
import Header from '../../common/header/Header';
import { Button, ImageList, ImageListItem, ImageListItemBar, Typography } from '@material-ui/core';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';
import YouTube from 'react-youtube';
import './Details.css';
import moviesData from '../../assets/moviesData'

class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: "",
            value: 0
        }
        moviesData.forEach((movie) => {
            if (movie.id === (window.location.pathname).slice(9,11)) {
                this.state.movie = movie;
            }
        })

        let isEqualPresent = false;
        let movie_url = ""
        for(let i=0; i<this.state.movie.trailer_url.length; i++) {
            if (this.state.movie.trailer_url.charAt(i-1) === "=") {
                isEqualPresent = true;
            }
            if (isEqualPresent) {
                movie_url = movie_url + this.state.movie.trailer_url.charAt(i)
            }
        }
        this.state.movie.trailer_url = movie_url;
    };
    backButtonHandler= () => {
        window.location = window.location.origin;
    }
    escapeLessThan = "<";

    opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
          origin: "http://localhost:3000/details/"
        },
    };

    videoOnReady(event) {
        event.target.pauseVideo();
    }

    render() {
        return (
            <div>
                <Header btnName="BOOK SHOW"/>

                <div>
                    <Button onClick={this.backButtonHandler} id="back-btn">
                        <Typography variant="button">
                            {this.escapeLessThan} Back to Home
                        </Typography>
                    </Button>
                </div>

                <div className="details-container">
                    <div className="details-left">
                        <img src={this.state.movie.poster_url} alt={this.state.movie.title} id="detail-movie-poster"/>
                    </div>

                    <div className="details-middle">
                        <Typography variant="h2">
                            {this.state.movie.title}
                        </Typography>   

                        <Typography variant="body1">
                            <strong>Genre: </strong>
                            {
                                this.state.movie.genres.map((genre) => {
                                    let index = this.state.movie.genres.indexOf(genre);
                                    if (index < this.state.movie.genres.length-1) {
                                        return genre +", ";
                                    }
                                    else {
                                        return genre;
                                    }
                                })
                            }
                        </Typography>

                        <Typography variant="body1">
                            <strong>Duration: </strong> {this.state.movie.duration}
                        </Typography>

                        <Typography variant="body1">
                            <strong>Release Date: </strong> 
                            {
                                new Date(this.state.movie.release_date).toUTCString().substring(0,16)
                            }
                        </Typography>

                        <Typography variant="body1">
                            <strong>Rating: </strong> {this.state.movie.critics_rating}
                        </Typography>

                        <Typography variant="body1" id="details-trailer-text">
                            <strong>Plot: </strong> <a href={this.state.movie.wiki_url}>Wiki Link</a> {this.state.movie.storyline}
                        </Typography>

                        <Typography variant="body1" id="details-trailer-text">
                            <strong>Trailer: </strong>
                        </Typography>

                        <YouTube videoId={this.state.movie.trailer_url} opts={this.opts} onReady={this.videoOnReady} />;

                    </div>

                    <div className="details-right">
                        <Typography variant="body1">
                            <strong>Rate this Movie: </strong>
                        </Typography>

                        <Typography variant="body1">
                            <Rating
                                name="simple-controlled"
                                value={this.state.value}
                                onChange={(event, newValue) => {
                                    const newState = this.state;
                                    this.setState({...newState, value: newValue});
                                }}
                                emptyIcon={
                                    <StarBorderIcon />
                                  }
                            />
                        </Typography>

                        <Typography variant="body1" id="artist-topography">
                            <strong>Artists: </strong>
                        </Typography>

                        <ImageList cols={2}>
                            {this.state.movie.artists.map(artist => (
                            <ImageListItem key={artist.id}>
                                <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                <ImageListItemBar
                                title={artist.first_name + " " + artist.last_name}
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </div>

                </div>
            </div>

        );
    }
}

export default Details;