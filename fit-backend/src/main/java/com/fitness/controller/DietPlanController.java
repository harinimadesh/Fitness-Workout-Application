package com.fitness.controller;

import com.fitness.model.DietPlan;
import com.fitness.service.DietPlanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diets")
@CrossOrigin(origins = "*")
public class DietPlanController {
    private final DietPlanService service;

    public DietPlanController(DietPlanService service) {
        this.service = service;
    }

    // Get all diet plans
    @GetMapping
    public List<DietPlan> getAll() { return service.getAll(); }

    // Get diet plan by ID
    @GetMapping("/{id}")
    public DietPlan get(@PathVariable Long id) { return service.getById(id); }

    // Get diet plans by user
    @GetMapping("/user/{userId}")
    public List<DietPlan> getByUser(@PathVariable Long userId) { return service.getByUser(userId); }

    // ✅ Get diet plans for trainer’s clients
    @GetMapping("/trainer/{trainerId}")
    public List<DietPlan> getByTrainer(@PathVariable Long trainerId) {
        return service.getByTrainer(trainerId);
    }

    // Add new diet plan
    @PostMapping
    public DietPlan add(@RequestBody DietPlan d) { return service.save(d); }

    // Update diet plan (optional, for trainer/admin edits)
    @PutMapping("/{id}")
    public DietPlan update(@PathVariable Long id, @RequestBody DietPlan updated) {
        DietPlan existing = service.getById(id);
        if (existing == null) return null;

        existing.setMealType(updated.getMealType());
        existing.setFoodItem(updated.getFoodItem());
        existing.setCalories(updated.getCalories());
        existing.setUserId(updated.getUserId());

        return service.save(existing);
    }

    // Delete diet plan by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }

    // ✅ Bulk delete (for AdminDashboard clear-all)
    @DeleteMapping("/all")
    public void deleteAll() { service.deleteAll(); }
}