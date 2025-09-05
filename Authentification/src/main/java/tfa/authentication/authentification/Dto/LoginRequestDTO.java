package tfa.authentication.authentification.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {
    public String username;
    public String password;
}

