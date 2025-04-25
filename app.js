// Importa o framework Express, usado para criar o servidor web
const express = require('express')

// Inicializa a aplicação Express
const app = express()

// Importa o mecanismo de template Handlebars
const handlebars = require('express-handlebars').engine

// Importa o body-parser para tratar dados enviados via formulários
const bodyParser = require('body-parser')

// Importa o model "post" (representando os agendamentos no banco de dados)
const post = require('./models/post')

// Configura o Handlebars como mecanismo de visualização (template engine)
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Configura o body-parser para interpretar dados de formulários HTML
app.use(bodyParser.urlencoded({ extended: false })) // Formulários simples
app.use(bodyParser.json()) // JSON no corpo das requisições

// Rota principal, renderiza a página inicial (pagina.handlebars)
app.get("/", function (req, res) {
    res.render("pagina")
})

// Rota para consultar todos os registros no banco de dados
// e renderizar a view 'consulta.handlebars' com os dados
app.get("/consulta", function (req, res) {
    post.findAll().then(function (posts) {
        res.render("consulta", { posts: posts }) // Passa os dados para o template
        console.log(posts) // Log dos dados no terminal
    }).catch(function (erro) {
        res.send("Erro ao listar os posts: " + erro)
    })
})

// Rota para carregar a página de atualização com o ID do item
app.get("/atualizar/:id", function (req, res) {
    const id = req.params.id
    res.render('atualizar', { id }) // Envia o ID para a view atualizar.handlebars
})

// Rota para carregar a página de exclusão com o ID do item
app.get("/deletar/:id", function (req, res) {
    const id = req.params.id
    res.render('deletar', { id }) // Envia o ID para a view deletar.handlebars
})

// Rota POST para cadastrar um novo agendamento no banco
app.post('/cadastrar', function (req, res) {
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function () {
        res.redirect("/consulta") // Redireciona para listagem após sucesso
    }).catch(function (erro) {
        res.send('Erro ao criar o post: ' + erro)
    })
})

// Rota POST para atualizar um agendamento existente
app.post('/atualizar/:id', function (req, res) {
    const id = req.params.id
    const { nome, telefone, origem, data_contato, observacao } = req.body

    post.update(
        { nome, telefone, origem, data_contato, observacao },
        { where: { id } } // Atualiza onde o ID for igual
    ).then(function () {
        res.redirect("/consulta")
    }).catch(function (erro) {
        res.send('Erro ao atualizar o post: ' + erro)
    })
})

// Rota POST para deletar um agendamento
app.post('/deletar/:id', function (req, res) {
    const id = req.params.id
    post.destroy({ where: { id } }).then(function () {
        res.redirect("/consulta")
    }).catch(function (erro) {
        res.send('Erro ao deletar o post: ' + erro)
    })
})

// Inicia o servidor na porta 8081
app.listen(8081, function () {
    console.log("Servidor Ativo!")
})
