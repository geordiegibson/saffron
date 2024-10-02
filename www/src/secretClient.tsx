import { SecretNetworkClient, Wallet } from "secretjs";

const wallet = new Wallet(import.meta.env.VITE_mnemonic);

const secretjs = new SecretNetworkClient({
  chainId: "secretdev-1",
  url: "http://localhost:1317",
  wallet: wallet,
  walletAddress: wallet.address,
});

export const get_personal_address = () => {
  return wallet.address;
};

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

export const try_create_contract = async (contract: Contract) => {
    
    console.log("Attemping to create contract")

    await secretjs.tx.compute.executeContract(
        {
        sender: wallet.address,
        contract_address: import.meta.env.VITE_contractAddress,
        code_hash: import.meta.env.VITE_contractCodeHash,
        msg: {
            add_contract: {giving_coin: contract.giving_coin, giving_amount: contract.giving_amount, receiving_coin: contract.receiving_coin, receiving_amount: contract.receiving_amount},
        },
        sent_funds: [],
      },
      {
        gasLimit: 100_000,
      }
    );

    console.log("Created contract")

};

  
// Transfer coins to from the users wallet to the escrow contract
export let transfer_snip20 = async (receiver_wallet: string) => {
  let executeMsg = {
    transfer: {
      owner: wallet.address,
      amount: "1",
      recipient: receiver_wallet,
    },
  };

  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: import.meta.env.VITE_coin_contractAddress as string,
      code_hash: import.meta.env.VITE_coin_contractCodeHash as string,
      msg: executeMsg,
    },
    {
      gasLimit: 100_000,
    }
  );
  console.log(tx);
};


// Query the users coin balance for a specific coin. Used for testing locally :)
export let balanceResponse: any = await secretjs.query.compute.queryContract({
  contract_address: import.meta.env.VITE_coin_contractAddress as string,
  code_hash: import.meta.env.VITE_coin_contractCodeHash as string,
  query: {
    balance: {
      address: get_personal_address(),
      key: "<your_viewing_key>"
    }
  },
});