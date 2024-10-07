import { SecretNetworkClient, Wallet } from "secretjs";

const wallet = new Wallet(import.meta.env.VITE_mnemonic);

const secretjs = new SecretNetworkClient({
  chainId: "secretdev-1",
  url: "http://localhost:1317",
  wallet: wallet,
  walletAddress: wallet.address,
});

// Get the users connected wallet address
export const get_personal_address = () => {
  return wallet.address;
};

// Fetches all escrow contracts
export const try_query_contracts = async () => {

    console.log("Fetching contracts")

    const my_query: {contracts: Array<Contract>} = await secretjs.query.compute.queryContract({
      contract_address: import.meta.env.VITE_contractAddress as string,
      code_hash: import.meta.env.VITE_contractCodeHash,
      query: { get_contracts: {} },
    });
    
    console.log("Fetched contracts", my_query.contracts)

    return my_query.contracts
};

// Attempt to create a contract by sending currency to the escrow with information surronding what you want in return.
export let create_contract = async (coin: Coin, amount: number) => {

  let request = {
      create: {
        requesting_coin: coin.abbreviation,
        requesting_amount: amount.toString()
      }
  }
  
  let executeMsg = {
    send: {
      owner: wallet.address,
      amount: amount.toString(),
      recipient: import.meta.env.VITE_contractAddress,
      msg: btoa(JSON.stringify(request))
    },
  };

  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: coin.contract_address,
      code_hash: coin.contract_hash,
      msg: executeMsg,
    },
    {
      gasLimit: 100_000,
    }
  );
  
  console.log(tx)
  return tx
};

// Attempt to accept a contract by sending the required amount of money to the escrow with the contract_id.
export let accept_contract = async (id: string, coin: Coin, amount: number) => {

  let request = {
    accept: {
      id
    }
  }

  let executeMsg = {
    send: {
      owner: wallet.address,
      amount: amount.toString(),
      recipient: import.meta.env.VITE_contractAddress,
      msg: btoa(JSON.stringify(request))
    },
  };

  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: "secret1kw9ajrrhxxx6tdms543r92rs2ml8uqt5vsek8v",
      code_hash: "3aad972a2c59b248993a22091d12b2774a347e10581af20595abc4d977080257",
      msg: executeMsg,
    },
    {
      gasLimit: 100_000,
    }
  );

  console.log(tx)
  return tx
};


// Query the users coin balance for a specific coin. Used for testing locally :)
export let balanceResponse: any = await secretjs.query.compute.queryContract({
  contract_address: import.meta.env.VITE_coin_contractAddress as string,
  code_hash: import.meta.env.VITE_coin_contractCodeHash as string,
  query: {
    balance: {
      address: get_personal_address(),
      key: "geordie"
    }
  },
});