package com.GCremez.workoutlogger.controller;

import com.GCremez.workoutlogger.dto.DailySummaryDTO;
import com.GCremez.workoutlogger.model.Workout;
import com.GCremez.workoutlogger.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatController {

    private final WorkoutRepository workoutRepository;


    @GetMapping
    public Map<String, Object> getStats() {
        List<Workout> workouts = workoutRepository.findAll();
        int totalWorkouts = workouts.size();
        int totalExercises = 0;
        double totalVolume = 0;

        for (Workout w : workouts) {
            if (w.getExercises() != null) {
                totalExercises += w.getExercises().size();
                for (var ex : w.getExercises()) {
                    totalVolume += ex.getWeight() * ex.getSets() * ex.getReps();
                }
            }
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalWorkouts", totalWorkouts);
        stats.put("totalExercises", totalExercises);
        stats.put("totalVolumeLifted", totalVolume);
        return stats;
    }


    @GetMapping("/between")
    public List<Workout> getWorkoutsBetween(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return workoutRepository.findAll().stream()
                .filter(w -> !w.getDate().isBefore(start) && !w.getDate().isAfter(end))
                .toList();
    }


    @GetMapping("/daily")
    public List<DailySummaryDTO> getDailyWorkoutSummary() {
        return workoutRepository.getDailyWorkoutSummary();
    }
}
