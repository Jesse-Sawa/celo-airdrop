# celo-airdrop
A boilerplate guide to deploying an erc-20 token airdrop on Celo. This tutorial was inspired by uniswaps's merkle token distributor.

## You will 

- Deploy an Airdrop smart contract to Alfajores (Celo's testnet)
- Claimed the Airdrop


## Pre-requistes
1. Truffle v5.5.10 installed [npm install -g truffle@5.4.0]](https://trufflesuite.com/docs/truffle/getting-started/installation/)
2. Simple understanding of nodejs
3. Clone this repository & install dependencies


## Step 1 of 6
---

* Fund your Celo address using the [Alfajores faucet](https://celo.org/developers/faucet). (to generate a new key pair, run *node tutorial/createAccount.js* from the root directory)

* Afterwords create the **.env** file by running the following command;

    ```
        cp .env.example .env
    ```

* Finally, paste your pulic and private address to the corresponding keys in the **.env** file.

## Step 2 of 6
---

Let's add an address eligbility list and generate the file containing the coresponding root and proofs.

  * The list should contain a simple mapping of addresses and values defined in WEI. For the sake of this tutorial, there is an example elgibility list under the *tutorial* directory you can use instead. If you decide to use the example list, nothing more here needs to be done otherwise, add a file with the same format.
  
## Step 3 of 6
---
Now, we generate the file containing the Merkle root and corresponding proofs that will be used to create the contract as well as claim the tokens.

Under scrips/merkle-tree directory there is a file called *generate-merkle-root.ts* 

This file takes a path to the elgbility-list we specified in the previus step as a parameter. The output is another file called *generated-merkle-root.json* in the root directory which will contain details such as the merkle root, elgible addresses and respective proofs, etc.

Here's the command to execute (from the root directory) using the path to the example eligbility list;

```
    ts-node scripts/merkle-tree/generate-merkle-root.ts -i tutorial/example-eligibility-list.json
```

## Step 3 of 6
---
Create the [migration](https://trufflesuite.com/docs/truffle/getting-started/running-migrations/) file that truffle will use to deploy the airdrop contract. 

For the sake of this tutorial, I have already created the mirgation file; it's called *2_deploy_airdrop.js* under the *migrations* directory. All that's left to do is fill in the values. 

> At this point, if you have not looked at the *Airdrop.sol* file under the *contracts* directory, now would be a good time to do so. Notice the constructer takes requires two parameters; the erc20 token address and the merkle root. These are immutable parameters that are set when the contract is created.

Okay, now open the file **2_deploy_airdrop.js** under the **migrations** directory. You will notice a method being called **deploy** that accepts two paramters. These params correspond to the constructor in the Airdrop contract.

> When creating this tutorial, I used the Celo token address on Alfajores, but you can use any other erc20 token if you'd like. Just know that the contract will have to be funded with that token.

Set the first param to the token address and the second parm to the merkle root (get this from the file we generated in step 2 *generated-merkle-root.json*).

The file should look similar to this;

```
var Airdrop = artifacts.require("Airdrop");

module.exports = function (deployer) {
  deployer.deploy(
    Airdrop,
    "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
    "0x7ecb997833ad5774cf633610d0fab6ba8cc826f1e910596b2c3943899fadcdef"
  );
};

```


## Step 4 of 6
---
Now for the fun part 😎

Make sure there is sufficent $celo belonging to the public key you pasted in the .env file in step 1 -> We need it to pay for gas. 

Run the following command from the root directory to deploy the Airrop contract to Alfajores (the network details are stored in truffle.js)
```
    truffle migrate --network alfajores
```

The output should look similar to the following

```
Compiling your contracts...
===========================
✓ Fetching solc version list from solc-bin. Attempt #1
✓ Fetching solc version list from solc-bin. Attempt #1
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'alfajores'
> Network id:      44787
> Block gas limit: 0 (0x0)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x875e0f90891f1f13dd496daf834e7845d6bb99c667c5d12be0c1eff7a916fddb
   > Blocks: 0            Seconds: 4
   > contract address:    0x0AB84f18f849CFaC49197aD804234e3aFeaEbBa3
   > block number:        11041293
   > block timestamp:     1650565018
   > account:             0x0659f79530111c8b584af5EF499c4AfeD79a04DF
   > balance:             5.997212372719476753
   > gas used:            186963 (0x2da53)
   > gas price:           0.5 gwei
   > value sent:          0 ETH
   > total cost:          0.0000934815 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:        0.0000934815 ETH


2_deploy_airdrop.js
===================

   Replacing 'Airdrop'
   -------------------
   > transaction hash:    0x4316900454594ef2ddf807f4c8a6c76412c9952dfc2b3581ae46cef8ded7c264
   > Blocks: 1            Seconds: 4
   > contract address:    0x23047531b51eE8Cb044AF18B87365B9De1DF5aF7
   > block number:        11041295
   > block timestamp:     1650565028
   > account:             0x0659f79530111c8b584af5EF499c4AfeD79a04DF
   > balance:             5.996972759219476753
   > gas used:            436092 (0x6a77c)
   > gas price:           0.5 gwei
   > value sent:          0 ETH
   > total cost:          0.000218046 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.000218046 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.0003115275 ETH
```

(Don't clear your terminal 👀)

## Step 5 of 6
At this point, we have 

1. Created a Merkle tree with addresses and corresponding values
2. Deployed an Airdrop contract to Alfajores

Next, we need to fund the contract

Get the contract address from the output of the command you ran in step 4

> Mine would be 0x23047531b51eE8Cb044AF18B87365B9De1DF5aF7

If you are using a token other than Celo or one of it's stable coins, you'll need to send a sufficent amount to that address to accomadate for this airdrop. Otherwise, head back over to the [Alfajores faucet](https://celo.org/developers/faucet) and fund the contract address.

Make sure to confrim the contract address has the funds by visiting the [blockscout](https://alfajores-blockscout.celo-testnet.org/)

## Step 6 of 6
---
Time to get that 💰

To claim for every address specified in the elgibility list, run the following command with the path to the *generate-merkle-root.ts* file

```
 ts-node scripts/contract-interaction/claim-airdrop.ts -i generated-merkle-root.json
```

To calim for only one specifed address, just add the **-a** flag followed by the address e.g.
```
 ts-node scripts/contract-interaction/claim-airdrop.ts -i generated-merkle-root.json -a 0x0659f79530111c8b584af5EF499c4AfeD79a04DF
```


