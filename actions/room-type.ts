"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { roomTypeSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
type CreateRoomTypeInput = z.infer<typeof roomTypeSchema>;

export async function createRoomType(input: CreateRoomTypeInput) {
  try {
    const validatedData = roomTypeSchema.parse(input);

    await prisma.roomType.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        capacity: validatedData.capacity,
        basePrice: validatedData.basePrice,
      },
    });

    return {
      success: true as const,
      message: "เพิ่มประเภทห้องพักสำเร็จ",
    };
  } catch (error) {
    console.error("Error creating room type:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        message: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
      };
    }

    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการเพิ่มประเภทห้องพัก",
    };
  } finally {
    revalidatePath("/admin/room-types");
  }
}

export async function getRoomTypes() {
  try {
    const roomTypes = await prisma.roomType.findMany({
      include: {
        rooms: true,
      },
    });
    return {
      success: true as const,
      data: roomTypes,
    };
  } catch (error) {
    console.error("Error getting room types:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลประเภทห้องพัก",
    };
  }
}

export async function deleteRoomType(id: string) {
  try {
    await prisma.roomType.delete({
      where: { id },
    });

    return {
      success: true as const,
      message: "ลบประเภทห้องพักสำเร็จ",
    };
  } catch (error) {
    console.error("Error deleting room type:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการลบประเภทห้องพัก",
    };
  } finally {
    revalidatePath("/admin/room-types");
  }
}

export async function updateRoomType(id: string, input: CreateRoomTypeInput) {
  try {
    const validatedData = roomTypeSchema.parse(input);

    await prisma.roomType.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        capacity: validatedData.capacity,
        basePrice: validatedData.basePrice,
      },
    });

    return {
      success: true as const,
      message: "อัพเดตประเภทห้องพักสำเร็จ",
    };
  } catch (error) {
    console.error("Error updating room type:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการอัพเดตประเภทห้องพัก",
    };
  } finally {
    revalidatePath("/admin/room-types");
  }
}

export async function getRoomTypeById(id: string) {
  try {
    const roomType = await prisma.roomType.findUnique({
      where: { id },
      include: {
        rooms: true,
      },
    });

    return {
      success: true as const,
      data: roomType,
    };
  } catch (error) {
    console.error("Error getting room type by ID:", error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลประเภทห้องพัก",
    };
  }
}
