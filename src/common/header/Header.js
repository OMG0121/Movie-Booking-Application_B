import React, { Component } from  'react';
import './Header.css';
import { ReactComponent as Logo} from '../../assets/logo.svg'

class Header extends Component{
    render(){
        return(
            <div className='header'>
                    <Logo className='logo'/>
            </div>
        )

    }
}

export default Header;