import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import { Workout, Exercise } from '../../types';
import ExerciseForm from './ExerciseForm';
import './WorkoutDetail.css';

interface WorkoutDetailProps {
  workout: Workout;
  onClose: () => void;
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ workout, onClose }) => {
  const { updateWorkout, deleteWorkout, addExercise, updateExercise, deleteExercise } = useWorkout();
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const handleAddExercise = async (exercise: Exercise) => {
    try {
      await addExercise(workout.id, exercise);
      setShowExerciseForm(false);
    } catch (error) {
      console.error('Failed to add exercise:', error);
    }
  };

  const handleUpdateExercise = async (exerciseId: number, exercise: Exercise) => {
    try {
      await updateExercise(workout.id, exerciseId, exercise);
      setEditingExercise(null);
    } catch (error) {
      console.error('Failed to update exercise:', error);
    }
  };

  const handleDeleteExercise = async (exerciseId: number) => {
    try {
      await deleteExercise(workout.id, exerciseId);
    } catch (error) {
      console.error('Failed to delete exercise:', error);
    }
  };

  const handleDeleteWorkout = async () => {
    try {
      await deleteWorkout(workout.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete workout:', error);
    }
  };

  return (
    <div className="workout-detail">
      <div className="workout-header">
        <h2>{workout.name}</h2>
        <p className="workout-date">
          {new Date(workout.date).toLocaleDateString()}
        </p>
        <p className="workout-duration">
          Duration: {workout.duration} minutes
        </p>
        {workout.notes && (
          <p className="workout-notes">{workout.notes}</p>
        )}
      </div>

      <div className="exercises-section">
        <div className="exercises-header">
          <h3>Exercises</h3>
          <button
            className="add-exercise-btn"
            onClick={() => setShowExerciseForm(true)}
          >
            Add Exercise
          </button>
        </div>

        {showExerciseForm && (
          <div className="exercise-form-container">
            <ExerciseForm
              onSubmit={handleAddExercise}
              onCancel={() => setShowExerciseForm(false)}
            />
          </div>
        )}

        {editingExercise && (
          <div className="exercise-form-container">
            <ExerciseForm
              initialData={editingExercise}
              onSubmit={(exercise) => handleUpdateExercise(editingExercise.id, exercise)}
              onCancel={() => setEditingExercise(null)}
            />
          </div>
        )}

        <div className="exercises-list">
          {workout.exercises.length === 0 ? (
            <p className="no-exercises">No exercises added yet.</p>
          ) : (
            workout.exercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <h4>{exercise.name}</h4>
                <p className="exercise-details">
                  {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}kg
                </p>
                {exercise.notes && (
                  <p className="exercise-notes">{exercise.notes}</p>
                )}
                <div className="exercise-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setEditingExercise(exercise)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteExercise(exercise.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="workout-actions">
        <button
          className="delete-workout-btn"
          onClick={handleDeleteWorkout}
        >
          Delete Workout
        </button>
        <button
          className="close-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetail; 