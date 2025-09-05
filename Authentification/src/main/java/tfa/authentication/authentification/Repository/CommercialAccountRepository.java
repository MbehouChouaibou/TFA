package tfa.authentication.authentification.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tfa.authentication.authentification.Models.CommercialeAccount;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CommercialAccountRepository extends JpaRepository<CommercialeAccount, Long> {
    Optional<CommercialeAccount> findByUsername(String username);
    void deleteByUsername(String username);
    List<CommercialeAccount> findByCreatedAtAfter(LocalDateTime date);

    boolean existsByUsername(String username);
}
