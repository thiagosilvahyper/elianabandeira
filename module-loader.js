/**
 * MODULE LOADER - Eliana Bandeira
 * Carrega todos os módulos do site dinamicamente
 * Compatível com server.js (sem ES6 modules)
 * Versão: 3.0 - Traduções externas
 */

(function() {
    'use strict';

    console.log('🏋️‍♀️ Module Loader iniciando...');

    // ============================================================
    // 1. CONFIGURAÇÃO DOS MÓDULOS
    // ============================================================
    const MODULES = {
        hero: {
            id: 'hero',
            container: 'module-hero',
            script: 'module-hero.js',
            css: `
                .hero-section { position:relative; min-height:100vh; display:flex; align-items:center; justify-content:center; overflow:hidden; padding:80px 0 60px; }
                .hero-banner { position:absolute; inset:0; z-index:0; overflow:hidden; }
                .hero-banner img { width:100%; height:100%; object-fit:cover; animation:zoomPan 25s infinite alternate ease-in-out; }
                @keyframes zoomPan { 0% { transform:scale(1) translate(0,0); } 100% { transform:scale(1.12) translate(8px,-10px); } }
                .hero-overlay { position:absolute; inset:0; z-index:1; background:linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 100%); }
                .hero-container { position:relative; z-index:3; width:100%; max-width:1200px; padding:0 1.5rem; }
                .hero-content { max-width:720px; color:var(--white); }
                .hero-badge { display:inline-flex; align-items:center; gap:0.6rem; padding:0.4rem 1rem; background:rgba(255,255,255,0.15); backdrop-filter:blur(8px); border-radius:var(--radius-full); font-size:0.75rem; font-weight:500; margin-bottom:1.5rem; border:1px solid rgba(255,255,255,0.1); }
                .badge-dot { width:8px; height:8px; border-radius:50%; background:var(--gold-olympic); animation:pulse-dot 2s infinite; }
                @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
                .hero-title { font-size:4.5rem; font-weight:800; line-height:1.05; margin-bottom:1rem; }
                .hero-title .title-line:last-child { color:var(--gold-olympic); }
                .hero-subtitle { font-size:1.2rem; font-weight:300; opacity:0.95; margin-bottom:1.5rem; min-height:2.4rem; }
                .hero-stats { display:flex; gap:2.5rem; margin-bottom:2.5rem; padding:1.5rem 0; border-top:1px solid rgba(255,255,255,0.15); border-bottom:1px solid rgba(255,255,255,0.15); }
                .stat-item { display:flex; flex-direction:column; }
                .stat-number { font-size:2rem; font-weight:800; color:var(--gold-olympic); }
                .stat-label { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.5px; opacity:0.8; }
                .stat-divider { width:1px; background:rgba(255,255,255,0.2); }
                .hero-actions { display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:2.5rem; }
                .hero-scroll-indicator { display:flex; align-items:center; gap:0.8rem; font-size:0.7rem; text-transform:uppercase; letter-spacing:1px; opacity:0.6; }
                .scroll-line { width:40px; height:2px; background:rgba(255,255,255,0.2); border-radius:1px; overflow:hidden; }
                .scroll-progress { width:0%; height:100%; background:var(--gold-olympic); transition:width 0.1s linear; }
                /* BOTÃO WORLD ATHLETICS COM LOGO */
                .world-athletics-badge {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: rgba(0, 0, 0, 0.75);
                    backdrop-filter: blur(12px);
                    border-radius: var(--radius-full);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: var(--white);
                    font-size: 0.65rem;
                    font-weight: 500;
                    transition: all var(--transition-fast);
                    text-decoration: none;
                    letter-spacing: 0.3px;
                }
                .world-athletics-badge:hover {
                    background: rgba(0, 0, 0, 0.9);
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    border-color: rgba(255, 255, 255, 0.3);
                }
                .world-athletics-badge .wa-logo {
                    height: 22px;
                    width: auto;
                    display: block;
                }
                .world-athletics-badge .wa-text {
                    font-size: 0.55rem;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    opacity: 0.7;
                    font-weight: 400;
                }
                .world-athletics-badge .wa-arrow {
                    font-size: 0.7rem;
                    opacity: 0.5;
                    transition: transform var(--transition-fast);
                }
                .world-athletics-badge:hover .wa-arrow {
                    transform: translateX(3px);
                    opacity: 1;
                }
                @media (max-width:768px) {
                    .hero-title { font-size:3rem; }
                    .hero-subtitle { font-size:1rem; }
                    .hero-stats { gap:1rem; flex-wrap:wrap; }
                    .stat-number { font-size:1.4rem; }
                    .stat-divider { display:none; }
                    .hero-actions { flex-direction:column; width:100%; }
                    .hero-actions .btn-primary, .hero-actions .btn-secondary { width:100%; justify-content:center; }
                    .world-athletics-badge {
                        bottom: 70px;
                        right: 12px;
                        padding: 0.35rem 0.7rem;
                        gap: 0.3rem;
                    }
                    .world-athletics-badge .wa-logo {
                        height: 16px;
                    }
                    .world-athletics-badge .wa-text {
                        display: none;
                    }
                }
                @media (max-width:480px) {
                    .hero-title { font-size:2.5rem; }
                    .hero-stats { gap:0.8rem; }
                    .stat-number { font-size:1.2rem; }
                    .world-athletics-badge {
                        bottom: 60px;
                        right: 8px;
                        padding: 0.3rem 0.6rem;
                    }
                    .world-athletics-badge .wa-logo {
                        height: 14px;
                    }
                }
            `
        },
        trajectory: {
            id: 'trajectory',
            container: 'module-trajectory',
            script: 'module-trajectory.js',
            css: `
                .timeline-container { position:relative; padding-left:40px; }
                .timeline-line { position:absolute; left:14px; top:0; bottom:0; width:2px; background:var(--gray-border); }
                .timeline-item { position:relative; padding-bottom:2.5rem; padding-left:2.5rem; opacity:0; transform:translateX(-30px); transition:all 0.6s cubic-bezier(0.22,1,0.36,1); }
                .timeline-item.visible { opacity:1; transform:translateX(0); }
                .timeline-marker { position:absolute; left:-40px; top:4px; display:flex; flex-direction:column; align-items:center; }
                .marker-dot { width:16px; height:16px; border-radius:50%; background:var(--gold-olympic); border:3px solid var(--white); box-shadow:0 0 0 3px var(--gold-olympic); transition:all var(--transition-medium); }
                .marker-dot.future { background:var(--gray-border); box-shadow:0 0 0 3px var(--gray-border); }
                .marker-year { font-size:0.7rem; font-weight:700; color:var(--gray-text); margin-top:4px; }
                .timeline-content { background:var(--white); padding:1.5rem; border-radius:var(--radius-lg); border:1px solid var(--gray-border); transition:all var(--transition-medium); }
                .timeline-content:hover { border-color:var(--gold-olympic); box-shadow:0 8px 32px rgba(0,0,0,0.06); }
                .timeline-content h3 { font-size:1.1rem; font-weight:700; margin-bottom:2px; }
                .timeline-content p { font-size:0.9rem; color:var(--gray-text); margin-bottom:4px; }
                .timeline-location { font-size:0.8rem; color:var(--gray-text); display:flex; align-items:center; gap:4px; }
                .timeline-location i { color:var(--gold-olympic); }
                @media (max-width:768px) { .timeline-container { padding-left:32px; } .timeline-item { padding-left:1.5rem; } .timeline-marker { left:-32px; } .marker-dot { width:12px; height:12px; } }
            `
        },
        performance: {
            id: 'performance',
            container: 'module-performance',
            script: 'module-performance.js',
            css: `
                .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
                .stat-card { background:var(--white); padding:1.5rem; border-radius:var(--radius-lg); border:1px solid var(--gray-border); text-align:center; transition:all var(--transition-medium); }
                .stat-card:hover { border-color:var(--gold-olympic); transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,0.06); }
                .stat-card .stat-number { font-size:2.2rem; font-weight:800; color:var(--gold-olympic); }
                .stat-card .stat-label { font-size:0.9rem; font-weight:600; color:var(--dark-text); text-transform:none; letter-spacing:0; }
                .stat-card .stat-sub { font-size:0.8rem; color:var(--gray-text); }
                @media (max-width:768px) { .stats-grid { grid-template-columns:repeat(2,1fr); } }
                @media (max-width:480px) { .stats-grid { grid-template-columns:1fr 1fr; gap:0.5rem; } .stat-card { padding:1rem; } .stat-card .stat-number { font-size:1.6rem; } }
                .wa-card { display:grid; grid-template-columns:1fr 1fr; gap:2.5rem; background:var(--white); border-radius:var(--radius-xl); border:1px solid var(--gray-border); overflow:hidden; padding:2.5rem; align-items:center; margin-top:3rem; }
                .wa-content h3 { font-size:1.8rem; font-weight:800; margin-bottom:0.5rem; }
                .wa-content p { color:var(--gray-text); margin-bottom:1.5rem; }
                .wa-icon img { height:32px; width:auto; margin-bottom:0.5rem; }
                .wa-stats { display:flex; gap:2.5rem; margin-bottom:1.5rem; flex-wrap:wrap; }
                .wa-stat { display:flex; flex-direction:column; }
                .wa-stat-value { font-size:1.4rem; font-weight:700; color:var(--dark-text); }
                .wa-stat-label { font-size:0.7rem; color:var(--gray-text); text-transform:uppercase; letter-spacing:0.5px; }
                .wa-image { border-radius:var(--radius-lg); overflow:hidden; }
                .wa-image img { width:100%; height:300px; object-fit:cover; }
                @media (max-width:768px) { .wa-card { grid-template-columns:1fr; } .wa-image { height:200px; } }
            `
        },
        about: {
            id: 'about',
            container: 'module-about',
            script: 'module-about.js',
            css: `
                .about-wrapper { display:grid; grid-template-columns:1fr 1fr; gap:2.5rem; align-items:center; }
                .about-image { border-radius:var(--radius-lg); overflow:hidden; background:var(--gray-light); }
                .about-image img { width:100%; height:100%; object-fit:cover; min-height:400px; }
                .about-values { display:flex; flex-wrap:wrap; gap:1rem; margin-top:1.5rem; }
                .about-values span { display:inline-flex; align-items:center; gap:6px; padding:0.3rem 1rem; background:var(--gray-light); border-radius:var(--radius-full); font-size:0.85rem; font-weight:500; }
                .about-values span i { color:var(--gold-olympic); }
                @media (max-width:768px) { .about-wrapper { grid-template-columns:1fr; } .about-image img { min-height:250px; } }
                .titles-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-top:3rem; }
                .title-card { background:var(--white); padding:1.5rem; border-radius:var(--radius-lg); text-align:center; border:2px solid var(--gray-border); transition:all var(--transition-medium); }
                .title-card:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 12px 40px rgba(0,0,0,0.12); }
                .title-card.gold { border-color:var(--gold-olympic); }
                .title-card.gold .title-result { color:var(--gold-olympic); }
                .title-card.silver { border-color:#C0C0C0; }
                .title-card.silver .title-result { color:#808080; }
                .title-card.bronze { border-color:#CD7F32; }
                .title-card.bronze .title-result { color:#CD7F32; }
                .title-card.olympic { border-color:var(--blue-portugal); }
                .title-card.olympic .title-result { color:var(--blue-portugal); }
                .title-card.european { border-color:#003399; }
                .title-card.european .title-result { color:#003399; }
                .title-card.national { border-color:var(--dark-text); }
                .title-card.national .title-result { color:var(--dark-text); }
                .title-medal { font-size:2.4rem; margin-bottom:0.5rem; }
                .title-competition { font-weight:600; font-size:0.95rem; }
                .title-year { font-size:0.8rem; color:var(--gray-text); }
                .title-result { font-size:0.9rem; font-weight:700; margin-top:4px; }
                @media (max-width:768px) { .titles-grid { grid-template-columns:repeat(2,1fr); } }
                @media (max-width:480px) { .titles-grid { grid-template-columns:repeat(2,1fr); gap:0.5rem; } .title-card { padding:1rem; } }
                .calendar-timeline { display:flex; flex-direction:column; gap:1rem; margin-top:2rem; }
                .calendar-event { display:flex; align-items:center; gap:1.5rem; padding:1.5rem; background:var(--white); border-radius:var(--radius-md); border-left:4px solid var(--gold-olympic); transition:all var(--transition-medium); border:1px solid var(--gray-border); border-left-width:4px; }
                .calendar-event:hover { transform:translateX(8px); box-shadow:0 8px 24px rgba(0,0,0,0.06); }
                .calendar-date { display:flex; flex-direction:column; align-items:center; min-width:60px; }
                .calendar-date .month { font-size:0.7rem; font-weight:600; text-transform:uppercase; color:var(--gray-text); }
                .calendar-date .day { font-size:1.8rem; font-weight:800; color:var(--dark-text); line-height:1; }
                .calendar-dot { width:8px; height:8px; border-radius:50%; background:var(--gold-olympic); flex-shrink:0; }
                .calendar-info h4 { font-size:1rem; font-weight:600; }
                .calendar-info p { font-size:0.85rem; color:var(--gray-text); }
                .calendar-status { display:inline-block; padding:2px 12px; border-radius:var(--radius-full); font-size:0.65rem; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }
                .calendar-status.confirmed { background:#D4EDDA; color:#155724; }
                .calendar-status.pending { background:#FFF3CD; color:#856404; }
                @media (max-width:480px) { .calendar-event { flex-wrap:wrap; gap:0.5rem; } .calendar-date { min-width:50px; } .calendar-date .day { font-size:1.4rem; } .calendar-dot { display:none; } }
            `
        },
        gallery: {
            id: 'gallery',
            container: 'module-gallery',
            script: 'module-gallery.js',
            css: `
                .gallery-filters { display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1.5rem; justify-content:center; }
                .filter-btn { padding:0.4rem 1.2rem; background:transparent; border:1px solid var(--gray-border); border-radius:var(--radius-full); font-size:0.8rem; font-weight:500; color:var(--gray-text); cursor:pointer; transition:all var(--transition-fast); font-family:var(--font-primary); }
                .filter-btn:hover { border-color:var(--gold-olympic); color:var(--gold-olympic); }
                .filter-btn.active { background:var(--gold-olympic); color:var(--white); border-color:var(--gold-olympic); }
                .gallery-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1rem; auto-rows:220px; }
                .gallery-item { position:relative; border-radius:var(--radius-md); overflow:hidden; cursor:pointer; background:var(--gray-light); }
                .gallery-item img { width:100%; height:100%; object-fit:cover; transition:transform var(--transition-slow); }
                .gallery-item:hover img { transform:scale(1.06); }
                .gallery-item .overlay { position:absolute; inset:0; background:linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 60%); opacity:0; transition:opacity var(--transition-medium); display:flex; align-items:flex-end; padding:1rem; }
                .gallery-item:hover .overlay { opacity:1; }
                .gallery-item .overlay span { color:var(--white); font-size:0.85rem; font-weight:500; }
                @media (max-width:768px) { .gallery-grid { grid-template-columns:repeat(2,1fr); auto-rows:160px; } }
                @media (max-width:480px) { .gallery-grid { grid-template-columns:1fr 1fr; auto-rows:140px; gap:6px; } }
            `
        },
        videos: {
            id: 'videos',
            container: 'module-videos',
            script: 'module-videos.js',
            css: `
                .videos-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:1.5rem; }
                .video-card { background:var(--white); border-radius:var(--radius-lg); overflow:hidden; border:1px solid var(--gray-border); cursor:pointer; transition:all var(--transition-medium); }
                .video-card:hover { transform:translateY(-8px); box-shadow:0 16px 48px rgba(0,0,0,0.12); border-color:var(--gold-olympic); }
                .video-thumb { position:relative; padding-bottom:56.25%; background:var(--dark-text); overflow:hidden; }
                .video-thumb img { position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; transition:transform var(--transition-slow); }
                .video-card:hover .video-thumb img { transform:scale(1.04); }
                .video-play { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:64px; height:64px; background:rgba(212,175,55,0.9); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--white); font-size:1.6rem; transition:all var(--transition-medium); }
                .video-card:hover .video-play { transform:translate(-50%,-50%) scale(1.1); background:var(--gold-olympic); }
                .video-info { padding:1rem 1.5rem; }
                .video-info h4 { font-size:1rem; font-weight:600; margin-bottom:2px; }
                .video-info p { font-size:0.85rem; color:var(--gray-text); }
            `
        },
        sponsors: {
            id: 'sponsors',
            container: 'module-sponsors',
            script: 'module-sponsors.js',
            css: `
                .sponsors-grid { display:flex; flex-wrap:wrap; gap:2.5rem 4rem; align-items:center; justify-content:center; padding:2rem 2.5rem; background:var(--white); border-radius:var(--radius-xl); border:1px solid var(--gray-border); }
                .sponsors-grid img { max-height:70px; width:auto; max-width:160px; object-fit:contain; transition:all var(--transition-medium); }
                .sponsors-grid img:hover { transform:scale(1.08); }
                .sponsor-cta { text-align:center; margin-top:2.5rem; padding:2.5rem; background:var(--gray-light); border-radius:var(--radius-xl); border:1px solid var(--gray-border); }
                .sponsor-cta h3 { font-size:1.6rem; font-weight:800; margin-bottom:0.5rem; }
                .sponsor-cta p { color:var(--gray-text); margin-bottom:1.5rem; }
                .benefits-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:1.5rem; margin-top:3rem; }
                .benefit-card { text-align:center; padding:2.5rem 1.5rem; background:var(--white); border-radius:var(--radius-lg); border:1px solid var(--gray-border); transition:all var(--transition-medium); }
                .benefit-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(0,0,0,0.12); border-color:var(--gold-olympic); }
                .benefit-icon { font-size:2.4rem; color:var(--gold-olympic); margin-bottom:1rem; }
                .benefit-card h4 { font-size:1.1rem; font-weight:700; margin-bottom:0.5rem; }
                .benefit-card p { font-size:0.9rem; color:var(--gray-text); }
                @media (max-width:768px) { .sponsors-grid { gap:1.5rem; padding:1.5rem; } .sponsors-grid img { max-height:50px; max-width:120px; } }
                @media (max-width:480px) { .sponsors-grid img { max-height:40px; max-width:80px; } .benefits-grid { grid-template-columns:1fr; } }
            `
        },
        contact: {
            id: 'contact',
            container: 'module-contact',
            script: 'module-contact.js',
            css: `
                .contact-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1.5rem; margin-bottom:2.5rem; }
                .contact-card { text-align:center; padding:2.5rem 1.5rem; background:var(--gray-light); border-radius:var(--radius-lg); border:1px solid var(--gray-border); transition:all var(--transition-medium); }
                .contact-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(0,0,0,0.12); border-color:var(--gold-olympic); }
                .contact-icon { font-size:2.4rem; color:var(--gold-olympic); margin-bottom:1rem; }
                .contact-card h4 { font-size:1.1rem; font-weight:700; }
                .contact-card p { font-size:0.9rem; color:var(--gray-text); margin:0.5rem 0; }
                .contact-email { font-size:0.85rem; color:var(--blue-portugal); text-decoration:none; font-weight:500; }
                .contact-email:hover { text-decoration:underline; }
                .contact-form-wrapper { max-width:640px; margin:0 auto; }
                .contact-form { padding:2.5rem; background:var(--gray-light); border-radius:var(--radius-xl); border:1px solid var(--gray-border); }
                .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
                .form-group { margin-bottom:1rem; }
                .form-group label { display:block; font-size:0.8rem; font-weight:600; color:var(--dark-text); margin-bottom:4px; }
                .form-group input, .form-group select, .form-group textarea { width:100%; padding:0.8rem 1rem; background:var(--white); border:1px solid var(--gray-border); border-radius:var(--radius-sm); font-family:var(--font-primary); font-size:0.95rem; color:var(--dark-text); transition:border-color var(--transition-fast); }
                .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline:none; border-color:var(--gold-olympic); box-shadow:0 0 0 4px rgba(212,175,55,0.08); }
                .form-group textarea { resize:vertical; }
                @media (max-width:480px) { .form-row { grid-template-columns:1fr; } .contact-form { padding:1.5rem; } }
                .social-stats-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1.5rem; margin-top:2rem; }
                .social-stat-card { text-align:center; padding:1.5rem; background:var(--white); border-radius:var(--radius-lg); border:1px solid var(--gray-border); transition:all var(--transition-medium); }
                .social-stat-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(0,0,0,0.12); border-color:var(--gold-olympic); }
                .social-stat-icon { font-size:2.4rem; margin-bottom:0.5rem; }
                .social-stat-card.instagram .social-stat-icon { color:#E4405F; }
                .social-stat-card.youtube .social-stat-icon { color:#FF0000; }
                .social-stat-card.facebook .social-stat-icon { color:#1877F2; }
                .social-stat-count { font-size:1.8rem; font-weight:800; color:var(--dark-text); }
                .social-stat-label { font-size:0.75rem; color:var(--gray-text); }
                .social-stat-link { display:inline-block; margin-top:0.5rem; font-size:0.8rem; color:var(--gray-text); transition:color var(--transition-fast); }
                .social-stat-link:hover { color:var(--gold-olympic); }
                @media (max-width:480px) { .social-stats-grid { grid-template-columns:1fr 1fr; } }
            `
        }
    };

    // ============================================================
    // 2. SISTEMA DE TRADUÇÃO (carrega de arquivos externos)
    // ============================================================
    let translations = {};
    let currentLang = 'pt';
    let translationsLoaded = false;
    let translationPromises = {};

    async function loadTranslationFile(lang) {
        // Se já carregou, retorna do cache
        if (translations[lang]) return translations[lang];
        
        // Se já está carregando, aguarda
        if (translationPromises[lang]) {
            return translationPromises[lang];
        }

        // Inicia o carregamento
        translationPromises[lang] = (async function() {
            try {
                const response = await fetch(`/${lang}.json`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                translations[lang] = data;
                console.log(`✅ Traduções carregadas: ${lang}`);
                return data;
            } catch (error) {
                console.error(`❌ Erro ao carregar traduções para ${lang}:`, error);
                // Fallback: tenta usar português como fallback
                if (lang !== 'pt' && translations['pt']) {
                    console.warn(`⚠️ Usando português como fallback para ${lang}`);
                    translations[lang] = translations['pt'];
                    return translations[lang];
                }
                translations[lang] = {};
                return {};
            } finally {
                delete translationPromises[lang];
            }
        })();

        return translationPromises[lang];
    }

    async function initTranslations() {
        const langs = ['pt', 'es', 'en', 'fr'];
        const promises = langs.map(lang => loadTranslationFile(lang));
        await Promise.all(promises);
        translationsLoaded = true;
        console.log('✅ Todas as traduções carregadas');
    }

    function getTranslation(key) {
        if (!translationsLoaded) {
            console.warn('⚠️ Traduções ainda não carregadas, usando fallback');
            return key;
        }
        const langData = translations[currentLang];
        if (!langData) return key;
        return langData[key] || translations['pt']?.[key] || key;
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.dataset.i18n;
            var translation = getTranslation(key);
            if (translation !== undefined && translation !== key) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) el.placeholder = translation;
                } else if (el.tagName === 'OPTION') {
                    el.textContent = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    }

    // ============================================================
    // 3. CARREGAR MÓDULOS
    // ============================================================
    function showLoading(container) {
        container.innerHTML = `
            <div class="module-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <span>A carregar...</span>
            </div>
        `;
    }

    function loadModule(moduleKey) {
        return new Promise(function(resolve, reject) {
            var config = MODULES[moduleKey];
            if (!config) {
                reject(new Error('Módulo "' + moduleKey + '" não encontrado'));
                return;
            }

            var container = document.getElementById(config.container);
            if (!container) {
                reject(new Error('Container "' + config.container + '" não encontrado'));
                return;
            }

            showLoading(container);

            // 1. Inject CSS
            if (config.css) {
                var styleId = 'module-style-' + moduleKey;
                if (!document.getElementById(styleId)) {
                    var style = document.createElement('style');
                    style.id = styleId;
                    style.textContent = config.css;
                    document.head.appendChild(style);
                }
            }

            // 2. Carregar script
            var script = document.createElement('script');
            script.src = config.script + '?v=' + Date.now();
            script.onload = function() {
                var moduleFn = window['module_' + moduleKey];
                if (typeof moduleFn === 'function') {
                    try {
                        var result = moduleFn(container, currentLang, getTranslation);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(new Error('Função module_' + moduleKey + ' não encontrada em ' + config.script));
                }
            };
            script.onerror = function() {
                reject(new Error('Erro ao carregar ' + config.script));
            };
            document.body.appendChild(script);
        });
    }

    async function initModules() {
        // Aguarda traduções carregarem
        if (!translationsLoaded) {
            await initTranslations();
        }

        var moduleKeys = Object.keys(MODULES);
        var results = {};

        for (var i = 0; i < moduleKeys.length; i++) {
            var key = moduleKeys[i];
            try {
                results[key] = await loadModule(key);
                console.log('✅ Módulo "' + key + '" carregado');
            } catch (err) {
                console.error('❌ Erro no módulo "' + key + '":', err);
                var config = MODULES[key];
                var container = document.getElementById(config.container);
                if (container) {
                    container.innerHTML = `
                        <div class="module-loading" style="color:#e74c3c;">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span>Erro ao carregar módulo: ${err.message}</span>
                        </div>
                    `;
                }
            }
        }

        applyTranslations();

        var preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(function() {
                preloader.classList.add('hidden');
            }, 500);
        }

        return results;
    }

    // ============================================================
    // 4. NAVEGAÇÃO
    // ============================================================
    function initNavigation() {
        var navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                navbar.classList.toggle('scrolled', window.scrollY > 80);
            });
        }

        var hamburger = document.getElementById('hamburger');
        var navLinks = document.getElementById('navLinks');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('open');
            });
            document.querySelectorAll('.nav-links a').forEach(function(link) {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('open');
                });
            });
        }
    }

    // ============================================================
    // 5. LANGUAGE SELECTOR
    // ============================================================
    function initLanguageSelector() {
        var buttons = document.querySelectorAll('.language-selector button');
        buttons.forEach(function(btn) {
            btn.addEventListener('click', async function() {
                buttons.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                currentLang = this.dataset.lang;
                
                // Recarrega traduções se necessário
                if (!translations[currentLang]) {
                    await loadTranslationFile(currentLang);
                }
                
                applyTranslations();
                console.log('🌍 Idioma alterado para: ' + currentLang.toUpperCase());
            });
        });
    }

    // ============================================================
    // 6. NEWSLETTER
    // ============================================================
    function initNewsletter() {
        var form = document.getElementById('newsletterForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var btn = form.querySelector('button[type="submit"]');
                var original = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;
                setTimeout(function() {
                    alert('✅ ' + (getTranslation('newsletter.success') || 'Inscrito com sucesso!'));
                    form.reset();
                    btn.innerHTML = original;
                    btn.disabled = false;
                }, 1000);
            });
        }
    }

    // ============================================================
    // 7. LIGHTBOX
    // ============================================================
    function initLightbox() {
        var lightbox = document.getElementById('lightbox');
        var lightboxImage = document.getElementById('lightboxImage');
        var lightboxClose = document.getElementById('lightboxClose');
        var lightboxPrev = document.getElementById('lightboxPrev');
        var lightboxNext = document.getElementById('lightboxNext');
        var currentIndex = 0;
        var currentGallery = [];

        function openLightbox(index) {
            var items = document.querySelectorAll('.gallery-item');
            currentGallery = [];
            items.forEach(function(el) {
                var img = el.querySelector('img');
                if (img) currentGallery.push(img.src);
            });
            currentIndex = index;
            if (lightboxImage && currentGallery[index]) {
                lightboxImage.src = currentGallery[index];
            }
            if (lightbox) lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            if (lightbox) lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        function navigateLightbox(direction) {
            if (currentGallery.length === 0) return;
            currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
            if (lightboxImage) lightboxImage.src = currentGallery[currentIndex];
        }

        if (lightbox) {
            document.addEventListener('click', function(e) {
                var item = e.target.closest('.gallery-item');
                if (item) {
                    var items = document.querySelectorAll('.gallery-item');
                    var index = Array.from(items).indexOf(item);
                    if (index !== -1) openLightbox(index);
                }
            });

            if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) closeLightbox();
            });
            if (lightboxPrev) lightboxPrev.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateLightbox(-1);
            });
            if (lightboxNext) lightboxNext.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateLightbox(1);
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft' && lightbox.classList.contains('open')) navigateLightbox(-1);
                if (e.key === 'ArrowRight' && lightbox.classList.contains('open')) navigateLightbox(1);
            });
        }
    }

    // ============================================================
    // 8. VIDEO MODAL
    // ============================================================
    function initVideoModal() {
        var videoModal = document.getElementById('videoModal');
        var videoIframe = document.getElementById('videoIframe');
        var videoModalClose = document.getElementById('videoModalClose');

        if (videoModal && videoIframe) {
            document.addEventListener('click', function(e) {
                var card = e.target.closest('.video-card');
                if (card) {
                    var embed = card.dataset.embed;
                    if (embed) {
                        videoIframe.src = 'https://www.youtube.com/embed/' + embed + '?autoplay=1';
                        videoModal.classList.add('open');
                        document.body.style.overflow = 'hidden';
                    }
                }
            });

            if (videoModalClose) {
                videoModalClose.addEventListener('click', function() {
                    videoModal.classList.remove('open');
                    videoIframe.src = '';
                    document.body.style.overflow = '';
                });
            }

            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    videoModal.classList.remove('open');
                    videoIframe.src = '';
                    document.body.style.overflow = '';
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && videoModal.classList.contains('open')) {
                    videoModal.classList.remove('open');
                    videoIframe.src = '';
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // ============================================================
    // 9. INICIALIZAÇÃO PRINCIPAL
    // ============================================================
    async function init() {
        console.log('🏋️‍♀️ Module Loader iniciado');
        console.log('📦 ' + Object.keys(MODULES).length + ' módulos configurados');

        // Inicializa traduções primeiro
        await initTranslations();

        initNavigation();
        initLanguageSelector();
        initNewsletter();
        initLightbox();
        initVideoModal();

        setTimeout(initModules, 100);
    }

    // Iniciar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 10. EXPOR PARA USO GLOBAL
    // ============================================================
    window.__EB = {
        getTranslation: getTranslation,
        currentLang: function() { return currentLang; },
        applyTranslations: applyTranslations,
        reloadModules: initModules,
        MODULES: MODULES,
        loadTranslationFile: loadTranslationFile,
        translations: translations
    };

    console.log('✅ Module Loader pronto');
    console.log('🔧 API disponível: window.__EB');

})();