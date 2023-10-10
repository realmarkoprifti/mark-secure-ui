import React, { useState } from "react";
import { Button, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";

interface HeaderProps {
  websocket?: WebSocket;
}

const Header = ({ websocket }: HeaderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="header py-3 px-5 border-y-1 sticky border-gray-500 flex justify-between">
      <User
        name="Neo"
        description="Hacking The Matrix"
        className="text-white"
        avatarProps={{
          src: "/neo.png",
          size: "lg",
        }}
      />
      <Button
        className="bg-red-600 text-white text-2xl"
        size="lg"
        onClick={() => {
          setLoading(true);
          websocket?.close();
          router.push("/");
        }}
        isIconOnly={true}
      >
        {loading ? (
          <span className="animate-spin text-white">
            <ImSpinner8 />
          </span>
        ) : (
          <AiOutlineClose />
        )}
      </Button>
    </div>
  );
};

export default Header;
