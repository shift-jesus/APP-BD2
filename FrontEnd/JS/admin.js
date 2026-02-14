// ===== VERIFICAR ACCESO =====
// En modo prueba, siempre accedemos

// ===== DATOS (usamos los mismos de main.js) =====
let mujeres = [...window.mujeresData || []];

// ===== CARGAR MUJERES EN ADMIN (con el mismo grid que index.html) =====
function cargarMujeresAdmin() {
    const grid = document.getElementById('adminMujeresGrid');
    if (!grid) return;

    if (mujeres.length === 0) {
        grid.innerHTML = '<div class="loading">No hay mujeres registradas</div>';
        return;
    }

    let html = '';
    mujeres.forEach(m => {
        // Determinar qué imagen mostrar
        let imagenSrc = m.imagen;
        let iniciales = m.nombre.split(' ').map(n => n[0]).join('').substring(0, 2);
        
        if (!imagenSrc) {
            imagenSrc = `https://via.placeholder.com/300x250/e0770f/ffffff?text=${iniciales}`;
        }
        
        html += `
            <div class="card" style="position: relative;">
                <div class="card-image">
                    <img src="${imagenSrc}" alt="${m.nombre}" 
                         onerror="this.src='https://via.placeholder.com/300x250/e0770f/ffffff?text=${iniciales}'">
                    <!-- Botones de edición en la esquina -->
                    <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px; z-index: 10;">
                        <button class="btn-edit" onclick="editarMujer(${m.id})" style="background: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                            ✏️
                        </button>
                        <button class="btn-delete" onclick="eliminarMujer(${m.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <h3>${m.nombre}</h3>
                    <p class="card-fechas">${m.fechas}</p>
                    <span class="card-pais">${m.pais}</span>
                    <p class="card-descripcion">${m.descripcion}</p>
                    <a href="#" class="btn-ver-mas" onclick="verDetalle(${m.id})">
                        Conocer más →
                    </a>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// ===== VER DETALLE DE MUJER =====
function verDetalle(id) {
    const mujer = mujeres.find(m => m.id === id);
    if (mujer) {
        sessionStorage.setItem('mujerDetalle', JSON.stringify(mujer));
        window.location.href = '../HTML/mujer.html';
    }
}

// ===== EDITAR MUJER =====
function editarMujer(id) {
    const mujer = mujeres.find(m => m.id === id);
    if (!mujer) return;

    document.getElementById('editId').value = mujer.id;
    document.getElementById('editNombre').value = mujer.nombre;
    document.getElementById('editFechas').value = mujer.fechas;
    document.getElementById('editPais').value = mujer.pais;
    document.getElementById('editImagen').value = mujer.imagen || '';
    document.getElementById('editDescripcion').value = mujer.descripcion;
    document.getElementById('editBiografia').value = mujer.biografia || '';
    document.getElementById('modalTitle').textContent = 'Editar Mujer';

    document.getElementById('editModal').classList.add('active');
}

// ===== GUARDAR EDICIÓN =====
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const index = mujeres.findIndex(m => m.id === id);

    const mujerActualizada = {
        id: id,
        nombre: document.getElementById('editNombre').value,
        fechas: document.getElementById('editFechas').value,
        pais: document.getElementById('editPais').value,
        imagen: document.getElementById('editImagen').value,
        descripcion: document.getElementById('editDescripcion').value,
        biografia: document.getElementById('editBiografia').value
    };

    if (index !== -1) {
        mujeres[index] = mujerActualizada;
    } else {
        mujeres.push(mujerActualizada);
    }

    cerrarModal();
    cargarMujeresAdmin();
    alert('¡Cambios guardados correctamente!');
});

// ===== ELIMINAR MUJER =====
function eliminarMujer(id) {
    if (confirm('¿Estás seguro de eliminar esta mujer?')) {
        mujeres = mujeres.filter(m => m.id !== id);
        cargarMujeresAdmin();
    }
}

// ===== CERRAR MODAL =====
function cerrarModal() {
    document.getElementById('editModal').classList.remove('active');
}

// ===== EVENTOS DEL MODAL =====
document.getElementById('closeModal').addEventListener('click', cerrarModal);
document.getElementById('cancelEdit').addEventListener('click', cerrarModal);

// ===== NUEVA MUJER =====
document.getElementById('btnNuevaMujer').addEventListener('click', function() {
    const newId = Math.max(...mujeres.map(m => m.id), 0) + 1;
    
    document.getElementById('editId').value = newId;
    document.getElementById('editNombre').value = '';
    document.getElementById('editFechas').value = '';
    document.getElementById('editPais').value = '';
    document.getElementById('editImagen').value = '';
    document.getElementById('editDescripcion').value = '';
    document.getElementById('editBiografia').value = '';
    document.getElementById('modalTitle').textContent = 'Agregar Nueva Mujer';
    
    document.getElementById('editModal').classList.add('active');
});

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    const user = Auth.getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.nombre;
    }
    
    cargarMujeresAdmin();
});