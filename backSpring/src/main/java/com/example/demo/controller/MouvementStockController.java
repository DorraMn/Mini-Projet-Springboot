package com.example.demo.controller;

import com.example.demo.Beans.MouvementStock;
import com.example.demo.Beans.Stock;
import com.example.demo.Beans.Produit;
import com.example.demo.dto.AlerteStock;
import com.example.demo.repository.MouvementStockRepository;
import com.example.demo.service.StockService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/mouvements")
public class MouvementStockController {

    @Autowired
    private MouvementStockRepository mouvementStockRepository;

    @Autowired
    private StockService stockService;

    @GetMapping
    public List<MouvementStock> getAllMouvements() {
        return mouvementStockRepository.findAll();
    }

    @GetMapping("/{id}")
    public MouvementStock getMouvementById(@PathVariable Long id) {
        return mouvementStockRepository.findById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<Object> createMouvement(@RequestBody MouvementStock mouvement) {
        MouvementStock savedMouvement = mouvementStockRepository.save(mouvement);

        // Mise à jour du stock en fonction du type de mouvement
        if ("ENTREE".equalsIgnoreCase(mouvement.getType())) {
            stockService.updateStockQuantity(mouvement.getProduit().getId(), mouvement.getQuantite());
        } else if ("SORTIE".equalsIgnoreCase(mouvement.getType())) {
            stockService.updateStockQuantity(mouvement.getProduit().getId(), -mouvement.getQuantite());
        }

        // Récupérer le stock du produit concerné
        Stock stock = stockService.getStockByProduitId(mouvement.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Stock not found for the given product"));

        Produit produit = stock.getProduit();

        // Vérification du seuil minimum
        if (stock.getQuantite() <= produit.getSeuilMin()) {
            AlerteStock alerte = new AlerteStock("ALERTE: Le produit " + produit.getNom() + " est au seuil minimum, veuillez recharger le stock !");
            return ResponseEntity.ok(alerte);
        }

        return ResponseEntity.ok(savedMouvement);
    }

    @PutMapping("/{id}")
    public MouvementStock updateMouvement(@PathVariable Long id, @RequestBody MouvementStock mouvement) {
        mouvement.setId(id);
        return mouvementStockRepository.save(mouvement);
    }

    @DeleteMapping("/{id}")
    public void deleteMouvement(@PathVariable Long id) {
        mouvementStockRepository.deleteById(id);
    }
}
