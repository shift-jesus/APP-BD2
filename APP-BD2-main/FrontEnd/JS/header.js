// ===== HEADER DINÁMICO =====
// Detecta en qué carpeta estamos para ajustar las rutas
const isInHTML = window.location.pathname.includes('/HTML/');
const basePath = isInHTML ? '../' : './';

function renderHeader() {
    const headerHTML = `
    <header>
        <div class="container header-container">
            <a href="https://www.uninunez.edu.co/" target="_blank" class="logo">
                <img src="${basePath}IMAGENES/LogoUniNuPequeño.png" alt="UniNúñez" class="logo-img">
                <span class="logo-text">Mujeres Empoderadas</span>
            </a>
            <nav>
                <a href="${basePath}HTML/index.html">Inicio</a>

                <!-- Botón Ayuda -->
                <div class="help-wrapper">
                    <button class="btn-ayuda" id="btnAyuda">
                        <span>🆘</span> Rutas de Apoyo
                    </button>
                    <div class="help-panel" id="helpPanel">
                        <div class="help-header">
                            <h3>🤝 Rutas de Apoyo</h3>
                            <p class="help-subtitle">Recursos centrados en Cartagena de Indias para mujeres y familias que necesitan orientación, apoyo psicológico, social o legal.</p>
                            <button class="help-close" id="closeHelp">&times;</button>
                        </div>

                        <div class="help-body">

                            <!-- 1. Salud Mental -->
                            <div class="help-card">
                                <div class="help-card-icon">🧠</div>
                                <div class="help-card-content">
                                    <h4>Apoyo Psicológico y Salud Mental</h4>
                                    <p class="help-org">IPS Niños de Papel · ⭐ 4.6</p>
                                    <ul>
                                        <li>Atención psicológica y psicosocial</li>
                                        <li>Programas para niños, jóvenes y familias</li>
                                        <li>Orientación y acompañamiento terapéutico</li>
                                    </ul>
                                    <a href="https://ninosdepapel.org/" target="_blank" class="help-link">Más Información →</a>
                                </div>
                            </div>

                            <!-- 2. Apoyo Social -->
                            <div class="help-card">
                                <div class="help-card-icon">🤝</div>
                                <div class="help-card-content">
                                    <h4>Apoyo Social y Comunitario</h4>
                                    <p class="help-org">Fundación Ser Social · ⭐ 4.5</p>
                                    <ul>
                                        <li>Programas comunitarios</li>
                                        <li>Apoyo social y orientación familiar</li>
                                        <li>Programas de inclusión social</li>
                                    </ul>
                                    <a href="https://www.sersocial.org/" target="_blank" class="help-link">Más Información →</a>
                                </div>
                            </div>

                            <!-- 3. Apoyo Legal -->
                            <div class="help-card">
                                <div class="help-card-icon">⚖️</div>
                                <div class="help-card-content">
                                    <h4>Apoyo Legal y Protección</h4>
                                    <p class="help-org">Defensoría del Pueblo</p>
                                    <ul>
                                        <li>Asesoría jurídica gratuita</li>
                                        <li>Defensa de derechos humanos</li>
                                        <li>Apoyo en casos de violencia y discriminación</li>
                                    </ul>
                                    <span class="help-no-link">Atención presencial</span>
                                </div>
                            </div>

                            <!-- Líneas de ayuda -->
                            <div class="help-lineas">
                                <h4>📞 Líneas de Ayuda Inmediata</h4>
                                <div class="lineas-grid">
                                    <div class="linea"><span class="linea-num">192</span><span class="linea-desc">Emergencias en salud</span></div>
                                    <div class="linea"><span class="linea-num">123</span><span class="linea-desc">Policía y emergencias</span></div>
                                    <div class="linea"><span class="linea-num">106</span><span class="linea-desc">Apoyo psicológico</span></div>
                                    <div class="linea"><span class="linea-num">155</span><span class="linea-desc">Violencia contra la mujer</span></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <a href="${basePath}HTML/Login.html" class="btn btn-primario" id="loginLink">Iniciar Sesión</a>
                <div class="user-info hidden" id="userMenu">
                    <span class="mod-badge">MOD</span>
                    <span class="user-name" id="userName"></span>
                    <button class="btn btn-acento" id="logoutBtn">Cerrar Sesión</button>
                </div>
            </nav>
        </div>
    </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Toggle del panel
    document.getElementById('btnAyuda').addEventListener('click', function(e) {
        e.stopPropagation();
        document.getElementById('helpPanel').classList.toggle('active');
    });

    document.getElementById('closeHelp').addEventListener('click', function() {
        document.getElementById('helpPanel').classList.remove('active');
    });

    document.addEventListener('click', function(e) {
        const panel = document.getElementById('helpPanel');
        const btn   = document.getElementById('btnAyuda');
        if (panel && !panel.contains(e.target) && e.target !== btn) {
            panel.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', renderHeader);