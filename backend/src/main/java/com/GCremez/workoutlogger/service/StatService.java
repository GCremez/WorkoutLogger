package com.GCremez.workoutlogger.service;

import com.GCremez.workoutlogger.dto.DailySummaryDTO;
import com.GCremez.workoutlogger.model.Workout;
import com.GCremez.workoutlogger.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatService {
    private final WorkoutRepository workoutRepository;

    @Autowired
    public StatService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

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

    public List<Workout> getWorkoutsBetween(LocalDate start, LocalDate end) {
        return workoutRepository.findAll().stream()
                .filter(w -> !w.getDate().isBefore(start) && !w.getDate().isAfter(end))
                .collect(Collectors.toList());
    }

    public List<DailySummaryDTO> getDailyWorkoutSummary() {
        return workoutRepository.getDailyWorkoutSummary();
    }
} 