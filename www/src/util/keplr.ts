// Gets the users wallet from their Keplr extension.
export const getSigner = () => {
   return window.keplr.getOfflineSignerOnlyAmino("secretdev-1");
}

// Gets the users wallet address from their Keplr extension.
export const getWalletAddress = async () => {
    const signer = getSigner();
    const accounts = await signer.getAccounts();
    return accounts[0].address
}

// Gets the encryption utilities for the specific chain.
export const getEncryptionUtil = () => {
    return window.keplr.getEnigmaUtils("secretdev-1")
}

// Used to add the locally running Secret Network to your Keplr Wallet
export async function addLocalNetowrkToKeplr() {
    await window.keplr.experimentalSuggestChain({
      chainId: "secretdev-1",
      chainName: "Secret Testnet (Local)",
      rpc: "http://localhost:26657",
      rest: "http://localhost:1317",
      bip44: {
        coinType: 529,
      },
      bech32Config: {
        bech32PrefixAccAddr: "secret",
        bech32PrefixAccPub: "secretpub",
        bech32PrefixValAddr: "secretvaloper",
        bech32PrefixValPub: "secretvaloperpub",
        bech32PrefixConsAddr: "secretvalcons",
        bech32PrefixConsPub: "secretvalconspub",
      },
      currencies: [ 
        { 
          coinDenom: "SCRT", 
          coinMinimalDenom: "uscrt", 
          coinDecimals: 6,
        }, 
      ],
      feeCurrencies: [
        {
          coinDenom: "SCRT",
          coinMinimalDenom: "uscrt",
          coinDecimals: 6,
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
        },
      ],
      stakeCurrency: {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
      },
      features: ["secretwasm"],
    });
  }