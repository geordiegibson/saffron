import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import CoinFilter from './crypto/CoinFilter'
import { Dispatch, ReactElement, SetStateAction } from 'react'

type FilterMenuProps = {
  filters: Filters,
  updateFilters: Dispatch<SetStateAction<Filters>>
  button: ReactElement
}

export default function FilterMenu(props: FilterMenuProps) {

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton className="relative h-full w-full">
            <button className="bg-zinc-900 px-3 h-full font-bold rounded relative">
              <i className="text-white bi bi-funnel"></i>
            </button>
          </PopoverButton>

          {/* Backdrop Blur Overlay */}
          {open && (
            <div className="fixed inset-0 mt-12 bg-black bg-opacity-90 z-10" />
          )}

          <PopoverPanel
            className={`absolute left-1/2 z-20 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition-transform duration-200 ease-out
            ${open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}
          >
            <div className="w-screen max-w-md overflow-hidden rounded-3xl bg-zinc-900 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4 w-full">

                <div className='flex justify-between'>
                  <p className='text-white geist'>Add Filters</p>
                </div>

                {/* Coin Select */}
                <div className='flex flex-col gap-2 mt-3'>
                  <p className='text-gray-400 geist text-xs'>I want to:</p>
                  <CoinFilter name="Give" filter={props.filters.wanting} updateFilter={props.updateFilters} />
                  <CoinFilter name="Receive" filter={props.filters.offering} updateFilter={props.updateFilters} />
                </div>

                <div className='flex flex-col mt-5'>
                  <p className='text-gray-400 geist text-xs'>Additional:</p>

                  <div className='flex flex-col gap-5 mt-3'>
                    <div className='flex gap-2'>
                      <input type="checkbox" className="h-5 w-5 bg-zinc-800 rounded text-gray-700" style={{ boxShadow: "none" }} />
                      <div>
                        <p className='text-white font-bold leading-none'>Own</p>
                        <p className='text-gray-400'>Only show your own contracts</p>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <input type="checkbox" className="h-5 w-5 bg-zinc-800 rounded text-gray-700" style={{ boxShadow: "none" }} />
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
        </>
      )}
    </Popover>
  )
}
