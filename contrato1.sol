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


