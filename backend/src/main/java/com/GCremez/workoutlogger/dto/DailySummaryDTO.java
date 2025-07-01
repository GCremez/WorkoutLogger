package com.GCremez.workoutlogger.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
public class DailySummaryDTO {
    private LocalDate date;
    private Long totalDuration; // in seconds
    private Long totalExercises;
    private Double totalVolume;

    public DailySummaryDTO(LocalDate date, Long totalDuration, Long totalExercises, Double totalVolume) {
        this.date = date;
        this.totalDuration = totalDuration;
        this.totalExercises = totalExercises;
        this.totalVolume = totalVolume;
    }
}

