package com.rajan.fullstack.controller;

import com.rajan.fullstack.model.User;
import com.rajan.fullstack.repository.UserRepository;
import com.rajan.fullstack.services.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceInterface userService;


    @GetMapping("/api/users")
    List<User> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/api/user/{userId}")
    User user(@PathVariable Integer userId) throws Exception {

        return userService.findUserById(userId);

    }
    @PutMapping("/api/update/user")
    public User updateUser(@RequestHeader("Authorization") String jwt,@RequestBody User user) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);

        return userService.updateUser(user, reqUser.getId());
    }

    @PutMapping("/api/users/follow/{userId2}")
    public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);

        return userService.followUser(reqUser.getId(),userId2);
    }

    @GetMapping("/api/users/search")
    public List<User> searchUser(@RequestParam("query") String query){
        return userService.searchUser(query);
    }

    @GetMapping("/api/users/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        user.setPassword(null);
        return user;
    }
}
