import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React from "react";
import PostCard from "../post/PostCard";
import UserReelCard from "../reels/UserReelCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const tabs = [
  {
    value: "post",
    name: "Post",
  },
  {
    value: "reels",
    name: "Reels",
  },
  {
    value: "saved",
    name: "Saved",
  },
  {
    value: "repost",
    name: "Repost",
  },
];

const posts = [1, 1, 1, 1, 2];
const reels = [1, 1, 1, 1, 2];
const savedpost = [1, 1, 1, 1, 2];

const Profile = () => {
  const [value, setValue] = React.useState("post");
  const [open, setOpen] = React.useState(false);
  // const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {user} = useSelector(store => store.auth);

  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md object-cover"
            src="https://cdn.pixabay.com/photo/2023/12/28/14/09/cat-8474233_640.png"
            alt=""
          />
        </div>

        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-20"
            sx={{ width: "5rem", height: "5rem" }}
          />
          {true ? (
            <Button onClick={()=>setOpen(true)} sx={{ borderRadius: "20px" }} variant="outlined">
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined">
              Follow
            </Button>
          )}
        </div>

        <div className="p-5">
          <div>
            <h1 className="font-bold py-1 text-xl">{user?.firstName + " " + user?.lastName}</h1>
            <p>@{user?.firstName.toLowerCase() + "_" + user?.lastName.toLowerCase()}</p>
          </div>

          <div className="flex gap-5 items-center py-3">
            <span>22 post</span>
            <span>20 followers</span>
            <span>5 following</span>
          </div>

          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item,index) => (
                <Tab value={item.value} label={item.name} key={index} />
              ))}
            </Tabs>
          </Box>

          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((item,index) => (
                  <div className="border rounded-md border-slate-100">
                    <PostCard key={index}  />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex flex-wrap justify-center gap-2">
                {reels.map((item,index) => (
                  <UserReelCard key={index} />
                ))}
              </div>
            ): value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {savedpost.map((item,index) => (
                  <div className="border rounded-md border-slate-100">
                    <PostCard key={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div>Repost </div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default Profile;
