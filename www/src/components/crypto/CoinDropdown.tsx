'use client'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import {supportedCoins} from '../../util/acceptedCoins'

interface CoinDropdownProps {
  selectedCoin: Coin,
  onChange: (coin: Coin) => void;
}

const CoinDropdown = ({ selectedCoin, onChange }: CoinDropdownProps) => {
  return (
    <Listbox value={selectedCoin} onChange={onChange}>
      <div className="relative mr-1">
        <ListboxButton className="relative w-full cursor-default rounded-md py-1 bg-neutral-800 pl-3 mr-8 text-left text-white sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <img alt="" src={selectedCoin.img} className="h-5 w-5 flex-shrink-0 rounded-full" />
            <span className="ml-3 block truncate">{selectedCoin.abbr}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <i className="bi bi-chevron-down"></i>
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute bg-zinc-800 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {supportedCoins.map((coin, index) => (
            <ListboxOption
              key={index}
              value={coin}
              className="group w-max relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <img alt="" src={coin.img} className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 text-white block truncate font-normal group-data-[selected]:font-semibold">
                  {coin.abbr}
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