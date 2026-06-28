const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
let firebaseApp;

try {
  // Para produção (Vercel) - usar variáveis de ambiente
  if (process.env.FIREBASE_PRIVATE_KEY) {
    const serviceAccount = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID || '',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
    };
    
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  } else {
    // Fallback para desenvolvimento local sem Firebase
    console.warn('⚠️ Firebase não configurado, usando dados mock');
  }
} catch (error) {
  console.error('Erro ao inicializar Firebase:', error);
}

const db = firebaseApp ? admin.firestore() : null;

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
//  MIDDLEWARE DE VALIDAÇÃO
// ============================================================
const validateCollection = (req, res, next) => {
  const validCollections = ['photos', 'videos', 'timeline', 'stats', 'sponsors', 'news', 'social', 'profile'];
  const { collection } = req.params;
  
  if (!validCollections.includes(collection)) {
    return res.status(400).json({ error: 'Coleção inválida' });
  }
  next();
};

// ============================================================
//  DADOS MOCK (fallback quando Firebase não está configurado)
// ============================================================
const mockData = {
  photos: [
    { id: '1', title: 'Treino explosivo', category: 'treinos', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=500&fit=crop' },
    { id: '2', title: 'Competição internacional', category: 'competicoes', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop' },
    { id: '3', title: 'Pódio', category: 'competicoes', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop' },
    { id: '4', title: 'Bastidores', category: 'bastidores', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=500&fit=crop' }
  ],
  videos: [
    { id: '1', title: 'Lançamento 19.08m', embed: 'Tv7P9H3QpKk', thumbnail: 'https://img.youtube.com/vi/Tv7P9H3QpKk/hqdefault.jpg' },
    { id: '2', title: 'Entrevista exclusiva', embed: '1Lk6P_v4eCg', thumbnail: 'https://img.youtube.com/vi/1Lk6P_v4eCg/hqdefault.jpg' }
  ],
  timeline: [
    { id: '1', year: '1996', title: 'Nascimento', desc: 'Nasce em Jaguaribara, Ceará, Brasil' },
    { id: '2', year: '2014', title: 'Chegada a Portugal', desc: 'Muda-se para Leiria para iniciar a carreira' },
    { id: '3', year: '2023', title: 'Prata Mundial Universitária', desc: 'Conquista a medalha de prata' },
    { id: '4', year: '2024', title: 'Jogos Olímpicos Paris', desc: 'Semifinalista Olímpica · Top 15 mundial' }
  ],
  stats: [
    { id: '1', value: '19.28m', label: 'Recorde Nacional' },
    { id: '2', value: '4', label: 'Títulos Nacionais' },
    { id: '3', value: '35+', label: 'Competições Internacionais' },
    { id: '4', value: 'Top 15', label: 'Ranking Mundial' },
    { id: '5', value: '12', label: 'Países Visitados' },
    { id: '6', value: '1.2M', label: 'Alcance Social' }
  ],
  sponsors: [
    { id: '1', name: 'Sporting CP', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Sporting_CP.svg' },
    { id: '2', name: 'Federação Portuguesa de Atletismo', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Logo_Federa%C3%A7%C3%A3o_Portuguesa_de_Atletismo.svg' }
  ],
  news: [
    { id: '1', source: 'Record', headline: 'Eliana Bandeira: "O peso não é só força, é técnica"', date: '15 mar 2026' },
    { id: '2', source: 'Observador', headline: 'A atleta luso-brasileira que quer quebrar barreiras', date: '2 fev 2026' }
  ],
  social: [
    { id: '1', platform: 'Instagram', handle: '@elianabandeira', followers: '145K' },
    { id: '2', platform: 'YouTube', handle: 'Eliana Bandeira', followers: '35K' }
  ],
  profile: {
    id: '1',
    bio: 'Atleta olímpica luso-brasileira de Lançamento do Peso',
    record: '19.28m',
    club: 'Sporting CP'
  }
};

// Helper para buscar dados (Firebase ou mock)
async function getData(collection) {
  if (db) {
    try {
      const snapshot = await db.collection(collection).get();
      if (snapshot.empty) return mockData[collection] || [];
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Erro ao buscar ${collection}:`, error);
      return mockData[collection] || [];
    }
  }
  return mockData[collection] || [];
}

// Helper para salvar dados (Firebase)
async function saveData(collection, data, id = null) {
  if (!db) {
    // Modo mock - apenas simula
    return { id: id || `mock_${Date.now()}`, ...data };
  }
  
  try {
    if (id) {
      await db.collection(collection).doc(id).update(data);
      return { id, ...data };
    } else {
      const docRef = await db.collection(collection).add(data);
      return { id: docRef.id, ...data };
    }
  } catch (error) {
    console.error(`Erro ao salvar em ${collection}:`, error);
    throw error;
  }
}

// ============================================================
//  ENDPOINTS DA API
// ============================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    firebase: db ? 'conectado' : 'mock',
    environment: process.env.NODE_ENV || 'development'
  });
});

// GET: Listar todos os itens de uma coleção
app.get('/api/:collection', validateCollection, async (req, res) => {
  try {
    const { collection } = req.params;
    const data = await getData(collection);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Buscar item por ID
app.get('/api/:collection/:id', validateCollection, async (req, res) => {
  try {
    const { collection, id } = req.params;
    const data = await getData(collection);
    const item = data.find(d => d.id === id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Criar novo item
app.post('/api/:collection', validateCollection, async (req, res) => {
  try {
    const { collection } = req.params;
    const data = {
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const result = await saveData(collection, data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Atualizar item
app.put('/api/:collection/:id', validateCollection, async (req, res) => {
  try {
    const { collection, id } = req.params;
    const data = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    const result = await saveData(collection, data, id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Eliminar item
app.delete('/api/:collection/:id', validateCollection, async (req, res) => {
  try {
    const { collection, id } = req.params;
    
    if (db) {
      await db.collection(collection).doc(id).delete();
    }
    // Em modo mock, apenas simula a eliminação
    
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const collections = ['photos', 'videos', 'news', 'sponsors', 'timeline', 'stats'];
    const results = {};
    
    for (const col of collections) {
      const data = await getData(col);
      results[col] = data.length;
    }
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Timeline ordenada
app.get('/api/timeline/ordered', async (req, res) => {
  try {
    const data = await getData('timeline');
    const sorted = data.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fotos por categoria
app.get('/api/photos/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const photos = await getData('photos');
    const filtered = photos.filter(p => p.category === category);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
//  EXPORT PARA VERCEL
// ============================================================
module.exports = app;