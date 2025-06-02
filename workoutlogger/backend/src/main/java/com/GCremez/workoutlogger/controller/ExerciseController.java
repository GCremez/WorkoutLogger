package com.GCremez.workoutlogger.controller;

import com.GCremez.workoutlogger.model.Exercise;
import com.GCremez.workoutlogger.repository.ExerciseRepository;
import com.GCremez.workoutlogger.repository.WorkoutRepository;
import com.GCremez.workoutlogger.model.Workout;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseRepository exerciseRepository;
    private final WorkoutRepository workoutRepository;

    public ExerciseController(ExerciseRepository exerciseRepository, WorkoutRepository workoutRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutRepository = workoutRepository;
    }

    @PostMapping("/{workoutId}")
    public Exercise addExercise(
            @PathVariable Long workoutId,
            @RequestBody Exercise exercise) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        exercise.setWorkout(workout);
        return exerciseRepository.save(exercise);
    }

    @GetMapping("/{workoutId}")
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteExercise(@PathVariable Long id) {
        exerciseRepository.deleteById(id);
    }
}
