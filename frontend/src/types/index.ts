export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface Workout {
  id: number;
  date: string;
  name: string;
  duration: number;
  exercises: Exercise[];
  notes?: string;
}

export interface WorkoutFormData {
  date: string;
  exercises: Exercise[];
  notes?: string;
}

export interface ExerciseFormData {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalExercises: number;
  totalVolume: number;
  averageExercisesPerWorkout: number;
}

export interface DailyStats {
  date: string;
  totalExercises: number;
  totalVolume: number;
} 