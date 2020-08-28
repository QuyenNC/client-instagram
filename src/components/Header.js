import React,{Component} from 'react';

import './style/Header.css';
import logo from './image/logo.svg.png';
import compass from './image/compass.svg';
import heart from './image/heart.svg';
import internet from './image/internet.svg';
import send from './image/send.svg';
import user from './image/user.svg';
class Header extends Component{
    render(){
        return (
            <div className="Header">
                <div className="logo">
                    <img src={logo} alt="Logo - Instagram"/>
                </div>
                <div className="input">
                    <input type="text" name="search" placeholder="Search.." />
                </div>
                <div className="action-icon">   
                <a href="##">
                    <img src={internet} alt="Internet - Instagram"/>
                </a>
                <a href="##">
                    <img src={send} alt="Send - Instagram"/>
                </a>
                <a href="##">
                    <img src={compass} alt="Compass - Instagram"/>
                </a>
                <a href="##">
                    <img src={heart} alt="Heart - Instagram"/>
                </a>
                <a href="##">
                    <img src={user} alt="User - Instagram"/>
                </a>
                </div>
            </div>
        )
    }
}


export default Header;
