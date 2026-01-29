package com.fitness.service;

import com.fitness.model.DietPlan;
import com.fitness.model.TrainerClient;
import com.fitness.repository.DietPlanRepository;
import com.fitness.repository.TrainerClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DietPlanService {
    private final DietPlanRepository repo;
    private final TrainerClientRepository trainerClientRepo;

    public DietPlanService(DietPlanRepository repo, TrainerClientRepository trainerClientRepo) {
        this.repo = repo;
        this.trainerClientRepo = trainerClientRepo;
    }

    public List<DietPlan> getAll() {
        return repo.findAll();
    }

    public List<DietPlan> getByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public DietPlan getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public DietPlan save(DietPlan d) {
        return repo.save(d);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    // ✅ Bulk delete
    public void deleteAll() {
        repo.deleteAll();
    }

    // ✅ Get diet plans for trainer’s clients
    public List<DietPlan> getByTrainer(Long trainerId) {
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