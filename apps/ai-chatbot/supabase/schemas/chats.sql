create table if not exists chats (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    created_at timestamptz default now()
);