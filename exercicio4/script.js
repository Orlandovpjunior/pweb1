
// Questão 1
const personagem = {
    nome: "Aragorn",
    classe: "Guerreiro",
    atributos: {
        nivel: 45,
        vida: 850,
        mana:120
    },
    localizacao: {
        cidade: "Minas Tirith",
        regiao: "Gondor"
    }
};

const { nome, classe, atributos: { nivel }, localizacao: { cidade, regiao } } = personagem;
const resultado = `${nome} é um ${classe} de nível ${nivel} e está em ${cidade}, na região de ${regiao}.`;
console.log(resultado);


// Questão 2
const vendas = [150.50, 230.00, 89.90, 420.00, 110.50]

const calcularTotal = (vendas) => {
    const[primeira,,,,ultima] = vendas
    const total =  vendas.reduce((acc, value) => {
        return acc + value
    },0)

    return `Primeira venda: R$ ${primeira} | Última venda: R$ ${ultima} | Total arrecadado: R$ ${total}`;
}

const resultado_2 = calcularTotal(vendas)
console.log(resultado_2)

// Questão 3
const clima = {
    cidade: "Campina Grande",
    estado: "Paraíba",
    temperatura: {
        atual: 28,
        minima: 22,
        maxima: 31
    },
    condicao : "Parcialmente nublado",
    umidade: 75
}


const gerarResumo = ({ cidade, estado, temperatura: { atual, minima, maxima }, condicao }) => {
    return `${cidade} - ${estado} | Temperatura: ${atual}°C (mínima: ${minima}°C, máxima: ${maxima}°C) | Condição: ${condicao}`
}

console.log(gerarResumo(clima))

// Questão 4
const classificacao = [
    ["Ana", 950],
    ["Carlos", 890],
    ["Mariana", 870]
]



const resultado_3 = classificacao.map(([nome, pontos], index) =>
    `${index + 1}º lugar: ${nome} - ${pontos} pontos`
)

resultado_3.forEach((linha) => console.log(linha))
