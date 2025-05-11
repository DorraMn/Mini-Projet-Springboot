package com.example.demo.service;

import com.example.demo.repository.EntrepotRepository;
import com.example.demo.Beans.Entrepot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntrepotService {

    @Autowired
    private EntrepotRepository entrepotRepository;

    public List<Entrepot> getAllEntrepots() {
        return entrepotRepository.findAll();
    }

    public Optional<Entrepot> getEntrepotById(Long id) {
        return entrepotRepository.findById(id);
    }

    public Entrepot saveEntrepot(Entrepot entrepot) {
        return entrepotRepository.save(entrepot);
    }

    public void deleteEntrepot(Long id) {
        entrepotRepository.deleteById(id);
    }
}
