// define o provider como sendo localhost na porta 8545
if (typeof web3 !== 'undefined') {
        var web3 = new Web3(web3.currentProvider);
} else {
        var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Contrato1.options.jsonInterface = [ { "constant": true, "inputs": [], "name": "getContrato", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "novoCodigo1", "type": "string" }, { "name": "novoCodigo2", "type": "uint256" } ], "name": "setContrato", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ];
ABI = [ { "constant": false, "inputs": [ { "name": "novoCodigo1", "type": "string" }, { "name": "novoCodigo2", "type": "string" } ], "name": "setContrato", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getContrato", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" } ] ;

// Contrato1.options.address = '0x1EB78a500d4b1BD596FC071Ec635DE0A0Ed68Ec7';
endereco = '0x3c3dbF9C01D891a10619dB50D2F87BEcA65fa165';

// cria a instancia do contrato1
var Contrato1 = new web3.eth.Contract( ABI, endereco 
       , { from: '0xa340621822b847ecc85ad77cd8ab61b316dae42a', gasPrice: '20000000000', gas: 1000000 }
);

// testa o get no console log
Contrato1.methods.getContrato().call().then(console.log);

// testa o get no console log
Contrato1.methods.getContrato().call( { from: '0xa340621822b847ecc85ad77cd8ab61b316dae42a'}, 
      function(error, result){
        if(!error)
            {
                $("#Formulario").html(result[0]+' ('+result[1]+' fim)');
                console.log(result);
            } else console.error(error);
});

$("#button1").click(function(){
     // alert("Aviso 1.");

     var Codigo1 = $("#codigo1").val();
     var Codigo2 = $("#codigo2").val();
     Contrato1.methods.setContrato(   Codigo1,  Codigo2 ).send();

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

