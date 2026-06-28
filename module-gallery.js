/**
 * Módulo: Gallery
 * Função global: module_gallery
 */
window.module_gallery = function(container, lang, t) {
    console.log('🖼️ Gallery module iniciado');

    var defaultPhotos = [
        { id: 1, title: 'Treino explosivo', category: 'treinos', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=500&fit=crop' },
        { id: 2, title: 'Competição internacional', category: 'competicoes', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop' },
        { id: 3, title: 'Pódio', category: 'competicoes', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop' },
        { id: 4, title: 'Bastidores', category: 'bastidores', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=500&fit=crop' },
        { id: 5, title: 'Preparação física', category: 'treinos', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=500&fit=crop' },
        { id: 6, title: 'Evento com fãs', category: 'eventos', url: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&h=400&fit=crop' }
    ];

    var photos = defaultPhotos;
    var currentFilter = 'all';

    function loadData() {
        fetch('/api/photos')
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(data) {
                if (data && data.length) {
                    photos = data;
                }
                renderGallery(photos, 'all');
            })
            .catch(function() {
                renderGallery(photos, 'all');
            });
    }

    function renderGallery(data, filter) {
        var filtered = filter === 'all' ? data : data.filter(function(item) { return item.category === filter; });

        container.innerHTML = `
            <section id="gallery" class="section-gallery">
                <div class="container">
                    <div class="section-header centered">
                        <span class="section-tag">${t('gallery.tag') || 'Galeria'}</span>
                        <h2 class="section-title">
                            ${t('gallery.title') || 'Momentos'} <span class="highlight">${t('gallery.highlight') || 'que marcaram'}</span>
                        </h2>
                    </div>

                    <div class="gallery-filters">
                        <button class="filter-btn active" data-filter="all">${t('gallery.all') || 'Todos'}</button>
                        <button class="filter-btn" data-filter="treinos">${t('gallery.training') || 'Treinos'}</button>
                        <button class="filter-btn" data-filter="competicoes">${t('gallery.competitions') || 'Competições'}</button>
                        <button class="filter-btn" data-filter="bastidores">${t('gallery.behind') || 'Bastidores'}</button>
                        <button class="filter-btn" data-filter="eventos">${t('gallery.events') || 'Eventos'}</button>
                    </div>

                    <div class="gallery-grid" id="galleryGrid">
                        ${filtered.map(function(item) {
                            return `
                                <div class="gallery-item" data-id="${item.id}" data-category="${item.category}">
                                    <img src="${item.url}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'" />
                                    <div class="overlay"><span>${item.title}</span></div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </section>
        `;

        // Filtros
        var filterBtns = container.querySelectorAll('.filter-btn');
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                renderGallery(data, currentFilter);
            });
        });
    }

    loadData();

    return {
        update: function(newData) {
            if (newData && newData.length) {
                photos = newData;
                renderGallery(photos, currentFilter);
            }
        }
    };
};