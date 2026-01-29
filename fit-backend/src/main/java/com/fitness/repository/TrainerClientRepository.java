package com.fitness.repository;

import com.fitness.model.TrainerClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TrainerClientRepository extends JpaRepository<TrainerClient, Long> {
    // ✅ Use relationship path to query by trainer’s id
    List<TrainerClient> findByTrainer_Id(Long trainerId);

    // ✅ Delete mapping by trainer id and user id
    @Transactional
    @Modifying
    void deleteByTrainer_IdAndUser_Id(Long trainerId, Long userId);

    // ✅ Check if mapping already exists
    boolean existsByTrainer_IdAndUser_Id(Long trainerId, Long userId);
}