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
  const my_query: { contracts: Array<Contract> } =
    await secretjs.query.compute.queryContract({
      contract_address: import.meta.env.VITE_contractAddress as string,
      code_hash: import.meta.env.VITE_contractCodeHash,
      query: { get_contracts: {} },
    });

  return my_query.contracts;
};

export const try_create_contract = async (contract: Contract) => {
  await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: import.meta.env.VITE_contractAddress,
      code_hash: import.meta.env.VITE_contractCodeHash,
      msg: {
        add_contract: {
          giving_coin: contract.giving_coin,
          giving_amount: contract.giving_amount,
          receiving_coin: contract.receiving_coin,
          receiving_amount: contract.receiving_amount,
        },
      },
      sent_funds: [],
    },
    {
      gasLimit: 100_000,
    }
  );
};

export const try_query_all_messages = async () => {
  try {
    const my_query: { messages: Array<Message> } =
      await secretjs.query.compute.queryContract({
        contract_address: import.meta.env.VITE_messageContractAddress as string,
        code_hash: import.meta.env.VITE_messageContractCodeHash,
        query: { get_all_messages: {} },
      });

    return my_query.messages;
  } catch (error) {
    console.error("Error querying all messages:", error);
    return []; // Return an empty array or handle the error appropriately.
  }
};

export const try_create_message = async (message: string) => {
  try {
    console.log("Creating message");
    await secretjs.tx.compute.executeContract(
      {
        sender: wallet.address,
        contract_address: import.meta.env.VITE_messageContractAddress as string,
        code_hash: import.meta.env.VITE_messageContractCodeHash,
        msg: {
          add_message: {
            message: message,
          },
        },
        sent_funds: [],
      },
      {
        gasLimit: 100_000,
      }
    );
    console.log("Success");
  } catch (err) {
    console.log("Error: ", err);
  }
};
