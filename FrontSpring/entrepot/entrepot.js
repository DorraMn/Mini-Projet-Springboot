const apiUrl = 'http://localhost:9090/api/entrepots';

document.getElementById('entrepotForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const id = document.getElementById('entrepotId').value;
  const entrepot = {
    nom: document.getElementById('nom').value,
    adresse: document.getElementById('adresse').value,
    capacite: parseInt(document.getElementById('capacite').value)
  };

  if (id) {
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrepot)
    });
  } else {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrepot)
    });
  }

  e.target.reset();
  loadEntrepots();
});

async function loadEntrepots() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  const tbody = document.getElementById('entrepotTableBody');
  tbody.innerHTML = '';

  data.forEach(entrepot => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entrepot.nom}</td>
      <td>${entrepot.adresse}</td>
      <td>${entrepot.capacite}</td>
      <td>
        <button class="edit-btn"  onclick="editEntrepot(${entrepot.id})">Modifier</button>
        <button class="delete-btn"  onclick="deleteEntrepot(${entrepot.id})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function editEntrepot(id) {
  const response = await fetch(`${apiUrl}/${id}`);
  const entrepot = await response.json();

  document.getElementById('editId').value = entrepot.id;
  document.getElementById('editNom').value = entrepot.nom;
  document.getElementById('editAdresse').value = entrepot.adresse;
  document.getElementById('editCapacite').value = entrepot.capacite;
  document.getElementById('editModal').style.display = 'block';
}

document.getElementById('editForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const id = document.getElementById('editId').value;
  const updated = {
    nom: document.getElementById('editNom').value,
    adresse: document.getElementById('editAdresse').value,
    capacite: parseInt(document.getElementById('editCapacite').value)
  };

  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  });

  closeModal();
  loadEntrepots();
});

async function deleteEntrepot(id) {
  if (confirm("Confirmer la suppression de cet entrepôt ?")) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    loadEntrepots();
  }
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

window.onload = loadEntrepots;


function logout() {
    localStorage.removeItem("nomUtilisateur");
    window.location.href = "../compte/login.html";
}
