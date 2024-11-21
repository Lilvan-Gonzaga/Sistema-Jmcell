document.getElementById('loginform').addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o comportamento padrão de enviar o formulário

  const name = document.getElementById('login_usuario').value;
  const password = document.getElementById('login_senha').value;

  try {
    // Envia o POST para a API de login (a lógica do backend ainda pode ser mantida se necessário)
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Se o login for bem-sucedido, salvar o nome do usuário no localStorage
      // Substitui o "_" por um espaço
      const nomeFormatado = name.replace('_', ' ');

      // Salva o nome do usuário no localStorage
      localStorage.setItem('usuarioNome', nomeFormatado);

      // Exibe a mensagem de sucesso
      alert('Login bem-sucedido!');
      
      // Redireciona para a home
      window.location.href = '/home'; // Redireciona para a página inicial
    } else {
      // Se o login falhar, exibe a mensagem de erro
      alert(data.msg);
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Erro ao tentar fazer login. Tente novamente.');
  }
});
