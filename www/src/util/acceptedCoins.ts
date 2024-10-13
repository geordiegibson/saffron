const secret: Coin = {
    name: "Secret",
    abbr: "SCRT",
    img: "images/SCRT.png",
    address: "secret1x0c5ewh0h4ts70yrj00snquqklff2ufrjwgswf",
    hash: "c74bc4b0406507257ed033caa922272023ab013b0c74330efc16569528fa34fe"
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
    address: "secret1j9s8zvvjzd7v6asf4wppvhphv52szxd25fh0mp",
    hash: "773c39a4b75d87c4d04b6cfe16d32cd5136271447e231b342f7467177c363ca8"
}

// const supportedNFTs = [nft]

// export function getNFTCollectionByAddr(address: string): NFT | undefined {
//     return supportedNFTs.find(nft => nft.address === address);
// }