import Produto from '../models/Produto.js';

// Adicionar um novo produto
export const adicionarProduto = async (req, res) => {
  try {
    const { nome, quantidade, preco } = req.body;

    const novoProduto = new Produto({ nome, quantidade, preco });
    await novoProduto.save();

    res.status(201).json(novoProduto); // Retorna o produto adicionado
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao adicionar produto', error });
  }
};

// Listar todos os produtos com suporte para busca e ordenação
export const listarProdutos = async (req, res) => {
  try {
    const { nome, ordenarPor } = req.query; // Recebe parâmetros de busca e ordenação

    // Iniciar a query para encontrar produtos
    let query = {};

    // Se houver um nome na busca, filtra os produtos
    if (nome) {
      query.nome = { $regex: nome, $options: 'i' }; // 'i' é para case insensitive
    }

    // Ordenação
    let ordenacao = {};
    if (ordenarPor) {
      if (ordenarPor === 'alfabetico') {
        ordenacao = { nome: 1 }; // Ordenar alfabeticamente (A-Z)
      } else if (ordenarPor === 'precoAsc') {
        ordenacao = { preco: 1 }; // Ordenar por preço (menor para maior)
      } else if (ordenarPor === 'precoDesc') {
        ordenacao = { preco: -1 }; // Ordenar por preço (maior para menor)
      }
    }

    // Buscar os produtos com a query e ordenação
    const produtos = await Produto.find(query).sort(ordenacao);
    res.status(200).json(produtos); // Retorna todos os produtos com os filtros e ordenação aplicados
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao listar produtos', error });
  }
};

// Função para obter um produto específico por ID
export const obterProdutoPorId = async (req, res) => {
  try {
    const produtoId = req.params.id;
    const produto = await Produto.findById(produtoId);

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(produto); // Retorna o produto encontrado
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar produto', error });
  }
};

// Editar um produto
export const editarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, quantidade, preco } = req.body;

    const produto = await Produto.findByIdAndUpdate(id, { nome, quantidade, preco }, { new: true });
    if (!produto) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    res.status(200).json(produto); // Retorna o produto atualizado
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao editar produto', error });
  }
};

// Remover um produto
export const removerProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findByIdAndDelete(id);
    if (!produto) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    res.status(200).json({ msg: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao remover produto', error });
  }
};
