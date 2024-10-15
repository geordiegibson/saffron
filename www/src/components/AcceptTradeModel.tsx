import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useState, useEffect, useRef } from 'react';
import { accept_contract } from '../util/secretClient.ts'
import { getCoinByAddr } from '../util/acceptedCoins.ts';

enum ModalState {
  FORM,
  LOADING,
  SUCCESS,
  FAIL,
  TIMEOUT
}

const AcceptTradeModel = (props: any) => {

  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [wantingCoin, setWantingCoin] = useState<Coin | undefined>()
  const [offeringCoin, setOfferingCoin] = useState<Coin | undefined>()
  const [modalState, setModalState] = useState<ModalState>(ModalState.FORM)

  const checkboxRef = useRef(null);

  const handleAcceptTrade = () => {

    if (confirmed) {

      setModalState(ModalState.LOADING)
      
      accept_contract(props.contract).then((response) => {
        if (response.code == 0) {
          setModalState(ModalState.SUCCESS)
        } else {
          setModalState(ModalState.FAIL)
        }
      }).catch((error) => {
        console.log(error)
        setModalState(ModalState.TIMEOUT);
      })
    } else {
      if (checkboxRef.current) {
        (checkboxRef.current as HTMLInputElement).className = 'border-3 border-red-600 h-5 w-5 bg-zinc-800 rounded text-gray-700';
      }
    }
  }

  useEffect(() => {
    setWantingCoin(getCoinByAddr(props.contract.wanting_coin_addr))
    setOfferingCoin(getCoinByAddr(props.contract.offering_coin_addr))
  }, [])
  
  return (
    <Dialog.Root open={props.isOpen} onOpenChange={props.onClose}>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA11 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  h-[40vh] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
       
        <p className="text-white m-0 font-bold">
          Accept Trade
        </p>

        {modalState === ModalState.FORM &&
        <>
        <div className="mt-5 flex flex-col gap-1">
              <label className="text-gray-400 w-[90px] font-bold text-left w-full text-xs" htmlFor="name">You Give:</label>

              <span className="w-full inline-flex items-center justify-between p-3 bg-zinc-800 rounded-xl">
                  <div className='flex w-full justify-between items-center'>
                      <p className='font-bold text-white text-sm'>{props.contract.wanting_amount} {wantingCoin?.abbr}</p>
                      <img src={wantingCoin?.img} className='h-6'/>
                  </div>
              </span>
          </div>

        <div className="mt-3 flex flex-col gap-1">
        <label className="text-gray-400 w-[90px] font-bold text-left w-full text-xs" htmlFor="name">
          You Receive:
        </label>
        <span className="w-full inline-flex items-center justify-between p-3 bg-zinc-800 rounded-xl">
          <div className='flex w-full justify-between items-center'>
            <p className='font-bold text-white text-sm'>
              {props.contract.offering_amount || props.contract.token_id} {offeringCoin?.abbr || "(NFT)"}
            </p>
            {offeringCoin?.img ? (
              <img src={offeringCoin.img} className='h-6' alt="Offering Coin" />
            ) : (
              <img src={props.contract.token_url} className='h-6' alt="Offering NFT" />
            )}
          </div>
        </span>
      </div>


          <div className='mt-8 flex justify-between items-center'>

            <div className='flex gap-2'>
              <input ref={checkboxRef} onChange={() => setConfirmed((prev) => !prev)} type="checkbox" className="h-5 w-5 bg-zinc-800 rounded text-gray-700" style={{ boxShadow: "none" }} />
              <div>
                <p className='text-white font-bold leading-none text-sm'>Confirm</p>
                <p className='text-gray-400 text-sm'>I understand this cannot be undone</p>
              </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleAcceptTrade} className="bg-white text-black text-sm h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Accept
                </button>
            </div>
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
              <p className='text-center'>Contract Complete! Check your wallet for funds.</p>
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

        {modalState === ModalState.TIMEOUT &&

        <div className='flex flex-col items-center h-full justify-center'>
          <p><i className="text-5xl text-red-600 text-center bi bi-exclamation-circle-fill"></i></p>
          <span className="my-8 w-full flex flex-col justify-between items-center px-6 py-3 text-red-200 bg-red-900/30 rounded-xl">
            <p className='text-center'>Failed to perform transaction. Did you confirm in your Wallet extension?</p>
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

export default AcceptTradeModel;