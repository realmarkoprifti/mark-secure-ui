const API = "https://marksecure.onrender.com/api";

interface CheckRoomProps {
  room_id: string;
}

type CreateRoomProps = (
  room_id: string | undefined,
  room_password: string | undefined
) => Promise<"room_not_created" | "room_created">;

export const check_room = async ({ room_id }: CheckRoomProps) => {
  const res = await fetch(`${API}/check/room`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      room_id: room_id,
    }),
  });

  if (!res.ok) {
    return false;
  }

  return true;
};

export const create_room: CreateRoomProps = async (room_id, room_password) => {
  const res = await fetch(`${API}/create/room`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      room_id: room_id,
      room_password: room_password,
    }),
  });

  if (!res.ok) {
    return "room_not_created";
  }

  return "room_created";
};
