"use client";

import React, { useRef, useState, useEffect } from "react";
import { Input, Button, ScrollShadow } from "@nextui-org/react";
import { TbSend } from "react-icons/tb";
import Header from "./Header";
import ChattingWith from "./ChattingWith";
import Message from "./Message";
import { useRouter, useSearchParams } from "next/navigation";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface MessageBoxProps {
  room_id: string;
}

interface Msg {
  id: number;
  content: string;
  timestamp: string;
}

const MessageBox = ({ room_id }: MessageBoxProps) => {
  const msgRef = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const searchParams = useSearchParams();
  const [chattingWith, setChattingWith] = useState(true);
  const { lastMessage, sendMessage, readyState } = useWebSocket(
    `wss:/marksecure.onrender.com/ws/chat/${room_id}/${searchParams.get("password")}`
  );

  useEffect(() => {
    if (readyState === 3) {
      throw new Error("This room doesn't exist or the password was incorrect");
    }

    if (lastMessage !== null) {
      const jsonned = JSON.parse(lastMessage.data);
      setMessages((messages) => [...messages, jsonned]);
      console.log(messages);
      setChattingWith(false);
    }
  }, [lastMessage, setMessages, readyState]);

  return (
    <div className="flex flex-col h-[100vh] w-[100vw] gap-4 bg-zinc-700">
      <Header />
      <ScrollShadow className="messages w-[100vw] h-[90vh] flex flex-col">
        {chattingWith && <ChattingWith />}
        {chattingWith ||
          messages.map((message) => (
            <Message
              key={Math.floor(Math.random() * 1000000)}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
      </ScrollShadow>
      <br />
      <div className="w-[100vw] h-16 flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setChattingWith(false);
            sendMessage(JSON.stringify({ content: msgRef.current?.value }));
            console.log(messages);
          }}
          className="flex justify-center gap-2 items-center pb-10"
        >
          <Input
            ref={msgRef}
            type="text"
            classNames={{
              inputWrapper:
                "lg:w-[650px] sm:w-96 bg-zinc-600 h-12 border-0 text-zinc-300",
              input: "placeholder:text-zinc-400",
            }}
            placeholder="Message"
            variant="faded"
          />
          <Button
            type="submit"
            className="h-12 bg-zinc-600 text-2xl text-zinc-300"
          >
            <TbSend />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageBox;
