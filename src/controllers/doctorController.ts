import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { DoctorSchema } from '../schemas';

export const getDoctors = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const createDoctor = async (req: Request, res: Response) => {
  const validation = DoctorSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() });
  }

  const { name, specialization } = validation.data;

  const { data, error } = await supabase
    .from('doctors')
    .insert([{ name, specialization }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
};

export const updateDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body; // { specialization: "...", is_active: false, ... }

  const { data, error } = await supabase
    .from('doctors')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Soft delete: Just set is_active to false
  const { data, error } = await supabase
    .from('doctors')
    .update({ is_active: false })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ message: 'Doctor soft-deleted successfully', doctor: data });
};
