import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import WorkoutForm from './WorkoutForm';
import WorkoutDetail from './WorkoutDetail';
import { Workout } from '../../types';
import './WorkoutList.css';

const WorkoutList: React.FC = () => {
  const { workouts, loading, error } = useWorkout();
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  // Defensive: ensure workouts is always an array
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  // Debug: log selectedWorkout when it changes
  if (selectedWorkout) {
    // eslint-disable-next-line no-console
    console.log('Selected workout:', selectedWorkout);
  }

  if (loading) return <div className="loading">Loading workouts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="workout-list">
      <div className="workout-list-header">
        <h2>Your Workouts</h2>
        <button 
          className="add-workout-btn"
          onClick={() => setShowForm(true)}
        >
          Add Workout
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <button 
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
            <WorkoutForm 
              onSubmit={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {selectedWorkout && (
        <div className="modal">
          <div className="modal-content">
            <button 
              className="close-btn"
              onClick={() => setSelectedWorkout(null)}
            >
              ×
            </button>
            <WorkoutDetail 
              workout={selectedWorkout}
              onClose={() => setSelectedWorkout(null)}
            />
          </div>
        </div>
      )}

      <div className="workouts">
        {safeWorkouts.length === 0 ? (
          <p className="no-workouts">No workouts yet. Add your first workout!</p>
        ) : (
          safeWorkouts.map(workout => {
            // Defensive: ensure exercises is always an array
            const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];
            return (
              <div 
                key={workout.id} 
                className="workout-card"
                onClick={() => setSelectedWorkout(workout)}
              >
                <h3>{workout.name || 'N/A'}</h3>
                <p className="workout-date">
                  {workout.date && !isNaN(new Date(workout.date).getTime()) ? new Date(workout.date).toLocaleDateString() : 'Invalid Date'}
                </p>
                <p className="workout-exercises">
                  {exercises.length} exercises
                </p>
                <p className="workout-duration">
                  Duration: {workout.duration != null ? workout.duration : 'N/A'} minutes
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WorkoutList; 