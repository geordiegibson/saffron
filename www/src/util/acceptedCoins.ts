const secret: Coin = {
    name: "Secret",
    abbr: "SCRT",
    img: "images/SCRT.png",
    address: "secret1kw9ajrrhxxx6tdms543r92rs2ml8uqt5vsek8v",
    hash: "3aad972a2c59b248993a22091d12b2774a347e10581af20595abc4d977080257"
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