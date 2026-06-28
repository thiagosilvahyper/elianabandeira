/**
 * MODULE HERO - Eliana Bandeira
 * Versão: 2.1 - COM LOGO WORLD ATHLETICS
 */

(function() {
    'use strict';

    // ============================================================
    // DADOS DO MÓDULO
    // ============================================================
    const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=900&fit=crop&crop=center';

    // ============================================================
    // FUNÇÃO PRINCIPAL
    // ============================================================
    window.module_hero = function(container, lang, t) {
        console.log('🏋️‍♀️ Hero module loaded (lang: ' + lang + ')');

        // ============================================================
        // BUSCAR IMAGEM DO PERFIL (se disponível)
        // ============================================================
        let heroImage = DEFAULT_HERO_IMAGE;

        // Tentar buscar a imagem do perfil via API
        fetch('/api/profile', {
            headers: { 'X-API-Key': 'imperare2024' }
        })
        .then(function(res) {
            if (res.ok) return res.json();
            return null;
        })
        .then(function(data) {
            if (data && data.heroImage) {
                heroImage = data.heroImage;
                // Atualizar a imagem se o container já estiver renderizado
                const img = container.querySelector('.hero-banner img');
                if (img) img.src = heroImage;
            }
        })
        .catch(function(err) {
            console.warn('⚠️ Não foi possível carregar imagem do perfil:', err);
        });

        // ============================================================
        // RENDERIZAR HTML
        // ============================================================
        function render() {
            return `
                <section class="hero-section" id="hero">
                    <!-- BACKGROUND -->
                    <div class="hero-banner">
                        <img src="${heroImage}" alt="Eliana Bandeira em ação" loading="eager" />
                    </div>
                    <div class="hero-overlay"></div>

                    <!-- CONTEÚDO -->
                    <div class="hero-container">
                        <div class="hero-content">
                            <!-- BADGE -->
                            <div class="hero-badge">
                                <span class="badge-dot"></span>
                                Atleta Portuguesa
                            </div>

                            <!-- TÍTULO -->
                            <h1 class="hero-title">
                                <span class="title-line">Eliana</span>
                                <span class="title-line">Bandeira</span>
                            </h1>

                            <!-- SUBTÍTULO -->
                            <p class="hero-subtitle">
                                Atleta Olímpica · Lançamento do Peso
                            </p>

                            <!-- STATS -->
                            <div class="hero-stats">
                                <div class="stat-item">
                                    <span class="stat-number">18.95m</span>
                                    <span class="stat-label">Marca Pessoal</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item">
                                    <span class="stat-number">2024</span>
                                    <span class="stat-label">Jogos Olímpicos</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item">
                                    <span class="stat-number">4×</span>
                                    <span class="stat-label">Títulos Nacionais</span>
                                </div>
                            </div>

                            <!-- BOTÕES -->
                            <div class="hero-actions">
                                <a href="#about" class="btn-primary">
                                    <i class="fas fa-user"></i> Conhecer Eliana
                                </a>
                                <a href="#contact" class="btn-secondary">
                                    <i class="fas fa-envelope"></i> Contacto
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ============================================================
                WORLD ATHLETICS BADGE COM LOGO SVG
                ============================================================ -->
                <a href="https://worldathletics.org/athletes/portugal/eliana-bandeira-14653395" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="world-athletics-badge"
                   title="Perfil oficial World Athletics">
                    <!-- LOGO SVG INLINE -->
                    <svg class="wa-logo" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="18" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="16" fill="#FFFFFF" letter-spacing="2">WORLD</text>
                        <text x="0" y="34" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="11" fill="#D4AF37" letter-spacing="0.8">ATHLETICS</text>
                    </svg>
                    <span class="wa-text">Perfil Oficial</span>
                    <span class="wa-arrow">→</span>
                </a>
            `;
        }

        // ============================================================
        // INJETAR HTML
        // ============================================================
        container.innerHTML = render();

        console.log('✅ Hero module renderizado com logo World Athletics');
    };

})();