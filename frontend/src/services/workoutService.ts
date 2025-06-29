import axios from 'axios';
import { Workout, Exercise } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const workoutService = {
  // Workout endpoints
  getAllWorkouts: async (): Promise<Workout[]> => {
    try {
      const response = await api.get('/workouts');
      return response.data;
    } catch (error) {
      console.error('Error fetching workouts:', error);
      throw error;
    }
  },

  getWorkoutById: async (id: number): Promise<Workout> => {
    try {
      const response = await api.get(`/workouts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching workout ${id}:`, error);
      throw error;
    }
  },

  createWorkout: async (workout: Workout): Promise<Workout> => {
    try {
      const response = await api.post('/workouts', workout);
      return response.data;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
    }
  },

  updateWorkout: async (id: number, workout: Workout): Promise<Workout> => {
    try {
      const response = await api.put(`/workouts/${id}`, workout);
      return response.data;
    } catch (error) {
      console.error(`Error updating workout ${id}:`, error);
      throw error;
    }
  },

  deleteWorkout: async (id: number): Promise<void> => {
    try {
      await api.delete(`/workouts/${id}`);
    } catch (error) {
      console.error(`Error deleting workout ${id}:`, error);
      throw error;
    }
  },

  // Exercise endpoints
  addExercise: async (workoutId: number, exercise: Exercise): Promise<Exercise> => {
    try {
      const response = await api.post(`/workouts/${workoutId}/exercises`, exercise);
      return response.data;
    } catch (error) {
      console.error(`Error adding exercise to workout ${workoutId}:`, error);
      throw error;
    }
  },

  updateExercise: async (workoutId: number, exerciseId: number, exercise: Exercise): Promise<Exercise> => {
    try {
      const response = await api.put(`/workouts/${workoutId}/exercises/${exerciseId}`, exercise);
      return response.data;
    } catch (error) {
      console.error(`Error updating exercise ${exerciseId} in workout ${workoutId}:`, error);
      throw error;
    }
  },

  deleteExercise: async (workoutId: number, exerciseId: number): Promise<void> => {
    try {
      await api.delete(`/workouts/${workoutId}/exercises/${exerciseId}`);
    } catch (error) {
      console.error(`Error deleting exercise ${exerciseId} from workout ${workoutId}:`, error);
      throw error;
    }
  },

  // Statistics endpoints
  getWorkoutStats: async (): Promise<{
    totalWorkouts: number;
    totalExercises: number;
    totalVolume: number;
    averageExercisesPerWorkout: number;
  }> => {
    try {
      const response = await api.get('/workouts/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching workout stats:', error);
      throw error;
    }
  },

  getDailyStats: async (days: number = 7): Promise<{
    date: string;
    exerciseCount: number;
    totalVolume: number;
  }[]> => {
    try {
      const response = await api.get(`/workouts/stats/daily?days=${days}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching daily stats:', error);
      throw error;
    }
  }
}; 