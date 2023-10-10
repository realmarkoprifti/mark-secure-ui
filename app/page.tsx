import { AiOutlineLock } from "react-icons/ai";
import { Button } from "@nextui-org/react";
import Lobby from "./components/Lobby";

export default function Home() {
  return (
    <main className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="join flex flex-col gap-5">
        <div className="icn text-[200px] text-slate-300 flex justify-center">
          <AiOutlineLock />
        </div>
        <div className="paragraph w-[100%] flex justify-center text-slate-400 text-xl">
          <p className="w-72 text-center">
            The world's first open-source encrypted chat room
          </p>
        </div>
        <Lobby />
      </div>
    </main>
  );
}
