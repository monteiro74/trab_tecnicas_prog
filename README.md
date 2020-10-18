# trab_tecnicas_prog
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

