import React,{Component, Fragment} from 'react';

import axios from 'axios';
import { Redirect} from "react-router-dom";
import Paper from '../Paper';
import Post from '../post/Post';
class NewFeed extends Component {
  constructor(){  
    super();
    const token = localStorage.getItem('token');
    let isLogin = true;
    if(token === null){
      isLogin = false
    } 
    this.state={
      posts:[],
      isLogin:isLogin,
      value:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCommentPost = this.handleSubmitCommentPost.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.onClickLikeItem = this.onClickLikeItem.bind(this);
  }
  componentDidMount(){
    const url = "/api/post";
    axios.get(url)
    .then(res => {
      this.setState({
        posts : res.data.susscess.posts
      })
    })
  }
  handleChange(event) {
      this.setState({
          value: event.target.value
      })
  }

  handleSubmitCommentPost(item) {
    return (event) => {
      const value = this.state.value;
      const posts = this.state.posts;
      const username = JSON.parse(localStorage.getItem('token'));
      const index = this.state.posts.indexOf(item);
      this.setState({
        posts : [
              ...this.state.posts.slice(0, index),
              {
                ...item,comment:[
                  ...posts[index].comment,
                    {
                      username ,
                      text : value
                    }
                  ]
              },
              ...this.state.posts.slice( index + 1) 
          ],
          value: ''
      })
      const url = `/api/post/${item._id}/comment`;
      axios.post(url,{username,text : value})
      .then(res => {
        console.log(res.data);
      })
      event.preventDefault();
    }
  }
  deletePost(post){
    return () => {
      const posts = this.state.posts;
      const index = posts.indexOf(post);
      posts.splice(index , 1);
      this.setState({
        posts :  posts,
          value: ''
      })
      const url = `/api/post/${post._id}/deletePost`;
      axios.post(url)
      .then(res => {
        console.log(res.data.susscess);
      })
    }
  }
  deleteComment(post){
    return (id) => {
      return () =>{
        const posts = this.state.posts;
        const indexPost = this.state.posts.indexOf(post);
        const cmtExit = posts[indexPost].comment.find((cmt) =>(
                            cmt._id === id
                        ));
        const indexCmtExit = posts[indexPost].comment.indexOf(cmtExit);
        posts[indexPost].comment.splice(indexCmtExit, 1);
        this.setState({
          posts : [
            ...this.state.posts.slice(0, indexPost),
            {
              ...post,comment:[...posts[indexPost].comment]
            },
            ...this.state.posts.slice( indexPost + 1) 
            ]
        })
      const url = `/api/post/${post._id}/deleteCmt`;
      axios.post(url,{_id:id})
      .then(res => {
        console.log(res.data.susscess);
      })
      }
    }

  }
  onClickLikeItem(item){
    return () => {
        const posts = this.state.posts;
        const index = this.state.posts.indexOf(item);
        const username = JSON.parse(localStorage.getItem('token'));
        const userExit = posts[index].like.find((like) =>(
                            like.username === username
                        ));
        if(!userExit){
          this.setState({
            posts : [
              ...this.state.posts.slice(0, index),
              {
                ...item,like:[...posts[index].like,{username} ]
              },
              ...this.state.posts.slice( index + 1) 
              ]
          })
        }else{
          const indexUserExit = posts[index].like.indexOf(userExit);
          posts[index].like.splice(indexUserExit, 1);
          this.setState({
            posts : [
              ...this.state.posts.slice(0, index),
              {
                ...item,like:[...posts[index].like]
              },
              ...this.state.posts.slice( index + 1) 
              ]
          })
        }
        const url = `/api/post/${item._id}/like`;
        axios.post(url,{username})
        .then(res => {
          console.log(res.data.susscess);
        })
    };
}
render(){
  if(this.state.isLogin === false){
    return <Redirect to="/login"/>
  }
    return (
        <Fragment>
          <Paper />
          {this.state.posts.map((post,index) => (
              <Post 
              key={index}
              user={post} 
              value={this.state.value}
              onClick={this.onClickLikeItem(post)}
              onChange={this.handleChange}
              onSubmit={this.handleSubmitCommentPost(post)}
              onDeleteCmt ={this.deleteComment(post)}
              onDeletePost = {this.deletePost(post)}
              />
          ))}
        </Fragment>
    );
  }
}

export default NewFeed;
