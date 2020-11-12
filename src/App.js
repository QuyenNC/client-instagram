import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


import Login from './components/login/Login';
import Register from './components/login/Register';
import Forgot from './components/login/Forgot';
import Profile from './components/profile/Profile';
import IndexRoute from './components/page/index';


import NewFeed from './components/NewFeed/NewFeed';
class App extends Component {
render(){
    return (
        <Router>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/forgot">
                <Forgot />
              </Route>
              <IndexRoute exact path="/" component={<NewFeed />} />
              <IndexRoute exact path="/profile" component={<Profile />} />
            </Switch>
        </Router>
    );
  }
}

export default App;
