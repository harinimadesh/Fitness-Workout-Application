package com.fitness.controller;

import com.fitness.model.ProgressPhoto;
import com.fitness.model.User;
import com.fitness.service.ProgressPhotoService;
import com.fitness.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressPhotoController {

    private final ProgressPhotoService service;
    private final UserService userService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ProgressPhotoController(ProgressPhotoService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    // ✅ Get all progress photos
    @GetMapping
    public List<ProgressPhoto> getAll() {
        return service.getAll();
    }

    // ✅ Get progress photo by ID
    @GetMapping("/{id}")
    public ProgressPhoto get(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ Get progress photos by user
    @GetMapping("/user/{userId}")
    public List<ProgressPhoto> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    // ✅ Get progress photos for trainer’s clients (only USER role)
    @GetMapping("/trainer/{trainerId}")
    public List<ProgressPhoto> getByTrainer(@PathVariable Long trainerId) {
        return service.getByTrainer(trainerId).stream()
                .filter(photo -> {
                    User user = userService.getById(photo.getUserId());
                    return user != null && "USER".equalsIgnoreCase(user.getRole());
                })
                .toList();
    }

    // ✅ Add progress photo manually (JSON payload)
    @PostMapping
    public ProgressPhoto add(@RequestBody ProgressPhoto p) {
        p.setUploadedAt(LocalDateTime.now());
        return service.save(p);
    }

    // ✅ Upload photo file
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file,
                                    @RequestParam("caption") String caption,
                                    @RequestParam("userId") Long userId) {
        try {
            // Save file to disk
            Path path = Paths.get(uploadDir + file.getOriginalFilename());
            Files.createDirectories(path.getParent());
            file.transferTo(path.toFile());

            // Build accessible URL
            String url = "http://localhost:8080/uploads/" + file.getOriginalFilename();

            ProgressPhoto photo = new ProgressPhoto();
            photo.setUserId(userId);
            photo.setCaption(caption);
            photo.setUrl(url);
            photo.setUploadedAt(LocalDateTime.now());

            ProgressPhoto saved = service.save(photo);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    // ✅ Delete progress photo by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ Bulk delete
    @DeleteMapping("/all")
    public void deleteAll() {
        service.deleteAll();
    }
}