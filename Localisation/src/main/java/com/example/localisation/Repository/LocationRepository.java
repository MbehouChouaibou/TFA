package com.example.localisation.Repository;

import com.example.localisation.Model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByUsername(String username);
}