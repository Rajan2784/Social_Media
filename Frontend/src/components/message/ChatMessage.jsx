import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({item}) => {
    const {user} = useSelector((store)=>store.auth)

    const isReqUserMessage = user?.id === item.user?.id;
  return (
    <div
      className={`flex ${!isReqUserMessage ? "justify-start" : "justify-end"} text-white`}
    >
      <div
        className={`p-1 ${
          true ? "rounded-md" : "px-5 rounded-full"
        } bg-[#191c29]`}
      >
        {item.image && (
          <img
            src="https://cdn.pixabay.com/photo/2015/02/05/01/33/valentines-day-624440_640.jpg"
            className="w-[12rem] h-[17rem] object-cover rounded-md"
            alt=""
          />
        )}
        <p className={`${true ? "p-2" : "p-1"}`}>{item.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
