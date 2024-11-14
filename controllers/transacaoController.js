import Transacao from '../models/Transacao.js';

// Listar todas as transações
export const listarTransacoes = async (req, res) => {
  try {
    const transacoes = await Transacao.find();
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
};

// Criar uma nova transação
export const criarTransacao = async (req, res) => {
  const { type, amount, description } = req.body;
  const novaTransacao = new Transacao({ type, amount, description });

  try {
    await novaTransacao.save();
    res.status(201).json(novaTransacao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};
