import React from 'react'

export default class Lobby extends React.Component {
  constructor() {
    super();
    this.state = {
      boards: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:9993/ChessAPI/getBoards", {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ boards: result });
          console.log(result);
        },
        (error) => {
          alert("error in profile");
        }
      )
  }
  handleSubmit(i) {
    fetch("http://localhost:9993/ChessAPI/joinRoom/" + i + "/" + this.props.getUserId(), {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    })
    this.props.history.replace('/chess');

  }
  render() {
    return (
      <ul>
        {this.state.boards.map(item => {
          return <li><div className="btn" onClick={()=>this.handleSubmit(item)}>Room {item}</div></li>;
        })}
      </ul>
    );
  }
}