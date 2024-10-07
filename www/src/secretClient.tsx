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

// Attempts to send the currency to the escrow. If successful, the contract is added to the escrow.
export const try_transfer_funds = async (contract: Contract): Promise<boolean> => {

  console.log(`Sending the currency: ${contract.giving_coin.name}`);

  try {
      const result = await transfer_snip20(contract.giving_coin, contract.giving_amount);
      
      if (result.code === 0) {
          console.log("Sent the currency successfully!");
          await try_create_contract(contract);
          return true;
      }

      console.log("Currency failed to send");
      return false;

  } catch (error) {
      console.error("An error occurred during transfer", error);
      return false;
  }
};

// Creates the contract on the escrow
const try_create_contract = async (contract: Contract) => {
  await secretjs.tx.compute.executeContract(
    {
    sender: wallet.address, 
    contract_address: import.meta.env.VITE_contractAddress,
    code_hash: import.meta.env.VITE_contractCodeHash,
    msg: {
        add_contract: {giving_coin: contract.giving_coin.abbreviation, giving_amount: contract.giving_amount, receiving_coin: contract.receiving_coin.abbreviation, receiving_amount: contract.receiving_amount},
    },
    sent_funds: [],
  },
  {
    gasLimit: 100_000,
  }
);
console.log("Created contract")
}

  
// Transfer coins to from the users wallet to the escrow contract
export let transfer_snip20 = async (coin: Coin, amount: number) => {

  let executeMsg = {
    transfer: {
      owner: wallet.address,
      amount: amount.toString(),
      recipient: import.meta.env.VITE_contractAddress,
    },
  };

  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: coin.contract_address as string,
      code_hash: coin.contract_hash as string,
      msg: executeMsg,
    },
    {
      gasLimit: 100_000,
    }
  );
  console.log(tx)
  return tx
};


export let new_create_contract = async (coin: Coin, amount: number) => {

  let executeMsg = {
    send: {
      owner: wallet.address,
      amount: amount.toString(),
      recipient: import.meta.env.VITE_contractAddress,
      msg: "Hi my name is Geordie"
    },
  };

  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: coin.contract_address as string,
      code_hash: coin.contract_hash as string,
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