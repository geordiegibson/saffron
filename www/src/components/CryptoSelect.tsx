import AvatarSelect from "./AvatarSelect";

export default function Example() {
    return (
      <div>
        <div className="relative rounded-md shadow-sm">
          <input
            id="price"
            name="price"
            type="number"
            placeholder="0.00"
            className="block w-full bg-neutral-800 text-white rounded-md border-0 py-1.5 pr-20  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <AvatarSelect />
          </div>
        </div>
      </div>
    )
  }
  