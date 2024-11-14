import Produto from '../models/Produto.js';

// Listar todos os produtos
export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// Criar um novo produto
export const criarProduto = async (req, res) => {
  const { name, description, amount, price } = req.body;
  const novoProduto = new Produto({ name, description, amount, price });

  try {
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
};

// Atualizar um produto
export const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { name, description, amount, price } = req.body;

  try {
    const produto = await Produto.findByIdAndUpdate(id, { name, description, amount, price }, { new: true });
    if (!produto) return res.status(404).send('Produto não encontrado');
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

// Deletar um produto
export const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByIdAndDelete(id);
    if (!produto) return res.status(404).send('Produto não encontrado');
    res.send('Produto excluído com sucesso');
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir o produto' });
  }
};
