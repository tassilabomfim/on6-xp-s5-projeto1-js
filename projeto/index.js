console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('             Tassila Bomfim         ')
console.log('--------------------------------------')

const db = require('./database')


// Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior). Utilize a lista contida no arquivo database.js

const { produtos } = db

produtos.sort((a, b) => a.preco - b.preco)


const read = require('readline-sync')

//Busca por categoria.

const verProdutos = read.question('Voce deseja encontrar o produto por categoria? (S / N) :')
if (verProdutos.toUpperCase() === 'S') {
    console.log('--------------------------------------')
    console.log('Essas são as nossas categorias:')
    console.log('Alimento, Bebida, Casa, Higiene, Informática')
    console.log('--------------------------------------')
    // for(let i = 0; i < produtos.length; i++){
    //     console.log(produtos[i].categoria);
    // }
    
    const qualCategoria = read.question('Voce esta procurando produtos de qual categoria? ')
    
    const categorias = produtos.filter(item => item.categoria === qualCategoria)
    
    console.table(categorias); 
} else { (verProdutos.toUpperCase() !== 'S') 
    console.log('Esses são nossos produtos disponiveis!')
    console.table(produtos)
}


console.log('--------------------------------------')


//- Calcular o valor do subtotal (sem considerar o desconto)


const array = new Array () // Nova lista para colocar os itens das compras 

class Pedido {
  constructor(array){
    this.products = array /// Caso exista o id as propriedade de ID e quantidade vão vim pra cá
    this.data = new Date()
    this.subtotal = 0 // Guarda o resultado da função "calcularSubtotal"
    this.totalDesconto = 0
    this.valorTotal = 0
    this.totalItens = 0
  }
  calcularSubtotal() { //Vai calculando o preço * quantidade de cada item das compras e no final retorna o valor total dos itens sem contar o desconto.
    this.subtotal = this.products.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0).toFixed(2)
  }

  calcularDesconto(desconto){
    this.totalDesconto = (this.subtotal * (desconto / 100)).toFixed(2)
  }

  calcularValorTotal(){
  this.valorTotal = (this.subtotal - this.totalDesconto).toFixed(2)
  }

  calcularTotalitens(){
    this.totalItens = this.products.reduce((acumulador, itens) => acumulador + itens.quantidade, 0)
  }  
}


//Receber via terminal as entradas de id e quantidade dos produtos a serem adquiridos.

let continuar
do  { 
    let idProduto = parseInt(read.question("Digite o id do produto desejado: "))
    while(idProduto < 0){
        idProduto = parseInt(read.question("Digite 0 id valido do produto desejado: "))
      }

    let quantidadeDesejada = parseInt(read.question('Digite a quantidade que gostaria de adquirir: '))
    while(quantidadeDesejada < 0){
        quantidadeDesejada = parseInt(read.question("Digite a quantidade que gostaria de adquirir: "))
      }

    function procurar(produto){ 
        return produto.id === idProduto // Verifica se o ID recebido existe no "produto"
      }
          
    const produtoEncontrado = produtos.find(procurar) // Encontra onde exatamente está o ID
          
    if(!produtoEncontrado){ // Verificar se o id existe
        console.log('Erro. Produto não encontrado!')// se o ID não exite aparece essa mensagem
      }else{
        const produtoPedido= { ...produtoEncontrado, quantidade: quantidadeDesejada} // se o ID existe vai para esse novo objeto
        array.push(produtoPedido) // o novo objeto vai para dentro do array que foi criado antes da classe
        console.log('Incluido no carrinho!')
      }

    console.log('--------------------------------------')

    continuar = read.question('Deseja continuar comprando? (S ou N) : ')
    
} while (continuar.toUpperCase() === 'S') 


console.log('--------------------------------------')
console.log('            Pedido encerrado!         ')
console.log('--------------------------------------')


//Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto.


let desconto = 0
const cupom = parseInt(read.question('Possui cupom de desconto? 1 - sim ou 2- nao: '))

if (cupom === 1) {
   desconto = read.question('Digite o valor do cupom: ')
   if (desconto <= 15 && desconto > 0) {
        console.log(`Voce possui ${desconto} % de desconto.`)
        console.log('--------------------------------------')
        console.log('--------------------------------------')
    }else {
        console.log('Cumpom nao esta ativo!');
        console.log('--------------------------------------')
        console.log('--------------------------------------')
    }
} else if (cupom === 2) {
    console.log('Você nao possui cupom de desconto!')
    console.log('--------------------------------------')
    console.log('--------------------------------------')

}else {
    console.log('Opção invalida!');
    console.log('--------------------------------------')
    console.log('--------------------------------------')
}



const pedido = new Pedido (array)// Joga o array com os push dentro da classe "Pedido"
console.table(pedido.products) // Verificando se deu certo o array dentro da classe 

pedido.calcularSubtotal() // chamando a função "calcularSubtotal"
console.log(`Subtotal: R$ ${pedido.subtotal}`) // Vendo o resultado da função "calcularSubtotal" qu está guardada dentro do subtotal

pedido.calcularDesconto(desconto)
console.log(`Desconto: R$ ${pedido.totalDesconto}`);

console.log('--------------------------------------')

pedido.calcularValorTotal()
pedido.calcularTotalitens()
console.log(`Seu pedio possui ${pedido.totalItens} itens.`)
console.log(`Total a pagar: R$ ${pedido.valorTotal}`);