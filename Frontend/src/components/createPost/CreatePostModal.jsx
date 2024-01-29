import * as React from "react";
import Box from "@mui/material/Box";
import ImageIcon from "@mui/icons-material/Image";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { uploadToCloudinary } from "../../utils/uploadToCloudnary";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../redux/post/Post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

export default function CreatePostModal({ handleClose, open }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const [selectedVideo, setSelectedVideo] = React.useState();
  const dispatch = useDispatch();

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image",imageUrl);
  };
  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedImage(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video",videoUrl);
  };
  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values) => {
      dispatch(createPostAction(values));
      console.log(values);
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex space-x-4 items-center">
                <Avatar />
                <div>
                  <p className="font-bold text-lg">Rajan</p>
                  <p className="text-sm">@rajan</p>
                </div>
              </div>
              <textarea
                name="caption"
                placeholder="write caption.."
                id="caption"
                rows="4"
                onChange={formik.handleChange}
                value={formik.values.caption}
                className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm"
              ></textarea>

              <div className="flex space-x-5 items-center mt-5">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event)=>handleSelectImage(event)}
                    style={{ display: "none" }}
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <IconButton color="primary" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>
                  <span>Image</span>
                </div>

                <div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleSelectVideo}
                    style={{ display: "none" }}
                    id="video-input"
                  />
                  <label htmlFor="video-input">
                    <IconButton color="primary" component='span'>
                      <VideocamIcon />
                    </IconButton>
                  </label>
                  <span>Video</span>
                </div>
              </div>
              {selectedImage && (
                <div>
                  <img src={selectedImage} className="h-[10rem]" alt="" />
                </div>
              )}
              <div className="flex w-full justify-end">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: "1.5rem" }}
                >
                  Post
                </Button>
              </div>
            </div>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}
