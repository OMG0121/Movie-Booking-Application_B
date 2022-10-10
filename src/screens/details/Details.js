import React from 'react';
import Header from '../../common/header/Header';
import { Button, ImageList, ImageListItem, ImageListItemBar, Typography } from '@material-ui/core';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';
import YouTube from 'react-youtube';
import './Details.css';
import moviesData from '../../assets/moviesData';
import { useState } from 'react';

export default function Details() {
    let movie;

    moviesData.forEach((newMovie) => {
        if (newMovie.id === (window.location.pathname).slice(9,11)) {
            movie = newMovie;
        }
    })

    let isEqualPresent = false;
    let movie_url = ""
    for(let i=0; i<movie.trailer_url.length; i++) {
        if (movie.trailer_url.charAt(i-1) === "=") {
            isEqualPresent = true;
        }
        if (isEqualPresent) {
            movie_url = movie_url + movie.trailer_url.charAt(i);
        }
    }
    movie.trailer_url = movie_url;

    const [value, setValue] = useState(0);

    let backButtonHandler= () => {
        window.location = window.location.origin;
    }

    let escapeLessThan = "<";

    let opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
          origin: "http://localhost:3000/details/"
        },
    };

    let videoOnReady= (event) => {
        event.target.pauseVideo();
    }

    return (
        <div>
            <Header headerFor="detail"/>

            <div>
                <Button onClick={backButtonHandler} id="back-btn">
                    <Typography variant="button">
                        {escapeLessThan} Back to Home
                    </Typography>
                </Button>
            </div>

            <div className="details-container">
                <div className="details-left">
                    <img src={movie.poster_url} alt={movie.title} id="detail-movie-poster"/>
                </div>

                <div className="details-middle">
                    <Typography variant="h2">
                        {movie.title}
                    </Typography>   

                    <Typography variant="body1">
                        <strong>Genre: </strong>
                        {
                            movie.genres.map((genre) => {
                                let index = movie.genres.indexOf(genre);
                                if (index < movie.genres.length-1) {
                                    return genre +", ";
                                }
                                else {
                                    return genre;
                                }
                            })
                        }
                    </Typography>

                    <Typography variant="body1">
                        <strong>Duration: </strong> {movie.duration}
                    </Typography>

                    <Typography variant="body1">
                        <strong>Release Date: </strong> 
                        {
                            new Date(movie.release_date).toUTCString().substring(0,16)
                        }
                    </Typography>

                    <Typography variant="body1">
                        <strong>Rating: </strong> {movie.critics_rating}
                    </Typography>

                    <Typography variant="body1" id="details-trailer-text">
                        <strong>Plot: </strong> <a href={movie.wiki_url}>Wiki Link</a> {movie.storyline}
                    </Typography>

                    <Typography variant="body1" id="details-trailer-text">
                        <strong>Trailer: </strong>
                    </Typography>

                    <YouTube videoId={movie.trailer_url} opts={opts} onReady={videoOnReady} />;

                </div>

                <div className="details-right">
                    <Typography variant="body1">
                        <strong>Rate this Movie: </strong>
                    </Typography>

                    <Typography variant="body1">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
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
                        {movie.artists.map(artist => (
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