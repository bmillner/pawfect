import axios from 'axios';
import { z } from 'zod';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.pawfectgrooming.com';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API Types
export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(['groomer', 'customer']),
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
});

export const PetSchema = z.object({
  id: z.string(),
  name: z.string(),
  breed: z.string(),
  notes: z.string().optional(),
  customerId: z.string(),
});

export const CustomerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  pets: z.array(PetSchema),
});

// API Functions
export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return UserSchema.parse(data.user);
  },
  register: async (userData: z.infer<typeof UserSchema>) => {
    const { data } = await api.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return UserSchema.parse(data.user);
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const appointments = {
  getAll: async () => {
    const { data } = await api.get('/appointments');
    return z.array(AppointmentSchema).parse(data);
  },
  create: async (appointment: Omit<z.infer<typeof AppointmentSchema>, 'id'>) => {
    const { data } = await api.post('/appointments', appointment);
    return AppointmentSchema.parse(data);
  },
  update: async (id: string, appointment: Partial<z.infer<typeof AppointmentSchema>>) => {
    const { data } = await api.patch(`/appointments/${id}`, appointment);
    return AppointmentSchema.parse(data);
  },
  delete: async (id: string) => {
    await api.delete(`/appointments/${id}`);
  },
};

export const customers = {
  getAll: async () => {
    const { data } = await api.get('/customers');
    return z.array(CustomerSchema).parse(data);
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/customers/${id}`);
    return CustomerSchema.parse(data);
  },
  create: async (customer: Omit<z.infer<typeof CustomerSchema>, 'id'>) => {
    const { data } = await api.post('/customers', customer);
    return CustomerSchema.parse(data);
  },
  update: async (id: string, customer: Partial<z.infer<typeof CustomerSchema>>) => {
    const { data } = await api.patch(`/customers/${id}`, customer);
    return CustomerSchema.parse(data);
  },
  delete: async (id: string) => {
    await api.delete(`/customers/${id}`);
  },
};

export const pets = {
  create: async (pet: Omit<z.infer<typeof PetSchema>, 'id'>) => {
    const { data } = await api.post('/pets', pet);
    return PetSchema.parse(data);
  },
  update: async (id: string, pet: Partial<z.infer<typeof PetSchema>>) => {
    const { data } = await api.patch(`/pets/${id}`, pet);
    return PetSchema.parse(data);
  },
  delete: async (id: string) => {
    await api.delete(`/pets/${id}`);
  },
};