package com.example.localisation.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class GeocodingService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public Map<String, String> getAddressFromCoordinates(double latitude, double longitude) {
        Map<String, String> address = new HashMap<>();
        try {
            String url = String.format("https://nominatim.openstreetmap.org/reverse?format=json&lat=%f&lon=%f",
                    latitude, longitude);
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "LocalisationApp/1.0");
            HttpEntity<String> entity = new HttpEntity<>(headers);
            String response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();

            JsonNode jsonNode = objectMapper.readTree(response).get("address");
            address.put("street", jsonNode.get("road") != null ? jsonNode.get("road").asText() : "Unknown");
            address.put("city", jsonNode.get("city") != null ? jsonNode.get("city").asText() :
                    jsonNode.get("town") != null ? jsonNode.get("town").asText() : "Unknown");
            address.put("country", jsonNode.get("country") != null ? jsonNode.get("country").asText() : "Unknown");
        } catch (Exception e) {
            address.put("street", "Unknown");
            address.put("city", "Unknown");
            address.put("country", "Unknown");
        }
        return address;
    }
}