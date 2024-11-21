import dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './db.js';
import authRoutes from './routes/authRoutes.js';
import estoqueRoutes from './routes/estoqueRoutes.js';
import path from 'path';


dotenv.config({ path: './config/.env' }); // Carrega as variáveis de ambiente

const app = express();

// Configuração para processar requisições JSON
app.use(express.json());

// Conectar ao banco de dados MongoDB
connectToDatabase();

// Ajuste para funcionar com ES Modules e obter o __dirname corretamente
const __dirname = path.resolve();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota de autenticação
app.use('/auth', authRoutes);

// Rota para login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para cadastro
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Rota de home
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Rota de estoque
app.get('/estoque', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'estoque.html'));
});

// Rota de estoque (API)
app.use('/api/estoque', estoqueRoutes);

// Rota pública de boas-vindas
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem-vindo à API JMCELL!' });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
