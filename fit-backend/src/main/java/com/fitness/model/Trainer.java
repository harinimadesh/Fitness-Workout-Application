package com.fitness.model;

import jakarta.persistence.*;

@Entity
@Table(name = "trainers")
public class Trainer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // link to users.id
    private String specialization; // e.g., strength, cardio
    private String availability;   // e.g., "Mon-Fri 6-9PM"

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }
}