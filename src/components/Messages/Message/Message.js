import React from "react";

import ReactEmoji from "react-emoji";

import "./Message.css";

export const Message = ({ message: { user, text } }) => {
  let isSentByCurrentUser = false;

  return (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
};
