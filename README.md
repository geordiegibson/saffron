# saffron
dApp with decentralised centralised computing for HackSecret4 Hackathon

## Authors
Tom Barthelmeh
Geordie Gibson
Daniel Neal

## How to Run

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

- Running the app
  - Set up
    ```
    npm install
    ```
  - Running
    ```
    npm run dev
    ```