import React from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import './DailySummaryChart.css';

const DailySummaryChart: React.FC = () => {
  const { workouts } = useWorkout();

  // Defensive: ensure workouts is always an array
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  // Calculate total exercises and volume for each day
  const dailyStats = safeWorkouts.reduce((acc, workout) => {
    const date = new Date(workout.date).toLocaleDateString();
    // Defensive: ensure exercises is always an array
    const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];
    const totalVolume = exercises.reduce((sum, exercise) => {
      return sum + (exercise.sets * exercise.reps * exercise.weight);
    }, 0);

    if (!acc[date]) {
      acc[date] = {
        exerciseCount: 0,
        totalVolume: 0,
      };
    }

    acc[date].exerciseCount += exercises.length;
    acc[date].totalVolume += totalVolume;

    return acc;
  }, {} as Record<string, { exerciseCount: number; totalVolume: number }>);

  // Get the last 7 days of data
  const last7Days = Object.entries(dailyStats)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .slice(0, 7)
    .reverse();

  return (
    <div className="daily-summary">
      <h2>Last 7 Days Summary</h2>
      <div className="chart-container">
        {last7Days.map(([date, stats]) => (
          <div key={date} className="chart-bar">
            <div className="bar-label">{date}</div>
            <div className="bar-container">
              <div
                className="bar"
                style={{
                  height: `${(stats.exerciseCount / 20) * 100}%`,
                }}
              />
            </div>
            <div className="bar-stats">
              <div>{stats.exerciseCount} exercises</div>
              <div>{Math.round(stats.totalVolume)} kg total</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailySummaryChart; 