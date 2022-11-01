import React from "react";
import { createRoot } from "react-dom/client";
import { ChatApp } from "./chatApp"

const messages = [
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
]

const root = createRoot(document.getElementById("app"));
root.render(<ChatApp messages={messages}/>);