-- Create a table for user profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade,
  username text not null unique,
  full_name text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Create an index for faster username lookups
create index if not exists profiles_username_idx on profiles (username);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', new.email),
    new.raw_user_meta_data->>'full_name',
    new.email
  );
  return new;
end;
$$;

-- Create a trigger to automatically create a profile for new users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create tasks table
create table public.tasks (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text,
    status text not null default 'todo'::text,
    priority text not null default 'medium'::text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users not null
);

-- Enable RLS
alter table public.tasks enable row level security;

-- Create policy to allow users to manage their own tasks
create policy "Users can manage their own tasks"
    on public.tasks
    for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
