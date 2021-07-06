import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar/sidebar'
import LoggedOut from './Account/loggedOut/loggedOut'
import LoggedIn from './Account/loggedIn/loggedIn'
import './styles/navbar.css'

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      name: ""
    }
    this.logoutHandler = this.logoutHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }
  logoutHandler(dataFromChild) {
    this.props.set(false);
    this.props.setUserId(0);
    this.setState({ loggedIn: false })

  }
  loginHandler(dataFromChild) {
    this.props.set(true);
    this.props.setUserId(dataFromChild.userId)
    this.setState({loggedIn:true, name:dataFromChild.username});
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Sidebar getUserId={this.props.getUserId()}/>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="brandname nav-link" id="BrandName" to="/"> Minum Chess </Link>
            </li>
          </ul>
          {this.state.loggedIn
            ?
            <LoggedIn name={this.state.name} action={this.logoutHandler} />
            :
            <LoggedOut action={this.loginHandler} />
          }
        </div>
      </nav>
    );
  }
}





