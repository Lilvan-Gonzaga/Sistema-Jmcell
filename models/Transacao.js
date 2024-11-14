import mongoose from 'mongoose';

// Definição do esquema de transação
const transacaoSchema = new mongoose.Schema({
  type: { type: String, enum: ['entrada', 'saida'], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Transacao = mongoose.model('Transacao', transacaoSchema);

export default Transacao;
