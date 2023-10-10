import React from "react";
import { User } from "@nextui-org/react";

interface MessageProps {
  content: string;
  timestamp: string;
}

const Message = ({ content, timestamp }: MessageProps) => {
  return (
    <div className="w-full py-4 px-5 text-slate-100">
      <div className="flex flex-row w-full justify-between items-center">
        <User
          name="Neo"
          description="Hacking The Matrix"
          avatarProps={{
            src: "/neo.png",
            size: "lg",
          }}
        />
        <span className="text-foreground-400">{timestamp}</span>
      </div>
      <br />
      <span className="">{content}</span>
    </div>
  );
};

export default Message;
