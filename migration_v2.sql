-- Migration V2: Add updated_at to appointments and ensure is_active for doctors logic

-- Add updated_at to appointments
ALTER TABLE appointments ADD COLUMN updated_at timestamp with time zone;

-- Optional: Create a function to auto-update updated_at on change
-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--    NEW.updated_at = now();
--    RETURN NEW;
-- END;
-- $$ language 'plpgsql';
--
-- CREATE TRIGGER update_appointments_updated_at
-- BEFORE UPDATE ON appointments
-- FOR EACH ROW
-- EXECUTE PROCEDURE update_updated_at_column();
