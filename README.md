# Workout Logger

A full-stack application for tracking workouts and exercises, built with React (TypeScript) frontend and Spring Boot (Java) backend.

## Features

- Create, read, update, and delete workouts
- Add exercises to workouts
- Track exercise details (sets, reps, weight, duration, notes)
- View workout summaries and statistics
- Responsive design for mobile and desktop

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Quick Start (Recommended)
Run the entire stack (frontend + backend) with one command:

```bash
docker-compose up --build
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8080/api](http://localhost:8080/api)

> **Note:** If you want to run multiple projects at once, change the `ports` in `docker-compose.yml` to avoid conflicts.

## Project Structure
```
WorkoutLogger/
  backend/      # Spring Boot backend (Java 24)
  frontend/     # React frontend (TypeScript)
  docker-compose.yml
  README.md
```

## Manual Development (Advanced)
If you prefer to run frontend and backend separately:

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
2. The backend will run on [http://localhost:8080](http://localhost:8080)

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   npm start
   ```
2. The frontend will run on [http://localhost:3000](http://localhost:3000)

> **Tip:** You can set the backend API URL in the frontend with the `REACT_APP_API_BASE_URL` environment variable.

## Environment Variables
- `REACT_APP_API_BASE_URL` (frontend): Set in `docker-compose.yml` for Docker, or in a `.env` file for manual dev.
- Default: `http://backend:8080/api` (Docker) or `http://localhost:8080/api` (manual)

## Technologies Used
- React, TypeScript, Axios, React Hook Form
- Spring Boot, Java 24, JPA/Hibernate
- Docker, Docker Compose

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Enjoy logging your workouts!**
