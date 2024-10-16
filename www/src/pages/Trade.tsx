import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import CreateContractModel from "../components/CreateContractModel";
import FilterMenu from "../components/FilterMenu";
import Title from "../components/common/Title";
import NoResults from "../components/common/NoResults";
import { try_query_contracts } from "../util/secretClient";
import TradeItem from "../components/TradeItem";
import AcceptTradeModel from "../components/AcceptTradeModel";

const Trade = () => {

  const [contracts, setContracts] = useState<Array<Contract>>([]);
  const [filterCount, setFilterCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>()
  const [displayContracts, setDisplayContracts] = useState<Array<Contract>>([])
  const [pageStartIndex, setPageStartIndex] = useState(0)
  const [filters, setFilters] = useState<Filters>({
    wanting: [],
    offering: [],
  });


  // Handles the event a user clicks on a contract. Opens the Accept Contract modal.
  const handleClick = (index: number) => {
    {setSelectedContract(contracts[index])}
    {setIsDialogOpen(true)}
  }

  // Callback to be passed to the Accept Contract modal to handle close event.
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedContract(null);
  };


  // Moves to the next page of 12 contracts
  const nextPage = () => {
    if (pageStartIndex + 12 < displayContracts.length) {
      setPageStartIndex((prev) => prev + 12)
    }
  }

  
  // Moves to the previous page of 12 contracts
  const previousPage = () => {
    if (pageStartIndex - 12 >= 0) {
      setPageStartIndex((prev) => prev - 12)
    }
  }


  // Filters the contracts by the currently applied filters.
  let filter = () => {

    let filtered_result = contracts

    if (filters.wanting.length > 0) {
      filtered_result = filtered_result.filter((contract) => filters.wanting.includes(contract.wanting_coin_addr.toString()))
    } 
    
    if (filters.offering.length > 0) {
      filtered_result = filtered_result.filter((contract) => filters.offering.includes(contract.offering_coin_addr.toString()))
    }

    setPageStartIndex(0)
    setDisplayContracts(filtered_result)
  }


  // Creates the contract display cards.
  const display_contracts = () => {
    return displayContracts.slice(pageStartIndex, pageStartIndex + 12).map((contract, index) => (
      <div key={contract.id} onClick={() => handleClick(index)}>
        <TradeItem contract={contract}/>
      </div>
    ));
  };


  // Applies the filters whenever the user updates them in the filter menu
  useEffect(() => {
    let count = 0;
    if (filters.wanting.length > 0) {
      count += 1;
    }
    if (filters.offering.length > 0) {
      count += 1;
    }
    setFilterCount(count);
    filter()
  }, [filters]);


  // Fetch contracts from the network on load
  useEffect(() => {
    try_query_contracts().then((contracts) => {
      setContracts(contracts); 
      setDisplayContracts(contracts) 
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen items-center">
      <Title title="Trade" description="Browse Contracts" />

      {/* Main content */}
      <div className="flex flex-col flex-grow bottom-animation w-[75vw] lg:w-[50vw]">
        
        {/* Search Bar */}
        <div className="flex w-full gap-2">
          <div className="relative w-full">
            <svg
              fill="white"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
              placeholder="Search"
              className="w-full rounded-lg pl-10 pr-3 py-3 text-sm bg-neutral-900 border-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 text-white placeholder:text-slate-600"
            />
          </div>

          {filterCount > 0 && (
            <div
              style={{ top: "-5px" }}
              className="absolute right-11 z-10 flex items-center justify-center h-5 w-5 text-white text-xs font-bold bg-red-600 rounded-full"
            >
              {filterCount}
            </div>
          )}

          <FilterMenu
            filters={filters}
            updateFilters={setFilters}
            button={
              <button className="bg-zinc-900 px-3 h-full font-bold rounded">
                <i className="text-white bi bi-funnel"></i>
              </button>
            }
          />

          <CreateContractModel
            button={
              <button className="bg-zinc-900 font-bold px-3 rounded">
                <i className="text-white font-bold bi bi-plus-lg"></i>
              </button>
            }
          />
        </div>
                  
        {displayContracts.length > 0 ? (
          <>
            <div className="grid mt-5 w-full flex-grow grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {display_contracts()}

              {isDialogOpen && (
                <AcceptTradeModel
                  isOpen={isDialogOpen}
                  onClose={closeDialog}
                  contract={selectedContract}
                />
              )}

            </div>

            {/* Pagination */}
            <div className="w-full flex justify-center items-center mt-5 mb-20 gap-4 rounded-xl">
              <button onClick={() => previousPage()} className="w-24 text-white p-3 text-xl rounded-xl"><i className="text-bold bi bi-arrow-left"></i></button>
              <p className="text-white text-lg font-bold">{pageStartIndex / 12 + 1} / {Math.ceil(displayContracts.length / 12)}</p>
              <button onClick={() => nextPage()} className="w-24 text-white text-xl p-3 rounded-xl"><i className="bi bi-arrow-right"></i></button>
            </div>
          </>

        ) : (
          <NoResults
            icon={<i className="bi bi-bank"></i>}
            title="No Contracts"
            description="Get started by creating a new contract."
          />
        )}
      </div>

      <Menu page="trade" />
    </div>
  );
};

export default Trade;
