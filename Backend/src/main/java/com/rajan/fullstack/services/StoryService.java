package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Story;
import com.rajan.fullstack.model.User;

import java.util.List;

public interface StoryService {
    public Story createStory(Story story, User user);
    public List<Story> findStoryByUserId(Integer userId) throws Exception;
}
