import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


import Login from './components/login/Login';
import Register from './components/register/Register';

import Index from './components/page/index';
class App extends Component {
render(){
    return (
      <div className="App">
        <Router>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Index />
              </Route>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
