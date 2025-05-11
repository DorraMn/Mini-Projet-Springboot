

window.addEventListener("DOMContentLoaded", () => {
    const nom = localStorage.getItem("nomUtilisateur");
    const spanNom = document.getElementById("nomUtilisateurNavbar");
    if (nom && spanNom) {
        spanNom.textContent = `Bienvenue, ${nom}`;
    }
});



// ============================
// 🔐 Vérification d'authentification
// ============================
const utilisateur = localStorage.getItem("utilisateur");
if (!utilisateur) {
    window.location.href = "../login.html"; // adapte le chemin si nécessaire
}

// ============================
// 🔔 Fonction pour charger les alertes de stock
// ============================
async function chargerAlertesStock() {
    try {
        const response = await fetch('http://localhost:9090/api/stocks/alertes');
        if (!response.ok) throw new Error("Erreur lors de la récupération des alertes");

        const alertes = await response.json();
        const container = document.getElementById("alertesContainer");
        container.innerHTML = '';

        if (alertes.length === 0) {
            container.innerHTML = '<p>Aucune alerte de stock.</p>';
        } else {
            alertes.forEach(msg => {
                const div = document.createElement("div");
                div.className = "alerte";
                div.textContent = msg;
                container.appendChild(div);
            });
        }
    } catch (error) {
        document.getElementById("alertesContainer").innerHTML = "<p>Erreur lors du chargement des alertes.</p>";
        console.error("Erreur lors de la récupération :", error);
    }
}

// ============================
// 📊 Fonction pour charger les produits et afficher le pie chart
// ============================
async function chargerProduitsEtPieChart() {
    try {
        const response = await fetch('http://localhost:9090/api/produits');
        if (!response.ok) throw new Error("Erreur lors de la récupération des produits");

        const produits = await response.json();
        const categories = {};

        produits.forEach(produit => {
            const categorie = produit.categorie;
            categories[categorie] = (categories[categorie] || 0) + 1;
        });

        const labels = Object.keys(categories);
        const data = Object.values(categories);

        const ctx = document.getElementById('pieChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Répartition des produits par catégorie',
                    data: data,
                    backgroundColor: ['#FFB6C1', '#FF6347', '#98FB98', '#FFD700', '#87CEFA'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + ' produits';
                            }
                        }
                    }
                }
            }
        });

        document.getElementById("nbProduits").textContent = produits.length;
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
    }
}

// ============================
// 🏭 Fonction pour charger le nombre total d'entrepôts
// ============================
async function chargerEntrepotCount() {
    try {
        const response = await fetch('http://localhost:9090/api/entrepots/count');
        if (!response.ok) throw new Error("Erreur lors de la récupération du nombre d'entrepôts");

        const data = await response.json();
        console.log("Données reçues de l'API : ", data);
        document.getElementById("nbEntrepots").textContent = data;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'entrepôts :", error);
    }
}

// ============================
// 📦 Fonction pour charger la capacité restante des entrepôts
// ============================
async function chargerCapaciteRestante() {
    try {
        const response = await fetch('http://localhost:9090/api/entrepots');
        if (!response.ok) throw new Error("Erreur lors de la récupération des entrepôts");

        const entrepots = await response.json();
        const tableBody = document.querySelector("#capaciteRestanteTable tbody");
        tableBody.innerHTML = '';

        for (let entrepot of entrepots) {
            const capaciteResponse = await fetch(`http://localhost:9090/api/entrepots/capacite-restante/${entrepot.id}`);
            if (!capaciteResponse.ok) throw new Error(`Erreur lors de la récupération de la capacité restante pour l'entrepôt ${entrepot.id}`);

            const capaciteRestante = await capaciteResponse.json();

            const row = document.createElement('tr');

            const nomCell = document.createElement('td');
            nomCell.textContent = entrepot.nom;
            row.appendChild(nomCell);

            const capaciteCell = document.createElement('td');
            capaciteCell.textContent = entrepot.capacite;
            row.appendChild(capaciteCell);

            const capaciteRestanteCell = document.createElement('td');
            capaciteRestanteCell.textContent = capaciteRestante;

            if (capaciteRestante >= 0) {
                capaciteRestanteCell.style.backgroundColor = '#4CAF50'; // Vert
            } else {
                capaciteRestanteCell.style.backgroundColor = '#FF6347';
            }

            capaciteRestanteCell.style.color = 'white';
            capaciteRestanteCell.style.fontWeight = 'bold';
            row.appendChild(capaciteRestanteCell);

            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la capacité restante des entrepôts :", error);
    }
}

// ============================
// 🚀 Initialisation au chargement de la page
// ============================
window.onload = function() {
    chargerAlertesStock();
    chargerProduitsEtPieChart();
    chargerEntrepotCount();
    chargerCapaciteRestante();
};

// 🔄 Mise à jour toutes les 90 secondes
setInterval(() => {
    chargerAlertesStock();
    chargerProduitsEtPieChart();
    chargerEntrepotCount();
    chargerCapaciteRestante();
}, 90000);

// ============================
// ✅ Vérifie si le canvas pour la capacité existe
// ============================
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('capaciteRestanteChart');
    console.log('Canvas trouvé:', canvas);
    if (canvas) {
        chargerCapaciteRestante();
    } else {
        console.error('Canvas pour la capacité restante non trouvé !');
    }
});


function logout() {
    localStorage.removeItem("nomUtilisateur");
    window.location.href = "../compte/login.html";
}
