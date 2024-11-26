// routes/financeiroRoutes.js

import express from 'express';
import { adicionarTransacao, listarTransacoes, editarTransacao, removerTransacao } from '../controllers/financeiroController.js';

const router = express.Router();

// Rota para listar transações
router.get('/', listarTransacoes);

// Rota para adicionar uma nova transação
router.post('/', adicionarTransacao);

// Rota para editar uma transação
router.put('/:id', editarTransacao);

// Rota para remover uma transação
router.delete('/:id', removerTransacao);

export default router;
