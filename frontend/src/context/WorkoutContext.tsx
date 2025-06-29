import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout, Exercise } from '../types';
import { workoutService } from '../services/workoutService';

interface WorkoutContextType {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  stats: {
    totalWorkouts: number;
    totalExercises: number;
    totalVolume: number;
    averageExercisesPerWorkout: number;
  } | null;
  addWorkout: (workout: Workout) => Promise<void>;
  updateWorkout: (id: number, workout: Workout) => Promise<void>;
  deleteWorkout: (id: number) => Promise<void>;
  addExercise: (workoutId: number, exercise: Exercise) => Promise<void>;
  updateExercise: (workoutId: number, exerciseId: number, exercise: Exercise) => Promise<void>;
  deleteExercise: (workoutId: number, exerciseId: number) => Promise<void>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<WorkoutContextType['stats']>(null);

  useEffect(() => {
    loadWorkouts();
    loadStats();
  }, []);

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const data = await workoutService.getAllWorkouts();
      setWorkouts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load workouts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await workoutService.getWorkoutStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const addWorkout = async (workout: Workout) => {
    try {
      const newWorkout = await workoutService.createWorkout(workout);
      setWorkouts([...workouts, newWorkout]);
      await loadStats(); // Reload stats after adding workout
    } catch (err) {
      setError('Failed to add workout');
      throw err;
    }
  };

  const updateWorkout = async (id: number, workout: Workout) => {
    try {
      const updatedWorkout = await workoutService.updateWorkout(id, workout);
      setWorkouts(workouts.map(w => w.id === id ? updatedWorkout : w));
      await loadStats(); // Reload stats after updating workout
    } catch (err) {
      setError('Failed to update workout');
      throw err;
    }
  };

  const deleteWorkout = async (id: number) => {
    try {
      await workoutService.deleteWorkout(id);
      setWorkouts(workouts.filter(w => w.id !== id));
      await loadStats(); // Reload stats after deleting workout
    } catch (err) {
      setError('Failed to delete workout');
      throw err;
    }
  };

  const addExercise = async (workoutId: number, exercise: Exercise) => {
    try {
      const newExercise = await workoutService.addExercise(workoutId, exercise);
      setWorkouts(workouts.map(workout => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            exercises: [...workout.exercises, newExercise]
          };
        }
        return workout;
      }));
      await loadStats(); // Reload stats after adding exercise
    } catch (err) {
      setError('Failed to add exercise');
      throw err;
    }
  };

  const updateExercise = async (workoutId: number, exerciseId: number, exercise: Exercise) => {
    try {
      const updatedExercise = await workoutService.updateExercise(workoutId, exerciseId, exercise);
      setWorkouts(workouts.map(workout => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            exercises: workout.exercises.map(ex => 
              ex.id === exerciseId ? updatedExercise : ex
            )
          };
        }
        return workout;
      }));
      await loadStats(); // Reload stats after updating exercise
    } catch (err) {
      setError('Failed to update exercise');
      throw err;
    }
  };

  const deleteExercise = async (workoutId: number, exerciseId: number) => {
    try {
      await workoutService.deleteExercise(workoutId, exerciseId);
      setWorkouts(workouts.map(workout => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            exercises: workout.exercises.filter(ex => ex.id !== exerciseId)
          };
        }
        return workout;
      }));
      await loadStats(); // Reload stats after deleting exercise
    } catch (err) {
      setError('Failed to delete exercise');
      throw err;
    }
  };

  return (
    <WorkoutContext.Provider value={{
      workouts,
      loading,
      error,
      stats,
      addWorkout,
      updateWorkout,
      deleteWorkout,
      addExercise,
      updateExercise,
      deleteExercise
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}; 