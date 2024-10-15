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
