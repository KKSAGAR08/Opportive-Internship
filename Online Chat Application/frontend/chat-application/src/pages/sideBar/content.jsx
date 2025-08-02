import React, { useEffect } from "react";
import { userMessage } from "../../store/userMessage";
import { useAuthStore } from "../../store/userAuthStore";

function Content() {
  const {
    messages,
    selectedUser,
    isMessagesLoading,
    getSelectedUserMessage,
    subscribeToUser,
    unsubscribeFromUser,
  } = userMessage();

  const { userAuth } = useAuthStore();

  useEffect(() => {
    getSelectedUserMessage(selectedUser._id);

    subscribeToUser();

    return () => unsubscribeFromUser();
  }, [
    selectedUser._id,
    getSelectedUserMessage,
    subscribeToUser,
    unsubscribeFromUser,
  ]);

  const normalDate = (time) => {
    const date = new Date(time);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <>
      <div className="p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.receiverId === selectedUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header">
              <span className="opacity-50 text-xs lowercase">
                {selectedUser._id === msg.senderId
                  ? userAuth.name
                  : selectedUser.name}
              </span>
            </div>
            <div className="chat-bubble bg-green-500">{msg.text}</div>
            <div className="chat-footer opacity-50 text-xs lowercase">{normalDate(msg.createdAt)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Content;
