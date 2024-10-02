import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import CryptoInput from './crypto/CryptoSelect';
import Dropdown from './common/Dropdown';
import {try_create_contract} from '../secretClient'
import { useState } from 'react';

const AcceptTradeModel = (props: any) => {

  const initialCoin = { id: 1, name: 'SCRT', avatar: 'images/SCRT.png' };

  // State for the form inputs
  const [givingCoin, setGivingCoin] = useState(initialCoin);
  const [givingAmount, setGivingAmount] = useState(500);
  const [receivingCoin, setReceivingCoin] = useState(initialCoin);
  const [receivingAmount, setReceivingAmount] = useState(13);

  // Function to handle contract creation
  const handleCreateContract = () => {
    const contract = {
      giving_coin: givingCoin.name,
      giving_amount: givingAmount,
      receiving_coin: receivingCoin.name,
      receiving_amount: receivingAmount
    };
    try_create_contract(contract);
  };

  return (
    <Dialog.Root open={props.isOpen} onOpenChange={props.onClose}>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA11 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
       
        <Dialog.Title className="text-white m-0 text-[17px] text-lg font-bold">
          Are you Absolutely Sure?
        </Dialog.Title>
        

        <span className="mt-8 w-full gap-8 inline-flex items-center px-6 py-3 text-green-200 bg-green-900/30 border border-green-700 rounded-xl">
          <p className='text-sm'>You Receive:</p>

          <div className='flex gap-2 items-center'>
              <img src="images/ETH.png" className='h-8'/>
              <p className='font-bold'>500 ETH</p>
          </div>
         
        </span>

        <span className="mb-3 mt-3 w-full gap-16 inline-flex items-center px-6 py-3 text-red-200 bg-red-900/30 border border-red-700 rounded-xl">
          <p className='text-sm'>You Give:</p>

          <div className='flex gap-2 items-center'>
              <img src="images/BTC.png" className='h-8'/>
              <p className='font-bold'>1 BTC</p>
          </div>
         
        </span>

        <div className="mt-[25px] flex justify-center">
          <Dialog.Close asChild>
            <button onClick={handleCreateContract} className="bg-white text-sm h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Accept Contract
            </button>
          </Dialog.Close>
        </div>

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

export default AcceptTradeModel;
