import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  // FIX: Ensure string is present before regex checks
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Need one uppercase letter")
    .regex(/[0-9]/, "Need one number"),
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
});

export const wishSchema = z.object({
  title: z.string().min(5).max(100),
  amount: z.number().min(1).max(100000),
  description: z.string().min(20).max(2000),
  category: z.enum(["Education", "Health", "Business", "Emergency", "Other"]),
});

export const checkoutSchema = z.object({
  wishId: z.string().uuid().optional().or(z.string()), // Relaxed for flexibility
  amount: z.number().min(1),
  tipAmount: z.number().min(0).default(0),
  country: z.string().length(2), // Expecting 2-letter ISO code (e.g., 'US')
  isAnonymous: z.boolean().optional().default(false),
});
