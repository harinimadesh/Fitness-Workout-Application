package com.fitness.service;

import com.fitness.model.TrainerClient;
import com.fitness.model.User;
import com.fitness.repository.UserRepository;
import com.fitness.repository.TrainerClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;
    private final TrainerClientRepository trainerClientRepo;

    public UserService(UserRepository repo, TrainerClientRepository trainerClientRepo) {
        this.repo = repo;
        this.trainerClientRepo = trainerClientRepo;
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    public User getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public User save(User u) {
        return repo.save(u);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    // ✅ Bulk delete
    public void deleteAll() {
        repo.deleteAll();
    }

    public User findByEmail(String email) {
        return repo.findByEmail(email);
    }

    // ✅ Find users by role (case-insensitive)
    public List<User> findByRole(String role) {
        return repo.findByRoleIgnoreCase(role);
    }

    // ✅ Get full user details for trainer’s mapped clients
    public List<User> getUsersByTrainer(Long trainerId) {
        List<TrainerClient> mappings = trainerClientRepo.findByTrainer_Id(trainerId);

        // Collect User objects directly from the mapping
        return mappings.stream()
                .map(TrainerClient::getUser)
                .toList();
    }
}