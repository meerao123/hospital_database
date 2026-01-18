import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AppointmentSchema } from '../schemas';

export const getAppointments = async (req: Request, res: Response) => {
  // Join doctors and patients tables to get names instead of just IDs
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      id,
      appointment_time,
      status,
      notes,
      doctors (name, specialization),
      patients (name, phone)
    `)
    .order('appointment_time', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const createAppointment = async (req: Request, res: Response) => {
  const validation = AppointmentSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() });
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert([validation.data])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
};
