'use client'

import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const coins = [
  {
    id: 1,
    name: 'SCRT',
    avatar: 'images/secret.png',
  },
  {
    id: 2,
    name: 'ETH',
    avatar: 'images/ethereum.png',
  },
  {
    id: 3,
    name: 'BTC',
    avatar: 'images/bitcoin.png',
  },
  {
    id: 3,
    name: 'SHD',
    avatar: 'images/shade.svg',
  },
  
]

const CoinDropdown = () => {
  const [selected, setSelected] = useState(coins[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mr-1">
        <ListboxButton className="relative w-full cursor-default rounded-md py-1 bg-neutral-800 pl-3 mr-8 text-left text-white sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <img alt="" src={selected.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
            <span className="ml-3 block truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <i className="bi bi-chevron-down"></i>
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute bg-zinc-800 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {coins.map((coin) => (
            <ListboxOption
              key={coin.id}
              value={coin}
              className="group w-max relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <img alt="" src={coin.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 text-white block truncate font-normal group-data-[selected]:font-semibold">
                  {coin.name}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default CoinDropdown