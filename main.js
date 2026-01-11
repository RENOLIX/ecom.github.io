/**
 * Configuration et Connexion à l'API
 */
const API_URL = "https://ecom-api-0eh4.onrender.com/api";

/**
 * Utilitaire : Formater le prix en Euros (ex: 49.90 €)
 */
const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR' 
    }).format(price);
};

/**
 * 1. Récupérer les produits depuis le serveur Render
 */
async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Erreur API :", error);
        return [];
    }
}

/**
 * 2. Afficher les produits dans le HTML
 */
async function displayProducts() {
    // On cherche l'endroit où afficher les produits (l'id dans ton HTML)
    const container = document.getElementById('products-grid');
    
    // Si on n'est pas sur une page qui a la grille de produits, on s'arrête
    if (!container) return;

    // Affichage d'un message de chargement
    container.innerHTML = "<p>Chargement des produits en cours...</p>";

    const products = await getProducts();

    // Si le serveur ne renvoie rien
    if (products.length === 0) {
        container.innerHTML = "<p>Aucun produit trouvé dans la base de données.</p>";
        return;
    }

    // On vide le container avant d'ajouter les produits
    container.innerHTML = "";

    // On crée le HTML pour chaque produit
    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/300x200?text=Image+non+disponible'">
                </div>
                <div class="product-info">
                    <span class="category">${product.category || 'Électronique'}</span>
                    <h3>${product.name}</h3>
                    <p class="description">${product.description || ''}</p>
                    <p class="price">${formatPrice(product.price)}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

/**
 * 3. Fonction Panier (Optionnel - pour éviter les erreurs au clic)
 */
function addToCart(productId) {
    console.log("Produit ajouté au panier, ID:", productId);
    alert("Produit ajouté au panier !");
}

/**
 * 4. Lancer l'affichage dès que la page est chargée
 */
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});
