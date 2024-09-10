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
                    <img className='h-32' src='images/ethereum.png' />
                    <img src='images/secret.jpeg' />
                    <img className='h-32' src='images/bitcoin.png' />
                </div>

                <div className="flex flex-col gap-2 mt-12 inter">
                    <h1>Trade tokens, effortlessly.</h1>
                </div>

                <div className="font-bold mt-3"><p>Allowing users to swap arbitrary tokens in a peer-to-peer manner.</p></div>


                <Link className=" bg-white text-sm text-gray-800 rounded h-6 font-bold w-32 p-5 mt-20 flex items-center justify-center" to="/">Get Started</Link>

            </div>
            
        </div>
    )
}

export default Home
