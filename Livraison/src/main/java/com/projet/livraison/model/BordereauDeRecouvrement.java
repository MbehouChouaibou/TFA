package com.projet.livraison.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "bordereau_de_recouvrement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BordereauDeRecouvrement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateRecouvrement;

    @ManyToOne
    @JoinColumn(name = "livraison_id")
    private BordereauDeLivraison bordereauDeLivraison;
    private Integer prixTotal;
    private Integer avance;

    @Enumerated(EnumType.STRING)
    private Statut statut;

    @PrePersist
    @PreUpdate
    private void calculateStatut() {
        this.statut = (this.avance != null && this.prixTotal != null && avance >= prixTotal)
                ? Statut.PAYE
                : Statut.NON_PAYE;
        // Add other fields as needed
    }
}
