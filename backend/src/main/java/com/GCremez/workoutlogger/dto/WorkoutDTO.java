package com.GCremez.workoutlogger.dto;

import com.GCremez.workoutlogger.model.Exercise;
import com.GCremez.workoutlogger.model.Workout;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Data
public class WorkoutDTO {
    private Long id;
    private LocalDate date;
    private List<ExerciseDTO> exercises;

    public static WorkoutDTO fromEntity(Workout workout) {
        WorkoutDTO dto = new WorkoutDTO();
        dto.setId(workout.getId());
        dto.setDate(workout.getDate());
        if (workout.getExercises() != null) {
            dto.setExercises(workout.getExercises().stream()
                .map(ExerciseDTO::fromEntity)
                .collect(Collectors.toList()));
        } else {
            dto.setExercises(new ArrayList<>());
        }
        return dto;
    }
} 