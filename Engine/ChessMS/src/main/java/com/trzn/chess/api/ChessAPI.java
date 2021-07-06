package com.trzn.chess.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trzn.chess.DTO.Move;
import com.trzn.chess.DTO.Piece;
import com.trzn.chess.service.ChessService;
import com.trzn.chess.service.ChessServiceImpl;

@RestController
@RequestMapping(value = "ChessAPI")
@CrossOrigin
public class ChessAPI {

	@Autowired
	ChessService service;

	@GetMapping(value = "getBoard/{userId}")
	public ResponseEntity<Piece[][]> getBoard(@PathVariable Integer userId) {
		String board = "";
		Piece[][] b = service.getBoard(userId);
		for (int i = 0; i < 8; i++) {
			int empty = 0;
			for (int j = 0; j < 8; j++) {
				Piece p = b[i][j];
				String type = p.getType();
				if (type == "Pawn") {
					if (empty != 0) {
						board += empty;
						empty = 0;
					}
					if (p.getColor() == "White")
						board += "P";
					else
						board += "p";
				}

				else if (type == "Knight") {
					if (empty != 0) {
						board += empty;
						empty = 0;
					}
					if (p.getColor() == "White")
						board += "K";
					else
						board += "k";
				}

				else if (type == "Bishop") {
					if (empty != 0) {
						board += empty;
						empty = 0;
					}
					if (p.getColor() == "White")
						board += "B";
					else
						board += "b";
				}

				else if (type == "Rook") {
					if (empty != 0) {
						board += empty;
						empty = 0;
					}
					if (p.getColor() == "White")
						board += "R";
					else
						board += "r";
				}

				else if (type == "Queen") {
					if (empty != 0) {
						board += empty;
						empty = 0;
					}
					if (p.getColor() == "White")
						board += "Q";
					else
						board += "q";
				}

				else if (type == "King") {
					if (empty != 0) {
						board += empty;
						empty = 0;
					}
					if (p.getColor() == "White")
						board += "K";
					else
						board += "k";
				} else
					empty++;

			}
			if (empty != 0) {
				board += empty;
				empty = 0;
			}
			if (i != 7)
				board += "/";

		}
		StringBuilder sb = new StringBuilder();
		sb.append(board);
		sb.reverse();
		String over = "False";
		try {
			String output = "";
			String turn = "";
			if (service.getTurn(userId) % 2 == 0)
				turn = " w";
			else
				turn = " b";
			String pythonScript = "python /home/tarzan/Projects/chess/Engine/ChessMS/src/checkmatecheck.py " + sb + turn;
			System.out.println(pythonScript);
			Process p = Runtime.getRuntime().exec(pythonScript);
			BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
			while ((output = in.readLine()) != null) {
				over = output;
				System.out.println(output);
			}
		} catch (IOException ie) {
			System.out.println("broken");
			over = "";
		}
		if (over.equals("False"))
			return new ResponseEntity<Piece[][]>(b, HttpStatus.OK);
		else {
			service.gameOver(userId);
			return new ResponseEntity<>(b, HttpStatus.I_AM_A_TEAPOT);
		}
	}

	@GetMapping(value = "getBoards")
	public ResponseEntity<int[]> getBoards() {
		return new ResponseEntity<int[]>(service.getBoards(), HttpStatus.OK);
	}

	@GetMapping(value = "createRoom/{userId}")
	public ResponseEntity<Boolean> createRoom(@PathVariable Integer userId) {
		System.out.println("creating room for userid: " + userId);
		return new ResponseEntity<Boolean>(service.createRoom(userId), HttpStatus.CREATED);
	}

	@GetMapping(value = "getColor/{userId}")
	public ResponseEntity<String> getColor(@PathVariable Integer userId) {
		return new ResponseEntity<String>(service.getColor(userId), HttpStatus.OK);
	}

	@GetMapping(value = "getTurn/{userId}")
	public ResponseEntity<Integer> getTurn(@PathVariable Integer userId) {
		return new ResponseEntity<Integer>(service.getTurn(userId), HttpStatus.OK);
	}

	@GetMapping(value = "joinRoom/{boardId}/{userId}")
	public ResponseEntity<Boolean> joinRoom(@PathVariable Integer boardId, @PathVariable Integer userId) {
		return new ResponseEntity<Boolean>(service.joinRoom(boardId, userId), HttpStatus.ACCEPTED);
	}

	@PostMapping(value = "chessMove")
	public ResponseEntity<Piece[][]> chessMove(@RequestBody Move move) {
		service.chessMove(move);
		return new ResponseEntity<Piece[][]>(service.getBoard(move.getUserId()), HttpStatus.OK);
	}
}
