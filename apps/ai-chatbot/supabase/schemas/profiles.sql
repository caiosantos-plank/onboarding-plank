create table if not exists profiles (
    id uuid primary key references auth.users(id) on delete cascade on update cascade,
    email text unique,
    username text,
    full_name text,
    avatar_url text,
    website text,
    updated_at timestamptz
);