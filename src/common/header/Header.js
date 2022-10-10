import React from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';

export default function Header(props) {
    if (props.headerFor === "home") {
        return (
            <div className="header">
                <div>
                    <img src={logo} alt="logo-img" id="logo-img"/>
                </div>
                <div>
                    <Button variant="contained">LOGIN</Button>
                </div>
            </div>
        )
    }
    else if (props.headerFor === "detail") {
        return (
            <div className="header">
                <div>
                    <img src={logo} alt="logo-img" id="logo-img"/>
                </div>
                <div id="header-btn-div">
                    <Button variant="contained" color="primary" id="header-book-btn">BOOK SHOW</Button>
                    <Button variant="contained">LOGIN</Button>
                </div>
            </div>
        )
    }
    
}