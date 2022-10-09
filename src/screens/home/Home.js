import React, { Component } from 'react';
import './Home.css';
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Card, CardActions, CardContent, Button, Typography, FormControl, InputLabel, Input, Select, MenuItem, Checkbox, ListItemText, TextField } from '@material-ui/core';
import Header from '../../common/header/Header';
import genres from '../../assets/genre';
import artists from '../../assets/artists';
import moviesData from '../../assets/moviesData';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};


class Home extends Component {
    constructor() {
        super();
        this.state = {
            moviedata : [],
            genreNameList : [],
            artistNameList : []
        }
        moviesData.forEach((movie) => {
            let newMovieData = {
                id: movie.id,
                poster_url: movie.poster_url,
                title: movie.title,
                release_date: "",
                wiki_url: movie.wiki_url
            }
            const date = new Date(movie.release_date);
            const newDate = date.toUTCString().substring(0,16);
            newMovieData.release_date = newDate;
            this.state.moviedata.push(newMovieData);
        })
    }

    handleChangeGenre = (e, genre) => {
        let check = e.target.checked;

        if (check === true) {
            const newState = this.state;
            newState.genreNameList.push(genre);
            this.setState(newState);
        }
        else {
            let newGenreName = this.state.genreNameList.filter(genrePresent => genrePresent!==genre);
            const newState = this.state;
            newState.genreNameList = newGenreName;
            this.setState(newState);
        }



    };

    handleChangeGenreDropDown = (e) => {
        const newState = this.state;
        newState.genreNameList = [];
        this.setState(newState);
    }


    handleChangeArtist = (e, artist) => {
        let check = e.target.checked;

        if (check === true) {
            const newState = this.state;
            newState.artistNameList.push(artist);
            this.setState(newState);
        }
        else {
            let newArtistName = this.state.artistNameList.filter(artistPresent => artistPresent!==artist);
            const newState = this.state;
            newState.artistNameList = newArtistName;
            this.setState(newState);
        }

    };

    handleChangeArtistDropDown = (e) => {
        const newState = this.state;
        newState.artistNameList = [];
        this.setState(newState);
    }

    buttonClick = () => {
        const origState = this.state;
        origState.moviedata = moviesData;
        this.setState(origState);

        let movieName = document.getElementById("movie-name-input").value;
        let releaseDateStart = document.getElementById("release-date-start").value;
        let releaseDateEnd = document.getElementById("release-date-end").value;
        let genreList = this.state.genreNameList;
        let artistList = this.state.artistNameList;

        let newMovieData = [];

        if (movieName !== "") {
            newMovieData = this.state.moviedata.filter((movie) => movie.title === movieName);
        }

        if (genreList.length!==0) {
            genreList.forEach((genre) => {
                for(let i=0; i<this.state.moviedata.length; i++) {
                    for(let j=0; j<this.state.moviedata[i].genres.length;j++) {
                        if(this.state.moviedata[i].genres[j] === genre) {
                            if (newMovieData.includes(this.state.moviedata[i]) === false) {
                                newMovieData.push(this.state.moviedata[i]);
                            }
                        }
                    }
                }
            })
        }

        if (artistList.length!==0) {
            artistList.forEach((artist)=> {
                for(let i=0; i<this.state.moviedata.length; i++) {
                    for(let j=0; j<this.state.moviedata[i].artists.length;j++) {
                        if((this.state.moviedata[i].artists[j].first_name + " " + this.state.moviedata[i].artists[j].last_name) === artist) {
                            if (newMovieData.includes(this.state.moviedata[i]) === false) {
                                newMovieData.push(this.state.moviedata[i]);
                            }
                        }
                    }
                }
            })
        }

        if (releaseDateStart!=="" && releaseDateEnd!=="") {
            let releaseStart = new Date(releaseDateStart);
            let releaseEnd = new Date(releaseDateEnd);
            if (releaseStart.getTime() <= releaseEnd.getTime()) {
                for(let i=0; i<this.state.moviedata.length; i++) {
                    let releaseDate = new Date(this.state.moviedata[i].release_date);
                    if (releaseDate.getTime() >= releaseStart.getTime() && releaseDate.getTime() <= releaseEnd.getTime()) {
                        if (newMovieData.includes(this.state.moviedata[i]) === false) {
                            newMovieData.push(this.state.moviedata[i]);
                        }
                    }
                }
            }
        }
        else if (releaseDateStart!=="") {
            let releaseStart = new Date(releaseDateStart);
            for(let i=0; i<this.state.moviedata.length; i++) {
                let releaseDate = new Date(this.state.moviedata[i].release_date);
                if (releaseDate.getTime() >= releaseStart.getTime()) {
                    if (newMovieData.includes(this.state.moviedata[i]) === false) {
                        newMovieData.push(this.state.moviedata[i]);
                    }
                }
            }
        }
        else if (releaseDateEnd!=="") {
            let releaseEnd = new Date(releaseDateEnd);
            for(let i=0; i<this.state.moviedata.length; i++) {
                let releaseDate = new Date(this.state.moviedata[i].release_date);
                if (releaseDate.getTime() <= releaseEnd.getTime()) {
                    if (newMovieData.includes(this.state.moviedata[i]) === false) {
                        newMovieData.push(this.state.moviedata[i]);
                    }
                }
            }
        }

        newMovieData.forEach((movie) => {
            const date = new Date(movie.release_date);
            const newDate = date.toUTCString().substring(0,16);
            movie.release_date = newDate;
        })

        const newState = this.state;
        newState.moviedata = newMovieData;
        this.setState(newState);
    }
    imageListOnClick = (id) => {
        window.location = window.location.href + "details/" + id;
    }
    render() {
        return (
            <div>   
                <Header btnName="LOGIN"/>

                <div className="heading">
                    <span>Upcoming Movies</span>
                </div>

                <div className="upcoming-movie-list">
                    <ImageList sx={{ width: 500, height: 450 }} id="image-list" cols={5} rowHeight={250}>
                        {moviesData.map((movie) => (
                            <ImageListItem key={movie.id}>
                            <img
                                src={`${movie.poster_url}?w=248&fit=crop&auto=format`}
                                srcSet={`${movie.poster_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={movie.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={movie.title}
                                actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${movie.title}`}
                                >
                                </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                    </ImageList>
                </div>

                <div className="flex-container">

                    <div className="left">
                        <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={350} id="image-list-left">
                            {this.state.moviedata.map((movie) => (
                                <ImageListItem key={movie.id} className="left-item" 
                                onClick={() => {this.imageListOnClick(movie.id)}}
                                >
                                    {/* <Link to="/detail" className="detail-page-link"> */}
                                        <img
                                            src={`${movie.poster_url}?w=248&fit=crop&auto=format`}
                                            srcSet={`${movie.poster_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={movie.title}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            title={movie.title}
                                            subtitle={"Release Date: " + movie.release_date}
                                            actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${movie.title}`}
                                            >
                                            </IconButton>
                                            }
                                        />
                                    {/* </Link> */}
                                </ImageListItem>
                                ))}
                        </ImageList>
                    </div>

                    <div className="right">
                        <Card  style={{minWidth: 240, maxWidth: 240, margin: '16px'}}sx={{ minWidth: 240, maxWidth: 240 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
                                FIND MOVIES BY:
                                </Typography>

                                <FormControl fullWidth>
                                <InputLabel htmlFor="movie-name-input">Movie Name</InputLabel>
                                <Input id="movie-name-input" aria-describedby="my-helper-text" /> <br />
                                </FormControl>

                                <FormControl fullWidth>
                                <InputLabel id="genre-checkbox-label" 
                                onClick={this.handleChangeGenreDropDown}
                                >Genres</InputLabel>
                                <Select
                                    labelId="genre-checkbox-label"
                                    id="genre-checkbox"
                                    multiple
                                    value={this.state.genreNameList}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {genres.map((genre) => (
                                    <MenuItem key={genre.id} value={genre.name}>
                                        <Checkbox
                                        onChange={(e) => {this.handleChangeGenre(e, genre.name)}}
                                        />
                                        <ListItemText primary={genre.name} />
                                    </MenuItem>
                                    ))}
                                </Select>
                                </FormControl> <br/> <br/>

                                <FormControl fullWidth>
                                <InputLabel id="artist-checkbox-label" onClick={this.handleChangeArtistDropDown}>Artists</InputLabel>
                                <Select
                                    labelId="artist-checkbox-label"
                                    id="artist-checkbox"
                                    multiple
                                    value={this.state.artistNameList}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {artists.map((artist) => (
                                    <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                        <Checkbox
                                        onChange={(e) => {this.handleChangeArtist(e, artist.first_name + " " + artist.last_name)}}
                                        />
                                        <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                    </MenuItem>
                                    ))}
                                </Select>
                                </FormControl> <br/>

                                <FormControl fullWidth>
                                <InputLabel htmlFor="release-date-start">Release Date Start</InputLabel> <br/><br/>
                                <TextField id="release-date-start" variant="standard" type="date" shrink="true"/>
                                </FormControl> <br/>

                                <FormControl fullWidth>
                                <InputLabel htmlFor="release-date-end">Release Date End</InputLabel> <br/><br/>
                                <TextField id="release-date-end" variant="standard" type="date" shrink="true"/>
                                </FormControl>

                            </CardContent>
                            <CardActions>
                                <FormControl fullWidth>
                                    <Button variant="contained" color="primary" onClick={this.buttonClick}>APPLY</Button>
                                </FormControl>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;