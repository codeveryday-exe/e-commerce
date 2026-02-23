import { z } from 'zod';

export const checkoutInfoSchema = z.object({
  email: z.email('Invalid email address'),
  phone: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  additionalAddress: z.string().optional(),
  country: z.string(),
  city: z.string().min(1, 'City is required'),
  zip: z.string().min(1, 'Zip code is required'),
});

export type CheckoutInfoFormData = z.infer<typeof checkoutInfoSchema>;
