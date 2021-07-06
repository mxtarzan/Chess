package com.trzn.chess.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trzn.chess.entity.Boards;

public interface ChessRepository extends JpaRepository<Boards, Integer>{
	public Boards findByWhiteId(Integer whiteId);

	public Boards findByBlackId(Integer blackId);
	
}
