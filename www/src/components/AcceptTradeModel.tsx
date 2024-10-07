import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { accept_contract } from '../secretClient.tsx'

const AcceptTradeModel = (props: any) => {

  const [confirmed, setConfirmed] = useState(false)

  const handleAcceptTrade = () => {
    accept_contract(props.contract.receiving_coin, props.contract.receiving_amount)
  }
  
  return (
    <Dialog.Root open={props.isOpen} onOpenChange={props.onClose}>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA11 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
       
        <p className="text-white m-0 font-bold">
          Accept Trade
        </p>

        <div className="mt-5 flex flex-col gap-1">
              <label className="text-gray-400 w-[90px] font-bold text-left w-full text-xs" htmlFor="name">You Give:</label>

              <span className="w-full inline-flex items-center justify-between p-3 bg-zinc-800 rounded-xl">
                  <div className='flex w-full justify-between items-center'>
                      <p className='font-bold text-white text-sm'>{props.contract.giving_amount} {props.contract.giving_coin}</p>
                      <img src={`images/${props.contract.giving_coin}.png`} className='h-6'/>
                  </div>
              </span>
          </div>

        <div className="mt-3 flex flex-col gap-1">
              <label className="text-gray-400 w-[90px] font-bold text-left w-full text-xs" htmlFor="name">You Receive:</label>
              <span className="w-full inline-flex items-center justify-between p-3 bg-zinc-800 rounded-xl">
                  <div className='flex w-full justify-between items-center'>
                      <p className='font-bold text-white text-sm'>{props.contract.receiving_amount} {props.contract.receiving_coin}</p>
                      <img src={`images/${props.contract.receiving_coin}.png`} className='h-6'/>
                  </div>
              </span>
          </div>


          <div className='mt-8 flex justify-between items-center'>

            <div className='flex gap-2'>
              <input type="checkbox" className="h-5 w-5 bg-zinc-800 rounded text-gray-700" style={{ boxShadow: "none" }} />
              <div>
                <p onChange={() => setConfirmed((prev) => !prev)} className='text-white font-bold leading-none text-sm'>Confirm</p>
                <p className='text-gray-400 text-sm'>I understand this cannot be undone</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Dialog.Close asChild>
                <button onClick={handleAcceptTrade} className="bg-white text-black text-sm h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Accept
                </button>
              </Dialog.Close>
            </div>

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