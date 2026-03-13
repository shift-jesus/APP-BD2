// ===== URL BASE DE LA API =====
const API_URL = 'http://localhost:8080/api ';

// ===== CARGAR MUJERES DESDE LA API =====
async function cargarMujeres() {
    const grid = document.getElementById('mujeresGrid');
    if (!grid) return;

    grid.innerHTML = '<div class="loading">Cargando mujeres empoderadas...</div>';

    try {
        const response = await fetch(`${API_URL}/mujeres`);
        const mujeres  = await response.json();

        if (mujeres.length === 0) {
            grid.innerHTML = '<div class="loading">No hay mujeres registradas aún.</div>';
            return;
        }

        let html = '';
        mujeres.forEach(m => {
            const iniciales = m.nombre.split(' ').map(n => n[0]).join('').substring(0, 2);
            const imagenSrc = m.imagen
                ? m.imagen
                : `https://placehold.co/300x250/e0770f/ffffff?text=${iniciales}`;

            html += `
                <div class="card">
                    <div class="card-image">
                        <img src="${imagenSrc}" alt="${m.nombre}"
                             onerror="this.src='https://placehold.co/300x250/e0770f/ffffff?text=${iniciales}'">
                    </div>
                    <div class="card-content">
                        <h3>${m.nombre}</h3>
                        <p class="card-fechas">${m.fechas}</p>
                        <span class="card-pais">${m.pais}</span>
                        <p class="card-descripcion">${m.descripcionCorta}</p>
                        <a href="#" class="btn-ver-mas" onclick="verDetalle(${m.id})">
                            Conocer más →
                        </a>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;

    } catch (error) {
        grid.innerHTML = '<div class="loading">Error al cargar los datos. Verifica que el servidor esté activo.</div>';
    }
}

// ===== VER DETALLE DE MUJER =====
async function verDetalle(id) {
    try {
        const response = await fetch(`${API_URL}/mujeres/${id}`);
        const mujer    = await response.json();
        sessionStorage.setItem('mujerDetalle', JSON.stringify(mujer));
        window.location.href = '../PAGINAS/mujer.html';
    } catch (error) {
        alert('Error al cargar el detalle.');
    }
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    cargarMujeres();
});