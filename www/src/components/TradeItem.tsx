import { useState, useEffect } from 'react';
import { getCoinByAddr } from '../util/acceptedCoins.ts';

const TradeItem = (props: {contract: Contract}) => {

    const [confirmed, setConfirmed] = useState(false)
    const [wantingCoin, setWantingCoin] = useState<Coin | undefined>()
    const [offeringCoin, setOfferingCoin] = useState<Coin | undefined>()

    useEffect(() => {
        setWantingCoin(getCoinByAddr(props.contract.wanting_coin_addr))
        setOfferingCoin(getCoinByAddr(props.contract.offering_coin_addr))
    }, [])

    // Update when we get date for the contract
    const date = "2024-09-21T23:59:59";

    const calculateTimeLeft = (expiryDate) => {
        const now = new Date();
        const expiry = new Date(expiryDate);

        const timeDiff = expiry - now;

        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDiff / 1000) % 60);

            let timeLeft: string;
            let urgency: string;

            if (days > 0) {
                timeLeft = `${days} day${days > 1 ? "s" : ""} left`;
                urgency = "low"; // A lot of time left (green)
            } else if (hours > 0) {
                timeLeft = `${hours} hour${hours > 1 ? "s" : ""} left`;
                urgency = "medium"; // Moderate time left (yellow)
            } else if (minutes > 0) {
                timeLeft = `${minutes} minute${minutes > 1 ? "s" : ""} left`;
                urgency = "high"; // Not much time left (red)
            } else {
                timeLeft = `${seconds} second${seconds > 1 ? "s" : ""} left`;
                urgency = "high"; // Very little time left (red)
            }

            return { timeLeft, urgency };
        } else {
            return { timeLeft: "Expired", urgency: "expired" };
        }
    };


    const renderTimeLeft = () => {

        const urgencyClasses = {
            low: 'text-green-900 bg-green-300',
            medium: 'text-yellow-900 bg-yellow-300',
            high: 'text-red-900 bg-red-300',
            expired: 'text-gray-900 bg-gray-300',
        };

        const { timeLeft, urgency } = calculateTimeLeft(date);

        return (
            <div className="flex gap-2 justify-center w-full">
                <div
                    className={`px-2 py-0.5 w-max rounded text-xs ${urgencyClasses[urgency]}`}>{timeLeft}</div>
            </div>
        );
    }

    return (

        <div className="h-max bg-neutral-900 rounded-lg p-5 flex flex-col justify-center items-center w-full">


            <div className='flex flex-row justify-between w-full'>
                <div className='flex-col justify-start items-center'>
                    <p className='text-neutral-400 text-sm'>You give:</p>
                    <p className='font-bold text-white'>{props.contract.wanting_amount} {wantingCoin?.abbr}</p>
                </div>
                <img className='h-10' src={wantingCoin?.img} />
            </div>


            <div className='flex flex-row justify-between w-full mt-6'>
                <div className='flex-col justify-start items-center'>
                    <p className='text-neutral-400 text-sm'>You receive:</p>
                    <p className='font-bold text-white'>{props.contract.offering_amount || "NFT: " + props.contract.token_id} {offeringCoin?.abbr || ""}</p>
                </div>
                <img className='h-10' src={offeringCoin?.img || props.contract.token_url} />
            </div>


            <div className='justify-center items-center w-full px-2 mt-4'>
                {renderTimeLeft()}
            </div>

        </div>
    )
}

export default TradeItem