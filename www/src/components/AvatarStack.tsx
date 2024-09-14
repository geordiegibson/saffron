type AvatarStackProps = {
    coins: Array<String>
}

const AvatarStack = (props: AvatarStackProps) => {

    const displayCoins = () => {
      return props.coins.slice(0, 3).map((coin) => (
        <img
            alt=""
            src={`images/${coin}.png`}
            className="inline-block h-8 w-8 rounded-full  ring-white"
          />
       )) 
    }

    return (
      <>
        <div className="flex -space-x-2">
          {displayCoins()}
          {props.coins.length > 3 && <p className="inline-block h-8 w-8 text-xs rounded-full bg-gray-400 text-white flex justify-center items-center">+{props.coins.length - 3}</p>}
        </div>
      </>
    )
  }
  
  export default AvatarStack