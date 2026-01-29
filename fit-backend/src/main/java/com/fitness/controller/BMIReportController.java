package com.fitness.controller;

import com.fitness.model.BMIReport;
import com.fitness.service.BMIReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bmi")
@CrossOrigin(origins = "*")
public class BMIReportController {
    private final BMIReportService service;

    public BMIReportController(BMIReportService service) { this.service = service; }

    // Get all BMI reports
    @GetMapping
    public List<BMIReport> getAll() { return service.getAll(); }

    // Get BMI report by ID
    @GetMapping("/{id}")
    public BMIReport get(@PathVariable Long id) { return service.getById(id); }

    // Get BMI reports by user
    @GetMapping("/user/{userId}")
    public List<BMIReport> getByUser(@PathVariable Long userId) { return service.getByUser(userId); }

    // Get BMI reports for trainer’s clients
    @GetMapping("/trainer/{trainerId}")
    public List<BMIReport> getByTrainer(@PathVariable Long trainerId) {
        return service.getByTrainer(trainerId);
    }

    // Add new BMI report
    @PostMapping
    public BMIReport add(@RequestBody BMIReport r) { return service.save(r); }

    // Delete BMI report by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }

    // ✅ Bulk delete
    @DeleteMapping("/all")
    public void deleteAll() { service.deleteAll(); }
}