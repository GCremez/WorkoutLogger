import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Exercise } from '../../types';
import './ExerciseForm.css';

interface ExerciseFormProps {
  onSubmit: (exercise: Exercise) => void;
  onCancel: () => void;
  initialData?: Exercise;
}

interface ExerciseFormData {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ExerciseFormData>({
    defaultValues: initialData || {
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      notes: ''
    }
  });

  const onSubmitForm: SubmitHandler<ExerciseFormData> = (data) => {
    onSubmit({
      ...data,
      id: initialData?.id || 0 // This will be set by the backend
    });
  };

  return (
    <form className="exercise-form" onSubmit={handleSubmit(onSubmitForm)}>
      <h3>{initialData ? 'Edit Exercise' : 'Add Exercise'}</h3>
      
      <div className="form-group">
        <label htmlFor="name">Exercise Name</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Exercise name is required' })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="sets">Sets</label>
        <input
          id="sets"
          type="number"
          min="1"
          {...register('sets', { 
            required: 'Number of sets is required',
            min: { value: 1, message: 'Must be at least 1 set' }
          })}
        />
        {errors.sets && <span className="error">{errors.sets.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="reps">Reps</label>
        <input
          id="reps"
          type="number"
          min="1"
          {...register('reps', { 
            required: 'Number of reps is required',
            min: { value: 1, message: 'Must be at least 1 rep' }
          })}
        />
        {errors.reps && <span className="error">{errors.reps.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight (kg)</label>
        <input
          id="weight"
          type="number"
          min="0"
          step="0.5"
          {...register('weight', { 
            required: 'Weight is required',
            min: { value: 0, message: 'Weight cannot be negative' }
          })}
        />
        {errors.weight && <span className="error">{errors.weight.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          {...register('notes')}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {initialData ? 'Update Exercise' : 'Add Exercise'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm; 