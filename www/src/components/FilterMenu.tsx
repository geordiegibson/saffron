import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

import CoinFilter from './crypto/CoinFilter'
import SliderFilter from './common/Slider'
import { Filters } from '../pages/Trade'
import { Dispatch, ReactElement, SetStateAction } from 'react'

type FilterMenuProps = {
  filters: Filters,
  updateFilters: Dispatch<SetStateAction<Filters>>
  button: ReactElement
}

export default function FilterMenu(props: FilterMenuProps) {
  return (
    <Popover className="relative">
      <PopoverButton className={"h-full w-full"}>
        {props.button}
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md overflow-hidden rounded-3xl bg-zinc-900 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4 w-full">

            <div className='flex justify-between'>
                <p className='text-white geist'>Add Filters</p>
            </div>
            
            {/* Coin Select */}
            <div className='flex flex-col gap-2 mt-3'>
                <p className='text-gray-400 geist text-xs'>I want to:</p>
                <CoinFilter name="Give" filter={props.filters.giving} updateFilter={props.updateFilters} ></CoinFilter>
                <CoinFilter name="Receive" filter={props.filters.receiving} updateFilter={props.updateFilters} ></CoinFilter>
            </div>
            
            {/* Value Slider */}
            <div className='mt-5 flex flex-col'>
                <p className="text-gray-400 geist text-xs">Total Value:</p>

                <div className='flex justify-center items-center gap-4 mt-2'>
                    <p className='text-white text-sm'>0 USD</p>
                    <SliderFilter />
                    <p className='text-white text-sm'>100 USD +</p>
                </div>
            </div>

            <div className='flex flex-col mt-5'>

                <p className='text-gray-400 geist text-xs'>Additional:</p>

                <div className='flex flex-col gap-5 mt-3'>                
                  <div className='flex gap-2'>
                    <input type="checkbox" className="h-5 w-5 bg-zinc-800 rounded text-gray-700" style={{boxShadow: "none"}} />
                    <div>
                      <p className='text-white font-bold leading-none'>Own</p>
                      <p className='text-gray-400'>Only show your own contracts</p>
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <input type="checkbox" className="h-5 w-5 bg-zinc-800 rounded text-gray-700" style={{boxShadow: "none"}} />
                    <div>
                      <p className='text-white font-bold leading-none'>Donations</p>
                      <p className='text-gray-400'>Contracts that require no compensation</p>
                    </div>
                  </div>
                </div>

            </div>

          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
