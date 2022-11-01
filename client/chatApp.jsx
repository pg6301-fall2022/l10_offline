import React from "react";

export function ChatApp({ messages }) {
    return(
        <>
            <header> Pg6301 - websocket chat </header>
            <main>
                {messages.map(({ message, user }, index) => (
                  <div key={index}>
                      <strong>{user}:</strong> {message}
                  </div>
                ))}
                <div>Message 1</div>
                <div>Message 2</div>
            </main>
            <footer>
                <form>
                    <input autoFocus={true} />
                    <button> Send </button>
                </form>
            </footer>
        </>
    );
}