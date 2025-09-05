package com.example.localisation.Controller;

import com.example.localisation.dto.LocationRequest;
import com.example.localisation.Model.Location;
import com.example.localisation.Service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@RestController
@RequestMapping("/api/location")
@SecurityRequirement(name = "bearerAuth")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping
    public ResponseEntity<?> saveLocation(@RequestBody LocationRequest request) {
        String username = getUsernameFromJwt();
        Location savedLocation = locationService.saveLocation(username, request);
        return ResponseEntity.ok(savedLocation);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Location>> getLocationsByUsername() {
        String username = getUsernameFromJwt();
        return ResponseEntity.ok(locationService.getLocationsByUsername(username));
    }

    private String getUsernameFromJwt() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jwt.getClaimAsString("preferred_username") != null
                ? jwt.getClaimAsString("preferred_username")
                : jwt.getClaimAsString("sub");
    }
}