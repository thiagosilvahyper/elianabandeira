/**
 * Módulo: Performance
 * Função global: module_performance
 */
window.module_performance = function(container, lang, t) {
    console.log('📊 Performance module iniciado');

    var defaultStats = [
        { id: 1, value: '18.95m', label: 'Recorde Nacional', sub: 'Lançamento do Peso' },
        { id: 2, value: '6', label: 'Medalhas Internacionais', sub: 'Ouro · Prata · Bronze' },
        { id: 3, value: '4', label: 'Títulos Nacionais', sub: 'Campeã de Portugal' },
        { id: 4, value: 'Top 15', label: 'Ranking Mundial', sub: 'World Athletics' },
        { id: 5, value: '12', label: 'Países Visitados', sub: 'Competições Internacionais' },
        { id: 6, value: '1.2M', label: 'Alcance Social', sub: 'Milhões de seguidores' }
    ];

    var stats = defaultStats;
    var waImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&crop=center';

    function loadData() {
        // Carregar perfil para a imagem
        fetch('/api/profile')
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(profile) {
                if (profile && profile.waImage) {
                    waImage = profile.waImage;
                }
                return fetch('/api/stats').then(function(r) { return r.ok ? r.json() : null; });
            })
            .then(function(statsData) {
                if (statsData && statsData.length) stats = statsData;
                renderPerformance(stats);
            })
            .catch(function() {
                renderPerformance(stats);
            });
    }

    function renderPerformance(data) {
        container.innerHTML = `
            <section id="performance" class="section-performance">
                <div class="container">
                    <div class="section-header centered">
                        <span class="section-tag">${t('stats.tag') || 'Performance'}</span>
                        <h2 class="section-title">
                            ${t('stats.title') || 'Números que'} <span class="highlight">${t('stats.highlight') || 'definem'}</span> ${t('stats.title2') || 'a carreira'}
                        </h2>
                    </div>

                    <div class="stats-grid">
                        ${data.map(function(stat) {
                            return `
                                <div class="stat-card">
                                    <div class="stat-number">${stat.value}</div>
                                    <div class="stat-label">${stat.label}</div>
                                    ${stat.sub ? '<div class="stat-sub">' + stat.sub + '</div>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="wa-card">
                        <div class="wa-content">
                            <div class="wa-icon">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Ctext y='55' font-size='40' font-weight='bold' fill='%23D4AF37'%3EWorld Athletics%3C/text%3E%3C/svg%3E" alt="World Athletics" />
                            </div>
                            <h3>${t('wa.title') || 'World Athletics'}</h3>
                            <p>${t('wa.desc') || 'Perfil oficial da atleta com todos os resultados, recordes e ranking mundial.'}</p>
                            <div class="wa-stats">
                                <div class="wa-stat">
                                    <span class="wa-stat-value" id="waPb">18.95m</span>
                                    <span class="wa-stat-label">${t('wa.pb') || 'Personal Best'}</span>
                                </div>
                                <div class="wa-stat">
                                    <span class="wa-stat-value" id="waRanking">#15</span>
                                    <span class="wa-stat-label">${t('wa.ranking') || 'Ranking Mundial'}</span>
                                </div>
                                <div class="wa-stat">
                                    <span class="wa-stat-value" id="waLastComp">2024</span>
                                    <span class="wa-stat-label">${t('wa.last_comp') || 'Última Competição'}</span>
                                </div>
                            </div>
                            <a href="https://worldathletics.org/athletes/portugal/eliana-bandeira-14653395" target="_blank" rel="noopener" class="btn-primary">
                                ${t('wa.btn') || 'Ver Perfil Oficial'} <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                        <div class="wa-image">
                            <img id="waMainImage" src="${waImage}" alt="Eliana Bandeira" loading="lazy" onerror="this.style.display='none'" />
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    loadData();

    return {
        update: function(data) {
            if (data && data.waImage) {
                waImage = data.waImage;
                renderPerformance(stats);
            }
        }
    };
};