package com.example.localisation.Service;

import com.example.localisation.dto.LocationRequest;
import com.example.localisation.Model.Location;
import com.example.localisation.Repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private com.example.localisation.service.GeocodingService geocodingService;

    public Location saveLocation(String username, LocationRequest request) {
        Location location = new Location();
        location.setUsername(username);
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());
        location.setTimestamp(LocalDateTime.now());

        Map<String, String> address = geocodingService.getAddressFromCoordinates(
                request.getLatitude(), request.getLongitude());
        location.setStreet(address.get("street"));
        location.setCity(address.get("city"));

        return locationRepository.save(location);
    }

    public List<Location> getLocationsByUsername(String username) {
        return locationRepository.findByUsername(username);
    }
}