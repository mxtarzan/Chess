package com.store.user.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.store.user.dto.UserDTO;

@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	public UserDTO prepareDTO() {
		UserDTO dto = new UserDTO();
		dto.setEmail(this.getEmail());
		dto.setPassword(this.getPassword());
		dto.setUserId(this.getUserId());
		dto.setUsername(this.getUsername());
		dto.setWins(this.getWins());
		return dto;
	}
}