package com.fitness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "progress_photos")
public class ProgressPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ Link to the user who uploaded the photo
    @Column(nullable = false)
    private Long userId;

    // ✅ Full URL to access the uploaded photo
    @Column(nullable = false)
    private String url;

    // ✅ Optional caption (e.g., "Week 1 update")
    private String caption;

    // ✅ Timestamp when the photo was uploaded
    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;
}