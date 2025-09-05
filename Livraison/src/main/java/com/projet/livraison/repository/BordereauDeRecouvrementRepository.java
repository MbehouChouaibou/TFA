package com.projet.livraison.repository;
import com.projet.livraison.model.BordereauDeRecouvrement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BordereauDeRecouvrementRepository extends JpaRepository<BordereauDeRecouvrement, Long> {
    List<BordereauDeRecouvrement> findByBordereauDeLivraisonId(Long livraisonId);
}
