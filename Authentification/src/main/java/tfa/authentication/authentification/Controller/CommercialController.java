package tfa.authentication.authentification.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import tfa.authentication.authentification.Dto.UpdateCredentialsDTO;
import tfa.authentication.authentification.Services.CommercialService;

@RestController
@RequestMapping("/api/commercial")
@CrossOrigin(origins = "http://localhost:5177", allowCredentials = "true")
public class CommercialController {

    private final CommercialService commercialService;

    public CommercialController(CommercialService commercialService) {
        this.commercialService = commercialService;
    }

    // Only users with ROLE_COMMERCIAL can access this endpoint
    @PutMapping("/update")
    @PreAuthorize("hasRole('COMMERCIAL')")
    public ResponseEntity<?> updateCredentials(@RequestBody UpdateCredentialsDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = authentication.getName(); // get logged-in username

        try {
            commercialService.updateCredentials(dto, username);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update credentials");
        }
    }
}
