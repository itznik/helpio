import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Need one uppercase letter").regex(/[0-9]/, "Need one number"),
  name: z.string().min(2, "Name is too short").max(50, "Name is too long").regex(/^[a-zA-Z\s]*$/, "No special characters allowed in name"),
});

export const wishSchema = z.object({
  title: z.string().min(5).max(100),
  amount: z.number().min(1).max(10000),
  description: z.string().min(20).max(2000),
  // Sanitize HTML/Script tags automatically via frontend libraries, but prevent here too
  category: z.enum(["Education", "Health", "Business", "Emergency"]),
});
