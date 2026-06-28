/**
 * Módulo: Contact
 * Função global: module_contact
 */
window.module_contact = function(container, lang, t) {
    console.log('📞 Contact module iniciado');

    // ✅ Função auxiliar para obter tradução com fallback
    function getText(key, fallback) {
        var result = t(key);
        if (result === key || result === undefined || result === null) {
            return fallback;
        }
        return result;
    }

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
        // ✅ Usar getText com fallbacks
        var tag = getText('contact.tag', 'Contacto');
        var title = getText('contact.title', 'Vamos');
        var highlight = getText('contact.highlight', 'conversar');
        var media = getText('contact.media', 'Imprensa');
        var mediaDesc = getText('contact.media_desc', 'Entrevistas, artigos e cobertura mediática');
        var sponsor = getText('contact.sponsor', 'Patrocínios');
        var sponsorDesc = getText('contact.sponsor_desc', 'Parcerias, apoios e ativação de marca');
        var events = getText('contact.events', 'Eventos');
        var eventsDesc = getText('contact.events_desc', 'Palestras, workshops e participações');
        var formName = getText('contact.form_name', 'Nome completo');
        var formEmail = getText('contact.form_email', 'E-mail');
        var formSubject = getText('contact.form_subject', 'Assunto');
        var formSelect = getText('contact.form_select', 'Selecione...');
        var formMedia = getText('contact.form_media', 'Imprensa');
        var formSponsor = getText('contact.form_sponsor', 'Patrocínio');
        var formEvent = getText('contact.form_event', 'Evento');
        var formTalk = getText('contact.form_talk', 'Palestra');
        var formOther = getText('contact.form_other', 'Outro');
        var formMessage = getText('contact.form_message', 'Mensagem');
        var formBtn = getText('contact.form_btn', 'Enviar Mensagem');

        container.innerHTML = `
            <section id="contact" class="section-contact">
                <div class="container">
                    <div class="section-header centered">
                        <span class="section-tag">${tag}</span>
                        <h2 class="section-title">
                            ${title} <span class="highlight">${highlight}</span>
                        </h2>
                    </div>

                    <div class="contact-grid">
                        <div class="contact-card">
                            <div class="contact-icon"><i class="fas fa-newspaper"></i></div>
                            <h4>${media}</h4>
                            <p>${mediaDesc}</p>
                        </div>
                        <div class="contact-card">
                            <div class="contact-icon"><i class="fas fa-handshake"></i></div>
                            <h4>${sponsor}</h4>
                            <p>${sponsorDesc}</p>
                        </div>
                        <div class="contact-card">
                            <div class="contact-icon"><i class="fas fa-calendar-check"></i></div>
                            <h4>${events}</h4>
                            <p>${eventsDesc}</p>
                        </div>
                    </div>

                    <div class="social-stats-grid">
                        ${data.map(function(s) {
                            var platformClass = s.platform.toLowerCase();
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
                                    <label for="formName">${formName}</label>
                                    <input type="text" id="formName" placeholder="Seu nome" required />
                                </div>
                                <div class="form-group">
                                    <label for="formEmail">${formEmail}</label>
                                    <input type="email" id="formEmail" placeholder="seu@email.com" required />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="formSubject">${formSubject}</label>
                                <select id="formSubject" required>
                                    <option value="">${formSelect}</option>
                                    <option value="imprensa">${formMedia}</option>
                                    <option value="patrocinio">${formSponsor}</option>
                                    <option value="evento">${formEvent}</option>
                                    <option value="palestra">${formTalk}</option>
                                    <option value="outro">${formOther}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="formMessage">${formMessage}</label>
                                <textarea id="formMessage" rows="5" placeholder="Escreva a sua mensagem..." required></textarea>
                            </div>
                            <button type="submit" class="btn-primary btn-full">
                                ${formBtn} <i class="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;

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