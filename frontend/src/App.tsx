import React from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import WorkoutList from './features/workouts/WorkoutList';
import DailySummaryChart from './features/workouts/DailySummaryChart';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return <div>Welcome to Workout Logger!</div>;
}

function Stats() {
  return <DailySummaryChart />;
}

function Workouts() {
  return <WorkoutList />;
}

function App() {
  return (
    <WorkoutProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>Workout Logger</h1>
            <nav>
              <Link to="/">Home</Link> | <Link to="/workouts">Workouts</Link> | <Link to="/stats">Stats</Link>
            </nav>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WorkoutProvider>
  );
}

export default App; 