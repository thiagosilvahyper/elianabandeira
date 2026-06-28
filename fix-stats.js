/**
 * fix-stats.js - Remove entradas duplicadas e corrige as estatísticas
 * Uso: node fix-stats.js
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data.json');

console.log('🔧 A corrigir estatísticas...');

try {
    // Ler o ficheiro
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    
    console.log(`📊 Estatísticas atuais: ${data.stats ? data.stats.length : 0}`);
    
    // Estatísticas corretas (apenas 3 primeiras, sem duplicados)
    const correctStats = [
        { id: 1, value: '18.95m', label: 'Recorde Nacional', sub: 'Lançamento do Peso' },
        { id: 2, value: '6', label: 'Medalhas Internacionais', sub: 'Ouro · Prata · Bronze' },
        { id: 3, value: '4', label: 'Títulos Nacionais', sub: 'Campeã de Portugal' }
    ];
    
    // Substituir as estatísticas
    data.stats = correctStats;
    
    // Guardar
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    console.log('✅ Estatísticas corrigidas!');
    console.log(`📊 Nova contagem: ${data.stats.length}`);
    console.log('📋 Dados:', JSON.stringify(data.stats, null, 2));
    
} catch (error) {
    console.error('❌ Erro:', error.message);
}