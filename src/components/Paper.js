import React,{Component} from 'react';
import './style/Paper.css';

import user from './image/user.svg';
class Paper extends Component{
    render(){
        return (
            <div className="Paper">
                <div className="new-paper">
                    <img src={user} alt="Newpaper - Instagram" />
                    <span>tranqne_0708</span>
                </div>
                <div className="new-paper">
                    <img src={user} alt="Newpaper - Instagram" />
                    <span>tranqne_0708</span>
                </div>
                <div className="new-paper">
                    <img src={user} alt="Newpaper - Instagram" />
                    <span>tranqne_0708</span>
                </div>
                <div className="new-paper">
                    <img src={user} alt="Newpaper - Instagram" />
                    <span>tranqne_0708</span>
                </div>
                <div className="new-paper">
                    <img src={user} alt="Newpaper - Instagram" />
                    <span>tranqne_0708</span>
                </div>
            </div>
        )
    }
}


export default Paper;