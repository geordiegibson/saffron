'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import { Filters } from '../../pages/Trade'
import AvatarStack from '../AvatarStack'

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
]

type CoinFilterProps = {
  name: string,
  filter: Array<string>,
  updateFilter: Dispatch<SetStateAction<Filters>>
}

const CoinFilter = (props: CoinFilterProps) => {

    const filter = props.name === 'Give' ? 'giving' : 'receiving'

    const handleSelect = (coinName: string) => {
      if (props.filter.includes(coinName)) {
        props.updateFilter((prevState: Filters) => ({
          ...prevState,
          [filter]: props.filter.filter((id: string) => id !== coinName),
        }));
      } else {
        props.updateFilter((prevState: Filters) => ({
          ...prevState,
          [filter]: [...props.filter, coinName],
        }));
      }
    };

  const isSelected = (coinName: string) => props.filter.includes(coinName)

  return (
    <Listbox value={props.filter} onChange={() => handleSelect} multiple>
      <div className="relative mr-1 w-full">
        <ListboxButton className="w-full">
          <button className="w-full flex justify-between bg-zinc-800 rounded-lg text-white text-sm xs:text-sm text-gray-800 flex items-center py-5 px-3 h-6 font-bold">
            
            {props.name} 

            <div className='flex gap-3 items-center'>
              <AvatarStack coins={props.filter} /> 
              <i className="ml-2 bi bi-chevron-expand"></i>
            </div>
            
          </button>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute bg-zinc-800 w-full z-10 mt-1 max-h-56 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {coins.map((coin) => (
            <ListboxOption
              key={coin.id}
              value={coin.id}
              onClick={() => handleSelect(coin.name)}
              className={`group w-full hover:bg-indigo-500 relative cursor-default select-none p-3 px-4 flex text-gray-900 ${
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
