import { z } from 'zod';

export const checkoutSchema = z.object({
  wishId: z.string().uuid(),
  amount: z.number().min(1, "Minimum donation is $1").max(10000, "Maximum limit reached"),
  tipAmount: z.number().min(0),
  country: z.string().length(2, "Invalid country code"), // e.g., 'US', 'IN'
  isAnonymous: z.boolean().optional(),
});
