import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import CryptoInput from './crypto/CryptoSelect';
import Dropdown from './common/Dropdown';
import {try_transfer_funds} from '../secretClient'
import { useState } from 'react';
import { supportedCoins } from '../acceptedCoins';

enum ModalState {
  FORM,
  LOADING,
  SUCCESS,
  FAIL
}

const CreateContractModel = (props: any) => {

  // State for the form inputs
  const [givingCoin, setGivingCoin] = useState<Coin>(supportedCoins[0]);
  const [givingAmount, setGivingAmount] = useState(0);
  const [receivingCoin, setReceivingCoin] = useState<Coin>(supportedCoins[0]);
  const [receivingAmount, setReceivingAmount] = useState(0);
  const [modalState, setModalState] = useState<ModalState>(ModalState.FORM)

  // Function to handle contract creation
  const handleCreateContract = () => {

    setModalState(ModalState.LOADING)

    const contract = {
      giving_coin: givingCoin,
      giving_amount: givingAmount,
      receiving_coin: receivingCoin,
      receiving_amount: receivingAmount
    }
    
    try_transfer_funds(contract).then((success) => {
      if (success) {
        setModalState(ModalState.SUCCESS)
      } else {
        setModalState(ModalState.FAIL)
      }
    })
  };

  return (
    <Dialog.Root onOpenChange={() => setModalState(ModalState.FORM)}>
    <Dialog.Trigger asChild>
        {props.button}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA12 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[45vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-white m-0 font-bold">
          Create Contract
        </Dialog.Title>

        {modalState === ModalState.FORM &&
        <>
          <div className="mb-[15px] flex flex-col gap-1 mt-5">
            <label className="text-gray-400 w-[90px] text-left font-bold w-full text-xs" htmlFor="name">You Give</label>
            <CryptoInput
                selectedCoin={givingCoin}
                onCoinChange={setGivingCoin}
                amount={givingAmount}
                onAmountChange={setGivingAmount}
              />
          </div>

          <div className="mb-[15px] flex flex-col gap-1">
            <label className="text-gray-400 w-[90px] font-bold text-left w-full text-xs" htmlFor="name">You Receive</label>
            <CryptoInput
                selectedCoin={receivingCoin}
                onCoinChange={setReceivingCoin}
                amount={receivingAmount}
                onAmountChange={setReceivingAmount}
              />
          </div>

          <div className="mb-[15px] flex flex-col gap-1">
              <label className="text-gray-400 w-[90px] font-bold text-left w-full text-xs" htmlFor="name">Expiry</label>
              <Dropdown />
          </div>

          <div className="mt-[25px] flex justify-end">
            <button onClick={handleCreateContract} className="bg-white text-black text-sm h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Create
            </button>
          </div>
        </>
        }

        {modalState === ModalState.LOADING &&
          <div className="flex justify-center items-center h-full" role="status">
              <svg aria-hidden="true" className="w-12 h-12 animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
          </div>
        }  

        {modalState === ModalState.SUCCESS &&
          <div className='flex flex-col items-center h-full justify-center'>
            <p><i className="text-5xl text-green-600 text-center bi bi-check-circle-fill"></i></p>
            <span className="my-8 w-full flex flex-col justify-between items-center px-6 py-3 text-green-200 bg-green-900/30 rounded-xl">
              <p className='text-center'>Contract created successfuly!</p>
            </span>
          </div>
        }

        {modalState === ModalState.FAIL &&

          <div className='flex flex-col items-center h-full justify-center'>
            <p><i className="text-5xl text-red-600 text-center bi bi-exclamation-circle-fill"></i></p>
            <span className="my-8 w-full flex flex-col justify-between items-center px-6 py-3 text-red-200 bg-red-900/30 rounded-xl">
              <p className='text-center'>Failed to perform transaction. Please ensure you have sufficient funds.</p>
            </span>
          </div>
        }

        <Dialog.Close asChild>
          <button
            className="text-white hover:bg-zinc-700 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>

      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
  
};

export default CreateContractModel;
