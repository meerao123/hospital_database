import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(200).json({
    message: 'Login successful',
    access_token: data.session.access_token,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  });
};
