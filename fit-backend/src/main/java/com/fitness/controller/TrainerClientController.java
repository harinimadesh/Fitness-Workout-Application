package com.fitness.controller;

import com.fitness.model.TrainerClient;
import com.fitness.model.User;
import com.fitness.service.TrainerClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainer-clients")
@CrossOrigin(origins = "*")
public class TrainerClientController {
    private final TrainerClientService service;

    public TrainerClientController(TrainerClientService service) {
        this.service = service;
    }

    // ✅ Get full user details for trainer’s mapped clients
    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<User>> getMappedUsers(@PathVariable Long trainerId) {
        return ResponseEntity.ok(service.getMappedUsers(trainerId));
    }

    // (Optional) Get raw mappings if needed
    @GetMapping("/mappings/{trainerId}")
    public ResponseEntity<List<TrainerClient>> getMappings(@PathVariable Long trainerId) {
        return ResponseEntity.ok(service.getMappings(trainerId));
    }
    // ✅ Get all trainer–user mappings (for Admin Dashboard)
    @GetMapping("/all")
    public ResponseEntity<List<TrainerClient>> getAllMappings() {
        return ResponseEntity.ok(service.getAllMappings());
    }

    // ✅ Assign a user to a trainer
    @PostMapping
    public ResponseEntity<TrainerClient> addClient(@RequestBody TrainerClient tc) {
        TrainerClient saved = service.assignClient(tc);
        return ResponseEntity.ok(saved);
    }

    // ✅ Remove a user from a trainer
    @DeleteMapping
    public ResponseEntity<String> removeClient(@RequestParam Long trainerId, @RequestParam Long userId) {
        boolean deleted = service.removeClient(trainerId, userId);
        if (deleted) {
            return ResponseEntity.ok("Client removed successfully");
        } else {
            return ResponseEntity.status(404).body("Mapping not found");
        }
    }

    // ✅ Bulk delete
    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAll() {
        service.deleteAll();
        return ResponseEntity.noContent().build();
    }
}