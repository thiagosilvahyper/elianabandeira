// ============================================================
// SERVER.JS — VERSÃO COMPLETA PARA VERCEL
// CORREÇÕES:
// 1. Ordem das rotas corrigida (específicas antes de genéricas)
// 2. Rota /api/stats movida para antes da rota genérica
// 3. PORT usa variável de ambiente (process.env.PORT)
// 4. Suporte para Vercel (exporta module.exports = app)
// 5. Melhor tratamento de erros
// 6. Validação de dados aprimorada
// 7. Persistência de dados adaptada para Vercel (read-only filesystem)
// ============================================================

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARE
// ============================================================
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir ficheiros estáticos da pasta atual (raiz)
app.use(express.static(__dirname));

// ============================================================
// BASE DE DADOS (JSON)
// ============================================================
const DATA_FILE = path.join(__dirname, 'data.json');
const API_KEY = process.env.API_KEY || 'imperare2024';

// Dados iniciais COMPLETOS com todas as coleções
const defaultData = {
    // ===== FOTOS =====
    photos: [
        { id: 1, title: 'Treino explosivo', category: 'treinos', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=500&fit=crop' },
        { id: 2, title: 'Competição internacional', category: 'competicoes', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop' },
        { id: 3, title: 'Pódio', category: 'competicoes', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop' },
        { id: 4, title: 'Bastidores', category: 'bastidores', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=500&fit=crop' },
        { id: 5, title: 'Preparação física', category: 'treinos', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=500&fit=crop' },
        { id: 6, title: 'Evento com fãs', category: 'eventos', url: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&h=400&fit=crop' }
    ],

    // ===== VÍDEOS =====
    videos: [
        { id: 1, title: 'Lançamento 19.08m', embed: 'Tv7P9H3QpKk', views: '12.5K' },
        { id: 2, title: 'Entrevista exclusiva', embed: '1Lk6P_v4eCg', views: '8.2K' },
        { id: 3, title: 'Treino de alta intensidade', embed: '3lUqI7HhWCE', views: '5.7K' }
    ],

    // ===== TIMELINE =====
    timeline: [
        { id: 1, year: '1996', title: 'Nasce no Brasil', desc: 'Em Jaguaribara, Ceará, nasce uma futura atleta olímpica.', location: 'Jaguaribara, Brasil' },
        { id: 2, year: '2014', title: 'Chegada a Portugal', desc: 'Aos 18 anos, muda-se para Leiria para perseguir o sonho olímpico.', location: 'Leiria, Portugal' },
        { id: 3, year: '2023', title: 'Prata Mundial Universitária', desc: 'Conquista a medalha de prata nos Jogos Mundiais Universitários.', location: 'Chengdu, China' },
        { id: 4, year: '2024', title: 'Jogos Olímpicos Paris', desc: 'Semifinalista Olímpica — Top 15 mundial.', location: 'Paris, França' },
        { id: 5, year: '2025', title: 'Bronze Europeu', desc: 'Medalha de bronze na Taça da Europa de Lançamentos.', location: 'Leiria, Portugal' },
        { id: 6, year: '2028', title: 'Los Angeles 2028', desc: 'O próximo grande objetivo. Preparação intensiva.', location: 'Los Angeles, EUA' }
    ],

    // ===== STATS =====
    stats: [
        { id: 1, value: '18.95m', label: 'Recorde Nacional', sub: 'Lançamento do Peso' },
        { id: 2, value: '6', label: 'Medalhas Internacionais', sub: 'Ouro · Prata · Bronze' },
        { id: 3, value: '4', label: 'Títulos Nacionais', sub: 'Campeã de Portugal' },
        { id: 4, value: 'Top 15', label: 'Ranking Mundial', sub: 'World Athletics' },
        { id: 5, value: '12', label: 'Países Visitados', sub: 'Competições Internacionais' },
        { id: 6, value: '1.2M', label: 'Alcance Social', sub: 'Milhões de seguidores' }
    ],

    // ===== TÍTULOS / CONQUISTAS =====
    titles: [
        { id: 1, type: 'gold', competition: 'Jogos Ibero-Americanos', year: '2024', result: '🥇 Ouro' },
        { id: 2, type: 'silver', competition: 'Mundiais Universitários', year: '2023', result: '🥈 Prata' },
        { id: 3, type: 'bronze', competition: 'Taça da Europa', year: '2025', result: '🥉 Bronze' },
        { id: 4, type: 'olympic', competition: 'Jogos Olímpicos', year: '2024', result: '🏅 Semifinalista' },
        { id: 5, type: 'european', competition: 'Campeonato da Europa', year: '2025', result: '🏅 Top 10' },
        { id: 6, type: 'national', competition: 'Campeã Nacional', year: '2020-2025', result: '🏆 4× Títulos' }
    ],

    // ===== PROJETOS SOCIAIS =====
    socialprojects: [
        { id: 1, title: 'Atletismo sem Fronteiras', desc: 'Conectando comunidades através do desporto entre Lisboa e Fortaleza.', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop' },
        { id: 2, title: 'Clínicas de Formação', desc: 'Workshops para jovens atletas em escolas e clubes desportivos.', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop' },
        { id: 3, title: 'Inclusão pelo Desporto', desc: 'Programas para promover a igualdade e inclusão social através do atletismo.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' }
    ],

    // ===== PATROCINADORES =====
    sponsors: [
        { id: 1, name: 'Sporting CP', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Sporting_CP.svg' },
        { id: 2, name: 'Federação Portuguesa de Atletismo', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Logo_Federa%C3%A7%C3%A3o_Portuguesa_de_Atletismo.svg' }
    ],

    // ===== NOTÍCIAS =====
    news: [
        { id: 1, source: 'Record', headline: 'Eliana Bandeira: "O peso não é só força, é técnica"', date: '15 mar 2026' },
        { id: 2, source: 'Observador', headline: 'A atleta luso-brasileira que quer quebrar barreiras', date: '2 fev 2026' },
        { id: 3, source: 'RTP', headline: 'Eliana Bandeira no Top 10 europeu', date: '12 jan 2026' }
    ],

    // ===== REDES SOCIAIS =====
    social: [
        { id: 1, platform: 'Instagram', handle: '@elianabandeiraoly', followers: '145K', icon: 'instagram', url: 'https://www.instagram.com/elianabandeiraoly' },
        { id: 2, platform: 'YouTube', handle: 'Eliana Bandeira', followers: '35K', icon: 'youtube', url: 'https://www.youtube.com/@elianabandeiraoly' },
        { id: 3, platform: 'Facebook', handle: 'Eliana Bandeira', followers: '40K', icon: 'facebook-f', url: 'https://www.facebook.com/share/1GDMDSL9sp/' }
    ],

    // ===== CALENDÁRIO =====
    calendar: [
        { id: 1, month: 'Jan', day: 15, title: 'Provas de Inverno', location: 'Lisboa, Portugal · Finlândia', status: 'confirmed' },
        { id: 2, month: 'Fev', day: 8, title: 'Meeting Internacional', location: 'Paris, França · Braga, Portugal · Valência, Espanha', status: 'confirmed' },
        { id: 3, month: 'Mar', day: 20, title: 'Taça da Europa · Mundial Indoor', location: 'Competições Europeias', status: 'confirmed' },
        { id: 4, month: 'Mai', day: 12, title: 'Jogos Ibero-Americanos', location: 'Albufeira, Portugal', status: 'confirmed' },
        { id: 5, month: 'Jul', day: 25, title: 'Campeonato de Portugal', location: 'Maia, Portugal', status: 'confirmed' },
        { id: 6, month: 'Ago', day: 10, title: 'Campeonato da Europa · Jogos Mediterrâneo', location: 'Europa', status: 'pending' }
    ],

    // ===== PERFIL & IMAGENS =====
    profile: {
        id: 1,
        heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=900&fit=crop&crop=center',
        aboutImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=700&fit=crop&crop=center',
        waImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&crop=center',
        speakingImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop'
    },

    // ===== CORES =====
    colors: {
        id: 1,
        gold: '#D4AF37',
        goldDark: '#B8942A',
        blue: '#0A5EA8',
        white: '#FFFFFF',
        gray: '#F7F8FA'
    }
};

// ============================================================
// FUNÇÕES DE PERSISTÊNCIA
// ============================================================
function loadData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const raw = fs.readFileSync(DATA_FILE, 'utf8');
            const data = JSON.parse(raw);
            // Garantir que todas as coleções existem
            for (const key of Object.keys(defaultData)) {
                if (!data[key]) data[key] = defaultData[key];
            }
            return data;
        }
    } catch (error) {
        console.error('⚠️ Erro ao carregar dados:', error.message);
        // Se o JSON estiver corrompido, fazer backup e recriar
        if (fs.existsSync(DATA_FILE)) {
            const backupFile = DATA_FILE + '.backup-' + Date.now();
            try {
                fs.copyFileSync(DATA_FILE, backupFile);
                console.log(`📁 Backup criado: ${backupFile}`);
            } catch (e) {
                console.error('❌ Falha ao criar backup:', e.message);
            }
        }
    }
    return JSON.parse(JSON.stringify(defaultData));
}

function saveData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('⚠️ Erro ao guardar dados:', error.message);
        return false;
    }
}

// ============================================================
// INICIALIZAR BANCO DE DADOS
// ============================================================
let db = loadData();

// Verificar se está em ambiente Vercel (read-only filesystem)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

if (isVercel) {
    console.log('🌐 Rodando no Vercel - Usando dados em memória');
    // No Vercel, o filesystem é read-only, então os dados são salvos em memória
    // As alterações não persistem entre deploys
    // Para persistência, recomenda-se usar Vercel KV, MongoDB ou Supabase
} else {
    console.log('💻 Rodando localmente - Usando data.json para persistência');
}

// ============================================================
// LISTA DE COLEÇÕES VÁLIDAS
// ============================================================
const validCollections = [
    'photos', 'videos', 'timeline', 'stats', 'titles', 
    'socialprojects', 'sponsors', 'news', 'social', 
    'calendar', 'profile', 'colors'
];

// ============================================================
// FUNÇÃO PARA VERIFICAR COLEÇÃO
// ============================================================
function isValidCollection(collection) {
    return validCollections.includes(collection);
}

// ============================================================
// FUNÇÃO PARA VERIFICAR CHAVE API
// ============================================================
function verifyApiKey(req) {
    const key = req.headers['x-api-key'] || req.query.apiKey;
    return key === API_KEY;
}

// ============================================================
// ============================================================
// ENDPOINTS DA API
// ============================================================
// ============================================================

// ============================================================
// 1. ROTAS ESPECÍFICAS (devem vir ANTES da rota genérica)
// ============================================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'online', 
        version: '5.1-vercel', 
        uptime: Math.floor(process.uptime()),
        vercel: isVercel,
        timestamp: new Date().toISOString() 
    });
});

// ============================================================
// DASHBOARD STATS (rota específica!)
// Esta rota deve vir ANTES de /api/:collection
// ============================================================
app.get('/api/stats', (req, res) => {
    // Se for uma requisição do admin com API key, retorna contagens
    // Se for do frontend, retorna os dados da coleção stats
    const hasApiKey = verifyApiKey(req);
    
    if (hasApiKey) {
        // Admin: retorna contagens para o dashboard
        const stats = {
            photos: Array.isArray(db.photos) ? db.photos.length : 0,
            videos: Array.isArray(db.videos) ? db.videos.length : 0,
            timeline: Array.isArray(db.timeline) ? db.timeline.length : 0,
            stats: Array.isArray(db.stats) ? db.stats.length : 0,
            titles: Array.isArray(db.titles) ? db.titles.length : 0,
            socialprojects: Array.isArray(db.socialprojects) ? db.socialprojects.length : 0,
            sponsors: Array.isArray(db.sponsors) ? db.sponsors.length : 0,
            news: Array.isArray(db.news) ? db.news.length : 0,
            social: Array.isArray(db.social) ? db.social.length : 0,
            calendar: Array.isArray(db.calendar) ? db.calendar.length : 0
        };
        return res.json(stats);
    }
    
    // Frontend: retorna a coleção stats (dados de performance)
    if (db.stats) {
        return res.json(db.stats);
    }
    
    res.status(404).json({ error: 'Estatísticas não encontradas' });
});

// ============================================================
// EXPORTAR TODOS OS DADOS (BACKUP)
// ============================================================
app.get('/api/export', (req, res) => {
    if (!verifyApiKey(req)) {
        return res.status(401).json({ error: 'Chave API inválida' });
    }
    res.json(db);
});

// ============================================================
// IMPORTAR DADOS (RESTAURAR BACKUP)
// ============================================================
app.post('/api/import', (req, res) => {
    if (!verifyApiKey(req)) {
        return res.status(401).json({ error: 'Chave API inválida' });
    }
    
    const data = req.body;
    if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Dados inválidos' });
    }
    
    try {
        // Validar que tem as coleções principais
        const hasCollections = validCollections.some(col => data[col]);
        if (!hasCollections) {
            return res.status(400).json({ error: 'Nenhuma coleção válida encontrada' });
        }
        
        // Mesclar com dados existentes
        for (const col of validCollections) {
            if (data[col]) {
                if (Array.isArray(data[col])) {
                    db[col] = data[col];
                } else if (typeof data[col] === 'object' && data[col] !== null) {
                    db[col] = { ...db[col], ...data[col] };
                }
            }
        }
        
        if (saveData(db)) {
            res.json({ success: true, message: 'Dados importados com sucesso' });
        } else {
            res.status(500).json({ error: 'Erro ao guardar dados' });
        }
    } catch (err) {
        console.error('Erro ao importar:', err);
        res.status(500).json({ error: 'Erro ao importar dados: ' + err.message });
    }
});

// ============================================================
// TIMELINE ORDENADA
// ============================================================
app.get('/api/timeline/ordered', (req, res) => {
    const sorted = [...(db.timeline || [])].sort((a, b) => parseInt(a.year) - parseInt(b.year));
    res.json(sorted);
});

// ============================================================
// FOTOS POR CATEGORIA
// ============================================================
app.get('/api/photos/category/:category', (req, res) => {
    const { category } = req.params;
    const filtered = (db.photos || []).filter(p => p.category === category);
    res.json(filtered);
});

// ============================================================
// 2. ROTA GENÉRICA (deve vir DEPOIS das rotas específicas)
// ============================================================

// Obter coleção
app.get('/api/:collection', (req, res) => {
    const { collection } = req.params;
    
    // Tratamento especial para profile
    if (collection === 'profile') {
        if (!db.profile) {
            db.profile = defaultData.profile;
            if (!isVercel) saveData(db);
        }
        return res.json(db.profile);
    }
    
    // Tratamento especial para colors
    if (collection === 'colors') {
        if (!db.colors) {
            db.colors = defaultData.colors;
            if (!isVercel) saveData(db);
        }
        return res.json(db.colors);
    }
    
    if (!isValidCollection(collection)) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    if (!db[collection]) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    res.json(db[collection]);
});

// Obter item por ID
app.get('/api/:collection/:id', (req, res) => {
    const { collection, id } = req.params;
    
    if (!isValidCollection(collection)) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    if (!db[collection]) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    const item = db[collection].find(i => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json(item);
});

// ============================================================
// CRIAR ITEM
// ============================================================
app.post('/api/:collection', (req, res) => {
    if (!verifyApiKey(req)) {
        return res.status(401).json({ error: 'Chave API inválida' });
    }
    
    const { collection } = req.params;
    
    // Tratamento especial para profile
    if (collection === 'profile') {
        if (db.profile) {
            return res.status(400).json({ error: 'Perfil já existe. Use PUT para atualizar.' });
        }
        const newProfile = { id: 1, ...req.body };
        db.profile = newProfile;
        if (saveData(db)) {
            return res.status(201).json(newProfile);
        }
        return res.status(500).json({ error: 'Erro ao guardar perfil' });
    }
    
    // Tratamento especial para colors
    if (collection === 'colors') {
        if (db.colors) {
            return res.status(400).json({ error: 'Cores já existem. Use PUT para atualizar.' });
        }
        const newColors = { id: 1, ...req.body };
        db.colors = newColors;
        if (saveData(db)) {
            return res.status(201).json(newColors);
        }
        return res.status(500).json({ error: 'Erro ao guardar cores' });
    }
    
    if (!isValidCollection(collection)) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    if (!db[collection]) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    
    const maxId = db[collection].reduce((max, i) => Math.max(max, i.id || 0), 0);
    const newItem = { 
        id: maxId + 1, 
        ...req.body
    };
    db[collection].push(newItem);
    if (saveData(db)) {
        res.status(201).json(newItem);
    } else {
        res.status(500).json({ error: 'Erro ao guardar dados' });
    }
});

// ============================================================
// ATUALIZAR ITEM
// ============================================================
app.put('/api/:collection/:id', (req, res) => {
    if (!verifyApiKey(req)) {
        return res.status(401).json({ error: 'Chave API inválida' });
    }
    
    const { collection, id } = req.params;
    
    // Tratamento especial para profile
    if (collection === 'profile') {
        if (!db.profile) {
            db.profile = { id: 1 };
        }
        db.profile = { ...db.profile, ...req.body, id: 1 };
        if (saveData(db)) {
            return res.json(db.profile);
        }
        return res.status(500).json({ error: 'Erro ao guardar perfil' });
    }
    
    // Tratamento especial para colors
    if (collection === 'colors') {
        if (!db.colors) {
            db.colors = { id: 1 };
        }
        db.colors = { ...db.colors, ...req.body, id: 1 };
        if (saveData(db)) {
            return res.json(db.colors);
        }
        return res.status(500).json({ error: 'Erro ao guardar cores' });
    }
    
    if (!isValidCollection(collection)) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    if (!db[collection]) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    
    const index = db[collection].findIndex(i => i.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }
    
    db[collection][index] = { 
        ...db[collection][index], 
        ...req.body, 
        id: parseInt(id)
    };
    if (saveData(db)) {
        res.json(db[collection][index]);
    } else {
        res.status(500).json({ error: 'Erro ao guardar dados' });
    }
});

// ============================================================
// ELIMINAR ITEM
// ============================================================
app.delete('/api/:collection/:id', (req, res) => {
    if (!verifyApiKey(req)) {
        return res.status(401).json({ error: 'Chave API inválida' });
    }
    
    const { collection, id } = req.params;
    
    // Não permitir eliminar profile ou colors
    if (collection === 'profile' || collection === 'colors') {
        return res.status(400).json({ error: 'Não é possível eliminar esta coleção' });
    }
    
    if (!isValidCollection(collection)) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    if (!db[collection]) {
        return res.status(404).json({ error: 'Coleção não encontrada' });
    }
    
    const index = db[collection].findIndex(i => i.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }
    
    db[collection].splice(index, 1);
    if (saveData(db)) {
        res.json({ success: true, id: parseInt(id) });
    } else {
        res.status(500).json({ error: 'Erro ao guardar dados' });
    }
});

// ============================================================
// ROTAS PARA O ADMIN E SITE
// ============================================================

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('index.html não encontrado');
    }
});

app.get('/admin', (req, res) => {
    const filePath = path.join(__dirname, 'admin.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('admin.html não encontrado');
    }
});

app.get('/admin.html', (req, res) => {
    const filePath = path.join(__dirname, 'admin.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('admin.html não encontrado');
    }
});

app.get('/index.html', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('index.html não encontrado');
    }
});

// ============================================================
// FALLBACK (404)
// ============================================================
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// ============================================================
// EXPORTAR PARA USO EM VERCEL (NECESSÁRIO)
// ============================================================
module.exports = app;

// ============================================================
// INICIAR SERVIDOR (APENAS SE NÃO ESTIVER NO VERCEL)
// ============================================================
// O Vercel usa o módulo exportado, não o app.listen()
// Esta verificação evita que o servidor tente escutar duas vezes
if (require.main === module) {
    app.listen(PORT, () => {
        console.log('\n╔═══════════════════════════════════════════════════════╗');
        console.log('║  🏋️‍♀️  ELIANA BANDEIRA — Servidor Online              ║');
        console.log('╠═══════════════════════════════════════════════════════╣');
        console.log(`║  🌐  Site:     http://localhost:${PORT}                ║`);
        console.log(`║  🔐  Admin:    http://localhost:${PORT}/admin          ║`);
        console.log(`║  📁  Dados:    ${DATA_FILE}        ║`);
        console.log('╠═══════════════════════════════════════════════════════╣');
        console.log(`║  📸  Fotos:     ${String(db.photos?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  🎬  Vídeos:    ${String(db.videos?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  📅  Eventos:   ${String(db.timeline?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  📊  Stats:     ${String(db.stats?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  🏆  Títulos:   ${String(db.titles?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  ❤️  Projetos:  ${String(db.socialprojects?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  🤝  Parceiros: ${String(db.sponsors?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  📰  Notícias:  ${String(db.news?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  📱  Redes:     ${String(db.social?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  📆  Calendário: ${String(db.calendar?.length || 0).padStart(2, '0')}                                    ║`);
        console.log(`║  🖼️  Perfil:    Imagens carregadas                     ║`);
        console.log(`║  🎨  Cores:     Paleta carregada                       ║`);
        console.log('╠═══════════════════════════════════════════════════════╣');
        console.log(`║  🔑  API Key:   ${API_KEY}        ║`);
        console.log(`║  📦  Versão:    5.1-vercel                            ║`);
        console.log(`║  🌐  Ambiente:  ${isVercel ? 'Vercel' : 'Local'}                                   ║`);
        console.log('╚═══════════════════════════════════════════════════════╝\n');
        console.log('✅ Servidor pronto!');
        console.log(`🔗 API: http://localhost:${PORT}/api/health`);
        console.log(`📝 Admin: utilizador "admin" | senha "eliana"\n`);
    });
}