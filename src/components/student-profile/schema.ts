
import { z } from "zod";

// Student profile form schema 
export const studentProfileSchema = z.object({
  gamertag: z.string().min(1, { message: "Gamertag is required" }),
  prefix: z.string().optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid school email address" }),
  phone: z.string().min(10, { message: "Valid mobile number is required" }),
  addressLine1: z.string().min(1, { message: "Address is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip/postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
});

export type StudentProfileFormValues = z.infer<typeof studentProfileSchema>;
