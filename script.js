// controle do carrinho
let carrinho = [];
const precoPadrao = 199;

// adicionar curso no carrinho
function adicionarCarrinho(nomeCurso, botao) {

    // evitar duplicação
    if (carrinho.find(item => item.nome === nomeCurso)) return;

    carrinho.push({ nome: nomeCurso, preco: precoPadrao });
    atualizarCarrinho();
    mostrarAlerta();

    // atualizar o botão
    botao.innerText = "Adicionado ✓";
    botao.disabled = true;
    botao.classList.add("adicionado");
}

// remover item do carrinho
function removerItem(index) {
    const nomeCurso = carrinho[index].nome;
    carrinho.splice(index, 1);

    atualizarCarrinho();
    restaurarBotao(nomeCurso);
}

// atualizar o carrinho 
function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const totalTexto = document.getElementById("totalCarrinho");
    const contador = document.getElementById("contadorCarrinho");

    lista.innerHTML = "";
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

    totalTexto.innerText = "Total: R$ " + total;
    contador.innerText = carrinho.length;
}

// restaurar o botão quando remover curso do carrinho
function restaurarBotao(nomeCurso) {
    const botoes = document.querySelectorAll(".card-cursos button");

    botoes.forEach(botao => {
        if (botao.parentElement.querySelector("h2").innerText === nomeCurso) {
            botao.innerText = "Adicionar";
            botao.disabled = false;
            botao.classList.remove("adicionado");
        }
    });
}

// finalizar a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Matrícula realizada com sucesso! 🎓");

    carrinho = [];
    atualizarCarrinho();

    // restaurar todos os botões
    document.querySelectorAll(".card-cursos button").forEach(botao => {
        botao.innerText = "Adicionar";
        botao.disabled = false;
        botao.classList.remove("adicionado");
    });

    fecharCarrinho();
}

// elementos visuais

function abrirCarrinho() {
    document.getElementById("carrinhoLateral").classList.add("ativo");
    document.getElementById("overlayCarrinho").classList.add("ativo");
}

function fecharCarrinho() {
    document.getElementById("carrinhoLateral").classList.remove("ativo");
    document.getElementById("overlayCarrinho").classList.remove("ativo");
}

function abrirLogin() {
    document.getElementById("loginCard").style.display = "flex";
}

function fecharLogin() {
    document.getElementById("loginCard").style.display = "none";
}

function fazerLogin() {
    const id = document.getElementById("alunoId").value;
    const senha = document.getElementById("alunoSenha").value;

    if (id && senha) {
        alert("Login realizado com sucesso!");
        fecharLogin();
    } else {
        alert("Preencha todos os campos!");
    }
}

function irParaCursos() {
    document.getElementById("cursos").scrollIntoView({ behavior: "smooth" });
}

// alerta 
function mostrarAlerta() {
    const alerta = document.getElementById("alertaSucesso");
    alerta.classList.add("ativo");

    setTimeout(() => {
        alerta.classList.remove("ativo");
    }, 2000);
}
