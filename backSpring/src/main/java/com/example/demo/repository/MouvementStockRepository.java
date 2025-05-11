package com.example.demo.repository;

import com.example.demo.Beans.MouvementStock;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MouvementStockRepository extends JpaRepository<MouvementStock, Long> {
}

