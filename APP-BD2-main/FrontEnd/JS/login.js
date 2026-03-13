document.addEventListener('DOMContentLoaded', function() {
    const loginForm    = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Si ya hay sesión activa, redirigir al admin
    const user = Auth.getCurrentUser();
    if (user && Auth.isMod()) {
        window.location.href = 'Admin.html';
        return;
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email    = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        errorMessage.style.display = 'none';

        const result = await Auth.login(email, password);

        if (result.success) {
            errorMessage.style.backgroundColor = '#d4edda';
            errorMessage.style.color           = '#155724';
            errorMessage.style.border          = '1px solid #c3e6cb';
            errorMessage.textContent           = '¡Acceso concedido! Redirigiendo...';
            errorMessage.style.display         = 'block';

            setTimeout(() => {
                window.location.href = 'Admin.html';
            }, 1500);
        } else {
            errorMessage.style.backgroundColor = '#fee';
            errorMessage.style.color           = '#e74c3c';
            errorMessage.style.border          = '1px solid #fcc';
            errorMessage.textContent           = result.error;
            errorMessage.style.display         = 'block';
        }
    });
});