import { Prisma } from "@prisma/client";

export type RoomTypeWithRooms = Prisma.RoomTypeGetPayload<{
  include: { rooms: true };
}>;
