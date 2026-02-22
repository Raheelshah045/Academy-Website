# 🗄️ Almaas Quran Academy - Database Setup Guide

To make your reviews permanent and visible to everyone, we are using **Supabase** (a free and powerful database). Follow these simple steps to set it up:

## 1. Create a Supabase Account
1. Go to [supabase.com](https://supabase.com) and sign up for a free account.
2. Click **"New Project"**.
3. Name it: `Almaas Academy`
4. Set a password and choose a region near you.
5. Wait for the database to be ready (takes about 1-2 minutes).

## 2. Create the Reviews Table
Once your project is ready:
1. On the left sidebar, click **"SQL Editor"**.
2. Click **"+ New Query"**.
3. Paste the following code and click **"Run"**:

```sql
-- Create the reviews table
create table reviews (
  id bigint primary key generated always as identity,
  name text not null,
  rating integer not null,
  text text not null,
  date text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Read access for everyone
create policy "Allow public read access"
  on reviews for select
  using (true);

-- Enable Write access for everyone (for now)
create policy "Allow public insert access"
  on reviews for insert
  with check (true);

-- Enable Row Level Security (RLS)
alter table reviews enable row level security;
```

## 3. Get Your API Credentials
1. Click the **"Settings"** (gear icon) on the left sidebar.
2. Go to **"API"**.
3. You will see:
   - **Project URL**: Copy this.
   - **Project API keys (anon public)**: Copy this.

## 4. Connect to Your Website
Open `src/App.js` and find the `DATABASE CONFIG` section (near the top). 
Paste your URL and Key there:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

---

### ✅ Done!
Now every review submitted will be stored in your database forever, and everyone visiting the site will see them!
