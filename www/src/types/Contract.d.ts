type Contract = {
    id: string | null,
    wanting_coin_addr: string,
    wanting_amount: number
}
 

interface CoinContract extends Contract {
    offering_coin_addr: string,
    offering_amount: number
}

interface NFTContract extends Contract {
    nft_addr: string
}


type Coin = {
    address: string,
    hash: string,
    name: string,
    abbr: string,
    img: string
}

type NFT = {
    address: string,
    hash: string,
    name: string
}

type Filters = {
    wanting: Array<string>
    offering: Array<string>
}