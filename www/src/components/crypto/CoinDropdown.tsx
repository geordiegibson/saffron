'use client'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const coins = [
  {
    id: 1,
    name: 'SCRT',
    avatar: 'images/SCRT.png',
  },
  {
    id: 2,
    name: 'ETH',
    avatar: 'images/ETH.png',
  },
  {
    id: 3,
    name: 'BTC',
    avatar: 'images/BTC.png',
  },
  {
    id: 3,
    name: 'SHD',
    avatar: 'images/SHD.png',
  },
  
]

interface CoinDropdownProps {
  selectedCoin: { id: number, name: string, avatar: string };
  onChange: (coin: { id: number, name: string, avatar: string }) => void;
}

const CoinDropdown = ({ selectedCoin, onChange }: CoinDropdownProps) => {
  return (
    <Listbox value={selectedCoin} onChange={onChange}>
      <div className="relative mr-1">
        <ListboxButton className="relative w-full cursor-default rounded-md py-1 bg-neutral-800 pl-3 mr-8 text-left text-white sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <img alt="" src={selectedCoin.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
            <span className="ml-3 block truncate">{selectedCoin.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <i className="bi bi-chevron-down"></i>
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute bg-zinc-800 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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