const vendas = [
    { produto: "Notebook", preco: 4500, quantidade: 3, vendedor: "Sara" },
    { produto: "Smartphone", preco: 2300, quantidade: 5, vendedor: "Matheus" },
    { produto: "Monitor", preco: 1200, quantidade: 2, vendedor: "Gabriel" },
    { produto: "Teclado Mecânico", preco: 350, quantidade: 4, vendedor: "Sara" },
    { produto: "Notebook", preco: 4500, quantidade: 6, vendedor: "Gabriel" },
    { produto: "Monitor", preco: 1200, quantidade: 3, vendedor: "Matheus" }
];

const clientes = [
    { nome: "Davi", email: "davi@email.com", plano: "Premium", ativo: true },
    { nome: "Mariana", email: "mariana@email.com", plano: "Básico", ativo: false },
    { nome: "Gabriel", email: "gabriel@email.com", plano: "Padrão", ativo: true },
    { nome: "Ana", email: "ana@email.com", plano: "Premium", ativo: false },
    { nome: "Huandrey", email: "huandrey@email.com", plano: "Padrão", ativo: true }
];

const usuarios = [
    { nome: "Cleciana", idade: "25", ativo: "true", saldo: "1234.56" },
    { nome: "Gustavo", idade: 30, ativo: true, saldo: 980 },
    { nome: "Rayane", idade: null, ativo: "false", saldo: "1500.90" },
    { nome: "Igor", idade: "NaN", ativo: 1, saldo: undefined },
    { nome: "Samuel", idade: "22 anos", ativo: false, saldo: "0" }
];

const exportacao = {
    paisDestino: "Estados Unidos",
    produto: {
        nome: "aço",
        valorEmDolares: 100000,
        taxaImposta: 0.25
    },
    empresa: "Siderúrgica Brasil Ltda"
};

const formatarMoeda = (valor) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor)

const gerarRelatorio = (vendas) => {
    const totalGeral = vendas.reduce((total, element) => total + element.preco * element.quantidade, 0)

    const totalPorVendedor = vendas.reduce((acc, element) => {
        acc[element.vendedor] = (acc[element.vendedor] || 0) + element.preco * element.quantidade
        return acc
    }, {})

    const itens = vendas.map(element =>
`- Produto: ${element.produto}
  Quantidade: ${element.quantidade}
  Preço Unitário: ${formatarMoeda(element.preco)}
  Total: ${formatarMoeda(element.preco * element.quantidade)}
  Vendedor: ${element.vendedor}`).join("\n\n")

    const comissoes = Object.entries(totalPorVendedor).map(([vendedor, total]) =>
`${vendedor}: ${formatarMoeda(total * 0.05)}`).join("\n")

    return `Relatório de Vendas:

${itens}

Total Geral: ${formatarMoeda(totalGeral)}

Total de comissão (5%):
${comissoes}`
}

const gerarEmail = (cliente) => {
    if (cliente.ativo) {
        return `Para: ${cliente.email}
Olá, ${cliente.nome}!

Obrigado por ser um assinante do nosso plano ${cliente.plano}! Estamos felizes em tê-lo conosco.

Caso precise de suporte, estamos à disposição.

Atenciosamente,
Equipe StreamingWeb.`
    }

    return `Para: ${cliente.email}
Olá, ${cliente.nome}!

Notamos que sua assinatura do plano ${cliente.plano} está inativa. Que tal voltar e aproveitar nossos conteúdos exclusivos?

Reative agora e continue sua experiência conosco!

Atenciosamente,
Equipe StreamingWeb.`
}


const normalizarUsuario = (usuario) => {
    const idade = usuario.idade === null ? NaN : Number(usuario.idade)
    const saldo = parseFloat(usuario.saldo)

    return {
        nome: usuario.nome,
        idade: Number.isInteger(idade) ? idade : null,
        ativo: usuario.ativo === true || usuario.ativo === "true" || usuario.ativo === 1,
        saldo: isNaN(saldo) ? 0 : Number(saldo.toFixed(2))
    }
}

const processarUsuario = (lista) => {
    const normalizados = lista.map(normalizarUsuario)
    console.log(normalizados)
}

const somar = (lista) => {
    console.log(lista.reduce((acc, element) => acc + element, 0))
}

const questaoQuatro = (numero, callback) => {
    const listaPares = []
    if (numero % 2 !== 0) numero++

    for (let index = 0; index < 5; index++) {
        listaPares.push(numero)
        numero += 2
    }
    callback(listaPares)
}


const questaoCinco = (exportacao) => {
    const { produto: { nome, valorEmDolares, taxaImposta }, empresa } = exportacao
    const valorComTarifa = valorEmDolares * (1 + taxaImposta)

    console.log(`Produto: ${nome}
Empresa: ${empresa}
Valor original: US$ ${valorEmDolares}
Taxa: ${taxaImposta * 100}%
Valor com tarifa: US$ ${valorComTarifa}`)
}






