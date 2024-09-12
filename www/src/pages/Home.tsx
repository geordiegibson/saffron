import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

const Home = () => {

    return (
        <div className="flex flex-col min-h-screen w-screen items-center justify-center">

            <div className="fixed top-0 left-0 w-full">
                <Navbar />
            </div>
            
            <div className="flex flex-col items-center text-center w-full">

                <div className="flex justify-center items-end w-full gap-4">
                    <img className='h-32 coin coin-secondary drop-shadow-darker' src='images/ethereum.png' />
                    <img className="coin coin-primary drop-shadow-darker" src='images/secret.png' />
                    <img className='h-32 coin coin-secondary drop-shadow-darker' src='images/bitcoin.png' />
                </div>

                <div className="animate text-animation flex flex-grow flex-col items-center text-center ">

                    <div className="flex gap-1 mt-16 inter">
                        <h1 className="drop-shadow-darker text-white">Trade tokens,</h1>
                        <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#3e78b2] to-[#004ba8] drop-shadow-darker"><h1>effortlessly.</h1></div>
                    </div>

                    <div className="font-bold mt-5 text-gray-400 geist drop-shadow-darker"><p>Allowing users to swap arbitrary tokens in a peer-to-peer manner.</p></div>

                    <div className="relative mt-4 group">
                        <Link className="relative drop-shadow-darker text-white font-bold" to="/trade">Get Started</Link>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#6b100d] scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Home
