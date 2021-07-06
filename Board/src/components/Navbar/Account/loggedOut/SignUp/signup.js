import React from 'react'

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: ""
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.submitFun = this.submitFun.bind(this);
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }
    handleUsernameChange(e) {
        this.setState({ username: e.target.value })
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value })
    }
    handleLogin() {
        fetch('http://localhost:9991/UserAPI/createUser', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result === true){
                        alert("signed up");

                    }
                    else{
                        alert("failed to sign up")
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("error");
                }
            )
            this.props.history.replace('/Home'); 

    }
    submitFun(e) {
        e.preventDefault();
        if (this.state.username === "" || this.state.password === "" || this.state.email === "") {
            alert("Invalid Input")
        }

        else {
            this.handleLogin()
        }
    }

    render() {
        return (<React.Fragment>
            <form className="nav-item" onSubmit={this.submitFun}>
                <div className="middlecard card">
                    <div className="card-header centerize">
                        <span className="Accent">L</span>
                        <span className="Normal">ogin </span>
                    </div>
                    <div className="card-body centerize">
                        <div className="form-group">
                            <p className="cardbr">Email Address:</p>
                            <input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                        </div>
                        <div className="form-group">
                            <p className="cardbr">Username:</p>
                            <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                        </div>
                        <div className="form-group">
                            <p className="cardbr">Password:</p>
                            <input type="text" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div>
                    </div>
                    <button className="nav-link fontnav color">
                        Sign Up
                    </button>
                </div>
            </form>
        </React.Fragment>
        );
    }
}

