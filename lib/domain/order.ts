import { z } from "zod";

export const CreateOrderSchema = z.object({
  customer: z.string().min(1).max(120),
  email: z.string().email().max(200),
  address1: z.string().min(1).max(200),
  address2: z.string().max(200).optional().or(z.literal("")),
  city: z.string().min(1).max(120),
  country: z.string().min(2).max(120),
  postalCode: z.string().min(2).max(20),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

