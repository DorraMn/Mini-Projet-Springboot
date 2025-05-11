package com.example.demo.controller;

import com.example.demo.service.StockService;
import com.example.demo.Beans.Stock;
import com.example.demo.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @GetMapping("/{id}")
    public Stock getStockById(@PathVariable Long id) {
        return stockRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Stock createStock(@RequestBody Stock stock) {
        return stockRepository.save(stock);
    }

    @PutMapping("/{id}")
    public Stock updateStock(@PathVariable Long id, @RequestBody Stock stock) {
        stock.setId(id);
        return stockRepository.save(stock);
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockRepository.deleteById(id);
    }
    
    @Autowired
    private StockService stockService;

    @GetMapping("/alertes")
    public ResponseEntity<List<String>> getAlertesStock() {
        // Utilisation de l'instance de StockService pour appeler la méthode
        return ResponseEntity.ok(stockService.getStockAlerts());
    }

    
    
    
}
