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
