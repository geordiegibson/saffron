import { SecretNetworkClient, Wallet } from "secretjs";
import {getCoinByAddr} from "./acceptedCoins";

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
export let create_contract = async (contract: Contract) => {

  let request = {
      create: {
        wanting_coin_addr: contract.wanting_coin_addr,
        wanting_amount: contract.wanting_amount.toString()
      }
  }
  
  let executeMsg = {
    send: {
      owner: wallet.address,
      amount: contract.offering_amount.toString(),
      recipient: import.meta.env.VITE_contractAddress,
      msg: btoa(JSON.stringify(request))
    },
  };

  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: contract.offering_coin_addr,
      code_hash: getCoinByAddr(contract.offering_coin_addr)?.hash,
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
export let accept_contract = async (contract: Contract) => {

  let request = {
    accept: {
      id: contract.id
    }
  }

  let executeMsg = {
    send: {
      owner: wallet.address,
      amount: contract.wanting_amount.toString(),
      recipient: import.meta.env.VITE_contractAddress,
      msg: btoa(JSON.stringify(request))
    },
  };

  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: contract.wanting_coin_addr,
      code_hash: getCoinByAddr(contract.wanting_coin_addr)?.hash,
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