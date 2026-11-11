// Questão 1
function minhaPromise(palavra, segundos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (palavra.length == 13) {
        reject(palavra);
      } else {
        resolve(palavra);
      }
    }, segundos * 1000);
  });
}

minhaPromise("Olá", 5)
  .then((palavra) => {
    palavra.concat("!!");
    console.log(palavra);
  })
  .catch((e) => console.log(e));

// Questão 2
const temRepetido = (...params) =>
  params.some((elemento, i) =>
    params.some(
      (outro, j) =>
        j > i && typeof elemento === typeof outro && elemento === outro,
    ),
  );

console.log(temRepetido(1, "1", 1)); // True

// Questão 3
const combinarObjetos = (obj1, obj2) => ({ ...obj1, ...obj2 });
const exibir = (combinar, a, b) => console.log(combinar(a, b));

const pessoa = { nome: "Orlando Junior", idade: 22 };
const emprego = { cargo: "Dev", salario: 12348.99 };

exibir(combinarObjetos, pessoa, emprego);

// Questão 4
const combinarArrays = (arr1, arr2) => [...arr1, ...arr2];
const exibirArrays = (combinar, a, b) => console.log(combinar(a, b));

const array1 = [1, 2, 3];
const array2 = [3, 4, 5];

console.log(combinarArrays(array1, array2));

// Questão 5
const frases = [
  "JavaScript é poderoso!",
  "Callbacks são úteis.",
  "Arrow functions são mais curtas.",
];

const analisarTexto = (array, callback) => {
  return callback(array);
};

// Callback que conta o total de palavras em todas as frases
const contarPalavras = (array) => {
  let contagem = 0

  array.forEach((element)=> {
    const palavras = element.trim().split(/\s+/)
    contagem += palavras.length
  })

  return contagem
};

// Callback que encontra a frase com mais palavras
const maiorFrase = (array) => {
  let fraseComMaisPalavras = array[0];
  let maiorQuantidadePalavras = fraseComMaisPalavras.trim().split(/\s+/)

  array.forEach((frase)=> {
    qtd_atual = frase.trim().split(/\s+/)

    if (qtd_atual > maiorQuantidadePalavras) {
        fraseComMaisPalavras = frase
        maiorQuantidadePalavras = qtd_atual
    }
  })

  return fraseComMaisPalavras;
};

console.log(analisarTexto(frases, contarPalavras));
console.log(analisarTexto(frases, maiorFrase));

// Questão 6
const inverteTodasLetras = (param) => {
  return param.split('').reverse().join('')
}

const colocarTodasLetrasEmMaiusculoEm500ms = (param) => {
  return new Promise((resolve, reject)=> {
    setInterval(()=> {
      if (typeof param !== 'string') {
        reject(param)
        return
      }
      resolve(param.toUpperCase())
    }, 500)
  })
}

colocarTodasLetrasEmMaiusculoEm500ms('javascript')
  .then(inverteTodasLetras)
  .then((resultado) => console.log(resultado))
  .catch((erro) => console.log(`${erro} não é uma String!`))

colocarTodasLetrasEmMaiusculoEm500ms(300)
  .then(inverteTodasLetras)
  .then((resultado) => console.log(resultado))
  .catch((erro) => console.log(`${erro} não é uma String!`))

// Questão 7 Fiz levando em conta a questão 6 e não a 4

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const colocarTodasLetrasEmMaiusculoEm500msAsync = async(param) => {
  await esperar(500)
   if (typeof param !== 'string') {
      throw param
    }
    return param.toUpperCase()
}

const inverteTodasLetrasAsync = async(param) => {
  return param.split('').reverse().join('')
}

const executar = async(param) => {
  try {
    const maiusculo = await colocarTodasLetrasEmMaiusculoEm500ms(param)
    const invertido = await inverteTodasLetrasAsync(maiusculo)
    console.log(invertido)
  } catch (error) {
    console.log(`${error} não é uma string!`)
  }
}

executar("javascript")
executar(300)

// Questão 8
const URL = 'https://6af4f565f6270fa08d679bd6.mockapi.io/pweb/v1/produtos'

const buscarProdutos = async () => {
    const resposta = await fetch(URL)
    return resposta.json()
}

const cadastrarProduto = async (produto) => {
  const resposta = await fetch(URL,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...produto, status: 'criado'})
    }
  )
  return resposta.json()
}

const main = async () => {
  try{
    const produtos = await buscarProdutos()
    produtos.forEach(p => console.log(`Produto: ${p.nome} | Preço: R$ ${p.preco.toFixed(2)}`))

    const novo = {nome: 'Headset', preco: 250}
    produtos.push(novo)

    const criado = await cadastrarProduto(novo)
    console.log(`Produto ${criado.nome} criado com sucesso! Status: ${criado.status}`)

  }
  catch(e){
    console.log("Erro:", e.message)
  }
}
main()

// Questão 9
const crypto = require('crypto')

const criptografarMensagem = (texto, chaveSecreta) => {
  const algorithm = 'aes-256-cbc'
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(chaveSecreta), iv)
  let encrypted = cipher.update(texto, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  // Retorna o IV junto com o texto criptografado
  return iv.toString('hex') + ':' + encrypted
}

const processarNumeros = (numeros, callbackFunction) =>
  numeros
    .filter((numero) => numero % 2 === 0)       
    .map((numero) => callbackFunction(numero))   


const chaveSecreta = '12345678901234567890123456789012'

const numeros = [1, 2, 3, 4, 5, 6]


const resultado = processarNumeros(numeros, (numero) =>
  criptografarMensagem(String(numero), chaveSecreta),
)

console.log(resultado)
