let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const adicionaAoCarrinho = (nomeProduto, precoProduto) => {
    const produto = { nome: nomeProduto, preco: precoProduto };
    carrinho.push(produto);
    atualizaContagemCarrinho();
    salvarCarrinho();
    alert(`O produto ${nomeProduto} foi adicionado ao seu carrinho.`);
}

const atualizaContagemCarrinho = () => {
    document.getElementById('carrinho-contagem').textContent = carrinho.length;
}

const salvarCarrinho = () => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

const carregaCarrinho = () => {
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    atualizaContagemCarrinho();
    mostrarItensCarrinho();
}

const mostrarItensCarrinho = () => {
    const containerCarrinho = document.getElementById('carrinho-container');
    const totalCarrinho = document.getElementById('carrinho-total');
    containerCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((produto, indice) => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('carrinho__item');
        
        itemCarrinho.innerHTML = `
            <img src="./img/${produto.nome}.jpg" alt="${produto.nome}">
            <div class="carrinho__item--detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <button onclick="removerItemCarrinho(${indice})">Remover</button>
        `;

        containerCarrinho.appendChild(itemCarrinho);
        total += produto.preco;
    });

    totalCarrinho.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const removerItemCarrinho = (indice) => {
    carrinho.splice(indice, 1);
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
}

const limpaCarrinho = () => {
    carrinho = [];
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
}


//RESPOSTAS

//Etapa 02
//URL para buscar: https://viacep.com.br/ws/58400240/json/
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar o CEP'))

const URL = "https://viacep.com.br/ws/58400240/json/"

const buscarEndereco = (cep) => {
    return new Promise((resolve, reject) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`, {method: 'GET'})
            .then(resposta => resposta.json())
            .then(data => {
                if (data.erro) {
                    reject('Erro ao consultar o CEP')
                }else{
                    resolve(data)
                }
                
            })
        .catch(() => reject('Erro ao consultar o CEP'))
    });
}

const consultaCep = () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarEndereco(cep)
            .then(data => {
                document.getElementById('logradouro').value = data.logradouro
                document.getElementById('cidade').value = data.localidade
                document.getElementById('estado').value = data.uf
            })
            .catch(error => alert(error));
    } else {
        alert('CEP inválido!');
    }
};

//Etapa 03
const geraTextoMarketeiro = (dadosFormulario) => {

    const card = document.createElement('div');
    card.style.width = '300px';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '10px';
    card.style.padding = '15px';
    card.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.1)';
    card.style.margin = '10px auto';
    card.style.fontFamily = 'Arial, sans-serif';
    card.style.backgroundColor = '#f9f9f9';

    card.innerHTML = `
        <h3 style="text-align: center; color: #333;">Informações do Usuário</h3>
        <p><strong>Mensagem:</strong> Apresentamos ${dadosFormulario.nome}, residente na rua ${dadosFormulario.endereco}</p>
    `;

    document.body.appendChild(card);

}

const validarFormulario = (event) => {
    event.preventDefault();

    const obrigatorios = {
        pedido: 'Número do Pedido',
        nome: 'Nome do Cliente',
        cep: 'CEP',
        logradouro: 'Logradouro',
        cidade: 'Cidade',
        estado: 'Estado',
        email: 'E-mail',
        produto: 'Produto',
        tipo: 'Tipo de Solicitação',
        motivo: 'Motivo da Solicitação',
        quantidade: 'Quantidade'
    };

    for (const id in obrigatorios) {
        if (document.getElementById(id).value.trim() === '') {
            alert(`O campo "${obrigatorios[id]}" é obrigatório.`);
            document.getElementById(id).focus();
            return;
        }
    }

    const email = document.getElementById('email').value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert('Informe um e-mail válido.');
        return;
    }

    const quantidade = Number(document.getElementById('quantidade').value);
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert('A quantidade deve ser um número inteiro maior que zero.');
        return;
    }

    const tipo = document.getElementById('tipo').value;
    if (tipo !== 'troca' && tipo !== 'devolucao') {
        alert('Selecione o tipo de solicitação.');
        return;
    }

    if (tipo === 'devolucao') {
        const confirmou = confirm('Tem certeza que deseja solicitar a devolução do produto?');
        if (!confirmou) {
            return;
        }
    }

    submeterDados();
    alert('Solicitação registrada com sucesso!');
};

//Não mexer neste método
function submeterDados(event) {

    const dadosFormulario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        motivo: document.getElementById('motivo').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('logradouro').value,
        endereco: document.getElementById('complemento').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    gerarTextoMarketeiro(dadosFormulario);
};


//Etapa 04
//URL para buscar: https://fakestoreapi.com/products
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar os Produtos'))
const consultarProdutosExternos = () => {
    return new Promise((resolve, reject) => {
        fetch('https://fakestoreapi.com/products', { method: 'GET' })
            .then(resposta => resposta.json())
            .then(data => resolve(data))
            .catch(() => reject('Erro ao consultar os Produtos'))
    })
}

const alterarValoresTabela = () => {
    consultarProdutosExternos().then(data => {
        document.getElementById('nome1').innerText = data[0].title
        document.getElementById('preco1').innerText = data[0].price
        document.getElementById('img1').src = data[0].image

        document.getElementById('nome2').innerText = data[1].title
        document.getElementById('preco2').innerText = data[1].price
        document.getElementById('img2').src = data[1].image

        document.getElementById('nome3').innerText = data[2].title
        document.getElementById('preco3').innerText = data[2].price
        document.getElementById('img3').src = data[2].image

        document.getElementById('nome4').innerText = data[3].title
        document.getElementById('preco4').innerText = data[3].price
        document.getElementById('img4').src = data[3].image

        document.getElementById('nome5').innerText = data[4].title
        document.getElementById('preco5').innerText = data[4].price
        document.getElementById('img5').src = data[4].image

        document.getElementById('nome6').innerText = data[5].title
        document.getElementById('preco6').innerText = data[5].price
        document.getElementById('img6').src = data[5].image
    }).catch(error => alert(error));
}

//Não mexer neste método
const modificaValores = ([produto1, produto2, produto3, produto4, produto5, produto6]) => {

    const tabela = document.getElementById("tabelaProdutos").getElementsByTagName('tbody')[0];
    tabela.rows[0].cells[1].innerText = produto1.preco;
    tabela.rows[0].cells[2].innerText = produto1.estoque;
    tabela.rows[1].cells[1].innerText = produto2.preco;
    tabela.rows[1].cells[2].innerText = produto2.estoque;
    tabela.rows[2].cells[1].innerText = produto3.preco;
    tabela.rows[2].cells[2].innerText = produto3.estoque;
    tabela.rows[3].cells[1].innerText = produto4.preco;
    tabela.rows[3].cells[2].innerText = produto4.estoque;
    tabela.rows[4].cells[1].innerText = produto5.preco;
    tabela.rows[4].cells[2].innerText = produto5.estoque;
    tabela.rows[5].cells[1].innerText = produto6.preco;
    tabela.rows[5].cells[2].innerText = produto6.estoque;

}

window.onload = carregaCarrinho;

