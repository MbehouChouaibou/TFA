package tfa.authentication.authentification.Services;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager; // <- important
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tfa.authentication.authentification.Dto.LoginRequestDTO;
import tfa.authentication.authentification.Dto.SessionResponseDTO;
import tfa.authentication.authentification.jwt.JwtUtil;

import java.util.Collections;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public SessionResponseDTO login(LoginRequestDTO dto, HttpSession newSession) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String role = authentication.getAuthorities().iterator().next().getAuthority();
        String token = jwtUtil.generateToken(dto.getUsername());

        return new SessionResponseDTO(token, dto.getUsername(), Collections.singletonList(role));
    }

    public void logout(HttpSession httpSession) {
        SecurityContextHolder.clearContext();
    }
}
