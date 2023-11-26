import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Некоректный email" }),
  password: z.string().min(8, { message: "Пароль должен содержать минимум 8 символов. " })
    .regex(/[a-z]/, { message: "Пароль должен содержать хотя бы одну строчную букву. " })
    .regex(/[A-Z]/, { message: "Пароль должен содержать хотя бы одну заглавную букву. " }),
});