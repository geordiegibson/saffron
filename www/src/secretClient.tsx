import { SecretNetworkClient, Wallet } from "secretjs";

const wallet = new Wallet(import.meta.env.VITE_mnemonic);

const secretjs = new SecretNetworkClient({
    chainId: "secretdev-1",
    url: "http://localhost:1317",
    wallet: wallet,
    walletAddress: wallet.address,
});

export const try_query_contracts = async () => {

    const my_query: {contracts: Array<Contract>} = await secretjs.query.compute.queryContract({
      contract_address: import.meta.env.VITE_contractAddress as string,
      code_hash: import.meta.env.VITE_contractCodeHash,
      query: { get_contracts: {} },
    });
    
    return my_query.contracts
};

export const try_create_contract = async (contract: Contract) => {
    
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
    };