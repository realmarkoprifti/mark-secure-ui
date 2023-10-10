"use client";

import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { BiSolidLockAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { create_room } from "../api/api_requests";

interface CreateRoomProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

const CreateRoom = ({ isOpen, onOpen, onOpenChange }: CreateRoomProps) => {
  const roomRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="text-white bg-transparent">
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl">MarkSecure</ModalHeader>
              <ModalBody className="mb-10 mt-3">
                <span>Super Secret Room ID</span>
                <Input
                  ref={roomRef}
                  variant="underlined"
                  placeholder="Secret ID"
                  type="text"
                  disabled={showPass}
                  isInvalid={error}
                  errorMessage={error && "Room exists or password isn't secure"}
                />
                <motion.div
                  initial={{
                    opacity: 0,
                    height: "0px",
                  }}
                  animate={showPass && { opacity: 1, scale: [0, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  <br />
                  <span>Room Password</span>
                  <Input
                    ref={passRef}
                    variant="underlined"
                    placeholder="Password"
                    type="password"
                    isInvalid={error}
                    errorMessage={
                      error && "Room exists or password isn't secure"
                    }
                  />
                </motion.div>
                <br />
                <Button
                  color="success"
                  disabled={loading}
                  onClick={async () => {
                    if (showPass) {
                      setError(false);
                      setLoading(true);
                      const res = await create_room(
                        roomRef.current?.value,
                        passRef.current?.value
                      );

                      if (res === "room_created") {
                        router.push(
                          `/chat/${roomRef.current?.value}?password=${passRef.current?.value}`
                        );
                      } else if (res === "room_not_created") {
                        setError(true);
                        setLoading(false)
                      }
                    } else {
                      setShowPass(true);
                    }
                  }}
                  size="lg"
                  className="text-lg"
                  as={motion.button}
                  animate={
                    showPass && {
                      y: 60,
                      marginTop: "30px",
                      marginBottom: "15px",
                    }
                  }
                >
                  {loading ? (
                    <span className="animate-spin text-white">
                      <ImSpinner8 />
                    </span>
                  ) : (
                    <>
                      <BiSolidLockAlt />
                      <span>Create </span>
                    </>
                  )}
                </Button>
              </ModalBody>
              <ModalFooter className="flex flex-row justify-center">
                v1.0.0@marko-prifti
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRoom;
