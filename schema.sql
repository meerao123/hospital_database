-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: Doctors
create table doctors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  specialization text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table: Patients
create table patients (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text unique not null,
  age integer not null,
  gender text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table: Appointments
create table appointments (
  id uuid default uuid_generate_v4() primary key,
  doctor_id uuid references doctors(id) not null,
  patient_id uuid references patients(id) not null,
  appointment_time timestamp with time zone not null,
  status text check (status in ('Scheduled', 'Completed', 'Cancelled')) default 'Scheduled',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
