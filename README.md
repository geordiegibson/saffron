# saffron
dApp with decentralised centralised computing for HackSecret4 Hackathon

## Authors
Tom Barthelmeh
Geordie Gibson
Daniel Neal

## Set Up

- Setup your Secret Network Environment
https://docs.scrt.network/secret-network-documentation/development/readme-1/setting-up-your-environment

- Compile and Deploy to your Local Secret Network in Docker
https://docs.scrt.network/secret-network-documentation/development/readme-1/compile-and-deploy

- Setup Enivornment Varialbles in www

  Create a .env file in the root of www. These variables will be displayed in the creation of your Local Secret Network Setup:
  ```
  VITE_mnemonic="banana cat ..." # 24 words of your SECRET mnemonic
  VITE_contractAddress="secret1rbj..."
  VITE_contractCodeHash="" # 64 chars of your contract code hash
  ```
- Set up npm dependencies
    ```
    npm install
    ```
## Running the app

  - Running
    ```
    npm run dev
    ```

## Adding SNIP-20 Coins

Clone this existing SNIP-20 template: https://github.com/scrtlabs/snip20-reference-impl

Build the contract: 
```
make compile-optimized
```

When compiling the contract you may get an error. I was able to resolve this with the following command (mac):
```
brew install binaryen
```

Upload the contract to your local network:
```
secretcli tx compute store contract.wasm.gz --gas 5000000 --from myWallet --chain-id secretdev-1
```

Instantiate your contract to create a new coin, this is a coin called Zebra:
```
secretcli tx compute instantiate <contract_number> '{"name": "Zebra", "symbol": "ZBRA", "decimals": 6, "prng_seed": "'"$(echo -n 'Something really random' | base64)"'", "admin": "<your_wallet_address>", "initial_balances": [{"address": "<your_wallet_address", "amount": "1000000000"}]}' --from <your_wallet_name> --label coin -y
```

During this process you will want to store the contract_address and contract_hash :)

Now you shoud have 1,000,000,000 of the coin you just created in your wallet. You can confirm this by querying your balance on the contract.

Before you can do that you need to first create a viewing_key for your account on the contract. You can do this with the following command:
```
secretcli tx compute execute "<coin_contract_address" '{"set_viewing_key": {"key": "<whatever_you_want_your_key_to_be"}}' --from <your_wallet_name> --gas 200000
```

Then you can query your balance with the following:

```
secretcli query snip20 balance "<coin_contract_address" "<your_wallet_address>" "<viewing_key>"
```

This should return something like the following confirming you now have 1 billion of your newly created coin available in your wallet:

```
{"balance":{"amount":"1000000000"}}
```
