import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(['groomer', 'customer']),
  createdAt: z.date().optional(),
});

export const AppointmentSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  petId: z.string(),
  service: z.string(),
  date: z.string(),
  time: z.string(),
  notes: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']),
  createdAt: z.date().optional(),
});

export const PetSchema = z.object({
  id: z.string(),
  name: z.string(),
  breed: z.string(),
  notes: z.string().optional(),
  customerId: z.string(),
  createdAt: z.date().optional(),
});

export const CustomerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  pets: z.array(PetSchema),
  createdAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
export type Pet = z.infer<typeof PetSchema>;
export type Customer = z.infer<typeof CustomerSchema>;