package com.GCremez.workoutlogger.controller;

import com.GCremez.workoutlogger.dto.DailySummaryDTO;
import com.GCremez.workoutlogger.model.Workout;
import com.GCremez.workoutlogger.service.StatService;
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

    private final StatService statService;

    @GetMapping
    public Map<String, Object> getStats() {
        return statService.getStats();
    }

    @GetMapping("/between")
    public List<Workout> getWorkoutsBetween(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return statService.getWorkoutsBetween(start, end);
    }

    @GetMapping("/daily")
    public List<DailySummaryDTO> getDailyWorkoutSummary() {
        return statService.getDailyWorkoutSummary();
    }
}
