import React,{Component} from 'react';

import {Redirect} from "react-router-dom";
import Header from '../Header';

import '../style/Index.css';
class Index extends Component {
  constructor(){  
    super();
    const token = localStorage.getItem('token');
    let isLogin = true;
    if(token === null){
      isLogin = false
    } 
    this.state={
      isLogin:isLogin
    };
  }
 
render(){
  if(this.state.isLogin === false){
    return <Redirect to="/login"/>
  }
    return (
      <div className="App">
        <Header />
        <div className="container">
            {this.props.component}
        </div>
      </div>
    );
  }
}

export default Index;
