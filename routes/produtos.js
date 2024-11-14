import express from 'express';
import { listarProdutos, criarProduto, atualizarProduto, deletarProduto } from '../controllers/produtoController.js';

const router = express.Router();

// Rota para listar produtos
router.get('/', listarProdutos);

// Rota para criar produto
router.post('/', criarProduto);

// Rota para atualizar produto
router.put('/:id', atualizarProduto);

// Rota para deletar produto
router.delete('/:id', deletarProduto);

export default router;
