const secret: Coin = {
    name: "Secret",
    abbreviation: "SCRT",
    img: "images/SCRT.png",
    contract_address: "secret1kw9ajrrhxxx6tdms543r92rs2ml8uqt5vsek8v",
    contract_hash: "3aad972a2c59b248993a22091d12b2774a347e10581af20595abc4d977080257"
}

const ethereum: Coin = {
    name: "Ethereum",
    abbreviation: "ETH",
    img: "images/ETH.png",
    contract_address: "",
    contract_hash: ""
}

const shade: Coin = {
    name: "Shade",
    abbreviation: "SHD",
    img: "images/SHD.png",
    contract_address: "",
    contract_hash: ""
}

export const supportedCoins = [secret, ethereum, shade]