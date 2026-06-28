/**
 * Módulo: About (Sobre, Títulos, Calendário)
 * Função global: module_about
 * Versão: 2.0 - Com traduções completas para todos os elementos
 */
window.module_about = function(container, lang, t) {
    console.log('👤 About module iniciado (lang: ' + lang + ')');

    // ✅ Função auxiliar para obter tradução com fallback
    function getText(key, fallback) {
        var result = t(key);
        if (result === key || result === undefined || result === null) {
            return fallback;
        }
        return result;
    }

    // ============================================================
    // TRADUÇÕES PARA TIPOS DE MEDALHAS E STATUS
    // ============================================================
    function getTitleTypeLabel(type) {
        var map = {
            gold: getText('title.gold', '🥇 Ouro'),
            silver: getText('title.silver', '🥈 Prata'),
            bronze: getText('title.bronze', '🥉 Bronze'),
            olympic: getText('title.olympic', '🏅 Semifinalista'),
            european: getText('title.european', '🏅 Top 10 Europeu'),
            national: getText('title.national', '🏆 Título Nacional')
        };
        return map[type] || type;
    }

    function getStatusLabel(status) {
        var map = {
            confirmed: getText('calendar.confirmed', 'Confirmado'),
            pending: getText('calendar.pending', 'Pendente')
        };
        return map[status] || status;
    }

    function getMonthLabel(month) {
        var map = {
            'Jan': getText('month.jan', 'Jan'),
            'Fev': getText('month.fev', 'Fev'),
            'Mar': getText('month.mar', 'Mar'),
            'Abr': getText('month.abr', 'Abr'),
            'Mai': getText('month.mai', 'Mai'),
            'Jun': getText('month.jun', 'Jun'),
            'Jul': getText('month.jul', 'Jul'),
            'Ago': getText('month.ago', 'Ago'),
            'Set': getText('month.set', 'Set'),
            'Out': getText('month.out', 'Out'),
            'Nov': getText('month.nov', 'Nov'),
            'Dez': getText('month.dez', 'Dez')
        };
        return map[month] || month;
    }

    // ============================================================
    // DADOS PADRÃO
    // ============================================================
    var defaultTitles = [
        { id: 1, type: 'gold', competition: 'Jogos Ibero-Americanos', year: '2024', result: '🥇 Ouro' },
        { id: 2, type: 'silver', competition: 'Mundiais Universitários', year: '2023', result: '🥈 Prata' },
        { id: 3, type: 'bronze', competition: 'Taça da Europa', year: '2025', result: '🥉 Bronze' },
        { id: 4, type: 'olympic', competition: 'Jogos Olímpicos', year: '2024', result: '🏅 Semifinalista' },
        { id: 5, type: 'european', competition: 'Campeonato da Europa', year: '2025', result: '🏅 Top 10' },
        { id: 6, type: 'national', competition: 'Campeã Nacional', year: '2020-2025', result: '🏆 4× Títulos' }
    ];

    var defaultCalendar = [
        { id: 1, month: 'Jan', day: 15, title: 'Provas de Inverno', location: 'Lisboa, Portugal · Finlândia', status: 'confirmed' },
        { id: 2, month: 'Fev', day: 8, title: 'Meeting Internacional', location: 'Paris, França · Braga, Portugal', status: 'confirmed' },
        { id: 3, month: 'Mar', day: 20, title: 'Taça da Europa · Mundial Indoor', location: 'Competições Europeias', status: 'confirmed' },
        { id: 4, month: 'Mai', day: 12, title: 'Jogos Ibero-Americanos', location: 'Albufeira, Portugal', status: 'confirmed' },
        { id: 5, month: 'Jul', day: 25, title: 'Campeonato de Portugal', location: 'Maia, Portugal', status: 'confirmed' },
        { id: 6, month: 'Ago', day: 10, title: 'Campeonato da Europa', location: 'Europa', status: 'pending' }
    ];

    var titles = defaultTitles;
    var calendar = defaultCalendar;
    var aboutImage = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=700&fit=crop&crop=center';

    // ============================================================
    // CARREGAR DADOS DA API
    // ============================================================
    function loadData() {
        fetch('/api/profile')
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(profile) {
                if (profile && profile.aboutImage) {
                    aboutImage = profile.aboutImage;
                }
                return Promise.all([
                    fetch('/api/titles').then(function(r) { return r.ok ? r.json() : null; }),
                    fetch('/api/calendar').then(function(r) { return r.ok ? r.json() : null; })
                ]);
            })
            .then(function(results) {
                if (results && results[0] && results[0].length) titles = results[0];
                if (results && results[1] && results[1].length) calendar = results[1];
                renderAbout(titles, calendar);
            })
            .catch(function() {
                renderAbout(titles, calendar);
            });
    }

    // ============================================================
    // RENDERIZAR
    // ============================================================
    function renderAbout(titlesData, calendarData) {
        // ✅ Textos com tradução
        var tag = getText('about.tag', 'A pessoa');
        var title = getText('about.title', 'Quem é');
        var highlight = getText('about.highlight', 'Eliana');
        var p1 = getText('about.p1', 'Eliana Bandeira é uma atleta olímpica do arremesso de peso que transformou uma infância simples do interior do Ceará numa trajetória de excelência esportiva e impacto humano.');
        var p2 = getText('about.p2', 'Nascida em Jaguaribara, Ceará, a 1 de julho de 1996, cresceu numa casa simples, cercada por rotina humilde, mas com sonhos grandes demais para o tamanho da cidade.');
        var p3 = getText('about.p3', 'Aos 18 anos, tomou a decisão corajosa de atravessar o Atlântico para Portugal, onde se especializou no Lançamento do Peso, obteve a nacionalidade portuguesa e realizou o sonho olímpico.');
        var value1 = getText('about.value1', 'Fé');
        var value2 = getText('about.value2', 'Disciplina');
        var value3 = getText('about.value3', 'Resiliência');
        var value4 = getText('about.value4', 'Portugal');
        var value5 = getText('about.value5', 'Brasil');

        var titlesTag = getText('titles.tag', 'Conquistas');
        var titlesTitle = getText('titles.title', 'Títulos e');
        var titlesHighlight = getText('titles.highlight', 'Medalhas');

        var calendarTag = getText('calendar.tag', 'Calendário');
        var calendarTitle = getText('calendar.title', 'Próximas');
        var calendarHighlight = getText('calendar.highlight', 'Competições');

        // ✅ Construir HTML
        container.innerHTML = `
            <section id="about" class="section-about">
                <div class="container">

                    <!-- =============================================
                    SOBRE
                    ============================================= -->
                    <div class="about-wrapper">
                        <div class="about-image">
                            <img id="aboutMainImage" src="${aboutImage}" alt="Eliana Bandeira" loading="lazy" onerror="this.style.display='none'" />
                        </div>
                        <div class="about-content">
                            <span class="section-tag">${tag}</span>
                            <h2 class="section-title">
                                ${title} <span class="highlight">${highlight}</span>
                            </h2>
                            <p>${p1}</p>
                            <p>${p2}</p>
                            <p>${p3}</p>
                            <div class="about-values">
                                <span><i class="fas fa-heart"></i> ${value1}</span>
                                <span><i class="fas fa-star"></i> ${value2}</span>
                                <span><i class="fas fa-hand-holding-heart"></i> ${value3}</span>
                                <span><i class="fas fa-flag"></i> ${value4}</span>
                                <span><i class="fas fa-globe-americas"></i> ${value5}</span>
                            </div>
                        </div>
                    </div>

                    <!-- =============================================
                    TÍTULOS E MEDALHAS
                    ============================================= -->
                    <div style="margin-top:4rem;border-top:1px solid var(--gray-border);padding-top:3rem;">
                        <div class="section-header centered">
                            <span class="section-tag">${titlesTag}</span>
                            <h2 class="section-title">
                                ${titlesTitle} <span class="highlight">${titlesHighlight}</span>
                            </h2>
                        </div>

                        <div class="titles-grid">
                            ${titlesData.map(function(item) {
                                var typeMap = { gold: 'gold', silver: 'silver', bronze: 'bronze', olympic: 'olympic', european: 'european', national: 'national' };
                                var typeLabel = getTitleTypeLabel(item.type);
                                return `
                                    <div class="title-card ${typeMap[item.type] || 'gold'}">
                                        <div class="title-medal"><i class="fas fa-medal"></i></div>
                                        <div class="title-competition">${item.competition}</div>
                                        <div class="title-year">${item.year}</div>
                                        <div class="title-result">${typeLabel}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- =============================================
                    CALENDÁRIO
                    ============================================= -->
                    <div style="margin-top:4rem;border-top:1px solid var(--gray-border);padding-top:3rem;">
                        <div class="section-header centered">
                            <span class="section-tag">${calendarTag}</span>
                            <h2 class="section-title">
                                ${calendarTitle} <span class="highlight">${calendarHighlight}</span>
                            </h2>
                        </div>

                        <div class="calendar-timeline">
                            ${calendarData.map(function(item) {
                                var monthLabel = getMonthLabel(item.month);
                                var statusLabel = getStatusLabel(item.status);
                                var statusClass = item.status === 'confirmed' ? 'confirmed' : 'pending';
                                return `
                                    <div class="calendar-event">
                                        <div class="calendar-date">
                                            <span class="month">${monthLabel}</span>
                                            <span class="day">${item.day}</span>
                                        </div>
                                        <div class="calendar-dot"></div>
                                        <div class="calendar-info">
                                            <h4>${item.title}</h4>
                                            ${item.location ? '<p>' + item.location + '</p>' : ''}
                                            <span class="calendar-status ${statusClass}">${statusLabel}</span>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                </div>
            </section>
        `;

        // ✅ Aplicar traduções aos elementos com data-i18n dentro do módulo
        if (window.__EB && typeof window.__EB.applyTranslations === 'function') {
            window.__EB.applyTranslations();
        }

        console.log('✅ About module renderizado com traduções completas');
    }

    // ============================================================
    // INICIALIZAR
    // ============================================================
    loadData();

    // ============================================================
    // EXPOR API PARA ATUALIZAÇÃO
    // ============================================================
    return {
        update: function(data) {
            if (data && data.aboutImage) {
                aboutImage = data.aboutImage;
                renderAbout(titles, calendar);
            }
        },
        // Permitir re-renderizar com novo idioma
        refresh: function() {
            renderAbout(titles, calendar);
        }
    };
};