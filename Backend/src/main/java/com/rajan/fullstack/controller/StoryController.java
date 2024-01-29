package com.rajan.fullstack.controller;

import com.rajan.fullstack.model.Story;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.services.StoryService;
import com.rajan.fullstack.services.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StoryController {
    @Autowired
    private StoryService storyService;
    @Autowired
    private UserServiceInterface userService;
    @PostMapping("/api/story")
    public Story createStory(@RequestBody Story story, @RequestHeader("Authorization")String jwt){
        User user = userService.findUserByJwt(jwt);

        return storyService.createStory(story,user);
    }

    @GetMapping("/api/story/user/{userId}")
    public List<Story> findUserStory(@PathVariable Integer userId,@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        return storyService.findStoryByUserId(user.getId());
    }
}
