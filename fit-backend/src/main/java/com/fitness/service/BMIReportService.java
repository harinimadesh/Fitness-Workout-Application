package com.fitness.service;

import com.fitness.model.BMIReport;
import com.fitness.model.TrainerClient;
import com.fitness.repository.BMIReportRepository;
import com.fitness.repository.TrainerClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BMIReportService {
    private final BMIReportRepository repo;
    private final TrainerClientRepository trainerClientRepo;

    public BMIReportService(BMIReportRepository repo, TrainerClientRepository trainerClientRepo) {
        this.repo = repo;
        this.trainerClientRepo = trainerClientRepo;
    }

    public List<BMIReport> getAll() {
        return repo.findAll();
    }

    public List<BMIReport> getByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public BMIReport getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public BMIReport save(BMIReport r) {
        return repo.save(r);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    // ✅ Bulk delete
    public void deleteAll() {
        repo.deleteAll();
    }

    // ✅ Fetch all BMI reports for trainer’s clients using mapping table
    public List<BMIReport> getByTrainer(Long trainerId) {
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