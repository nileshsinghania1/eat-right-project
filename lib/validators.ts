import { z } from "zod";

export const checkoutSchema = z.object({
  qty: z.number().int().min(1).max(60),

  // NEW: promo code (optional)
  promoCode: z
    .string()
    .max(20)
    .regex(/^[A-Za-z0-9]*$/, "Promo code can only contain letters and numbers")
    .optional()
    .or(z.literal("")),

  fullName: z.string().min(2).max(80),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email().optional().or(z.literal("")),
  addressLine1: z.string().min(5).max(120),
  addressLine2: z.string().max(120).optional().or(z.literal("")),
  city: z.string().min(2).max(60),
  state: z.string().min(2).max(60),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
