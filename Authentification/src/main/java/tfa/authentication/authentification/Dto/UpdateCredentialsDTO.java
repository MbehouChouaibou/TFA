package tfa.authentication.authentification.Dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateCredentialsDTO {
    private String username;          // new username
    private String password;          // new password
    private String confirmPassword;   // confirm new password
    private String currentPassword;   // current password for verification

    // getters and setters
}
