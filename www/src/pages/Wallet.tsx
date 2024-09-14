import Dropdown from "../components/MenuDropdown"
import Alert from "../components/Alert"
import ProfilePicture from "../components/Avatar"
import Menu from "../components/Menu"

const Wallet = () => {
    return (
        <div className="w-screen h-screen">

            <div className="flex p-10">
                <p className="text-white inter" style={{"fontSize": "30px"}}>Wallet</p>
            </div>

            <div className="w-52">
                <Dropdown /> 
                <Alert />
                <ProfilePicture />
            </div>

            <Menu page='wallet'/>
        </div>
    )
}

export default Wallet