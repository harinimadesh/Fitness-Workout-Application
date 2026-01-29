package com.fitness.service;

import com.fitness.model.ProgressPhoto;
import com.fitness.model.TrainerClient;
import com.fitness.repository.ProgressPhotoRepository;
import com.fitness.repository.TrainerClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressPhotoService {
    private final ProgressPhotoRepository repo;
    private final TrainerClientRepository trainerClientRepo;

    public ProgressPhotoService(ProgressPhotoRepository repo, TrainerClientRepository trainerClientRepo) {
        this.repo = repo;
        this.trainerClientRepo = trainerClientRepo;
    }

    public List<ProgressPhoto> getAll() {
        return repo.findAll();
    }

    public List<ProgressPhoto> getByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public ProgressPhoto getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public ProgressPhoto save(ProgressPhoto p) {
        return repo.save(p);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public void deleteAll() {
        repo.deleteAll();
    }

    // ✅ Fetch all progress photos for trainer’s clients using mapping table
    public List<ProgressPhoto> getByTrainer(Long trainerId) {
        // Use relationship path: findByTrainer_Id
        List<TrainerClient> mappings = trainerClientRepo.findByTrainer_Id(trainerId);

        // Collect user IDs from the mapped User objects
        List<Long> userIds = mappings.stream()
                .map(tc -> tc.getUser().getId())
                .toList();

        if (userIds.isEmpty()) return List.of();
        return repo.findByUserIdIn(userIds);
    }
}