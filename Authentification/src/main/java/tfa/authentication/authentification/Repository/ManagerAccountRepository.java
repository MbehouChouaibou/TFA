package tfa.authentication.authentification.Repository;

import tfa.authentication.authentification.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ManagerAccountRepository extends JpaRepository<ManagerAccount, Long> {
    Optional<ManagerAccount> findByUsername(String username);
}

