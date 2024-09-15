type TitleProps = {
    title: string,
    description: string
}

const Title = (props: TitleProps) => {

    return (
        <div className="w-[75vw] lg:w-[50vw]">
            <div className="flex flex-col pt-10 pb-5 top-animation">
                <p className="text-neutral-400 font-bold">{props.description}</p>
                <p className="text-white inter" style={{ fontSize: "30px" }}>{props.title}</p>
            </div>
        </div>
    )
}

export default Title