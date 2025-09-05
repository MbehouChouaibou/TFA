package tfa.authentication.authentification.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tfa.authentication.authentification.Models.LogEntry;

public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {
    // Recherche personnalisée si besoin
}