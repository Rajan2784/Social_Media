package com.rajan.fullstack.services;

import com.rajan.fullstack.config.JwtProvider;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementaion implements UserServiceInterface{
    @Autowired
    UserRepository userRepository;
    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findUserById(Integer userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()){
            return user.get();
        }
        throw new Exception("User not found with this id "+ userId);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User followUser(Integer reqUserId, Integer userId2) throws Exception {
        User reqUser = findUserById(reqUserId);
        User user2 = findUserById(userId2);

        user2.getFollowers().add(reqUser.getId());
        reqUser.getFollowing().add(user2.getId());

        userRepository.save(reqUser);
        userRepository.save(user2);

        return reqUser;
    }

    @Override
    public User updateUser(User user, Integer userId) throws Exception {
        Optional<User> user1 = userRepository.findById(userId);

        if (user1.isEmpty()){
            throw new Exception("user not exist with id "+ userId);
        }
        User oldUser = user1.get();
        if (user.getFirstName()!=null){
            oldUser.setFirstName(user.getFirstName());
        }

        if (user.getLastName()!=null){
            oldUser.setLastName(user.getLastName());
        }

        if (user.getEmail()!=null){
            oldUser.setEmail(user.getEmail());
        }
        if (user.getGender()!=null) {
            oldUser.setGender(user.getGender());
        }

        return userRepository.save(oldUser);
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = JwtProvider.getEmailFromJwtToken(jwt);

        return userRepository.findByEmail(email);
    }
}
