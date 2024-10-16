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
