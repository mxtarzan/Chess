package com.trzn.chess.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Boards {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer boardId;
	private String boardEncode;
	private Integer whiteId = null;
	private Integer blackId= null;
	private Integer turn = 0;

	public Integer getBoardId() {
		return boardId;
	}

	public void setBoardId(Integer boardId) {
		this.boardId = boardId;
	}

	public String getBoardEncode() {
		return boardEncode;
	}

	public void setBoardEncode(String boardEncode) {
		this.boardEncode = boardEncode;
	}

	public Integer getWhiteId() {
		return whiteId;
	}

	public void setWhiteId(Integer whiteId) {
		this.whiteId = whiteId;
	}

	public Integer getBlackId() {
		return blackId;
	}

	public void setBlackId(Integer blackId) {
		this.blackId = blackId;
	}

	public Integer getTurn() {
		return turn;
	}

	public void setTurn(Integer turn) {
		this.turn = turn;
	}
}
