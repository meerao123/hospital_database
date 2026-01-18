import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { PatientSchema } from '../schemas';

export const getPatients = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('name');

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: 'Patient not found' });
  return res.json(data);
};

export const createPatient = async (req: Request, res: Response) => {
  const validation = PatientSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() });
  }

  const { data, error } = await supabase
    .from('patients')
    .insert([validation.data])
    .select()
    .single();

  if (error) {
    // Check for unique phone constraint violation
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Patient with this phone number already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
  return res.status(201).json(data);
};

export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body; // { phone: "...", name: "..." }

  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const deletePatient = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check for active history
  const { count, error: countError } = await supabase
    .from('appointments')
    .select('*', { count: 'exact', head: true })
    .eq('patient_id', id);

  if (countError) return res.status(500).json({ error: countError.message });

  if (count !== null && count > 0) {
    return res.status(400).json({ error: 'Cannot delete patient with active history (appointments exist).' });
  }

  // Safe to delete
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(204).send();
};
