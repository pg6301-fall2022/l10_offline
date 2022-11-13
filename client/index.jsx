import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import { ChatApp } from "./chatApp";

const initialMessages = [
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
           const {user, message} = JSON.parse(event.data);
           setMessages((messages) => [...messages, { message, user }]);
       }

       setWs(ws);
    }, []);

    function onNewMessage(message){
        //setMessages((messages) => [...messages, { message, user }]);
        ws.send(JSON.stringify( { message, user }));
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