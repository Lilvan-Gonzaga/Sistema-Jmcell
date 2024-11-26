// controllers/financeiroController.js

import Transacao from '../models/Financeiro.js';

// Adicionar uma nova transação
export const adicionarTransacao = async (req, res) => {
    try {
        const { descricao, valor, tipo } = req.body;

        const novaTransacao = new Transacao({ descricao, valor, tipo });
        await novaTransacao.save();

        res.status(201).json(novaTransacao);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao adicionar transação', error });
    }
};

// Listar todas as transações
export const listarTransacoes = async (req, res) => {
    try {
        const transacoes = await Transacao.find();
        res.status(200).json(transacoes);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao listar transações', error });
    }
};

// Editar uma transação
export const editarTransacao = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, valor, tipo } = req.body;

        const transacao = await Transacao.findByIdAndUpdate(id, { descricao, valor, tipo }, { new: true });
        if (!transacao) {
            return res.status(404).json({ msg: 'Transação não encontrada' });
        }

        res.status(200).json(transacao);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao editar transação', error });
    }
};

// Remover uma transação
export const removerTransacao = async (req, res) => {
    try {
        const { id } = req.params;

        const transacao = await Transacao.findByIdAndDelete(id);
        if (!transacao) {
            return res.status(404).json({ msg: 'Transação não encontrada' });
        }

        res.status(200).json({ msg: 'Transação removida com sucesso' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao remover transação', error });
    }
};
