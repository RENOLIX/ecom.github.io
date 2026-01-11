/**
 * Administration Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    renderAdminList();
    
    document.getElementById('p-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Produit ajouté (Simulation Admin)!');
        toggleAddForm();
    });
});

function toggleAddForm() {
    const form = document.getElementById('add-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function renderAdminList() {
    const list = document.getElementById('admin-p-list');
    list.innerHTML = demoProducts.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td><img src="${p.img}" style="width:50px; height:50px; border-radius:4px;"></td>
            <td>${p.name}</td>
            <td>${formatPrice(p.price)}</td>
            <td>
                <button class="btn" style="background:#fee2e2; color:#ef4444; padding:5px 10px;" onclick="alert('Supprimé!')">Supprimer</button>
            </td>
        </tr>
    `).join('');
}
