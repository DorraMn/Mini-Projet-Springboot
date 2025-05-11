package com.example.demo.controller;

import com.example.demo.Beans.Produit;
import com.example.demo.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/produits")
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @GetMapping("/{id}")
    public Produit getProduitById(@PathVariable Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitRepository.save(produit);
    }

    @PutMapping("/{id}")
    public Produit updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        produit.setId(id);
        return produitRepository.save(produit);
    }

    @DeleteMapping("/{id}")
    public void deleteProduit(@PathVariable Long id) {
        produitRepository.deleteById(id);
    }

    // ➤ Nouveau : obtenir le nombre total de produits
    @GetMapping("/count")
    public long countProduits() {
        return produitRepository.count();
    }
}
