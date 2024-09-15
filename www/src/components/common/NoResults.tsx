import { ReactElement } from "react"
import CreateContractModel from "../CreateContractModel"

type NoResultsProps = {
    icon: ReactElement,
    title: string,
    description: string
}

const NoResults = (props: NoResultsProps) => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center mb-32">
            <p className="text-gray-400 text-3xl mb-2">{props.icon}</p>
            <p className="text-white geist">{props.title}</p>
            <p className="text-gray-400">{props.description}</p>
            <CreateContractModel 
                button={
                    <button className="bg-black text-white font-bold rounded text-sm px-2 py-1 mt-3">
                        <i className="text-white bi bi-plus-lg"></i> New Contract
                    </button>
                } 
            />
        </div>
    )
}

export default NoResults