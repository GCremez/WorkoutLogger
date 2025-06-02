package com.GCremez.workoutlogger.repository;

import com.GCremez.workoutlogger.dto.DailySummaryDTO;
import com.GCremez.workoutlogger.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @Query("SELECT new com.GCremez.workoutlogger.dto.DailySummaryDTO(w.date, SUM(e.duration), COUNT(e)) " +
            "FROM Workout w JOIN w.exercises e GROUP BY w.date")

    List<DailySummaryDTO> getDailyWorkoutSummary();

}
