import React,{Component} from 'react';

import { Redirect} from "react-router-dom";
import Header from '../Header';
import Paper from '../Paper';
import Post from '../Post';

class Index extends Component {
  constructor(){  
    super();
    const token = localStorage.getItem('username');
    let isLogin = true;
    if(token === null){
      isLogin = false
    } 
    this.state={
      posts:[
        {
          userName:"quyenc14132",
          isHeart : true,
          comment :[]
        },
        {
          userName:"tien14132",
          isHeart : false,
          comment :[]
        },
        {
          userName:"quan14132",
          isHeart : true,
          comment :[]
        }
      ],
      isLogin:isLogin,
      value:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
      this.setState({
          value: event.target.value
      })
  }

  handleSubmit(item) {
    return (event) => {
      event.preventDefault();
      const value = this.state.value;
      // const posts = this.state.posts;
      const username = JSON.parse(localStorage.getItem('username'));
      const index = this.state.posts.indexOf(item);
      this.setState({
        posts : [
              ...this.state.posts.slice(0, index),
              {
                ...item,comment:[
                  ...this.state.posts[index].comment,
                    {
                      username :username,
                      cmt : value
                    }
                  ]
              },
              ...this.state.posts.slice( index + 1) 
          ],
          value: ''
      })
      console.log(this.state.posts);
    }
  }
  onClickItem(item){
    return () => {
        const isHeart = item.isHeart;
        const posts = this.state.posts;
        const index = this.state.posts.indexOf(item);
        this.setState({
          posts : [
                ...posts.slice(0, index),
                {
                    ...item,isHeart : !isHeart
                },
                ...posts.slice( index + 1) 
            ]
        })
    };
}
render(){
  if(this.state.isLogin === false){
    return <Redirect to="/login"/>
  }
    return (
      <div className="App">
        <Header />
        <Paper />
        {this.state.posts.map((post,index) => (
            <Post 
            key={index}
            user={post} 
            value={this.state.value}
            onClick={this.onClickItem(post)}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit(post)}
            />
        ))}
      </div>
    );
  }
}

export default Index;
