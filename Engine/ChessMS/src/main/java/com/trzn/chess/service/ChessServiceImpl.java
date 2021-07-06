package com.trzn.chess.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trzn.chess.DTO.Move;
import com.trzn.chess.DTO.Piece;
import com.trzn.chess.entity.Boards;
import com.trzn.chess.repository.ChessRepository;

@Service(value = "engineService")
@Transactional
public class ChessServiceImpl implements ChessService {

	@Autowired
	ChessRepository repo;

	@Override
	public Boolean createRoom(Integer userId) {
		if(repo.findByWhiteId(userId)!= null || repo.findByBlackId(userId)!= null)return false;
		Boards board = new Boards();
		board.setWhiteId(userId);
		board.setBoardEncode(
				"rwnwbwkwqwbwnwrwpwpwpwpwpwpwpwpweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeepbpbpbpbpbpbpbpbrbnbbbkbqbbbnbrb");
		repo.save(board);
		return true;
	}

	public String getColor(Integer userId) {
		Boards board = repo.findByWhiteId(userId);
		if (board != null) {
			return "White";
		}
		board = repo.findByBlackId(userId);
		if (board != null) {
			return "Black";
		}
		return "N/A";
	}

	@Override
	public Piece[][] getBoard(Integer userId) {
		Piece[][] board = new Piece[8][8];
		Boards b = repo.findByWhiteId(userId);
		if (repo.findByWhiteId(userId) != null) {
			String sBoard = b.getBoardEncode();
			for (int i = 0; i < sBoard.length(); i += 2) {
				char x = sBoard.charAt(i);
				char y = sBoard.charAt(i + 1);
				String color = null;
				if (y == 'b') {
					color = "Black";
				} else if (y == 'w') {
					color = "White";
				}
				String type = null;
				if (x == 'p') {
					type = "Pawn";
				} else if (x == 'r') {
					type = "Rook";
				} else if (x == 'n') {
					type = "Knight";
				} else if (x == 'b') {
					type = "Bishop";
				} else if (x == 'k') {
					type = "King";
				} else if (x == 'q') {
					type = "Queen";
				}
				board[i / 8 / 2][i / 2 % 8] = new Piece(color, type, i / 8 / 2, i / 2 % 8);
			}
		} else if (repo.findByBlackId(userId) != null) {
			b = repo.findByBlackId(userId);
			String sBoard = b.getBoardEncode();
			for (int i = 0; i < sBoard.length(); i += 2) {
				char x = sBoard.charAt(i);
				char y = sBoard.charAt(i + 1);
				String color = null;
				if (y == 'b') {
					color = "Black";
				} else if (y == 'w') {
					color = "White";
				}
				String type = null;
				if (x == 'p') {
					type = "Pawn";
				} else if (x == 'r') {
					type = "Rook";
				} else if (x == 'n') {
					type = "Knight";
				} else if (x == 'b') {
					type = "Bishop";
				} else if (x == 'k') {
					type = "King";
				} else if (x == 'q') {
					type = "Queen";
				}
				board[i / 8 / 2][i / 2 % 8] = new Piece(color, type, i / 8 / 2, i / 2 % 8);
			}
		} else {
			// row
			for (int i = 0; i < 8; i++) {
				// col
				for (int j = 0; j < 8; j++) {
					board[i][j] = new Piece("null", "null", i, j);
				}
			}
		}
		return board;
	}

	@Override
	public void chessMove(Move move) {
		Piece[][] board = this.getBoard(move.getUserId());
		board[move.getThierRow()][move.getThierCol()].setColor(board[move.getYourRow()][move.getYourCol()].getColor());
		board[move.getThierRow()][move.getThierCol()].setType(board[move.getYourRow()][move.getYourCol()].getType());
		board[move.getYourRow()][move.getYourCol()] = new Piece("null", "null", move.getYourRow(), move.getYourCol());
		Boards b = repo.findByWhiteId(move.getUserId());
		if (b == null)
			b = repo.findByBlackId(move.getUserId());
		String sBoard = "";
		for (int i = 0; i < 8; i++) {
			for (int j = 0; j < 8; j++) {
				if (board[i][j].getType() == "Pawn") {
					sBoard += "p";
				} else if (board[i][j].getType() == "Rook") {
					sBoard += "r";
				} else if (board[i][j].getType() == "Bishop") {
					sBoard += "b";
				} else if (board[i][j].getType() == "Knight") {
					sBoard += "n";
				} else if (board[i][j].getType() == "Queen") {
					sBoard += "q";
				} else if (board[i][j].getType() == "King") {
					sBoard += "k";
				} else {
					sBoard += "e";
				}
				if (board[i][j].getColor() == "Black") {
					sBoard += "b";
				} else if (board[i][j].getColor() == "White") {
					sBoard += "w";
				} else {
					sBoard += "e";
				}
			}
		}
		b.setBoardEncode(sBoard);
		b.setTurn(b.getTurn()+1);
		repo.save(b);
	}

	@Override
	public int[] getBoards() {
		List<Boards> opt = repo.findAll();
		List<Integer> boards = new ArrayList<Integer>();
		for(int i = 0; i < opt.size(); i++) {
			if(opt.get(i).getBlackId() == null || opt.get(i).getWhiteId() == null )
			boards.add(opt.get(i).getBoardId());
		}
		/*Piece[][][] boards = new Piece[opt.size()][][];
		for (int j = 0; j < opt.size(); j++) {
			Boards b = opt.get(j);
			Piece[][] board = new Piece[8][8];
			String sBoard = b.getBoardEncode();
			for (int i = 0; i < sBoard.length(); i += 2) {
				char x = sBoard.charAt(i);
				char y = sBoard.charAt(i + 1);
				String color = null;
				if (y == 'b') {
					color = "Black";
				} else if (y == 'w') {
					color = "White";
				}
				String type = null;
				if (x == 'p') {
					type = "Pawn";
				} else if (x == 'r') {
					type = "Rook";
				} else if (x == 'n') {
					type = "Knight";
				} else if (x == 'b') {
					type = "Bishop";
				} else if (x == 'k') {
					type = "King";
				} else if (x == 'q') {
					type = "Queen";
				}
				board[i / 8 / 2][i / 2 % 8] = new Piece(color, type, i / 8 / 2, i / 2 % 8);
			}
			boards[j] = board;
		}*/
		int[] rooms= new int[boards.size()];
		for(int i = 0; i < boards.size(); i++) {
			rooms[i] = (int)boards.get(i);
		}
		return rooms;
	}

	public Integer getTurn(Integer userId) {
		Boards board = repo.findByWhiteId(userId);
		if (board != null) {
			return board.getTurn();
		}
		board = repo.findByBlackId(userId);
		if (board != null) {
			return board.getTurn();
		}
		return 0;
	}

	public Boolean joinRoom(Integer boardId, Integer userId) {
		Optional<Boards> b = repo.findById(boardId);
		Boards board = b.orElseThrow();
		
		if(board.getWhiteId() == userId) {
			return false;
		}
		board.setBlackId(userId);
		repo.save(board);
		return true;
	}

	@Override
	public void gameOver(Integer userId) {
		if(repo.findByWhiteId(userId) != null) {
			repo.delete(repo.findByWhiteId(userId));
		}
		else if(repo.findByBlackId(userId) != null){
			repo.delete(repo.findByBlackId(userId));
		}
	}
}
