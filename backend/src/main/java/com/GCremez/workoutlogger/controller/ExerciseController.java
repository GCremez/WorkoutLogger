package com.GCremez.workoutlogger.controller;

import com.GCremez.workoutlogger.model.Exercise;
import com.GCremez.workoutlogger.repository.WorkoutRepository;
import com.GCremez.workoutlogger.model.Workout;
import com.GCremez.workoutlogger.service.ExerciseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;
    private final WorkoutRepository workoutRepository;

    public ExerciseController(ExerciseService exerciseService, WorkoutRepository workoutRepository) {
        this.exerciseService = exerciseService;
        this.workoutRepository = workoutRepository;
    }

    @PostMapping("/{workoutId}")
    public Exercise addExercise(
            @PathVariable Long workoutId,
            @RequestBody Exercise exercise) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        exercise.setWorkout(workout);
        return exerciseService.saveExercise(exercise);
    }

    @GetMapping
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @DeleteMapping("/{id}")
    public void deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
    }
}
