const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

var input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts["Inbox.sol"]["Inbox"]);

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Inbox.sol"]["Inbox"]

// const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
// const abi = compiled.contracts['Inbox.sol'].Inbox.abi;
// const evm = compiled.contracts['Inbox.sol'].Inbox.evm;

// module.exports = { abi, evm };
