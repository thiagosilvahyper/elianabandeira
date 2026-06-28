/**
 * Módulo: Sponsors
 * Função global: module_sponsors
 */
window.module_sponsors = function(container, lang, t) {
    console.log('🤝 Sponsors module iniciado');

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
        container.innerHTML = `
            <section id="sponsors" class="section-sponsors">
                <div class="container">
                    <div class="section-header centered">
                        <span class="section-tag">${t('sponsors.tag') || 'Parceiros'}</span>
                        <h2 class="section-title">
                            ${t('sponsors.title') || 'Patrocinadores'} <span class="highlight">${t('sponsors.highlight') || 'oficiais'}</span>
                        </h2>
                    </div>

                    <div class="sponsors-grid">
                        ${data.map(function(s) {
                            return '<img src="' + s.logo + '" alt="' + s.name + '" loading="lazy" title="' + s.name + '" onerror="this.style.display=\'none\'" />';
                        }).join('')}
                    </div>

                    <div class="sponsor-cta">
                        <h3>${t('sponsors.cta_title') || 'Quer fazer parte desta equipa?'}</h3>
                        <p>${t('sponsors.cta_desc') || 'Descubra as oportunidades de parceria e patrocínio com uma atleta olímpica.'}</p>
                        <a href="#contact" class="btn-primary">
                            <i class="fas fa-handshake"></i> ${t('sponsors.cta_btn') || 'Seja Patrocinador'}
                        </a>
                    </div>

                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-globe-americas"></i></div>
                            <h4>${t('benefits.1_title') || 'Exposição Internacional'}</h4>
                            <p>${t('benefits.1_desc') || 'Visibilidade em Portugal, Brasil e mercados lusófonos com alcance de 270M+ pessoas.'}</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-tv"></i></div>
                            <h4>${t('benefits.2_title') || 'Cobertura Mediática'}</h4>
                            <p>${t('benefits.2_desc') || 'Presença em 5 canais desportivos em Portugal e 8 emissoras no Brasil.'}</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-users"></i></div>
                            <h4>${t('benefits.3_title') || 'Impacto Social'}</h4>
                            <p>${t('benefits.3_desc') || 'Projetos sociais e formação em atletismo, conectando Lisboa e Fortaleza.'}</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-chart-line"></i></div>
                            <h4>${t('benefits.4_title') || 'Retorno de Marca'}</h4>
                            <p>${t('benefits.4_desc') || 'Ativação de marca com atleta olímpica que representa autenticidade e excelência.'}</p>
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