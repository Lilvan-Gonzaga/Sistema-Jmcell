document.addEventListener('DOMContentLoaded', () => {
    const tabelaEstoque = document.getElementById('tabelaEstoque').getElementsByTagName('tbody')[0];
    const modalEditar = document.getElementById('modalEditar');
    const modalExcluir = document.getElementById('modalExcluir');
    const closeModal = document.getElementById('closeModal');
    const closeExcluirModal = document.getElementById('closeExcluirModal');
    const formProduto = document.getElementById('formProduto');
    const tituloForm = document.getElementById('tituloForm');
    const adicionarProdutoBtn = document.getElementById('adicionarProduto');
    const confirmarExcluirBtn = document.getElementById('confirmarExcluir');
    const cancelarExcluirBtn = document.getElementById('cancelarExcluir');
    const searchInput = document.getElementById('searchInput');
    const ordenarSelect = document.getElementById('ordenarSelect');
    const valorTotalEstoque = document.getElementById('valorTotalEstoque');
    
    let produtoSelecionadoParaExcluir = null;
    let produtos = [];

    // Função para carregar e renderizar os produtos
    function carregarProdutos() {
        fetch('/api/estoque')  // URL do endpoint para listar os produtos
            .then(response => response.json())
            .then(data => {
                produtos = data;
                aplicarFiltros();  // Aplica os filtros ao carregar os produtos
            })
            .catch(err => console.error('Erro ao carregar produtos', err));
    }

    // Função para aplicar filtros (pesquisa, ordenação, e quantidade)
    function aplicarFiltros() {
        let filtroNome = searchInput.value.toLowerCase();
        let filtroOrdenacao = ordenarSelect.value;

        let produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(filtroNome));

        // Ordenação
        if (filtroOrdenacao === 'nomeAsc') {
            produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (filtroOrdenacao === 'nomeDesc') {
            produtosFiltrados.sort((a, b) => b.nome.localeCompare(a.nome));
        } else if (filtroOrdenacao === 'precoAsc') {
            produtosFiltrados.sort((a, b) => a.preco - b.preco);
        } else if (filtroOrdenacao === 'precoDesc') {
            produtosFiltrados.sort((a, b) => b.preco - a.preco);
        } else if (filtroOrdenacao === 'quantidadeAsc') {
            produtosFiltrados.sort((a, b) => a.quantidade - b.quantidade);
        } else if (filtroOrdenacao === 'quantidadeDesc') {
            produtosFiltrados.sort((a, b) => b.quantidade - a.quantidade);
        }

        // Exibe os produtos na tabela
        renderizarTabela(produtosFiltrados);
    }

    // Função para renderizar a tabela de produtos
    function renderizarTabela(produtos) {
        tabelaEstoque.innerHTML = '';  // Limpa a tabela
        let valorTotal = 0;

        produtos.forEach(produto => {
            const row = tabelaEstoque.insertRow();
            const precoTotal = produto.preco * produto.quantidade;
            valorTotal += precoTotal;

            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>R$ ${precoTotal.toFixed(2)}</td>
                <td>
                    <button class="btnEditar" data-id="${produto._id}">Editar</button>
                    <button class="btnDeletar" data-id="${produto._id}">Deletar</button>
                </td>
            `;
        });

        // Exibe o valor total do estoque
        valorTotalEstoque.textContent = `Valor Total do Estoque: R$ ${valorTotal.toFixed(2)}`;
        adicionarEventos();
    }

    // Adiciona eventos de edição e deleção
    function adicionarEventos() {
        const btnEditar = document.querySelectorAll('.btnEditar');
        const btnDeletar = document.querySelectorAll('.btnDeletar');
        
        btnEditar.forEach(button => {
            button.addEventListener('click', editarProduto);
        });

        btnDeletar.forEach(button => {
            button.addEventListener('click', deletarProduto);
        });
    }

    // Função para editar um produto
    function editarProduto(e) {
        const produtoId = e.target.dataset.id;
        const produto = produtos.find(p => p._id === produtoId);

        document.getElementById('produtoId').value = produto._id;
        document.getElementById('nome').value = produto.nome;
        document.getElementById('quantidade').value = produto.quantidade;
        document.getElementById('preco').value = produto.preco;
        
        tituloForm.textContent = 'Editar Produto';
        modalEditar.style.display = 'block';
    }

    // Função para deletar um produto
    function deletarProduto(e) {
        produtoSelecionadoParaExcluir = e.target.dataset.id;
        modalExcluir.style.display = 'block';
    }

    // Ao submeter o formulário de produto
    formProduto.addEventListener('submit', function(event) {
        event.preventDefault();

        const produtoId = document.getElementById('produtoId').value;
        const nome = document.getElementById('nome').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;

        const produto = {
            nome,
            quantidade,
            preco
        };

        // Verifica se o produto tem um ID (edição) ou se é novo
        if (produtoId) {
            produto._id = produtoId;  // Se já tem um ID, adiciona ao objeto

            // Editar produto
            fetch(`/api/estoque/${produtoId}`, {
                method: 'PUT',
                body: JSON.stringify(produto),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                carregarProdutos();
                modalEditar.style.display = 'none';  // Fecha o modal após edição
            })
            .catch(err => console.error('Erro ao editar produto', err));
        } else {
            // Adicionar novo produto
            fetch('/api/estoque', {
                method: 'POST',
                body: JSON.stringify(produto),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                carregarProdutos();
                modalEditar.style.display = 'none';  // Fecha o modal após adicionar
            })
            .catch(err => console.error('Erro ao adicionar produto', err));
        }
    });

    // Abrir o modal de adicionar produto
    adicionarProdutoBtn.addEventListener('click', () => {
        // Limpa os campos do formulário
        document.getElementById('produtoId').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('preco').value = '';

        tituloForm.textContent = 'Adicionar Produto';
        modalEditar.style.display = 'block';  // Exibe o modal de adicionar produto
    });

    // Fechar modais
    closeModal.addEventListener('click', () => {
        modalEditar.style.display = 'none';
    });
    closeExcluirModal.addEventListener('click', () => {
        modalExcluir.style.display = 'none';
    });

    // Quando confirmar a exclusão
    confirmarExcluirBtn.addEventListener('click', () => {
        if (produtoSelecionadoParaExcluir) {
            fetch(`/api/estoque/${produtoSelecionadoParaExcluir}`, {
                method: 'DELETE'
            })
            .then(() => {
                carregarProdutos();  // Recarrega a lista de produtos após exclusão
                modalExcluir.style.display = 'none';  // Fecha o modal de exclusão
            })
            .catch(err => console.error('Erro ao excluir produto', err));
        }
    });

    // Quando cancelar a exclusão
    cancelarExcluirBtn.addEventListener('click', () => {
        modalExcluir.style.display = 'none';
    });

    // Eventos de filtro
    searchInput.addEventListener('input', aplicarFiltros);
    ordenarSelect.addEventListener('change', aplicarFiltros);

    // Carregar produtos ao inicializar
    carregarProdutos();
});