-- Read-only catalog inspection for an administrator of the Niti Supabase project.
-- These queries do not modify schema, content, or permissions.
SELECT column_name, data_type, udt_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'chapters'
ORDER BY ordinal_position;

SELECT con.conname, pg_get_constraintdef(con.oid) AS definition
FROM pg_constraint con
JOIN pg_class rel ON con.conrelid = rel.oid
JOIN pg_namespace ns ON rel.relnamespace = ns.oid
WHERE ns.nspname = 'public' AND rel.relname = 'chapters';

SELECT indexname, indexdef FROM pg_indexes
WHERE schemaname = 'public' AND tablename = 'chapters';

SELECT rel.relrowsecurity AS rls_enabled, rel.relforcerowsecurity AS rls_forced
FROM pg_class rel JOIN pg_namespace ns ON ns.oid = rel.relnamespace
WHERE ns.nspname = 'public' AND rel.relname = 'chapters';

SELECT policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies WHERE schemaname = 'public' AND tablename = 'chapters';

SELECT trigger_name, event_manipulation, action_timing, action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'public' AND event_object_table = 'chapters';
