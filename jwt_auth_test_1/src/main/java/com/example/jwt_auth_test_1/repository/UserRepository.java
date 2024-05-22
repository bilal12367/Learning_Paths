package com.example.jwt_auth_test_1.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwt_auth_test_1.models.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

interface CustomUserRepository {
    public List<User> searchByNameOrEmail(String searchStr);
}

class CustomUserRepositoryImpl implements CustomUserRepository {

    private EntityManager entityManager;

    @Override
    public List<User> searchByNameOrEmail(String searchStr) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> root = cq.from(User.class);
        
        Predicate p = cb.or(cb.like(root.get("fullName"), searchStr + "%"), cb.like(root.get("email"), searchStr + "%"));
    
        cq.where(p);
        TypedQuery<User> tq = entityManager.createQuery(cq);
        return tq.getResultList();
    }

    

}

public interface UserRepository extends JpaRepository<User, Integer>, CustomUserRepository {
    public Optional<User> findByEmail(String email);
}
