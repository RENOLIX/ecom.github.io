const API = "/api/products";
const productsEl = document.getElementById("products");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

async function loadProducts() {
  if (!productsEl) return;
  const res = await fetch(API);
  const products = await res.json();

  productsEl.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}">
      <div class="card-content">
        <h3>${p.name}</h3>
        <div class="price">${p.price} €</div>
        <button onclick='addToCart(${JSON.stringify(p)})'>Ajouter</button>
      </div>
    </div>
  `).join("");
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function loadCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  if (!itemsEl) return;

  let total = 0;
  itemsEl.innerHTML = cart.map(p => {
    total += p.price;
    return `<div class="cart-item">
      <span>${p.name}</span>
      <span>${p.price} €</span>
    </div>`;
  }).join("");

  totalEl.textContent = "Total : " + total.toFixed(2) + " €";
}

updateCartCount();
loadProducts();
loadCart();
