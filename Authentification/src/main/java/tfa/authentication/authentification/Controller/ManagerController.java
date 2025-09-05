package tfa.authentication.authentification.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tfa.authentication.authentification.Dto.CreateCommercialeDto;
import tfa.authentication.authentification.Dto.UpdateCredentialsDTO;
import tfa.authentication.authentification.Services.ManagerService;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:5177", allowCredentials = "true")
public class ManagerController {

    private final ManagerService managerService;

    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @PostMapping("/commercial")
    public ResponseEntity<?> createCommercial(
            @RequestBody CreateCommercialeDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        try {
            managerService.createCommercial(dto, username);
            return ResponseEntity.ok("Commercial account created successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to create commercial account: " + e.getMessage());
        }
    }

    @DeleteMapping("/commercial/{username}")
    public ResponseEntity<?> deleteCommercial(
            @PathVariable String username,
            @AuthenticationPrincipal UserDetails userDetails) {
        String managerUsername = userDetails.getUsername();
        try {
            managerService.deleteCommercial(username, managerUsername);
            return ResponseEntity.ok("Commercial account deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to delete commercial account: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateManager(
            @RequestBody UpdateCredentialsDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        try {
            managerService.updateManagerCredentials(dto, username);
            return ResponseEntity.ok("Manager credentials updated successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to update credentials: " + e.getMessage());
        }
    }

    @GetMapping("/commercial/newnames")
    public ResponseEntity<?> getCommercialUsernames() {
        try {
            List<String> usernames = managerService.getAllCommercialUsernames();
            return ResponseEntity.ok(usernames);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to retrieve commercial accounts: " + e.getMessage());
        }
    }
    @GetMapping("/newnames")
    public ResponseEntity<?> testRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authorities = " + auth.getAuthorities());
        return ResponseEntity.ok("Access granted for roles: " + auth.getAuthorities());
    }

}
