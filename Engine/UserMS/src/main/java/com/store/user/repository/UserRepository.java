package com.store.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.user.entity.Users;

public interface UserRepository extends JpaRepository<Users, Integer>{
	Users findByEmail(String email);
	Users findByUsername(String username);
	Users findByUsernameAndPassword(String username, String password);
	Users findByUserId(Integer userId);
}
