type Contract = {
    id: string | null,
    offering_coin_addr: string,
    offering_amount: number,
    wanting_coin_addr: string,
    wanting_amount: number
}

type Coin = {
    address: string,
    hash: string
    name: string,
    abbr: string,
    img: string
}

type Filters = {
    wanting: Array<string>
    offering: Array<string>
}