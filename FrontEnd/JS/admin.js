// ===== VERIFICAR ACCESO =====
if (!Auth.isMod()) {
    window.location.href = 'login.html?error=unauthorized';
}

// ===== DATOS (usamos los mismos de main.js) =====
let mujeres = [...window.mujeresData || []];

// ===== CARGAR MUJERES EN ADMIN =====
function cargarMujeresAdmin() {
    const grid = document.getElementById('adminMujeresGrid');
    if (!grid) return;

    if (mujeres.length === 0) {
        grid.innerHTML = '<div class="loading">No hay mujeres registradas</div>';
        return;
    }

    let html = '';
    mujeres.forEach(m => {
        html += `
            <div class="admin-card" style="margin-bottom: 20px;">
                <div class="admin-card-image">
                    <img src="${m.imagen}" alt="${m.nombre}" 
                         onerror="this.src='https://via.placeholder.com/100?text=Mujer'">
                </div>
                <div class="admin-card-content">
                    <h3 style="color: var(--color-primario); margin-bottom: 5px;">${m.nombre}</h3>
                    <p style="color: #666; margin-bottom: 5px;"><strong>${m.fechas}</strong> | ${m.pais}</p>
                    <p style="margin-bottom: 15px;">${m.descripcion}</p>
                    <div class="admin-card-actions">
                        <button class="btn-edit" onclick="editarMujer(${m.id})">
                            ✏️ Editar
                        </button>
                        <button class="btn-delete" onclick="eliminarMujer(${m.id})">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// ===== EDITAR MUJER =====
function editarMujer(id) {
    const mujer = mujeres.find(m => m.id === id);
    if (!mujer) return;

    document.getElementById('editId').value = mujer.id;
    document.getElementById('editNombre').value = mujer.nombre;
    document.getElementById('editFechas').value = mujer.fechas;
    document.getElementById('editPais').value = mujer.pais;
    document.getElementById('editImagen').value = mujer.imagen;
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

    if (index !== -1) {
        // Actualizar existente
        mujeres[index] = {
            id: id,
            nombre: document.getElementById('editNombre').value,
            fechas: document.getElementById('editFechas').value,
            pais: document.getElementById('editPais').value,
            imagen: document.getElementById('editImagen').value,
            descripcion: document.getElementById('editDescripcion').value,
            biografia: document.getElementById('editBiografia').value
        };
    } else {
        // Crear nueva
        const nuevaMujer = {
            id: id,
            nombre: document.getElementById('editNombre').value,
            fechas: document.getElementById('editFechas').value,
            pais: document.getElementById('editPais').value,
            imagen: document.getElementById('editImagen').value,
            descripcion: document.getElementById('editDescripcion').value,
            biografia: document.getElementById('editBiografia').value
        };
        mujeres.push(nuevaMujer);
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