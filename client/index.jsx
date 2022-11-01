import React from "react";
import { createRoot } from "react-dom/client";

function Application() {
    return(
      <>
        <header> Pg6301 - websocket chat </header>
        <main>
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

const root = createRoot(document.getElementById("app"));
root.render(<Application/>);