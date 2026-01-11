/**
 * E-commerce Store Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    if (productContainer) {
        renderShop();
    }
    updateCartCount();
});

function renderShop() {
    const container = document.getElementById('product-container');
    container.innerHTML = demoProducts.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <div class="p-info">
                <h3>${p.name}</h3>
                <p class="p-price">${formatPrice(p.price)}</p>
                <button class="btn btn-primary" onclick="handleAddToCart(${p.id})" style="width:100%">Ajouter au panier</button>
            </div>
        </div>
    `).join('');
}

function handleAddToCart(id) {
    // Note: Since localStorage is forbidden, we simulate logic
    alert('Produit ajouté au panier (Simulé)!');
    // In a real app without storage, state management would be complex via URL
}

function updateCartCount() {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => b.innerText = '0');
}
