import React from 'react'
import { Link } from 'react-router-dom'

export default class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            userId:0,
            username:"",
            password:"",
            email:"",
            wins:0
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        fetch("http://localhost:9991/UserAPI/getUser/"+this.props.match.params.name, {
          method: 'GET',
          headers: {
              "Content-type": "application/json"
          }
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState(result);
          },
          (error) => {
            alert("error in profile");
          }
        )
      }
    render() {
        return (
            <React.Fragment>
                <div className="middlecard card">
                    <div className="card-header centerize">
                        <span className="Accent">{this.props.match.params.name}</span>
                    </div>
                    <div className="card-body centerize">
                        <div className="form-group">
                            <span className="cardblack">Id:</span>
                            <span className="cardbr">{this.state.userId}</span>
                        </div>
                        <div className="form-group">
                            <span className="cardblack">email:</span>
                            <span className="cardbr">{this.state.email}</span>
                        </div>
                        <div className="form-group">
                            <span className="cardblack">Wins:</span>
                            <span className="cardbr">{this.state.wins}</span>
                        </div>
                        <div className="form-group">
                            <span className="cardblack">Win/Loss:</span>
                            <span className="cardbr">{this.state.wins/this.state.losses}</span>
                        </div>
                    </div>
                    <Link className="nav-link fontnav" to="/home">
                        Back
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}