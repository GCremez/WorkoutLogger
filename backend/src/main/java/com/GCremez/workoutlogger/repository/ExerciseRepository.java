package com.GCremez.workoutlogger.repository;

import com.GCremez.workoutlogger.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
