package com.example.app_service.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.core.ParameterizedTypeReference;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
class ResponseBody <R>{
    private Class<R> body;
}

@Aspect
@Service
public class RestClientService {
    private static final Logger logger = LoggerFactory.getLogger(RestClientService.class);

    private final RestTemplate restTemplate = new RestTemplate();

@Around("execution(* com.example.app_service.service.RestClientService..*(..))")
    public void logServiceCall(ProceedingJoinPoint pjp) throws Throwable {
        Object[] objs = pjp.getArgs();
        String methodName = pjp.getSignature().getName();
        String url = objs[0].toString();
        String requestBody = new ObjectMapper().writeValueAsString(objs[1]);

        this.logger.debug("-------------------------------------------------------");
        this.logger.debug("Method Name: "+methodName);
        this.logger.debug("URL: "+url);
        this.logger.debug("RequestBody: "+requestBody);
        
        Object response = pjp.proceed();
        System.out.println("Response: "+new ObjectMapper().writeValueAsString(response));
        this.logger.debug("-------------------------------------------------------");
    }

    public <T, R> R postForResponse(String url, T requestBody, Class<R> responseType) throws JsonProcessingException {
        RequestEntity re = this.prepareEntity(url, null, null, requestBody);
        // Set headers
        // HttpHeaders headers = new HttpHeaders();

        
        // headers.setContentType(MediaType.APPLICATION_JSON);

        // // Create request entity
        // HttpEntity<T> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make POST request
        ResponseEntity<R> response = restTemplate.exchange(
                re,
                responseType
        );

        return response.getBody();
    }

    public <T, R> List<R> postForResponseList(String url, T requestBody, Class<R> clazz) throws JsonProcessingException {
        this.logger.debug("Making post request to url: "+url);
        this.logger.debug("Request Body: "+requestBody.toString());

        RequestEntity re = this.prepareEntity(url, null, null, requestBody);
        ResponseEntity<List<R>> response = restTemplate.exchange(
                re,
                new ParameterizedTypeReference<List<R>>() {}
        );

        List<R> list = response.getBody();
        
        List<R> convertedList = list.stream()
            .map(data -> new ObjectMapper().convertValue(data, clazz))
            .collect(Collectors.toList());
        return convertedList;
    }

    private RequestEntity prepareEntity(String url, Map<String, Object> queries, Map<String, Object> headersMap, Object obj) throws JsonProcessingException {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
        if (queries != null) {
            queries.forEach(builder::queryParam);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (headersMap != null) {
            headersMap.forEach((key, val) -> {
                headers.add(key, val.toString());
            });
        }
        String requestUrl = builder.build().toUriString();
        this.logger.debug("Making Get request to url: "+requestUrl);
        
        RequestEntity re;
        if(obj == null) {
            re = RequestEntity
                .get(builder.toUriString())
                .headers(headers)
                .build();
            
    
                
        } else {
            re = RequestEntity
                .post(builder.toUriString())
                .headers(headers)
                .body(obj);
        }
        return re;
        
    }
    
    /**
     * Sends a GET request to the specified URL with the provided query parameters
     * and returns the response as a list of objects of the specified type.
     * @param <R> - The type of the response body.
     * @param url - The URL to send the GET request to.
     * @param queries - A map of query parameters to include in the request.
     * @return - The response body as a list of objects of the specified type.
     * @throws JsonProcessingException - If there is an error processing the JSON response.
     */
    public <R> List<R> getForResponse(String url, Map<String, Object> queries) throws JsonProcessingException {
        // UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
        
        
        // queries.forEach(builder::queryParam);

        // HttpHeaders headers = new HttpHeaders();
        // headers.setContentType(MediaType.APPLICATION_JSON);
        // String requestUrl = builder.build().toUriString();
        // ResponseEntity<List<R>> response = restTemplate.exchange(
        //     url,
        //     HttpMethod.GET,
        //     new HttpEntity<>(headers),
        //     new ParameterizedTypeReference<List<R>>() {}
        // );
        // return response.getBody();
        RequestEntity rqe = this.prepareEntity(url, queries, null, null);
        ResponseEntity<List<R>> rse = restTemplate.exchange(rqe, new ParameterizedTypeReference<List<R>>(){});
        return rse.getBody();
    }

    
    /**
     * Sends a GET request to the specified URL with the provided query parameters
     * and returns the response as an object of the specified class type.
     *
     * @param <R>    The type of the response body.
     * @param url    The URL to send the GET request to.
     * @param queries A map of query parameters to include in the request.
     * @param clazz  The class type of the response body.
     * @return The response body as an object of the specified class type.
     * @throws JsonProcessingException If there is an error processing the JSON response.
     */
    public <R> R getForResponse(String url, Map<String,Object> queries, Class<R> clazz) throws JsonProcessingException {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);

        queries.forEach(builder::queryParam);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestUrl = builder.build().toUriString();

        this.logger.debug("Making Get request to url: "+requestUrl);
        
        
        ResponseEntity<R> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            new HttpEntity<>(headers),
            clazz
        );
        return response.getBody();
    }
}
