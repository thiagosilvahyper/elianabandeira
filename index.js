// ============================================================
// API INDEX — PONTO DE ENTRADA PARA VERCEL
// ============================================================

const path = require('path');

// process.cwd() garante que o Node busque a partir da raiz do projeto,
// evitando o erro de módulo não encontrado (MODULE_NOT_FOUND) no Vercel.
const server = require(path.join(process.cwd(), 'server.js'));

// Exporta o servidor para o ambiente Serverless do Vercel
module.exports = server;