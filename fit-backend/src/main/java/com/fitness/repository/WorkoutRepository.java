package com.fitness.repository;

import com.fitness.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    // Get workouts for a single user
    List<Workout> findByUserId(Long userId);

    // ✅ Get workouts for multiple users (trainer’s clients)
    List<Workout> findByUserIdIn(List<Long> userIds);
}