const API_BASE = "http://localhost:9090/api";

document.addEventListener("DOMContentLoaded", () => {
    chargerProduits();
    chargerEntrepots();
    chargerMouvements();

    document.getElementById("mouvementForm").addEventListener("submit", ajouterMouvement);
    document.getElementById("editForm").addEventListener("submit", modifierMouvement);
});

let produits = [];
let entrepots = [];

async function chargerProduits() {
    const res = await fetch(`${API_BASE}/produits`);
    produits = await res.json();
    
    const selectProduit = document.getElementById("produit");
    const selectEditProduit = document.getElementById("editProduit");

    // Vider les listes avant de remplir
    selectProduit.innerHTML = "";
    selectEditProduit.innerHTML = "";

    produits.forEach(p => {
        const option1 = document.createElement("option");
        option1.value = p.id;
        option1.textContent = p.nom;
        selectProduit.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = p.id;
        option2.textContent = p.nom;
        selectEditProduit.appendChild(option2);
    });
}

async function chargerEntrepots() {
    const res = await fetch(`${API_BASE}/entrepots`);
    entrepots = await res.json();

    const selectEntrepot = document.getElementById("entrepot");
    const selectEditEntrepot = document.getElementById("editEntrepot");

    // Vider les listes avant de remplir
    selectEntrepot.innerHTML = "";
    selectEditEntrepot.innerHTML = "";

    entrepots.forEach(e => {
        const option1 = document.createElement("option");
        option1.value = e.id;
        option1.textContent = e.nom;
        selectEntrepot.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = e.id;
        option2.textContent = e.nom;
        selectEditEntrepot.appendChild(option2);
    });
}

async function chargerMouvements() {
    const res = await fetch(`${API_BASE}/mouvements`);
    const mouvements = await res.json();

    console.log("Mouvements récupérés :", mouvements);

    const tbody = document.getElementById("mouvementsTableBody");
    tbody.innerHTML = "";

    mouvements.forEach(m => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${m.id}</td>
            <td>${m.produit.nom}</td>
            <td>${m.type}</td>
            <td>${m.quantite}</td>
            <td>${new Date(m.date).toLocaleString()}</td>
            <td>${m.entrepot.nom}</td>
            <td>
                <button class="edit-btn" onclick="afficherPopup(${m.id})">Modifier</button>
                <button class="delete-btn" onclick="supprimerMouvement(${m.id})">Supprimer</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function ajouterMouvement(e) {
    e.preventDefault();

    const produitId = document.getElementById("produit").value;
    const entrepotId = document.getElementById("entrepot").value;
    const type = document.getElementById("type").value;
    const quantite = document.getElementById("quantite").value;

    const mouvement = {
        produit: { id: parseInt(produitId) },
        entrepot: { id: parseInt(entrepotId) },
        type: type,
        quantite: parseInt(quantite),
        date: new Date().toISOString()
    };

    try {
        const res = await fetch(`${API_BASE}/mouvements`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mouvement)
        });

        const data = await res.json();

        if (res.ok) {
            alert("Mouvement ajouté !");
            chargerMouvements();
            document.getElementById("mouvementForm").reset();
        } else {
            alert("Erreur : " + data.message);
        }

    } catch (err) {
        console.error("Erreur réseau :", err);
    }
}


async function afficherPopup(id) {
    const res = await fetch(`${API_BASE}/mouvements/${id}`);
    const mouvement = await res.json();

    document.getElementById("editId").value = mouvement.id;
    document.getElementById("editProduit").value = mouvement.produit.id;
    document.getElementById("editEntrepot").value = mouvement.entrepot.id;
    document.getElementById("editType").value = mouvement.type;
    document.getElementById("editQuantite").value = mouvement.quantite;

    // Affichage du popup
    document.getElementById("editPopup").style.display = "block";  // Affiche le popup
}


function fermerPopup() {
    document.getElementById("editPopup").style.display = "none";
}

async function modifierMouvement(e) {
    e.preventDefault();

    const id = document.getElementById("editId").value;
    const produitId = document.getElementById("editProduit").value;
    const entrepotId = document.getElementById("editEntrepot").value;
    const type = document.getElementById("editType").value;
    const quantite = document.getElementById("editQuantite").value;

    const mouvement = {
        id,
        produit: { id: produitId },
        entrepot: { id: entrepotId },
        type,
        quantite,
        date: new Date().toISOString()
    };

    const res = await fetch(`${API_BASE}/mouvements/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mouvement)
    });

    if (res.ok) {
        alert("Mouvement modifié !");
        fermerPopup();
        chargerMouvements();
    } else {
        alert("Erreur lors de la modification !");
    }
}

async function supprimerMouvement(id) {
    const confirmation = confirm("Voulez-vous vraiment supprimer ce mouvement ?");
    if (!confirmation) return;

    const res = await fetch(`${API_BASE}/mouvements/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        alert("Mouvement supprimé !");
        chargerMouvements();
    } else {
        alert("Erreur lors de la suppression !");
    }
}


function logout() {
    localStorage.removeItem("nomUtilisateur");
    window.location.href = "../compte/login.html";
}
