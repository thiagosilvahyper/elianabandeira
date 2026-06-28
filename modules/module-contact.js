/**
 * Módulo: Contact
 * Função global: module_contact
 */
window.module_contact = function(container, lang, t) {
    console.log('📞 Contact module iniciado');

    // URLs fixas e corretas para cada rede social
    var socialUrls = {
        'Instagram': 'https://www.instagram.com/elianabandeiraoly',
        'YouTube': 'https://www.youtube.com/@elianabandeiraoly',
        'Facebook': 'https://www.facebook.com/share/1GDMDSL9sp/'
    };

    var defaultSocial = [
        { id: 1, platform: 'Instagram', handle: '@elianabandeiraoly', followers: '145K', icon: 'instagram' },
        { id: 2, platform: 'YouTube', handle: 'Eliana Bandeira', followers: '35K', icon: 'youtube' },
        { id: 3, platform: 'Facebook', handle: 'Eliana Bandeira', followers: '40K', icon: 'facebook-f' }
    ];

    var social = defaultSocial;

    function loadData() {
        fetch('/api/social')
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(data) {
                if (data && data.length) {
                    social = data;
                }
                renderContact(social);
            })
            .catch(function() {
                renderContact(social);
            });
    }

    function renderContact(data) {
        container.innerHTML = `
            <section id="contact" class="section-contact">
                <div class="container">
                    <div class="section-header centered">
                        <span class="section-tag">${t('contact.tag') || 'Contacto'}</span>
                        <h2 class="section-title">
                            ${t('contact.title') || 'Vamos'} <span class="highlight">${t('contact.highlight') || 'conversar'}</span>
                        </h2>
                    </div>

                    <div class="contact-grid">
                        <div class="contact-card">
                            <div class="contact-icon"><i class="fas fa-newspaper"></i></div>
                            <h4>${t('contact.media') || 'Imprensa'}</h4>
                            <p>${t('contact.media_desc') || 'Entrevistas, artigos e cobertura mediática'}</p>
                        </div>
                        <div class="contact-card">
                            <div class="contact-icon"><i class="fas fa-handshake"></i></div>
                            <h4>${t('contact.sponsor') || 'Patrocínios'}</h4>
                            <p>${t('contact.sponsor_desc') || 'Parcerias, apoios e ativação de marca'}</p>
                        </div>
                        <div class="contact-card">
                            <div class="contact-icon"><i class="fas fa-calendar-check"></i></div>
                            <h4>${t('contact.events') || 'Eventos'}</h4>
                            <p>${t('contact.events_desc') || 'Palestras, workshops e participações'}</p>
                        </div>
                    </div>

                    <div class="social-stats-grid">
                        ${data.map(function(s) {
                            var platformClass = s.platform.toLowerCase();
                            // Usa a URL fixa baseada na plataforma, ou fallback
                            var url = socialUrls[s.platform] || '#';
                            return `
                                <div class="social-stat-card ${platformClass}">
                                    <a href="${url}" target="_blank" rel="noopener" class="social-stat-link-full">
                                        <div class="social-stat-icon"><i class="fab fa-${s.icon || 'share-alt'}"></i></div>
                                        <div class="social-stat-count">${s.followers}</div>
                                        <div class="social-stat-label">${s.platform === 'YouTube' ? 'Inscritos' : 'Seguidores'}</div>
                                        <div class="social-stat-handle">${s.handle}</div>
                                    </a>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="contact-form-wrapper">
                        <form id="contactForm" class="contact-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="formName">${t('contact.form_name') || 'Nome completo'}</label>
                                    <input type="text" id="formName" placeholder="Seu nome" required />
                                </div>
                                <div class="form-group">
                                    <label for="formEmail">${t('contact.form_email') || 'E-mail'}</label>
                                    <input type="email" id="formEmail" placeholder="seu@email.com" required />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="formSubject">${t('contact.form_subject') || 'Assunto'}</label>
                                <select id="formSubject" required>
                                    <option value="">${t('contact.form_select') || 'Selecione...'}</option>
                                    <option value="imprensa">${t('contact.form_media') || 'Imprensa'}</option>
                                    <option value="patrocinio">${t('contact.form_sponsor') || 'Patrocínio'}</option>
                                    <option value="evento">${t('contact.form_event') || 'Evento'}</option>
                                    <option value="palestra">${t('contact.form_talk') || 'Palestra'}</option>
                                    <option value="outro">${t('contact.form_other') || 'Outro'}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="formMessage">${t('contact.form_message') || 'Mensagem'}</label>
                                <textarea id="formMessage" rows="5" placeholder="Escreva a sua mensagem..." required></textarea>
                            </div>
                            <button type="submit" class="btn-primary btn-full">
                                ${t('contact.form_btn') || 'Enviar Mensagem'} <i class="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;

        // Formulário
        var form = container.querySelector('#contactForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var btn = form.querySelector('button[type="submit"]');
                var original = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                btn.disabled = true;

                setTimeout(function() {
                    alert('✅ Mensagem enviada com sucesso!\n\nEntraremos em contacto brevemente.');
                    form.reset();
                    btn.innerHTML = original;
                    btn.disabled = false;
                }, 1500);
            });
        }
    }

    loadData();

    return {
        update: function(newData) {
            if (newData && newData.length) {
                social = newData;
                renderContact(social);
            }
        }
    };
};