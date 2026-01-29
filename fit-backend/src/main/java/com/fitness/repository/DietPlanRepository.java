package com.fitness.repository;

import com.fitness.model.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    List<DietPlan> findByUserId(Long userId);

    // ✅ For trainer’s clients
    List<DietPlan> findByUserIdIn(List<Long> userIds);
}