import React from "react";
//csimport "./message.css";
import { format } from "timeago.js";
interface MessageProps {
  message: {
    text: string;
    createdAt: string; // Assuming createdAt is a string, update the type accordingly
  };
  own: boolean;
}

const Message: React.FC<MessageProps> = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageIMG" src="./images/user.jpg" alt="" />
        <p className="messageText">{message.text}</p>
      </div>

      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
