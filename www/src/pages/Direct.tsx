import Dropdown from "../components/Dropdown"
import Alert from "../components/Alert"
import ProfilePicture from "../components/Avatar"
import Menu from "../components/Menu"

const Direct = () => {
    return (
        <div className="w-screen h-screen">

            <div className="flex p-10">
                <p className="text-white inter" style={{"fontSize": "30px"}}>Direct</p>
            </div>

            <div className="w-52">
                <Dropdown /> 
                <Alert />
                <ProfilePicture />
            </div>

            <Menu page='direct'/>
        </div>
    )
}

export default Direct