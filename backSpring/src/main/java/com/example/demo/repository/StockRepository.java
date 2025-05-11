package com.example.demo.repository;

import com.example.demo.Beans.Stock;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {

	// Ajout de la méthode pour rechercher un stock par produit et entrepôt
    Optional<Stock> findByProduitIdAndEntrepotId(Long produitId, Long entrepotId);

    // pour alerte seuil min dun produit 
    Optional<Stock> findByProduitId(Long produitId);
    
 // Méthode pour récupérer les stocks d'un entrepôt
    List<Stock> findByEntrepotId(Long entrepotId); 

}


