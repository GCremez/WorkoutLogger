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
        {workouts.length === 0 ? (
          <p className="no-workouts">No workouts yet. Add your first workout!</p>
        ) : (
          workouts.map(workout => (
            <div 
              key={workout.id} 
              className="workout-card"
              onClick={() => setSelectedWorkout(workout)}
            >
              <h3>{workout.name}</h3>
              <p className="workout-date">
                {new Date(workout.date).toLocaleDateString()}
              </p>
              <p className="workout-exercises">
                {workout.exercises.length} exercises
              </p>
              <p className="workout-duration">
                Duration: {workout.duration} minutes
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutList; 