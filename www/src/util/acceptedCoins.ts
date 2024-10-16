const secret: Coin = {
    name: "Secret",
    abbr: "SCRT",
    img: "images/SCRT.png",
    address: import.meta.env.VITE_SCRT_contractAddress,
    hash: import.meta.env.VITE_COIN_contractCodeHash
}

const ethereum: Coin = {
    name: "Ethereum",
    abbr: "ETH",
    img: "images/ETH.png",
    address: import.meta.env.VITE_ETH_contractAddress,
    hash: import.meta.env.VITE_COIN_contractCodeHash
}

const shade: Coin = {
    name: "Shade",
    abbr: "SHD",
    img: "images/SHD.png",
    address: import.meta.env.VITE_SHD_contractAddress,
    hash: import.meta.env.VITE_COIN_contractCodeHash
}

export const supportedCoins = [secret, ethereum, shade]

export function getCoinByAddr(address: string): Coin | undefined {
    return supportedCoins.find(coin => coin.address === address);
}


export const nftCollection: NFT = {
    name: "nft",
    address: import.meta.env.VITE_nftContractAddress,
    hash: import.meta.env.VITE_nftContractCodeHash
}