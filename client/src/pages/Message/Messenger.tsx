import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Conversation from "../../components/conversation";
import Message from "../../components/message";
import axios from "axios";

interface User {
  _id: string;
}

interface MessageObj {
  sender: string;
  text: string;
  conversationId: string;
  createdAt : string;
}

interface ConversationObj {
  _id: string;
  members: string[];
  message : string[];
}

function Messenger() {
  const [conversations, setConversations] = useState<ConversationObj[]>([]);
  const [currentChat, setCurrentChat] = useState<ConversationObj | null>(null);
  const [messages, setMessages] = useState<MessageObj[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "https://working-art-gallery-server.onrender.com/conversation/" +
            user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "https://working-art-gallery-server.onrender.com/messages/" +
            currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageObj: MessageObj = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat?._id || "",
      createdAt : new Date().toISOString()
    };

    try {
      const res = await axios.post(
        "https://working-art-gallery-server.onrender.com/messages",
        messageObj
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header />

      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search"
              className="chatMenuInput"
              onChange={() => {}}
            />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitBtn"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a Conversation to Start a Chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Messenger;