function tratarLogin() {
    const loginForm = document.getElementById('loginform');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const usersave = document.getElementById('login_usuario').value;
            localStorage.setItem('usuario', usersave);
            window.location.href = '/home';
        });
    }
}



function tratarCadastro() {
    const cadastroForm = document.getElementById('cadastroform');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const cadastrousuario = document.getElementById('cadastro_usuario').value;
            const cadastroemail = document.getElementById('cadastro_email').value;
            const cadastrosenha = document.getElementById('cadastro_senha').value;
            const confirmarsenha = document.getElementById('confirmar_senha').value;
            const mensagemerro = document.getElementById('mensagem_erro');

            if (!cadastrousuario.includes('_')) {
                mensagemerro.textContent = 'O nome de usuário deve conter um sobrenome (ex: nome_sobrenome).';
                return;
            }
            
            if (cadastrosenha !== confirmarsenha) {
                mensagemerro.textContent = 'As senhas digitadas não coincidem. Tente novamente.';
                return;
            }

            window.location.href = '/login';
        });
    }
}



function mostrarBoasVindas() {
    const usuario = localStorage.getItem('usuario');
    const usuarioBemVindo = document.getElementById('boasvindas');

    if (usuarioBemVindo) {
        if (usuario) {
            usuarioBemVindo.textContent = `Olá, ${usuario.replace('_', ' ')}!`;
        } else {
            usuarioBemVindo.textContent = 'Olá, visitante!';
        }
    }
}



document.addEventListener('DOMContentLoaded', function() {
    tratarLogin();
    tratarCadastro();
    mostrarBoasVindas();
})

// Função de login
function tratarLogin() {
    const loginForm = document.getElementById('loginform');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('login_usuario').value;
            const password = document.getElementById('login_senha').value;

            // Enviar a requisição de login para o backend
            fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    // Armazenar o token no localStorage ou cookie
                    localStorage.setItem('authToken', data.token);
                    window.location.href = '/home'; // Redireciona para a página inicial
                } else {
                    alert(data.message); // Exibe mensagem de erro
                }
            })
            .catch(error => console.error('Erro ao fazer login:', error));
        });
    }
}

// Função de cadastro
function tratarCadastro() {
    const cadastroForm = document.getElementById('cadastroform');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('cadastro_usuario').value;
            const email = document.getElementById('cadastro_email').value;
            const password = document.getElementById('cadastro_senha').value;
            const confirmarSenha = document.getElementById('confirmar_senha').value;
            const mensagemErro = document.getElementById('mensagem_erro');

            if (password !== confirmarSenha) {
                mensagemErro.textContent = 'As senhas não coincidem.';
                return;
            }

            // Enviar os dados para o backend
            fetch('/auth/cadastro', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    window.location.href = '/login'; // Redireciona para a página de login
                } else {
                    mensagemErro.textContent = data.message; // Exibe erro no frontend
                }
            })
            .catch(error => console.error('Erro ao cadastrar:', error));
        });
    }
}
