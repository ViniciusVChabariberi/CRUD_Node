// Importa o módulo de conexão com o banco de dados (banco.js),
// que contém a configuração e a instância do Sequelize.
const db = require('./banco')

// Define um novo model (tabela) chamado "agendamentos" usando o Sequelize.
// Cada campo abaixo representa uma coluna da tabela com seu respectivo tipo.
const Agendamentos = db.sequelize.define('agendamentos', {
    nome: {
        type: db.Sequelize.STRING  // Armazena texto curto (VARCHAR)
    },
    telefone: {
        type: db.Sequelize.STRING  // Armazena o telefone como string
    },
    origem: {
        type: db.Sequelize.STRING  // Ex: WhatsApp, Celular, Email, etc.
    },
    data_contato: {
        type: db.Sequelize.DATEONLY  // Armazena apenas a data (sem hora)
    },
    observacao: {
        type: db.Sequelize.TEXT  // Armazena texto mais longo
    },
})

// Essa linha, se descomentada, força a recriação da tabela toda vez que o código roda.
// Útil em desenvolvimento, mas perigoso em produção pois apaga os dados existentes.
// Agendamentos.sync({force: true})

// Exporta o model "Agendamentos" para ser utilizado em outras partes da aplicação.
module.exports = Agendamentos

// Este bloco, se descomentado, cria um novo registro na tabela "agendamentos".
// Pode ser usado para testes ou inserções manuais de dados.
// Agendamentos.create({
//     nome: 'Vinicius Valero',
//     telefone: '98947-4273',
//     origem:'Celular',
//     data_contato:'2025-02-27',
//     observacao:'gerson'
// })
