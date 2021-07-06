package com.store.user.dto;

import com.store.user.entity.Users;

public class UserDTO {

	private Integer userId;

	private String username;
	
	private String password;
	
	private String email;
	
	private Integer wins;

	public Integer getWins() {
		return wins;
	}

	public void setWins(Integer wins) {
		this.wins = wins;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public Users prepareEntity() {
		Users entity = new Users();
		entity.setEmail(this.getEmail());
		entity.setPassword(this.getPassword());
		entity.setUserId(this.getUserId());
		entity.setUsername(this.getUsername());
		entity.setWins(this.getWins());
		return entity;
	}
}