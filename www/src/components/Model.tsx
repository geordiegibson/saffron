import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import CryptoInput from './CryptoSelect';
import Dropdown from './Dropdown';

const CreateContractModel = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
        <button className="bg-white rounded p-3"><i className="text-black bi bi-plus-lg"></i></button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-white m-0 text-[17px] text-lg font-bold">
          Create Contract
        </Dialog.Title>
        <Dialog.Description className="text-gray-400 mt-[10px] mb-5 text-[15px] leading-normal">
          Select your requirements for a trade. We'll handle the rest.
        </Dialog.Description>

        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-gray-200 w-[90px] text-right text-[15px]" htmlFor="name">
            You Give
          </label>
          <CryptoInput />
        </fieldset>

        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-gray-200 w-[90px] text-right text-[15px]" htmlFor="username">
            You Receive
          </label>
          <CryptoInput />
        </fieldset>

        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="text-gray-200 w-[90px] text-right text-[15px]" htmlFor="username">
            Expiry
          </label>

        <Dropdown />
        </fieldset>

        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-violet-700 text-white h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Create
            </button>
          </Dialog.Close>
        </div>

        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>

      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default CreateContractModel;
