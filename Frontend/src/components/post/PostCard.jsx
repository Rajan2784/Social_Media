import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatIcon from "@mui/icons-material/Chat";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  getAllPostAction,
  likePostAction,
} from "../../redux/post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByReqUser";

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { newComment, like } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  const handleCreateComment = (content, e) => {
    const reqData = {
      postId: post.id,
      data: {
        content,
      },
    };

    // Store the value before dispatching the action
    const inputValue = e.target.value;

    dispatch(createCommentAction(reqData));

    // Reset the input value
    e.target.value = "";
  };

  useEffect(() => {
    // Fetch updated post data when newComment changes
    if (newComment || like) {
      dispatch(getAllPostAction()); // Replace with your fetch post action
    }
  }, [newComment, like, dispatch]);

  const handleLikePost = () => {
    dispatch(likePostAction(post.id));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.user?.firstName + " " + post?.user?.lastName}
        subheader={`@${post?.user?.firstName?.toLowerCase()}_${post?.user?.lastName?.toLowerCase()}`}
      />

      <CardMedia component="img" image={post?.image} alt="" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.caption}
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(user?.id, post) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>

          <IconButton onClick={handleShowComment}>
            <ChatIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            {post?.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />

            <input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handleCreateComment(e.target.value, e);
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2 "
              placeholder="Write your comments.."
              type="text"
            />
          </div>
          <Divider />

          <div className="mx-3 space-y-2 my-5 text-xs">
            {post?.comments?.length > 0 &&
              post.comments.map((comment) => (
                <div className="flex items-center space-x-5" key={comment?.id}>
                  <Avatar
                    sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                  >
                    {comment?.user?.firstName[0]}
                  </Avatar>
                  <p>{comment?.content}</p>
                </div>
              ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
