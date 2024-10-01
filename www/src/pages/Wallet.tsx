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
    
    const connectKeplrWallet = async () => {

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
                <p className="text-neutral-400 font-bold">Select Wallet to Connect</p>
                <p className="text-white inter" style={{"fontSize": "30px"}}>Wallet</p>
            </div>
        </div>


        <div className="flex flex-col gap-4 p-4 border border-zinc-900 bg-zinc-950 w-[75vw] lg:w-[35vw] h-max rounded-lg mt-5 bottom-animation">

            <button onClick={connectKeplrWallet} className="flex justify-between pl-6 pr-4 items-center w-full h-16 rounded-lg bg-zinc-900 hover:bg-zinc-700">
                <p className="text-white font-bold geist">Keplr</p>
                <img src="images/keplr.png" className="h-12 w-12"/>
            </button>

            <div className="flex justify-between px-6 items-center w-full h-16 rounded-lg bg-zinc-900 hover:bg-zinc-700">
                <p className="text-white font-bold geist">MetaMask</p>
                <img src="images/metamask.webp" className="h-8 w-8"/>
            </div>

            <div className="flex justify-between px-6 items-center w-full h-16 rounded-lg bg-zinc-900 hover:bg-zinc-700">
                <p className="text-white font-bold geist">Ledger</p>
                <img src="images/ledger.png" className="bg-white h-9 w-9"/>
            </div>

            <div className="flex justify-between pl-6  pr-5 items-center w-full h-16 rounded-lg bg-zinc-900 hover:bg-zinc-700">
                <p className="text-white font-bold geist">Starshell</p>
                <img src="images/starshell.png" className="h-12 w-12"/>
            </div>

            <div className="flex justify-between px-6 items-center w-full h-16 rounded-lg bg-zinc-900 hover:bg-zinc-700">
                <p className="text-white font-bold geist">Leap</p>
                <img src="images/leap.png" className="h-8 w-10"/>
            </div>

            <div className="flex justify-between pl-6 pr-7 items-center w-full h-16 rounded-lg bg-zinc-900 hover:bg-zinc-700">
                <p className="text-white font-bold geist">Fina</p>
                <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/7b/42/5d/7b425d42-f0ad-0716-2d42-87218eda9e26/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png" className="rounded-full h-8 w-8"/>
            </div>

        </div>

        <Menu page='wallet'/>

    </div>
    )
}

export default Wallet