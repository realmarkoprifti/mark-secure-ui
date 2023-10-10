import React from "react";
import TypewriterComponent from "typewriter-effect";

const ChattingWith = () => {
  return (
    <div className="chatting-with w-[100%] flex justify-center items-center p-10">
      <span className="text-center w-full text-zinc-400 font-semibold">
        <TypewriterComponent
          options={{
            strings: ["Secured Connection Established"],
            autoStart: true,
            cursor: "▉",
            loop: true,
            delay: 100,
          }}
        />
        <br />
        <TypewriterComponent
          options={{
            strings: ["Begin to chat"],
            delay: 210,
            autoStart: true,
            cursor: "▉",
            loop: true,
            deleteSpeed: 195,
          }}
        />
      </span>
    </div>
  );
};

export default ChattingWith;
