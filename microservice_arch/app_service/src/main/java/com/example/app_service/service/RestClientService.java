package com.example.app_service.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class RestClientService {
     private final RestTemplate restTemplate = new RestTemplate();

    public <T, R> R postForResponse(String url, T requestBody, Class<R> responseType) {
        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create request entity
        HttpEntity<T> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make POST request
        ResponseEntity<R> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                responseType
        );

        return response.getBody();
    }
}
