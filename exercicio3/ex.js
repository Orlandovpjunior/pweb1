const vendas = [
    { produto: "Notebook", preco: 4500, quantidade: 3, vendedor: "Sara" },
    { produto: "Smartphone", preco: 2300, quantidade: 5, vendedor: "Matheus" },
    { produto: "Monitor", preco: 1200, quantidade: 2, vendedor: "Gabriel" },
    { produto: "Teclado Mecânico", preco: 350, quantidade: 4, vendedor: "Sara" },
    { produto: "Notebook", preco: 4500, quantidade: 6, vendedor: "Gabriel" },
    { produto: "Monitor", preco: 1200, quantidade: 3, vendedor: "Matheus" }
];


function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function gerarRelatorio(vendas) {
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

        console.log(`Relatório de Vendas:

    ${itens}

    Total Geral: ${formatarMoeda(totalGeral)}

    Total de comissão (5%):
    ${comissoes}`)
}


