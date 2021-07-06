import React from 'react'
import Tile from './Tile/tile';
export default class Row extends React.Component {
  
  render() {
    const row = this.props.row;
    let chessRow = null;
    chessRow = row.map((tile)=><Tile tile={tile} getBoard={this.props.getBoard} userColor={this.props.userColor} setYours={this.props.setYours} setThiers={this.props.setThiers} getYours={this.props.getYours} getThiers={this.props.getThiers}/>);


    return (
      <div className="row">{chessRow}</div>
    );
  }
}