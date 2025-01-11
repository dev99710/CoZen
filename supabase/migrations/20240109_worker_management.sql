-- Create workers table
create table if not exists public.workers (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    name text not null,
    phone text,
    hourly_rate decimal(10,2) not null,
    skills text[],
    status text check (status in ('active', 'inactive', 'on_leave')) default 'active',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tasks table
create table if not exists public.tasks (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    worker_id uuid references public.workers(id) on delete set null,
    title text not null,
    description text,
    status text check (status in ('pending', 'in_progress', 'completed', 'cancelled')) default 'pending',
    priority text check (priority in ('low', 'medium', 'high')) default 'medium',
    estimated_hours decimal(10,2),
    actual_hours decimal(10,2),
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create time_entries table for tracking work hours
create table if not exists public.time_entries (
    id uuid default uuid_generate_v4() primary key,
    task_id uuid references public.tasks(id) on delete cascade,
    worker_id uuid references public.workers(id) on delete cascade,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone,
    hours_worked decimal(10,2),
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create expenses table
create table if not exists public.expenses (
    id uuid default uuid_generate_v4() primary key,
    task_id uuid references public.tasks(id) on delete cascade,
    worker_id uuid references public.workers(id) on delete cascade,
    amount decimal(10,2) not null,
    description text not null,
    date timestamp with time zone not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.workers enable row level security;
alter table public.tasks enable row level security;
alter table public.time_entries enable row level security;
alter table public.expenses enable row level security;

-- Create policies
create policy "Users can view their own workers"
    on workers for select
    using (auth.uid() = user_id);

create policy "Users can create workers"
    on workers for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own workers"
    on workers for update
    using (auth.uid() = user_id);

create policy "Users can delete their own workers"
    on workers for delete
    using (auth.uid() = user_id);

create policy "Users can view their own tasks"
    on tasks for select
    using (auth.uid() = user_id);

create policy "Users can create tasks"
    on tasks for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
    on tasks for update
    using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
    on tasks for delete
    using (auth.uid() = user_id);

create policy "Users can view their own time entries"
    on time_entries for select
    using (
        exists (
            select 1 from tasks
            where tasks.id = time_entries.task_id
            and tasks.user_id = auth.uid()
        )
    );

create policy "Users can create time entries for their tasks"
    on time_entries for insert
    with check (
        exists (
            select 1 from tasks
            where tasks.id = time_entries.task_id
            and tasks.user_id = auth.uid()
        )
    );

create policy "Users can update time entries for their tasks"
    on time_entries for update
    using (
        exists (
            select 1 from tasks
            where tasks.id = time_entries.task_id
            and tasks.user_id = auth.uid()
        )
    );

create policy "Users can view their own expenses"
    on expenses for select
    using (
        exists (
            select 1 from tasks
            where tasks.id = expenses.task_id
            and tasks.user_id = auth.uid()
        )
    );

create policy "Users can create expenses for their tasks"
    on expenses for insert
    with check (
        exists (
            select 1 from tasks
            where tasks.id = expenses.task_id
            and tasks.user_id = auth.uid()
        )
    );

-- Create functions for automatic updates
create or replace function update_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger workers_updated_at
    before update on workers
    for each row
    execute function update_updated_at();

create trigger tasks_updated_at
    before update on tasks
    for each row
    execute function update_updated_at();

create trigger time_entries_updated_at
    before update on time_entries
    for each row
    execute function update_updated_at();

create trigger expenses_updated_at
    before update on expenses
    for each row
    execute function update_updated_at();

-- Create function to calculate task cost
create or replace function calculate_task_cost(task_uuid uuid)
returns decimal as $$
declare
    labor_cost decimal;
    expense_cost decimal;
begin
    -- Calculate labor cost
    select coalesce(sum(te.hours_worked * w.hourly_rate), 0)
    into labor_cost
    from time_entries te
    join workers w on w.id = te.worker_id
    where te.task_id = task_uuid;

    -- Calculate expenses
    select coalesce(sum(amount), 0)
    into expense_cost
    from expenses
    where task_id = task_uuid;

    -- Return total cost
    return labor_cost + expense_cost;
end;
$$ language plpgsql;
