const DirectEventExpired = () => {
    return (
        <div className="bg-red-600/30 p-3 h-[10vh] rounded-xl flex justify-between items-center">
            <p className="text-red-100 font-bold">Contract Expired</p>

            <div className="flex flex-col gap-1 mr-16">
                <p className="text-red-100 text-xs text-center font-bold">Returned</p>
                <div className="flex gap-4 items-center">
                    <img className="h-8" src="images/SCRT.png"/>
                    <div>
                        <p className="text-white text-sm">200</p>
                        <p className="text-white text-sm">SCRT</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DirectEventExpired