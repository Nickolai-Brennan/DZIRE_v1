-- database/indexes/positions_indexes.sql
-- Owner: database-agent
-- Purpose: Performance indexes for the positions table

CREATE INDEX IF NOT EXISTS idx_positions_slug        ON positions (slug);
CREATE INDEX IF NOT EXISTS idx_positions_category    ON positions (category);
CREATE INDEX IF NOT EXISTS idx_positions_is_published ON positions (is_published);
