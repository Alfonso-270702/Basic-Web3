const assert = require("assert");
const ganache = require("ganache-cli");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Halo'


beforeEach(async () => {
  // Get a list of accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ from: accounts[0], gas: '1000000', gasPrice: '20000000000'});
});

describe("Inbox", () => {
  it("deploys contract", () => {
    assert.ok(inbox.options.address); 
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    // console.log(message)
    assert.equal(message, INITIAL_MESSAGE);
  });

  it('can change the message', async () => { 
    await inbox.methods.setMessage('Hai').send({ from: accounts[0], gas: '1000000', gasPrice: '20000000000'});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hai')
  })
});