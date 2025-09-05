package tfa.authentication.authentification.Models;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "manager_account")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ManagerAccount {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
}
