package com.example.demo.service;

import com.example.demo.repository.StockRepository;
import com.example.demo.Beans.Produit;
import com.example.demo.Beans.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Optional<Stock> getStockById(Long id) {
        return stockRepository.findById(id);
    }

    public Optional<Stock> getStockByProduitId(Long produitId) {
        return stockRepository.findByProduitId(produitId);
    }

    public Stock saveStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }

    // Méthode de vérification d'alerte stock (appelée en interne)
    public void checkStockAlert(Long produitId, Long entrepotId) {
        Stock stock = stockRepository.findByProduitIdAndEntrepotId(produitId, entrepotId)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        Produit produit = stock.getProduit();
        if (stock.getQuantite() <= produit.getSeuilMin()) {
            System.out.println("ALERTE: Le produit " + produit.getNom() + " est au seuil minimum, veuillez recharger le stock !");
        }
    }

    // Mise à jour de la quantité de stock
    public Stock updateStockQuantity(Long produitId, int quantityChange) {
        Stock stock = stockRepository.findByProduitId(produitId)
                .orElseThrow(() -> new RuntimeException("Stock not found for product ID: " + produitId));

        stock.setQuantite(stock.getQuantite() + quantityChange);

        // Vérification après mise à jour
        checkStockAlert(stock.getProduit().getId(), stock.getEntrepot().getId());

        return stockRepository.save(stock);
    }
    
    
    public List<String> getStockAlerts() {
        List<Stock> stocks = stockRepository.findAll();
        List<String> alerts = new ArrayList<>();

        for (Stock stock : stocks) {
            Produit produit = stock.getProduit();
            if (stock.getQuantite() <= produit.getSeuilMin()) {
                alerts.add("ALERTE: Le produit " + produit.getNom() + " est au seuil minimum (" + stock.getQuantite() + "/" + produit.getSeuilMin() + ")");
            }
        }

        return alerts;
    }

   
    


    // Méthode pour calculer la somme des quantités des produits dans un entrepôt
    public int calculateTotalStockQuantityInEntrepot(Long entrepotId) {
        // Calculer la somme des quantités des produits dans l'entrepôt donné
        List<Stock> stocks = stockRepository.findByEntrepotId(entrepotId);
        return stocks.stream().mapToInt(Stock::getQuantite).sum();
    
    
} }
