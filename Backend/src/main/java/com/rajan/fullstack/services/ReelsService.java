package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Reels;
import com.rajan.fullstack.model.User;

import java.util.List;

public interface ReelsService {
    public Reels createReel(Reels reel, User user);
    public List<Reels> findAllReels();
    public List<Reels> findUserReels(Integer userId) throws Exception;
}
