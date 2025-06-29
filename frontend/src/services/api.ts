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
  getAllWorkouts: async (): Promise<Workout[]> => {
    const response = await api.get('/workouts');
    return response.data;
  },

  getWorkoutById: async (id: number): Promise<Workout> => {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  },

  createWorkout: async (workout: Workout): Promise<Workout> => {
    const response = await api.post('/workouts', workout);
    return response.data;
  },

  updateWorkout: async (id: number, workout: Workout): Promise<Workout> => {
    const response = await api.put(`/workouts/${id}`, workout);
    return response.data;
  },

  deleteWorkout: async (id: number): Promise<void> => {
    await api.delete(`/workouts/${id}`);
  },

  addExercise: async (workoutId: number, exercise: Exercise): Promise<Exercise> => {
    const response = await api.post(`/workouts/${workoutId}/exercises`, exercise);
    return response.data;
  },

  updateExercise: async (workoutId: number, exerciseId: number, exercise: Exercise): Promise<Exercise> => {
    const response = await api.put(`/workouts/${workoutId}/exercises/${exerciseId}`, exercise);
    return response.data;
  },

  deleteExercise: async (workoutId: number, exerciseId: number): Promise<void> => {
    await api.delete(`/workouts/${workoutId}/exercises/${exerciseId}`);
  },
}; 