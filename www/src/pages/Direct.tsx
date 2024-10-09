import Menu from "../components/Menu";
import Title from "../components/common/Title";
import DirectEventAccepted from "../components/direct/DirectEventAccepted";
import DirectEventCreated from "../components/direct/DirectEventCreated";
import DirectEventExpired from "../components/direct/DirectEventExpired";

const Direct = () => {

    return (

        <div className="flex flex-col h-screen w-screen items-center">

            <Title title="Direct" description="Send Direcly" />

            <div className="flex flex-col flex-grow bottom-animation w-[75vw] lg:w-[50vw] mt-5 gap-4">

                <DirectEventAccepted />
                <DirectEventAccepted />
                <DirectEventAccepted />
                <DirectEventExpired />
                <DirectEventCreated />

                {/* <NoResults icon={<i className="bi bi-people-fill"></i>} title="No Activity" description="Get started by viewing available trades." /> */}
            
            </div>

            <Menu page="direct" />
        </div>
    );
};

export default Direct;
