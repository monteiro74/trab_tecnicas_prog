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

