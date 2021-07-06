package com.trzn.chess.DTO;

public class Piece {
	private String type;
	private String color;
	private Integer row;
	private Integer col;
	
	public Piece(String color, String type, Integer row, Integer col) {
		this.color = color;
		this.type = type;
		this.row = row;
		this.col = col;
	}
	
	public boolean validateMove(Integer row, Integer col) {
		switch(this.type) {
		case "Pawn": 
			return true;
		case "Knight":
			return true;
		case "Bishop":
			return true;
		case "Rook":
			return true;
		case "Queen":
			return true;
		case "King":
			return true;
		default:
			return false;
		}
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getRow() {
		return row;
	}

	public void setRow(Integer row) {
		this.row = row;
	}

	public Integer getCol() {
		return col;
	}

	public void setCol(Integer col) {
		this.col = col;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
}