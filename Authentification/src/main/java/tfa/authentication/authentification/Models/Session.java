package tfa.authentication.authentification.Models;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @Column(name = "session_id", nullable = false, unique = true)
    private String sessionId;

    @Column(nullable = false)
    private String username;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "session_roles", joinColumns = @JoinColumn(name = "session_id"))
    @Column(name = "role")
    private List<String> roles;

    @Column(name = "creation_time", nullable = false)
    private Instant creationTime;

    @Column(name = "last_access_time", nullable = false)
    private Instant lastAccessTime;

    // Constructors
    public Session() {}

    public Session(String sessionId, String username, List<String> roles, Instant creationTime, Instant lastAccessTime) {
        this.sessionId = sessionId;
        this.username = username;
        this.roles = roles;
        this.creationTime = creationTime;
        this.lastAccessTime = lastAccessTime;
    }

    // Getters and setters

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Instant getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Instant creationTime) {
        this.creationTime = creationTime;
    }

    public Instant getLastAccessTime() {
        return lastAccessTime;
    }

    public void setLastAccessTime(Instant lastAccessTime) {
        this.lastAccessTime = lastAccessTime;
    }
}
