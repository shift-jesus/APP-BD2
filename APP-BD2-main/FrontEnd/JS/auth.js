// ===== URL BASE DE LA API =====
const API_URL = 'http://localhost:8080/api';

// ===== AUTENTICACIÓN =====
const Auth = {

    checkSession: function() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    login: async function(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Error al iniciar sesión' };
            }

            localStorage.setItem('user', JSON.stringify(data));
            return { success: true, user: data };

        } catch (error) {
            return { success: false, error: 'No se pudo conectar con el servidor' };
        }
    },

    logout: function() {
        localStorage.removeItem('user');
        window.location.href = '../HTML/index.html';
    },

    isMod: function() {
        const user = this.checkSession();
        return user && (user.rol === 'MOD' || user.rol === 'ADMIN');
    },

    isAdmin: function() {
        const user = this.checkSession();
        return user && user.rol === 'ADMIN';
    },

    getCurrentUser: function() {
        return this.checkSession();
    }
};

// ===== ACTUALIZAR UI SEGÚN SESIÓN =====
function updateUIForAuth() {
    const user = Auth.getCurrentUser();
    const loginLink  = document.getElementById('loginLink');
    const userMenu   = document.getElementById('userMenu');
    const userName   = document.getElementById('userName');

    if (user && Auth.isMod()) {
        if (loginLink) loginLink.style.display = 'none';
        if (userMenu)  userMenu.style.display = 'flex';
        if (userName)  userName.textContent = user.nombre;
    } else {
        if (loginLink) loginLink.style.display = 'inline-block';
        if (userMenu)  userMenu.style.display = 'none';
    }
}

// ===== LOGOUT =====
document.addEventListener('click', function(e) {
    if (e.target.id === 'logoutBtn') {
        e.preventDefault();
        Auth.logout();
    }
});

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    updateUIForAuth();
});