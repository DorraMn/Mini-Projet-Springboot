package com.example.demo.service;

import com.example.demo.repository.MouvementStockRepository;
import com.example.demo.Beans.MouvementStock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MouvementStockService {

    @Autowired
    private MouvementStockRepository mouvementStockRepository;

    public List<MouvementStock> getAllMouvements() {
        return mouvementStockRepository.findAll();
    }

    public Optional<MouvementStock> getMouvementById(Long id) {
        return mouvementStockRepository.findById(id);
    }

    public MouvementStock saveMouvement(MouvementStock mouvement) {
        return mouvementStockRepository.save(mouvement);
    }

    public void deleteMouvement(Long id) {
        mouvementStockRepository.deleteById(id);
    }
}
