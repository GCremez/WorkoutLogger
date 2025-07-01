package com.GCremez.workoutlogger.controller;

import com.GCremez.workoutlogger.dto.WorkoutDTO;
import com.GCremez.workoutlogger.model.Workout;
import com.GCremez.workoutlogger.service.WorkoutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    // 🟢 Get all workouts
    @GetMapping
    @Transactional(readOnly = true)
    public List<WorkoutDTO> getAllWorkouts() {
        return workoutService.getAllWorkouts().stream()
            .map(WorkoutDTO::fromEntity)
            .collect(Collectors.toList());
    }

    // 🟢 Get a single workout by ID
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public WorkoutDTO getWorkoutById(@PathVariable Long id) {
        return workoutService.getWorkoutById(id)
            .map(WorkoutDTO::fromEntity)
            .orElse(null);
    }

    // 🟢 Create a new workout
    @PostMapping
    @Transactional
    public WorkoutDTO createWorkout(@Valid @RequestBody Workout workout) {
        Workout savedWorkout = workoutService.saveWorkout(workout);
        return WorkoutDTO.fromEntity(savedWorkout);
    }

    // 🟢 Update a workout by ID
    @PutMapping("/{id}")
    @Transactional
    public WorkoutDTO updateWorkout(@PathVariable Long id, @Valid @RequestBody Workout updatedWorkout) {
        return workoutService.getWorkoutById(id)
            .map(existing -> {
                existing.setDate(updatedWorkout.getDate());
                existing.setExercises(updatedWorkout.getExercises());
                Workout savedWorkout = workoutService.saveWorkout(existing);
                return WorkoutDTO.fromEntity(savedWorkout);
            })
            .orElse(null);
    }

    // 🟢 Delete a workout by ID
    @DeleteMapping("/{id}")
    @Transactional
    public void deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
    }
}
