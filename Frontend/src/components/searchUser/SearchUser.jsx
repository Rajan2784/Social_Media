import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../redux/auth/auth.action";
import { createChat } from "../../redux/message/message.action";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { searchUsername } = useSelector((store) => store.auth);
  console.log(searchUsername)
  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    dispatch(searchUser(username));
  };
  const handleClick = (id) => {
    dispatch(createChat({userId:id}))
  };
  return (
    <div className="">
      <div className="py-5 relative">
        <input
          type="text"
          placeholder="Search for users..."
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          onChange={handleSearchUser}
        />
        {username &&
          searchUsername?.map((item) => (
            <Card key={item.id} className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUsername("");
                }}
                avatar={
                  <Avatar src="https://cdn.pixabay.com/photo/2015/11/16/22/39/balloons-1046658_640.jpg" />
                }
                title={item.firstName + " " + item.lastName}
                subheader={'@'+item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
