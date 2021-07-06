import React from 'react'
import './styles/tile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons'
export default class Tile extends React.Component {
  constructor() {
    super();
    this.state = {
    }
    this.handlePieceClick = this.handlePieceClick.bind(this);
  }
  handlePieceClick(e) {
    const tile = this.props.tile;
    console.log(this.props.userColor);
    if (this.props.userColor === tile.color && tile.color !== null) {
      this.props.setYours(tile);
      this.props.setThiers(null);
      return;
    }
    else if (this.props.getYours() == null) {
      return;
    }
    //not clicking your piece, must be empty or thiers
    else if (this.props.userColor !== tile.color) {
      let yours = this.props.getYours();
      let board = this.props.getBoard();

      console.log("yours:col,row" + yours.col + " " + yours.row + " " + yours.type)
      console.log("thiers:col,row" + tile.col + " " + tile.row + " " + tile.type)

      if (yours.type === "Pawn" && tile.color !== this.props.userColor) {
        if (this.props.userColor === "White") {
          if (yours.row === 1 && yours.col === tile.col && ((tile.row === 2 && tile.type === null) || (tile.row === 3 && tile.type === null && board[yours.row+1][yours.col].type === null))) {
            this.props.setThiers(tile);
          }
          else if (yours.col === tile.col && yours.row > 1 && yours.row < 8 && yours.row + 1 === tile.row && tile.type === null) {
            this.props.setThiers(tile);
          }
          else if ((board[yours.row + 1][yours.col + 1] === tile && board[yours.row + 1][yours.col + 1].type !== "null") ||
            (board[yours.row + 1][yours.col - 1] === tile && board[yours.row + 1][yours.col - 1].type !== "null")) {
            this.props.setThiers(tile);
          }
        }
        else {
          if (yours.row === 6 && yours.col === tile.col && ((tile.row === 4 &&tile.type ===null) || (tile.row === 5 && tile.type === null && board[yours.row-1][yours.col].type ===null))) {
            this.props.setThiers(tile);
          }
          else if (yours.col === tile.col && yours.row >= 0 && yours.row < 6 && yours.row - 1 === tile.row && tile.type === null) {
            this.props.setThiers(tile);
          }
          else if ((board[yours.row - 1][yours.col + 1] === tile && board[yours.row - 1][yours.col + 1].type !== "null") ||
            (board[yours.row - 1][yours.col - 1] === tile && board[yours.row - 1][yours.col - 1].type !== "null")) {
            this.props.setThiers(tile);
          }

        }
      }

      else if (yours.type === "Knight" && tile.color !== this.props.userColor) {
        if ((tile.row === yours.row + 1 && tile.col === yours.col + 2) ||
          (tile.row === yours.row - 1 && tile.col === yours.col + 2) ||
          (tile.row === yours.row + 1 && tile.col === yours.col - 2) ||
          (tile.row === yours.row - 1 && tile.col === yours.col - 2) ||
          (tile.row === yours.row + 2 && tile.col === yours.col + 1) ||
          (tile.row === yours.row + 2 && tile.col === yours.col - 1) ||
          (tile.row === yours.row - 2 && tile.col === yours.col + 1) ||
          (tile.row === yours.row - 2 && tile.col === yours.col - 1)) {
          this.props.setThiers(tile);
        }
      }

      else if (yours.type === "Bishop" && tile.color !== this.props.userColor) {
        let valid = true;
        let rowStart = yours.row;
        let rowEnd = tile.row;
        let colStart = yours.col;
        let colEnd = tile.col;
        if (rowStart > rowEnd) {
          let temp = rowStart;
          rowStart = rowEnd;
          rowEnd = temp;
        }
        if (colStart > colEnd) {
          let temp = colStart;
          colStart = colEnd;
          colEnd = temp;
        }
        if ((rowStart - rowEnd) === (colStart - colEnd)) {
          //move to top left
          if (tile.row < yours.row && tile.col < yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row - x][yours.col - x].type !== null) valid = false;
            }
          }
          //move to top right
          else if (tile.row < yours.row && tile.col > yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row - x][yours.col + x].type !== null) valid = false;
            }
          }
          //move to bottem left
          else if (tile.row > yours.row && tile.col < yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row + x][yours.col - x].type !== null) valid = false;
            }
          }
          //move to bottem right
          else if (tile.row > yours.row && tile.col > yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row + x][yours.col + x].type !== null) valid = false;
            }
          }
          if (valid) this.props.setThiers(tile);
        }
      }

      else if (yours.type === "Rook" && tile.color !== this.props.userColor) {
        let valid = true;
        let rowStart = yours.row;
        let rowEnd = tile.row;
        let colStart = yours.col;
        let colEnd = tile.col;
        if (rowStart > rowEnd) {
          let temp = rowStart;
          rowStart = rowEnd;
          rowEnd = temp;
        }
        if (colStart > colEnd) {
          let temp = colStart;
          colStart = colEnd;
          colEnd = temp;
        }
        if (yours.row === tile.row && yours.col !== tile.col) {
          for (let x = colStart + 1; x < colEnd; x++) {
            console.log(board[yours.row][x].type)
            if (board[yours.row][x].type !== null) valid = false;
          }
          if (valid) this.props.setThiers(tile);
        }
        else if (yours.row !== tile.row && yours.col === tile.col) {
          for (let x = rowStart + 1; x < rowEnd; x++) {
            if (board[x][yours.col].type !== null) valid = false;
          }
          if (valid) this.props.setThiers(tile);
        }
      }

      else if (yours.type === "Queen" && tile.color !== this.props.userColor) {
        let validRook = true;
        let validBishop = true;
        let rowStart = yours.row;
        let rowEnd = tile.row;
        let colStart = yours.col;
        let colEnd = tile.col;

        if (rowStart > rowEnd) {
          let temp = rowStart;
          rowStart = rowEnd;
          rowEnd = temp;
        }
        if (colStart > colEnd) {
          let temp = colStart;
          colStart = colEnd;
          colEnd = temp;
        }
        //rook moves
        if (yours.row === tile.row && yours.col !== tile.col) {
          for (let x = colStart + 1; x < colEnd; x++) {
            console.log(board[yours.row][x].type)
            if (board[yours.row][x].type !== null) validRook = false;
          }
        }
        else if (yours.row !== tile.row && yours.col === tile.col) {
          for (let x = rowStart + 1; x < rowEnd; x++) {
            if (board[x][yours.col].type !== null) validRook = false;
          }
        }
        else {
          validRook = false;
        }
        //bishop moves
        if ((rowStart - rowEnd) === (colStart - colEnd)) {
          //move to top left
          if (tile.row < yours.row && tile.col < yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row - x][yours.col - x].type !== null) validBishop = false;
            }
          }
          //move to top right
          else if (tile.row < yours.row && tile.col > yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row - x][yours.col + x].type !== null) validBishop = false;
            }
          }
          //move to bottem left
          else if (tile.row > yours.row && tile.col < yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row + x][yours.col - x].type !== null) validBishop = false;
            }
          }
          //move to bottem right
          else if (tile.row > yours.row && tile.col > yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row + x][yours.col + x].type !== null) validBishop = false;
            }
          }
        }
        else {
          validBishop = false;
        }
        if (validRook || validBishop) this.props.setThiers(tile);
      }
      else if (yours.type === "King" && tile.color !== this.props.userColor) {
        if ((tile.row === yours.row && tile.col + 1 === yours.col) ||
          (tile.row === yours.row && tile.col - 1 === yours.col) ||
          (tile.row + 1 === yours.row && tile.col === yours.col) ||
          (tile.row - 1 === yours.row && tile.col === yours.col) ||
          (tile.row - 1 === yours.row && tile.col - 1 === yours.col) ||
          (tile.row - 1 === yours.row && tile.col + 1 === yours.col) ||
          (tile.row + 1 === yours.row && tile.col - 1 === yours.col) ||
          (tile.row + 1 === yours.row && tile.col + 1 === yours.col)) {
          this.props.setThiers(tile);
        }

      }
    }
  }

  render() {
    const tile = this.props.tile;
    //Special thanks to Korakot for the idea 
    let style = "";
    if (this.props.getYours() != null) {
      let yours = this.props.getYours();
      let board = this.props.getBoard();

      if (yours.type === "Pawn" && tile.color !== this.props.userColor) {
        if (this.props.userColor === "White") {
          if (yours.row === 1 && yours.col === tile.col && ((tile.row === 2 && tile.type === null) || (tile.row === 3 && tile.type === null && board[yours.row+1][yours.col].type === null))) {
            style = " validMove";
          }
          else if (yours.col === tile.col && yours.row > 1 && yours.row < 8 && yours.row + 1 === tile.row && tile.type ===null) {
            style = " validMove";
          }
          else if ((board[yours.row + 1][yours.col + 1] === tile && board[yours.row + 1][yours.col + 1].type !== "null") ||
            (board[yours.row + 1][yours.col - 1] === tile && board[yours.row + 1][yours.col - 1].type !== "null")) {
            style = " validMove";
          }
        }
        else {
          if (yours.row === 6 && yours.col === tile.col && ((tile.row === 4 &&tile.type ===null) || (tile.row === 5 && tile.type === null && board[yours.row-1][yours.col].type ===null))) {
            style = " validMove";
          }
          else if (yours.col === tile.col && yours.row >= 0 && yours.row < 6 && yours.row - 1 === tile.row && tile.type ===null) {
            style = " validMove";
          }
          else if ((board[yours.row - 1][yours.col + 1] === tile && board[yours.row - 1][yours.col + 1].type !== "null") ||
            (board[yours.row - 1][yours.col - 1] === tile && board[yours.row - 1][yours.col - 1].type !== "null")) {
            style = " validMove";
          }
        }
      }

      else if (yours.type === "Knight" && tile.color !== this.props.userColor) {
        if ((tile.row === yours.row + 1 && tile.col === yours.col + 2) ||
          (tile.row === yours.row - 1 && tile.col === yours.col + 2) ||
          (tile.row === yours.row + 1 && tile.col === yours.col - 2) ||
          (tile.row === yours.row - 1 && tile.col === yours.col - 2) ||
          (tile.row === yours.row + 2 && tile.col === yours.col + 1) ||
          (tile.row === yours.row + 2 && tile.col === yours.col - 1) ||
          (tile.row === yours.row - 2 && tile.col === yours.col + 1) ||
          (tile.row === yours.row - 2 && tile.col === yours.col - 1)) {
          style = " validMove";
        }
      }

      else if (yours.type === "Bishop" && tile.color !== this.props.userColor) {
        let valid = true;
        let rowStart = yours.row;
        let rowEnd = tile.row;
        let colStart = yours.col;
        let colEnd = tile.col;
        if (rowStart > rowEnd) {
          let temp = rowStart;
          rowStart = rowEnd;
          rowEnd = temp;
        }
        if (colStart > colEnd) {
          let temp = colStart;
          colStart = colEnd;
          colEnd = temp;
        }
        if ((rowStart - rowEnd) === (colStart - colEnd)) {
          //move to top left
          if (tile.row < yours.row && tile.col < yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row - x][yours.col - x].type !== null) valid = false;
            }
          }
          //move to top right
          else if (tile.row < yours.row && tile.col > yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row - x][yours.col + x].type !== null) valid = false;
            }
          }
          //move to bottem left
          else if (tile.row > yours.row && tile.col < yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row + x][yours.col - x].type !== null) valid = false;
            }
          }
          //move to bottem right
          else if (tile.row > yours.row && tile.col > yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row + x][yours.col + x].type !== null) valid = false;
            }
          }
          if (valid) {
            style = " validMove";
          }
        }
      }

      else if (yours.type === "Rook" && tile.color !== this.props.userColor) {
        let valid = true;
        let rowStart = yours.row;
        let rowEnd = tile.row;
        let colStart = yours.col;
        let colEnd = tile.col;
        if (rowStart > rowEnd) {
          let temp = rowStart;
          rowStart = rowEnd;
          rowEnd = temp;
        }
        if (colStart > colEnd) {
          let temp = colStart;
          colStart = colEnd;
          colEnd = temp;
        }
        if (yours.row === tile.row && yours.col !== tile.col) {
          for (let x = colStart + 1; x < colEnd; x++) {
            console.log(board[yours.row][x].type)
            if (board[yours.row][x].type !== null) { console.log("invalid"); valid = false; }
          }
          if (valid) {
            style = " validMove";
          }
        }
        else if (yours.row !== tile.row && yours.col === tile.col) {
          for (let x = rowStart + 1; x < rowEnd; x++) {
            if (board[x][yours.col].type !== null) valid = false;
          }
          if (valid) {
            style = " validMove";
          }
        }
      }

      else if (yours.type === "Queen" && tile.color !== this.props.userColor) {
        let validRook = true;
        let validBishop = true;
        let rowStart = yours.row;
        let rowEnd = tile.row;
        let colStart = yours.col;
        let colEnd = tile.col;

        if (rowStart > rowEnd) {
          let temp = rowStart;
          rowStart = rowEnd;
          rowEnd = temp;
        }
        if (colStart > colEnd) {
          let temp = colStart;
          colStart = colEnd;
          colEnd = temp;
        }
        //rook moves
        if (yours.row === tile.row && yours.col !== tile.col) {
          for (let x = colStart + 1; x < colEnd; x++) {
            console.log(board[yours.row][x].type)
            if (board[yours.row][x].type !== null) validRook = false;
          }
        }
        else if (yours.row !== tile.row && yours.col === tile.col) {
          for (let x = rowStart + 1; x < rowEnd; x++) {
            if (board[x][yours.col].type !== null) validRook = false;
          }
        }
        else {
          validRook = false;
        }
        //bishop moves
        if ((rowStart - rowEnd) === (colStart - colEnd)) {
          //move to top left
          if (tile.row < yours.row && tile.col < yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row - x][yours.col - x].type !== null) validBishop = false;
            }
          }
          //move to top right
          else if (tile.row < yours.row && tile.col > yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row - x][yours.col + x].type !== null) validBishop = false;
            }
          }
          //move to bottem left
          else if (tile.row > yours.row && tile.col < yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row + x][yours.col - x].type !== null) validBishop = false;
            }
          }
          //move to bottem right
          else if (tile.row > yours.row && tile.col > yours.col) {
            for (let x = 1; x < rowEnd - rowStart; x++) {
              if (board[yours.row + x][yours.col + x].type !== null) validBishop = false;
            }
          }
        }
        else {
          validBishop = false;
        }
        if (validRook || validBishop) {
          style = " validMove";
        }
      }
      else if (yours.type === "King" && tile.color !== this.props.userColor) {
        if ((tile.row === yours.row && tile.col + 1 === yours.col) ||
          (tile.row === yours.row && tile.col - 1 === yours.col) ||
          (tile.row + 1 === yours.row && tile.col === yours.col) ||
          (tile.row - 1 === yours.row && tile.col === yours.col) ||
          (tile.row - 1 === yours.row && tile.col - 1 === yours.col) ||
          (tile.row - 1 === yours.row && tile.col + 1 === yours.col) ||
          (tile.row + 1 === yours.row && tile.col - 1 === yours.col) ||
          (tile.row + 1 === yours.row && tile.col + 1 === yours.col)) {
          style = " validMove";
        }

      }
    }
    let renderedTile;

    let blackTile = ((tile.row + 1) * 7 + tile.col) % 2 === 0;

    let icon;
    if (tile.type === "Pawn") icon = <FontAwesomeIcon size="2x" icon={faChessPawn} />
    else if (tile.type === "Knight") icon = <FontAwesomeIcon size="2x" icon={faChessKnight} />
    else if (tile.type === "Bishop") icon = <FontAwesomeIcon size="2x" icon={faChessBishop} />
    else if (tile.type === "Rook") icon = <FontAwesomeIcon size="2x" icon={faChessRook} />
    else if (tile.type === "Queen") icon = <FontAwesomeIcon size="2x" icon={faChessQueen} />
    else if (tile.type === "King") icon = <FontAwesomeIcon size="2x" icon={faChessKing} />

    if (tile.color === "White" && blackTile) {

      renderedTile = <div className={"tab blacktile whitepiece" + style} onClick={this.handlePieceClick}>{icon}</div>
    }
    else if (tile.color === "White" && !blackTile) {

      renderedTile = <div className={"tab whitetile whitepiece" + style} onClick={this.handlePieceClick}>{icon}</div>
    }
    else if (tile.color === "Black" && blackTile) {

      renderedTile = <div className={"tab blacktile blackpiece" + style} onClick={this.handlePieceClick}>{icon}</div>
    }
    else if (tile.color === "Black" && !blackTile) {

      renderedTile = <div className={"tab whitetile blackpiece" + style} onClick={this.handlePieceClick}>{icon}</div>
    }
    else if (blackTile) {
      renderedTile = <div className={"tab blacktile" + style} onClick={this.handlePieceClick}></div>
    }
    else {
      renderedTile = <div className={"tab whitetile" + style} onClick={this.handlePieceClick}></div>
    }
    if (this.props.getYours() !== null) {
      if (this.props.getYours().row === this.props.tile.row && this.props.getYours().col === this.props.tile.col) {
        if (tile.color === "White" && blackTile) {

          renderedTile = <div className={"tab blacktile whitepiece" + style} id="yourPiece" onClick={this.handlePieceClick}>{icon}</div>
        }
        else if (tile.color === "White" && !blackTile) {

          renderedTile = <div className={"tab whitetile whitepiece" + style} id="yourPiece" onClick={this.handlePieceClick}>{icon}</div>
        }
        else if (tile.color === "Black" && blackTile) {

          renderedTile = <div className={"tab blacktile blackpiece" + style} id="yourPiece" onClick={this.handlePieceClick}>{icon}</div>
        }
        else if (tile.color === "Black" && !blackTile) {

          renderedTile = <div className={"tab whitetile blackpiece" + style} id="yourPiece" onClick={this.handlePieceClick}>{icon}</div>
        }
        else if (blackTile) {
          renderedTile = <div className={"tab blacktile" + style} id="yourPiece" onClick={this.handlePieceClick}></div>
        }
        else {
          renderedTile = <div className={"tab whitetile" + style} id="yourPiece" onClick={this.handlePieceClick}></div>
        }
      }
    }
    if (this.props.getThiers() !== null) {
      if (this.props.getThiers().row === this.props.tile.row && this.props.getThiers().col === this.props.tile.col) {
        if (tile.color === "White" && blackTile) {

          renderedTile = <div className={"tab blacktile whitepiece" + style} id="thierPiece" onClick={this.handlePieceClick}>{icon}</div>
        }
        else if (tile.color === "White" && !blackTile) {

          renderedTile = <div className={"tab whitetile whitepiece" + style} id="thierPiece" onClick={this.handlePieceClick}>{icon}</div>
        }
        else if (tile.color === "Black" && blackTile) {

          renderedTile = <div className={"tab blacktile blackpiece" + style} id="thierPiece" onClick={this.handlePieceClick}>{icon}</div>
        }
        else if (tile.color === "Black" && !blackTile) {

          renderedTile = <div className={"tab whitetile blackpiece" + style} id="thierPiece" onClick={this.handlePieceClick}>{icon}</div>
        }
        else if (blackTile) {
          renderedTile = <div className={"tab blacktile" + style} id="thierPiece" onClick={this.handlePieceClick}></div>
        }
        else {
          renderedTile = <div className={"tab whitetile" + style} id="thierPiece" onClick={this.handlePieceClick}></div>
        }
      }
    }
    return (
      renderedTile
    );
  }
}