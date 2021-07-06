package com.store.user.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.user.dto.UserDTO;
import com.store.user.entity.Users;
import com.store.user.exception.UserException;
import com.store.user.repository.UserRepository;

@Service(value = "userService")
@Transactional
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepo;
	
	@Override
	public Boolean createUser(UserDTO dto) throws UserException{
		if(userRepo.findByEmail(dto.getEmail()) != null) throw new UserException("Email Already In System!");
		if(userRepo.findByUsername(dto.getUsername()) != null) throw new UserException("Username Already In System!");
		userRepo.save(dto.prepareEntity());
		return true;
	}

	@Override
	public UserDTO validUser(UserDTO dto) throws UserException{
		if(userRepo.findByUsernameAndPassword(dto.getUsername(), dto.getPassword()) == null)  throw new UserException("Invalid Combo!");
		return userRepo.findByUsernameAndPassword(dto.getUsername(), dto.getPassword()).prepareDTO();
	}

	@Override
	public UserDTO findByUsername(String username) {
		return userRepo.findByUsername(username).prepareDTO();
	}

	@Override
	public UserDTO findById(Integer userId) throws UserException {
		return userRepo.findByUserId(userId).prepareDTO();
	}

	@Override
	public void winner(Integer userId) {
		Optional<Users> u = userRepo.findById(userId);
		Users user = u.orElseThrow();
		user.setWins(user.getWins()+1);
		userRepo.save(user);
	}

}
