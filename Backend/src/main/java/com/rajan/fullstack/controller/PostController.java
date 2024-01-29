package com.rajan.fullstack.controller;

import com.rajan.fullstack.model.Post;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.response.ApiResponse;
import com.rajan.fullstack.services.PostService;
import com.rajan.fullstack.services.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    PostService postService;
    @Autowired
    UserServiceInterface userService;

    @PostMapping("/api/post")
    public ResponseEntity<Post> createPost(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Post post) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);

        Post createdPost = postService.createNewPost(post, reqUser.getId());
        return new ResponseEntity<Post>(createdPost, HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/api/posts/{postId}")
    public ResponseEntity<ApiResponse> deletePost(
            @PathVariable Integer postId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);

        String message = postService.deletePost(postId, reqUser.getId());
        ApiResponse res = new ApiResponse(message,true);
        return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);
    }

    @GetMapping("/api/posts/{postId}")
    public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws Exception {
        Post post = postService.findPostById(postId);

        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/posts/user/{userId}")
    public ResponseEntity<List<Post>> findUsersPost(@PathVariable Integer userId){
        List<Post> post = postService.findPostByUserId(userId);

        return new ResponseEntity<>(post,HttpStatus.OK);
    }

    @GetMapping("/api/posts")
    public ResponseEntity<List<Post>> findAllPost(){
        List<Post> post = postService.findAllPost();

        return new ResponseEntity<>(post,HttpStatus.OK);
    }

    @PutMapping("/api/posts/save/{postId}")
    public ResponseEntity<Post> savePostHandler(
            @PathVariable Integer postId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        Post post = postService.savedPost(postId, reqUser.getId());

        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/posts/like/{postId}")
    public ResponseEntity<Post> likePostHandler(
            @PathVariable Integer postId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);

        Post post = postService.likePost(postId, reqUser.getId());

        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }
}
