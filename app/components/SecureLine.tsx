import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { BiSolidLockAlt } from "react-icons/bi";
import { motion } from "framer-motion";

interface SecureLineProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

const SecureLine = ({ isOpen, onOpen, onOpenChange }: SecureLineProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const roomRef = useRef<HTMLInputElement | null>(null);
  const passwdRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent className="text-white bg-transparent">
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">MarkSecure</ModalHeader>
            <ModalBody className="mb-10 mt-3">
              <span>Room Secret ID</span>
              <Input
                ref={roomRef}
                variant="underlined"
                placeholder="Secret ID"
                type="text"
              />
              <motion.div
                initial={{ opacity: 0, height: "0px" }}
                animate={showPass && { opacity: 1, scale: [0, 1] }}
                transition={{ duration: 0.4 }}
              >
                <span>Room Password</span>
                <Input
                  ref={passwdRef}
                  variant="underlined"
                  placeholder="Room Password"
                  type="password"
                />
              </motion.div>
              <Button
                as={motion.button}
                animate={
                  showPass && {
                    marginTop: "70px",
                  }
                }
                color="success"
                disabled={loading}
                onClick={async () => {
                  setShowPass(true);

                  if (showPass) {
                    setLoading(true);
                    router.push(
                      `/chat/${roomRef.current?.value}?password=${passwdRef.current?.value}`
                    );
                  }
                }}
                size="lg"
                className="text-lg"
              >
                {loading ? (
                  <span className="animate-spin text-white">
                    <ImSpinner8 />
                  </span>
                ) : (
                  <>
                    <BiSolidLockAlt />
                    <span>Join</span>
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
  );
};

export default SecureLine;
