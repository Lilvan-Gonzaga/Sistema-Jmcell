// models/Produto.js
import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  preco: { type: Number, required: true },
});

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;
