const API_URL = 'http://localhost:3000/api';

let carrinho = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

async function carregarProdutos() {
    const grid = document.getElementById('produtos-grid');

    try {
       
        const resposta = await fetch(`${API_URL}/produtos`);
        const produtos = await resposta.json();

        if (produtos.length === 0) {
            grid.innerHTML = '<p class="text-center">Nenhuma vela cadastrada.</p>';
            return;
        }

        grid.innerHTML = '';

        for (const produto of produtos) {
            const card = document.createElement('div');
            card.className = 'card-produto';

            card.innerHTML = `
                <h4>${produto.nome}</h4>
                <p>${produto.descricao || ''}</p>
                <p><strong>Aroma:</strong> ${produto.aroma}</p>
                <div class="card-preco">R$ ${produto.preco}</div>
                <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}',${produto.preco})">
                    Adicionar ao Carrinho
                </button>
            `;

            grid.appendChild(card);
        }
    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
        grid.innerHTML = '<p style="color: red; text-align: center;">Erro ao carregar os produtos do servidor.</p>';
    }
}
function adicionarAoCarrinho(id, nome, preco) {
    let itemEncontrado = false;


    for (const item of carrinho) {
        if (item.produto_id === id) {
            item.quantidade += 1;
            itemEncontrado = true;
            break;
        }
    }

    if (!itemEncontrado) {
        carrinho.push({
            produto_id: id,
            nome: nome,
            preco_unitario: Number(preco),
            quantidade: 1
        });
    }

    atualizarCarrinhoTela();
}

function atualizarCarrinhoTela() {
    const listaDiv = document.getElementById('carrinho-itens');
    listaDiv.innerHTML = '';

    let totalItens = 0;
    let valorTotal = 0;

    for (const item of carrinho) {
        const subtotal = item.quantidade * item.preco_unitario;
        
        totalItens += item.quantidade;
        valorTotal += subtotal;

        listaDiv.innerHTML += `
            <div class="item-carrinho">
                <span>${item.nome} (${item.quantidade}x)</span>
                <strong>R$ ${subtotal.toFixed(2)}</strong>
            </div>
        `;
    }

    document.getElementById('cart-count').innerText = totalItens;
    document.getElementById('carrinho-total').innerText = `R$ ${valorTotal.toFixed(2)}`;
}

function abrirCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'flex';
}

function fecharCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'none';
}


async function finalizarPedido(event) {
    event.preventDefault(); 

    if (carrinho.length === 0) {
        alert('O seu carrinho está vazio!');
        return;
    }

    const dadosPedido = {
        cliente_nome: document.getElementById('cliente-nome').value,
        cliente_whatsapp: document.getElementById('cliente-whatsapp').value,
        itens: carrinho
    };

    try {
        const resposta = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPedido)
        });

        if (resposta.ok) {
            alert('Pedido realizado com sucesso!');
            carrinho = [];
            atualizarCarrinhoTela();
            fecharCarrinho();
            document.getElementById('cliente-nome').value = '';
            document.getElementById('cliente-whatsapp').value = '';
        } else {
            alert('Erro ao enviar o pedido.');
        }
    } catch (erro) {
        console.error('Erro ao enviar pedido:', erro);
        alert('Erro ao conectar com o servidor.');
    }
}