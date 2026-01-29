package com.fitness.controller;

import com.fitness.model.Workout;
import com.fitness.service.WorkoutService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "*")
public class WorkoutController {
    private final WorkoutService service;

    public WorkoutController(WorkoutService service) {
        this.service = service;
    }

    // Get all workouts
    @GetMapping
    public List<Workout> getAll() {
        return service.getAll();
    }

    // Get workout by ID
    @GetMapping("/{id}")
    public Workout get(@PathVariable Long id) {
        return service.getById(id);
    }

    // Get workouts by user
    @GetMapping("/user/{userId}")
    public List<Workout> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    // ✅ Get workouts for trainer’s clients (via TrainerClient mapping table)
    @GetMapping("/trainer/{trainerId}")
    public List<Workout> getByTrainer(@PathVariable Long trainerId) {
        return service.getByTrainer(trainerId);
    }

    // Add new workout
    @PostMapping
    public Workout add(@RequestBody Workout w) {
        return service.save(w);
    }

    // ✅ Update workout (useful for admin/trainer edits)
    @PutMapping("/{id}")
    public Workout update(@PathVariable Long id, @RequestBody Workout updated) {
        Workout existing = service.getById(id);
        if (existing == null) {
            return null; // or throw a ResponseStatusException(HttpStatus.NOT_FOUND)
        }

        existing.setExercise(updated.getExercise());
        existing.setSets(updated.getSets());
        existing.setReps(updated.getReps());
        existing.setDuration(updated.getDuration());
        existing.setDone(updated.getDone()); // ✅ use Lombok getter/setter

        return service.save(existing);
    }

    // Delete workout by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ Bulk delete (for AdminDashboard clear-all)
    @DeleteMapping("/all")
    public void deleteAll() {
        service.deleteAll();
    }
}