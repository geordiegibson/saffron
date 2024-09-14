import Menu from "../components/Menu"
import { SecretNetworkClient } from "secretjs";

declare global {
    interface Window {
      keplr?: any;
      getEnigmaUtils?: (chainId: string) => any; 
      getOfflineSignerOnlyAmino?: (chainId: string) => any;
    }
  }

const Wallet = () => {
    
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

        new SecretNetworkClient({
        url: "https://api.pulsar3.scrttestnet.com",
        chainId: CHAIN_ID,
        wallet: keplrOfflineSigner,
        walletAddress: myAddress,
        encryptionUtils: window.keplr.getEnigmaUtils(CHAIN_ID),
        });
    }
    
    return (
        <div className="flex flex-col min-h-screen w-screen items-center">
            
        {/* Title */}
        <div className="w-[75vw] lg:w-[50vw]">
            <div className="flex flex-col pt-10 pb-5 top-animation">
                <p className="text-neutral-400 font-bold">Connect Crypto Wallet</p>
                <p className="text-white inter" style={{"fontSize": "30px"}}>💵 Wallet</p>
            </div>
        </div>

        <Menu page='wallet'/>

    </div>
    )
}

export default Wallet