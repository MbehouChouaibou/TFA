package tfa.authentication.authentification.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tfa.authentication.authentification.Dto.CreateCommercialeDto;
import tfa.authentication.authentification.Dto.UpdateCredentialsDTO;
import tfa.authentication.authentification.Models.CommercialeAccount;
import tfa.authentication.authentification.Models.ManagerAccount;
import tfa.authentication.authentification.Repository.CommercialAccountRepository;
import tfa.authentication.authentification.Repository.ManagerAccountRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManagerService {
    @Autowired private CommercialAccountRepository commercialRepo;
    @Autowired private ManagerAccountRepository managerRepo;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private LogService logService;

    @Transactional
    public void createCommercial(CreateCommercialeDto dto, String managerUsername) {
        // Password validation
        if (dto.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        if (commercialRepo.findByUsername(dto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        ManagerAccount manager = managerRepo.findByUsername(managerUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Manager not found"));

        if (!passwordEncoder.matches(dto.getManagerPassword(), manager.getPassword())) {
            throw new IllegalArgumentException("Invalid manager password confirmation");
        }

        CommercialeAccount account = new CommercialeAccount();
        account.setUsername(dto.getUsername());
        account.setPassword(passwordEncoder.encode(dto.getPassword()));
        commercialRepo.save(account);

        logService.log("CREATE_COMMERCIAL", managerUsername, "Created commercial account: " + dto.getUsername());
    }

    @Transactional
    public void deleteCommercial(String username, String managerUsername) {
        if (!commercialRepo.existsByUsername(username)) {
            throw new UsernameNotFoundException("Commercial account not found");
        }
        commercialRepo.deleteByUsername(username);
        logService.log("DELETE_COMMERCIAL", managerUsername, "Deleted: " + username);
    }

    @Transactional
    public void updateManagerCredentials(UpdateCredentialsDTO dto, String managerUsername) {
        // Password validation
        if (dto.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("New passwords do not match");
        }

        ManagerAccount manager = managerRepo.findByUsername(managerUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Manager not found"));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), manager.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (passwordEncoder.matches(dto.getPassword(), manager.getPassword())) {
            throw new IllegalArgumentException("New password must be different");
        }

        manager.setUsername(dto.getUsername());
        manager.setPassword(passwordEncoder.encode(dto.getPassword()));
        managerRepo.save(manager);

        logService.log("UPDATE_MANAGER", managerUsername, "Updated credentials");
    }

    public List<String> getNewCommercialUsernames() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        return commercialRepo.findByCreatedAtAfter(oneWeekAgo)
                .stream()
                .map(CommercialeAccount::getUsername)
                .collect(Collectors.toList());
    }

    public List<String> getAllCommercialUsernames() {
        return commercialRepo.findAll()
                .stream()
                .map(CommercialeAccount::getUsername)
                .collect(Collectors.toList());
    }
}
