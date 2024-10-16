# saffron
dApp with decentralised centralised computing for HackSecret4 Hackathon

## Authors
Tom Barthelmeh
Geordie Gibson
Daniel Neal

## Set Up

- Setup your Local Secret Network Environment
https://docs.scrt.network/secret-network-documentation/development/readme-1/setting-up-your-environment

Ensure you have a wallet set up with enough funds.

## Step One

We need to instantiate three SNIP-20 contracts to act as our supported coins within the app (Secret, Ethereum, Shade)

Please refer here for any trouble during these steps: https://docs.scrt.network/secret-network-documentation/development/development-concepts/create-your-own-snip-20-token-on-secret-network

Inside the snip20-contract folder, build and upload the contract to your local network running in Docker. Please ensure you compile with the Docker command rather than make build.

Next we need to instantiate it three times to create our tokens. Please copy these commands exactly! During this please take note of the code hash and contract address for each token.

You can run this to get the contract address for each coin:

```
secretcli query compute list-contract-by-code <contract_id>
```

Coin One:
```
secretcli tx compute instantiate <contract_id> '{
  "name": "Secret",
  "symbol": "SCRT",
  "decimals": 6,
  "prng_seed": "'"$(echo -n 'Something really random' | base64)"'",
  "admin": "<your_wallet_address>",
  "initial_balances": [
    {
      "address": "<your_wallet_address>",
      "amount": "1000000000"
    }
  ]
}' --from myWallet --label coin -y
```

Coin Two:
```
secretcli tx compute instantiate <contract_id> '{
  "name": "Ethereum",
  "symbol": "ETH",
  "decimals": 6,
  "prng_seed": "'"$(echo -n 'Something really random' | base64)"'",
  "admin": "<your_wallet_address>",
  "initial_balances": [
    {
      "address": "<your_wallet_address>",
      "amount": "1000000000"
    }
  ]
}' --from myWallet --label coin -y
```

Coin Three:
```
secretcli tx compute instantiate <contract_id> '{
  "name": "Shade",
  "symbol": "SHD",
  "decimals": 6,
  "prng_seed": "'"$(echo -n 'Something really random' | base64)"'",
  "admin": "<your_wallet_address>",
  "initial_balances": [
    {
      "address": "<your_wallet_address>",
      "amount": "1000000000"
    }
  ]
}' --from myWallet --label coin -y
```

### Step Two
Then within the www directory (the React client) create a .env file containing the following with your recorded hash and contract addresses

```
VITE_COIN_contractCodeHash = ""

VITE_SCRT_contractAddress = ""
VITE_ETH_contractAddress = ""
VITE_SHD_contractAddress = ""
```

Within the contract directory (our Secret Network contract), in contract.rs add these hash and coin addresses to the following variables:

```
let coin_hash = "";
let scrt_addr = "";
let eth_addr = "";
let shd_addr = "";
let nft_hash = "";
let nft_addr = "";
```

AS WELL AS on lines 172 and 182-183 and 195. 

### Step Three

Now we need to do the same with NFT's.

Within the snip721-contract directory, compile and upload the contract to your local Docker network.

Then instantiate a new NFT collection using the following command:

```
secretcli tx compute instantiate <contract_id> '{
  "name": "Critter NFT",
  "symbol": "CRITTER",
  "entropy": "'"$(openssl rand -hex 20)"'",
  "config": {
    "public_token_supply": true
  },
  "admin": "<your_wallet_address>"
}' --from myWallet --label "test contract'"$(echo $((RANDOM * 10000000)))"'" --gas 400000 --yes
```

Make sure to record the contract_hash and contract_address. Then add them within the contract directory (contract.rs):

```
let coin_hash = "";
let scrt_addr = "";
let eth_addr = "";
let shd_addr = "";
let nft_hash = "";
let nft_addr = "";
```

AS WELL AS on lines 172 and 182-183 and 195. 

and within the www directory .env:

```
VITE_nftContractAddress=""
VITE_nftContractCodeHash=""
```

### Step Four

Now we can finally compile our own contract within the contract directory. You can compile, upload and instantiate using default commands. However please ensure you compile with the docker command and not make build :)

Within www add our contract address and hash as the following in the .env file:
```
VITE_contractAddress = ""
VITE_contractCodeHash = ""
```

Then within www run

```
npm run dev
```

to start the React client.

### Step Five

Finally you can add your local wallet to Keplr and you should be good to go :) 

You can also add the created coins to your wallet if you want to see your balance increase / decrease as you perform trades.

We understand this is extremely janky, but would all be resolved on mainnet where the coin and nft addr/hashes are constant.












- Compile and Deploy to your Local Secret Network in Docker
Follow the below steps for creating and adding funds to your wallet (Do not run any docker commands) then return to this README
https://docs.scrt.network/secret-network-documentation/development/readme-1/compile-and-deploy









Put mnemonic into an .env file in www and then run the following commands:
## Adding SNIP-20 Coins
```
cd snip20-contract
sed -i 's/\r$//' instantiate_snip20.sh
./instantiate_snip20.sh
# If you get the following "Error: strconv.ParseUint: parsing "": invalid syntax" ADd some funds to your wallet
```
Then add the values given into the .env file as
```
VITE_coinContractAddress="secret1rbj..."
VITE_coinContractCodeHash=""
```
Then in contract/contract.rs
```
// Register for SNIP-20 callback
    let register_msg = register_receive_msg(
        env.contract.code_hash.clone(), 
        None, 
        256, 
        "c74bc4b0406507257ed033caa922272023ab013b0c74330efc16569528fa34fe".to_string(), // Change me to  what ever your coin code was 
        "secret1x0c5ewh0h4ts70yrj00snquqklff2ufrjwgswf".to_string(), // Change me to  what ever your coin contract address was 
    )?;
```

## Adding SNIP-721 NFTs
```
cd .. # Into the root (saffron) 
cd snip721-basic
sudo docker run --rm -v "$(pwd)":/contract \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  enigmampc/secret-contract-optimizer 
cd pulsar-scripts
```
Add a `.env` file with `MNEMONIC=enter your mnemonic here for your wallet` (inside snip721-basic/pulsar-scripts)
```
npm install
npm run build
npm run upload
npm run instantiate <CODE_ID> <CODE_HASH>
```
Then add the values given into the .env file in www as
```
VITE_nftContractAddress="secret1rbj..."
VITE_nftContractCodeHash=""
```
Then run to generate usable nfts:
```
npm run examples <CONTRACT_ADDRESS> <CODE_HASH>
```
Then in contract/contract.rs
```
// Register for SNIP-20 callback
    let register_nft_msg = register_receive_nft_msg(
        env.contract.code_hash.clone(), 
        None,
        None, 
        256, 
        "773c39a4b75d87c4d04b6cfe16d32cd5136271447e231b342f7467177c363ca8".to_string(), // Change me to  what ever your nft code was
        "secret15n4jukv4y5rv6g5fnwjyuzj7jq409wkvert5ht".to_string(), // Change me to what ever your nft contact address was
    )?;
```

finally
```
cd ../.. # So you are in saffron
cd contract
sed -i 's/\r$//' instantiate.sh
./instantiate.sh
``` 
Then add the values given into the .env file as
```
VITE_contractAddress="secret1rbj..."
VITE_contractCodeHash="" # 64 chars of your contract code hash
```
- Setup Enivornment Varialbles in www

  Your final .env in www should look like:
  ```
  VITE_mnemonic="banana cat ..." # 24 words of your SECRET mnemonic
  VITE_contractAddress="secret1rbj..."
  VITE_contractCodeHash="" # 64 chars of your contract code hash

  VITE_coinContractAddress="secret1rbj..."
  VITE_coinContractCodeHash=""

  VITE_nftContractAddress="secret1rbj..."
  VITE_nftContractCodeHash=""
  ```
  Note: these adresses and code hashs must be all different if they are not you may have encountered an error somewhere

- Set up npm dependencies in saffron/www
    ```
    npm install
    ```
## Running the app

  - Running
    ```
    npm run dev
    ```
