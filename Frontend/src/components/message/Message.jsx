import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../searchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../redux/message/message.action";
import { uploadToCloudinary } from "../../utils/uploadToCloudnary";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const Message = () => {
  const dispatch = useDispatch();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const { chats } = useSelector((store) => store.message);
  const { user } = useSelector((store) => store.auth);
  const chatContainerRef = useRef(null);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  const handleCreateMessage = (value, e) => {
    const message = {
      chatId: currentChat.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ message, sendMessageToServer }));
    e.target.value = "";
  };

  const [stomClient, setStomClient] = useState(null);
  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/web-chat");

    const stomp = Stomp.over(sock);
    setStomClient(stomp);

    stomp.connect({}, onConnected, {});

    function onConnected() {

      // Subscribe to WebSocket destination only when connected
      if (user && currentChat) {
        const subscription = stomp.subscribe(
          `/user/${currentChat.id}/private`,
          onMessageRecieve
        );

        return () => {
          // Unsubscribe when the component unmounts or the chat changes
          subscription.unsubscribe();
        };
      }
    }

    return () => {
      // Disconnect the WebSocket when the component unmounts
      if (stomp && stomp.connected) {
        stomp.disconnect();
      }
    };
  }, [user, currentChat]);


  const sendMessageToServer = useCallback(
    (newMessage) => {
      if (stomClient && newMessage) {
        stomClient.send(
          `/app/chat/${currentChat?.id.toString()}`,
          {},
          JSON.stringify(newMessage)
        );
      }
    },
    [stomClient, currentChat]
  );

  const onMessageRecieve = (payload) => {
    const recivedMessage = JSON.parse(payload.body);
    setMessages([...messages, recivedMessage]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>

                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollBar">
                  {chats.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setCurrentChat(item);
                          setMessages(item.messages);
                        }}
                      >
                        <UserChatCard chat={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item className="h-full" xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_640.jpg" />
                  <p>
                    {user?.id === currentChat.users[0].id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>

                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div
                ref={chatContainerRef}
                className="hideScrollBar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5"
              >
                {messages.map((item) => (
                  <ChatMessage item={item} key={item.id} />
                ))}
              </div>
              <div className="sticky bottom-0 border-l">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    loading="lazy"
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    alt=""
                  />
                )}
                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value, e);
                        setSelectedImage("");
                      }
                    }}
                    type="text"
                    className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                    placeholder="Type message..."
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSelectImage(e)}
                      className="hidden"
                      id="imageInput"
                    />
                    <label htmlFor="imageInput" className="cursor-pointer">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold ">No chat selected ....</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
