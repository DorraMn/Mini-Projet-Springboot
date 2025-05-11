package com.example.demo.controller;

import com.example.demo.Beans.Utilisateur;
import com.example.demo.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @GetMapping("/{id}")
    public Utilisateur getUtilisateurById(@PathVariable Long id) {
        return utilisateurRepository.findById(id).orElse(null);
    }

    
    
    @PostMapping("/register")
    public Utilisateur registerUtilisateur(@RequestBody Utilisateur utilisateur) {
        // Vérifier si l'email existe déjà
    	if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
    	    throw new RuntimeException("Email déjà utilisé !");
    	}
        // Sauvegarder l'utilisateur
        return utilisateurRepository.save(utilisateur);
    }
    
    
    
    
    @PostMapping("/login")
    public Utilisateur loginUtilisateur(@RequestBody Utilisateur utilisateur) {
        Optional<Utilisateur> existingUser = utilisateurRepository.findByEmail(utilisateur.getEmail());

        if (existingUser.isPresent() && existingUser.get().getMotDePasse().equals(utilisateur.getMotDePasse())) {
            return existingUser.get();
        } else {
            throw new RuntimeException("Email ou mot de passe incorrect !");
        }
    }

    

    @PutMapping("/{id}")
    public Utilisateur updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        utilisateur.setId(id);
        return utilisateurRepository.save(utilisateur);
    }

    @DeleteMapping("/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
    }
}
