# Workout Logger Frontend

A React TypeScript application for tracking workouts and exercises.

## Features

- Create, read, update, and delete workouts
- Add exercises to workouts
- Track exercise details (sets, reps, weight, duration)
- View workout summaries and statistics
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd workout-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Project Structure

```
src/
  ├── components/         # React components
  ├── services/          # API services
  ├── types/             # TypeScript type definitions
  ├── App.tsx           # Main application component
  ├── index.tsx         # Application entry point
  └── ...
```

## Technologies Used

- React
- TypeScript
- React Router
- React Hook Form
- Axios
- CSS3

## API Integration

The frontend application communicates with a backend API running at `http://localhost:8081/api`. Make sure the backend server is running before starting the frontend application.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
