// ===== DATOS DE MUJERES EMPODERADAS =====
const mujeresData = [
    {
        id: 1,
        nombre: 'Marie Curie',
        fechas: '1867-1934',
        pais: 'Polonia / Francia',
        imagen: '../IMAGENES/maria-curie.webp',  // Esta SÍ tiene imagen
        descripcion: 'Pionera en el campo de la radiactividad. Primera persona en ganar dos Premios Nobel en distintas especialidades. Sus investigaciones fueron fundamentales para el desarrollo de la física y la química modernas.',
        biografia: 'Maria Salomea Skłodowska-Curie, más conocida como Marie Curie, fue una física y química polaca nacionalizada francesa. Pionera en el campo de la radiactividad, fue la primera persona en recibir dos premios Nobel en distintas especialidades: Física y Química. Descubrió los elementos radio y polonio, y desarrolló la teoría de la radiactividad.'
    },
    {
        id: 2,
        nombre: 'Frida Kahlo',
        fechas: '1907-1954',
        pais: 'México',
        imagen: '',  // Sin imagen por ahora
        descripcion: 'Pintora mexicana conocida por sus autorretratos y obra inspirada en la naturaleza y artefactos mexicanos. Su obra refleja su vida, su dolor y su pasión por México.',
        biografia: 'Magdalena Carmen Frida Kahlo Calderón fue una pintora mexicana. Su obra gira temáticamente en torno a su biografía y su propio sufrimiento. Fue autora de 150 obras, principalmente autorretratos, en los que proyectó sus dificultades por sobrevivir. Su casa familiar, La Casa Azul, ahora es un museo dedicado a su obra.'
    },
    {
        id: 3,
        nombre: 'Malala Yousafzai',
        fechas: '1997-presente',
        pais: 'Pakistán',
        imagen: '',  // Sin imagen por ahora
        descripcion: 'Activista pakistaní defensora del derecho a la educación. Premio Nobel de la Paz en 2014, convirtiéndose en la persona más joven en recibir este galardón.',
        biografia: 'Malala Yousafzai es una activista pakistaní residente en el Reino Unido desde el atentado sufrido el 9 de octubre de 2012 con 15 años. Recibió el Premio Nobel de la Paz en 2014, a los 17 años, siendo la persona más joven en acceder a ese galardón. Es conocida por su lucha a favor de los derechos civiles y especialmente de los derechos de las mujeres en el valle del río Swat, donde el régimen talibán prohibía la asistencia a la escuela de las niñas.'
    },
    {
        id: 4,
        nombre: 'Rosa Parks',
        fechas: '1913-2005',
        pais: 'Estados Unidos',
        imagen: '',  // Sin imagen por ahora
        descripcion: 'Figura importante del movimiento por los derechos civiles en EE.UU. Conocida como "la primera dama de los derechos civiles" por su valiente acto de resistencia.',
        biografia: 'Rosa Louise Parks fue una activista afroamericana, figura importante del movimiento por los derechos civiles en Estados Unidos. Ocupó un asiento para blancos en lugar de ir en la parte trasera del autobús, lo que desencadenó el boicot de autobuses de Montgomery. Su acto de desobediencia civil se convirtió en un símbolo del movimiento y la lucha contra la segregación racial.'
    },
    {
        id: 5,
        nombre: 'Simone de Beauvoir',
        fechas: '1908-1986',
        pais: 'Francia',
        imagen: '',  // Sin imagen por ahora
        descripcion: 'Filósofa, escritora y feminista francesa. Autora de "El segundo sexo", obra fundamental del feminismo moderno.',
        biografia: 'Simone de Beauvoir fue una filósofa, profesora, escritora y activista feminista francesa. Escribió novelas, ensayos, biografías y monografías sobre filosofía, política y sociedad. Es conocida por su tratado El segundo sexo (1949), un análisis profundo sobre la opresión de las mujeres y un texto fundacional del feminismo contemporáneo.'
    }
];

// ===== CARGAR MUJERES EN LA PÁGINA PRINCIPAL =====
function cargarMujeres() {
    const grid = document.getElementById('mujeresGrid');
    if (!grid) return;

    let html = '';
    mujeresData.forEach(m => {
        // Determinar qué imagen mostrar
        let imagenSrc = m.imagen;
        let imagenAlt = m.nombre;
        
        // Si no hay imagen, usar un placeholder con iniciales
        if (!imagenSrc) {
            // Crear un placeholder con las iniciales
            const iniciales = m.nombre.split(' ').map(n => n[0]).join('').substring(0, 2);
            imagenSrc = `https://via.placeholder.com/300x250/e0770f/ffffff?text=${iniciales}`;
        }
        
        html += `
            <div class="card">
                <div class="card-image">
                    <img src="${imagenSrc}" alt="${m.nombre}" 
                         onerror="this.src='https://via.placeholder.com/300x250/e0770f/ffffff?text=${m.nombre.split(' ')[0]}'">
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
        sessionStorage.setItem('mujerDetalle', JSON.stringify(mujer));
        window.location.href = '../HTML/mujer.html';
    }
}

// ===== CREAR PÁGINA DE DETALLE SI NO EXISTE =====
// Nota: Esto es por si no has creado mujer.html aún
function crearPaginaDetalle() {
    // Esta función es solo informativa
    console.log('Para ver detalles, necesitas crear la página mujer.html');
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    cargarMujeres();
});

// Hacer disponible globalmente para admin.js
window.mujeresData = mujeresData;
// ===== GESTIÓN DE AUTENTICACIÓN - MODO PRUEBA =====
const Auth = {
    // Verificar si hay sesión
    checkSession: function() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Iniciar sesión - MODO PRUEBA (cualquier cosa funciona)
    login: function(email, password) {
        const user = {
            email: email || 'mod@prueba.com',
            nombre: 'Moderadora',
            rol: 'MOD',
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user: user };
    },

    // Cerrar sesión - AHORA REDIRIGE A INDEX.HTML
    logout: function() {
        localStorage.removeItem('user');
        window.location.href = '../HTML/index.html';  // Redirige a index.html
    },

    // Verificar si es MOD - SIEMPRE TRUE PARA PRUEBAS
    isMod: function() {
        return true;  // Todos pueden acceder a admin
    },

    // Obtener usuario actual
    getCurrentUser: function() {
        const user = this.checkSession();
        if (!user) {
            const defaultUser = {
                email: 'mod@default.com',
                nombre: 'Moderadora',
                rol: 'MOD'
            };
            localStorage.setItem('user', JSON.stringify(defaultUser));
            return defaultUser;
        }
        return user;
    }
};

// ===== ACTUALIZAR UI =====
function updateUIForAuth() {
    const user = Auth.getCurrentUser();
    const loginLink = document.getElementById('loginLink');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (loginLink) loginLink.style.display = 'none';
    if (userMenu) {
        userMenu.style.display = 'flex';
        if (userName) userName.textContent = user.nombre;
    }
}

// ===== LOGOUT - Versión mejorada =====
document.addEventListener('click', function(e) {
    if (e.target.id === 'logoutBtn') {
        e.preventDefault();  // Prevenir cualquier acción por defecto
        Auth.logout();  // Esto ya redirige a index.html
    }
});

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    updateUIForAuth();
});