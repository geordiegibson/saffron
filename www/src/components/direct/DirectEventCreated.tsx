import { getCoinByAddr } from "../../util/acceptedCoins"

const DirectEventCreated = (props: any) => {
    return (
        <div className="bg-zinc-900 p-3 h-[10vh] rounded-xl flex justify-between items-center">
            <p className="text-white font-bold">Created Contract</p>

            <div className="flex gap-4 mr-5">
                    
                <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-xs text-center font-bold">Offering</p>
                    <div className="flex gap-3 items-center">
                        <img className="h-8" src={getCoinByAddr(props.contract.offering_coin_addr)?.img || props.contract.token_url}/>
                        <div className="flex flex-col items-end">
                            <p className="text-white text-sm">{props.contract.offering_amount || "NFT: " + props.contract.token_id}</p>
                            <p className="text-white text-sm">{getCoinByAddr(props.contract.offering_coin_addr)?.abbr || ""}</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-xs text-center font-bold">Wanting</p>
                    <div className="flex gap-3 items-center">
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-white text-sm">{props.contract.wanting_amount}</p>
                            <p className="text-white text-sm">{getCoinByAddr(props.contract.wanting_coin_addr)?.abbr}</p>
                        </div>
                        <img className="h-8" src={getCoinByAddr(props.contract.wanting_coin_addr)?.img}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DirectEventCreated