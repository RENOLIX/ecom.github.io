/**
 * Global Utilities & Data Fetching
 */
const API_URL = "https://ecom-api-0eh4.onrender.com"; // TON URL RENDER

const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
};

// Fonction pour récupérer les produits
async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
        return [];
    }
}