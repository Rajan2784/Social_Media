package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Reels;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.repository.ReelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ReelsServiceImpl implements ReelsService{
    @Autowired
    private ReelsRepository reelRepository;
    @Autowired
    private UserServiceInterface userService;
    @Override
    public Reels createReel(Reels reel, User user) {
        Reels createReel = new Reels();
        createReel.setTitle(reel.getTitle());
        createReel.setUser(user);
        createReel.setVideo(reel.getVideo());


        return reelRepository.save(createReel);
    }

    @Override
    public List<Reels> findAllReels() {
        return reelRepository.findAll();
    }

    @Override
    public List<Reels> findUserReels(Integer userId) throws Exception {
        User user = userService.findUserById(userId);

        return reelRepository.findByUserId(userId);
    }
}
