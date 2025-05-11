const API_URL = "http://localhost:9090/api/produits";

document.addEventListener("DOMContentLoaded", () => {
  loadProduits();

 

  // Submit Add Product Form
  document.getElementById("produitForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const produit = {
      nom: document.getElementById("nom").value,
      categorie: document.getElementById("categorie").value,
      prix: parseFloat(document.getElementById("prix").value),
      seuilMin: parseInt(document.getElementById("seuilMin").value),
      fournisseur: document.getElementById("fournisseur").value
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produit)
    }).then(() => {
      showNotification("Produit ajouté avec succès");
      document.getElementById("produitForm").reset();
     
      loadProduits();
    });
  });

  // Submit Edit Product Form
  document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const produit = {
      id: parseInt(id),
      nom: document.getElementById("editNom").value,
      categorie: document.getElementById("editCategorie").value,
      prix: parseFloat(document.getElementById("editPrix").value),
      seuilMin: parseInt(document.getElementById("editSeuilMin").value),
      fournisseur: document.getElementById("editFournisseur").value
    };

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produit)
    }).then(() => {
      showNotification("Produit modifié avec succès");
      closeModal();
      loadProduits();
    });
  });
});

// Load products into the table
function loadProduits() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("produitTableBody");
      tbody.innerHTML = "";
      data.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${p.nom}</td>
          <td>${p.categorie}</td>
          <td>${p.prix} DT</td>
          <td>${p.seuilMin}</td>
          <td>${p.fournisseur}</td>
         <td>
  <button class="edit-btn" onclick="openEditModal(${p.id})">Modifier</button>
  <button class="delete-btn" onclick="confirmDelete(${p.id})">Supprimer</button>
</td>

        `;
        tbody.appendChild(tr);
      });
    });
}

// Open Edit Modal
function openEditModal(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(p => {
      document.getElementById("editId").value = p.id;
      document.getElementById("editNom").value = p.nom;
      document.getElementById("editCategorie").value = p.categorie;
      document.getElementById("editPrix").value = p.prix;
      document.getElementById("editSeuilMin").value = p.seuilMin;
      document.getElementById("editFournisseur").value = p.fournisseur;
      document.getElementById("editModal").style.display = "flex";
    });
}

// Close Edit Modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
}



// Confirm Product Deletion
function confirmDelete(id) {
  if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        showNotification("Produit supprimé avec succès");
        loadProduits();
      });
  }
}

// Show Notification
function showNotification(message, type = 'success') {
  const notif = document.getElementById("notification");
  notif.textContent = message;

  if (type === 'success') {
    notif.style.backgroundColor = '#28a745';
  } else if (type === 'error') {
    notif.style.backgroundColor = '#dc3545';
  }

  notif.style.display = "block";
  setTimeout(() => { notif.style.display = "none"; }, 3000);
}


function logout() {
    localStorage.removeItem("nomUtilisateur");
    window.location.href = "../compte/login.html";
}
