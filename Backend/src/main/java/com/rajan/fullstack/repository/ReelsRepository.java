package com.rajan.fullstack.repository;

import com.rajan.fullstack.model.Reels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReelsRepository extends JpaRepository<Reels,Integer> {

    public List<Reels> findByUserId(Integer userId);
}
