package com.rajan.fullstack.services;

import com.rajan.fullstack.model.User;

import java.util.List;

public interface UserServiceInterface {


    public User registerUser(User user);
    public User findUserById(Integer id) throws Exception;
    public User findUserByEmail(String email);
    public User followUser(Integer userId1, Integer userId2) throws Exception;
    public User updateUser(User user, Integer userId) throws Exception;
    public List<User> searchUser(String query);
    public User findUserByJwt(String jwt);
}
