# Smart Campus Utility Application

A full-stack campus utility application with user management, issue reporting, announcements, and role-based access control.

## Structure

- `backend/` - Express API with JWT auth and SQLite-backed SQL database.
- `frontend/` - React application built with Vite.

## Features

- Student and Admin login
- Role-based authorization
- Issue reporting and lifecycle management
- Announcement creation and real-time display

## Run locally

1. Backend:
   - `cd backend`
   - `npm install`
   - `npm run dev`

2. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Notes

- The backend supports SQLite for quick local setup and MySQL for production-like databases.
- To use MySQL, set `DB_DIALECT=mysql`, `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` in `backend/.env`.
- Create the database first in MySQL, for example:
  - `CREATE DATABASE smartcampus;`
- `mysql2` is installed to support Sequelize MySQL connections.
