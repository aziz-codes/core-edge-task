# Expense Calculator

## Overview

This project is a **Next.js 15** application using **Supabase** for authentication and database management. The app includes AI-powered functionalities, such as text generation or automated processing, leveraging OpenAI's API.

## Features

- **User Authentication:** Login, Register, and Logout with Supabase Auth.
- **AI-Powered Functionalities:** Utilizes OpenAI API for intelligent features.
- **Group Management:** Users can create and manage groups.
- **Expense Tracking:** Track and display expenses per group.
- **Protected Routes:** Middleware ensures authentication for secure pages.

---

## Tech Stack

### Frontend

- **Next.js 15** (App Router)
- **Tailwind CSS** (for styling)
- **ShadCN** (UI components)
- **React Hooks** (state & effect management)

### Backend

- **Supabase** (Authentication & Database)
- **Middleware** (Session handling)

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (Latest LTS recommended)
- **Yarn** or **npm**
- **Supabase Account** (Sign up at [https://supabase.com](https://supabase.com))

### 1. Clone the Repository

### 2. Install Dependencies

```sh
yarn install  # or npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key


```

### 4. Run the Project

```sh
yarn dev  # or npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## Authentication & AI Usage

### Supabase Authentication

- Uses **Supabase Auth** for user sign-in/sign-up.
- Middleware ensures only authenticated users access protected routes.
- Session stored in cookies for persistence.
- Logout clears the session and logs out the Supabase user.

### AI Integration (OpenAI API)

- Used for text processing and intelligent responses.

---
