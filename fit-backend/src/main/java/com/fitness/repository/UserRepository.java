package com.fitness.repository;

import com.fitness.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    // ✅ Find users by role (case-insensitive)
    List<User> findByRoleIgnoreCase(String role);

    // ✅ Find users by list of IDs (for trainer-client mapping)
    List<User> findByIdIn(List<Long> ids);
}