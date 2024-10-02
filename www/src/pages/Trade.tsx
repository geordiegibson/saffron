import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import CreateContractModel from "../components/CreateContractModel";
import FilterMenu from "../components/FilterMenu";
import Title from "../components/common/Title";
import NoResults from "../components/common/NoResults";
import { try_query_contracts } from "../secretClient";
import TradeItem from "../components/TradeItem";

const Trade = () => {
  const [contracts, setContracts] = useState<Array<Contract>>([]);
  const [filterCount, setFilterCount] = useState(0);

  const [filters, setFilters] = useState<Filters>({
    giving: [],
    receiving: [],
  });

  const contractDisplays = () => {
    return contracts.map((contract, index) => (
      <TradeItem key={index} contract={contract} />
    ));
  };

  useEffect(() => {
    let count = 0;
    if (filters.giving.length > 0) {
      count += 1;
    }
    if (filters.receiving.length > 0) {
      count += 1;
    }
    setFilterCount(count);
  }, [filters]);

  useEffect(() => {
    try_query_contracts().then((contracts) => setContracts(contracts));
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen items-center">
      <Title title="Trade" description="Browse Global Contracts" />

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

        {contracts.length > 0 ? (
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contractDisplays()}
          </div>
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
