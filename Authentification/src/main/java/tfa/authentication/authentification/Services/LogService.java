package tfa.authentication.authentification.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tfa.authentication.authentification.Models.LogEntry;
import tfa.authentication.authentification.Repository.LogEntryRepository;

@Service
public class LogService {
    @Autowired
    private LogEntryRepository logEntryRepository;
    public void log(String action, String username, String details) {
        LogEntry entry = new LogEntry();
        entry.setAction(action);
        entry.setUsername(username);
        entry.setDetails(details);
        logEntryRepository.save(entry);
    }
}

