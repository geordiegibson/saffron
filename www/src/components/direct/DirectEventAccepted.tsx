const DirectEventAccepted = (props: any) => {
    return (
        <div className="bg-green-600/30  p-3 h-[10vh] rounded-xl flex justify-between items-center">
            <p className="text-green-100 font-bold">Accepted Contract</p>

            <div className="flex gap-4 mr-5">
                    
                <div className="flex flex-col gap-1">
                    <p className="text-green-100 text-xs text-center font-bold">Gave</p>
                    <div className="flex gap-3 items-center">
                        <img className="h-8" src="images/SCRT.png"/>
                        <div className="flex flex-col items-end">
                            <p className="text-white text-sm">200</p>
                            <p className="text-white text-sm">SCRT</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-1">
                    <p className="text-green-100 text-xs text-center font-bold">Received</p>
                    <div className="flex gap-3 items-center">
                        <div className="flex flex-col items-start justify-end">
                            <p className="text-white text-sm">200</p>
                            <p className="text-white text-sm">SCRT</p>
                        </div>
                        <img className="h-8" src="images/SCRT.png"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DirectEventAccepted