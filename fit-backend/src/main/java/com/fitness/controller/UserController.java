package com.fitness.controller;

import com.fitness.model.User;
import com.fitness.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // Get all users
    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return service.getById(id);
    }

    // Add new user
    @PostMapping
    public User add(@RequestBody User u) {
        return service.save(u);
    }

    // ✅ Update profile safely
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User updated) {
        User existing = service.getById(id);
        if (existing == null) return null;

        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setAge(updated.getAge());
        existing.setGender(updated.getGender());
        existing.setHeight(updated.getHeight());
        existing.setWeight(updated.getWeight());
        existing.setGoals(updated.getGoals());

        // ✅ normalize role update
        if (updated.getRole() != null) {
            existing.setRole(updated.getRole());
        }

        return service.save(existing);
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ Bulk delete (for AdminDashboard clear-all)
    @DeleteMapping("/all")
    public void deleteAll() {
        service.deleteAll();
    }

    // ✅ Find user by email
    @GetMapping("/email/{email}")
    public User getByEmail(@PathVariable String email) {
        return service.findByEmail(email);
    }

    // ✅ Get users by role
    @GetMapping("/role/{role}")
    public List<User> getByRole(@PathVariable String role) {
        return service.findByRole(role);
    }

    // ✅ Get full user details for trainer’s mapped clients
    @GetMapping("/trainer/{trainerId}")
    public List<User> getUsersByTrainer(@PathVariable Long trainerId) {
        return service.getUsersByTrainer(trainerId);
    }
}