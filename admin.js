const API_BASE = ""; // mis à jour quand Render sera prêt
const form = document.getElementById("productForm");
const listEl = document.getElementById("adminList");

async function fetchProducts() {
  const res = await fetch(`${API_BASE || ""}/api/products`);
  const data = await res.json();
  renderList(data);
}

/* ...reste du JS fourni précédemment... */
