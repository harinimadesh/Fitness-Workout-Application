package com.fitness.service;

import com.fitness.model.Workout;
import com.fitness.model.TrainerClient;
import com.fitness.repository.WorkoutRepository;
import com.fitness.repository.TrainerClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {
    private final WorkoutRepository repo;
    private final TrainerClientRepository trainerClientRepo;

    public WorkoutService(WorkoutRepository repo, TrainerClientRepository trainerClientRepo) {
        this.repo = repo;
        this.trainerClientRepo = trainerClientRepo;
    }

    // Get all workouts
    public List<Workout> getAll() {
        return repo.findAll();
    }

    // Get workouts by user
    public List<Workout> getByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    // Get workout by ID
    public Workout getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Save new or updated workout
    public Workout save(Workout w) {
        return repo.save(w);
    }

    // Delete workout by ID
    public void delete(Long id) {
        repo.deleteById(id);
    }

    // ✅ Bulk delete (for AdminDashboard clear-all)
    public void deleteAll() {
        repo.deleteAll();
    }

    // ✅ Fetch all workouts for trainer’s clients using mapping table
    public List<Workout> getByTrainer(Long trainerId) {
        // Use relationship path: findByTrainer_Id
        List<TrainerClient> mappings = trainerClientRepo.findByTrainer_Id(trainerId);

        // Collect user IDs from the mapped User objects
        List<Long> userIds = mappings.stream()
                .map(tc -> tc.getUser().getId())
                .toList();

        // If trainer has no clients mapped, return empty list
        if (userIds.isEmpty()) {
            return List.of();
        }

        return repo.findByUserIdIn(userIds);
    }
}