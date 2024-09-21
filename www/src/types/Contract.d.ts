type Contract = {
    giving_coin: string,
    giving_amount: number,
    receiving_coin: string,
    receiving_amount: number
}

type Filters = {
    giving: Array<string>
    receiving: Array<string>
}