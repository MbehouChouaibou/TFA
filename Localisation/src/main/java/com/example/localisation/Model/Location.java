package com.example.localisation.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private double latitude;
    private double longitude;
    private String street;
    private String city;
    private LocalDateTime timestamp;
}