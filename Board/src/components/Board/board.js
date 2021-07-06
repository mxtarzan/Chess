import React from 'react'
import Row from './Row/row';
import './styles/board.css'
export default class Homepage extends React.Component {
  height = window.screen.height - 75
  constructor() {
    super();
    this.state = {
      board: [],
      userColor: null,
      yourPiece: null,
      thierPiece: null,
      turn: 0
    }
    //this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleThierPiece = this.handleThierPiece.bind(this);
    this.handleYourPiece = this.handleYourPiece.bind(this);
    this.getThierPiece = this.getThierPiece.bind(this);
    this.getYourPiece = this.getYourPiece.bind(this);
    this.getBoard = this.getBoard.bind(this);
  }

  componentDidMount() {
    if (this.props.getUserId() !== 0) {
      this.interval = setInterval(() => {
        fetch("http://localhost:9993/ChessAPI/getBoard/" + this.props.getUserId(), {
          method: 'GET',
          headers: {
            "Content-type": "application/json"
          }
        })

          .then(res => {
            if (res.status === 418) {
              this.continueGame = false;
              console.log("Game over")
              fetch("http://localhost:9991/UserAPI/winner/" + this.props.match.params.name, {
                method: 'GET',
                headers: {
                  "Content-type": "application/json"
                }
              })
            }
            else { console.log("not over") }
            return res.json()
          })
          .then(
            (result) => {
              this.setState({ board: result });
            },
            (error) => {
              alert("error in fetching board");
            }
          )
        fetch("http://localhost:9993/ChessAPI/getColor/" + this.props.getUserId(), {
          method: 'GET',
          headers: {
            "Content-type": "application/json"
          }
        })
          .then(res => res.text())
          .then(
            (result) => {
              this.setState({ userColor: result });
            }
          );
        fetch("http://localhost:9993/ChessAPI/getTurn/" + this.props.getUserId(), {
          method: 'GET',
          headers: {
            "Content-type": "application/json"
          }
        })
          .then(res => res.text())
          .then(
            (result) => {
              this.setState({ turn: result });
            }
          );
      }, 2000);

    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleYourPiece(piece) {
    if (piece.color === "White" && this.state.turn % 2 === 0) {
      this.setState({ yourPiece: piece });
    }
    else if (piece.color === "Black" && this.state.turn % 2 === 1) {
      this.setState({ yourPiece: piece });
    }
  }
  handleThierPiece(piece) {
    this.setState({ thierPiece: piece });
  }
  getYourPiece() {
    return this.state.yourPiece;
  }
  getThierPiece() {
    return this.state.thierPiece;
  }
  getBoard() {
    return this.state.board;
  }
  handleSubmit() {
    console.log("Your piece: " + this.state.yourPiece.row);
    console.log("Thier Piece: " + this.state.thierPiece.row);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: this.props.getUserId(),
        yourRow: this.state.yourPiece.row,
        yourCol: this.state.yourPiece.col,
        thierRow: this.state.thierPiece.row,
        thierCol: this.state.thierPiece.col
      })
    };
    this.setState({ yourPiece: null });
    this.setState({ thierPiece: null });
    fetch('http://localhost:9993/ChessAPI/chessMove', requestOptions)
      //.then(response => response.json())
      .then(data => this.setState({ Board: data }));

  }

  render() {
    let board = this.state.board;
    let chessboard = board.map((row) => <Row row={row} getBoard={this.getBoard} userColor={this.state.userColor} setYours={this.handleYourPiece} setThiers={this.handleThierPiece} getYours={this.getYourPiece} getThiers={this.getThierPiece} />);
    let renderedButton = <></>;
    if (this.state.thierPiece != null && this.state.yourPiece != null) {
      renderedButton = <button onClick={this.handleSubmit}>Submit Move</button>
    }
    let playerTurn = " turn to move.";
    if (this.state.turn % 2 === 0) playerTurn = "White's" + playerTurn;
    else playerTurn = "Black's" + playerTurn;
    let turn;
    if (this.props.getUserId() !== 0) turn = <h2 className="center">{playerTurn}</h2>
    return (<React.Fragment>
      {turn}
      <table className="center">{chessboard}</table>
      {renderedButton}
    </React.Fragment >);
  }
}
