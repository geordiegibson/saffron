import { SecretNetworkClient, Wallet } from "secretjs";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();  // Load environment variables from .env file 
const mnemonic = process.env.MNEMONIC;  // Retrieve the mnemonic

const wallet = new Wallet(mnemonic);

// create a new client for the Pulsar testnet
const secretjs = new SecretNetworkClient({
  chainId: "secretdev-1",
  url: "http://localhost:1317",
  wallet: wallet,
  walletAddress: wallet.address,
});


const uploadContract = async (contract_wasm: Buffer): Promise<{code_id: string, code_hash?: string}> => {
    let tx = await secretjs.tx.compute.storeCode(
        {
            sender: wallet.address,
            wasm_byte_code: contract_wasm,
            source: "",
            builder: "",
        },
        {
            gasLimit: 6_000_000,
        }
    );

    //@ts-ignore
    const codeId = tx.arrayLog!.find((log) => log.type === "message" && log.key === "code_id").value;
  
    console.log("codeId: ", codeId);
  
    const contractCodeHash = (
        await secretjs.query.compute.codeHashByCodeId({ code_id: codeId })
    ).code_hash;
    console.log(`Contract hash: ${contractCodeHash}`);
    return {
        code_id: codeId,
        code_hash: contractCodeHash,
    };
};

export const main = async (): Promise<void> => {
    const { code_id, code_hash } = await uploadContract(fs.readFileSync("../contract.wasm.gz"));
    
    console.log("Code ID: ", code_id);
    console.log("Code hash: ", code_hash);
}

main()