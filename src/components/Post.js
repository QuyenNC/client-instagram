import React,{Component} from 'react';

import 'antd/dist/antd.css';
import { notification } from 'antd';

import './style/Post.css';
import userUrl from './image/user.svg';
import menu from './image/menu.svg';
import image from './image/avarta.jpg';
import send from './image/send.svg';
import heart from './image/heart.svg';
import isHeart from './image/isHeart.svg';
import comment from './image/comment.svg';


class Post extends Component {
    constructor(){
        super();
        this.openNotification = () => {
            const args = {
              message: 'Notification Title',
              description:
                'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
              duration: 0,
            };
            notification.open(args);
          };
    }
    render(){
        const { user , onClick , value , onChange , onSubmit } = this.props;
        let url;
        if(user.isHeart){
            url = isHeart
        }
        else{
            url = heart
        }
        
        return (
            <div className="Post">
                <div className="head">
                    <div className="user">
                        <img src={userUrl} alt="User - Instagram" />
                        <span>{user.userName}</span>
                    </div>
                    <div className="menu">
                        <a href="##">
                            <img src={menu} alt="Menu - Instagram" />
                        </a>
                    </div>
                </div>
                <div className="image-post">
                    <img src={image} alt="Img - post" onClick={onClick} />
                </div>
                <div className="comment">
                    <div className="action">
                        <img src={url} alt="Tim - Instagram"  onClick={this.openNotification} />
                        <img src={comment} alt="Cmt - Instagram"/>
                        <img src={send} alt="Share - Instagram"/>
                    </div>
                    <div className="like">
                        <span>1.215 likes</span>
                    </div>
                    <div className="title">
                        <h6>{user.userName}</h6>
                        <p>Home sweet home</p>
                    </div>
                        {user.comment.map( (cmt,index) => 
                            <div className="comment-text" key={index}>
                                <h6>{cmt.username}</h6>
                                <p>{cmt.cmt}</p>
                            </div>
                        )}
                    <div className="time-post">
                        <p>1 hour ago</p>
                    </div>
                    <div className="form-comment">
                        <form onSubmit={onSubmit}>
                            <textarea placeholder="Add a comment..." value={value} onChange={onChange}></textarea>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Post;