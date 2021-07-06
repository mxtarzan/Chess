package com.trzn.chess.DTO;

public class Move {
	private Integer UserId;
	private Integer yourRow;
	private Integer yourCol;
	private Integer thierRow;
	private Integer thierCol;
	
	public Integer getYourRow() {
		return yourRow;
	}
	public void setYourRow(Integer yourRow) {
		this.yourRow = yourRow;
	}
	public Integer getYourCol() {
		return yourCol;
	}
	public void setYourCol(Integer yourCol) {
		this.yourCol = yourCol;
	}
	public Integer getThierRow() {
		return thierRow;
	}
	public void setThierRow(Integer thierRow) {
		this.thierRow = thierRow;
	}
	public Integer getThierCol() {
		return thierCol;
	}
	public void setThierCol(Integer thierCol) {
		this.thierCol = thierCol;
	}
	public Integer getUserId() {
		return UserId;
	}
	public void setUserId(Integer uuserId) {
		UserId = uuserId;
	}
	
	
}
