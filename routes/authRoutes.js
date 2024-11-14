// routes/authRoutes.js
import express from 'express';
import User from '../models/User.js'; // Importando o modelo de usuário
import jwt from 'jsonwebtoken';

const router = express.Router();

// Rota para cadastro
router.post('/cadastro', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor, forneça um nome de usuário e uma senha.' });
  }

  // Verificar se o usuário já existe
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe!' });
  }

  // Criar um novo usuário
  const user = new User({
    username,
    password
  });

  try {
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar o usuário!' });
  }
});

// Rota para login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor, forneça o nome de usuário e a senha.' });
  }

  // Verificar se o usuário existe
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado.' });
  }

  // Verificar se a senha é válida
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Senha inválida.' });
  }

  // Gerar um token JWT
  const token = jwt.sign({ id: user._id }, 'secretrandomkey', {
    expiresIn: '1h' // O token vai expirar em 1 hora
  });

  res.json({ message: 'Login bem-sucedido', token });
});

export default router;
