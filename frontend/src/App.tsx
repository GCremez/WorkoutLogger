import React from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import { WorkoutList } from './components/WorkoutList';
import { DailySummaryChart } from './components/DailySummaryChart';
import './App.css';

function App() {
  return (
    <WorkoutProvider>
      <div className="app">
        <header className="app-header">
          <h1>Workout Logger</h1>
        </header>
        <main className="app-main">
          <section className="stats-section">
            <DailySummaryChart />
          </section>
          <section className="workouts-section">
            <WorkoutList />
          </section>
        </main>
      </div>
    </WorkoutProvider>
  );
}

export default App; 