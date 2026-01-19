# Hospital Management System API

A lightweight, type-safe REST API built to manage hospital operations, including Doctors, Patients, and Appointments. This MVP focuses on simplicity, speed, and data integrity.

## 🚀 Live Demo & Deployment
**Base URL:** (Replace with your Render URL, e.g., `https://hospital-management-api.onrender.com`)

## 🛠 Tech Stack
- **Runtime:** Node.js (LTS) & TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (via Supabase)
- **Auth:** Supabase Auth (JWT)
- **Validation:** Zod

---

## 🔑 Test Credentials
To test the API (specifically for `POST`, `PATCH`, `DELETE` routes which require authentication), use the following credentials.

> **Note:** You must ensure this user exists in your Supabase Auth dashboard.

- **Email:** `admin@hospital.com`
- **Password:** `password123`

### How to Authenticate
1. Send a `POST` request to `/auth/login` with the credentials above.
2. Copy the `access_token` from the response.
3. For all protected requests, add the header:
   ```
   Authorization: Bearer <your_access_token>
   ```

---

## 📖 API Endpoints

### 1. Authentication

#### **Login**
- **Endpoint:** `POST /auth/login`
- **Body:**
  ```json
  {
    "email": "admin@hospital.com",
    "password": "password123"
  }
  ```
- **Response:** Returns JWT `access_token` and user info.

---

### 2. Doctors

#### **List All Doctors**
- **Endpoint:** `GET /doctors`
- **Access:** Public
- **Response:** Array of active doctors.

#### **Onboard a Doctor**
- **Endpoint:** `POST /doctors`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Dr. Gregory House",
    "specialization": "Diagnostic Medicine"
  }
  ```

#### **Update Doctor Profile**
- **Endpoint:** `PATCH /doctors/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "specialization": "Nephrology"
  }
  ```

#### **Remove Doctor (Soft Delete)**
- **Endpoint:** `DELETE /doctors/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Sets `is_active` to `false`. History is preserved.

---

### 3. Patients

#### **List All Patients**
- **Endpoint:** `GET /patients`
- **Headers:** `Authorization: Bearer <token>`

#### **Get Single Patient**
- **Endpoint:** `GET /patients/:id`
- **Headers:** `Authorization: Bearer <token>`

#### **Register Patient**
- **Endpoint:** `POST /patients`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "age": 28,
    "phone": "+1-555-0199",
    "gender": "Female"
  }
  ```

#### **Update Patient Info**
- **Endpoint:** `PATCH /patients/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "phone": "+1-555-9999"
  }
  ```

#### **Delete Patient**
- **Endpoint:** `DELETE /patients/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Rule:** Only allowed if the patient has **0 appointments**. Otherwise returns `400 Bad Request`.

---

### 4. Appointments

#### **List Appointments**
- **Endpoint:** `GET /appointments`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Returns appointment details joined with Doctor and Patient names.

#### **Book Appointment**
- **Endpoint:** `POST /appointments`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "doctor_id": "uuid-of-doctor",
    "patient_id": "uuid-of-patient",
    "appointment_time": "2023-10-25T14:30:00Z",
    "notes": "Recurring headache"
  }
  ```

#### **Reschedule / Update Status**
- **Endpoint:** `PATCH /appointments/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "Completed"
  }
  ```
  *or*
  ```json
  {
    "appointment_time": "2023-10-26T10:00:00Z"
  }
  ```

#### **Cancel/Delete Appointment**
- **Endpoint:** `DELETE /appointments/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Rule:** Only allowed if status is `'Scheduled'`. Completed appointments cannot be deleted.

---

## ⚙️ Local Development Setup

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd hospital_management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root:
   ```env
   PORT=3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   ```

4. **Run Database Migrations:**
   Copy the contents of `schema.sql` and `migration_v2.sql` into your Supabase SQL Editor.

5. **Start Server:**
   ```bash
   npm run dev
   ```
