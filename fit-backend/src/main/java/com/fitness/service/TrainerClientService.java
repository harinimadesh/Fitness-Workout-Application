package com.fitness.service;

import com.fitness.model.TrainerClient;
import com.fitness.model.User;
import com.fitness.repository.TrainerClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TrainerClientService {
    private final TrainerClientRepository repo;

    public TrainerClientService(TrainerClientRepository repo) {
        this.repo = repo;
    }

    // ✅ Get full User objects for a trainer’s mapped clients
    public List<User> getMappedUsers(Long trainerId) {
        List<TrainerClient> mappings = repo.findByTrainer_Id(trainerId);
        return mappings.stream()
                .map(TrainerClient::getUser)
                .toList();
    }

    // ✅ Get raw mappings if needed
    public List<TrainerClient> getMappings(Long trainerId) {
        return repo.findByTrainer_Id(trainerId);
    }

    // ✅ Assign a user to a trainer (prevent duplicates)
    public TrainerClient assignClient(TrainerClient tc) {
        if (tc.getTrainer() == null || tc.getUser() == null) {
            throw new IllegalArgumentException("Trainer or User cannot be null");
        }

        if (repo.existsByTrainer_IdAndUser_Id(
                tc.getTrainer().getId(),
                tc.getUser().getId())) {
            return tc; // already mapped
        }
        return repo.save(tc);
    }

    // ✅ Remove a user from a trainer
    @Transactional
    public boolean removeClient(Long trainerId, Long userId) {
        if (repo.existsByTrainer_IdAndUser_Id(trainerId, userId)) {
            repo.deleteByTrainer_IdAndUser_Id(trainerId, userId);
            System.out.println("Deleted mapping for trainer=" + trainerId + ", user=" + userId);
            return true;
        } else {
            System.out.println("No mapping found for trainer=" + trainerId + " and user=" + userId);
            return false;
        }
    }
    // ✅ Get all mappings (for admin view)
    public List<TrainerClient> getAllMappings() {
        return repo.findAll();
    }

    // ✅ Bulk delete
    public void deleteAll() {
        repo.deleteAll();
    }
}