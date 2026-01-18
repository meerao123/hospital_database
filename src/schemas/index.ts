import { z } from 'zod';

export const DoctorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialization: z.string().min(2, "Specialization is required"),
});

export const PatientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().int().positive("Age must be a positive integer"),
  phone: z.string().min(10, "Phone number must be valid"),
  gender: z.string().optional(),
});

export const AppointmentSchema = z.object({
  doctor_id: z.string().uuid("Invalid Doctor ID"),
  patient_id: z.string().uuid("Invalid Patient ID"),
  appointment_time: z.string().datetime("Invalid date/time format (ISO 8601 required)"),
  notes: z.string().optional(),
});
