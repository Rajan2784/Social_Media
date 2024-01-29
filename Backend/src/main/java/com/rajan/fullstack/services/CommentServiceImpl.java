package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Comment;
import com.rajan.fullstack.model.Post;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.repository.CommentRepository;
import com.rajan.fullstack.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private PostService postService;
    @Autowired
    private UserServiceInterface userService;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Override
    public Comment createComment(Comment comment,
                                 Integer postId, Integer userId) throws Exception {

        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);

        comment.setUser(user);
        comment.setContent(comment.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        post.getComments().add(savedComment);

        postRepository.save(post);

        return savedComment;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws Exception {

        Optional<Comment> opt = commentRepository.findById(commentId);
        if (opt.isEmpty()){
            throw new Exception("comment is not exists with this id..");
        }

        return opt.get();
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws Exception {
        Comment comment = findCommentById(commentId);
        User user = userService.findUserById(userId);

        if (!comment.getLiked().contains(user)){
            comment.getLiked().add(user);
        }else
            comment.getLiked().remove(user);

        return commentRepository.save(comment);
    }
}
