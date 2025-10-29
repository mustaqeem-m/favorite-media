# Favorite Media Tracker

A full-stack web application to track your favorite movies and TV shows. Built with a React frontend and a Node.js/Express backend.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Prisma
- **Database:** MySQL
- **Deployment:** Frontend on Vercel, Backend on Railway

---

## Getting Started

This guide provides detailed instructions to get the project running on your local machine for development and testing.

### Prerequisites

Before you begin, ensure you have the following software installed on your system:

- **Node.js:** This project uses Node.js as the runtime for both the backend and the frontend development server. It's recommended to use version 18.x or later. You can download it from [nodejs.org](https://nodejs.org/).
- **npm (Node Package Manager):** npm is included with Node.js and is used to manage project dependencies.
- **MySQL Database:** You need a running MySQL server. This can be installed locally (e.g., via MySQL Community Server, XAMPP, WAMP) or you can use a cloud-based service. You must have the ability to create a new database.

### Installation

1. **Clone the repository:**
   Open your terminal, navigate to where you want to store the project, and run the following command:
   ```sh
   git clone <repository-url>
   ```

2. **Navigate into the project directory:**
   ```sh
   cd favorite-media
   ```

---

## Backend Setup (Detailed)

The backend is an Express.js server that connects to the MySQL database via Prisma.

1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```

2. **Install Dependencies:**
   Run `npm install` to download all the necessary libraries defined in `package.json`. This includes Express for the server, Prisma for database access, and other utility packages.
   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**
   The backend requires a `.env` file for configuration. This file is for sensitive information and is ignored by Git.

   Create a new file named `.env` inside the `backend` folder.

   Populate it with the following content:
   ```env
   # This is the connection string for your MySQL database.
   # It follows the format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
   DATABASE_URL="mysql://root:mysecretpassword@127.0.0.1:3306/favorite_media"
   
   # This is a secret key for signing JSON Web Tokens (JWTs) for authentication.
   # Use a long, random, and secret string here.
   JWT_SECRET="YOUR_SUPER_SECRET_STRING_CHANGE_ME"
   ```
   **Important:** You must replace the `DATABASE_URL` with the correct connection string for your own local MySQL database. 

4. **Database Schema and Migrations (Detailed):**
   This project uses **Prisma Migrate** to manage the database schema. The schema is defined in `prisma/schema.prisma`. Migrations are version-controlled changes to your database structure.

   To create the database and all its tables, run the following command:
   ```sh
   npx prisma migrate dev
   ```
   This command will:
   - **Read** your `prisma/schema.prisma` file.
   - **Create** the database (e.g., `favorite_media`) in your MySQL server if it doesn't already exist.
   - **Apply** all existing migration files from the `prisma/migrations` directory to set up the `User`, `Entry`, and other tables.
   - **Generate** the Prisma Client, which is a type-safe database client used by the application to talk to the database.

5. **Run the Backend Development Server:**
   Start the server in development mode. It uses `ts-node-dev` to automatically re-run the server when you make changes to the code.
   ```sh
   npm run dev
   ```
   The backend server will now be running and listening for requests, typically on `http://localhost:8080`.

---

## Frontend Setup (Detailed)

The frontend is a React application built with Vite, providing a fast development experience.

1. **Navigate to the frontend directory (from the root):**
   ```sh
   cd frontend
   ```

2. **Install Dependencies:**
   Run `npm install` to download all the necessary libraries for the frontend, such as React, React Router, and Tailwind CSS.
   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**
   The frontend needs to know the address of the backend API. This is configured via a `.env` file.

   Create a new file named `.env` inside the `frontend` folder.

   Populate it with the following content:
   ```env
   # This variable tells the frontend where to send API requests.
   # For local development, this must be the URL of your local backend server.
   VITE_API_URL=http://localhost:8080
   ```

4. **Run the Frontend Development Server:**
   Start the Vite development server. This will open a new site in your browser.
   ```sh
   npm run dev
   ```
   The frontend will now be running, typically on `http://localhost:5173`, and will be able to communicate with your local backend.

---

## Authentication & Demo Credentials

The application requires users to register and log in to manage their media entries.

- **Registration:** Please use the UI on the running application to register a new user first.
- **Demo User:** You can use the following credentials after registering the user through the UI.
  - **Email:** `user@gmail.com`
  - **Password:** `User`