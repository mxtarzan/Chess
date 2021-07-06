import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navbar    from './components/Navbar/navbar';
import SignUp    from './components/Navbar/Account/loggedOut/SignUp/signup';
import Profile   from './components/Navbar/Account/loggedIn/Profile/profile';
import Board     from './components/Board/board';
import Lobby     from './components/Lobby/lobby';

import './App.css';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn : false,
      userId: 0
    }
    this.getLoggedIn = this.getLoggedIn.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.setUserId = this.setUserId.bind(this);
  }
  getUserId(){
    return this.state.userId;
  }
  setUserId(id){
    console.log("id = " +id)
    this.setState({userId : id})
  }
  setLoggedIn(boolVal){
    this.setState({loggedIn : boolVal})
  }
  getLoggedIn(){
    return this.state.loggedIn;
  }
  render() {
    return (<React.Fragment>
      <Navbar set={this.setLoggedIn} setUserId={this.setUserId} getUserId={this.getUserId}/>
      <Switch>
        <Route path="/chess" render={props => <Board {...props} getUserId={this.getUserId} /> } />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile/:name" component={Profile} />
        <Route path="/lobby" render={props => <Lobby {...props} getUserId={this.getUserId}/>}/>
        <Redirect from="/" to="/home" />
      </Switch>
    </React.Fragment >
    );
  }
}

