package com.store.user.api;

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
import org.springframework.web.server.ResponseStatusException;

import com.store.user.dto.UserDTO;
import com.store.user.exception.UserException;
import com.store.user.service.UserService;

@RestController
@RequestMapping(value = "UserAPI")
@CrossOrigin
public class UserAPI {

	@Autowired
	UserService service;
	
	@PostMapping(value = "createUser")
	public ResponseEntity<Boolean> createUser(@RequestBody UserDTO dto){
		try {
			service.createUser(dto);
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		}
		catch(Exception e){
			return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping(value = "validUser")
	public ResponseEntity<UserDTO> validUser(@RequestBody UserDTO dto){
		try {
			
			return new ResponseEntity<UserDTO>(service.validUser(dto), HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<UserDTO>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(value = "getUser/{username}")
	public ResponseEntity<UserDTO> getUser(@PathVariable String username){
		System.out.println(username);
		return new ResponseEntity<UserDTO>(service.findByUsername(username), HttpStatus.OK);
	}
	@GetMapping(value = "getUsername/{userId}")
	public ResponseEntity<UserDTO> getUsername(@PathVariable Integer userId) throws UserException{
		return new ResponseEntity<UserDTO>(service.findById(userId), HttpStatus.OK);
	}
	@GetMapping(value = "winner/{userId}")
	public void winner(@PathVariable Integer userId)throws UserException{
		service.winner(userId);
	}
}
