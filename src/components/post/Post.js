import React,{Component} from 'react';
import Moment from 'react-moment';
import 'antd/dist/antd.css';

import { Menu, Dropdown} from 'antd';
import '../style/Post.css';
import dropmenu from '../image/menu.svg';
import send from '../image/send.svg';
import heart from '../image/heart.svg';
import isHeart from '../image/isHeart.svg';
import comment from '../image/comment.svg';


class Post extends Component {
    render(){
        
        const username = JSON.parse(localStorage.getItem('token'));
        const { user , onClick , value , onChange , onSubmit , onDeleteCmt, onDeletePost } = this.props;
        const menu = (
            <Menu>
              <Menu.Item key="0">
                    <span onClick={onDeletePost}>Delete Post</span>
              </Menu.Item>
            </Menu>
          );
        let url;
        const userExit = user.like.filter((like) =>(
            like.username === username
        )); 
        if(userExit.length === 0){
            url = heart
        }
        else{
            url = isHeart
        }
        return (
            <div className="Post">
                <div className="head">
                    <div className="user">
                        <img src={user.avartarUser} alt="User - Instagram" />
                        <span>{user.username}</span>
                    </div>
                    <div className="menu">
                            {user.username === username ? 
                            <Dropdown overlay={menu} trigger={['click']}  placement="bottomRight">   
                                <img src={dropmenu} alt="Menu - Instagram" />
                            </Dropdown> : 
                            "" }
                    </div>
                </div>
                <div className="image-post">
                    <img src={user.imagePost} alt="Img - post" onClick={onClick} />
                </div>
                <div className="comment">
                    <div className="action">
                        <img src={url} alt="Tim - Instagram" onClick={onClick} />
                        <img src={comment} alt="Cmt - Instagram"/>
                        <img src={send} alt="Share - Instagram"/>
                    </div>
                    <div className="like">
                        <span>{user.like.length} likes</span>
                    </div>
                    <div className="title">
                        <h6>{user.username}</h6>
                        <p>{user.title}</p>
                    </div>
                    <div className="description">
                        <p>{user.desciption}</p>
                    </div>
                    {user.comment ? user.comment.map( (cmt,index) => 
                        <div className="comment-text" key={index}>
                            <h6>{cmt.username}</h6>
                            <p>{cmt.text}</p>
                            {username === cmt.username ? <span onClick={onDeleteCmt(cmt._id)}>Delete</span> : '' }
                        </div>
                    ) : ""}
                    <div className="time-post">
                        <p><Moment fromNow>{user.date}</Moment></p>
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