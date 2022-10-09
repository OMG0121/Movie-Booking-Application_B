import React from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';

const Header = function(props) {
    return (
        <div className="header">
            <img src={logo} alt="logo-img" id="logo-img"/>
            <Button variant="contained" color="primary" id="btn">{props.btnName}</Button>
        </div>
    )
}

export default Header;