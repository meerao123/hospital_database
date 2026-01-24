# Hospital Management System API

This repository contains the source code for a lightweight, type-safe REST API designed to manage core hospital operations. It focuses on the relationship between Doctors, Patients, and Appointments, strictly adhering to business logic like soft deletes for history preservation and conditional hard deletes for data integrity.

## ✨ Features

*   **Secure Authentication:** JWT-based authentication using Supabase Auth (GoTrue).
*   **Doctor Management:**
    *   **Onboarding:** Register new doctors with specialization details.
    *   **Soft Delete:** Doctors are marked "Inactive" instead of being deleted to preserve appointment history.
    *   **Profile Updates:** Edit details like specialization or active status.
*   **Patient Management:**
    *   **Registration:** Securely store patient demographics.
    *   **Conditional Delete:** Prevents deletion of patients who have existing medical history (appointments).
*   **Appointment System:**
    *   **Booking:** Link Patients to Doctors at specific times.
    *   **Lifecycle Management:** Track status (`Scheduled` → `Completed` / `Cancelled`).
    *   **Rescheduling:** Update time or notes.
    *   **Safety Checks:** Only "Scheduled" appointments can be fully deleted; others are preserved for records.
*   **Type Safety:** Built with TypeScript and Zod for rigorous runtime validation.

## 🛠️ Tech Stack

*   **Runtime:** Node.js (LTS)
*   **Language:** TypeScript
*   **Framework:** Express.js
*   **Database:** PostgreSQL (via Supabase)
*   **Authentication:** Supabase Auth
*   **Validation:** Zod
*   **Security:** Helmet, CORS
*   **Deployment:** Render.com

## 🚀 Running Locally

### Prerequisites

*   **Node.js** installed on your system.
*   **Supabase Account** for the database and auth.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd hospital_management
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup:**
    Navigate to your Supabase SQL Editor and run the contents of:
    1.  `schema.sql` (Initial tables)
    2.  `migration_v2.sql` (Updates)

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:3000`.

## 📦 Build for Production

To create a production-ready build, compile the TypeScript code to JavaScript.

```bash
npm run build
```

**Start the production server:**
```bash
npm start
```
*Note: This project is configured for deployment on Render.com.*

## 🔑 Test Credentials

To test protected endpoints (`POST`, `PATCH`, `DELETE`), use the following credentials to obtain an access token via the `/auth/login` route.

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `test@example.com` | `123456` |

## 🏗️ API Structure & Data Formats

The API follows strict REST conventions. All data is exchanged in JSON format.

### 1. Authentication
**POST** `/auth/login`
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```
*Response: Returns `{ "access_token": "..." }`. Include this token in the `Authorization` header as `Bearer <token>` for all subsequent requests.*

### 2. Doctors
**Model:**
```json
{
  "id": "uuid",
  "name": "Dr. Smith",
  "specialization": "Cardiology",
  "is_active": true
}
```

*   **GET** `/doctors` - List active doctors.
*   **POST** `/doctors` - Create a doctor.
*   **PATCH** `/doctors/:id` - Update details (e.g., `{ "specialization": "Neurology" }`).
*   **DELETE** `/doctors/:id` - Soft delete (sets `is_active: false`).

### 3. Patients
**Model:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "age": 30,
  "phone": "+1-555-0123",
  "gender": "Male"
}
```

*   **GET** `/patients` - List all patients.
*   **GET** `/patients/:id` - Get single patient details.
*   **POST** `/patients` - Register a patient.
*   **PATCH** `/patients/:id` - Update info (e.g., phone number).
*   **DELETE** `/patients/:id` - **Conditional:** Fails if patient has appointments.

### 4. Appointments
**Model:**
```json
{
  "id": "uuid",
  "doctor_id": "uuid",
  "patient_id": "uuid",
  "appointment_time": "ISO-8601 Date",
  "status": "Scheduled | Completed | Cancelled",
  "notes": "Routine Checkup"
}
```

*   **GET** `/appointments` - List all appointments (joined with Doctor/Patient names).
*   **POST** `/appointments` - Book a slot.
*   **PATCH** `/appointments/:id` - Reschedule or change status.
    *   *Payload:* `{ "status": "Completed" }`
*   **DELETE** `/appointments/:id` - **Conditional:** Only allowed if status is `Scheduled`.

## ⚠️ Important Note

The "Delete" operations in this API are designed to mimic real-world hospital data integrity rules:
*   **Doctors** are never truly deleted to ensure historical appointments still reference a valid doctor ID.
*   **Patients** cannot be deleted if they have a medical record (appointments).
*   **Completed Appointments** are financial/medical records and cannot be deleted.

## AI Usage
Google Gemini Assisted in approximately 60% of the codebase,mostly related to code structure and class design. also created the app icon via nanobanana. All AI assisted code is manually verified.

## License

This project is licensed under the MIT License.