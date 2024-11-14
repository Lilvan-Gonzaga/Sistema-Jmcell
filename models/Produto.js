import mongoose from 'mongoose';

// Definição do esquema de produto
const produtoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;
