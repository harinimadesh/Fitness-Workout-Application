package com.fitness.repository;

import com.fitness.model.BMIReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BMIReportRepository extends JpaRepository<BMIReport, Long> {
    // ✅ Fetch BMI reports for a single user
    List<BMIReport> findByUserId(Long userId);

    // ✅ Fetch BMI reports for multiple users (trainer’s clients)
    List<BMIReport> findByUserIdIn(List<Long> userIds);
}