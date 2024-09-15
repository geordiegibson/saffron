import { useState } from "react";
import AvatarStack from "../components/AvatarStack";
import Menu from "../components/Menu";
import CreateContractModel from "../components/CreateContractModel";
import CoinFilter from "../components/crypto/CoinFilter";

const Direct = () => {
    const [givingFilters, setGivingFilters] = useState([]);
    const [recevingFilters, setRecevingFilters] = useState([]);

    const clearFilters = () => {
        setGivingFilters([]);
        setRecevingFilters([]);
    };

    return (
        <div className="flex flex-col h-screen w-screen items-center">

            {/* Title */}
            <div className="w-[75vw] lg:w-[50vw]">
                <div className="flex flex-col pt-10 pb-5 top-animation">
                    <p className="text-neutral-400 font-bold">Send Direcly</p>
                    <p className="text-white inter" style={{ fontSize: "30px" }}>🚀 Direct</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-grow bottom-animation w-[75vw] lg:w-[50vw]">

                {/* Search Bar and Filters */}
                <div className="flex w-full gap-2">
                    <div className="relative w-full">
                        <svg fill="white" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                        <input placeholder="Search" className="w-full rounded-lg pl-10 pr-3 py-3 text-sm bg-neutral-900 border-none placeholder:text-slate-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 text-white placeholder:text-slate-600"/>
                    </div>
                    <CreateContractModel button={<button className="bg-zinc-900 font-bold px-3 rounded"><i className="text-white font-bold bi bi-plus-lg"></i></button>}/>
                </div>

                <div className="flex mt-5 gap-8">
                    <div className="flex gap-1 lg:gap-3">
                        <CoinFilter name="Give" filter={givingFilters} updateFilter={setGivingFilters} />
                        <CoinFilter name="Receive" filter={recevingFilters} updateFilter={setRecevingFilters} />
                    </div>

                    <div className="flex gap-5">
                        {givingFilters.length > 0 && (
                            <>
                                <div className="hidden lg:flex mt-2 h-5 w-[1px] bg-black/10 bg-white/20"></div>
                                <div className="hidden lg:flex items-center gap-2">
                                    <p className="text-gray-100 text-xs geist">Giving</p>
                                    <AvatarStack coins={givingFilters} />
                                </div>
                            </>
                        )}

                        {recevingFilters.length > 0 && (
                            <>
                                <div className="hidden lg:flex mt-2 h-5 w-[1px] bg-black/10 bg-white/20"></div>
                                <div className="hidden lg:flex items-center gap-2">
                                    <p className="text-gray-100 text-xs geist">Receiving</p>
                                    <AvatarStack coins={recevingFilters} />
                                </div>
                            </>
                        )}

                        {(recevingFilters.length > 0 || givingFilters.length > 0) && (
                            <>
                                <div className="hidden lg:flex mt-2 h-5 w-[1px] bg-black/10 bg-white/20"></div>
                                <button onClick={() => clearFilters()} className="hidden lg:flex inline-block h-8 w-8 rounded-full mx-1 ring-1 ring-neutral-700 bg-neutral-900 text-white flex justify-center items-center">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* No Contracts Section */}
                <div className="flex-grow flex flex-col items-center justify-center mb-32">
                    <p className="text-gray-400 text-3xl mb-2"><i className="bi bi-people-fill"></i></p>
                    <p className="text-white geist">No Bitches?</p>
                    <p className="text-gray-400">Get started by organising a direct trade.</p>
                    <CreateContractModel 
                        button={<button className="bg-black text-white font-bold rounded text-sm px-2 py-1 mt-3">
                            <i className="text-white bi bi-plus-lg"></i> New Contract
                        </button>} 
                    />
                </div>
            </div>

            <Menu page="direct" />
        </div>
    );
};

export default Direct;
