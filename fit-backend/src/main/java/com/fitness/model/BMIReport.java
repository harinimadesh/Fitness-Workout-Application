package com.fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "bmi_reports")
public class BMIReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Integer height;   // cm
    private Integer weight;   // kg
    private Double bmi;       // computed value
    private LocalDateTime date;
}