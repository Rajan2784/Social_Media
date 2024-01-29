import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const UserChatCard = ({chat}) => {
    const {user} = useSelector((store)=>store.auth)
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)",
            }}
            src="https://cdn.pixabay.com/photo/2014/12/08/11/49/couple-560783_640.jpg"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={user?.id === chat.users[0].id ? chat.users[1].firstName+" "+ chat.users[1].lastName: chat.users[0].firstName + " " + chat.users[0].lastName}
        subheader="new message"
      />
    </Card>
  );
};

export default UserChatCard;
