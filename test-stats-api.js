/**
 * test-stats-api.js - Testa todos os endpoints da API de estatísticas
 * Uso: node test-stats-api.js
 */

const API_KEY = 'imperare2024';
const BASE_URL = 'http://localhost:3000';

async function testStatsApi() {
    console.log('🧪 A testar API de estatísticas...');
    console.log('📡 Servidor:', BASE_URL);
    
    try {
        // 1. Verificar saúde do servidor
        console.log('\n1️⃣ Verificando saúde do servidor...');
        const health = await fetch(`${BASE_URL}/api/health`);
        console.log(`   Status: ${health.status} ${health.statusText}`);
        if (health.ok) {
            const data = await health.json();
            console.log(`   Versão: ${data.version}, Vercel: ${data.vercel}`);
        }
        
        // 2. Obter estatísticas (público)
        console.log('\n2️⃣ Obtendo estatísticas (público)...');
        const statsRes = await fetch(`${BASE_URL}/api/stats`);
        console.log(`   Status: ${statsRes.status} ${statsRes.statusText}`);
        if (statsRes.ok) {
            const stats = await statsRes.json();
            console.log(`   Total: ${stats.length || 0} estatísticas`);
            if (stats.length > 0) {
                console.log('   Primeira estatística:', stats[0]);
            } else {
                console.log('   ⚠️ Nenhuma estatística encontrada!');
            }
        }
        
        // 3. Obter estatísticas com API Key
        console.log('\n3️⃣ Obtendo estatísticas com API Key...');
        const authRes = await fetch(`${BASE_URL}/api/stats`, {
            headers: { 'X-API-Key': API_KEY }
        });
        console.log(`   Status: ${authRes.status} ${authRes.statusText}`);
        if (authRes.ok) {
            const stats = await authRes.json();
            console.log(`   Total: ${stats.length || 0} estatísticas`);
        }
        
        // 4. Verificar dados no ficheiro data.json
        console.log('\n4️⃣ Verificando dados locais...');
        const fs = require('fs');
        const path = require('path');
        const dataFile = path.join(process.cwd(), 'data.json');
        if (fs.existsSync(dataFile)) {
            const raw = fs.readFileSync(dataFile, 'utf8');
            const data = JSON.parse(raw);
            console.log(`   Estatísticas no ficheiro: ${data.stats ? data.stats.length : 0}`);
            if (data.stats && data.stats.length > 0) {
                console.log('   Primeira estatística no ficheiro:', data.stats[0]);
            }
        } else {
            console.log('   ⚠️ Ficheiro data.json não encontrado');
        }
        
        console.log('\n✅ Testes concluídos!');
        
    } catch (error) {
        console.error('❌ Erro nos testes:', error.message);
        console.log('💡 Certifique-se de que o servidor está a correr (npm start)');
    }
}

testStatsApi();