import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CoinScene from "../components/Coin.tsx";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen w-screen items-center justify-center relative">

            {/* Fixed navbar at the top */}
            <div className="fixed top-0 left-0 w-full">
                <Navbar />
            </div>

            {/* Coin placed above text */}
            <div className='absolute inset-0 flex items-center justify-center w-full -translate-y-1/4'>
                <CoinScene />
            </div>

            {/* Centered text */}
            <div className="flex flex-col items-center text-center z-10"> {/* Ensure text is above the coin with z-10 */}
                <div className="flex gap-1 mt-16 inter">
                    <h1 className="text-2xl lg:text-5xl drop-shadow-darker text-white">Trade tokens,</h1>
                    <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#3e78b2] to-[#004ba8] drop-shadow-darker">
                        <h1 className="text-2xl lg:text-5xl">effortlessly.</h1>
                    </div>
                </div>

                <div className="font-bold mt-5 text-gray-400 geist drop-shadow-darker">
                    <p>Allowing users to swap arbitrary tokens in a peer-to-peer manner.</p>
                </div>

                <div className="relative mt-4 group">
                    <Link className="relative drop-shadow-darker text-white font-bold" to="/trade">Get Started</Link>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#6b100d] scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>
                </div>
            </div>
        </div>
    );
};

export default Home;
