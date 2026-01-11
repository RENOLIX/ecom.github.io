/**
 * Public Site Display Logic
 */
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('product-container');
    
    // 1. On affiche un message de chargement (optionnel)
    if (container) container.innerHTML = "<p>Chargement des produits...</p>";

    // 2. On récupère les vrais produits depuis Render (via la fonction dans main.js)
    const products = await getProducts();

    // 3. On nettoie le conteneur
    if (!container) return;
    container.innerHTML = "";

    // 4. Si aucun produit, on affiche un message
    if (products.length === 0) {
        container.innerHTML = "<p>Aucun produit disponible pour le moment.</p>";
        return;
    }

    // 5. On crée les cartes produits
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-badge">${product.category || 'Électronique'}</div>
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="btn btn-primary" style="width:100%; margin-top:10px;" onclick="addToCart('${product.id}')">
                    <i class="ph ph-shopping-cart"></i> Ajouter
                </button>
            </div>
        `;
        container.appendChild(card);
    });
});

// Simulation panier (pour éviter les erreurs si tu n'as pas encore de code panier)
function addToCart(id) {
    alert("Produit ajouté au panier ! (ID: " + id + ")");
}