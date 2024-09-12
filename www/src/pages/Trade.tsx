import Menu from "../components/Menu"
import TradeItem from "../components/Trade"

const Trade = () => {
    return (
        <div className="flex flex-col min-h-screen w-screen">

            <div className="flex flex-col pt-10 pb-5 ml-96 top-animation">
                <p className="text-neutral-400 font-bold">Browse Global Contracts</p>
                <p className="text-white inter" style={{"fontSize": "30px"}}>✨ Trade</p>
            </div>



        <div className="bottom-animation">

            <div className="flex justify-center items-center w-full px-96 gap-2">

                {/* Search Bar */}
                <div className="relative w-full">
                    <svg fill="white" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                    <input placeholder="Search" className="w-full rounded pl-10 pr-3 py-3 text-sm placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:placeholder:text-slate-600"/>
                </div>

                {/* Create Button */}
                <button className="bg-white w-max p-3 rounded">
                    <svg fill="black" className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                </button>
                </div>

                {/* Filters */}
                <div className="flex ml-96 mt-5 gap-5">
                <button className="bg-neutral-800 text-white w-max text-sm text-gray-800 flex items-center rounded p-4 h-6 font-bold">Give ^</button>
                <button className="bg-neutral-800 text-white w-max text-sm text-gray-800 flex items-center rounded p-4 h-6 font-bold" >Receive ^</button>
                <button className="bg-neutral-800 text-white w-max text-sm text-gray-800 flex items-center rounded p-4 h-6 font-bold">Value ^</button>
                </div>

                <div className="flex gap-2 justify-center">
                <TradeItem />
                <TradeItem />
                <TradeItem />
                </div>

            </div>

            <Menu page='trade'/>

        </div>

        
            
    )
}

export default Trade