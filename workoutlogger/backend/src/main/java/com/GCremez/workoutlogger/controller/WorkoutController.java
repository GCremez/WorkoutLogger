package com.GCremez.workoutlogger.controller;

import com.GCremez.workoutlogger.dto.WorkoutDTO;
import com.GCremez.workoutlogger.model.Workout;
import com.GCremez.workoutlogger.repository.WorkoutRepository;
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

    private final WorkoutRepository workoutRepository;

    // 🟢 Get all workouts
    @GetMapping
    @Transactional(readOnly = true)
    public List<WorkoutDTO> getAllWorkouts() {
        return workoutRepository.findAll().stream()
            .map(WorkoutDTO::fromEntity)
            .collect(Collectors.toList());
    }

    // 🟢 Get a single workout by ID
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public WorkoutDTO getWorkoutById(@PathVariable Long id) {
        return workoutRepository.findById(id)
            .map(WorkoutDTO::fromEntity)
            .orElse(null);
    }

    // 🟢 Create a new workout
    @PostMapping
    @Transactional
    public WorkoutDTO createWorkout(@RequestBody Workout workout) {
        Workout savedWorkout = workoutRepository.save(workout);
        return WorkoutDTO.fromEntity(savedWorkout);
    }

    // 🟢 Update a workout by ID
    @PutMapping("/{id}")
    @Transactional
    public WorkoutDTO updateWorkout(@PathVariable Long id, @RequestBody Workout updatedWorkout) {
        return workoutRepository.findById(id)
            .map(existing -> {
                existing.setDate(updatedWorkout.getDate());
                existing.setExercises(updatedWorkout.getExercises());
                Workout savedWorkout = workoutRepository.save(existing);
                return WorkoutDTO.fromEntity(savedWorkout);
            })
            .orElse(null);
    }

    // 🟢 Delete a workout by ID
    @DeleteMapping("/{id}")
    @Transactional
    public void deleteWorkout(@PathVariable Long id) {
        workoutRepository.deleteById(id);
    }
}
