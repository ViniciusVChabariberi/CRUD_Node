// Importa a biblioteca Sequelize, que é um ORM (Object-Relational Mapping)
// usado para interagir com bancos de dados relacionais como o MySQL.
const Sequelize = require('sequelize')

// Cria uma instância do Sequelize com os parâmetros de conexão:
// - nome do banco de dados: 'banquinho'
// - usuário: 'root'
// - senha: ''
// - configurações adicionais, como host e dialecto do banco (neste caso, MySQL)
const sequelize = new Sequelize('banquinho', 'root','', {
    host: 'localhost',   // Endereço do servidor do banco de dados
    dialect: 'mysql'     // Tipo de banco de dados utilizado
})

// Exporta o Sequelize e a instância de conexão (sequelize) para que
// possam ser usados em outros arquivos do projeto.
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

// Tenta autenticar a conexão com o banco de dados.
// Se a conexão for bem-sucedida, exibe uma mensagem no console.
// Caso contrário, exibe uma mensagem de erro.
sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso')
}).catch(function(erro){
    console.log('Falha ao conectar: ' + erro) // Corrigido para melhor leitura
})
