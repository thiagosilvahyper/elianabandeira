/**
 * Inicializa as estatísticas padrão
 * Correr no terminal: node init-stats.js
 */

const API_KEY = 'imperare2024';
const BASE_URL = 'http://localhost:3000';

const defaultStats = [
    { value: '18.95m', label: 'Recorde Nacional', sub: 'Lançamento do Peso' },
    { value: '6', label: 'Medalhas Internacionais', sub: 'Ouro · Prata · Bronze' },
    { value: '4', label: 'Títulos Nacionais', sub: 'Campeã de Portugal' },
    { value: 'Top 15', label: 'Ranking Mundial', sub: 'World Athletics' },
    { value: '12', label: 'Países Visitados', sub: 'Competições Internacionais' },
    { value: '1.2M', label: 'Alcance Social', sub: 'Milhões de seguidores' }
];

async function initStats() {
    try {
        // Primeiro, verificar se já existem estatísticas
        const response = await fetch(`${BASE_URL}/api/stats`, {
            headers: { 'X-API-Key': API_KEY }
        });
        
        if (!response.ok) {
            console.error('Erro ao verificar estatísticas:', response.status);
            return;
        }
        
        const existingStats = await response.json();
        
        // Se já existir pelo menos uma estatística, não adicionar novamente
        if (existingStats && existingStats.length > 0) {
            console.log(`✅ Já existem ${existingStats.length} estatísticas. Não é necessário inicializar.`);
            console.log('📊 Estatísticas existentes:', existingStats);
            return;
        }
        
        console.log('📊 A adicionar estatísticas padrão...');
        
        // Adicionar cada estatística
        for (const stat of defaultStats) {
            const addResponse = await fetch(`${BASE_URL}/api/stats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY
                },
                body: JSON.stringify(stat)
            });
            
            if (addResponse.ok) {
                console.log(`✅ Adicionado: ${stat.value} - ${stat.label}`);
            } else {
                console.error(`❌ Erro ao adicionar: ${stat.value} - ${stat.label}`, await addResponse.text());
            }
        }
        
        console.log('✅ Inicialização de estatísticas concluída!');
        
        // Verificar novamente
        const verifyResponse = await fetch(`${BASE_URL}/api/stats`, {
            headers: { 'X-API-Key': API_KEY }
        });
        const finalStats = await verifyResponse.json();
        console.log('📊 Total de estatísticas após inicialização:', finalStats.length);
        
    } catch (error) {
        console.error('❌ Erro ao inicializar estatísticas:', error.message);
    }
}

initStats();