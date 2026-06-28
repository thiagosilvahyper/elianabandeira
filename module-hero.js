/**
 * MODULE HERO - Eliana Bandeira
 * Versão: 2.2 - RESPONSIVO PARA SMARTPHONE
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
        // RENDERIZAR HTML COM ESTILOS RESPONSIVOS
        // ============================================================
        function render() {
            return `
                <style>
                    /* ============================================================
                       HERO SECTION - ESTILOS COMPLETOS (RESPONSIVO)
                       ============================================================ */
                    .hero-section {
                        position: relative;
                        width: 100%;
                        min-height: 100vh;
                        min-height: 100dvh;
                        display: flex;
                        align-items: center;
                        overflow: hidden;
                        background: #1A1A2E;
                    }

                    /* BANNER DA IMAGEM */
                    .hero-banner {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 0;
                    }

                    .hero-banner img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                        display: block;
                    }

                    /* OVERLAY */
                    .hero-overlay {
                        position: absolute;
                        inset: 0;
                        z-index: 1;
                        background: linear-gradient(
                            135deg,
                            rgba(26, 26, 46, 0.85) 0%,
                            rgba(26, 26, 46, 0.50) 50%,
                            rgba(26, 26, 46, 0.30) 100%
                        );
                    }

                    /* CONTAINER */
                    .hero-container {
                        position: relative;
                        z-index: 2;
                        width: 100%;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 6rem 2rem;
                    }

                    /* CONTEÚDO */
                    .hero-content {
                        max-width: 640px;
                        animation: heroFadeIn 1s ease forwards;
                    }

                    @keyframes heroFadeIn {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    /* BADGE */
                    .hero-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.6rem;
                        padding: 0.4rem 1.2rem;
                        background: rgba(212, 175, 55, 0.15);
                        border: 1px solid rgba(212, 175, 55, 0.3);
                        border-radius: 50px;
                        color: #D4AF37;
                        font-size: 0.75rem;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        margin-bottom: 1.5rem;
                        backdrop-filter: blur(4px);
                    }

                    .badge-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #27ae60;
                        animation: pulseDot 2s ease-in-out infinite;
                    }

                    @keyframes pulseDot {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(0.8); }
                    }

                    /* TÍTULO */
                    .hero-title {
                        font-size: clamp(3rem, 10vw, 5.5rem);
                        font-weight: 900;
                        line-height: 1.05;
                        letter-spacing: -0.02em;
                        margin-bottom: 0.5rem;
                        color: #FFFFFF;
                    }

                    .title-line {
                        display: block;
                    }
                    .title-line:first-child {
                        color: #FFFFFF;
                    }
                    .title-line:last-child {
                        color: #D4AF37;
                    }

                    /* SUBTÍTULO */
                    .hero-subtitle {
                        font-size: clamp(1rem, 2vw, 1.25rem);
                        font-weight: 400;
                        color: rgba(255, 255, 255, 0.8);
                        margin-bottom: 2rem;
                        letter-spacing: 0.5px;
                    }

                    /* STATS */
                    .hero-stats {
                        display: flex;
                        align-items: center;
                        gap: 1.5rem;
                        margin-bottom: 2.5rem;
                        flex-wrap: wrap;
                    }

                    .stat-item {
                        display: flex;
                        flex-direction: column;
                    }

                    .stat-number {
                        font-size: clamp(1.5rem, 3vw, 2rem);
                        font-weight: 800;
                        color: #D4AF37;
                        line-height: 1.2;
                    }

                    .stat-label {
                        font-size: 0.7rem;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 0.6);
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .stat-divider {
                        width: 1px;
                        height: 40px;
                        background: rgba(255, 255, 255, 0.15);
                    }

                    /* BOTÕES */
                    .hero-actions {
                        display: flex;
                        gap: 1rem;
                        flex-wrap: wrap;
                    }

                    .hero-actions .btn-primary {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.6rem;
                        padding: 0.8rem 2rem;
                        background: #D4AF37;
                        color: #1A1A2E;
                        border: none;
                        border-radius: 8px;
                        font-weight: 700;
                        font-size: 0.9rem;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        cursor: pointer;
                    }

                    .hero-actions .btn-primary:hover {
                        background: #B8942A;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
                    }

                    .hero-actions .btn-secondary {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.6rem;
                        padding: 0.8rem 2rem;
                        background: transparent;
                        color: #FFFFFF;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 0.9rem;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        cursor: pointer;
                    }

                    .hero-actions .btn-secondary:hover {
                        border-color: #D4AF37;
                        background: rgba(212, 175, 55, 0.1);
                    }

                    /* ============================================================
                       WORLD ATHLETICS BADGE
                       ============================================================ */
                    .world-athletics-badge {
                        position: fixed;
                        bottom: 1.5rem;
                        right: 1.5rem;
                        z-index: 1000;
                        display: flex;
                        align-items: center;
                        gap: 0.8rem;
                        padding: 0.6rem 1.2rem 0.6rem 0.9rem;
                        background: rgba(26, 26, 46, 0.92);
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(212, 175, 55, 0.25);
                        border-radius: 12px;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    }

                    .world-athletics-badge:hover {
                        transform: translateY(-3px) scale(1.03);
                        border-color: rgba(212, 175, 55, 0.6);
                        box-shadow: 0 12px 40px rgba(212, 175, 55, 0.15);
                    }

                    .world-athletics-badge .wa-logo {
                        width: 80px;
                        height: 28px;
                        flex-shrink: 0;
                    }

                    .world-athletics-badge .wa-text {
                        font-size: 0.65rem;
                        font-weight: 600;
                        color: rgba(255, 255, 255, 0.7);
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                    }

                    .world-athletics-badge .wa-arrow {
                        font-size: 1rem;
                        color: #D4AF37;
                        transition: transform 0.3s ease;
                    }

                    .world-athletics-badge:hover .wa-arrow {
                        transform: translateX(4px);
                    }

                    /* ============================================================
                       RESPONSIVE - SMARTPHONE
                       ============================================================ */
                    @media (max-width: 768px) {
                        .hero-container {
                            padding: 5rem 1.5rem 3rem;
                        }

                        .hero-content {
                            max-width: 100%;
                        }

                        .hero-title {
                            font-size: clamp(2.5rem, 12vw, 3.5rem);
                        }

                        .hero-stats {
                            gap: 1rem;
                        }

                        .stat-divider {
                            height: 30px;
                        }

                        .hero-actions .btn-primary,
                        .hero-actions .btn-secondary {
                            padding: 0.7rem 1.5rem;
                            font-size: 0.8rem;
                            width: 100%;
                            justify-content: center;
                        }

                        .hero-actions {
                            flex-direction: column;
                            width: 100%;
                        }

                        /* Badge World Athletics no mobile */
                        .world-athletics-badge {
                            bottom: 1rem;
                            right: 1rem;
                            padding: 0.4rem 0.8rem 0.4rem 0.6rem;
                            gap: 0.5rem;
                            border-radius: 8px;
                        }

                        .world-athletics-badge .wa-logo {
                            width: 60px;
                            height: 20px;
                        }

                        .world-athletics-badge .wa-text {
                            font-size: 0.5rem;
                        }

                        .world-athletics-badge .wa-arrow {
                            font-size: 0.8rem;
                        }
                    }

                    @media (max-width: 480px) {
                        .hero-container {
                            padding: 4rem 1rem 2rem;
                        }

                        .hero-title {
                            font-size: clamp(2rem, 14vw, 2.8rem);
                        }

                        .hero-badge {
                            font-size: 0.6rem;
                            padding: 0.3rem 0.8rem;
                        }

                        .stat-number {
                            font-size: 1.2rem;
                        }

                        .stat-label {
                            font-size: 0.6rem;
                        }

                        .hero-stats {
                            gap: 0.8rem;
                        }

                        .stat-divider {
                            height: 25px;
                        }

                        /* Badge World Athletics ainda menor */
                        .world-athletics-badge {
                            bottom: 0.8rem;
                            right: 0.8rem;
                            padding: 0.3rem 0.6rem 0.3rem 0.5rem;
                            gap: 0.4rem;
                            border-radius: 6px;
                        }

                        .world-athletics-badge .wa-logo {
                            width: 50px;
                            height: 16px;
                        }

                        .world-athletics-badge .wa-text {
                            display: none;
                        }

                        .world-athletics-badge .wa-arrow {
                            font-size: 0.7rem;
                        }
                    }

                    /* Para ecrãs muito pequenos (modo paisagem) */
                    @media (max-height: 600px) and (orientation: landscape) {
                        .hero-section {
                            min-height: 100vh;
                        }

                        .hero-container {
                            padding: 3rem 1.5rem;
                        }

                        .hero-title {
                            font-size: clamp(1.8rem, 6vw, 2.5rem);
                        }

                        .hero-stats {
                            margin-bottom: 1.5rem;
                        }

                        .hero-badge {
                            margin-bottom: 0.8rem;
                        }
                    }
                </style>

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

        console.log('✅ Hero module renderizado com logo World Athletics (responsivo)');
    };

})();