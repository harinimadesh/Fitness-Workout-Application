package com.fitness.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // ✅ prevents lazy-loading issues in JSON
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ Ensure name is not null
    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    // ✅ Normalize role to lowercase
    @Column(nullable = false)
    private String role;

    private Integer age;
    private String gender;
    private Integer height; // cm
    private Integer weight; // kg
    private String goals;

    public void setRole(String role) {
        this.role = role == null ? null : role.toLowerCase();
    }
}