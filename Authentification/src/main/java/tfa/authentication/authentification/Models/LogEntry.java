package tfa.authentication.authentification.Models;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

// LogEntry.java
@Entity
@Table(name = "logs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LogEntry {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String action;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(length = 1024)
    private String details;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}