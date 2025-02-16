import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    passwordConfirm: z.string().min(2).max(50),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const signInFormSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const roomTypeSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อประเภทห้องพัก"),
  description: z.string().min(1, "กรุณากรอกรายละเอียด"),
  capacity: z.number().min(1, "กรุณากรอกความจุ"),
  basePrice: z.number().min(1, "กรุณากรอกราคา"),
});

export const roomSchema = z.object({
  roomNumber: z.string().min(1, "กรุณากรอกชื่อห้องพัก"),
  roomTypeId: z.string().min(1, "กรุณาเลือกประเภทห้องพัก"),
  status: z.enum(["AVAILABLE", "OCCUPIED", "MAINTENANCE"]),
});

export const bookingSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  phone: z.string().min(1, "กรุณากรอกหมายเลขโทรศัพท์"),
  roomTypeId: z.string().min(1, "กรุณาเลือกประเภทห้องพัก"),
  checkIn: z.date(),
  checkOut: z.date(),
  totalPrice: z.number().min(1, "กรุณากรอกราคา"),
});
