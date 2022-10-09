import React, {Component, useState, useEffect} from 'react';
import Header from '../../../src/common/header/Header';
import './Home.css';
import TopPortion from '../../screens/home/TopPortion';
import moviesData from '../../common/moviesData';
import {BottomPortion} from '../home/MovieFilter';
import Details from '../../screens/details/Details';


class Home extends Component{
   
    constructor(props){
        super(props);
    }
    render(){   
        return (
            <div>
               <Header/> 
                <div id="header2">
                    <span >Upcoming Movies</span>
                </div>
                <div>
                        <TopPortion moviesData={moviesData}></TopPortion>
                </div>
                <div className='flex-containter'>
                    <BottomPortion ></BottomPortion>
                </div>
            </div>
        )
    }      
}

export default Home;