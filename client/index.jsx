import React, { useEffect, useState } from "react";
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

function UserRegistrationForm( { onUsername }) {
    const [ username, setUsername ] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        onUsername(username);
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <button> Submit </button>
        </form>
    );
}

function Application(){
    const [user, setUser] = useState();
    const [messages, setMessages] = useState(initialMessages);
    const [ws, setWs] = useState();

    useEffect(() => {
       const ws = new WebSocket("ws://" + window.location.host);
       ws.onopen = (event) => {
         console.log("Opened", event);
       };
       ws.onmessage = (event) => {
         console.log("Message: ", event);
         const { user, message } = JSON.parse(event.data);
         setMessages((messages) => [...messages, { message, user }]);
       };
        setWs(ws);
    }, []);

    function handleNewMessage(message){
        ws.send(JSON.stringify({ message, user }));
    }
    //console.log(user);
    if(!user){
        return <UserRegistrationForm onUsername={setUser} />;
    }
    return(
      <ChatApp messages={messages} onNewMessage={handleNewMessage} />
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Application />);