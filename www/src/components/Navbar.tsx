import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <div className="flex justify-between items-center w-screen py-4 px-6">

            <div className="flex items-center">
                <img className="h-10" src="images/logo.png"/>
                <h1 className='text-white font-bold text-lg geist'>saffron.</h1>
            </div>

            <Link className="bg-white text-sm text-gray-800 flex items-center rounded p-4 h-6 font-bold" to="/">Add Wallet</Link>

        </div>
    )
}

export default Navbar