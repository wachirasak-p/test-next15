"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { bookingSchema } from "@/lib/validations";
import { z } from "zod";

type BookingInput = z.infer<typeof bookingSchema>;

export const createBooking = async (input: BookingInput) => {
  try {
    await prisma.booking.create({
      data: input,
    });
    return {
      success: true as const,
      message: "จองห้องพักสำเร็จ",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false as const,
      message: "เกิดข้อผิดพลาดในการจอง",
    };
  } finally {
    revalidatePath("/booking");
  }
};
