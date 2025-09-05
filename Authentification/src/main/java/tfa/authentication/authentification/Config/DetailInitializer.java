package tfa.authentication.authentification.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tfa.authentication.authentification.Models.ManagerAccount;
import tfa.authentication.authentification.Repository.ManagerAccountRepository;

@Component
public class DetailInitializer implements CommandLineRunner {
    @Autowired private ManagerAccountRepository managerRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (managerRepo.count() == 0) {
            ManagerAccount manager = new ManagerAccount();
            manager.setUsername("admin");
            manager.setPassword(passwordEncoder.encode("admin123"));
            managerRepo.save(manager);
        }
    }
}

