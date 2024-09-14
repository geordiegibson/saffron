'use client'

import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const options = [
  {
    id: 1,
    text: "3 hours"
  },
  {
    id: 2,
    text: "12 hours"
  },
  {
    id: 3,
    text: "1 day"
  },
  {
    id: 4,
    text: "3 days"
  },
  {
    id: 5,
    text: "1 week"
  },
  {
    id: 6,
    text: "2 weeks"
  },

]

export default function Dropdown() {
  const [selected, setSelected] = useState(options[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mr-1">
        <ListboxButton className="relative w-full cursor-default rounded-md py-1 bg-neutral-800 pl-3 mr-8 hover:bg-neutral-700 text-left text-white sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="block truncate">{selected.text}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <i className="bi bi-chevron-down"></i>
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute bg-zinc-800 w-full z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group w-full bg-zinc-800 text-white h-full relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
            <span className="w-full h-full block font-normal group-data-[selected]:font-semibold">
                {option.text}
            </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
