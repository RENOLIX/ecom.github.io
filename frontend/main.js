const API_BASE = ""; // on mettra plus tard l’URL Render
const catalogueEl = document.getElementById("catalogue");
const cartPanel = document.getElementById("cartPanel");
const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const ctaBtn = document.getElementById("cta");

let products = [];
let cart = JSON.parse(localStorage.getItem("nova-cart") || "[]");

async function loadProducts() {
  const res = await fetch(`${API_BASE || ""}/api/products`);
  products = await res.json();
  renderProducts();
  renderCart();
}

/* ...reste du JS fourni précédemment... */
