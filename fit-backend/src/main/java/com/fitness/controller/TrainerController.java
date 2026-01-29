package com.fitness.controller;

import com.fitness.model.Trainer;
import com.fitness.service.TrainerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "*")
public class TrainerController {
    private final TrainerService service;

    public TrainerController(TrainerService service) {
        this.service = service;
    }

    // Get all trainers
    @GetMapping
    public List<Trainer> getAll() { return service.getAll(); }

    // Get trainer by ID
    @GetMapping("/{id}")
    public Trainer get(@PathVariable Long id) { return service.getById(id); }

    // ✅ Find trainer by linked userId
    @GetMapping("/user/{userId}")
    public Trainer getByUserId(@PathVariable Long userId) { return service.getByUserId(userId); }

    // Add new trainer
    @PostMapping
    public Trainer add(@RequestBody Trainer t) { return service.save(t); }

    // ✅ Update trainer profile
    @PutMapping("/{id}")
    public Trainer update(@PathVariable Long id, @RequestBody Trainer updated) {
        Trainer existing = service.getById(id);
        if (existing == null) return null;

        existing.setSpecialization(updated.getSpecialization());
        existing.setAvailability(updated.getAvailability());
        return service.save(existing);
    }

    // Delete trainer by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }

    // ✅ Bulk delete (for AdminDashboard clear-all)
    @DeleteMapping("/all")
    public void deleteAll() { service.deleteAll(); }
}