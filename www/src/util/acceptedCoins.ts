const secret: Coin = {
    name: "Secret",
    abbr: "SCRT",
    img: "images/SCRT.png",
    address: import.meta.env.VITE_testCoinContractAddress,
    hash: import.meta.env.VITE_testCoinContractCodeHash
}

const ethereum: Coin = {
    name: "Ethereum",
    abbr: "ETH",
    img: "images/ETH.png",
    address: "",
    hash: "3aad972a2c59b248993a22091d12b2774a347e10581af20595abc4d977080257"
}

const shade: Coin = {
    name: "Shade",
    abbr: "SHD",
    img: "images/SHD.png",
    address: "",
    hash: "3aad972a2c59b248993a22091d12b2774a347e10581af20595abc4d977080257"
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

// const supportedNFTs = [nft]

// export function getNFTCollectionByAddr(address: string): NFT | undefined {
//     return supportedNFTs.find(nft => nft.address === address);
// }