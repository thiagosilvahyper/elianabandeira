/**
 * Módulo: About (Sobre, Títulos, Calendário)
 * Função global: module_about
 */
window.module_about = function(container, lang, t) {
    console.log('👤 About module iniciado');

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

    function loadData() {
        // Carregar perfil para a imagem
        fetch('/api/profile')
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(profile) {
                if (profile && profile.aboutImage) {
                    aboutImage = profile.aboutImage;
                }
                // Carregar títulos e calendário
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

    function renderAbout(titlesData, calendarData) {
        container.innerHTML = `
            <section id="about" class="section-about">
                <div class="container">
                    <div class="about-wrapper">
                        <div class="about-image">
                            <img id="aboutMainImage" src="${aboutImage}" alt="Eliana Bandeira" loading="lazy" />
                        </div>
                        <div class="about-content">
                            <span class="section-tag">${t('about.tag') || 'A pessoa'}</span>
                            <h2 class="section-title">
                                ${t('about.title') || 'Quem é'} <span class="highlight">${t('about.highlight') || 'Eliana'}</span>
                            </h2>
                            <p>${t('about.p1') || 'Eliana Bandeira é uma atleta olímpica do arremesso de peso que transformou uma infância simples do interior do Ceará numa trajetória de excelência esportiva e impacto humano.'}</p>
                            <p>${t('about.p2') || 'Nascida em Jaguaribara, Ceará, a 1 de julho de 1996, cresceu numa casa simples, cercada por rotina humilde, mas com sonhos grandes demais para o tamanho da cidade.'}</p>
                            <p>${t('about.p3') || 'Aos 18 anos, tomou a decisão corajosa de atravessar o Atlântico para Portugal, onde se especializou no Lançamento do Peso, obteve a nacionalidade portuguesa e realizou o sonho olímpico.'}</p>
                            <div class="about-values">
                                <span><i class="fas fa-heart"></i> ${t('about.value1') || 'Fé'}</span>
                                <span><i class="fas fa-star"></i> ${t('about.value2') || 'Disciplina'}</span>
                                <span><i class="fas fa-hand-holding-heart"></i> ${t('about.value3') || 'Resiliência'}</span>
                                <span><i class="fas fa-flag"></i> ${t('about.value4') || 'Portugal'}</span>
                                <span><i class="fas fa-globe-americas"></i> ${t('about.value5') || 'Brasil'}</span>
                            </div>
                        </div>
                    </div>

                    <div class="titles-grid">
                        ${titlesData.map(function(item) {
                            var typeMap = { gold: 'gold', silver: 'silver', bronze: 'bronze', olympic: 'olympic', european: 'european', national: 'national' };
                            return `
                                <div class="title-card ${typeMap[item.type] || 'gold'}">
                                    <div class="title-medal"><i class="fas fa-medal"></i></div>
                                    <div class="title-competition">${item.competition}</div>
                                    <div class="title-year">${item.year}</div>
                                    <div class="title-result">${item.result || '🏅'}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="calendar-timeline">
                        ${calendarData.map(function(item) {
                            return `
                                <div class="calendar-event">
                                    <div class="calendar-date">
                                        <span class="month">${item.month}</span>
                                        <span class="day">${item.day}</span>
                                    </div>
                                    <div class="calendar-dot"></div>
                                    <div class="calendar-info">
                                        <h4>${item.title}</h4>
                                        ${item.location ? '<p>' + item.location + '</p>' : ''}
                                        <span class="calendar-status ${item.status || 'confirmed'}">${item.status === 'confirmed' ? 'Confirmado' : 'Pendente'}</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    loadData();

    return {
        update: function(data) {
            if (data && data.aboutImage) {
                aboutImage = data.aboutImage;
                renderAbout(titles, calendar);
            }
        }
    };
};