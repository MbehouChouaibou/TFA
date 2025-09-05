package tfa.authentication.authentification.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.stereotype.Service;
import tfa.authentication.authentification.Models.ManagerAccount;
import tfa.authentication.authentification.Models.CommercialeAccount;
import tfa.authentication.authentification.Repository.CommercialAccountRepository;
import tfa.authentication.authentification.Repository.ManagerAccountRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private ManagerAccountRepository managerRepo;

    @Autowired
    private CommercialAccountRepository commercialRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Cherche d'abord parmi les managers
        return managerRepo.findByUsername(username)
                .map(manager -> User.withUsername(manager.getUsername())
                        .password(manager.getPassword())
                        .roles("MANAGER") // très important : doit correspondre à .hasRole("MANAGER") dans ta SecurityConfig
                        .build())
                .or(() -> commercialRepo.findByUsername(username)
                        .map(commercial -> User.withUsername(commercial.getUsername())
                                .password(commercial.getPassword())
                                .roles("COMMERCIAL")
                                .build()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
