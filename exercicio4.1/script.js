// Questão 1
function minhaPromise(palavra, segundos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (palavra.length == 13) {
        reject(`Rejeita ${palavra}`);
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
