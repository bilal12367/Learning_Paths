package com.example.jpa_practise.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.jpa_practise.models.Customer;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

interface CustomCustomerRepository {
    public List<Customer> findByCriteria(double lowBal,double highBal,char gender, boolean isActive, String startsString);
}

class CustomCustomerRepositoryImpl implements CustomCustomerRepository {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Customer> findByCriteria(double lowBal, double highBal, char gender, boolean isActive,
            String startsString) {
        CriteriaBuilder cBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Customer> cQuery = cBuilder.createQuery(Customer.class);
        Root<Customer> root = cQuery.from(Customer.class);

        Predicate p1 = cBuilder.between(root.get("accountBalance"), lowBal , highBal);
        Predicate p2 = cBuilder.equal(root.get("gender"), gender);
        Predicate p3 = cBuilder.equal(root.get("isActive"), isActive);
        Predicate p4 = cBuilder.like(root.get("customerName"), startsString + "%");

        
        Predicate finalPredicate = cBuilder.and(p1,p2,p3,p4);
        cQuery.where(finalPredicate);
        TypedQuery<Customer> typedQuery = entityManager.createQuery(cQuery);
        return typedQuery.getResultList();
    }

}

