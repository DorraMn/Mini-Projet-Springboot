package com.example.demo.Beans;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MouvementStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Produit produit;

    private String type; // "ENTREE" ou "SORTIE"

    private int quantite;
    private LocalDateTime date;

    @ManyToOne
    private Entrepot entrepot;
}
