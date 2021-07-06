import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faDoorOpen, faChess } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default class LoggedIn extends React.Component {
    render() {
        return (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link fontnav" to={"/profile/"+this.props.name}><FontAwesomeIcon size="2x" className="vertical" icon={faChess} /> <span className="fontnav"> {this.props.name} </span></Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link fontnav" to="/home" onClick={() => this.props.action({loggedIn:false, name:""})}>
                        <FontAwesomeIcon size="2x" className="vertical" icon={faDoorOpen} />
                        <span className="fontnav">Log Out</span>
                    </Link>
                </li>
            </ul>
        );
    }
}