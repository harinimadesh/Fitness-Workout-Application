package com.fitness.repository;

import com.fitness.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    // ✅ Find trainer by linked userId
    Trainer findByUserId(Long userId);
}