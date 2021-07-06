import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faChess } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './styles/loggedOut.css'

export default class LoggedOut extends React.Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            name: "",
            password: "",
        }
        this.handleClick = this.handleClick.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.submitFun = this.submitFun.bind(this);
    }
    handleClick() {
        this.setState({ clicked: true })
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }
    handleUsernameChange(e) {
        this.setState({ name: e.target.value })
    }
    handleLogin() {
        fetch('http://localhost:9991/UserAPI/validUser', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                username: this.state.name,
                password: this.state.password
            })
        })
        .then(response=>response.json())
        .then(response =>{ 
            this.props.action(response)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          alert("Invalid Username And Password");
        })

    }
    submitFun(e) {
        e.preventDefault();
        if (this.state.name === "" || this.state.password === "") {
            alert("Invalid Input")
        }

        else {
            this.handleLogin()
        }
    }

    render() {
        return (
            <ul className="navbar-nav">
                {this.state.clicked
                    ?
                    <li>
                        <form className="nav-item" onSubmit={this.submitFun}>
                            <div className="row">
                                <div className="col-5 nav-link">
                                    <input type="text" className="form-control" placeholder="Username" value={this.state.name} onChange={this.handleUsernameChange} />
                                </div>
                                <div className="col-5 nav-link">
                                    <input type="text" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                                </div>
                                <div className="col-2 nav-link active">
                                    <button className="loginbtn">
                                        <FontAwesomeIcon size="2x" className="vertical" icon={faChess} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </li>
                    :
                    <li className="nav-item active nav-link fontnav" onClick={this.handleClick}>
                        <FontAwesomeIcon size="2x" className="vertical" icon={faChess} />
                        <span className="fontnav"> Login</span>
                    </li>
                }
                <li className="nav-item active">
                    <Link className="nav-link fontnav" to="/signup">
                        <FontAwesomeIcon size="2x" className="vertical" icon={faAddressCard} />
                        <span className="fontnav">  Sign Up</span>
                    </Link>
                </li>
            </ul>
        );
    }
}

