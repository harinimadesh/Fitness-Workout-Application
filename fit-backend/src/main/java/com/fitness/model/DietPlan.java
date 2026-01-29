package com.fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "diet_plans")
public class DietPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long trainerId;

    private String mealType;   // e.g., "Breakfast"
    private String foodItem;   // e.g., "Oats + Banana"
    private Integer calories;  // kcal
}