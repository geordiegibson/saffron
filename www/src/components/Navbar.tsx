import ProfilePicture from "./Avatar"

const Navbar = () => {

    return (
        <div className="flex justify-between items-center w-screen py-4 px-6">

            <div className="flex items-center">
                <img className="h-10" src="images/logo.png"/>
                <h1 className='text-white font-bold text-lg geist'>saffron.</h1>
            </div>

            <ProfilePicture />
        </div>
    )
}

export default Navbar