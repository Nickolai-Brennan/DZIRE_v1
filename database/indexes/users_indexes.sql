-- database/indexes/users_indexes.sql
-- Owner: database-agent
-- Purpose: Performance indexes for the users table

CREATE INDEX IF NOT EXISTS idx_users_email    ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
CREATE INDEX IF NOT EXISTS idx_users_role     ON users (role);
