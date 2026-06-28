/**
 * Módulo: Sponsors
 * Função global: module_sponsors
 */
window.module_sponsors = function(container, lang, t) {
    console.log('🤝 Sponsors module iniciado');

    // ✅ Função auxiliar para obter tradução com fallback
    function getText(key, fallback) {
        var result = t(key);
        if (result === key || result === undefined || result === null) {
            return fallback;
        }
        return result;
    }

    var defaultSponsors = [
        { id: 1, name: 'Sporting CP', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Sporting_CP.svg' },
        { id: 2, name: 'Federação Portuguesa de Atletismo', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Logo_Federa%C3%A7%C3%A3o_Portuguesa_de_Atletismo.svg' }
    ];

    var sponsors = defaultSponsors;

    function loadData() {
        fetch('/api/sponsors')
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(data) {
                if (data && data.length) {
                    sponsors = data;
                }
                renderSponsors(sponsors);
            })
            .catch(function() {
                renderSponsors(sponsors);
            });
    }

    function renderSponsors(data) {
        // ✅ Usar getText com fallbacks
        var tag = getText('sponsors.tag', 'Parceiros');
        var title = getText('sponsors.title', 'Patrocinadores');
        var highlight = getText('sponsors.highlight', 'oficiais');
        var ctaTitle = getText('sponsors.cta_title', 'Quer fazer parte desta equipa?');
        var ctaDesc = getText('sponsors.cta_desc', 'Descubra as oportunidades de parceria e patrocínio com uma atleta olímpica.');
        var ctaBtn = getText('sponsors.cta_btn', 'Seja Patrocinador');
        var b1Title = getText('benefits.1_title', 'Exposição Internacional');
        var b1Desc = getText('benefits.1_desc', 'Visibilidade em Portugal, Brasil e mercados lusófonos com alcance de 270M+ pessoas.');
        var b2Title = getText('benefits.2_title', 'Cobertura Mediática');
        var b2Desc = getText('benefits.2_desc', 'Presença em 5 canais desportivos em Portugal e 8 emissoras no Brasil.');
        var b3Title = getText('benefits.3_title', 'Impacto Social');
        var b3Desc = getText('benefits.3_desc', 'Projetos sociais e formação em atletismo, conectando Lisboa e Fortaleza.');
        var b4Title = getText('benefits.4_title', 'Retorno de Marca');
        var b4Desc = getText('benefits.4_desc', 'Ativação de marca com atleta olímpica que representa autenticidade e excelência.');

        container.innerHTML = `
            <section id="sponsors" class="section-sponsors">
                <div class="container">
                    <div class="section-header centered">
                        <span class="section-tag">${tag}</span>
                        <h2 class="section-title">
                            ${title} <span class="highlight">${highlight}</span>
                        </h2>
                    </div>

                    <div class="sponsors-grid">
                        ${data.map(function(s) {
                            return '<img src="' + s.logo + '" alt="' + s.name + '" loading="lazy" title="' + s.name + '" onerror="this.style.display=\'none\'" />';
                        }).join('')}
                    </div>

                    <div class="sponsor-cta">
                        <h3>${ctaTitle}</h3>
                        <p>${ctaDesc}</p>
                        <a href="#contact" class="btn-primary">
                            <i class="fas fa-handshake"></i> ${ctaBtn}
                        </a>
                    </div>

                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-globe-americas"></i></div>
                            <h4>${b1Title}</h4>
                            <p>${b1Desc}</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-tv"></i></div>
                            <h4>${b2Title}</h4>
                            <p>${b2Desc}</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-users"></i></div>
                            <h4>${b3Title}</h4>
                            <p>${b3Desc}</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-chart-line"></i></div>
                            <h4>${b4Title}</h4>
                            <p>${b4Desc}</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    loadData();

    return {
        update: function(newData) {
            if (newData && newData.length) {
                sponsors = newData;
                renderSponsors(sponsors);
            }
        }
    };
};