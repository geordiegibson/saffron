import { SecretNetworkClient } from "secretjs";

declare global {
    interface Window {
      keplr?: any;
      getEnigmaUtils?: (chainId: string) => any; 
      getOfflineSignerOnlyAmino?: (chainId: string) => any;
    }
  }
  
const Wallet = (props: any) => {

    const connectKeplr = async () => {

        const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

        while (
        !window.keplr ||
        !window.getEnigmaUtils ||
        !window.getOfflineSignerOnlyAmino
        ) {
        await sleep(50);
        }

        const CHAIN_ID = "pulsar-3";
        await window.keplr.enable(CHAIN_ID);
        const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID);
        const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

        const secretjs = new SecretNetworkClient({
        url: "https://api.pulsar3.scrttestnet.com",
        chainId: CHAIN_ID,
        wallet: keplrOfflineSigner,
        walletAddress: myAddress,
        encryptionUtils: window.keplr.getEnigmaUtils(CHAIN_ID),
        });
    }

    return (
        <>
            <button onClick={() => connectKeplr()} className={`${props.page === 'wallet' ? "bg-white" : "hover:bg-slate-800"} group relative flex select items-center rounded-full p-3 outline-none transition-all duration-400`}>
                <svg className="h-4" fill={props.page === 'wallet' ? 'black' : 'white'} viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
            </button>
        </>
    )
}

export default Wallet