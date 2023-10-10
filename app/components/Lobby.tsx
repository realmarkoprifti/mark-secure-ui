"use client";

import React from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import SecureLine from "./SecureLine";
import CreateRoom from "./CreateRoom";

const Lobby = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const RoomDisclosure = useDisclosure();

  return (
    <div className="join-room flex justify-center">
      <div className="create-room flex flex-col lg:flex-row md:flex-row gap-3 items-center">
        <Button onClick={onOpen} color="success" size="lg">
          Chat via Secure Line
        </Button>
        <span className="text-slate-400">OR</span>
        <Button color="success" size="lg" onClick={RoomDisclosure.onOpen}>
          Create your own room
        </Button>
      </div>
      <SecureLine isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      <CreateRoom
        isOpen={RoomDisclosure.isOpen}
        onOpen={RoomDisclosure.onOpen}
        onOpenChange={RoomDisclosure.onOpenChange}
      />
    </div>
  );
};

export default Lobby;
