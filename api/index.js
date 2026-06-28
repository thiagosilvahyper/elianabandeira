// ============================================================
// API INDEX — PONTO DE ENTRADA PARA VERCEL
// ============================================================

const path = require('path');

// process.cwd() força o Node a buscar o server.js a partir da raiz real do projeto,
// impedindo o erro MODULE_NOT_FOUND dentro do ambiente da Vercel.
const server = require(path.join(process.cwd(), 'server.js'));

// Exportar para o Vercel
module.exports = server;