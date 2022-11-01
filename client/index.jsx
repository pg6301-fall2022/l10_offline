import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import { ChatApp } from "./chatApp"

const initialMessages = [
    {
        user: "User1",
        message: "Message 1 from main",
    },
    {
        user: "User2",
        message: "Message 2",
    },
    {
        user: "User1",
        message: "Message 3",
    },
];

function Application(){
    const [messages, setMessages] = useState(initialMessages);

    function handleNewMessage(message){
        setMessages((messages) => [...messages, {message}]);
    }
    return(
      <ChatApp messages={messages} onNewMessage={handleNewMessage} />
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Application/>);