package com.trzn.chess.service;

import com.trzn.chess.DTO.Move;
import com.trzn.chess.DTO.Piece;

public interface ChessService {

	public Boolean createRoom(Integer userId);

	public Piece[][] getBoard(Integer userId);
	
	public void chessMove(Move move);

	String getColor(Integer userId);

	public int[] getBoards();

	public Integer getTurn(Integer userId);
	
	public void gameOver(Integer userId);

	public Boolean joinRoom(Integer boardId, Integer userId);

}
