const TradeItem = (props: {contract: Contract}) => {

    return (
        <div className="h-max w-56 bg-neutral-900 rounded-lg mt-5 p-5 ml-5 flex justify-center">

                <div className="flex flex-col">


                    <div className="flex gap-6 items-center">
                        <img className="h-12" src={`images/${props.contract.giving_coin}.png`} />
                        <div className="flex flex-col">
                            <p className="text-white font-bold">{props.contract.giving_amount}</p>
                            <p className="text-neutral-400">{props.contract.giving_coin}</p>
                        </div>
                    </div>

                    <hr className="my-5 w-full"></hr>

                    <div className="flex gap-6 items-center">
                        <div className="flex flex-col">
                            <p className="text-white font-bold">{props.contract.receiving_amount}</p>
                            <p className="text-neutral-400">{props.contract.receiving_coin}</p>
                        </div>
                        <img className="h-12" src={`images/${props.contract.receiving_coin}.png`} />
                    </div>


                    <div className="flex gap-2 mt-5 justify-center">
                        <div className="text-red-900 bg-red-300 px-1 py-0.5 w-max rounded text-xs">Sep 13th 17:00 UTC</div>
                    </div>

                </div>
            
            </div>
    )
}

export default TradeItem