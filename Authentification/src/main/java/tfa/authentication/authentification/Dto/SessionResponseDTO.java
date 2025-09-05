package tfa.authentication.authentification.Dto;



import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class SessionResponseDTO {
    private String sessionId;
    private String username;
    private List<String> roles;

    public SessionResponseDTO() {}

    public SessionResponseDTO(String sessionId, String username, List<String> roles) {
        this.sessionId = sessionId;
        this.username = username;
        this.roles = roles;
    }

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
}
