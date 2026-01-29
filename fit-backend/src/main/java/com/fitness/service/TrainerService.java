package com.fitness.service;

import com.fitness.model.Trainer;
import com.fitness.repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {
    private final TrainerRepository repo;

    public TrainerService(TrainerRepository repo) {
        this.repo = repo;
    }

    public List<Trainer> getAll() { return repo.findAll(); }

    public Trainer getById(Long id) { return repo.findById(id).orElse(null); }

    public Trainer getByUserId(Long userId) { return repo.findByUserId(userId); }

    public Trainer save(Trainer t) { return repo.save(t); }

    public void delete(Long id) { repo.deleteById(id); }

    // ✅ Bulk delete
    public void deleteAll() { repo.deleteAll(); }
}