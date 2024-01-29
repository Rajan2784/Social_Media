import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import StoryCircle from "./StoryCircle";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../post/PostCard";
import CreatePostModal from "../createPost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../redux/post/post.action";

const MiddlePart = () => {
  const story = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostAction());
  }, []);

  const posts = useSelector((state) => state.post.posts);

  const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);

  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
  };

  return (
    <div className="px-20">
      <section className="flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item, index) => (
          <StoryCircle key={index} />
        ))}
      </section>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar />
          <input
            type="text"
            onClick={handleOpenCreatePostModal}
            readOnly
            className="outline-none w-[90%] bg-slate-200 rounded-full px-5 border bg-transparent border-[#3b4054]"
          />
        </div>

        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>

            <span>media</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>

            <span>Video</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>

            <span>Article</span>
          </div>
        </div>
      </Card>

      <div className="mt-5 space-y-5">
      {posts ? posts.length > 0 && posts.map((post,index) => <PostCard post={post} key={index} />) : null}
      </div>

      <div>
        <CreatePostModal
          handleClose={handleCloseCreatePostModal}
          open={openCreatePostModal}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
