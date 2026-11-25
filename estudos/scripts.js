// Questão 01

const buscaAluno = (numMatricula) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (String(numMatricula).length < 6) {
                reject("Número de matrícula inválido!")
            }else{
                resolve("Aluno Encontrado!")
            }
        },1000)
    })
}

console.log("Buscando alunos!")
buscaAluno(12220927)
    .then((msg) => console.log(msg))
    .catch((error) => console.log(error))
buscaAluno(1222)
    .then((msg) => console.log(msg))
    .catch((error) => console.log(error))


// Questão 02


const verificaTipoEValor = (...params) => 
    params.some((elemento, i) => 
        params.some((outro, j) => 
            i < j && typeof elemento == typeof outro && elemento == outro
        )
    )

console.log(verificaTipoEValor(7, "7"))
console.log(verificaTipoEValor(7, 7))

// Questão 03

const combinar = (a, b) => ({...a, ...b})
const processar = (fn, a, b) => console.log(fn(a,b))

const emprego = {"vaga": "Junior", "salario": 20000}
const nome = {"nome": "orlando", "idade": 23}

processar(combinar,emprego,nome)

// Questão 04

const array1 = [1,2,3]
const array2 = [4,5,6]
const array3 = [7,8,9]

const combinarOrdenado = (...arrays) =>
    arrays.reduce((acc, arr) => [...acc, ...arr], []).sort((x,y) => x-y)

console.log(combinarOrdenado(array1,array2,array3))

// Questão 05

const frases = [
    "JavaScript é poderoso!",
    "Callbacks são úteis.",
    "Arrow functions são mais curtas."
];

const palavrasDaFrase = (frase) => frase.trim().split(/\s+/).length

const analisarTexto = (array, callback) => {
    return callback(array)
};

const contarPalavras = (array) => {
    return array.reduce((total, frase) => total + palavrasDaFrase(frase), 0)
};

const maiorFrase = (array) => {
    return array.reduce((melhor, atual) =>
        palavrasDaFrase(atual) > palavrasDaFrase(melhor) ? atual : melhor
    )
};

console.log(analisarTexto(frases, contarPalavras)) 
console.log(analisarTexto(frases, maiorFrase)) 

// Questão 6

const colocarTodasLetrasEmMaiusculoEm500ms = (param) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (typeof param !== 'string') {
                return reject(param)
            }else{
                return resolve(param.toUpperCase())
            }
        }, 500)
    })
}

const inverteTodasLetras = (param) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (typeof param !== 'string') {
                return reject(param)
            }
            resolve(param.split("").reverse().join(""))
        }, 500)
    })
}

colocarTodasLetrasEmMaiusculoEm500ms("olá!")
    .then(inverteTodasLetras)
    .then((resultadoFn) => console.log(resultadoFn))
    .catch((error) => console.log(error))

// Questão 7

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve,ms))

const colocarTodasLetrasEmMaiusculoEm500ms_2 = async (param) => {
    await esperar(500)
    if (typeof param !== 'string') {
        throw param
    }

    return param.toUpperCase()
}

const inverteTodasLetras_2 = async (param) => {
    await esperar(500)

    if (typeof param !== 'string') {
        throw param
    }

    return param.split("").reverse().join("")
}

const executar = async (texto) => {
    try {
        const maiusculo = await colocarTodasLetrasEmMaiusculoEm500ms_2(texto)
        const invertido = await inverteTodasLetras_2(maiusculo)
        console.log(invertido)
    } catch (error) {
        console.log(error)
    }
}

const main = async () => {
    await executar("olá!")
    await executar(123)    
}

main()

// Questão 8

const api = "https://6b06ea2557fa1297bb566c35.mockapi.io/produtos/produtos"

const buscarProdutos = async () => {
    const resposta = await fetch(api)
    return resposta.json()
}

const cadastrarProduto = async (produto) => {
    const resposta = await fetch(api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...produto, status:"Criado"})
    })   

    return resposta.json()
}

const main_2 = async () => {
    try {
        const produtos = await buscarProdutos()
        produtos.forEach(p => console.log(`Produto ${p.nome} | Preço: R$ ${p.preco.toFixed(2)}`));

        const novo = {nome: 'Headset', preco: 250}
        produtos.push(novo)

        const criado = await cadastrarProduto(novo)
        console.log(`Produto ${criado.nome} criado com sucesso! Status: ${criado.status}`)
    } catch (error) {
        console.log(error)
    }
}

main_2()


