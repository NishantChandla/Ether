const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
const compiled = require('./build/Donations.json');


const provider = new HDWalletProvider(
    "mandate hurry hungry shoulder liar breeze split weasel wife inform gift silk",
    "https://rinkeby.infura.io/v3/f701ffdec14c4a0086770e9fc6245a34"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const account = await web3.eth.getAccounts();
    console.log(account[0]);
    // const result = await new web3.eth.Contract(
    //     JSON.parse(compiled.interface)
    // )
    //     .deploy({ data: compiled.bytecode }).send({ gas: '1000000', from: account[0] });
    let contract = new web3.eth.Contract(JSON.parse(compiled.interface));
    await contract.deploy({
        data: compiled.bytecode,
        arguments: [100, account[0]]
    })
        .send({
            from: account[0],
            gas: 1500000,
        }, function(error, transactionHash){  })
        .on('error', function(error){ })
        .on('transactionHash', function(transactionHash){})
        .on('receipt', function(receipt){
           console.log(receipt.contractAddress) // contains the new contract address
        })
        .on('confirmation', function(confirmationNumber, receipt){ })
        .then(function(newContractInstance){
            console.log(newContractInstance.options.address) // instance with the new contract address
        });
        
    await console.log(' addresss', contract.options.address);
}
deploy();