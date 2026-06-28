<<<<<<< HEAD
// ============================================================
// API INDEX — PONTO DE ENTRADA PARA VERCEL
// ============================================================

const path = require('path');

// process.cwd() força o Node a buscar o server.js a partir da raiz real do projeto,
// impedindo o erro MODULE_NOT_FOUND dentro do ambiente da Vercel.
const server = require(path.join(process.cwd(), 'server.js'));

// Exportar para o Vercel
=======
// ============================================================
// API INDEX — PONTO DE ENTRADA PARA VERCEL
// ============================================================

const path = require('path');

// process.cwd() força o Node a buscar o server.js a partir da raiz real do projeto,
// impedindo o erro MODULE_NOT_FOUND dentro do ambiente da Vercel.
const server = require(path.join(process.cwd(), 'server.js'));

// Exportar para o Vercel
>>>>>>> 466756eb2dc54d01a6c4136f8550bfe66d6a07e2
module.exports = server;