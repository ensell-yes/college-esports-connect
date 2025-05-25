// schemas.ts
import { z } from "zod";

// Strong password schema (used in register only)
const strongPasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" });

// Schema for login form
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Schema for registration form - requires strong password and confirmation
export const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
