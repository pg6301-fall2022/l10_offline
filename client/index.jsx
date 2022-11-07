import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import { ChatApp } from "./chatApp";

const initialMessages = [
    {
        user: "User1",
        message: "Oj there from user1",
    } ,
    {
        user: "User2",
        message: "Hello there from user2",
    },
];

function UserRegistration( { onUsername } ){
    const [username, setUsername] = useState();

    function handleSubmit(e){
        e.preventDefault();
        onUsername(username);
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <button> Submit </button>
        </form>
    );
}

function Application(){
    const [ messages, setMessages ] = useState(initialMessages);
    const [ user, setUser ] = useState();
    const [ ws, setWs ] = useState();

    useEffect(() => {
       const ws = new WebSocket("ws://" + window.location.host);

       ws.onopen = (event) => {
           console.log(" Web socket open!")
       }
       ws.onmessage = (event) => {
           console.log("New message ", event);
       }

       setWs(ws);
    }, []);

    function onNewMessage(message){
        setMessages((messages) => [...messages, {message, user}]);
        ws.send("A new message " + message);
    }

    if(!user){
      return <UserRegistration onUsername={setUser} />
    }

    return(
        <ChatApp messages={messages} onNewMessage={onNewMessage} />
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Application />);