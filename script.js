let carrinho = [];
const PRECO_PADRAO = 199;

function adicionarDoModal(nomeCurso, botao, idModal) {
    if (!carrinho.find(item => item.nome === nomeCurso)) {
        carrinho.push({ nome: nomeCurso, preco: PRECO_PADRAO });
        atualizarCarrinho();
        mostrarAlerta();
    }

    botao.innerText = 'Adicionado ✓';
    botao.disabled = true;
    botao.classList.add('adicionado');

    fecharModal(idModal);
}

function adicionarCarrinho(nomeCurso, botao) {
    if (carrinho.find(item => item.nome === nomeCurso)) return;

    carrinho.push({ nome: nomeCurso, preco: PRECO_PADRAO });

    botao.innerText = 'Adicionado ✓';
    botao.disabled = true;
    botao.classList.add('adicionado');

    atualizarCarrinho();
    mostrarAlerta();
}

function removerItem(index) {
    const nomeCurso = carrinho[index].nome;
    carrinho.splice(index, 1);

    atualizarCarrinho();
    restaurarBotao(nomeCurso);
}

function atualizarCarrinho() {
    const lista = document.getElementById('listaCarrinho');
    const totalTexto = document.getElementById('totalCarrinho');
    const contador = document.getElementById('contadorCarrinho');

    lista.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        lista.innerHTML += `
            <div class="item-carrinho">
                <span>${item.nome}</span>
                <span>R$ ${item.preco}</span>
                <button onclick="removerItem(${index})">Remover</button>
            </div>
        `;
    });

    totalTexto.innerText = `Total: R$ ${total}`;
    contador.innerText = carrinho.length;
}

function restaurarBotao(nomeCurso) {
    document.querySelectorAll('.card-cursos button').forEach(botao => {
        const titulo = botao.parentElement.querySelector('h2');
        if (titulo && titulo.innerText === nomeCurso) {
            botao.innerText = 'Adicionar';
            botao.disabled = false;
            botao.classList.remove('adicionado');
        }
    });

    document.querySelectorAll('.modal-box').forEach(modal => {
        const titulo = modal.querySelector('h2');
        if (titulo && titulo.innerText === nomeCurso) {
            const botaoModal = modal.querySelector('.btn-adicionar');
            if (botaoModal) {
                botaoModal.innerText = 'Adicionar';
                botaoModal.disabled = false;
                botaoModal.classList.remove('adicionado');
            }
        }
    });
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    alert('Matrícula realizada com sucesso! 🎓');

    carrinho = [];
    atualizarCarrinho();

    document.querySelectorAll('.card-cursos button').forEach(botao => {
        botao.innerText = 'Adicionar';
        botao.disabled = false;
        botao.classList.remove('adicionado');
    });

    fecharCarrinho();
}

function abrirLogin() {
    document.getElementById('loginCard').style.display = 'flex';
}

function fecharLogin() {
    document.getElementById('loginCard').style.display = 'none';
}

function fazerLogin() {
    const id = document.getElementById('alunoId').value.trim();
    const senha = document.getElementById('alunoSenha').value.trim();

    if (id && senha) {
        alert('Login realizado com sucesso!');
        fecharLogin();
    } else {
        alert('Preencha todos os campos!');
    }
}

function abrirModal(id) {
    document.getElementById('overlay-' + id).style.display = 'flex';
}

function fecharModal(id) {
    document.getElementById('overlay-' + id).style.display = 'none';
}

function abrirCarrinho() {
    document.getElementById('carrinhoLateral').classList.add('ativo');
    document.getElementById('overlayCarrinho').classList.add('ativo');
}

function fecharCarrinho() {
    document.getElementById('carrinhoLateral').classList.remove('ativo');
    document.getElementById('overlayCarrinho').classList.remove('ativo');
}

function irParaCursos() {
    document.getElementById('cursos').scrollIntoView({ behavior: 'smooth' });
}

function mostrarAlerta() {
    const alerta = document.getElementById('alertaSucesso');
    alerta.classList.add('ativo');
    setTimeout(() => alerta.classList.remove('ativo'), 2000);
}
