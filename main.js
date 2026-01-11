/**
 * Global Utilities for ElectroPro
 */
const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
};

// Initial state for simulation (shared logic)
let demoProducts = [
    { id: 1, name: "PC UltraPort Pro", price: 1499.99, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Casque Studio Z1", price: 299.00, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Moniteur 4K 32\"", price: 599.50, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Clavier Mécanique RGB", price: 159.00, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=400&q=80" }
];
