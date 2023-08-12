# LOTTERY SMART CONTRACT
This is a simple project to meet some requirements of a lottery.

## Compile
To complie:

- `truffle compile`

## Tests
There are some tests in this project, to run this tests execute this commands:
- start the blockchain network, for instance: `truffle develop` 
    <sub>develop config is present in `truffe-config.js`</sub>
- deploy the smart contract in the network: `truffle migrate --network develop`
- start the truffle console in the network: `truffe console --network develop`
- Next execute each line of the script below.

## Run
To execute this smart contract we recomend to use this following script:
```js
const instance = await Lottery.deployed()
const accounts = await web3.eth.getAccounts()
const accountsCopy = [... accounts]
await instance.defineAdmin(accountsCopy[0])
const players = accountsCopy.slice(1)
await instance.bet(players)
await instance.numOfPlayers()
await instance.getPlayers()
await instance.pickWinner()
await instance.getLastWinner()
```