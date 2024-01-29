package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Story;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class StoryServiceImpl implements StoryService{
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private UserServiceInterface userService;
    @Override
    public Story createStory(Story story, User user) {
        Story createStory = new Story();
        createStory.setCaption(story.getCaption());
        createStory.setImage(story.getImage());
        createStory.setUser(user);
        createStory.setTimeStamp(LocalDateTime.now());
        return storyRepository.save(createStory);
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        return storyRepository.findUserById(userId);
    }
}
