import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Função para registrar um novo usuário
export const registerUser = async (req, res) => {
  const { name, password, confirmpassword } = req.body;

  // Validações
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' });
  }
  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' });
  }
  if (password !== confirmpassword) {
    return res.status(422).json({ msg: 'As senhas não coincidem!' });
  }

  // Verifica se o usuário já existe
  const userExists = await User.findOne({ name });
  if (userExists) {
    return res.status(422).json({ msg: 'Nome de usuário já existe!' });
  }

  // Criptografando a senha
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = new User({ name, password: passwordHash });
    await user.save();
    return res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (err) {
    return res.status(500).json({ msg: 'Erro ao criar usuário', error: err });
  }
};

// Função para realizar o login (sem token)
export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  // Validações
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' });
  }
  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' });
  }

  // Verifica se o usuário existe
  const user = await User.findOne({ name });
  if (!user) {
    return res.status(404).json({ msg: 'Nome de usuário não encontrado!' });
  }

  // Verifica se a senha está correta
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(422).json({ msg: 'Senha inválida!' });
  }

  // Resposta sem token
  return res.status(200).json({
    msg: 'Login feito com sucesso!'
  });
};
