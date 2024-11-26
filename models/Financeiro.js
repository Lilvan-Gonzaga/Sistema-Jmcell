// models/Financeiro.js
import mongoose from 'mongoose';

const financeiroSchema = new mongoose.Schema({
  descricao: { type: String, required: true },  // Descrição da transação (Ex: venda de produto, pagamento de fornecedor)
  valor: { type: Number, required: true },  // Valor da transação
  tipo: { 
    type: String, 
    enum: ['entrada', 'saida'], 
    required: true 
  },  // Tipo de transação: entrada (dinheiro recebido) ou saída (dinheiro gasto)
  data: { type: Date, default: Date.now },  // Data da transação
});

const Financeiro = mongoose.model('Financeiro', financeiroSchema);

export default Financeiro;
