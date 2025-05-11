package com.example.demo.repository;

import com.example.demo.Beans.Utilisateur;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email); // utile pour Spring Security
}
