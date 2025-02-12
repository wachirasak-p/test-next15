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
