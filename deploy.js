require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3')
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    process.env.SEED_PHRASES_CREDENTIAL,
    'https://sepolia.infura.io/v3/15754777090d4fec8f695a03e2f313ea'
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('Deploying from account', accounts[0]);

    const deployContract = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Halo'],
    })
    .send({ from: accounts[0], gas: '1000000', gasPrice: '20000000000'})

    console.log('Contract deployed to',deployContract.options.address);
    provider.engine.stop()
}

deploy()

