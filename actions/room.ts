"use server";

import prisma from "@/lib/prisma";
import { roomSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type RoomInput = z.infer<typeof roomSchema>;

export const getRooms = async () => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        roomType: true,
      },
    });
    return {
      success: true as const,
      data: rooms,
    };
  } catch (error) {
    console.error("Error getting rooms:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลห้องพัก",
    };
  }
};

export async function createRoom(input: RoomInput) {
  try {
    const validatedData = roomSchema.parse(input);

    const room = await prisma.room.findUnique({
      where: {
        roomNumber: validatedData.roomNumber,
      },
    });

    if (room) {
      return {
        success: false as const,
        message: "ห้องพักนี้มีอยู่ในระบบแล้ว",
      };
    }

    await prisma.room.create({
      data: {
        roomNumber: validatedData.roomNumber,
        roomTypeId: validatedData.roomTypeId,
        status: validatedData.status,
      },
    });

    return {
      success: true as const,
      message: "เพิ่มห้องพักเรียบร้อยแล้ว",
    };
  } catch (error) {
    console.error("Error creating room:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        message: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
      };
    }

    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการเพิ่มห้องพัก",
    };
  } finally {
    revalidatePath("/admin/rooms");
  }
}

export async function deleteRoom(id: string) {
  try {
    await prisma.room.delete({
      where: { id },
    });

    return {
      success: true as const,
      message: "ลบห้องพักสำเร็จ",
    };
  } catch (error) {
    console.error("Error deleting room:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการลบห้องพัก",
    };
  } finally {
    revalidatePath("/admin/rooms");
  }
}

export async function updateRoom(id: string, input: RoomInput) {
  try {
    const validatedData = roomSchema.parse(input);

    await prisma.room.update({
      where: { id },
      data: {
        roomNumber: validatedData.roomNumber,
        roomTypeId: validatedData.roomTypeId,
        status: validatedData.status,
      },
    });

    return {
      success: true as const,
      message: "แก้ไขห้องพักเรียบร้อยแล้ว",
    };
  } catch (error) {
    console.error("Error updating room:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการอัพเดตห้องพัก",
    };
  } finally {
    revalidatePath("/admin/rooms");
  }
}

export async function getRoomById(id: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        roomType: true,
      },
    });

    return {
      success: true as const,
      data: room,
    };
  } catch (error) {
    console.error("Error getting room by id:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลห้องพัก",
    };
  }
}
