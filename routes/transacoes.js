import express from 'express';
import { listarTransacoes, criarTransacao } from '../controllers/transacaoController.js';

const router = express.Router();

// Rota para listar transações
router.get('/', listarTransacoes);

// Rota para criar transação
router.post('/', criarTransacao);

export default router;
