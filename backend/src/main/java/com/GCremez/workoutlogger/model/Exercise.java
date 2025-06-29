package com.GCremez.workoutlogger.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Entity
@Data
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    private String type; // e.g., "strength", "cardio"
    private int sets;
    private int reps;
    private double weight;
    private long duration;


    @ManyToOne
    @JoinColumn(name = "workout_id")
    private Workout workout; // Assuming 'workout' is the name of the class representing a workout session

}
