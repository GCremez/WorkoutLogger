import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useWorkout } from '../../context/WorkoutContext';
import { Workout } from '../../types';
import './WorkoutForm.css';

interface WorkoutFormProps {
  onSubmit: () => void;
  initialData?: Workout;
}

interface WorkoutFormData {
  name: string;
  date: string;
  duration: number;
  notes?: string;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, initialData }) => {
  const { addWorkout, updateWorkout } = useWorkout();
  const { register, handleSubmit, formState: { errors } } = useForm<WorkoutFormData>({
    defaultValues: initialData || {
      name: '',
      date: new Date().toISOString().split('T')[0],
      duration: 30,
      notes: ''
    }
  });

  const onSubmitForm: SubmitHandler<WorkoutFormData> = async (data) => {
    try {
      if (initialData) {
        await updateWorkout(initialData.id, { ...initialData, ...data });
      } else {
        await addWorkout({
          ...data,
          id: 0, // This will be set by the backend
          exercises: []
        });
      }
      onSubmit();
    } catch (error) {
      console.error('Failed to save workout:', error);
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit(onSubmitForm)}>
      <h2>{initialData ? 'Edit Workout' : 'Add New Workout'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Workout Name</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Workout name is required' })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          {...register('date', { required: 'Date is required' })}
        />
        {errors.date && <span className="error">{errors.date.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration (minutes)</label>
        <input
          id="duration"
          type="number"
          min="1"
          {...register('duration', { 
            required: 'Duration is required',
            min: { value: 1, message: 'Duration must be at least 1 minute' }
          })}
        />
        {errors.duration && <span className="error">{errors.duration.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          {...register('notes')}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {initialData ? 'Update Workout' : 'Add Workout'}
        </button>
        <button type="button" className="cancel-btn" onClick={onSubmit}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm; 