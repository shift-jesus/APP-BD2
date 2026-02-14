// ===== DATOS DE EJEMPLO (MUJERES) =====
const mujeresData = [
    {
        id: 1,
        nombre: 'Marie Curie',
        fechas: '1867-1934',
        pais: 'Polonia / Francia',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg',
        descripcion: 'Pionera en el campo de la radiactividad. Primera persona en ganar dos Premios Nobel en distintas especialidades. Sus investigaciones fueron fundamentales para el desarrollo de la física y la química modernas.',
        biografia: 'Maria Salomea Skłodowska-Curie, más conocida como Marie Curie, fue una física y química polaca nacionalizada francesa. Pionera en el campo de la radiactividad, fue la primera persona en recibir dos premios Nobel en distintas especialidades: Física y Química.'
    },
    {
        id: 2,
        nombre: 'Frida Kahlo',
        fechas: '1907-1954',
        pais: 'México',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Frida_Kahlo.jpg',
        descripcion: 'Pintora mexicana conocida por sus autorretratos y obra inspirada en la naturaleza y artefactos mexicanos. Su obra refleja su vida, su dolor y su pasión por México.',
        biografia: 'Magdalena Carmen Frida Kahlo Calderón fue una pintora mexicana. Su obra gira temáticamente en torno a su biografía y su propio sufrimiento. Fue autora de 150 obras, principalmente autorretratos, en los que proyectó sus dificultades por sobrevivir.'
    },
    {
        id: 3,
        nombre: 'Malala Yousafzai',
        fechas: '1997-presente',
        pais: 'Pakistán',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Malala_Yousafzai_2015.jpg',
        descripcion: 'Activista pakistaní defensora del derecho a la educación. Premio Nobel de la Paz en 2014, convirtiéndose en la persona más joven en recibir este galardón.',
        biografia: 'Malala Yousafzai es una activista pakistaní residente en el Reino Unido desde el atentado sufrido el 9 de octubre de 2012 con 15 años. Recibió el Premio Nobel de la Paz en 2014, a los 17 años, siendo la persona más joven en acceder a ese galardón.'
    }
];

// ===== CARGAR MUJERES EN LA PÁGINA PRINCIPAL =====
function cargarMujeres() {
    const grid = document.getElementById('mujeresGrid');
    if (!grid) return;

    let html = '';
    mujeresData.forEach(m => {
        html += `
            <div class="card">
                <div class="card-image">
                    <img src="${m.imagen}" alt="${m.nombre}" 
                         onerror="this.src='https://via.placeholder.com/300x250?text=Mujer+Empoderada'">
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
    const mujer = mujeresData.find(m => m.id === id);
    if (mujer) {
        // Guardar en sessionStorage para la página de detalle
        sessionStorage.setItem('mujerDetalle', JSON.stringify(mujer));
        window.location.href = '../PAGINAS/mujer.html';
    }
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    cargarMujeres();
});

// Hacer disponible globalmente para admin.js
window.mujeresData = mujeresData;