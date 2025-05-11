package com.example.demo.controller;

import com.example.demo.Beans.Entrepot;
import com.example.demo.repository.EntrepotRepository;
import com.example.demo.service.StockService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/entrepots")
public class EntrepotController {

    @Autowired
    private EntrepotRepository entrepotRepository;

    @Autowired
    private StockService stockService;
    
    @GetMapping
    public List<Entrepot> getAllEntrepots() {
        return entrepotRepository.findAll();
    }

    @GetMapping("/{id}")
    public Entrepot getEntrepotById(@PathVariable Long id) {
        return entrepotRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Entrepot createEntrepot(@RequestBody Entrepot entrepot) {
        return entrepotRepository.save(entrepot);
    }

    @PutMapping("/{id}")
    public Entrepot updateEntrepot(@PathVariable Long id, @RequestBody Entrepot entrepot) {
        entrepot.setId(id);
        return entrepotRepository.save(entrepot);
    }

    @DeleteMapping("/{id}")
    public void deleteEntrepot(@PathVariable Long id) {
        entrepotRepository.deleteById(id);
    }

 // Méthode pour obtenir le nombre d'entrepôts
    @GetMapping("/count")
    public long getEntrepotCount() {
        long count = entrepotRepository.count();
        System.out.println("Nombre d'entrepôts : " + count); // Ajouter un log pour vérifier
        return count;  // Retourner directement le nombre
    }
    
    
    @GetMapping("/capacite-restante/{id}")
    public int getCapaciteRestante(@PathVariable Long id) {
        // Trouver l'entrepôt par son id
        Entrepot entrepot = entrepotRepository.findById(id).orElse(null);
        if (entrepot == null) {
            return 0; // Si l'entrepôt n'existe pas
        }

        // Calculer la somme des quantités des produits dans cet entrepôt
        int totalQuantiteStocke = stockService.calculateTotalStockQuantityInEntrepot(id);

        // Calculer la capacité restante
        return entrepot.getCapacite() - totalQuantiteStocke;
    }
    
    
    

}
