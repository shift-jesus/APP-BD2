document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // Verificar si ya hay sesión
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = 'admin.html';
        return;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Usar Auth.login
        const result = Auth.login(email, password);
        
        if (result.success) {
            // Mostrar mensaje de éxito
            errorMessage.style.backgroundColor = '#d4edda';
            errorMessage.style.color = '#155724';
            errorMessage.style.border = '1px solid #c3e6cb';
            errorMessage.textContent = '¡Login exitoso! Redirigiendo...';
            errorMessage.style.display = 'block';
            
            // Redirigir al admin
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1500);
        } else {
            // Mostrar error
            errorMessage.style.backgroundColor = '#fee';
            errorMessage.style.color = '#e74c3c';
            errorMessage.style.border = '1px solid #fcc';
            errorMessage.textContent = 'Email o contraseña incorrectos';
            errorMessage.style.display = 'block';
            
            // Ocultar después de 3 segundos
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
});