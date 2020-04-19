import Web3 from "web3";
import HDWalletProvider from 'truffle-hdwallet-provider'
var web3;



if(typeof window !== 'undefined'&& typeof window.web3 != 'undefined'){
    console.log("runntting")
    web3= new Web3(window.web3.currentProvider);

}else{
    console.log("running")
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/f701ffdec14c4a0086770e9fc6245a34"
    );
    web3= new Web3(provider);
}

export default web3;