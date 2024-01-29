package com.rajan.fullstack.controller;

import com.rajan.fullstack.model.Reels;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.services.ReelsService;
import com.rajan.fullstack.services.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReelsController {
    @Autowired
    private ReelsService reelsService;
    @Autowired
    private UserServiceInterface userService;
    @PostMapping("/api/reels")
    public Reels createReels(@RequestBody Reels reels, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        Reels createdReels = reelsService.createReel(reels,user);

        return createdReels;
    }
    @GetMapping("/api/reels")
    public List<Reels> findAllReels(){
        List<Reels> reels = reelsService.findAllReels();
        return reels;
    }

    @GetMapping("/api/reels/user/{userId}")
    public List<Reels> findUserReels(@PathVariable Integer userId) throws Exception {
        List<Reels> reels = reelsService.findUserReels(userId);

        return reels;
    }
}
