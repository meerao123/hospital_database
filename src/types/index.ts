export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  is_active: boolean;
  created_at: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
  created_at?: string;
}
