const stockApiUrl = 'http://localhost:9090/api/stocks';
const produitApiUrl = 'http://localhost:9090/api/produits';
const entrepotApiUrl = 'http://localhost:9090/api/entrepots';

async function fetchProduits() {
  const res = await fetch(produitApiUrl);
  const data = await res.json();
  const select = document.getElementById('produitSelect');
  const popupSelect = document.getElementById('popupProduitSelect');
  select.innerHTML = '';
  popupSelect.innerHTML = '';
  data.forEach(produit => {
    const option = document.createElement('option');
    option.value = produit.id;
    option.textContent = produit.nom;
    select.appendChild(option);
    const popupOption = document.createElement('option');
    popupOption.value = produit.id;
    popupOption.textContent = produit.nom;
    popupSelect.appendChild(popupOption);
  });
}

async function fetchEntrepots() {
  const res = await fetch(entrepotApiUrl);
  const data = await res.json();
  const select = document.getElementById('entrepotSelect');
  const popupSelect = document.getElementById('popupEntrepotSelect');
  select.innerHTML = '';
  popupSelect.innerHTML = '';
  data.forEach(entrepot => {
    const option = document.createElement('option');
    option.value = entrepot.id;
    option.textContent = entrepot.nom;
    select.appendChild(option);
    const popupOption = document.createElement('option');
    popupOption.value = entrepot.id;
    popupOption.textContent = entrepot.nom;
    popupSelect.appendChild(popupOption);
  });
}

document.getElementById('stockForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const id = document.getElementById('stockId').value;
  const stock = {
    produit: { id: document.getElementById('produitSelect').value },
    entrepot: { id: document.getElementById('entrepotSelect').value },
    quantite: parseInt(document.getElementById('quantite').value),
    seuilAlerte: parseInt(document.getElementById('seuilAlerte').value)
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${stockApiUrl}/${id}` : stockApiUrl;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock)
  });

  e.target.reset();
  loadStocks();
});

async function loadStocks() {
  const res = await fetch(stockApiUrl);
  const stocks = await res.json();

  const tbody = document.getElementById('stockTableBody');
  tbody.innerHTML = '';

  stocks.forEach(stock => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${stock.produit?.nom || 'N/A'}</td>
      <td>${stock.entrepot?.nom || 'N/A'}</td>
      <td>${stock.quantite}</td>
      <td>${stock.seuilAlerte}</td>
      <td>
        <button class="edit-btn" onclick="editStock(${stock.id})">Modifier</button>
        <button  class="delete-btn" onclick="deleteStock(${stock.id})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function editStock(id) {
  const res = await fetch(`${stockApiUrl}/${id}`);
  const stock = await res.json();

  // Remplir les champs du formulaire dans la popup avec les données du stock
  document.getElementById('popupStockId').value = stock.id;
  document.getElementById('popupProduitSelect').value = stock.produit.id;
  document.getElementById('popupEntrepotSelect').value = stock.entrepot.id;
  document.getElementById('popupQuantite').value = stock.quantite;
  document.getElementById('popupSeuilAlerte').value = stock.seuilAlerte;

  // Afficher la popup
  document.getElementById('popupModal').style.display = 'block';
}

document.getElementById('popupStockForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const id = document.getElementById('popupStockId').value;
  const stock = {
    produit: { id: document.getElementById('popupProduitSelect').value },
    entrepot: { id: document.getElementById('popupEntrepotSelect').value },
    quantite: parseInt(document.getElementById('popupQuantite').value),
    seuilAlerte: parseInt(document.getElementById('popupSeuilAlerte').value)
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${stockApiUrl}/${id}` : stockApiUrl;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock)
  });

  loadStocks();
  closePopup();
});

function closePopup() {
  document.getElementById('popupModal').style.display = 'none';
}

async function deleteStock(id) {
  if (confirm('Confirmer la suppression ?')) {
    await fetch(`${stockApiUrl}/${id}`, { method: 'DELETE' });
    loadStocks();
  }
}

window.onload = async () => {
  await fetchProduits();
  await fetchEntrepots();
  loadStocks();
};


function logout() {
    localStorage.removeItem("nomUtilisateur");
    window.location.href = "../compte/login.html";
}
