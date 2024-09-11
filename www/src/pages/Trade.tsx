import Dropdown from "../components/Dropdown"
import Alert from "../components/Alert"
import ProfilePicture from "../components/Avatar"

const Trade = () => {
    return (
        <div className="w-screen h-screen">

            <div className="flex p-10">
                <p className="text-white inter" style={{"fontSize": "30px"}}>Trade</p>
            </div>

            <div className="w-52">
                <Dropdown /> 
                <Alert />
                <ProfilePicture />
            </div>

        </div>
    )
}

export default Trade