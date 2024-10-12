import Menu from "../components/Menu";
import Title from "../components/common/Title";
import { useState, useEffect } from 'react';
import DirectEventAccepted from "../components/direct/DirectEventAccepted";
import DirectEventCreated from "../components/direct/DirectEventCreated";
import DirectEventExpired from "../components/direct/DirectEventExpired";
import { query_activity } from "../util/secretClient";
import NoResults from "../components/common/NoResults";
import DirectEventContractComplete from "../components/direct/DirectEventContractComplete";

const Direct = () => {

    const [activities, setActivities] = useState<Array<number>>([]);

    useEffect(() => {
        query_activity().then((response) => setActivities(response.activity)) 
    }, []);

    const displayActivities = () => {
        return activities.map((activity: any) => {
            if (activity.activity_type === 1) {
                return <DirectEventCreated contract={activity.contract}/>
            }
            else if (activity.activity_type === 2) {
                return <DirectEventAccepted />
            }
            else if (activity.activity_type === 3) {
                return <DirectEventContractComplete/>
            }
            else if (activity.activity_type === 4) {
                return <DirectEventExpired />
            }
        })
    }

    return (

        <div className="flex flex-col h-screen w-screen items-center">

            <Title title="Direct" description="Send Direcly" />

            <div className="flex flex-col flex-grow bottom-animation w-[75vw] lg:w-[50vw] mt-5 gap-4">

                {activities.length > 0 ? 
                    displayActivities()
                    :
                    <NoResults icon={<i className="bi bi-people-fill"></i>} title="No Activity" description="Get started by viewing available trades." />
                }   

            
            </div>

            <Menu page="direct" />
        </div>
    );
};

export default Direct;
