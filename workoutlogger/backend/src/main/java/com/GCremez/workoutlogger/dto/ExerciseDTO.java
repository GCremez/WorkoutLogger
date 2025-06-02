package com.GCremez.workoutlogger.dto;

import com.GCremez.workoutlogger.model.Exercise;
import lombok.Data;

@Data
public class ExerciseDTO {
    private Long id;
    private String name;
    private Integer sets;
    private Integer reps;
    private Double weight;

    public static ExerciseDTO fromEntity(Exercise exercise) {
        ExerciseDTO dto = new ExerciseDTO();
        dto.setId(exercise.getId());
        dto.setName(exercise.getName());
        dto.setSets(exercise.getSets());
        dto.setReps(exercise.getReps());
        dto.setWeight(exercise.getWeight());
        return dto;
    }
} 