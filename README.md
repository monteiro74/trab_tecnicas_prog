Trabalho de técnicas de programação

Registros de transações em uma cadeia de fornecimento reversa usando blockchain.
Versão: 2.0, Outubro/2020
2ª Entrega.

Aluno: Emiliano S. Monteiro
Professor da disciplina: Rodolfo Stoffel Antunes
Técnicas de programação - PPGCA - Unisinos.
Professor orientador: Rodrigo da Rosa Righi

1. Contexto.

Determinados produtos (dada sua natureza) necessitam que seu trânsito na cadeia de suprimentos seja monitorado, são exemplos destes produtos: pilhas, baterias, lâmpadas fluorescentes, medicamentos etc. Outros produtos necessitam além do acompanhamento do seu trânsito, que este trajeto seja público como medicamentos financiados pelo governo, compras públicas etc. As blockchains tratam produtos como ativos; A capacidade das blockchain de receber e manter transações imutáveis se apresenta como uma tecnologia viável para o registro destas movimentações destes ativos.

2. Descrição da solução.

Foi desenvolvido um protótipo de software para simular a recepção de dados, envio de dados para blockchain e exibição dos mesmos. A blockchain escolhida foi o Ethereum rodando em um nó privado. O nó privado foi configurado usando TestRPC . O código gerado para a blockchain Ethereum foi escrito em Solidity, a interface com o usuário foi feita em HTML, Jquery e Javascript. 

3. Arquitetura do protótipo

O protótipo foi construído para permitir testar conceitos. O principal era a troca de dados entre aplicação cliente e a blockchain. A aplicação cliente é também chamada de dApp (ou aplicação descentralizada), esta aplicação pode rodar em qualquer dispositivo geralmente em um navegador. Por outro lado (server side) temos a aplicação “servidor”, no caso a blockchain que atende as requisições dos clientes (dApps). A ligação entre cliente e servidor se dá por chamadas RPC (Remote Procedure Call). A arquitetura do protótipo foi configurada em uma máquina local para testes, porém como o servidor escuta portas RPC um ambiente de rede com máquinas virtuais ou reais também poderia ter sido utilizado para testes. O lado cliente é composto por uma simples interface com o usuário feita em HTML e Jquery. O cliente deve ter no seu código javascript um Provider, que é o responsável por criar a ligação com o servidor e um código ABI (Application Binary Interface). A ABI é responsável pela padronização, para interações com o contrato, esta é descrita em JSON (JavaScript Object Notation). O nó necessita da biblioteca web3.js, o qual permite que o nó Ethereum possa interagir via Http (Hypertext Transfer Protocol) ou RPC com os clientes. A biblioteca web3.js deve ser instalada via node.js  e deve estar presente no lado cliente. O nó Ethereum necessita ter a uma porta TPC (Transmission Control Protocol) disponível (geralmente é a 8545) e um local em disco para guardar os blocos que compõe a blockchain. A blockchain utiliza no armazenamento “trie” (digital tree ou prefix tree) como estruturas de dados, é uma estrutura de árvore. A rede Ethereum é uma rede pública na qual são necessários Eth (dinheiro) para processar transações, por isto não foi utilizada. Apesar de existirem redes Ethereum públicas para testes como Ropsten, Kovan, Rinkeby e Goerli, neste cenário foi optado pela configuração de um nó privado local. A figura 1, apresenta a arquitetura.

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/arquitetura.jpg?raw=true)

4. Configuração do ambiente

Para a montagem do nó local privado foi utilizado o programa de linha de comando, TestRPC. Ao rodar o TestRPC, especificamos uma certa quantidade de contas (5), quantidade de Ether (100) e o número de porta: 8545. Exemplo: 

TestRPC --db C:\Doutorado2\programacao\ethereum\teste5\db -i rede123 -p 8545 --accounts 5 --defaultBalanceEther 100 -m "FraseMnemonicParaASenha"

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/tela2.jpg?raw=true)

Figura 2, TestRPC rodando.

A figura 2, apresenta a saída do comando TestRPC no prompt do node.js, pode ver as 5 contas que foram criadas e suas chaves privadas, e por último uma mensagem dizendo que o programa está escutando a porta 8545.

Os testes do programa em Solidity foram executados em uma IDE online gratuita, Remix. Veja figura 3, abaixo:

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/solidity.png?raw=true)

Figura 3, IDE online Remix.

Uma vez compilado o código do smart contract no Remix, este era testado dentro da IDE. A IDE Remix foi configurada para se conectar com o nó local privado e posteriormente era feito o deploy do smart contract no nó local. A IDE também foi utilizada para fornecer o endereço de deploy do contrato e código ABI. Para a configuração do cliente foi necessário instalar o node.js e o web3.js. O node.js foi instalado no sistema operacional (Windows 10) e o web3.js deve ser instalado na pasta de desenvolvimento da aplicação.

5. Códigos no lado servidor

O código servidor é composto por uma classe chamada Contrato1, a qual contém duas variáveis do tipo string (código1 e código2), que podem receber qualquer valor que o usuário desejar neste momento, futuramente poderia ser campos de uma estrutura com nomes como: chaveDaNFe  e número NCM . Selecionamos string e não números para que o protótipo possa ser adaptado para outros fins durante os testes com códigos alfa numéricos. A classe contrato tem dois métodos: setContrato e getContrato. setContrato é utilizado para receber da aplicação do usuário dois valores e gravá-los na blockchain. getContrato é utilizado para recuperar valores. A linha pragma é utilizada para fixar a versão do compilador. Figura 4.

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/contrato.png?raw=true)

Figura 4, código do smart contract.

Conforme o cliente vai interagindo com o servidor, o nó Ethereum vai guardando as transações em blocos no disco. A figura 5, a seguir mostra blocos já processados e gravados como arquivos.

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/blocos.png?raw=true)

Figura 5, blocos no disco.

6. Códigos no lado cliente

O código cliente está dividido em uma simples página html para mostrar os campos para o usuário interagir e o código javascript que realiza o trabalho mais importante interagindo com o lado servidor. O código possui o provider, o ABI e as chamadas aos métodos, veja figura 6.

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/tela3.jpg?raw=true)

Figura 6, primeira parte do código javascript.

A ABI é uma string de caracteres bastante grande (estará nos anexos). A primeira parte do código está comentado na figura 6. As linhas de 1 a 6 contém o “provider” para abrir a conexão com o servidor. As linhas 8 a 12 contém as variáveis usadas como parâmetros para a criação do contrato. As linhas 15 a 17 apresentam a criação da instância do objeto Contrato1. A linha 20 envia uma mensagem ao console log para que se possa verificar a conexão. As linhas 23 a 30 acionam o método getContrato recuperando os 2 valores (as strings código1 e codigo2) da blockchain, o resultado é mostrado no formulário html e no console log. A segunda parte do código (Figura 7), linhas 32 a 55, contém o código acionado por um botão que realiza duas operações: entre as linhas 35 a 37 envia dados para a blockchain utilizando o método setContrato, o qual contém, dois parâmetros (Codigo1 e Codigo2). E entre as linhas 40 a 53 mostra no console log o que já foi enviado.

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/tela4.jpg?raw=true)

Figura 7, apresenta o uso do método setContrato e envia dados para o console log.

O código da interface com o usuário é apresentado na Figura 8. Na linha 7 é chamada a biblioteca web3.js. As linhas 11 a 18 apresentam uma simples interface com o usuário. A linha 22 faz a chamada aos códigos javascript, que estão no arquivo script1.js, estes foram comentados previamente nas figuras 6 e 7.

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/tela5.jpg?raw=true)

Figura 8, formulário HTML, chamada ao web3js e ao script script1.js.

Na interface o usuário pode digitar duas strings ou qualquer valor, pressionar o botão “Atualizar” o qual aciona o método set, recupera (via get) dados da blockchain, mostra os mesmos dados no console log, quando a página é recarregada o get recupera os últimos códigos enviados e apresenta na seção Formulário. Veja na figura 9.

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/tela6.jpg?raw=true)

Figura 9, interface do protótipo e resultados na console log.

6.1. Aplicabilidade da UX (dApp)

As interfaces com os usuários utilizadas nas dApps, geralmente são feitas em HTML e javascript, outro exemplo é o plugin para navegadores Metamask, utilizada como carteira para interagir com as redes Ethereum. A principal vantagem no projeto de uma rede blockchain privada é que o cliente necessita apenas de um navegador para acessar a blockchain. Com uma instalação de servidores Apaches  apresentando uma página que pode ser direcionada para um formulário que acessa a blockchain ou os sistemas web podem importar a web3js e fazer chamadas diretamente a blockchain. Figura 10, apresenta esta possível configuração.

![alt text](https://github.com/monteiro74/trab_tecnicas_prog/blob/main/arquitetura2.png?raw=true)

Figura 10, possível configuração das dApps em um ambiente distribuído.

7. Trabalhos futuros

A. Implementar mais funcionalidades na dApp cliente como consultas e exibição de dados.
B. Implementar um login antes do usuário ter acesso direto a página do formulário que interage com a blockchain.
C. Adicionar mais nós Ethereum ao ambiente de testes.
D. Trocar o TestRPC pelo geth, pois o TestRPC foi descontinuado.


------------------------------------------------------------------

[![Watch the video](https://youtu.be/GeVtvkZ3rqQ)


------------------------------------------------------------------


O código fonte encontra-se nos arquivos: script1.js e contrato1.sol.




------------------------------------------------------------------
Anexos, código fonte.

Anexo I – código ABI

ABI = [ { "constant": false, "inputs": [ { "name": "novoCodigo1", "type": "string" }, { "name": "novoCodigo2", "type": "string" } ], "name": "setContrato", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getContrato", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" } ] ;

------------------------------------------------------------------
Anexo II – Código do smart contract

pragma solidity ^0.4.18;
contract Contrato1 {
    
    string codigo1 = "codigo1";
    string codigo2 = "codigo2";
    function setContrato(string novoCodigo1, string novoCodigo2) public {
        codigo1 = novoCodigo1;
        codigo2 = novoCodigo2;
    }
    function getContrato() public view returns (string, string) {
        return (codigo1, codigo2);
    }
}

------------------------------------------------------------------
Anexo III – Código javascript 

//
// define o provider como sendo localhost na porta 8545
if (typeof web3 !== 'undefined') {
        var web3 = new Web3(web3.currentProvider);
} else {
        var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
//
ABI = [ { "constant": false, "inputs": [ { "name": "novoCodigo1", "type": "string" }, { "name": "novoCodigo2", "type": "string" } ], "name": "setContrato", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getContrato", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" } ] ;
//
// Contrato1.options.address = '0x1EB78a500d4b1BD596FC071Ec635DE0A0Ed68Ec7';
endereco = '0x3c3dbF9C01D891a10619dB50D2F87BEcA65fa165';
//
// cria a instancia do contrato1
var Contrato1 = new web3.eth.Contract( ABI, endereco 
       , { from: '0xa340621822b847ecc85ad77cd8ab61b316dae42a', gasPrice: '20000000000', gas: 1000000 }
);
//
// testa o get no console log
Contrato1.methods.getContrato().call().then(console.log);
//
// testa o get no console log
Contrato1.methods.getContrato().call( { from: '0xa340621822b847ecc85ad77cd8ab61b316dae42a'}, 
      function(error, result){
        if(!error)
            {
                $("#Formulario").html(result[0]+' ('+result[1]+' fim)');
                console.log(result);
            } else console.error(error);
});
//
$("#button1").click(function(){
     // alert("Aviso 1.");
     var Codigo1 = $("#codigo1").val();
     var Codigo2 = $("#codigo2").val();
     Contrato1.methods.setContrato(   Codigo1,  Codigo2 ).send();
//
// Envia blocos processados para o console.log  ---------------     
web3.eth.getTransactionCount("0xa340621822b847ecc85ad77cd8ab61b316dae42a")
.then((b=console.log)=>{
     console.log(b)
     for(var i=0;i<b;i++){
            web3.eth.getBlock(b-i).then((Block)=>
            { a =[ Block.hash ]
              console.log(a);
              var  iterator =a.values()
              for (let elements of iterator) { 
                  web3.eth.getTransactionFromBlock(elements).then(console.log)
               } 
            });
        }
     });
});
