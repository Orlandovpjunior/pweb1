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
