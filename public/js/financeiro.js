// public/financeiro.js

const formTransacao = document.getElementById('form-transacao');
const descricao = document.getElementById('descricao');
const valor = document.getElementById('valor');
const tipo = document.getElementById('tipo');
const saldo = document.getElementById('saldo');
const listaTransacoes = document.getElementById('lista-transacoes');

let transacaoEditando = null;

const buscarSaldo = async () => {
    try {
        const response = await fetch('/api/financeiro/saldo');
        const data = await response.json();
        saldo.textContent = data.saldo.toFixed(2);
    } catch (error) {
        console.error('Erro ao buscar o saldo:', error);
    }
};

const listarTransacoes = async () => {
    try {
        const response = await fetch('/api/financeiro');
        const data = await response.json();
        listaTransacoes.innerHTML = data.map(transacao => 
            `<tr id="transacao-${transacao._id}">
                <td>${transacao.descricao}</td>
                <td>${transacao.tipo}</td>
                <td>R$${transacao.valor.toFixed(2)}</td>
                <td>
                    <button class="btnEditar" onclick="editarTransacao('${transacao._id}')">Editar</button>
                    <button class="btnDeletar" onclick="removerTransacao('${transacao._id}')">Deletar</button>
                </td>
            </tr>`
        ).join('');
    } catch (error) {
        console.error('Erro ao listar transações:', error);
    }
};

formTransacao.addEventListener('submit', async (e) => {
    e.preventDefault();

    const transacao = {
        descricao: descricao.value,
        valor: parseFloat(valor.value),
        tipo: tipo.value,
    };

    try {
        if (transacaoEditando) {
            await fetch(`/api/financeiro/${transacaoEditando}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transacao),
            });
            transacaoEditando = null;
        } else {
            await fetch('/api/financeiro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transacao),
            });
        }

        descricao.value = '';
        valor.value = '';
        tipo.value = 'entrada';

        listarTransacoes();
        buscarSaldo();
    } catch (error) {
        console.error('Erro ao adicionar/editar transação:', error);
    }
});

const editarTransacao = (id) => {
    fetch(`/api/financeiro/${id}`)
        .then(response => response.json())
        .then(data => {
            descricao.value = data.descricao;
            valor.value = data.valor;
            tipo.value = data.tipo;
            transacaoEditando = id;
        })
        .catch(error => console.error('Erro ao buscar transação:', error));
};

const removerTransacao = async (id) => {
    try {
        await fetch(`/api/financeiro/${id}`, { method: 'DELETE' });
        listarTransacoes();
        buscarSaldo();
    } catch (error) {
        console.error('Erro ao remover transação:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    listarTransacoes();
    buscarSaldo();
});
