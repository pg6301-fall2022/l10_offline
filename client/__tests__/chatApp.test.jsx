import React from "react";
import { createRoot } from "react-dom/client";
import { ChatApp } from "../chatApp";
import { act, Simulate } from "react-dom/test-utils";



describe("chat test suite", () => {
   it("shows messages", () =>{
        const testMess = [
            { user: "Test1", message: "Yep"},
            { user: "Test2", message: "Nope"},
        ];

        const element = document.createElement("div");
        const root = createRoot(element);

        act(() =>
            root.render(<ChatApp messages={testMess} /> )
        );

        expect(element.innerHTML).toMatchSnapshot();
   });

   it("adds new message", () => {
       const element = document.createElement("div");
       const root = createRoot(element);

       const onNewMessage = jest.fn();

       act(() =>
        root.render(<ChatApp messages={[]} onNewMessage={onNewMessage} />)
       );

       act(() =>
           Simulate.change(element.querySelector("footer input"), {
               target: {value: "something else"}
           })
       );

       act(() =>
            Simulate.submit(element.querySelector("footer form"))
       );

       expect(onNewMessage).toBeCalledWith("something else");

   });
});