/**
 * Configuration : Lien vers ton serveur Render
 */
const API_URL = "https://ecom-api-0eh4.onrender.com/api";

/**
 * Utilitaire : Formater le prix
 */
const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR' 
    }).format(price);
};

/**
 * 1. Récupérer les produits depuis l'API
 */
async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Erreur serveur");
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
        return [];
    }
}

/**
 * 2. Afficher les produits dans le HTML
 */
async function displayProducts() {
    // ON UTILISE L'ID "product-container" QUI EST DANS TON HTML
    const container = document.getElementById('product-container');
    
    if (!container) {
        console.error("Le container 'product-container' n'existe pas dans le HTML");
        return;
    }

    container.innerHTML = "<p>Chargement des produits...</p>";

    const products = await getProducts();

    if (products.length === 0) {
        container.innerHTML = "<p>Aucun produit disponible pour le moment.</p>";
        return;
    }

    container.innerHTML = ""; // On vide le message de chargement

    products.forEach(product => {
        // On crée la carte du produit
        const productHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/300x200?text=Image+Indisponible'">
                </div>
                <div class="product-info">
                    <span class="category">${product.category || 'Électronique'}</span>
                    <h3>${product.name}</h3>
                    <p class="price">${formatPrice(product.price)}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="ph ph-shopping-cart"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

/**
 * 3. Gestion du panier (simulation)
 */
function addToCart(id) {
    console.log("Ajout au panier du produit ID :", id);
    alert("Produit ajouté au panier !");
}

/**
 * 4. Lancement automatique
 */
document.addEventListener('DOMContentLoaded', displayProducts);
