// ===== GESTIÓN DE AUTENTICACIÓN =====
const Auth = {
    // Verificar si hay sesión
    checkSession: function() {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    },

    // Iniciar sesión
    login: function(email, password) {
        // SIMULACIÓN (después conectará con Java)
        if (email === 'mod@mujeres.com' && password === 'mod123') {
            const user = {
                email: email,
                nombre: 'Moderadora',
                rol: 'MOD',
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, user: user };
        }
        return { success: false, error: 'Credenciales inválidas' };
    },

    // Cerrar sesión
    logout: function() {
        localStorage.removeItem('user');
        window.location.href = '../HTML/index.html';
    },

    // Verificar si es MOD
    isMod: function() {
        const user = this.checkSession();
        return user && user.rol === 'MOD';
    },

    // Obtener usuario actual
    getCurrentUser: function() {
        return this.checkSession();
    }
};

// ===== ACTUALIZAR UI SEGÚN SESIÓN =====
function updateUIForAuth() {
    const user = Auth.checkSession();
    const loginLink = document.getElementById('loginLink');
    const userMenu = document.getElementById('userMenu');
    const modBadge = document.getElementById('modBadge');
    const userName = document.getElementById('userName');

    if (user) {
        // Hay sesión
        if (loginLink) loginLink.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'flex';
            if (userName) userName.textContent = user.nombre;
        }
        if (modBadge && user.rol === 'MOD') {
            modBadge.style.display = 'inline-block';
        }
    } else {
        // No hay sesión
        if (loginLink) loginLink.style.display = 'inline-block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// ===== EVENTO DE LOGOUT =====
document.addEventListener('click', function(e) {
    if (e.target.id === 'logoutBtn') {
        Auth.logout();
    }
});

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    updateUIForAuth();
    
    // Verificar acceso a páginas protegidas
    const isAdminPage = window.location.pathname.includes('admin.html');
    if (isAdminPage && !Auth.isMod()) {
        window.location.href = 'login.html?error=unauthorized';
    }
});