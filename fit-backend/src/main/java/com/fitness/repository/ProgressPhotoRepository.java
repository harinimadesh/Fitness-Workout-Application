package com.fitness.repository;

import com.fitness.model.ProgressPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgressPhotoRepository extends JpaRepository<ProgressPhoto, Long> {
    List<ProgressPhoto> findByUserId(Long userId);

    // ✅ New: query by multiple userIds
    List<ProgressPhoto> findByUserIdIn(List<Long> userIds);
}