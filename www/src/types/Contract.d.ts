type Contract = {
    giving_coin: Coin,
    giving_amount: number,
    receiving_coin: Coin,
    receiving_amount: number
}

type Filters = {
    giving: Array<string>
    receiving: Array<string>
}