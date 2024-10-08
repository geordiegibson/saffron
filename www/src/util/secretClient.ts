import { SecretNetworkClient } from "secretjs";
import {getCoinByAddr} from "./acceptedCoins";
import { getSigner, getWalletAddress, getEncryptionUtil} from './keplr'

// SecretJS Client to perform query messages. Does not require a connected wallet.
const createQueryClient = async () => {

  let client: any = new SecretNetworkClient({
    chainId: "secretdev-1",
    url: "http://localhost:1317",
  });

  return client
}

// SecretJS Client to perform execute messages. Requires a connected wallet.
const createExecuteClient = async () => {

  let client: any = new SecretNetworkClient({
    chainId: "secretdev-1",
    url: "http://localhost:1317",
    wallet: getSigner(),
    walletAddress: await getWalletAddress(),
    encryptionUtils: getEncryptionUtil(),
  });

  return client
}

// Fetches all escrow contracts
export const try_query_contracts = async () => {

    console.log("Fetching contracts")
    
    let client = await createQueryClient();

    const my_query: {contracts: Array<Contract>} = await client.query.compute.queryContract({
      contract_address: import.meta.env.VITE_contractAddress as string,
      code_hash: import.meta.env.VITE_contractCodeHash,
      query: { get_contracts: {} },
    });
    
    console.log("Fetched contracts", my_query.contracts)

    return my_query.contracts
};

// Attempt to create a contract by sending currency to the escrow with information surronding what you want in return.
export let create_contract = async (contract: Contract) => {

  let client = await createExecuteClient();

  let request = {
      create: {
        wanting_coin_addr: contract.wanting_coin_addr,
        wanting_amount: contract.wanting_amount.toString()
      }
  }
  
  let executeMsg = {
    send: {
      owner: await getWalletAddress(),
      amount: contract.offering_amount.toString(),
      recipient: import.meta.env.VITE_contractAddress,
      msg: btoa(JSON.stringify(request))
    },
  };

  let tx = await client.tx.compute.executeContract(
    {
      sender: await getWalletAddress(),
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

  let client = await createExecuteClient();

  let request = {
    accept: {
      id: contract.id
    }
  }

  let executeMsg = {
    send: {
      owner: await getWalletAddress(),
      amount: contract.wanting_amount.toString(),
      recipient: import.meta.env.VITE_contractAddress,
      msg: btoa(JSON.stringify(request))
    },
  };

  let tx = await client.tx.compute.executeContract(
    {
      sender: await getWalletAddress(),
      contract_address: contract.wanting_coin_addr,
      code_hash: getCoinByAddr(contract.wanting_coin_addr)?.hash,
      msg: executeMsg,
    },
    {
      gasLimit: 200_000,
    }
  );

  console.log(tx)
  return tx
};