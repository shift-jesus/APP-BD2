// ===== URL BASE DE LA API =====
const API_URL = 'http://localhost:8080/api';

// ===== CARGAR MUJERES EN ADMIN =====
async function cargarMujeresAdmin() {
    const grid = document.getElementById('adminMujeresGrid');
    if (!grid) return;

    grid.innerHTML = '<div class="loading">Cargando...</div>';

    try {
        const response = await fetch(`${API_URL}/mujeres`);
        const mujeres  = await response.json();

        if (mujeres.length === 0) {
            grid.innerHTML = '<div class="loading">No hay mujeres registradas.</div>';
            return;
        }

        let html = '';
        mujeres.forEach(m => {
            const iniciales = m.nombre.split(' ').map(n => n[0]).join('').substring(0, 2);
            const imagenSrc = m.imagen
                ? m.imagen
                : `https://placehold.co/300x250/e0770f/ffffff?text=${iniciales}`;

            html += `
                <div class="card" style="position: relative;">
                    <div class="card-image">
                        <img src="${imagenSrc}" alt="${m.nombre}"
                             onerror="this.src='https://placehold.co/300x250/e0770f/ffffff?text=${iniciales}'">
                        <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px; z-index: 10;">
                            <button class="btn-edit" onclick="editarMujer(${m.id})">✏️</button>
                            <button class="btn-delete" onclick="eliminarMujer(${m.id})">🗑️</button>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3>${m.nombre}</h3>
                        <p class="card-fechas">${m.fechas}</p>
                        <span class="card-pais">${m.pais}</span>
                        <p class="card-descripcion">${m.descripcionCorta}</p>
                        <a href="#" class="btn-ver-mas" onclick="verDetalle(${m.id})">Conocer más →</a>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;

    } catch (error) {
        grid.innerHTML = '<div class="loading">Error al cargar. Verifica que el servidor esté activo.</div>';
    }
}

// ===== VER DETALLE =====
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

// ===== EDITAR MUJER (abre modal con datos) =====
async function editarMujer(id) {
    try {
        const response = await fetch(`${API_URL}/mujeres/${id}`);
        const mujer    = await response.json();

        document.getElementById('editId').value          = mujer.id;
        document.getElementById('editNombre').value      = mujer.nombre;
        document.getElementById('editFechas').value      = mujer.fechas;
        document.getElementById('editPais').value        = mujer.pais;
        document.getElementById('editImagen').value      = mujer.imagen || '';
        document.getElementById('editDescripcion').value = mujer.descripcionCorta || '';
        document.getElementById('editBiografia').value   = mujer.biografia || '';
        document.getElementById('modalTitle').textContent = 'Editar Mujer';

        document.getElementById('editModal').classList.add('active');

    } catch (error) {
        alert('Error al cargar los datos de la mujer.');
    }
}

// ===== GUARDAR (crear o actualizar) =====
document.getElementById('editForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const datos = {
        nombre:        document.getElementById('editNombre').value,
        fechas:        document.getElementById('editFechas').value,
        pais:          document.getElementById('editPais').value,
        imagen:        document.getElementById('editImagen').value,
        descripcionCorta: document.getElementById('editDescripcion').value,
        biografia:     document.getElementById('editBiografia').value
    };

    try {
        let response;

        if (id) {
            // ACTUALIZAR
            response = await fetch(`${API_URL}/mujeres/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        } else {
            // CREAR NUEVA
            response = await fetch(`${API_URL}/mujeres`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        }

        if (response.ok) {
            cerrarModal();
            cargarMujeresAdmin();
            alert('¡Cambios guardados correctamente!');
        } else {
            alert('Error al guardar los cambios.');
        }

    } catch (error) {
        alert('No se pudo conectar con el servidor.');
    }
});

// ===== ELIMINAR MUJER =====
async function eliminarMujer(id) {
    if (!confirm('¿Estás seguro de eliminar esta mujer?')) return;

    try {
        const response = await fetch(`${API_URL}/mujeres/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            cargarMujeresAdmin();
        } else {
            alert('Error al eliminar.');
        }

    } catch (error) {
        alert('No se pudo conectar con el servidor.');
    }
}

// ===== CERRAR MODAL =====
function cerrarModal() {
    document.getElementById('editModal').classList.remove('active');
}

document.getElementById('closeModal').addEventListener('click', cerrarModal);
document.getElementById('cancelEdit').addEventListener('click', cerrarModal);

// ===== NUEVA MUJER =====
document.getElementById('btnNuevaMujer').addEventListener('click', function() {
    document.getElementById('editId').value          = '';
    document.getElementById('editNombre').value      = '';
    document.getElementById('editFechas').value      = '';
    document.getElementById('editPais').value        = '';
    document.getElementById('editImagen').value      = '';
    document.getElementById('editDescripcion').value = '';
    document.getElementById('editBiografia').value   = '';
    document.getElementById('modalTitle').textContent = 'Agregar Nueva Mujer';

    document.getElementById('editModal').classList.add('active');
});

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    const user = Auth.getCurrentUser();
    if (!user || !Auth.isMod()) {
        window.location.href = '../HTML/Login.html';
        return;
    }
    document.getElementById('userName').textContent = user.nombre;
    cargarMujeresAdmin();
});