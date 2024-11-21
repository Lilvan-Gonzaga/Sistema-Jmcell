document.getElementById('cadastroform').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de enviar o formulário
  
    // Pega os dados do formulário
    const name = document.getElementById('cadastro_usuario').value;
    const password = document.getElementById('cadastro_senha').value;
    const confirmpassword = document.getElementById('confirmar_senha').value;
  
    // Valida os campos
    if (password !== confirmpassword) {
      alert('As senhas não coincidem!');
      return;
    }
  
    try {
      // Envia o POST para a API de cadastro
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
          confirmpassword
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Se o cadastro for bem-sucedido, redireciona para a tela de login
        alert(data.msg);
        window.location.href = '/login'; // Redireciona para o login
      } else {
        // Se houve erro, mostra o erro
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao tentar cadastrar. Tente novamente.');
    }
  });
  