import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

const Home = () => {

    return (
        <div className="flex flex-col min-h-screen w-screen items-center justify-center">

            {/* Fixed Navbar at the top */}
            <div className="fixed top-0 left-0 w-full">
                <Navbar />
            </div>

            <div className="flex flex-grow flex-col items-center text-center mt-24 w-full">

                <div className="flex justify-center items-end w-full">
                    <img className='h-32 coin coin-secondary' src='images/ethereum.png' />
                    <img className="coin coin-primary" src='images/secret.jpeg' />
                    <img className='h-32 coin coin-secondary' src='images/bitcoin.png' />
                </div>

                <div className="animate text-animation flex flex-grow flex-col items-center text-center">

                    <div className="flex gap-1 mt-16 inter">
                        <h1>Trade tokens,</h1>
                        <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600"><h1>effortlessly.</h1></div>
                    </div>

                    <div className="font-bold mt-5 text-gray-400 geist"><p>Allowing users to swap arbitrary tokens in a peer-to-peer manner.</p></div>


                    <Link className=" bg-white text-sm text-gray-800 rounded h-6 font-bold w-32 p-5 mt-20 flex items-center justify-center" to="/trade">Get Started</Link>
                </div>
                
            </div>
            
        </div>
    )
}

export default Home
