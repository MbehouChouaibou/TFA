package tfa.authentication.authentification.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tfa.authentication.authentification.Dto.UpdateCredentialsDTO;
import tfa.authentication.authentification.Models.CommercialeAccount;
import tfa.authentication.authentification.Repository.CommercialAccountRepository;

@Service
public class CommercialService {
    @Autowired
    private CommercialAccountRepository commercialRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private LogService logService;

    public void updateCredentials(UpdateCredentialsDTO dto, String commercialUsername) {
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("New passwords do not match");
        }

        CommercialeAccount commercial = commercialRepo.findByUsername(commercialUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Commercial not found"));

        // Verify current password
        if (!passwordEncoder.matches(dto.getCurrentPassword(), commercial.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        // Optional: Check if new password is same as old password and reject if needed
        if (passwordEncoder.matches(dto.getPassword(), commercial.getPassword())) {
            throw new IllegalArgumentException("New password must be different from the current password");
        }

        // Update credentials
        commercial.setUsername(dto.getUsername());
        commercial.setPassword(passwordEncoder.encode(dto.getPassword()));
        commercialRepo.save(commercial);

        logService.log("UPDATE_COMMERCIAL", commercialUsername, "Updated credentials");
    }
}