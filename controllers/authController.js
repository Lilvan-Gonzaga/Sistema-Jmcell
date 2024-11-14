import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Aqui você vai importar o modelo User

// Função para cadastrar um novo usuário
export const cadastrarUsuario = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar se o usuário já existe
        const usuarioExistente = await User.findOne({ username });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Nome de usuário já existe!' });
        }

        // Hash da senha (criptografando)
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(password, salt);

        // Criar um novo usuário
        const novoUsuario = new User({
            username,
            email,
            password: senhaHash,
        });

        // Salvar o novo usuário no banco de dados
        await novoUsuario.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
    }
};

// Função para autenticar um usuário (login)
export const autenticarUsuario = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar se o usuário existe
        const usuario = await User.findOne({ username });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Verificar se a senha é válida
        const senhaValida = await bcrypt.compare(password, usuario.password);
        if (!senhaValida) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        // Gerar um token de autenticação (JWT)
        const token = jwt.sign({ id: usuario._id, username: usuario.username }, 'secreta', { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao autenticar usuário.' });
    }
};
