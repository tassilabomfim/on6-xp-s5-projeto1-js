console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const db = require('./database')


// Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior). Utilize a lista contida no arquivo database.js

const { produtos } = db

produtos.sort((a, b) => a.preco - b.preco)
console.table(produtos)


//Receber via terminal as entradas de id e quantidade dos produtos a serem adquiridos.

const read = require('readline-sync')

let continuar

do  { 
    const idProduto = parseInt(read.question("Digite o id do produto desejado: "))
    const quantidadeDesejada = parseInt(read.question('Digite a quantidade que gostaria de adquirir: '))
    continuar = read.question('Deseja continuar comprando? (S ou N) : ')
    
} while (continuar.toUpperCase() === 'S') r



//Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto.


let desconto
const cupom = parseInt(read.question('Possui cupom de desconto? 1 - sim ou 2- nao: '))

if (cupom === 1) {
   desconto = read.question('Digite o valor do cupom: ')
   console.log(`Voce possui ${desconto} % de desconto.`)
} else {
    console.log('Você nao possui cupom de desconto!')
}



// while(desconto > 15){
//     cupom = parseInt(read.question("Cupom não disponível"))
//   }

// //- Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto.
// const cupom = parseInt(read.question("Digite o valor do seu cupom de desconto: ")) // Recebendo o valor do cupom



//- Calcular o valor do subtotal (sem considerar o desconto)
// calculei dentro da classe usando a função "calcularSubtotal"

//- Calcular o valor de desconto
// const desconto = (cupom > 0 && cupom <= 15) ? pedido.subtotal * (cupom / 100) : 0
// console.log(`Valor do desconto: R$ ${desconto}`)

// //- Calcular o valor total (considerando o desconto do cupom)
// const valorTotal = pedido.subtotal - desconto
// console.log(`Valor total: R$ ${valorTotal}`)
