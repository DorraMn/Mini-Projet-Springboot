package com.example.demo.Beans;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Produit produit;

    private int quantite;
    private int seuilAlerte;

    @ManyToOne
    private Entrepot entrepot;
}
