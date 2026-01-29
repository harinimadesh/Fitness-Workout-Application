package com.fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "workouts")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long trainerId;

    private String exercise;   // e.g., "Squat"
    private Integer sets;      // e.g., 4
    private Integer reps;      // e.g., 10
    private Integer duration;  // minutes (optional, for cardio)
    private Boolean done;      // completion status
}