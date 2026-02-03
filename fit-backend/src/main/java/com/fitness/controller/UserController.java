package com.fitness.controller;

import com.fitness.model.User;
import com.fitness.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "https://fitness-workout-sigma.vercel.app")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public User add(@RequestBody User u) {
        return service.save(u);
    }

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

        if (updated.getRole() != null) {
            existing.setRole(updated.getRole());
        }

        return service.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @DeleteMapping("/all")
    public void deleteAll() {
        service.deleteAll();
    }

    @GetMapping("/email/{email}")
    public User getByEmail(@PathVariable String email) {
        return service.findByEmail(email);
    }

    @GetMapping("/role/{role}")
    public List<User> getByRole(@PathVariable String role) {
        return service.findByRole(role);
    }

    @GetMapping("/trainer/{trainerId}")
    public List<User> getUsersByTrainer(@PathVariable Long trainerId) {
        return service.getUsersByTrainer(trainerId);
    }
}