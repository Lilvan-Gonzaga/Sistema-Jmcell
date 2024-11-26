document.addEventListener('DOMContentLoaded', () => {
    // Pega o nome do usuário do localStorage
    const nomeUsuario = localStorage.getItem('usuarioNome');  // Exemplo: 'usuario_sobrenome'

    if (nomeUsuario) {
        // Substitui o "_" por um espaço
        const nomeFormatado = nomeUsuario.replace("_", " ");

        // Exibe a saudação no elemento com id 'saudacao'
        const saudacao = document.getElementById('boasvindas');
        saudacao.textContent = `Olá, ${nomeFormatado}`;  // Exibe "Olá, usuario sobrenome"
    } else {
        // Caso não exista o nome no localStorage
        console.error('Nome de usuário não encontrado!');
    }
});


// Lógica para alternar o menu
const menuToggleButton = document.getElementById('menu-toggle'); // Botão de alternar
const menu = document.querySelector('.menu_navegacao'); // O menu lateral

menuToggleButton.addEventListener('click', () => {
    // Alterna a classe 'menu-closed' para esconder/exibir o menu
    menu.classList.toggle('menu-closed');

    // Alterna os ícones da seta
    const icon = menuToggleButton.querySelector('i');
    if (menu.classList.contains('menu-closed')) {
        icon.textContent = 'arrow_forward_ios'; // Quando o menu estiver fechado
    } else {
        icon.textContent = 'arrow_back_ios'; // Quando o menu estiver aberto
    }
});
