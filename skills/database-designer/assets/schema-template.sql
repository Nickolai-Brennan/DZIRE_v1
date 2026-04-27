-- Schema Template for DZIRE_v1
-- Replace [table_name] with the actual plural snake_case table name
-- Replace [field_*] with actual column names

CREATE TABLE IF NOT EXISTS [table_name] (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Add domain-specific columns below
    [field_one] VARCHAR(255)    NOT NULL,
    [field_two] TEXT,
    is_active   BOOLEAN         NOT NULL DEFAULT TRUE,
    -- Foreign key example (uncomment and customize as needed):
    -- [parent]_id UUID NOT NULL REFERENCES [parent_table](id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_[table_name]_[field_one] ON [table_name]([field_one]);
-- CREATE INDEX IF NOT EXISTS idx_[table_name]_[parent]_id ON [table_name]([parent]_id);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_[table_name]_updated_at
    BEFORE UPDATE ON [table_name]
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Seed data (idempotent)
INSERT INTO [table_name] (id, [field_one], [field_two])
VALUES
    ('00000000-0000-0000-0000-000000000001', 'Seed Record 1', 'Description 1'),
    ('00000000-0000-0000-0000-000000000002', 'Seed Record 2', 'Description 2'),
    ('00000000-0000-0000-0000-000000000003', 'Seed Record 3', 'Description 3')
ON CONFLICT (id) DO NOTHING;
