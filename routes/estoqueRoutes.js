// routes/produtoRoutes.js
import express from 'express';
import { adicionarProduto, listarProdutos, obterProdutoPorId, editarProduto, removerProduto } from '../controllers/estoqueController.js';

const router = express.Router();

// Rota para listar produtos
router.get('/', listarProdutos);

// Rota para obter um produto específico por ID
router.get('/:id', obterProdutoPorId);

// Rota para adicionar um novo produto
router.post('/', adicionarProduto);

// Editar um produto
router.put('/:id', editarProduto);

// Rota para remover um produto
router.delete('/:id', removerProduto);

export default router;
