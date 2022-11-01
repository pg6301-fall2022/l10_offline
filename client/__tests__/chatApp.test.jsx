import React from "react";
import { createRoot } from "react-dom/client";
import { ChatApp } from "../chatApp";
import {act} from "react-dom/test-utils";

describe("chat app test suite", () => {
   it("show chat messages", () => {
      const chatMess = [
          { user: "test user", message: "message 1 "},
          { user: "some user", message: "message 2 "},
      ];

      const element = document.createElement("div");
      const root = createRoot(element);

      act(() =>
        root.render(<ChatApp messages={chatMess} />)
      );

      expect(element.innerHTML).toMatchSnapshot();

   });

   it("submits new chat message", () => {
      const element = document.createElement("div");
      const root = createRoot(element);
      const onNewMessage = jest.fn();

      act(() =>
         root.render(<ChatApp messages={[]} onNewMessage={onNewMessage} />)
      );

      act(() =>
         Simulate.change(element.querySelector("footer input"), {
           target: {value: "new message"}
         })
      );

      act(() =>
         Simulate.submit(element.querySelector("footer form"))
      );

      expect(onNewMessage).toBeCalledWith("new message");

   });
});