
package com.example.app_service.service;

import java.util.List;
import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
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




@Service
public class RestClientService2 {
    
    private final Logger logger = LoggerFactory.getLogger(RestClientService2.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @Around("execution(public * com.example.app_service.service.RestClientService2.*(..))")
    public Object logEndpointService(ProceedingJoinPoint pjp) throws Throwable {
        Object[] objs = pjp.getArgs();
        String methodName = pjp.getSignature().getName();
        String url = objs[0].toString();
        String requestBody = new ObjectMapper().writeValueAsString(objs[1]);
        
        this.logger.debug("-------------------------------------------------------");
        this.logger.debug("Method Name: "+methodName);
        this.logger.debug("URL: "+url);
        this.logger.debug("RequestBody: "+requestBody);
        try {
            Object response = pjp.proceed();
            System.out.println("Response: "+new ObjectMapper().writeValueAsString(response));
            this.logger.debug("-------------------------------------------------------");
            return response;
        } catch (Exception e) {
            this.logger.error("Error in method: " + methodName, e);
            throw e;

        }
    }

    
    private RequestEntity prepareEntity(String url, Map<String, Object> queries, Map<String, Object> headersMap, Object obj) throws JsonProcessingException {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
        if (queries != null) {
            // queries.forEach(builder::queryParam);

            queries.forEach((key, val) -> {
                if(val instanceof List) {
                   ((List) val).forEach((val1) -> builder.queryParam(key, val1));
                } else {
                    builder.queryParam(key, val);
                }
            });
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

    public <T, R> ResponseEntity<R> postForResponse(String url, T requestBody, ParameterizedTypeReference<R> responseType) throws JsonProcessingException {
        try{
            RequestEntity re = this.prepareEntity(url, null, null, requestBody);
            ResponseEntity<R> response = restTemplate.exchange(url, HttpMethod.POST, re, responseType);
            return response;
        } catch (JsonProcessingException e) {
            this.logger.error("Error parsing response", e);
            throw e;
        }
        
    }


    public <T, R> ResponseEntity<R> getForResponse(String url, Map<String, Object> queries, ParameterizedTypeReference<R> responseType) throws JsonProcessingException {
        RequestEntity re = this.prepareEntity(url, queries, null, null);
        ResponseEntity<R> response = restTemplate.exchange(re, responseType);
        return response;
    }
}