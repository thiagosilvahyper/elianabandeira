/**
 * check-stats.js - Verifica o estado das estatísticas na API
 * Uso: node check-stats.js
 */

const API_KEY = 'imperare2024';
const BASE_URL = 'http://localhost:3000';

async function checkStats() {
    try {
        console.log('🔍 A verificar estatísticas...');
        console.log('📡 A fazer requisição para:', `${BASE_URL}/api/stats`);
        
        const response = await fetch(`${BASE_URL}/api/stats`, {
            headers: { 'X-API-Key': API_KEY }
        });
        
        if (!response.ok) {
            console.error('❌ Erro ao obter estatísticas:', response.status);
            try {
                const text = await response.text();
                console.log('📄 Resposta:', text);
            } catch (e) {
                console.log('Não foi possível ler a resposta');
            }
            return;
        }
        
        const stats = await response.json();
        console.log(`📊 Estatísticas encontradas: ${stats.length || '?'}`);
        console.log('📋 Dados:', JSON.stringify(stats, null, 2));
        
        // Verificar se os dados estão no formato correto
        if (stats && stats.length === 0) {
            console.log('⚠️ Nenhuma estatística encontrada.');
            console.log('💡 Execute node init-stats.js para inicializar as estatísticas padrão.');
        } else if (stats && stats.length > 0) {
            console.log('✅ Dados corretos!');
            console.log('📌 Total de estatísticas:', stats.length);
        } else {
            console.log('⚠️ Resposta inesperada:', stats);
        }
        
    } catch (error) {
        console.error('❌ Erro ao verificar estatísticas:', error.message);
        console.log('💡 Certifique-se de que o servidor está a correr (npm start)');
    }
}

checkStats();