package tfa.authentication.authentification.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommercialeDto {
    private String username;
    private String password;
    private String confirmPassword;
    private String managerPassword; // new field for admin password confirmation

    // getters and setters
}
