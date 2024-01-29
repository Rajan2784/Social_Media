package com.rajan.fullstack.repository;

import com.rajan.fullstack.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story,Integer> {
    public List<Story> findUserById(Integer userId);
}
