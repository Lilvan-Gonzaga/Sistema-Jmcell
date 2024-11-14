import express from 'express';
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';  // Importando as rotas de autenticação
import produtoRoutes from './routes/produtos.js';  // Rotas de produtos
import transacaoRoutes from './routes/transacoes.js';  // Rotas de transações financeiras

const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos (CSS, JS, Imagens) da pasta assets
app.use('/assets', express.static('assets'));

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Conectando ao MongoDB
connectDB();

// Usando as rotas
app.use('/auth', authRoutes);  // Rotas para login e cadastro
app.use('/produtos', produtoRoutes);  // Rotas para produtos
app.use('/transacoes', transacaoRoutes);  // Rotas para transações financeiras

// Rota para servir o login
app.get('/login', (req, res) => {
    res.sendFile('views/login.html', { root: '.' });  // Rota simplificada
});

// Rota para servir o cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile('views/cadastro.html', { root: '.' });  // Rota simplificada
});

// Rota para servir a home
app.get('/home', (req, res) => {
    res.sendFile('views/home.html', { root: '.' });  // Rota simplificada
});

// Rota para estoque
app.get('/estoque', (req, res) => {
    res.sendFile('views/estoque.html', { root: '.' });  // Rota simplificada
});

// Rota para financeiro
app.get('/financeiro', (req, res) => {
    res.sendFile('views/financeiro.html', { root: '.' });  // Rota simplificada
});

// Rota de teste
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
