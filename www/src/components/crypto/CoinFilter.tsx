'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const coins = [
  {
    id: 1,
    abr: 'SCRT',
    name: "secret",
    avatar: 'images/secret.png',
  },
  {
    id: 2,
    abr: 'ETH',
    name: "ethereum",
    avatar: 'images/ethereum.png',
  },
  {
    id: 3,
    abr: 'BTC',
    name: "bitcoin",
    avatar: 'images/bitcoin.png',
  },
  {
    id: 4,
    abr: 'SHD',
    name: "shade",
    avatar: 'images/shade.png',
  },
]

const CoinFilter = (props: any) => {

  const handleSelect = (coinName: string) => {
    if (props.filter.includes(coinName)) {
      props.updateFilter(props.filter.filter((id: any) => id !== coinName))
    } else {
      props.updateFilter([...props.filter, coinName])
    }
  }

  const isSelected = (coinName: string) => props.filter.includes(coinName)

  return (
    <Listbox value={props.filter} onChange={() => handleSelect} multiple>
      <div className="relative mr-1">
        <ListboxButton>
          <button className="bg-zinc-900 text-white text-sm xs:text-sm text-gray-800 flex items-center rounded py-4 px-3 h-6 font-bold">{props.name} <i className="pl-2 bi bi-chevron-down"></i></button>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute bg-zinc-800 w-28 z-10 mt-1 max-h-56 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {coins.map((coin) => (
            <ListboxOption
              key={coin.id}
              value={coin.id}
              onClick={() => handleSelect(coin.name)}
              className={`group w-full hover:bg-indigo-500 relative cursor-default select-none py-2 flex justify-center text-gray-900 ${
                isSelected(coin.name) ? 'bg-indigo-600 text-white' : 'text-white'
              }`}
            >
              <div className="flex items-center">
                <img alt="" src={coin.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span
                  className={`ml-2 w-max block truncate ${
                    isSelected(coin.name) ? 'font-semibold' : 'font-normal'
                  }`}
                >
                  {coin.abr}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default CoinFilter
