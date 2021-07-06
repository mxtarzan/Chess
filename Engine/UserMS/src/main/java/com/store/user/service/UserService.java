package com.store.user.service;
 
import java.util.List;

import org.springframework.stereotype.Service;

import com.store.user.dto.UserDTO;
import com.store.user.exception.UserException;


public interface UserService {
	
	public Boolean createUser(UserDTO dto) throws UserException;
	
	public UserDTO validUser(UserDTO dto) throws UserException;

	public UserDTO findByUsername(String username);
	
	public UserDTO findById(Integer userId) throws UserException;

	public void winner(Integer userId);
	
}
