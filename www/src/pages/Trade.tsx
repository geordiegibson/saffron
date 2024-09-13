import Menu from "../components/Menu"

const Trade = () => {
    return (
        <div className="flex flex-col min-h-screen w-screen items-center">
            
            <div className="w-[75vw] lg:w-[50vw]">
                <div className="flex flex-col pt-10 pb-5 top-animation">
                    <p className="text-neutral-400 font-bold">Browse Global Contracts</p>
                    <p className="text-white inter" style={{"fontSize": "30px"}}>✨ Trade</p>
                </div>
            </div>
            



            <div className="bottom-animation w-[75vw] lg:w-[50vw]">

                <div className="flex w-full gap-2">

                    {/* Search Bar */}
                    <div className="relative w-full">
                        <svg fill="white" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        <input placeholder="Search" className="w-full rounded pl-10 pr-3 py-3 text-sm bg-neutral-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-white placeholder:text-slate-600"/>
                    </div>

                    {/* Create Button */}
                    <button className="bg-white w-max p-3 rounded">
                        <svg fill="black" className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                    </button>
                </div>

                {/* Filters */}
                <div className="flex mt-5 gap-5">
                    <button className="bg-neutral-800 text-white w-max text-sm text-gray-800 flex items-center rounded p-4 h-6 font-bold">Give <i className="pl-2 bi bi-chevron-down"></i></button>
                    <button className="bg-neutral-800 text-white w-max text-sm text-gray-800 flex items-center rounded p-4 h-6 font-bold" >Receive <i className="pl-2 bi bi-chevron-down"></i></button>
                    <button className="bg-neutral-800 text-white w-max text-sm text-gray-800 flex items-center rounded p-4 h-6 font-bold">Value <i className="pl-2 bi bi-chevron-down"></i></button>
                </div>

                {/* Contracts */}
                {/* <div className="flex gap-2 justify-center">
                <TradeItem />
                <TradeItem />
                <TradeItem />
                </div> */}

            </div>

            <Menu page='trade'/>

        </div>

        
            
    )
}

export default Trade