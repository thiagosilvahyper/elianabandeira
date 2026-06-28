/**
 * Módulo: Videos
 * Função global: module_videos
 */
window.module_videos = function(container, lang, t) {
    console.log('🎬 Videos module iniciado');

    var defaultVideos = [
        { id: 1, title: 'Lançamento 19.08m - Recorde Nacional', embed: 'Tv7P9H3QpKk', views: '12.5K' },
        { id: 2, title: 'Entrevista exclusiva - Eliana Bandeira', embed: '1Lk6P_v4eCg', views: '8.2K' },
        { id: 3, title: 'Treino de alta intensidade', embed: '3lUqI7HhWCE', views: '5.7K' }
    ];

    var videos = defaultVideos;

    function loadData() {
        fetch('/api/videos')
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(data) {
                if (data && data.length) {
                    videos = data;
                }
                renderVideos(videos);
                setupVideoCards();
            })
            .catch(function() {
                renderVideos(videos);
                setupVideoCards();
            });
    }

    /**
     * Extrai o ID do vídeo do YouTube de uma URL ou retorna o ID diretamente
     */
    function extractYoutubeId(input) {
        if (!input) return null;
        
        // Se já for um ID curto (11 caracteres)
        if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) {
            return input.trim();
        }
        
        // Tenta extrair de URLs
        var patterns = [
            /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
            /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
            /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
            /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
            /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/
        ];
        
        for (var i = 0; i < patterns.length; i++) {
            var match = input.match(patterns[i]);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        // Se não encontrou, retorna o input original (pode ser um ID válido)
        return input.trim();
    }

    function renderVideos(data) {
        container.innerHTML = `
            <section id="videos" class="section-videos">
                <div class="container">
                    <div class="section-header centered">
                        <span class="section-tag">${t('videos.tag') || 'Multimídia'}</span>
                        <h2 class="section-title">
                            ${t('videos.title') || 'Vídeos'} <span class="highlight">${t('videos.highlight') || 'em destaque'}</span>
                        </h2>
                    </div>

                    <div class="videos-grid">
                        ${data.map(function(video, index) {
                            // Extrai o ID do vídeo corretamente
                            var embedId = extractYoutubeId(video.embed);
                            if (!embedId) {
                                console.warn('⚠️ ID do YouTube inválido:', video.embed);
                                return `
                                    <div class="video-card" data-embed="" data-index="${index}">
                                        <div class="video-thumb" style="background:#333;display:flex;align-items:center;justify-content:center;min-height:180px;color:#666;">
                                            <span>🎬 ID inválido</span>
                                        </div>
                                        <div class="video-info">
                                            <h4>${video.title}</h4>
                                            <p style="color:#e74c3c;"><i class="fas fa-exclamation-triangle"></i> Verifique o ID do vídeo</p>
                                        </div>
                                    </div>
                                `;
                            }
                            
                            var thumbnail = `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`;
                            return `
                                <div class="video-card" data-embed="${embedId}" data-index="${index}">
                                    <div class="video-thumb">
                                        <img src="${thumbnail}" 
                                             alt="${video.title}" 
                                             loading="lazy"
                                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22180%22%3E%3Crect fill=%22%23333%22 width=%22320%22 height=%22180%22/%3E%3Ctext x=%22160%22 y=%2290%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2216%22 font-family=%22sans-serif%22%3E🎬 Vídeo%3C/text%3E%3C/svg%3E'" />
                                        <div class="video-play">
                                            <i class="fas fa-play"></i>
                                        </div>
                                        <div class="video-duration">${video.duration || '02:30'}</div>
                                    </div>
                                    <div class="video-info">
                                        <h4>${video.title}</h4>
                                        ${video.views ? '<p><i class="fas fa-eye"></i> ' + video.views + ' visualizações</p>' : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    function setupVideoCards() {
        var cards = container.querySelectorAll('.video-card');
        var videoModal = document.getElementById('videoModal');
        var videoIframe = document.getElementById('videoIframe');
        var videoModalClose = document.getElementById('videoModalClose');

        if (!videoModal || !videoIframe) {
            console.warn('⚠️ Video modal não encontrado no DOM');
            return;
        }

        cards.forEach(function(card) {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var embedId = this.dataset.embed;
                if (!embedId) {
                    console.warn('⚠️ Embed ID não encontrado');
                    return;
                }

                // Abre o vídeo no modal
                var youtubeUrl = 'https://www.youtube.com/embed/' + embedId + '?autoplay=1&rel=0';
                videoIframe.src = youtubeUrl;
                videoModal.classList.add('open');
                document.body.style.overflow = 'hidden';
                
                console.log('🎬 Abrindo vídeo:', embedId);
            });
        });

        // Fechar modal - clique no X
        if (videoModalClose) {
            videoModalClose.addEventListener('click', function() {
                closeVideoModal(videoModal, videoIframe);
            });
        }

        // Fechar modal - clique fora
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal(videoModal, videoIframe);
            }
        });

        // Fechar modal - tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('open')) {
                closeVideoModal(videoModal, videoIframe);
            }
        });
    }

    function closeVideoModal(modal, iframe) {
        if (modal) modal.classList.remove('open');
        if (iframe) iframe.src = '';
        document.body.style.overflow = '';
    }

    // Carrega os dados e renderiza
    loadData();

    return {
        update: function(newData) {
            if (newData && newData.length) {
                videos = newData;
                renderVideos(videos);
                setupVideoCards();
            }
        },
        refresh: function() {
            loadData();
        }
    };
};