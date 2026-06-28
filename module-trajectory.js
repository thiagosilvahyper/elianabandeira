/**
 * Módulo: Trajectory
 * Função global: module_trajectory
 */
window.module_trajectory = function(container, lang, t) {
    console.log('🛤️ Trajectory module iniciado');

    var defaultItems = [
        { id: 1, year: '1996', title: 'Nasce no Brasil', desc: 'Em Jaguaribara, Ceará, nasce uma futura atleta olímpica. Criada com valores de família, humildade e fé.', location: 'Jaguaribara, Brasil' },
        { id: 2, year: '2014', title: 'Chegada a Portugal', desc: 'Aos 18 anos, muda-se para Leiria para perseguir o sonho olímpico. Início da carreira no Lançamento do Peso.', location: 'Leiria, Portugal' },
        { id: 3, year: '2023', title: 'Prata Mundial Universitária', desc: 'Conquista a medalha de prata nos Jogos Mundiais Universitários.', location: 'Chengdu, China' },
        { id: 4, year: '2024', title: 'Jogos Olímpicos Paris', desc: 'Semifinalista Olímpica — Top 15 mundial. Representa Portugal nos maiores palcos do atletismo.', location: 'Paris, França' },
        { id: 5, year: '2025', title: 'Bronze Europeu', desc: 'Medalha de bronze na Taça da Europa de Lançamentos e presença no Top 10 europeu.', location: 'Leiria, Portugal' },
        { id: 6, year: '2028', title: 'Los Angeles 2028', desc: 'O próximo grande objetivo. Preparação intensiva para alcançar o pódio olímpico.', location: 'Los Angeles, EUA', future: true }
    ];

    var items = defaultItems;
    var observer = null;

    // ✅ Função auxiliar para obter tradução com fallback
    function getText(key, fallback) {
        var result = t(key);
        // Se o resultado for igual à chave ou undefined, usa o fallback
        if (result === key || result === undefined || result === null) {
            return fallback;
        }
        return result;
    }

    function loadData() {
        fetch('/api/timeline')
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(data) {
                if (data && data.length) {
                    items = data;
                }
                renderTrajectory(items);
            })
            .catch(function() {
                renderTrajectory(items);
            });
    }

    function renderTrajectory(data) {
        // ✅ Usar getText com fallbacks em português
        var tag = getText('trajectory.tag', 'Trajetória');
        var title = getText('trajectory.title', 'Uma história de');
        var highlight = getText('trajectory.highlight', 'superação');
        var desc = getText('trajectory.desc', 'Do Ceará ao mundo — cada passo da jornada que levou Eliana Bandeira ao topo do atletismo mundial.');

        container.innerHTML = `
            <section id="trajectory" class="section-trajetoria">
                <div class="container">
                    <div class="section-header">
                        <span class="section-tag">${tag}</span>
                        <h2 class="section-title">
                            ${title} <span class="highlight">${highlight}</span>
                        </h2>
                        <p class="section-desc">${desc}</p>
                    </div>

                    <div class="timeline-container">
                        <div class="timeline-line"></div>
                        ${data.map(function(item) {
                            return `
                                <div class="timeline-item" data-year="${item.year}">
                                    <div class="timeline-marker">
                                        <div class="marker-dot${item.future ? ' future' : ''}"></div>
                                        <span class="marker-year">${item.year}</span>
                                    </div>
                                    <div class="timeline-content">
                                        <h3>${item.title}</h3>
                                        <p>${item.desc || ''}</p>
                                        ${item.location ? '<span class="timeline-location"><i class="fas fa-map-pin"></i> ' + item.location + '</span>' : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </section>
        `;

        // Animar com Intersection Observer
        if (observer) observer.disconnect();
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        container.querySelectorAll('.timeline-item').forEach(function(item) {
            observer.observe(item);
        });
    }

    loadData();

    return {
        update: function(newData) {
            if (newData && newData.length) {
                items = newData;
                renderTrajectory(items);
            }
        },
        destroy: function() {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
        }
    };
};