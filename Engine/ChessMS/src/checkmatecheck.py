import sys;
import chess;

board = chess.Board(sys.argv[1]+" "+sys.argv[2])
print(board.is_checkmate())
