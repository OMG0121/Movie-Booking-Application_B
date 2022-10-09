import React , {useState,useEffect }from 'react';
import './Details.css';
import HeaderDetails from './HeaderDetails';
import moviesData from '../../common/moviesData.js';
import LeftDetails from '../details/LeftDetails';
import MiddlePartDetails from '../details/MiddlePartDetails';
import RightDetails from '../details/RightDetails';
import {useParams} from 'react-router-dom';


function Details(){
    const params = useParams();

    let movieDetail;
    movieDetail = moviesData.filter(function(movie){
        return(movie.id === params.id)
})
    return(
        <div>
        <HeaderDetails />
            <div className="remaining">
                    <div className="leftDetails">
                        <LeftDetails moviesData = {movieDetail} />
                    </div>
                    <div className="middleDetails">
                        <MiddlePartDetails moviesData = {movieDetail} />
                    </div>
                    <div className="rightDetails">
                        <RightDetails moviesData = {movieDetail} />
                    </div>
            </div>
        </div>      
    )
}
export default Details;